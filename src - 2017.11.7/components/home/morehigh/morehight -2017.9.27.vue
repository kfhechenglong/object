<template>
  <div class="more-high">
    <div class="title">
      <h3>高级查询</h3>
    </div>
    <section >
      <div class="header clearfix">
        <el-form class="fl" ref="form" :inline="true" :model="form" label-width="35%">
          <div class="td">
            <div>
              <h4>基本信息</h4>
              <el-form-item label="姓名">
                <el-input v-model.trim="form.user_name" placeholder="请输入姓名" class="name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择性别" class="gender">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄" class="age-warp">
                <el-col :span="10">
                  <el-input v-model.lazy.trim.number="form.min_age" class="age" :maxlength="3" @change="checkAge(form.min_age,'min')"  placeholder="数字"></el-input>
                </el-col>
                <el-col class="line" :span="4">&nbsp;—&nbsp;</el-col>
                <el-col :span="10">
                  <el-input v-model.lazy.trim.number="form.max_age" class="age old-age" :maxlength="3" @change="checkAge(form.max_age,'max')"  placeholder="数字"></el-input>
                </el-col>
                <span class="tips">{{tips}}</span>
              </el-form-item>
              
              <!-- <el-form-item> -->
                <!-- <el-input v-model.trim="form.address" placeholder="关键字以空格分割" class="name"></el-input> -->
                <v-distpicker :province="form.province" :city="form.city" :area="form.area" @province="province" @city="city" @area="area"></v-distpicker>
              <!-- </el-form-item> -->
            </div>
          </div>
          <div class="td">
          <div>
            <h4>入园信息</h4>
            <el-form-item label="状态">
              <el-select v-model="form.sc_status" placeholder="请选择" class="zhuang">
                <el-option label="在园" value="1"></el-option>
                <el-option label="离园" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="form.class_id" multiple placeholder="请选择" class="bottom checked-more">
                  <el-option
                    v-for="item in class_name_list"
                    :key="item.class_id"
                    :label="item.class_name"
                    :value="item.class_id"
                    >
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班主任">
              <el-select v-model="form.teacher" multiple placeholder="请选择" class="bottom checked-more">
                  <el-option
                    v-for="item in teacher_list"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    >
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入园时间">
                <!-- <el-date-picker type="daterange" placeholder="选择日期" v-model="form.garten_time" style="width: 120px;"></el-date-picker> -->
                <!-- <div class="fl sh-year"> -->
                <el-col :span="10" class="sh-year">
                  <el-date-picker v-model="startYear" align="right" type="year" placeholder="起始年" :picker-options="pickerOptions"></el-date-picker>
                  </el-col>
                <!-- </div> -->
                <el-col class="line" :span="4">&nbsp;—&nbsp;</el-col>
                <!-- <div class="fl sh-year">— -->
                <el-col :span="10" class="sh-year end-year">
                  <el-date-picker v-model="endYear" align="right" type="year" placeholder="终止年" :picker-options="pickerOptions2"></el-date-picker>
                </el-col>
                <!-- </div> -->
                
            </el-form-item>
            </div>
          </div>
          <div class="td">
            <div class="product">
              <h4>助听设备</h4>
              <p>左耳</p>
              <el-cascader
                :options="product"
                change-on-select
                v-model="form.eq_left"
                @change="handleChangeLeft">
              </el-cascader>
              <p>右耳</p>
              <el-cascader
                :options="product"
                v-model="form.eq_right"
                change-on-select
                @change="handleChangeRight">
              </el-cascader>
            </div>
          </div>
          <div class="td">
            <div>
              <h4>听力信息</h4>
              <el-form-item label="耳聋性质">
                <el-select v-model="form.deaf_nature" multiple placeholder="请选择" class="bottom checked-more">
                    <el-option
                      v-for="item in deaf_nature"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="耳聋程度">
                <el-select v-model="form.deaf_degree" multiple placeholder="请选择" class="bottom checked-more">
                    <el-option
                      v-for="item in deaf_degree"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="裸耳PTA">
                <el-select v-model="form.lpta" multiple placeholder="请选择" class="bottom checked-more">
                    <el-option
                      v-for="item in valuePTA"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="助听PTA">
                <el-select v-model="form.zpta" multiple placeholder="请选择" class="bottom checked-more">
                    <el-option
                      v-for="item in valuePTA"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="td isover">
            <div>
              <h4>听力评估完成情况</h4>
              <el-form-item label="评估类型">
                <el-select v-model="checkedRadio" multiple placeholder="请选择" class="bottom checked-more">
                    <el-option
                      v-for="item in testType"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key"
                      >
                    </el-option>
                </el-select>
              </el-form-item>
              <p>
                <el-radio-group v-model="form.isover">
                  <el-radio-button :disabled="isChecked" label="已完成"></el-radio-button>
                  <el-radio-button :disabled="isChecked" label="未完成"></el-radio-button>
                </el-radio-group>
              </p>
              <el-checkbox-group v-model="form.checkedTime" class="radio-time" @change="changeIsOverTime">
                <el-checkbox-button :disabled="isChecked" label="周"></el-checkbox-button><el-checkbox-button :disabled="isChecked" label="月"></el-checkbox-button><el-checkbox-button :disabled="isChecked" label="季"></el-checkbox-button><el-checkbox-button :disabled="isChecked" label="年"></el-checkbox-button>
              </el-checkbox-group>
              <!-- <el-checkbox-group v-model="form.checkedRadio" class="radio-type">
                <el-checkbox :label="6">助听听阈</el-checkbox>
                <el-checkbox :label="1">林氏六音</el-checkbox>
                <el-checkbox :label="2">音素识别</el-checkbox>
                <el-checkbox :label="3">声调识别</el-checkbox>
                <el-checkbox :label="4">声母识别</el-checkbox>
              </el-checkbox-group> -->
            </div>
          </div>
          <ul class="fl">
            <div>
              <li><el-button class="m-h-btn" type="warning" @click="onSubmit(form)"><i class="iconfont icon-chaxun"></i>查询</el-button></li>
              <li><el-button class="m-h-btn" @click="_restContentForm" type="danger"><i class="iconfont icon-qingchu"></i>清除</el-button></li>
            </div>
          </ul>
        </el-form>
      </div>
      <div class="table clearfix">
          <div class="fl table-content" v-loading.body="loading">
            <div class="table-title">
              <p>
                <span class="clearfix"><em class="ch-all fl" @click="checkAll">{{checkAllText}}</em><em class="em-name">姓名</em></span><span>性别</span><span>年龄</span><span>入园时间</span><span>听损性质</span><span>听损程度</span><span>所在班级</span><span>班主任</span>
              </p>
            </div>
            <ul id="ul-lis">
              <li v-for="(item,index) in tableData" @click="handleSelectionLi($event,item,index)">
              <span>{{item.user_name}}</span><span>{{item.gender}}</span><span>{{item.age}}</span><span>{{item.garten_time}}</span><span>{{item.deaf_nature}}</span><span>{{item.deaf_degree}}</span><span>{{item.class_name}}</span><span>{{item.teacher}}</span>
              </li>
            </ul>
          </div>
          <ul class="fl btn">
              <li @click="printMore"><el-button type="info"><i class="iconfont icon-iconfontdayinji"></i>&nbsp;打印报告</el-button></li>
              <li @click="toggleClass"><el-button type="info"><i class="iconfont icon-class"></i>&nbsp;调换班级</el-button></li>
              <li @click="toggleTeacher"><el-button type="info"><i class="iconfont icon-banzhuren"></i>&nbsp;调换老师</el-button></li>
              <li @click="toggleSchool"><el-button type="info"><i class="iconfont icon-banzhuren"></i>&nbsp;在园状态</el-button></li>
              <li @click="deleMore"><el-button type="danger"><i class="el-icon-delete2"></i>&nbsp;删除</el-button></li>
          </ul>
      </div>
    </section>
    <!-- 单个打印 start -->
    <!-- <div class="print" v-if="showPrint" >
        <div id="print-tone">
            <div id="print-warp">
                <div class="fiexd-w">
                    <div class="print-warp">
                        <div class="print-tone clearfix" id="toimg">
                            <print ref="print"></print>
                        </div>
                    </div>  -->
                    <!-- 打印及关闭按钮
                    <printButton :show="true" @close="closePrint" @code="codeQQ"></printButton>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showQQVisible">
        <codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
    </div> -->
    <!-- 单个打印 end -->
    <!-- 批量打印 start -->
    <div class="print-a">
      <div  style="width:1000px;height:100%;position: absolute;left: 0px;top: 0px;z-index: -1;">
        <ele-print-all ref="printall" :distance="allDistance" :tableHeader="tableHeader" :resultData="renderData" :rederData="toneRenderData" :type="type" :userInfo="printUsersData" :userText="printUsersOtherData" :jieguo="jieguo"></ele-print-all>
      </div>
    </div>
    <!-- 批量打印 end -->
    <div id="aaa" style="width:1000px;height:100%;position: absolute;left: 0px;top: 0px;z-index: -1;">
      <ele-tinglitu ref="tinglitu" :objZong="canvasData"></ele-tinglitu>
    </div>
    <toggle ref="toggle" @updata="updataToggle" :data="toToggleData" :checkedId="checkedId" :allId="getAllStudyId"></toggle>
    <checkPrint ref="checkprint" @testType="getTestType"></checkPrint>
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
import checkPrint from'./check-print.vue'
import PrintAll from'./print-all.vue'
import toggle from'./toggle.vue'
import Addclass from '../commonvue/add-class.vue'
const PTA = [{value: '正常',label: '正常'},{value: '轻度聋',label: '轻度聋'},{value: '中度聋',label: '中度聋'},{value: '中重度聋',label: '中重度聋'},{value: '极重度聋',label: '极重度聋'}];
let initYear= new Date('1900');
let stopYear = new Date();
export default {
    // 注册组件
    components:{
        Print,
        printButton,
        codeQQ,
        toggle,
        checkPrint,
        'ele-addclass':Addclass,
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
          end_Year:'',
          start_Year:'',
          // garten_time:'',
          deaf_degree:[],
          teacher: '',
          deaf_nature:[],
          sc_status: '1',
          zpta:[],
          lpta:[],
          eq_right:[],
          eq_left:[],
          // address:'',
          class_name:'',
          class_id:[],
          teacher:[],
          checkedTime:[],
          checkedRadio:[],
          isover:'',
          province:'',
          city:'',
          area:''
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
        tableData: [],
        testType:[{name:'助听听阈',key:6},{name:'林氏六音',key:1},{name:'音素识别',key:2},{name:'声调识别',key:3},{name:'声母识别',key:4}],
        currentPage: 1,
        loading:true,
        count:0,
        checkedId:new Array,
        // checkedStudyInfo:new Array,
        canvasData:[],
        userInfo:[],
        printUsersData:[],
        printUsersOtherData:[],
        type:null,
        //林氏六音的打印数据
        allDistance:[],
        tableHeader:[],
        renderData:[],
        toneRenderData:[],
        jieguo:null,
        valuePTA:PTA,
        // 入园时间
        endYear:'',
        startYear:'',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now() || (time.getFullYear() > stopYear.getFullYear());
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return (time.getTime() >= Date.now()) || (time.getFullYear() <= initYear.getFullYear()-1);
          }
        },
        checkAllText:'全选',
        class_name_list :[],
        teacher_list:[],
        isChecked:true,
        checkedRadio:[],
        toToggleData:{},//调换班级、老师的数据
      }
    },
    watch:{
        startYear:function(){
          // 先判断当前日期是否有值，无值则初始化；
          if(!this.startYear){initYear = new Date('1900'); return;}else{
            initYear = this.startYear;
            this.form.start_Year = initYear.getFullYear();
          }
        },
        endYear:function(){
          // 先判断当前日期是否有值，无值则初始化；
          if(!this.endYear){stopYear = new Date(); return;}else{
            stopYear = this.endYear;
            this.form.end_Year = stopYear.getFullYear();
          }
        },
        checkedRadio:function () {
          this.form.checkedRadio = this.checkedRadio
          if(this.checkedRadio.length > 0){
            this.isChecked = false;
            this.form.isover = "已完成";
          }else{
            this.isChecked = true;
            this.form.checkedTime = [];
            this.form.isover = "";
          }
        },
        // 监听全选的状态
        checkedId:function(){
          if(this.checkedId.length < this.tableData.length){
            this.checkAllText = "全选";
          }else{
            this.checkAllText = "取消";
          }
        }
    },
    mounted(){
        this.onSubmit(this.form);
        // 获取班级列表,班主任列表
        util.getClass(this);
        util.getTeacher(this);
    },
    computed:{
      ...mapState(['product']),
      codeInfo:function(){//生成二维码的信息
          return {'time':this.time,'type':this.type,'user_id':this.studyID,'file':this.file,'id':this.id}
      },
      // 获取所有的id
      getAllStudyId:function(){
        const allData = this.tableData;
        let allStudyId = [];
        allData.forEach((item) =>{
          allStudyId.push(item.user_id);
        })
        return allStudyId;
      },
      // 获取当前学生的id与name
      checkedStudyInfo:function(){
        const allStudyInfo = [];
        const userInfo = this.userInfo;
        userInfo.forEach((item) =>{
          allStudyInfo.push({user_id:item.user_id,user_name:item.user_name})
        })
        return allStudyInfo;
      }
    },
    destroyed(){
      // this.restForm();
      initYear= new Date('1900');
      stopYear = new Date();
    },
    methods: {
      province(evt){//选择省份
        this.form.province = evt.value;
      },
      city(evt){//选择市
        this.form.city = evt.value;
      },
      area(evt){//选择区县
        this.form.area = evt.value;
      },
      changeIsOverTime(e){
        this.form.checkedTime = [];
        this.form.checkedTime.push(e.pop());
      },
      // 选择助听设备
        handleChangeLeft(value) {
          this.eq_left = value;
        },
        handleChangeRight(value) {
          this.eq_right = value;
        },
        // 点击选择学生信息
        handleSelectionLi(e,item,index){
          // console.log(e,item,index);
          const selection = this.userInfo;
          const checkedId = this.checkedId;
          const className = e.currentTarget.className;
          if(className){
            e.currentTarget.className = '';
            // 删除当前取消的选项
            util.arrayRemove();
            selection.remove(item);
            checkedId.remove(item.user_id);
          }else{
            e.currentTarget.className = 'active';
            selection.push(item);
            checkedId.push(item.user_id);
          }
        },
        // 清空列表li样式
        clearClassName(){
          const ul = jq("#ul-lis");
          const lis = ul.getElementsByTagName('li');
          for(let i = 0; i <lis.length;i++ ){
            lis[i].className = ""
          }
          this.checkAllText = "全选";
          this.checkedId = [];
          this.userInfo = [];
        },
        // 全选
        checkAll(){
          var checkedId = this.checkedId,
              tableData = this.tableData,
              selection = this.userInfo;
              // debugger
          if(checkedId.length < tableData.length){
            const ul = jq("#ul-lis");
            const lis = ul.getElementsByTagName('li');
            for(let i = 0; i <lis.length;i++ ){
              lis[i].className = "active"
            }
            this.checkAllText = "取消";
            tableData.forEach((item)=>{
              selection.push(item);
              checkedId.push(item.user_id);
            })
          }else{
            this.clearClassName();
          }
        },
        // 调换信息更新完毕的数据
        updataToggle(e){
          // console.log(e);
          this.tableData = e.reverse();
        },
        // 调换班主任
        toggleTeacher(){
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要删除的对象！');return}
          const teacher = this.teacher_list;
          this.toToggleData = {
            'data':teacher,
            'keyType':'老师'
          }
          this.$refs.toggle.dialogToggleVisible = true;
        },
        // 调换班级
        toggleClass(){
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要删除的对象！');return}
          const class_name = this.class_name_list;
          this.toToggleData = {
            'data':class_name,
            'keyType':'班级'
          }
          this.$refs.toggle.dialogToggleVisible = true;
        },
        // 调换在校状态
        toggleSchool(){
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要删除的对象！');return}
          this.toToggleData = {
            // 'data':class_name,
            'keyType':'在园状态'
          }
          this.$refs.toggle.dialogToggleVisible = true;
        },
        // 删除单个学生
        handleDelete(index, row) {
            console.log(index, row);
            this.deletStudyInfo([row.user_id])
        },
        //批量删除学生
        deleMore(){
            if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要删除的对象！');return}
            this.deletStudyInfo(this.checkedId)
        },
        deletStudyInfo(arrry){//删除学生
           this.$confirm('您是否要删除选择的学生信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let data={
                allId:this.getAllStudyId,
                id:arrry
              };
              this.loading = true;
              this.$ajax.post('/info/deluser',data).then((response) =>{
                  if(response.code === 200){
                      this.clearClassName();//清除选中的样式
                      this.tableData = response.data.reverse();
                      this.loading = false;
                      msgTipsSuccess(this,'您删除成功!');
                  }
              }).catch((err) =>{
                  alert(err + "删除学生错误")
              })
            }).catch(() => {       
            });
        },
        getTestType(e){
          console.log(e);
          const params = {user_id:this.checkedId,type_id:e.key}
          this.type = e;
          this.getPrintInfoData(params)
        },
        printMore(){//批量打印
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要打印的对象！');return}
          this.$refs.checkprint.dialogToggleVisible = true;
        },
        getPrintInfoData(params){
          this.$ajax.post('/info/getaudiograms',params).then((response)=>{
              console.log(response)
            if(response.code === 200){
              // debugger
              let errorusers = response.data.errorusers;
              let users = response.data.users;
              // 处理没有数据的信息
              if(errorusers){
                let notData = errorusers;
                // for(var i = 0 ; i < errorusers.length; i++){
                  // notData += errorusers[i]+" ";
                // };
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
                    if(params.type_id == 6){//助听听阈
                      this.filterData(users);
                    }else{
                      this.filterLiuData(users);
                    }
                  })
                }
              }else{
                if(params.type_id == 6){//助听听阈
                  this.filterData(users);
                }else{
                  this.filterLiuData(users);
                }
              }
            }
          }).catch((err)=>{
            console.log(err)
            alert(err +"批量打印请求错误！")
          })
        },
        // 处理林氏六音和音素测试的数据
        filterLiuData(data){
          let usersDat = data;
          let checkedUseraData = this.userInfo;
          let printUsersData = [];
          let printUsersOtherData = [];
          let accuracy = [];//音素测试评价的结果
          for (let i = 0; i < usersDat.length; i++) {
            // 获取数据
            for (let j = 0; j < checkedUseraData.length; j++) {
              if(usersDat[i].user_id === checkedUseraData[j].user_id){
                printUsersData.push(checkedUseraData[j]);
                printUsersOtherData.push(usersDat[i]);
                // 音素测听的结果
                if(this.type.key != 1 && this.type.key != 0 && usersDat[i].accuracy){
                  accuracy.push(JSON.parse(usersDat[i].accuracy));
                }
              }
            }
          }
          this.jieguo = accuracy;
          this.printUsersOtherData = printUsersOtherData;
          this.printUsersData = printUsersData;//传递给子组件
          //处理表格数据
          if(this.type.key == 1){
            this.checkedListData(printUsersOtherData);
          }else{
            this.checkedToneData(printUsersOtherData);
          }
        },
        // 音素测试
        checkedToneData(params){
          let renderData = [];
          // 所有表格的表头
          // debugger
          for (let i = 0; i < params.length; i++) {
            const data = params[i].data;
            renderData.push(data);
          }
          this.toneRenderData = renderData;
          setTimeout(()=>{
              var message = this.$refs.printall.returnHTML();
              util.print('#pageall',message);
          },100);
        },
        // 林氏六音
        checkedListData(params){
          let renderData = [];
          // 所有表格的表头
          let tableHeader = [];
          let allDistance = [];
          // console.log(params)
          // debugger
          for (let i = 0; i < params.length; i++) {
            const data = params[i].data;
            let title = [];//获取单个的表头
            const distance = [];
            for(var key in data){
              for(var val in data[key]){
                // debugger
                title.push(val);
                if(val === 'm'){
                  for(var l in data[key][val]){
                    distance.push(l)//获得距离
                  }
                };
              }
              title.unshift('距离（米）');
            }
            allDistance.push(distance);
            tableHeader.push(title);
            renderData.push(data);
          }
          this.allDistance = allDistance;
          this.tableHeader = tableHeader;
          this.renderData = renderData;
          setTimeout(()=>{
            var message = this.$refs.printall.returnHTML();
            util.print('#pageall',message);
          },100);
        },
        //筛选助听听阈信息
        filterData(data){
          let usersDat = data;
          let checkedUseraData = this.userInfo;
          let printUsersData = [];
          let printUsersOtherData = [];
          // 先清空图片信息
          // this.$store.commit('clearAllPrintImgs');
            // 获取打印的信息
            // 从选中的列表中筛选有数据的学生用于打印
            var that = this
            // debugger
            for(let i = 0; i< usersDat.length;i++){
              // for(let key in usersDat[i]){
                // console.log(usersDat[i][key])
                 for (let j = 0; j < checkedUseraData.length; j++) {
                    if(usersDat[i].user_id == checkedUseraData[j].user_id){
                      printUsersData.push(checkedUseraData[j]);
                      printUsersOtherData.push(usersDat[i]);
                      // 生成图片
                      (function(n) {
                          // setTimeout(()=>{
                            that.canvasData = [];
                            that.canvasData.push(usersDat[i].data);
                          // },50);
                          setTimeout(()=>{
                            that.$refs.tinglitu.drawyuanAll(true);
                          },50);
                      }(i));
                    }
                 }
              // }
            };
            setTimeout(()=>{
              this.printUsersOtherData = printUsersOtherData;
              this.printUsersData = printUsersData;//传递给子组件
              setTimeout(()=>{
                var message = this.$refs.printall.returnHTML();
                util.print('#pageall',message,this);
              },50);
            },50);
        },
        onSubmit(arg) {
          // console.log(JSON.stringify(arg))
          const serachdata = JSON.stringify(arg);
            this.loading = true;
            this.$ajax.post('/info/condition',{'data':serachdata}).then((response) =>{
                console.log(response);
                if(response.code === 200){
                  // 清空查询之前的状态
                  this.clearClassName();
                  this.tableData = response.data.reverse();
                  this.loading = false;
                }
            }).catch((err) =>{
                alert(err + '高级查询！')
            })
        },
        restForm(){
            this.form = {user_name: '',gender: '',min_age: '',max_age: '',garten_time:'',deaf_degree: '',teacher: '',deaf_nature: '',sc_status: '1',zpta:[],lpta:[],province:'', city:'',area:'',class_name:'',class_id:[],teacher:'',checkedTime:'',checkedRadio:'',isover:'',start_Year:'',end_Year:''};
            this.startYear = "";
            this.endYear = "";
        },
        _restContentForm(){
            this.restForm();
            this.onSubmit(this.form);
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
      section{box-sizing:border-box;
        width:100%;

          padding:10px 50px;
          .header{b
            order-bottom:3px solid #88d99f;
            ul,.td{
              min-width:220px;
              width:16.6%;
              float: left;
              height:185px;
              padding:0 10px 5px 10px;
              box-sizing:border-box;
              &>div{
                // max-width:230px;
                width:100%;
                margin:0 auto;
              }
            }
            li{
              margin-top: 10px;
              span{letter-spacing:3px;}
             }
            .td{
              
              border-right:2px solid #ccc;
              .el-form-item{
                margin-bottom: 5px;
                margin-right:0;
                width: 100%;
                .el-form-item__label{
                  border: 1px solid #bfcbd9;
                  border-right: 0px none;
                  height: 30px;
                  line-height: 30px;
                  margin-top: 3px;
                  padding:0px;
                  border-radius: 4px 0 0 4px;
                  text-align:center;
                }
              }
              h4{
                font-size: 18px;
                text-align: center;
                color: #20a0ff;
                font-weight: 600;
              }
              .el-checkbox-group .el-checkbox{
                margin:5px 0 0 10px;
              }
            }
            // 助听设备
            .product{
              text-align: center;
              font-size: 18px;
              margin: 10px 0
            }
          }
          form{
              width:100%;
              label{color:#000;}
              .name,.gender{
                  width:100%;
              }
              .zhuang{
                  width:100%;
              }
              .age-warp{
                  position: relative;
                  .tips{
                      position:absolute;
                      left:0px;
                      top:20px;
                      font-size: 12px;
                      color:red;
                      z-index:100;
                  }
              }
              .age{
                  width:100%;
              }
              .el-form-item__content{
                width: 62%;
              }
              .old-age input{
                border-radius:4px !important;
              }
              .bottom{
                  width:100%;
              }
              .el-input__inner{
                height:30px !important;
                border-radius:0 4px 4px 0;
              }
              /******查询地址*******/ 
              .address{
                width: 100%;
                select{
                  width: 31%;
                  padding:0;
                  padding-left:5px;
                  // border-radius: 0;
                  height: 30px;
                  font-size: 16px;
                  color:#333;
                  appearance:none;
                  -moz-appearance:none;
                  -webkit-appearance:none;
                }
              }
              /*********助听设备************/ 
              .el-cascader .el-input__inner{border-radius:4px;}
              /*******入园时间******/ 
              .sh-year{
                .el-date-editor.el-input{width: 100%;}
                /*******隐藏日期字体图标******/ 
                i{display: none;}
                .el-input__icon+.el-input__inner{
                  padding:3px 5px;
                }
              }
              .end-year .el-input__inner{
                border-radius:4px;
              }
              /******评估完成情况******/ 
              .isover{
                p {width: 100%;margin-bottom:2px;
                  .el-radio-group{
                    width: 100%;
                    .el-radio-button{width: 50%;}
                    .el-radio-button__inner{
                      display:block;
                      width: 100%;
                      padding:0;
                      height:35px;
                      line-height: 35px;
                    }
                  }
                }
              }
              .radio-time{
                width: 100%;
                .el-checkbox-button{width: 25%;}
                .el-checkbox-button__inner{
                  display:block;
                  width: 100%;
                  padding:0;
                  height:35px;
                  line-height: 35px;
                }
              }
            /*******多选状态PTA********/ 
            .checked-more{
              .el-select__tags > span{
                overflow: hidden;
                display:block;
                white-space: nowrap;
                width: 100%;
                height:30px;
              }
            }
          }
          /*****定义表格样式******/
          .table{
              .table-content{
                  margin-top:20px;
                  width:80%;
                  /****表格头******/ 
                  .table-title,ul{
                    width: 100%;
                    height:40px;
                    line-height: 40px;
                    text-align:center;
                    span{
                      display:inline-block;
                      width:12.5%;
                    }
                    .ch-all{
                      box-sizing: border-box;
                      display:inline-block;
                      width: 45px;
                      height:40px;
                      color:#000;
                      background-color: #fff;
                      border:1px solid #ccc;
                      border-radius:4px;
                    }
                    .em-name{
                      margin-left:-38px;
                    }
                  }
                  .table-title {
                    width: 99%;
                    background-color: #1d8ce0;
                    border-radius:5px;
                  }
                  /****表格内容******/ 
                  ul{
                    height:366px;
                    overflow:auto;
                    // border:1px solid #ccc;
                    li{
                      width: 99%;
                      border:1px solid #ccc;
                      margin:10px 0;
                      border-radius:5px;
                      box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
                    }
                    // 选中时的颜色
                    .active{
                      // -webkit-transition:all 1s ease-in 1s;
                      background:#13ce66;
                      // background-image:-webkit-radial-gradient(50%,circle,#f00,#ff0,#080);
                      -webkit-animation-name: light;
                      -webkit-animation-duration: 500ms;
                      -webkit-animation-iteration-count: 1;
                      -webkit-animation-timing-function: ease-in-out;
                      // color:#fff;
                      border:1px solid #13ce66;
                    }
                    @-webkit-keyframes light{
                      0% {
                          background:#fff;
                          // color:#000;
                          }
                      100% {
                          background:#13ce66;
                          // color:#fff;
                          }
                    }
                  }
              }
              .btn{
                margin-left: 5%;
                margin-top:3%;
                li{
                  margin-top: 10px;
                  i{
                    font-size: 22px;
                  }
                  button{width: 120px;font-size: 16px;}
                }
              }
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
