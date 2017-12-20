<style  lang="less">
#add-svg{
  // width:1250px;
  height:650px;
  margin:0 auto;
  /******测试方法选择******/ 
  .test-add-model{
    line-height: 30px;
    font-size: 18px;
    margin-bottom:10px;
    li{
      float: left;
      margin-left:20px;
      input{
        height:20px;
      }
      /**********助听设备***********/ 
      .el-input{
        width: 160px;
      }
      /******测试方法***********/ 
      .el-input__inner{
        height:26px !important;
        border-radius:0px;
        // border: 1px solid #a9a9a9;
        width:160px !important;
        padding-left:5px !important;
      }
      .el-input__inner:focus{
          border: 1px solid #a9a9a9;
      }
    }
  }
  /*******放大图的按钮组********/ 
  .big-btn{
    position: absolute;
    z-index: 20002;
    right:35px;
    top:100px;
    ul{
      li{
        margin:10px 0;
      }
    }
    /****单选组*****/ 
    .el-radio-button__inner{
      border-radius:4px;
      border:1px solid #bfcbd9;
      padding:10px 0;
      width:100%;
    }
    .el-radio-button{
      display:block;
      margin:10px 0;
    }
    .el-radio-group{
      margin:15px 0;
    }
    .el-button{
      padding: 10px 0;
      width:100%;
    }
  }
  .tl-data-table tr input {
    height: 22px;
    padding-left: 3px;
    margin: 0;
    width: 25px;
  } 
}
/******无背景图******/ 
.ibox-title-row{
    position: relative;
    cursor:pointer;
    width:120px;
    height: 35px;
    line-height: 35px;
    text-align:center;
    border: 1px solid #ccc;
    // margin-right: 10px;
    &:hover{
      color:#20a0ff;
    }
    .arrows{
      font-size: 14px;
      position: absolute;
      right:5px;
      top:12px;
      transform: rotate(0);
      transition: transform .4s ease-in-out;
    }
    .arrowsActive{
      right:3px;
      transform: rotate(180deg);
    }
  }
  .addtu{
    .ibox-content{
      padding-top:10px;
    }
    .c-btn{
      margin-left:10px;
      width:10%;
      margin-top:200px;
    }
    .btn-group-lg{
      li{
        margin-top:10px;
        /******复制到另一侧*****/ 
        button{
          width:120px;
          height:40px;
          cursor:pointer;
        }
      }
    }
    #save{
      width:100px;
      height:40px;
      cursor:pointer;
      color:#fff;
      background-color:#22c6c6; 
      font-size: 18px;
      margin:30px;
    }
    .row-info{
      padding:0 20px;
      li{
        margin-left:0px;
        .el-date-editor.el-input{
            width:182px;
        }
        .el-input__inner{
            height:26px;
            border-radius:0px;
            border-radius:0px;
            border: 1px solid #a9a9a9;
        }
        .el-input__inner:focus{
            border: 1px solid #a9a9a9;
        }
      }
      .degree{
        .el-input{
          width:70%;
        }
      }
    }
    .row-marks{
      margin:10px 40px;
      textarea{width:300px !important;font-size: 16px;padding-left:5px;}
    }
    .row ul{
      margin-top:14px;
      li{
        margin-top:10px;
      }
    }
    .row tr .el-input{
      input{
      }
      .el-input__inner{
        height:28px !important;
        border-radius:0px;
        border: 1px solid #a9a9a9;
        width:100px !important;
        padding-left:5px !important;
      }
      .el-input__inner:focus{
          border: 1px solid #a9a9a9;
      }
    }
    .clear{
       clear:both;
    }
    /******放大图******/
    .bigCanvas{
      /***display:none;***/
      position: absolute;
      padding:10px;
      left: 0px;
      top: 0px;
      width:1280px;
      height:720px;
      border-top: 1px solid #ccc;
      background-color:#fff;
    } 
    .bigCanvas-on{
      display:block;
    }
  }
