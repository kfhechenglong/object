<template>
    <div class="more-high">
        <div class="title">
            <h3>高级查询</h3>
        </div>
        <section >
            <div class="header clearfix">
                <el-form class="fl" ref="form" :inline="true" :model="form" label-width="85px">
                    <div>
                      <el-form-item label="姓名：">
                        <el-input v-model.trim="form.user_name" placeholder="请输入姓名" class="name"></el-input>
                      </el-form-item>
                      <el-form-item label="性别：">
                        <el-select v-model="form.gender" placeholder="请选择性别" class="gender">
                          <el-option label="男" value="男"></el-option>
                          <el-option label="女" value="女"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="年龄：" class="age-warp">
                        <el-col :span="10">
                          <el-input v-model.lazy.trim.number="form.min_age" class="age" :maxlength="3" @change="checkAge(form.min_age,'min')"></el-input>
                        </el-col>
                        <el-col class="line" :span="4">&nbsp;—&nbsp;</el-col>
                        <el-col :span="10">
                          <el-input v-model.lazy.trim.number="form.max_age" class="age" :maxlength="3" @change="checkAge(form.max_age,'max')"></el-input>
                        </el-col>
                        <span class="tips">{{tips}}</span>
                      </el-form-item>
                      
                      <el-form-item label="班主任：">
                        <el-input v-model.trim="form.teacher" placeholder="请输入姓名" class="name"></el-input>
                      </el-form-item>
                      <el-form-item label="入园时间：">
                          <el-date-picker type="date" placeholder="选择日期" v-model="form.garten_time" style="width: 150px;" @change="timeChange"></el-date-picker>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="耳聋性质：">
                        <el-select v-model="form.deaf_nature" placeholder="请选择" class="bottom">
                            <el-option
                              v-for="item in deaf_nature"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              >
                            </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="耳聋程度：">
                        <el-select v-model="form.deaf_degree" placeholder="请选择" class="bottom">
                            <el-option
                              v-for="item in deaf_degree"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              >
                            </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="人工耳蜗：">
                        <el-input v-model.trim="form.cochlear" placeholder="请输入内容" class="bottom"></el-input>
                      </el-form-item>
                      <el-form-item label="助听器：">
                        <el-input v-model.trim="form.deaf_aid" placeholder="请输入内容" class="bottom"></el-input>
                      </el-form-item>
                      <el-form-item label="在校状态：">
                        <el-select v-model="form.sc_status" placeholder="请选择" class="zhuang">
                          <el-option label="在校" value="在校"></el-option>
                          <el-option label="离校" value="离校"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                </el-form>
                <ul class="fl">
                    <li><el-button type="warning" @click="onSubmit(form)">立即查询</el-button></li>
                    <li><el-button @click="_restContentForm">重置内容</el-button></li>
                </ul>
            </div>
            <div class="table clearfix">
                <div class="fl table-content" v-loading.body="loading">
                    <el-table
                    ref="table"
                    :data="tableData"
                    border
                    style="width: 100%"
                    :stripe="true"
                    :highlight-current-row="true"
                    @selection-change="handleSelectionChange"
                    @row-click="infoList"
                    >
                    <el-table-column
                      type="index"
                      label="序号"
                      width="40"
                      class-name="index-td">
                    </el-table-column>
                    <el-table-column
                      type="selection"
                      width="30">
                    </el-table-column>
                    <el-table-column
                      prop="user_name"
                      label="姓名"
                      width="auto">
                    </el-table-column>

                    <el-table-column
                      prop="gender"
                      label="性别"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="age"
                      label="年龄"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="birth"
                      label="出生年月"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="deaf_nature"
                      label="听损性质"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="deaf_degree"
                      label="听损程度"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="grade"
                      label="班级"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="teacher"
                      label="班主任"
                      width="auto">
                    </el-table-column>
                    <el-table-column label="操作" width="150px" align="center">
                      <template scope="scope">
                        <!-- <sapn class="dele">删除</sapn>|<sapn class="print">打印</sapn> -->
                        <el-button
                          size="small"  @click="handlePrint(scope.$index, scope.row)">打印</el-button>
                        <el-button
                          size="small"
                          type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                    <el-pagination
                        ref="page"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="10"
                      class="page"
                      layout="total, prev, pager, next"
                      :total="count">
                    </el-pagination>
                </div>
                <ul class="fl btn">
                    <li @click="deleMore"><el-button type="danger">批量删除</el-button></li>
                    <li @click="printMore"><el-button type="info">批量打印</el-button></li>
                </ul>
            </div>
        </section>
        <!-- 单个打印 start -->
        <div class="print" v-if="showPrint" >
            <div id="print-tone">
                <div id="print-warp">
                    <div class="fiexd-w">
                        <div class="print-warp">
                            <div class="print-tone clearfix" id="toimg">
                                <print ref="print"></print>
                            </div>
                        </div> 
                        <!-- 打印及关闭按钮 -->
                        <printButton :show="true" @close="closePrint" @code="codeQQ"></printButton>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showQQVisible">
            <codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
        </div>
        <!-- 单个打印 end -->
        <!-- 批量打印 start -->
        <div class="print-a">
          <div  style="width:1000px;height:100%;position: absolute;left: 0px;top: 0px;z-index: -1;">
            <ele-print-all ref="printall" :userInfo="printUsersData" :userText="printUsersOtherData"></ele-print-all>
          </div>
        </div>
        <!-- 批量打印 end -->
        <div id="aaa" style="width:1000px;height:100%;position: absolute;left: 0px;top: 0px;z-index: -1;">
          <ele-tinglitu ref="tinglitu" :objZong="canvasData"></ele-tinglitu>
        </div>
    </div>
