<style lang="less">
#add-zhu{   
  #remarks{
    border-radius: 5px;
    resize:none;
    width:300px;
    margin-top:10px;
    margin-left:100px;
  }
  .res{
    font-size: 16px !important;
  }
  .res-left>div{
    margin-top:10px;
    margin-left:20px;
    .degree .el-input{
      width: 65%;
    }
    span{
        height:24px;
        line-height: 24px;
    }
    .z-degree{width:110px;}
    input{
        height:26px;
    }
    div{
        margin-left:0px;
        .el-date-editor.el-input{
            width:182px;
        }
        .el-input__inner{
            height:32px;
            border-radius:0px;
            border: 1px solid #a9a9a9;
        }
        .el-input__inner:focus{
            border: 1px solid #a9a9a9;
        }
    }
  }
  .res-right{
      margin-right: 20px;
      td{
          margin-left:40px;
          input{
            width:50px;
            height: 25px;
            // padding-left:10px;
          }
          .el-input__inner{
            height:32px;
            width:100px;
            border-radius:0px;
            border: 1px solid #a9a9a9;
        }
      }
      span{
          display:inline-block;
          line-height: 24px;
          height:24px;
          margin-right:15px;
      }

  }
  textarea,input{
      outline:none;
      padding-left:10px;
  }
  .bigCanvas{
      /***display:none;***/
      position: absolute;
      padding:10px;
      left: 35px;
      top: 40px;
      width:1140px;
      height:580px;
      border-top: 1px solid #ccc;
      background-color:#fff;
    } 
    .bigCanvas-on{
      display:block;
    }
    // 点击编辑按钮
  .ibox-title{
    position: relative;
    div{
      position: absolute;
      font-size: 18px;
      border-radius:5px;
      padding:3px;
      cursor: pointer;
      top:-10px;
    }
    .l-edit{
      left:420px;
      color:red;
      border:1px solid red;
    }
    .f-edit{
      right:420px;
      color:#0000FF;
      border:1px solid #0000FF;
    }
    .r-recovery{
      right: -65px;
      border: 1px solid #ccc;
      margin-top: 70px;
    }
  }
  .big-btn{
    position: absolute;
    z-index: 20002;
    right:8px;
    top:100px;
    ul{
      li{
        margin:10px 0;
      }
    }
  }
}
</style>
<template>
    <div  id="add-zhu" class="fixed-sidebar full-height-layout" style="width:100%; height: 648px; margin:0 auto" align="left">
      <div id="page-wrapper" class="container-fluid" style="padding:5px;">
        <div class="ibox height-auto">
          <div class="ibox-title clearfix">
            <div v-if="ear.indexOf('R') > -1 ||  ear === 'A'" class="l-edit" v-on:click="_bigCanv('you')">右耳编辑</div>
            <div v-if="ear.indexOf('L') > -1 ||  ear === 'A'" class="f-edit" v-on:click="_bigCanv('zuo')">左耳编辑</div>
            <!-- <div class="r-recovery" @click="recoveryData">一键还原</div> -->
          </div>
          <div class="ibox-content" style=" height:calc(90%) ;" id="ibox">
             <!--听力图-->
             <div class="row " style="height:calc(75%)" id="row">
                <ele-svg  ref="addSvg" @newSvgDataToSave = "getNewSvgData" :svgData="resultData" :isShowInput="false" :svgId="2" :svgWidth="50" :ear='ear' :hzAaverage="hz_average" :="false" :svgHeight="'100%'" @showBigSvg ="isShowBigSvg" :svgParentId="'#add-zhu'" :bigSvgWidth="1135" :bigSvgHight="650" :isCreatedPng="true">
                </ele-svg>
             </div>
             <!--听力图结束-->
             <!-- 听力检测结果 -->
             <div class="res clearfix">
                <div class="fl res-left">
                    <div class="clearfix">
                        <span class="fl" >测听设备：</span>
                        <input id="machine" type="text" class="fl" v-model.trim="apparatus" @change="emit">
                    </div>
                    <div class="clearfix">
                      <span class="fl">测听日期：</span>
                      <div class="fl">
                        <el-date-picker 
                          v-model="updatetime"
                          type="date"
                          format="yyyy-MM-dd"
                          placeholder="选择日期"
                          @change="change">
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="clearfix">
                      <div class="fl degree">
                        <label>配合度&nbsp;&nbsp;&nbsp;：</label>
                        <el-input @focus ="_checked($event,7)" readonly="readonly" v-model="degree" placeholder="请选择配合度！"></el-input>
                      </div>
                    </div>
                </div>
                <div class="fl">
                  <textarea id="remarks" class="form-control" rows='5' placeholder="备注" v-model.trim="remark" @change="emit">                   
                  </textarea>
                </div>
                <div class="fr res-right">
                  <table class="table tl-data-table tab-border-none text-center">
                    <thead>
                      <tr>
                        <span></span>
                        <th>助听听阈</th>
                        <th>助听效果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <span>左耳：</span>
                        <td><input class="htl" readonly="readonly" type="text" v-bind:value="hz_average.LHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,9)" readonly="readonly" v-model="LEffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <span>右耳：</span>
                        <td><input class="htl" readonly="readonly" type="text" v-bind:value="hz_average.RHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,8)" readonly="readonly" v-model="REffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                    </tbody>

                  </table>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div class="big-btn" v-if="showBigSvg">
        <ul>
          <li v-if="bigleft" style="color:#0000ff;margin-bottom:20px;text-align:center;font-size:16px;font-weight:600;">
            左耳录入
          </li>
          <li v-if="!bigleft" style="color:red;margin-bottom:20px;text-align:center;font-size:16px;font-weight:600;">
            右耳录入
          </li>
        </ul>
        <ul class="clearfix" >
          <li>
            <el-button :plain="true" v-on:click="wu" type="info">无响应值</el-button>
          </li>
          <li>
            <el-button  v-on:click="_clearBigCanv" type="danger">关闭录入</el-button>
          </li>
        </ul>
      </div>
      <!-- 选择项 -->
      <ele-optionmenu ref="optionmenu" :isAllPrint="false" @toggleNum = "toggle_num" @testType="_hadCheckData" :htmlValue="hasInputValue" :curtStatus="check_value"></ele-optionmenu>
    </div>