</style>
<template>
    <div  id="add-svg" class="fixed-sidebar addtu full-height-layout">
      <div id="page-wrapper" class="container-fluid" style="padding:5px;">
        <div class="ibox height-auto">
          <div class="test-add-model">
            <ul class="clearfix">
              <li>助听设备：</li>
              <li><span>左：</span>
                <el-input @focus ="_check_product($event,'left')" readonly="readonly" v-model="eq_left.string" placeholder="请选择助听设备！"></el-input>
              </li>
              <li><span>右：</span>
                <el-input @focus ="_check_product($event,'right')" readonly="readonly" v-model="eq_right.string" placeholder="请选择助听设备！"></el-input>
              </li>
              <li><span>测试方法：</span>
                  <el-input @focus ="_checked($event,5)" readonly="readonly" v-model="testModel" placeholder="请选择测试方法！"></el-input>
              </li>
              <li><span>测试音：</span>
                <el-input @focus ="_checked($event,6)" readonly="readonly" v-model="tone" placeholder="请选择测试音！"></el-input>
              </li>
            </ul>
          </div>
          <!-- 听力图部分 -->
          <div class="ibox-content" style=" height:calc(100% - 30px);width:100%;" id="ibox">
             <!--听力图-->
             <div class="row clearfix" style="height:80%;" id="row">
                 <!--右耳听力图-->
                <ele-svg  ref="addSvg" @newSvgDataToSave = "getNewSvgData" :isShowInput="true" :svgId="1" :hzAaverage="hz_average" :svgMarks="canvasMarks" :svgHeight="'100%'" :ear="ear" :svgWidth="43" @showBigSvg ="isShowBigSvg" :svgParentId="'#add-svg'">
                  <!--功能按钮-->
                  <div class=" c-btn fl ">
                    <div style="text-align:center">
                      <ul class=" btn-group-vertical btn-group-lg " role="group">
                        <!-- <li class="ibox-title-row">
                          <i :class="[{arrowsActive:showNew},'el-icon-caret-bottom','arrows']"></i>
                          <div  v-if="!showNew" @click="addImg"> 无背景图</div>
                          <div  v-if="showNew" @click="removeImg"> 言语香蕉图</div> 
                        </li> -->
                        <li>
                          <button type="button" class="" title="复制到另一侧耳朵" id="copy" v-on:click="copy"><i class="fa fa-exchange" style="font-size:20px;"></i></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ele-svg>
             </div>
             <!--听力图结束-->
             <!-- 听力检测结果 -->
             <div class="row clearfix ">
                <div class="row-info fl">
                  <ul class="dl-horizontal dl-80">
                    <li>
                      <label for="machine">测听设备：</label>
                      <input id="machine" type="text" style="height:22px; padding:0 5px;" v-model="shebei">
                    </li>
                    <li style="margin-top:10px;" class="degree">
                      <label>配合度&nbsp;&nbsp;&nbsp;：</label>
                      <el-input @focus ="_checked($event,7)" readonly="readonly" v-model="degree" placeholder="请选择配合度！"></el-input>
                    </li>
                    <li style="margin-top:10px;">
                      <span>测听日期：</span>
                      <el-date-picker 
                          v-model="updatetime"
                          type="date"
                          format="yyyy-MM-dd"
                          placeholder="选择日期"
                          @change="change"
                          :picker-options="pickerOptions0"
                        >
                      </el-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="row-marks fl">
                  <textarea id="remarks" class="form-control" rows='4' placeholder="备注：" v-model.trim="beizhu">
                  </textarea>
                </div>
                <div class="fl">
                  <table class="table tl-data-table tab-border-none text-center" style="width:320px; margin:0 auto;">
                    <thead>
                      <tr>
                        <th></th>
                        <th>AC</th>
                        <th>BC</th>
                        <th>助听听阈</th>
                        <th>助听效果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>左耳3频率</td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.ACL"></td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.BCL"></td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.LHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,9)" readonly="readonly" v-model="LEffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td>右耳3频率</td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.ACR"></td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.BCR"></td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="hz_average.RHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,8)" readonly="readonly" v-model="REffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 多选按钮组结束 -->
                <div v-if="add">
                  <el-button id="save" class="fr" type="success" @click.native="_tosave('add')">保存录入</el-button>
                </div>
                <div v-else>
                  <el-button id="save" class="fr" type="success" @click.native="_tosave('edit')">保存编辑</el-button>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div class="big-btn" v-if="showBigSvg">
        <ul>
          <li v-if="bigleft" style="color:#0000ff;text-align:center;font-size:16px;font-weight:600;">
            左耳录入
          </li>
          <li v-if="!bigleft" style="color:red;text-align:center;font-size:16px;font-weight:600;">
            右耳录入
          </li>
        </ul>
        <el-radio-group v-model="active" fill="#60b45d" text-color="#fff" @change="toggle">
          <el-radio-button  id="qidao" label="0">
            <i id="qidao-L" class="testicon testicon-AC-L font-color-blue" ></i>气&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导<i  id="qidao-R" class="testicon testicon-AC-R font-color-red" ></i>
          </el-radio-button>
          <el-radio-button id="gudao" label="1">
            <i id="gudao-L" class="testicon testicon-BC-L font-color-blue"></i>骨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导<i id="gudao-R" class="testicon testicon-BC-R font-color-red"></i>
          </el-radio-button>
          <el-radio-button  id="shushiyu" label="2">
            <i id="shushiyu-L" class="testicon testicon-MCL font-color-blue"></i>舒&nbsp;&nbsp;适&nbsp;&nbsp;阈<i id="shushiyu-R" class="testicon testicon-MCL font-color-red"></i>
          </el-radio-button>
          <el-radio-button  id="bushiyu" label="3">
            <i id="bushiyu-L" class="testicon testicon-UCL font-color-blue"></i>不舒适阈<i id="bushiyu-R" class="testicon testicon-UCL font-color-red"></i>
          </el-radio-button>
          <el-radio-button v-if="ear == 'A'" id="tingyu" label="5">
            <i id="tingyu-L" class="testicon testicon-FF-S font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-S font-color-red"></i>
          </el-radio-button>
          <el-radio-button v-else id="tingyu" label="5">
            <i id="tingyu-L" class="testicon testicon-FF-L font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-R font-color-red"></i>
          </el-radio-button>
        </el-radio-group>
        <ul class="clearfix" >
          <li>
            <el-button :plain="true" v-on:click="yan" type="info">加&nbsp;&nbsp;掩&nbsp;&nbsp;蔽</el-button>
          </li>
          <li>
            <el-button :plain="true" v-on:click="wu" type="info">无&nbsp;&nbsp;响&nbsp;&nbsp;应</el-button>
          </li>
          <li style="margin-top:30px;">
            <el-button  v-on:click="_clearBigCanv()" type="danger">关闭录入</el-button>
          </li>
        </ul>
      </div>
      <!-- 选择助听设备 -->
      <ele-product ref="product" @productData = "productData" :initProductData="initProductData"></ele-product>
      <!-- 选择项 -->
      <ele-optionmenu ref="optionmenu" :isAllPrint="false" @toggleNum = "toggle_num" @testType="_hadCheckData" :htmlValue="hasInputValue" :curtStatus="check_value"></ele-optionmenu>
    </div>
    
