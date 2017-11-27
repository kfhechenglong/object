<template>
    <div class="infotable">
        <div v-if="addStudent " class="my-d-h">
            <el-dialog v-model="tableShow" :close-on-click-modal="false">
                <div class="infotablecontent">
                    <h3></h3>
                    <div class="search clearfix"> 
                        <div class="fl input">
                            <el-input placeholder="请输入姓名或首字母" icon="search" v-model.trim="search" :on-icon-click="handleIconClick" @change="handleIconClick">
                            </el-input>
                        </div>
                        <div class="fl">
                            <el-button
                            type="primary"
                            @click="dialogAddVisible"><i class="el-icon-plus"></i>&nbsp;新增
                            </el-button>
                        </div>
                        <ul class="last  clearfix fl" v-if="nearSt.length>0">
                            <li class="l-t">最近浏览：</li>
                            <li v-for="(item,index) in nearSt" @click="toPath(item.id)" :class="index % 2 == 0 ? 'sef':''" :id="index === 2 ? 'last_li' :''" :title="item.name" v-if="index < 3">{{item.name}}
                                <!-- <span ></span> -->
                            </li>
                        </ul>
                    </div>
                    <div class="table">
                        <div class="clearfix" :class="{'t-6':flag == 6 }">
                            <div @click="_studyList" class="fl t-s-l" :class="{'active':studylist}">
                                <!-- <el-badge :value="infoStudent.length" class="item"> -->
                                  <p>学生列表({{infoStudent.length}}人)</p>
                                <!-- </el-badge> -->
                            </div>
                            <div v-show="flag == 6" @click="_studyList('dai')" class="fl t-s-z">
                                  <p>暂存</p>
                            </div>
                            <div @click="_studyList('dai')" class="fl t-s-d" :class="{'active':!studylist}">
                                <el-badge :value="value" class="item">
                                  <p>待测名单</p>
                                </el-badge>
                            </div>
                        </div>
                        <ul class="clearfix" v-if="studylist">
                            <li class="fl" v-for = "(item ,index) in infoStudent" @click="handleEdit(item)" :title="item.name">
                                <!-- <img :src="imgSrc(item)" alt=""> -->
                                <img v-if="item.sex == '男' "  :src="imgSrc(item)" :onerror="errorImgBody">
                                <img v-else :src="imgSrc(item)" :onerror="errorImgGirl">
                                <span style="overflow:hidden;">{{item.name}}</span>
                            </li>
                            <p v-if="infoStudent.length === 0">未找到相关信息！</p>
                        </ul>
                        <ul v-if="!studylist">
                            <li class="fl no-test" v-for="(item,index) in noTestNameLists"  @click="handleEdit(item)">
                                <img v-if="item.sex == '男' "  :src="imgSrc(item)" :onerror="errorImgBody">
                                <img v-else :src="imgSrc(item)" :onerror="errorImgGirl">
                                <span style="overflow:hidden;">{{item.name}}</span>
                            </li>
                            <p v-if="noTestNameLists.length === 0" style="margin-top:20px;">
                                暂无待测名单！
                            </p>
                        </ul>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div >
            <ele-add ref="add" v-on:newStudent="newData" v-on:showStudylist="showlist"></ele-add>
        </div> 
    </div>
