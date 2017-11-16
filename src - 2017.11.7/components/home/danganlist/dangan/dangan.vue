<template>
<div class="dangan">
    <div class="title">
        <h2>档案</h2>
    </div>
    <div class="dangan-main clearfix">
        <div class="delete">
          <template>
            <el-button
              plain
              @click="dialogAddVisible"><i class="el-icon-plus"></i>添加
            </el-button>
          </template>
        </div>
        <div class="search">
            <el-input placeholder="搜索" icon="search" v-model.lazy.trim="search" :on-icon-click="handleIconClick" @change="handleIconClick">
            </el-input>
        </div>
    </div>
    <div class="table" v-loading.body="loading">
        <template>
            <el-table
                :data="infoStudent"
                border
                ref="table"
                :height="height"
                :highlight-current-row="true"
                :stripe = "false"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="infoList"
              >
              <el-table-column
                label="序"
                type="index"
                width="auto"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="auto"
                align="center"
                :show-overflow-tooltip="true"
                >
                <!-- <template scope="scope">{{ scope.row.date }}</template> -->
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="auto"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="class_name"
                label="班级"
                width="auto"
                align="center"
                >
              </el-table-column>
            </el-table>
        </template>
    </div>
    <!-- 使用组件 -->
    <ele-add ref="add" v-on:newStudent="newData"></ele-add>
</div>
</template>
    
<script>
import addStudent from './add'
// 引入删除数组的方法
import util from '../../../../common/util'
import code from '../../../../common/code.js'
import {showList,deleStudentInfo,showStudentInfo} from '../../../../api/api'
import {mapMutations,mapState} from 'vuex'
export default {
    // 注册组件
    components:{
        'ele-add' : addStudent
    },
    data (){
        return {
            check : false,
            selectArr:[],
            infoStudent:[],
            multipleSelection: [],
            search : '',
            // 学生的基本信息
            infoBase :{},
            arr:'',
            loading:true,
            height:560
        }
    },
    created (){
      // 获取类别列表数据
      this.getList();
    },
    computed:{
        // 获取被删除学生的id
        ...mapState(['hadDeleStudy']),
    },
    watch:{
        hadDeleStudy:function(){
            const deleId = this.hadDeleStudy[0];
            let otherStudentsInfo = this.infoStudent;
            otherStudentsInfo.forEach((item) =>{
                // 如果id相同，则在列表中删除该学生
                if(item.id === deleId){
                    util.arrayRemove();
                    otherStudentsInfo.remove(item);
                    this.infoList(otherStudentsInfo[0])//删除成后显示第一个人的信息
                    // 默认选中第一个学生的状态
                    this.$refs.table.setCurrentRow(otherStudentsInfo[0]);
                }
            })
        }
    },
    methods : {
        // 获取用户的学生列表信息
        getList(){
            var info = "name"
            var that = this
            this.$ajax.post(`/user/showlist`,info).then(function(response){
             console.log(response)
             // 列表请求成功，获取第一个人的信息
                if(response.code == 200){
                    that.infoStudent = response.data;
                    // 进行对象深拷贝
                    that.arr = that.infoStudent.concat();
                    that.loading = false;
                    that.toPinName(that.arr);
                    var key = response.data[0].id;
                    setTimeout(()=>{//默认选中的状态
                        that.$refs.table.toggleRowSelection(response.data[0]);
                        that.$refs.table.setCurrentRow(response.data[0]);
                    },50)
                    var str = {"id":key}
                    that.goToBase(key);
                    // 获取默认选中第一个学生的信息
                    that.getClickData(str);
                }else{
                     msgTipsErr(that,'出错了!');
                }
            }).catch(function(err){
                msgTipsErr(that,'列表请求失败!');
            })    
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
         // 添加学生信息模态框
        dialogAddVisible : function(){
            // console.log(1);
            this.$refs.add.showTable();
        },
        // 将学生的姓名转换成拼音
        toPinName(str){
            let pinYinName = [];
            str.forEach((item) =>{
                pinYinName.push(code.toPinYin(item.name));
                item["pinyin"] = code.toPinYin(item.name);
            });
        },
        // 点击搜索触发函数
        handleIconClick(ev){
            // 判断搜索框的内容是否为空
            this.infoStudent = util.searchName(this.search,this.arr);
        },
        // 接收子组件传的数据添加信息
        newData (str){
            // console.log(str);
            this.infoStudent = str;
            this.infoList(this.infoStudent[0])//添加成功后显示第一个人的信息
            this.$refs.table.setCurrentRow(this.infoStudent[0]);
        },
        infoList(row, event, column){
            // checked的状态
            this.$refs.table.clearSelection();
            this.$refs.table.toggleRowSelection(row);
            let str = {"id":row.id}
            // let str = row.id
            let that = this;
            Vm.$emit('loading',true);
            // 获得被点击学生的信息
            this.getClickData(str);
            this.goToBase(row.id);
        },
        getClickData(str){
            this.$ajax.post(`/user/info`,str).then((response)=>{
                if(response.code === 200){
                    this.infoBase = response.data;
                    sessionStorage.setItem('user_info', JSON.stringify(response.data));
                    let test = this.infoBase;
                    return new Promise((resolve,reject)=>{
                        resolve(test)
                    })
                }else{
                    msgTipsErr(this,'出错了!');
                }
            }).then((e)=>{
                // 获取被点击学生的svg数据
                const id = new Array(e.user_id);
                this.$ajax.post('/info/getaudiograms',{user_id:id,type_id:"6"}).then((res)=>{
                    let svgData =  new Object;
                    if(res.code === 200 ){
                        if(res.data.users){//有助听听阈值
                            svgData = res.data.users[0];
                            this.$store.commit('hasCanvasData',res.data.users[0]);
                        }else{//无助听听阈值
                            this.$store.commit('hasCanvasData',{});
                        }
                        // 发送数据
                        Vm.$emit('change',e,svgData);
                    }else{
                        msgTipsErr(this,'出错了!');
                    }
                })
            }).catch(function(error){
                alert(error);
            });
        },
        goToBase(str){
            //回到基本信息界面
            this.$router.push({path:'/home/Archives/dalist/base',query:{"id":str}});
            // 将该id存入本地缓存
            sessionStorage.setItem('user_id', JSON.stringify(str));
            // 同时保存在vuex中一份
            this.$store.commit('goToBase',{'base':'base','id':str});
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
    .dangan{
        height:100%;
        .title{
            border-bottom:1px solid #e7eaec;
            h2{
             margin-left:20px;
             line-height: 70px;
            }
        }
        .table{
            padding:10px;
            table{
              width:100%;
            }
            .el-table__body-wrapper{/*****隐藏水平滚动条*****/
                overflow-x: hidden;
            }
            .el-table .cell, .el-table th>div{padding-left:5px;padding-right:5px;}
        }
        .dangan-main{
            padding:10px!important;
            .delete{
                float: left;
            }
            .search{
                float:right;
                width:60%;
            }
            .el-button{
                margin-left:-2px;
                height: 36px;
                min-width:70px !important;
                width:70px !important;
            }
        }
        .el-table_1_column_10{
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
        } 
    }
    // 弹出消息样式自定义
    div.el-message{
        top:50%;
        min-width:150px;
        background-color: rgba(0,0,0,0.3);
        p{
            color:#fff;
        }
    }
</style>