</template>

<script>
import {mapState} from'vuex'
import Product from '../../commonvue/product.vue'
import optionMenu from '../../commonvue/option-menu.vue'
import Svg from '../../commonvue/svg.vue'
export default{
  name: 'add',
  components: {
    'ele-product':Product,
    'ele-optionmenu':optionMenu,
    'ele-svg':Svg
  },
  data(){
    return {
      showNew:true,
      bigleft:false,
      showBigSvg:false,
      add:true,
      active:'5',
      updatetime:'',
      hz_average:{
        BCL: '',
        ACL:'',
        ACR:'',
        LHTL: '',
        BCR: '',
        RHTL: '',
      },
      beizhu:'',
      shebei:'',
      REffect:'',
      LEffect:'',
      degree:'',
      testModel:'',
      tone:'',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7 + 24*60*60*1000;
        }
      },
      eq_left:{'string':'','array':[]},
      eq_right:{'string':'','array':[]},
      initProductData: {},
      // 下拉菜单选项
      check_value:0,
      focusNum:0,
      hasInputValue:'',
      ear:"RL"
    }
  },
  props:{
    objZong:null,
    id:null
  },
  mounted(){
    var myDate = new Date()
    this.updatetime = myDate.toLocaleDateString();//获取当前日期
  },
  computed:{// 获取产品列表
    ...mapState(['canvasMarks'])
  },
  methods:{
    _checked(e,num){
      this.hasInputValue = typeof(e.target.value) ==='string' ? e.target.value.toString() : (e.target.innerText ? e.target.innerText : '');
      this.check_value = num;
      this.focusNum = num;
      this.$refs.optionmenu.dialogToggleVisible = true;
    },
    _hadCheckData(e){
      if(this.focusNum === 5){
        this.testModel = e.name;
      }else if(this.focusNum === 6){
        this.tone = e.name;
      }else if(this.focusNum === 7){
        this.degree = e.name;
      }else if(this.focusNum === 8){
        this.REffect = e.name;
      }else if(this.focusNum === 9){
        this.LEffect = e.name;
      }
    },
    toggle_num(e){
      this.check_value = e;
    },
    // 获取设备的名称
    productData(e){
      const arr = e.map((item) =>{
        return item.value;
      });
      const string = e.map((item) =>{
        return item.label
      }).toString().replace(/,/g,' / ');
      if(this.earSide === 'left'){
        this.eq_left.string = string;
        this.eq_left.array = arr;
      }else if(this.earSide === 'right'){
        this.eq_right.string = string;
        this.eq_right.array = arr;
      }
    },
    // 选择设备
    _check_product(e,str){
      let string = "",arr = [];
      if(str === 'left'){
        string = this.eq_left.string;
        arr = this.eq_left.array;
      }else if(str === 'right'){
        string = this.eq_right.string;
        arr = this.eq_right.array;
      }
      this.initProductData = {
        'string':string,
        'array':arr
      };
      this.earSide = str;
      this.$refs.product.dialogProductVisible = true;
    },
    change:function(e){
      this.updatetime = e;
    },
    isShowBigSvg(e){
      this.showBigSvg = e;
    },
    _saveSuccess(e){
      console.log(e)
    },
    addImg(){
      this.showNew = !this.showNew;
      this.$refs.addSvg.addImg();
    },
    removeImg(){
      this.showNew = !this.showNew;
      this.$refs.addSvg.removeImg();
    },
    copy(){
      this.$refs.addSvg.copy();
    },
    _clearBigCanv(str){
      this.showBigSvg = false;
      this.active = "5";
      this.$refs.addSvg._clearBigCanv();
    },
    toggle: function (evt) {
      this.$refs.addSvg.toggle_btn(evt)
    },
    yan: function () {
      this.$refs.addSvg.yan();
    },
    // 添加无响应
    wu: function () {
      this.$refs.addSvg.wu();
    },
    // 添加不可测量
    bu: function () {
      this.$refs.addSvg.bu();
    },
    editor(){
      this.add = false;
      // 如果数据保存的是"—"则转换成""
      const setDate = (data)=>{
          return (data === "—") ? "" : data;
      };
      try{
        const svgData = JSON.parse(JSON.stringify(this.canvasMarks));
        this.beizhu= svgData.remark;
        this.shebei= setDate(svgData.apparatus);
        this.REffect= setDate(svgData.REffect);
        this.LEffect= setDate(svgData.LEffect);
        this.degree= setDate(svgData.degree);
        this.tone = setDate(svgData.tonetype);
        this.testModel = setDate(svgData.testmodel);
        this.eq_right = svgData.eq_right;
        this.eq_left = svgData.eq_left;
        this.updatetime = svgData.updatetime;
        this.hz_average.BCL = setDate(svgData.BCL);
        this.hz_average.BCR = setDate(svgData.BCR);
        this.hz_average.ACL = setDate(svgData.ACL);
        this.hz_average.ACR = setDate(svgData.ACR);
        this.hz_average.LHTL = setDate(svgData.LHTL);
        this.hz_average.RHTL = setDate(svgData.RHTL);
      } catch(err){
        console.log(err +'读取数据出错！')
      }
      this.ear = JSON.parse(this.canvasMarks.data)[0].order;
      this.$refs.addSvg._editor_drawyuan();
    },
    // 获取svg数据
    getNewSvgData(e){
      this.svgData = e;
    },
    // 保存数据
    _tosave(ags){
      const getData = () =>{
        return new Promise((resolve,reject) =>{
          this.$refs.addSvg._saveShowData();//生成听力图数据
          resolve()
        })
      };
      getData().then(()=>{
        // 如果数据为空或者是"请选择"，则保存成"—"
        const setDate = (data)=>{
          return (data === "" || data === "请选择") ? "—" : data ;
        };
        let INFO_DATA = {
          "user_id":JSON.parse(sessionStorage.getItem('user_id')),
          'remark':this.beizhu,
          'updatetime':this.updatetime,
          'apparatus':setDate(this.shebei),
          'REffect':setDate(this.REffect),
          'LEffect':setDate(this.LEffect),
          'degree':setDate(this.degree),
          'tonetype':setDate(this.tone),
          'testmodel':this.testModel,
          'getmodel':'自由给声',
          'eq_left':setDate(this.eq_left),
          'eq_right':setDate(this.eq_right),
        }
        const hz = this.hz_average;
        let getServer = {
          "audio":{
            ...hz,
            ...INFO_DATA
          },
          "hear":JSON.stringify(this.svgData)
        }
        console.log(getServer);
        if(ags === 'add'){
          this._api(`/audiogram/add`,getServer)
        }else{
          let data = {
            'audio_id' :this.id[0],
            ...getServer
          };
          this._api(`/audiogram/update`,data)
        }
      })
    },
    _api(url,data){
      this.$ajax.post(url,data).then((response)=>{
        console.log(response)
        if(response.code == "200"){
            msgTipsSuccess(this,'提交成功!');
            //给父组件发送指令关闭窗口，请求数据列表
            this.$emit('successSave',true);
        }else{
          msgTipsErr(this,'提交失败!');
        }
      }).catch((error)=>{
          console.log(error);
      })
    },
    Close(){//关闭录入听力图时的回调
      this.ear = "RL"
      this.add = true;
      this.active = '5';
      this.hz_average = {
        BCL: '',
        ACL:'',
        ACR:'',
        LHTL: '',
        BCR: '',
        RHTL: '',
      },
      this.beizhu= '';
      this.shebei= '';
      this.REffect= '';
      this.LEffect= '';
      this.degree= '';
      this.tone = '';
      this.testModel = '';
      this.initProductData = {};
      this.eq_left = {'string':'','array':[]};
      this.eq_right = {'string':'','array':[]};
      this.updatetime = (new Date()).toLocaleDateString();
      this.$refs.addSvg._befroeClose();
      this.showBigSvg = false;
    },
  }
}
</script>

