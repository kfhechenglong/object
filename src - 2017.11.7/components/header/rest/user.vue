<template>
  <div class="user">
	<el-dialog title="用户管理" v-model="dialogFormVisible">
        <div class="user-main clearfix">
            <div class="delete">
              <template>
                <el-button-group>
                <el-button
                  plain
                  @click.native="dialogAddToggle"><i class="el-icon-plus"></i>添加
                </el-button>
                <!-- <el-button
                  plain
                  @click="dele"><i class="el-icon-delete2"></i>删除
                </el-button> -->
                </el-button-group>
              </template>
            </div>
            <!-- <div class="order">
                <el-button-group>
                    <el-button
                      plain
                      @click=""><i class="el-icon-plus"></i>
                    </el-button>
                    <el-button
                      plain
                      @click=""><i class="el-icon-delete2"></i>
                    </el-button>
                </el-button-group>
            </div> -->
            <div class="search">
                <el-input placeholder="搜索" icon="search" v-model.lazy.trim="search" @change="handleIconClick" :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="info"
                border
                style="width: 100%"
                height="240"
                @selection-change="handleSelectionChange"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <!-- <el-table-column
                  type="selection"
                  >
                </el-table-column> -->
                <el-table-column
                  prop="name"
                  label="账号"
                  align="center"
                  >
                </el-table-column>
               <!--  <el-table-column
                  prop="id"
                  label="密码"
                  align="center"
                  >
                </el-table-column> -->
                <el-table-column
                  label="操作"
                  align="center">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="restPassWord(scope.$index, scope.row)">重置密码</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <ele-add ref="add" v-on:newUser="newAdd"></ele-add>
    </el-dialog>
    <!-- 使用组件 -->
    <!-- <ele-det ref="det"></ele-det> -->
    
  </div>
</template>
<script>
// 引入增加用户组件
import addUser from './adduser'
// 引入删除用户组件
// import deleUser from './deleuser'
// 引入删除数组的方法
import util from '../../../common/util'
import code from '../../../common/code.js'
import {operatorList,operatorDelete} from '../../../api/api'
export default {
    // 注册组件
    components :{
        // 'ele-det' : deleUser,
        'ele-add' : addUser
    },
   data (){
   	return {
        // 模态框显示隐藏控制
   		    dialogFormVisible: false,
          search:'',
          info:[],
          search_info:'',
          multipleSelection:"",
          arr:'',
          deleId :[]
   	    }
   },
   created (){
   		
   },
   props:{
    name:null
  },
  computed :{
  },

   methods : {
        getOperatorList(){
           // console.log(this.name)
              var that = this,
                operatorName = {
                  operator : this.name
                };
              operatorList(operatorName).then(function(response){
                if(response.code === 200){
                  console.log(response.data)
                  that.dialogFormVisible = true;
                  that.info = response.data;
                  that.search_info = response.data;
                  // 进行对象深拷贝
                  that.arr = that.search_info.concat();
                  that.toPinName(that.arr);
                }else{
                  alert(response.code+'获取管理员信息出错')
                }
              }).catch((err) =>{
                alert(err+'获取管理员信息出错')
              })
            },
        // 模态框显示隐藏控制
   	    showTable(){
            this.getOperatorList();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(val)
        },
        // 子组件模态框显示隐藏
        dialogAddToggle(){
            this.$refs.add.childShow();
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
          // console.log(this.search)
           this.info = util.searchName(this.search,this.arr);
           // console.log(this.info)
        },
        restPassWord(scope, row){
          // console.log(row['id']);
           this.$confirm('您是否要重置该用户密码？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then((res)=> {
              // 密码重置
              this.$ajax.post('/operator/resetpwd',{operator_id:row['id']}).then((res)=> {
                if(res.code === 200){
                  msgTipsSuccess(this,'密码已经成功重置成123456！')
                }else{
                  msgTipsErr(this,'密码重置出错！')
                }
              }).catch((err) =>{
                alert(err +'密码重置出错！')
              })
            })
        },
        handleDelete(scope, row){
          this.multipleSelection = row;
          this.deleId = [row['id']];
          this.isDele([row['id']]);//调用删除的函数
        },
          // 删除信息提示框
        isDele(id) {
            let that = this;
            this.$confirm('您是否要删除这个用户吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // 发送删除的数据
                let data = {
                    users:'delete',
                    data: id
                }
                // 发送删除请求
                operatorDelete(data).then(function(response){
                  if(response.code == 200){
                    if(response.msg == "删除成功"){
                        // 删除数组的方法
                          util.arrayRemove();
                        // 数组选择的数组
                        // for (var i = 0; i < that.multipleSelection.length; i++) {
                          that.info.remove(that.multipleSelection);
                        // }
                        // 显示删除成功提示信息
                      msgTipsSuccess(that,'您删除成功!');
                    }else{
                      msgTipsErr(that,'您没有权限操作');
                    }
                  }
                }).catch(function(error){
                    // 很不幸，删除失败
                    alert('很不幸，删除失败!')
                })
            }).catch(() => {
              // msgTipsSuccess(this,'您取消了删除!');
            });
        },
        newAdd(res){
          this.info.unshift(res);
        }
  // }
    
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
	.user{
        .user-main{
            margin:15px 0;
            .delete{
                float: left;
               /* .el-button{
                    margin-left:-2px;
                    height: 34px;
                    width:60px;
                    padding: 10px 9px;
                }*/
            }
            .order{
                float: right;
            }
            .search{
                float:right;
                width:30%;
                margin-right: 10px;
            }
            /*.el-button.is-plain:focus, .el-button.is-plain:hover{
                border:1px solid #adadad;
                background-color:#e6e6e6;
                color:#333;
            } */
            
        }
        .table{
            /*height: 260px;*/
            overflow: auto;
        }
        .el-dialog__body{
            padding:10px 20px;
            margin-bottom:20px;
        }
        .el-dialog__header{
            padding:0px 20px 0px 20px;
            /*// padding-left:20px;*/
            line-height: 42px;
            background-color: #f8f8f8;
            border-bottom:1px solid #ccc;
        }
    }
</style>