</template>
<script>
import optionMenu from '../commonvue/option-menu.vue'
import Svg from '../commonvue/svg.vue'
export default{
  components: {
    'ele-optionmenu':optionMenu,
    'ele-svg':Svg
  },
  data () {
    return {
      bigleft:false,
      hz_average:{
        LHTL: '',
        RHTL: '',
      },
      addData:{},
      toParentSvgData:[],
      LEffect: '',
      REffect: '',
      degree:'',
      remark:'',
      apparatus:'',
      updatetime:'',
      showBigSvg:false,
      
      // 下拉菜单选项
      check_value:0,
      focusNum:0,
      hasInputValue:'',
    }
  },
  // 接收父组件传过来的数据
  props:{
    resultData:[Object,String,Array]
  },
  computed:{
    ear:function(){
      let data = this.resultData[0];
      return data.order;
    }
  },
  mounted () {
    var myDate = new Date()
    this.updatetime = myDate.toLocaleDateString()//获取当前日期
    this.$nextTick(() =>{
      // setTimeout(()=>{
      //   this.$refs.addSvg.drawyuanzhu();
      // },50);
   })
  },
  destroyed(){
  },
  methods: {
    createSVG(){
      this.$refs.addSvg.drawyuanzhu();
    },
    getNewSvgData(e){
      this.emit();
      this.toParentSvgData = e;
      // console.log(e)
    },
    _bigCanv(str){
      this.$refs.addSvg._bigCanv(str);
    },
    isShowBigSvg(e,a){
      this._hiddenPerent(false)
      a === "zuo" ? this.bigleft = true : this.bigleft = false ;
      this.showBigSvg = e;
    },
    _clearBigCanv(str){
      this.showBigSvg = false;
      this._hiddenPerent(true)
      this.$refs.addSvg._clearBigCanv();
    },
    // recoveryData(){
    //   this.$refs.addSvg.yuanshi();
    // },
    _checked(e,num){
      this.hasInputValue = typeof(e.target.value) ==='string' ? e.target.value.toString() : (e.target.innerText ? e.target.innerText : '');
      this.check_value = num;
      this.focusNum = num;
      this.$refs.optionmenu.dialogToggleVisible = true;
    },
    _hadCheckData(e){
      if(this.focusNum === 7){
        this.degree = e.name;
      }else if(this.focusNum === 8){
        this.REffect = e.name;
      }else if(this.focusNum === 9){
        this.LEffect = e.name;
      }
      this.emit();
    },
    toggle_num(e){
      this.check_value = e;
    },
    // 隐藏父元素的按钮组
    _hiddenPerent(e){
      this.$emit('hidden',e)
    },
    // 改变下方录入内容时
    change:function(e){
      this.updatetime = e;
      this.emit()
    },
    emit: function() {
      const setDate = (data)=>{
        if(data === "" || data === "请选择"){
          return "—"
        }else{
          return data
        }
      };
      var obj = {
        'degree':setDate(this.degree),
        'apparatus':setDate(this.apparatus),
        'remark':this.remark,
        'updatetime':this.updatetime,
        'LHTL':setDate(this.hz_average.LHTL),
        'RHTL':setDate(this.hz_average.RHTL),
        'LEffect':setDate(this.LEffect),
        'REffect':setDate(this.REffect)
      };
      this.$store.commit('hasTestCanvasData',obj);
    },
    wu: function () {
      this.$refs.addSvg.wu();
    },
    toParent(){
      var obj = {
        'addData':this.toParentSvgData,
      }
      this.$emit('plivate',obj);
    },
  }
}
</script>