</template>
<script>
import AddStudent from './../danganlist/dangan/add.vue'
import {showList,deleStudentInfo,showStudentInfo} from '../../../api/api'
import code from '../../../common/code.js'
import util from '../../../common/util.js'
const body = require('../../../../static/images/body.png');
const girl = require('../../../../static/images/girl.png');  
export default {
    components : {
        'ele-add' : AddStudent
    },
    data (){
        return {
            addStudent:true,
            tableShow:false,
            check : false,
            // 定义保存浏览过的数组
            oldArry:[],
            nearSt:[],
            infoStudent:[],
            multipleSelection: [],
            search : '',
            // 学生的基本信息
            infoBase :{},
            arr:'',
            studylist:true,
            errorImgBody:'this.src="' + body + '"',
            errorImgGirl:'this.src="' + girl + '"' ,
            //待测名单
            noTestNameLists:[],
            value:0
        }
    },
    props:{
        flag : Number
    },
    created (){
        // 获取类别列表数据
        this.getList();
        this.getStorage();
    },
    watch:{
        flag:function(){
            this.getNoTestNameLists();
        }
    },
    methods : {
        _studyList(evt){
            if(evt === 'dai'){
                this.studylist = false;
            }else{
                this.studylist = true;
            }
        },
        imgSrc:function(item){
            if(!item.picture){
                if(item.gender == "男"){
                    return body;
                }else{
                    return girl;
                }
            }else{
                return web_url+ item.picture;
            }
        },
         // 添加学生信息模态框
        dialogAddVisible(){
            this.addStudent = false;
            this.$refs.add.showTable();
        },
        newData(e){
            this.toPath(e[0].id);
        },
        showlist(e){
            this.addStudent = true;
        },

        handleEdit(row) {
            // console.log(index, row);
            // 现将该学生的信息存到本地localstorage;
            let val = {'name':row.name,'id':row.id};
            // 判断该对象是否添加过
            let valueIndex = -1;
            for (let i = 0; i < this.oldArry.length; i++) {
                if(this.oldArry[i].id == row.id){
                    valueIndex = i;
                    break;
                }
            }
            if(valueIndex==-1){
                this.oldArry.unshift(val);
            }else if(valueIndex>0){
                 this.oldArry.splice(valueIndex,1)
                 this.oldArry.unshift(val);
            }
            if(this.oldArry.length > 6){
                this.oldArry.length = 5;
            }
            localStorage.setItem("stName",JSON.stringify(this.oldArry))
            // console.log(JSON.stringify(this.oldArry))
            // 跳转到相应的页面
            this.toPath(row.id);
          },
        // 显示选择学员
        showTable(){
            // this.studylist = true;
            this.tableShow = true;
        },
        getNoTestNameLists(){
            // 所有学生列表的信息
            let infoStudent = this.infoStudent;
            // 获取待测名单
            let noTestNameLists = [];
            let testName = [];
            let getLocalStorageNoTestNameLists = JSON.parse(localStorage.getItem('noTestNames'));
            try{
                for(let i = 0; i< getLocalStorageNoTestNameLists.length; i++){
                    if(getLocalStorageNoTestNameLists[i].testType === this.flag){
                        testName = getLocalStorageNoTestNameLists[i].nameList;
                    }
                }
                // 获取用户的头像信息,同时筛选如果待测人员已经被删除了，则从待测名单中移除
                for (let i = 0; i < testName.length; i++) {
                    for (let j = 0; j < infoStudent.length; j++){
                        if(testName[i].user_id === infoStudent[j].id){
                            noTestNameLists.push(infoStudent[j])
                        }
                    }
                }
                this.noTestNameLists = noTestNameLists;
                this.value = + noTestNameLists.length;
            } catch(err){
                this.value = 0;
                this.noTestNameLists = [];
            }
            //如果有未测名单，则显示未测名单，否则默认显示学生列表
            if(this.noTestNameLists.length > 0){
                this.studylist = false;
            }else{
                this.studylist = true;
            }
        },
        getStorage(){
            // 首选获取本地缓存
            // 获取本地储存
            let near = JSON.parse(localStorage.getItem('stName'));
            let nearSt = this.nearSt;
            // 将本地储存的最近五人取出
            if(near){
                this.oldArry = near;
                if(near.length >=5){
                    for (var i = 0; i < 5; i++) {
                        nearSt.push(near[i]) 
                    };
                }else {
                    for (var i = 0; i < near.length; i++) {
                        nearSt.push(near[i]) 
                    };
                }
            }
        },
        // 获取用户的学生列表信息
        getList(){
            var info = "name"
            var that = this
            this.$ajax.post(`/user/showlist`,info).then(function(response){
                console.log(response)
                that.infoStudent = response.data;
                // 进行对象深拷贝
                that.arr = that.infoStudent.concat();
                that.toPinName(that.arr);
                 // 判断该学生ID是否已经被删除
                that.nearSt = that.FilterData(that.nearSt,that.infoStudent);
            }).catch(function(err){
                that.error = true;
                msgTipsErr(that,'列表请求失败!');
            }); 
        },
        // 查找两个数组中不同的元素
        FilterData(a,b){   //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
            let result = new Array();
            a.forEach((item) =>{
                b.forEach((val)=>{
                    if(item.id == val.id){
                        result.push(item)
                    }
                })
            });
            return result;
        },
        data(evt){
            this.addForm.birth = evt;
        },
        // 页面跳转函数
        toPath(params){
            // 如果用户列表请求失败
            if(this.error){
                alert("用户信息请求失败！");
                return;
            };
            // 将该id存入本地缓存
            sessionStorage.setItem('user_id', JSON.stringify(params));
            Vm.$emit('userId',params);
            // 页面跳转接收传递的参数id
            switch (this.flag){
                case 1:
                    console.log(this.flag)
                    this.$router.push({ path: '/home/linsix',query:{id:params}});
                    break;
                case 6:
                    this.$router.push({ path: '/home/zhuting',query:{id:params}} );
                    break;
                case 7:
                    this.$router.push({ path: '/home/especial',query:{id:params}});
                    break;
                case 2:
                // 胡氏七词
                    this.$router.push({ path: '/home/hseight',query:{id:params}});
                    break;
                case 4:
                    this.$router.push({ path: '/home/syllable',query:{id:params}});
                    break;
                case 3:
                // 声调
                    this.$router.push({ path: '/home/tone',query:{id:params}});
                    break;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        //关闭添加学生模块时，重置内容
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
        infoList(row, event, column){
            let str = {"id":row.id}
            // let str = row.id
            let that = this;
            // var a = ""
            this.$ajax.post(`/user/info`,str).then(function(response){
                that.infoBase = response.data;
                let test = that.infoBase
                Vm.$emit('change',test);
            }).catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
    .infotable{
        .title{
            height:40px;
            background-color: #f8f8f8;
            padding:0px 15px;
            border-bottom:1px solid #ccc;
            line-height:40px;
            h3{
                margin:0px;
                color:#1f2d3d;
                font-weight: 600;
            }
            div{
                color:#bfcbda;
                width:30px;
                text-align:center;
                cursor:pointer;
            }
            div:hover{
                color:#50bfff;
            }
        }
        .infotablecontent{
            // box-sizing:border-box;
            margin:50px 20px 20px 20px;
            h3{
                position: absolute;
                left:30px;
                top:-90px;
                width:300px;
                height:90px;
                background: url(../../../../static/images/new-title.png) no-repeat 0 -185px ;
            }
        }
        .el-dialog--small{
            width:900px;
            border-radius:20px;
        }
        .el-dialog__body{
            padding: 0;
            position: relative;
        }
        .fl .el-button{
            padding: 0;
        }
        .search{
            margin-bottom: 8px;
            .input{
                width:280px;
                float: left;
                margin-right:19px;

            }
            span{
                margin:0 10px;
                float: left;
                font-size: 16px;
                font-weight: 550;
                line-height: 40px;
            }
            .el-input__inner{height:43px;}
        }
        .table{
            // width:460px;
            margin-top:8px;
            .t-s-z,.t-s-l,.t-s-d{
                cursor:pointer;
                width: 425px;
                height: 40px;
                border: 1px solid #ccc;
                line-height: 40px;
                text-align: center;
                background:#ccc;
                font-size: 18px;
                color:#000;
                border-radius:7px 0 0 7px;
                p{
                    letter-spacing:10px;
                }
                .el-badge{
                    width:100%;
                }
            }
            .t-s-d{
                border-left:0px none;
                border-left:1px solid #fff;
                border-radius:0 7px 7px 0;
            }
            .active{
                background-color: #109bff;
                border: 1px solid #109bff;
                border-left:1px solid #fff;
                color:#fff;
            }
            .t-6{
                .t-s-l,.t-s-d,.t-s-z{
                    width: 283px;
                }
                .t-s-z{
                    border-radius:0;
                    border-left:1px solid #fff;
                }
            }
            ul{
                height:320px;
                overflow: auto;
                p{
                    font-size: 22px;
                    text-align:center;
                }
            }
            li{
                width:110px;
                box-sizing:border-box;
                cursor:pointer;
                height: 140px;
                font-size: 20px;
                font-weight: 500;
                letter-spacing: 3px;
                border-radius: 5px;
                border:2px solid #449d44;
                box-shadow: 4px 4px 10px  #999;
                color:#000;
                margin:10px 15px;
                img{width:90px;height:90px;
                    border-radius:50%;
                    display:block;margin:5px auto;}
                span{
                    box-sizing:border-box;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                    padding:0 10px;
                    text-align:center;
                }
            }
            .no-test{
                border:2px solid red;
            }
        }
        .el-table_1_column_5{
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
        }
        .last{
            // background-color: #eee;
            margin-left:20px;
            li{
                text-align:center;
                list-style:none;
                float: left;
                cursor:pointer;
                margin:3px 3px;
                color:#20a0ff;
                background-color: #e9f6ff;
                border-radius:5px;
                padding:0px 8px;
                line-height:35px;
                border: 1px solid #c0e5ff;
                // width: 47px;
                font-size:16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-shadow:2px 2px 5px #bbb; 
            }
            .l-t{
                font-size: 16px;
                width:80px;
                cursor:auto;
                border: 1px solid #eee;
                background-color: #eee;
                color:#333;
                box-shadow:0px 0px 0px red; 
            }
            .sef{
                background-color: #fef8ea;
                border: 1px solid #fcebc3;
                color:#f7bd36;
            }
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