</template>
    
<script>
// 引入删除数组的方法
import util from '../../../common/util'
import {mapMutations,mapState} from 'vuex'
import Print from'../zuting/report.vue'
import printButton from'../commonvue/print/print-button.vue'
import codeQQ from'../commonvue/codeQQ/codeQQ.vue'
import tinglitu from'./../danganlist/tingli/tinglitu'
import PrintAll from'./print-all.vue'
export default {
    // 注册组件
    components:{
        Print,
        printButton,
        codeQQ,
        'ele-tinglitu':tinglitu,
        'ele-print-all':PrintAll,
    },
    data() {
      return {
        showPrint:false,
        showQQVisible:false,
        hidden:false,
        index:1,
        form: {
          user_name: '',
          gender: '',
          min_age: '',
          max_age: '',
          garten_time:'',
          deaf_degree: '',
          teacher: '',
          deaf_nature: '',
          cochlear: '',
          deaf_aid: '',
          sc_status: '',
        },
        tips:'',
        deaf_degree: [
            {
              value: '正常',
              label: '正常'
            }, {
              value: '轻度',
              label: '轻度'
            }, {
              value: '重中度',
              label: '中度'
            }, {
              value: '重中度',
              label: '重中度'
            }, {
              value: '严重',
              label: '严重'
            }, {
              value: '极严重',
              label: '极严重'
            }
        ],
        deaf_nature:[
            {
              value: '传导性',
              label: '传导性'
            }, {
              value: '感音神经性',
              label: '感音神经性'
            }, {
              value: '混合性',
              label: '混合性'
            }
        ],
        tableData: [{
          user_name: '',
          gender: '',
          age: '',
          birth: '',
          deaf_nature: '',
          deaf_degree: '',
          grade: '',
          teacher: ''
        }],
        currentPage: 1,
        loading:true,
        count:0,
        allID:new Array,
        allStudyInfo:new Array,
        canvasData:[],
        userInfo:[],
        printUsersData:[],
        printUsersOtherData:[]
      }
    },
    mounted(){
        this.onSubmit({page:1});
        sessionStorage.setItem('test_id', 6);
    },
    computed:{
        codeInfo:function(){//生成二维码的信息
            return {'time':this.time,'type':this.type,'user_id':this.studyID,'file':this.file,'id':this.id}
        },
    },
    methods: {
        closePrint(e){//接收关闭信息
          this.showPrint = e;
        },
        _closeCodeQQ(e){//下载按钮，二维码关闭时的函数
          // this.showPrint = e;
          this.showQQVisible = false;
          this.hidden = e;
          // this.$store.commit('getter_code_time','');
        },
        codeQQ(e){
            this.$store.commit('code_api','bg');
          // 显示二维码
          this.file = 'ceshi';
          this.showQQVisible = false;
          this.type = null;
          this.studyID = null;
          this.time = null;
          this.id = null;
          this.showQQVisible = true;
          setTimeout(() =>{
                this.$refs.code.useqrcode();
            },50)
        },
        timeChange(e){
            this.form.garten_time = e;
        },
        handleSizeChange(val) {
            this.onSubmit({page:val});
            this.currentPage = val
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.onSubmit({page:val});
        },
        //表格的事件
        handleSelectionChange(selection) {//多选状态下的id值
            console.log(selection)
            let allId = new Array;
            let allStudyInfo = new Array;
            selection.forEach((item)=>{
                allId.push(item.user_id);
                allStudyInfo.push({user_id:item.user_id,user_name:item.user_name})
            });
            this.userInfo = selection;
            this.allID = allId;
            this.allStudyInfo = allStudyInfo;
        }, 
        infoList(rows, event, column){
            // console.log(column);
            if (column.type == "selection" || column.type == "index") {
            } else {
                this.$refs.table.clearSelection();
            }
            this.$refs.table.toggleRowSelection(rows);
        },
        // 删除单个学生
        handleDelete(index, row) {
            console.log(index, row);
            this.deletStudyInfo([row.user_id])
        },
        //批量删除学生
        deleMore(){
            if(this.allID.length === 0){ msgTipsErr(this,'请选择要删除的对象！');return}
            this.deletStudyInfo(this.allID)
        },
        deletStudyInfo(arrry){//删除学生
           this.$confirm('您是否要删除选择的学生信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let data={
                form:this.form,
                id:arrry,
                page:this.currentPage
              };
              this.loading = true;
              this.$ajax.post('/info/deluser',data).then((response) =>{
                  if(response.code === 200){
                      this.tableData = response.data.data;
                      this.count = +response.data.count;
                      this.currentPage = response.data.page;
                      this.loading = false;
                      msgTipsSuccess(this,'您删除成功!');
                  }
              }).catch((err) =>{
                  alert(err + "删除学生错误")
              })
            }).catch(() => {       
            });
        },
        handlePrint(index, row) {//单个打印
            sessionStorage.setItem('user_info', JSON.stringify(row));
            this.$ajax.post('/audiogram/showlist',{user_id:row.user_id}).then((response)=>{
                console.log(response)
                if(response.code === 200){
                    let data = response.data;
                    if(data.length >0){
                        this.getStudyData(data[0].audio_id)
                    }else{
                        msgTipsSuccess(this,'该学生暂无数据打印！')
                    }
                }else{//没有数据的话，初始化原始值
                    msgTipsErr(this,'数据请求失败！')
                }
            }).catch((err) =>{
                alert(err + "个人数据打印出错")
            });
        },
        printMore(){//批量打印
          if(this.allID.length === 0){ msgTipsErr(this,'请选择要打印的对象！');return}
          this.$ajax.post('/info/getaudiograms',this.allStudyInfo)
          .then((response)=>{
              console.log(response)
              if(response.code === 200){
                let errorusers = response.data.errorusers;
                let users = response.data.users;
                if(errorusers.length > 0){
                  let notData = "";
                  for(var i = 0 ; i < errorusers.length; i++){
                    notData += errorusers[i]+" ";
                  };
                  const h = this.$createElement;
                  if(typeof(users) == "undefined"){
                    this.$confirm("学生"+notData+'暂无信息！', '提示', {
                      type: 'warning',
                      message: h('p',null, [
                      h('div', null, [
                      h('span',null,'学生'),
                      h('strong',{style:'color:red'},notData),
                      h('span',null,'暂无信息！'),
                      ])]),
                    })
                  }else{
                    this.$confirm("学生"+notData+'暂无信息，是否继续打印其他学生信息？', '提示', {
                      type: 'warning',
                      message: h('p',null, [
                      h('div', null, [
                      h('span',null,'学生'),
                      h('strong',{style:'color:red'},notData),
                      h('span',null,'暂无信息，是否继续打印其他学生信息？'),
                      ])]),
                    }).then(()=>{//继续打印
                      this.filterData(users);
                    })
                  }
                }else{
                  this.filterData(users);
                }
              }
          })
          .catch((err)=>{
            alert(err +"批量打印请求错误！")
          })
        },
        //筛选信息
        filterData(data){
          let usersDat = data;
          let checkedUseraData = this.userInfo;
          let printUsersData = [];
          let printUsersOtherData = [];
          // 先清空图片信息
          this.$store.commit('clearAllPrintImgs');
            // 获取打印的信息
            // 从选中的列表中筛选有数据的学生用于打印
            var that = this
            for(let i = 0; i< usersDat.length;i++){
              for(let key in usersDat[i]){
                 for (let j = 0; j < checkedUseraData.length; j++) {
                    if(key == checkedUseraData[j].user_id){
                      // this.getImgs(usersDat[i][key].data)
                      printUsersData.push(checkedUseraData[j]);
                      printUsersOtherData.push(usersDat[i][key]);
                      (function(n) {
                          setTimeout(()=>{
                            that.canvasData = [];
                            that.canvasData.push(usersDat[i][key].data);
                          },50);
                          setTimeout(()=>{
                            that.$refs.tinglitu.drawyuanAll(true);
                          },50);
                      }(i));
                    }
                 }
              }
            };
            setTimeout(()=>{
              this.printUsersOtherData = printUsersOtherData;
              this.printUsersData = printUsersData;//传递给子组件
              setTimeout(()=>{
                var message = this.$refs.printall.returnHTML();
                util.print('#pageall',message);
              },50);
            },50)
        },
        getImgs(data){
          setTimeout(()=>{
            this.canvasData = [];
            this.canvasData.push(data);
          },50);
          setTimeout(()=>{
            this.$refs.tinglitu.drawyuanAll(true);
          },50);
        },
        getStudyData(id){
            this.$ajax.post('/audiogram/showone',{'audio_id':id}).then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.$store.commit('hasCanvasData',response.data);
                    this.canvasData = [];
                    this.canvasData.push(response.data.data);
                    sessionStorage.setItem('user_text',JSON.stringify(response.data));
                    this.showPrint = !this.showPrint;
                    setTimeout(() =>{//调用听力图中svg渲染
                        this.$refs.tinglitu.drawyuanAll();
                        setTimeout(()=>{//将听力图保存成图片格式
                          this.$refs.print.createdPng();
                          this.$refs.print._lookPng();
                        },50);
                     },50);
                }
            }).catch((err) =>{
                alert(err + "个人数据打印出错")
            });
        },
        onSubmit(arg) {
            this.loading = true;
            this.$ajax.post('/info/condition',arg).then((response) =>{
                // console.log(response);
                if(response.code === 200){
                    this.tableData = response.data.data;
                    this.count = +response.data.count;
                    this.loading = false;
                }
            }).catch((err) =>{
                alert(err + '高级查询！')
            })
        },
        restForm(){
            this.form = {user_name: '',gender: '',min_age: '',max_age: '',garten_time:'',deaf_degree: '',teacher: '',deaf_nature: '',cochlear: '',deaf_aid: '',sc_status: ''
            };
        },
        _restContentForm(){
            this.restForm();
            this.onSubmit({page:1});
        },
        // 年龄校验
        checkAge(age,flag){
            let value = parseInt(age);
            if(Object.prototype.toString.call(age) !== "[object Number]"){
                this.tips='只能是数字！'
                return
            }
            if(isNaN(value))return;
            if(flag === 'min'){
                this.form.min_age = value
            }else{
                this.form.max_age = value;
            };
            if(value >100){
                this.tips='年龄不能超过100！'
                return
            }else{this.tips=''}
        }
    }

}
</script>
<style  lang="less" >
    .more-high{
      height: 94%;
      width: 100%;
      background: #fff;
      .title{
          height:50px;
          line-height: 50px;
          border-bottom:1px solid #88d99f;
          h3{
              font-size:20px;
              font-weight: 600;
              text-indent: 2em;
          }
      }
      section{
          margin:10px 50px;
          .header{border-bottom:3px solid #88d99f;li{margin-top: 10px;}}
          form{
              width:85%;
              label{color:#000;}
              .name,.gender{
                  width:120px;
                  margin-right: 29px;
              }
              .zhuang{
                  width:120px;
              }
              .age-warp{
                  position: relative;
                  .tips{
                      position:absolute;
                      left:0px;
                      top:25px;
                      font-size: 12px;
                      color:red;
                  }
              }
              .age{
                  width:50px;
              }
              .bottom{
                  width:150px;
              }
              .el-input__inner{height:30px;}
          }
          .table{
              .table-content{
                  margin-top:20px;
                  width:80%;
                  /*****定义选择框******/
                  .index-td{
                      border-right: 0 none;
                      .cell{
                          text-align: center;
                          padding:0 5px 0 5px;
                      }
                  }
                  .el-table--striped .el-table__body tr:nth-child(2n).current-row td,.el-table__body tr.current-row>td{
                      background:#88d99f;
                  }
                  .el-table-column--selection .cell{padding:0 5px 0 5px;}
              }
              .btn{margin-left: 5%;margin-top:5%;li{margin-top: 10px;}}
              /*******分页********/ 
              .page{
                  float: right;
                  margin-top:10px;
                  padding:0;
                  .el-pager li,button{
                      min-width:45px;
                      height:35px;
                      line-height: 35px;
                      font-size: 14px;
                  }
                  span{
                      line-height: 35px;
                      font-size: 14px;
                  }
              }
          }
      }
      .print{
        #print-tone{
            background-color: rgba(0,0,0,0.5);
            position: fixed;
            top:0px;
            left:0px;
            width: 100%;
            height: 100%;
            z-index: 2000;
        }
        .print-warp{
          width:230mm;
          height:190mm;
          margin-left:150px;
          background-color: #ccc;
          overflow-y: auto;
          position: fixed;
          padding: 10px 0px;
          top:0;
          left:0;
          bottom: 0;
          right:0;
          margin:auto;
        }
        .print-tone{
          background-color: #fff;
          width:210mm;
          height:297mm;
          border:1px solid #fff;
          margin:auto;
          padding: 27px;
         position: relative;
          
        }
        /*按钮的样式外包*/
        .fiexd-w{
          width: 1000px;
          /*background: #fff;*/
          position: fixed;
          top: 0px;
          left: 0px;
          bottom: 0px;
          right: 0px;
          margin: auto;
        }
      }
      .print-a{

      }
    }
</style>
