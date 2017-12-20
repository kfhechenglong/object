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
              <el-form-item label="状态">
                <el-radio-group v-model="form.sc_status" @change="toggle_status">
                  <el-radio-button label="1" class="in">在校</el-radio-button>
                  <el-radio-button label="0">离校</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="班级">
                <el-input @focus ="_checked($event,4)" readonly="readonly" v-model="form.class_name" placeholder="请选择班级！"></el-input>
              </el-form-item>
              <el-form-item label="班主任">
                <el-input @focus ="_checked($event,1)" readonly="readonly" v-model="teacher_name" placeholder="请选择班主任！"></el-input>
              </el-form-item>
              <el-form-item label="入园时间">
                  <el-col :span="10" class="sh-year">
                    <el-date-picker v-model="startYear" align="right" type="year" placeholder="起始年" :picker-options="pickerOptions"></el-date-picker>
                    </el-col>
                  <el-col class="line" :span="4">&nbsp;—&nbsp;</el-col>
                  <el-col :span="10" class="sh-year end-year">
                    <el-date-picker v-model="endYear" align="right" type="year" placeholder="终止年" :picker-options="pickerOptions2"></el-date-picker>
                  </el-col>
              </el-form-item>
            </div>
          </div>
          <ul class="fl">
            <div class="clearfix">
              <li class="fl"><el-button class="m-h-btn" type="success" @click="onSubmit(form)"><i class="iconfont icon-chaxun"></i>查询</el-button></li>
              <li class="fl"><el-button class="m-h-btn" @click="_restContentForm" type="danger"><i class="iconfont icon-qingchu"></i>清除</el-button></li>
            </div>
          </ul>
        </el-form>
      </div>
      <div class="table clearfix">
          <div class="fl table-content" v-loading.body="loading">
            <i v-show="checkAllText === '取消'" style="font-size:28px; color:#20a0ff;" class="check iconfont icon-quanxuan" @click="checkAll"></i>
            <i v-show="checkAllText === '全选'" style="font-size:28px;" class="check iconfont icon-qudiaoquanxuan" @click="checkAll"></i>
            <div class="table-title">
              <p>
                <span class="clearfix">
                <em class="em-name">姓名</em></span><span>性别</span><span>年龄</span><span>入校时间</span><span>离校时间</span><span>听损性质</span><span>听损程度</span><span>所在班级</span><span>班主任</span>
              </p>
            </div>
            <ul id="ul-lis">
              <li v-for="(item,index) in tableData" @click="handleSelectionLi($event,item,index)">
                <em>
                  <i style="font-size:20px;" class="iconfont icon-xuanze3"></i>
                  <i style="font-size:20px;" class="iconfont icon-unselected"></i>
                </em>
                <span>{{item.user_name}}</span><span>{{item.gender}}</span><span>{{item.age}}</span><span>{{item.garten_time}}</span><span>{{item.leave_time}}</span><span>{{item.deaf_nature}}</span><span>{{item.deaf_degree}}</span><span>{{item.class_name}}</span><span>{{item.teacher}}</span>
              </li>
            </ul>
          </div>
          <ul class="fl btn">
              <li @click="_checked($event,0)"><el-button type="info"><i class="iconfont icon-iconfontdayinji"></i>&nbsp;打印报告</el-button></li>
              <li @click="toggleClass"><el-button type="info"><i class="iconfont icon-class"></i>&nbsp;调换班级</el-button></li>
              <li @click="toggleTeacher"><el-button type="info"><i class="iconfont icon-banzhuren"></i>&nbsp;调换老师</el-button></li>
              <li @click="toggleSchool"><el-button type="info"><i class="iconfont icon-hxzfont15"></i>&nbsp;在校状态</el-button></li>
              <li @click="deleMore"><el-button type="danger"><i class="el-icon-delete2"></i>&nbsp;删除选择</el-button></li>
              <!-- <div v-for="item in imgurl">
                  <img :src="item" alt="" >
              </div> -->
          </ul>
      </div>
    </section>
    <!-- 批量打印 start -->
    <div class="print-a">
      <div  style="width:1000px;height:100%;position: absolute;left: 0px;top: 0px;z-index: -1;">
        <ele-print-all ref="printall" :data="printAllData"  :type="type" ></ele-print-all>
      </div>
    </div>
    <!-- 批量打印 end -->
    <div id="aaa" style="width:800px;height:550px;position: absolute;left: 0px;top: 0px;z-index: -1;">
      <ele-tinglitu ref="tinglitu" :objZong="canvasData"></ele-tinglitu>
    </div>
    <!-- 切换状态，班级，老师 -->
    <toggle ref="toggle" @updata="updataToggle" :data="toToggleData" :status="form.sc_status" :checkedId="checkedId" :allId="getAllStudyId"></toggle>
    <!-- 打印类型,及查询选项选择 -->
    <optionMenu ref="checkprint" @toggleNum = "toggle_num" @testType="getTestType" :teachers="teacher_list" :classNameList ="class_name_list" :form="form" :curtStatus="check_value"></optionMenu>
    <!-- 打印进度 -->
    <PrinterProgress ref="PrinterProgress" :doPrintCount="doPrintCount" :hadPrint="hadPrint" @stopTask="stopPrinterTask"></PrinterProgress>
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
import optionMenu from'./../commonvue/option-menu.vue'
import PrintAll from'./print-all.vue'
import toggle from'./toggle.vue'
import PrinterProgress from'./printer-progress.vue'
import Addclass from '../commonvue/add-class.vue'
let initYear= new Date('1900');
let stopYear = new Date();
export default {
    // 注册组件
    components:{
        Print,
        printButton,
        codeQQ,
        toggle,
        optionMenu,
        'ele-addclass':Addclass,
        'ele-tinglitu':tinglitu,
        'ele-print-all':PrintAll,
        PrinterProgress
    },
    data() {
      return {
        showPrint:false,
        showQQVisible:false,
        hidden:false,
        index:1,
        checked:true,
        teacher_name:'',
        form: {
          user_name: '',
          gender: '',
          min_age: '',
          max_age: '',
          end_Year:'',
          start_Year:'',
          deaf_degree:[],
          teacher: [],
          deaf_nature:[],
          sc_status: '1',
          zpta:[],
          lpta:[],
          eq_right:[],
          eq_left:[],
          class_name:'',
          class_id:[],
          checkedTime:[],
          checkedRadio:[],
          isover:'',
          province:'',
          city:'',
          area:''
        },
        tips:'',
        // deaf_degree: deaf_degree,
        // deaf_nature:deaf_nature,
        tableData: [],
        testType:Options.testType,
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
        // allDistance:[],
        // tableHeader:[],
        // renderData:[],
        // toneRenderData:[],
        jieguo:[],
        printAllData:[],
        valuePTA:Options.PTA,
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
        imgurl:[],
        // 打印任务的个数
        doPrintCount:0,
        hadPrint:0,
        starValue:[],
        check_value:0,
        focusNum:0,
        hasInputValue:''
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
      // 切换在校状态
        toggle_status(e){
          this.onSubmit(this.form);
        },
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
          // 离校与在校状态切换时，清空选择的样式
          if(this.toToggleData.keyType === "在校状态"){
            this.clearClassName();
          }
          this.tableData = e;
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
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要调换的对象！');return}
          const class_name = this.class_name_list;
          this.toToggleData = {
            'data':class_name,
            'keyType':'班级'
          }
          this.$refs.toggle.dialogToggleVisible = true;
        },
        // 调换在校状态
        toggleSchool(){
          if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要调换的对象！');return}
          this.toToggleData = {
            // 'data':class_name,
            'keyType':'在校状态'
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
                      this.tableData = response.data;
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
          console.log(e)
          let name = '';
          // 将非打印的选择项，转换为字符，赋值给input
          if(this.focusNum !== 0){
            name = e.map((item)=>{
              return item.name
            }).toString();
          }
          if(this.focusNum === 0){
            // 获取当前要打印的类型
            const params = {user_id:this.checkedId,type_id:e.key}
            this.type = e;
            this.getPrintInfoData(params)
            return;
          }else if(this.focusNum === 1){//选择班主任的结果
            this.teacher_name = name;
            this.form.teacher = e.map((item)=>{
              return item.name
            });
            return;
          }else if(this.focusNum === 4){//选择班级的结果
            this.form.class_name = name;
            this.form.class_id = e.map((item)=>{
              return item.class_id
            });
          }
        },
        _checked(e,num){
          this.check_value = num;
          this.focusNum = num;
          if(num === 0){
            if(this.checkedId.length === 0){ msgTipsErr(this,'请选择要打印的对象！');return}
            // 判断打印机是否正常
            const next = ()=>{
                this.$refs.checkprint.dialogToggleVisible = true;
            };
            util.getPrint(this,next);
            // 终止打印任务开关
            this.noTask = true;
            return;
          }else{
            this.$refs.checkprint.dialogToggleVisible = true;
          }
        },
        toggle_num(e){
          this.check_value = 0;
        },
        printMore(){//批量打印
        },
        // 请求选择学生的打印数据，并判断被选中的学生是否有可以被打印的数据
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
                    const h = this.$createElement;
                    if(typeof(users) == "undefined"){
                      this.$confirm("学生"+notData+'暂无信息！', '提示', {
                        type: 'warning',
                        message: h('p',null, [
                        h('div', null, [
                        h('span',null,'学生'),
                        h('strong',{style:'color:red;overflow: hidden;word-wrap:break-word;'},notData),
                        h('span',null,'暂无信息！'),
                        ])]),
                      })
                    }else{
                      this.$confirm("学生"+notData+'暂无信息，是否继续打印其他学生信息？', '提示', {
                        type: 'warning',
                        message: h('p',null, [
                        h('div', null, [
                        h('span',null,'学生'),
                        h('strong',{style:'color:red;overflow: hidden;word-wrap:break-word;'},notData),
                        h('span',null,'暂无信息，是否继续打印其他学生信息？'),
                        ])]),
                      }).then(()=>{//继续打印
                          this.filterData(users);
                      })
                    }
                }else{
                    this.filterData(users);
                }
                if(users){
                    // 传送打印的总任务个数
                    this.doPrintCount = users.length;
                }
            }
          }).catch((err)=>{
            console.log(err +"批量打印请求错误！")
          })
        },
        //筛选助听听阈信息
        filterData(data){
            let usersDat = data;
            let checkedUseraData = this.userInfo;
            let that = this
            let getPrintDataArray = new Array;
            for(let i = 0; i< usersDat.length;i++){
              for (let j = 0; j < checkedUseraData.length; j++) {
                if(usersDat[i].user_id == checkedUseraData[j].user_id){
                  // 生成图片
                    let obj = {};
                    obj.chededData = new Array(checkedUseraData[j]);
                    obj.OtherData = new Array(usersDat[i]);
                    if(this.type.key != 6 && usersDat[i].accuracy){
                        obj.accuracy = new Array(JSON.parse(usersDat[i].accuracy));
                    }
                    getPrintDataArray.push(obj)
                }
              }
            };
            let waitms = function(x) {
                return new Promise(function(resolve, reject) {
                    resolve();
                });
            };
            let count = 0;
            // 助听听阈
            let dowork = function(item){
                return setSvgData (item.OtherData).then(() =>{
                    return drawSvg()
                }).then(() =>{
                    return printDom(item)
                }).then(() =>{
                    return util.canvas2html('toimg' +0,that);
                }).then(() =>{
                    // 记录当前的打印任务个数
                    count++;
                    that.hadPrint = count;
                    // 查询打印任务
                    return lookPrinterWork()
                }).catch((err) =>{//捕获异常
                    console.log(err);
                })
            };
            // 音素测听
            let dowork_tone = (item) =>{
                return printDom(item)
                .then((str) =>{
                    if(this.type.key == 1){//林氏六音报告单
                      return new Promise((resolve,reject) =>{
                            const get_data = util.todoliudata(str);
                            resolve(get_data)
                        })
                    }else{//音素测听报告单
                      return new Promise((resolve,reject) =>{
                            const get_tone_data = util.todotonedata(str);
                            resolve(get_tone_data)
                        })
                    }
                }).then((str) =>{
                    return new Promise((resolve,reject) =>{
                      const obj = {
                        ...str,
                        'userText' : this.printUsersOtherData[0],
                        'userInfo' : this.printUsersData[0],
                        'jieguo': this.jieguo[0]
                      };
                      // 生成数据，传递给子组件渲染
                      this.printAllData.push(obj);
                      resolve()
                    });
                }).then(() =>{
                    return util.canvas2html('toimg' + 0,this);
                }).then(() =>{
                    // 记录当前的打印任务个数
                    count++;
                    this.hadPrint = count;
                    // 查询打印任务
                    return lookPrinterWork()
                }).catch((err) =>{//捕获异常
                    console.log(err);
                })
            };
            // 获取听力图的数据
            function setSvgData (params){
                return new Promise((resolve,reject) =>{
                    that.canvasData = [];
                    that.canvasData.push(JSON.parse(params[0].data));
                    resolve();
                })
            };
            // 绘制听力图
            function drawSvg (){
                return new Promise((resolve,reject) =>{
                    that.$store.commit('clearAllPrintImgs',null);
                    setTimeout(()=>{
                      that.$refs.tinglitu.drawyuan(true);
                      resolve();
                    },50)
                })
            };
            // 生成打印dom数据
            function printDom(params){
                return new Promise((resolve,reject) =>{
                    setTimeout(()=>{
                        let printUsersData = params.chededData;
                        let printUsersOtherData = params.OtherData;
                        that.printUsersOtherData = printUsersOtherData;
                        that.printUsersData = printUsersData;//传递给子组件
                        if(that.type.key !== 6 && params.accuracy){
                          const accuracy = params.accuracy;
                          if(Object.prototype.toString.call(accuracy) === '[object String]'){
                            that.jieguo = JSON.parse(accuracy)
                          }else{
                            that.jieguo = accuracy;
                          }
                        }else if(that.type.key === 6){
                          // debugger
                          const obj = {
                            'userText' : that.printUsersOtherData[0],
                            'userInfo' : that.printUsersData[0]
                          };
                          that.printAllData.push(obj)
                        }
                        resolve(printUsersOtherData);
                    },0)
                })
            };
            // 查看打印任务列表
            function lookPrinterWork(){
                return new Promise((resolve,reject) =>{
                    // 递归函数，若任务列表个数小于5则继续进行循环，否则暂停循环
                    function recursion(){
                        setTimeout(() =>{
                            that.$ajax.post('/index/printer',{printer:1}).then((res) =>{
                              if(res.data){
                                 const length = res.data.data.length;
                                // 判断任务列表个数
                                if(length > 5){
                                    recursion();
                                }else{
                                    //终止任务
                                    if(that.noTask){resolve()}
                                }
                              }else{
                                resolve()
                              }
                            })
                        },200)
                    }
                    recursion();
                })
            };
           
            // 循环生成每个打印报告单，并依次发送至后台服务器
            const print = ()=>{
                return new Promise((resolve,reject) =>{
                    let p = waitms();
                    getPrintDataArray.forEach((item)=>{
                        p = p.then(()=>{
                        // 生成打印的数据数组对象
                          this.printAllData = new Array();
                            if(this.type.key === 6){//助听听阈报告
                                return dowork(item)
                            }else{//音素类报告
                                return dowork_tone(item)
                            }
                        });
                    });
                    // 调用弹框，显示打印进度
                    this.$refs.PrinterProgress.show();
                    resolve()
                })
            };
             // 每次打印前先删除之前保留的打印数据
            util.clearPrintData(this,print);
            return;
        },
        // 终止打印机任务
        stopPrinterTask(){
            this.noTask = false;
        },
        onSubmit(arg) {
          const serachdata = JSON.stringify(arg);
            this.loading = true;
            this.$ajax.post('/info/condition',{'data':serachdata}).then((response) =>{
                console.log(response);
                if(response.code === 200){
                  // 清空查询之前的状态
                  this.clearClassName();
                  this.tableData = response.data;
                  this.loading = false;
                }
            }).catch((err) =>{
                alert(err + '高级查询！')
            })
        },
        restForm(){
            this.form = {user_name: '',gender: '',min_age: '',max_age: '',garten_time:'',deaf_degree: '',teacher: '',deaf_nature: '',sc_status: '1',zpta:[],lpta:[],province:'', city:'',area:'',class_name:'',class_id:[],teacher:'',checkedTime:'',checkedRadio:'',isover:'',start_Year:'',end_Year:''};
            this.startYear = "";
            this.teacher_name = "";
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
            .td{
              min-width:220px;
              width:80%;
              float: left;
              height:100px;
              padding:0 10px 5px 10px;
              box-sizing:border-box;
              &>div{
                // max-width:230px;
                width:100%;
                margin:10px auto;
              }
            }
              /*******清空与查询按钮*****/ 
            li{
              margin-top: 9px;
              margin-left:20px;
              .el-button{font-size: 16px;padding: 13px 18px;}
             }
            .td{
              
              // border-right:2px solid #ccc;
              .el-form-item{
                margin-bottom: 5px;
                margin-right:20px;
                width: 22%;
                .el-form-item__label{
                  border: 1px solid #bfcbd9;
                  border-right: 0px none;
                  height: 45px;
                  line-height: 45px;
                  // margin-top: 3px;
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
              label{color:#000;font-size: 16px;}
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
                height:45px !important;
                border-radius:0 4px 4px 0;
              }
              /******在校状态*********/ 
              .in .el-radio-button__inner{
                border-radius:0;
              }
              .el-form-item .el-radio-button__inner{
                padding: 14.5px 15px;
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
                  margin-left:40px;
                  position: relative;
                  /******全选按钮*******/  
                  .check{
                    display:inline-block;
                    height:50px;
                    width:50px;
                    border-radius: 5px 0 0 5px;
                    line-height: 50px;
                    background: #fff;
                    text-align:center;
                    position: absolute;
                    left:1px;
                    top:1px;
                    cursor: pointer;
                  }
                  /****表格头******/ 
                  .table-title,ul{
                    width: 100%;
                    height:40px;
                    line-height: 40px;
                    text-align:center;
                    
                  }
                  ul{
                    span{
                      display:inline-block;
                      // width:12.5%;
                      width:11.11%;
                    }
                  }
                  .table-title p>span{
                      display:inline-block;
                      // width:12.5%;
                      width:11.11%;
                  }
                  .table-title {
                    width:calc(~"99% - 50px");
                    padding-left:50px;
                    border: 1px solid #1d8ce0;
                    background-color: #1d8ce0;
                    border-radius:5px;
                    height:50px;
                    line-height: 50px;
                    font-weight: 600;
                    color: #fff;
                    font-size: 18px;
                    letter-spacing: 2px;
                    .ch-all{
                      box-sizing: border-box;
                      display:inline-block;
                      width: 50px;
                      height:50px;
                      color:#000;
                      background-color: #fff;
                      border:1px solid #ccc;
                      border-radius:4px;
                    }
                    .em-name{
                      font-weight: 600;
                      margin-left:-10px;
                    }
                  }
                  /****表格内容******/ 
                  ul{
                    height:366px;
                    overflow:auto;
                    // border:1px solid #ccc;
                    li{
                      width:calc(~"99% - 50px");
                      padding-left:50px;
                      border:1px solid #ccc;
                      margin:10px 0;
                      border-radius:5px;
                      box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
                      position: relative;
                      cursor: pointer;
                      /******每行的选择框*******/ 
                      em{
                        position: absolute;
                        left:0px;
                        top:0px;
                        border-radius:5px 0 0 5px;
                        background:#fff;
                        display:inline-block;
                        width:50px;
                      }
                      .icon-unselected{
                        display:block;
                      }
                      .icon-xuanze3{
                        display:none;
                      }
                    }
                    /*******active状态下选择款的样式*******/
                    .active {
                      .icon-unselected{
                        display:none;
                      }
                      .icon-xuanze3{
                        display:block;
                        color:#20a0ff;
                      }
                    }
                    // 选中时的颜色
                    .active{
                      // -webkit-transition:all 1s ease-in 1s;
                      background:#13ce66;
                      // background-image:-webkit-radial-gradient(50%,circle,#f00,#ff0,#080);
                      -webkit-animation-name: morelight;
                      -webkit-animation-duration: 500ms;
                      -webkit-animation-iteration-count: 1;
                      -webkit-animation-timing-function: ease-in-out;
                      // color:#fff;
                      border:1px solid #13ce66;
                    }
                    @-webkit-keyframes morelight{
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
    }
</style>
