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
    margin-top: 30px;
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
  .ibox-title{
    position: relative;
    h3{
        margin-left:22%;
        margin-right:22%;
        margin-bottom:10px;
        color:blue;
        &:first-child{
            color:red;
        }
    }
    div{
      position: absolute;
      font-size: 18px;
      border-radius:5px;
      padding:3px;
      cursor: pointer;
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
            <h3 class="fl">右耳</h3> 
            <div class="l-edit" v-on:click="_bigCanv('you')">右耳编辑</div>
            <div class="f-edit" v-on:click="_bigCanv('zuo')">左耳编辑</div>
            <h3 class="fr">左耳</h3>
          </div>
          <div class="ibox-content" style=" height:calc(80%) ;" id="ibox">
             <!--听力图-->
             <div class="row " style="height:calc(70%)" id="row">
                 <!--右耳听力图-->
                <div class="fl " style="height:100%;width:500px">
                  <div id="youer" style="border:1px solid #eee; height:100%;" v-on:click="_bigCanv('you')">
                  </div>
                </div>
                <!--左耳听力图-->
                <div class=" fr" style="height:100%;width:500px">
                  <div id="zuoEr" style="border:1px solid #eee;height:100%;" v-on:click="_bigCanv('zuo')">
                  </div>
                </div>
                <!--听力图数据表结束-->
             </div>
             <!--听力图结束-->
             <!-- 听力检测结果 -->
             <div class="res clearfix">
                <div class="fl res-left">
                    <div class="clearfix">
                        <span class="fl">测听设备：</span>
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
                                @change="change"
                              >
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
                        <td><input class="htl" readonly="readonly" type="text" v-bind:value="LHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,9)" readonly="readonly" v-model="LEffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <span>右耳：</span>
                        <td><input class="htl" readonly="readonly" type="text" v-bind:value="RHTL"></td>
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
          <li v-if="bigleft">
            <el-button  v-on:click="_clearBigCanv('zuo')" type="danger">关闭录入</el-button>
          </li>
          <li v-if="!bigleft">
            <el-button  v-on:click="_clearBigCanv('you')" type="danger">关闭录入</el-button>
          </li>
        </ul>
      </div>
      <!-- 选择项 -->
      <ele-optionmenu ref="optionmenu" :isAllPrint="false" @toggleNum = "toggle_num" @testType="_hadCheckData" :htmlValue="hasInputValue" :curtStatus="check_value"></ele-optionmenu>
    </div>
</template>
<script>
var addData = []
var objZong;
// 听力图 图标对照
var fontarray = {'SFRN': 'a','SFLN': 'a', 'SFR': 'b', 'SFL': 'b', 'SFLM': 'c', 'SFRM': 'd', 'UCLLN': 'e', 'UCLRN': 'e', 'UCLL': 'f', 'UCLR': 'f', 'FFL': 'g', 'FFR': 'h', 'FFS': '8', 'FFLN': ',', 'FFRN': '9', 'FFSN': '.', 'MCLLN': 'i','MCLRN': 'i', 'MCLL': 'j', 'MCLR': 'j', 'BCLMC': 'k', 'BCLMN': 'l', 'BCLM': 'm', 'BCLC': 'n', 'BCLN': 'o', 'BCL': 'p', 'BCRMC': 'q', 'BCRMN': 'r', 'BCRM': 's', 'BCRC': 't', 'BCRN': 'u', 'BCR': 'v', 'ACLMC': 'w', 'ACLMN': 'x', 'ACLM': 'y', 'ACLC': 'z', 'ACLN': '4', 'ACL': '5', 'ACRMC': '6', 'ACRMN': '7', 'ACRM': '0', 'ACRC': '1', 'ACRN': '2', 'ACR': '3','FFLM': 'g', 'FFRM': 'h'}
var arrayY = ['-10', ' 0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
// var arrayXxia = ['750', '1500', '3000', '6000']
var arrayX = ['125', '250', '500', '1k', '2k', '4k', '8k', '16k']
var arrayXxia = ['750', '1.5k', '3k', '5k', '6k', '9k']
var arrayX2 = ['125', '250', '500', '1000', '2000', '4000', '8000', '16000']
var arrayXxia2 = ['750', '1500', '3000', '5000', '6000', '9000']
// x轴上显示坐标x值
var arrayXcoordinate = []
// y轴上显示坐标y值
var arrayYcoordinate = []
// 下方x轴上显示坐标x值
var arrayXxiaCoordinate = []

var tip = 5 // y轴可画线间距
var arrayYline = function (tip) {
  var data = []
  for (var i = -10; i <= 120;) {
    data.push(i)
    i = i + tip
  }
  return data
}
// y轴上所有的坐标听力值
var arrayYline1 = arrayYline(tip)
// y轴上所有的坐标值的像素值
var arrayYline2 = []
// 画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
var arrayyuan = []
// 左耳画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
var arrayyuanzuo = []
// 画布上鼠标坐标
var mycanvasx
var mycanvasy
// 坐标轴上坐标点之间的相差像素
var xcha
var ycha
// 插入svg 需要引用的
var ming = 'http://www.w3.org/2000/svg'
var XLINK_NS = 'http://www.w3.org/1999/xlink'
var ATTR_MAP = {
  'className': 'class',
  'svgHref': 'href'
}
var NS_MAP = {
  'svgHref': XLINK_NS
}
// 添加svg标签
var svgYou
var svgZuo
// svg下字体标签
var svgText
// svg下画线标签
var svgLine
// svg下 g标签鼠标移动 下加重线
var gMove
// svg下 g标签画听力图
var gTu
// 是否已经有言语图
var addImgIf = false
// 是否能画图的标记
var qidao = false
var gudao = false
var shushiyu = false
var bushiyu = false
var shengchang = false
var tingyu = true
//
var wufanying = false
var yanbi = false
var buke = false
// 听力节点类型
var dataType2
// 记录font的标记
var fontSign = 'FF'
var fontMask
// input 标记
// var inputSign = 'q'


var gshi;//g标签
var arrayyuanshi = [];//右耳的原始数据
var arrayyuanshizuo = [];//左耳的原始数据
var arrayyuanshiGai = [];//右耳修改过的原始数据
var arrayyuanshizuoGai = [];//左耳修改过的原始数据
function leftClick(e,vueD,svgZuo,argument) {//点击听力图的函数
  // debugger
  fontMask = fontSign + argument.average;
  if(e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  // x轴是否对准
  var xmi = false
  // y轴是否对准
  var ymi = false
  // 左右差值
  var cha = ycha / argument.accuracy
  // 在x轴的数值数组中对应的键
  var indexx
  // 在y轴的数值数组中对应的键
  var indexy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      indexx = i
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      indexx = k + 20
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      indexy = j
      break
    }
  };
  if (xmi === true && ymi === true) {
    dataType2 = 1
    if (yanbi) {
      if (qidao || gudao) {
        dataType2 = 0
      }
      yanbi = false
    };
    if (wufanying) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'wu'
      // }
      wufanying = false
    };
    if (buke) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'bu'
      // }
      buke = false
    };
    // 检查X轴点是否存在和此点坐标是否已经存在
    vueD.chcekX(indexx, indexy,arrayyuanzuo, dataType2);
    if(!(argument.zhu)){vueD.tableText(arrayyuanzuo, argument.tableText)};
    vueD.yuan(svgZuo,arrayyuanzuo, argument.color, fontMask);
    vueD.average(argument.average,arrayyuanzuo);
  }
};
function leftMove(e,vueD,svgZuo,argument,coord) {//鼠标移动时的函数
  // console.log(e)
  // debugger
  if(e.type == "touchmove"  || e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  // debugger
  svgZuo.appendChild(gMove)
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  var xmi = false
  var ymi = false
  var cha = ycha / argument.accuracy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      break
    }
  };
  if (xmi === true && ymi === true) {
    vueD.liang(svgZuo,mycanvasx, mycanvasy, argument.color,coord,svgZuo)
  } else {
    vueD.clearG(svgZuo, gMove)
  }
};
function rightClick(e,vueD,svgZuo,argument) {//点击听力图的函数
  // console.log(argument)
  if(e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  fontMask = fontSign + argument.average
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  // x轴是否对准
  var xmi = false
  // y轴是否对准
  var ymi = false
  // 左右差值
  var cha = ycha / argument.accuracy
  // 在x轴的数值数组中对应的键
  var indexx
  // 在y轴的数值数组中对应的键
  var indexy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      indexx = i
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      indexx = k + 20
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      indexy = j
      break
    }
  };
  if (xmi === true && ymi === true) {
    dataType2 = 1
    if (yanbi) {
      // if (qidao || gudao) {
        dataType2 = 0
      // }
      yanbi = false
    };
    if (wufanying) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'wu'
      // }
      wufanying = false
    };
    if (buke) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'bu'
      // }
      buke = false
    };
    // 检查X轴点是否存在和此点坐标是否已经存在
    vueD.chcekX(indexx, indexy,arrayyuan, dataType2)
    if(!(argument.zhu)){vueD.tableText(arrayyuan, argument.tableText)}
    vueD.yuan(svgZuo,arrayyuan, argument.color, fontMask)
    vueD.average(argument.average,arrayyuan)
  }
};
function rightMove(e,vueD,svgZuo,argument,coord) {//鼠标移动时的函数
  svgZuo.appendChild(gMove)

  if(e.type == "touchmove" || e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  var xmi = false
  var ymi = false
  // debugger
  var cha = ycha / argument.accuracy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      break
    }
  };
  if (xmi === true && ymi === true) {
    vueD.liang(svgZuo,mycanvasx, mycanvasy, argument.color,coord,svgZuo)
  } else {
    vueD.clearG(svgZuo, gMove)
  }
}

import optionMenu from '../commonvue/option-menu.vue'
export default{
  name: 'add',
  components: {
    'ele-optionmenu':optionMenu
  },
  data () {
    return {
      isNowPage: true,
      showAdd: false,
      qidaoP: qidao,
      gudaoP: gudao,
      shushiyuP: shushiyu,
      bushiyuP: bushiyu,
      shengchangP: shengchang,
      tingyuP: tingyu,
      LBCL: null,
      LHTL: null,
      RBCL: null,
      RHTL: null,
      LEffect: '',
      REffect: '',
      degree:'',
      remark:'',
      apparatus:'',
      updatetime:'',
      // optionsEffect:optionsEffect,
      // optionsDegree:optionsDegree,
      argument:{//左边听力图的参数
        'color':'#0000FF',
        'average':'L',
        'tableText' :'l',
        'clearTu':'zuo1',
        'accuracy':5,
        'zhu':true
      },
      argumentR :{//右边听力图的参数
        'color':'#FF0000',
        'average':'R',
        'tableText' :'r',
        'clearTu':'you1',
        'accuracy':5,
        'zhu':true
      },
      showBigSvg:false,
      markFontSize:{size:14,top:5},
      // 听力图底线坐标起点，终点坐标位置
      coord:{
        leftTopX:25,
        rightTopX:15,
        leftBottomX:25,
        rightBottomX:15,
        leftTopY:15,
        rightTopY:15,
        leftBottomY:5,
        rightBottomY:5,
        dashLineCoord:10,
        textCoord:0,
        xDis:30,
        yDis:40,
        xDisCha:35,
      },
      // 听力线的线宽
      tinglixianWidth:1,
      // 下拉菜单选项
      check_value:0,
      focusNum:0,
      hasInputValue:'',
    }
  },
  // 接收父组件传过来的数据
  props:{
    resultData:String
  },
  created () {
    arrayyuanshiGai = [];//右耳修改过的原始数据
    arrayyuanshizuoGai = [];//左耳修改过的原始数据
  },
  mounted () {
    var myDate = new Date()
    this.updatetime = myDate.toLocaleDateString()    //获取当前日期
      var vueD = this
      gMove = this.createTag('g', {});
      this._creatElementyuo(this);//创建右耳
      this._creatElement(this);//创建左耳图
    var that = this
   this.$nextTick(function(){
    // 以字符串的形式接收父组件传过来的数据
    addData = JSON.parse(that.resultData);
    console.log(addData)
    that.drawyuan();
    that.createdPng(svgZuo)
    that.createdPng(svgYou)
    // that.hah()
   })
  },
  destroyed(){
    arrayyuan = [];
    arrayyuanzuo = [];
  },
  methods: {
    _checked(e,num){
      this.hasInputValue = typeof(e.target.value) ==='string' ? e.target.value.toString() : (e.target.innerText ? e.target.innerText : '');
      this.check_value = num;
      this.focusNum = num;
      this.$refs.optionmenu.dialogToggleVisible = true;
    },
    _hadCheckData(e){
      console.log(e)
      if(this.focusNum === 7){
        this.degree = e.name;
      }else if(this.focusNum === 8){
        this.REffect = e.name;
      }else if(this.focusNum === 9){
        this.LEffect = e.name;
      }
    },
    toggle_num(e){
      this.check_value = e;
      console.log(e)
    },
    _creatElement(vueD){
      this.markFontSize = {size:14,top:5};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      var ming = 'http://www.w3.org/2000/svg'
      svgZuo = vueD.createTag('svg',{'xmlns': ming});
       document.getElementById('zuoEr').appendChild(svgZuo)
      document.getElementById('zuoEr').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
      svgZuo.id = 'zuo'
      svgZuo.style = 'cursor:crosshair'
      svgZuo.style.width = document.getElementById('zuoEr').clientWidth;
      svgZuo.style.height = document.getElementById('zuoEr').clientHeight;
      vueD.tu(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height, '#0000FF',this.coord)
      vueD.xian(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height,this.coord)
      // svgZuo.addEventListener("mousemove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,vueD.coord)},false);
    },
    _creatElementyuo(vueD){
      this.markFontSize = {size:14,top:5};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      var ming = 'http://www.w3.org/2000/svg'
      svgYou = vueD.createTag('svg',{'xmlns': ming});
      document.getElementById('youer').appendChild(svgYou)
      document.getElementById('youer').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
      svgYou.id = 'you'
      svgYou.style = 'cursor:crosshair'
      svgYou.style.width = document.getElementById('youer').clientWidth;
      svgYou.style.height = document.getElementById('youer').clientHeight;
      vueD.tu(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height, '#FF0000',this.coord)
      vueD.xian(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height,this.coord)
      // svgYou.addEventListener("mousemove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,vueD.coord)},false);
    },
     _clearBigCanv(zy){
      this.showBigSvg = false;
      this._hiddenPerent(true);
      let parent = jq("#add-zhu");
      let canvs = jq('.bigCanvas')[0];
      if(zy == "zuo"){
        let zuo1 = jq("#zuo");
        let zuoEr1 = jq("#zuoEr");
        zuoEr1.removeChild(zuo1);//清除原图，重新左绘制
        this._creatElement(this);
      }else{
        let you1 = jq("#you");
        let youer1 = jq("#youer");
        youer1.removeChild(you1);//清除原图，重新右绘制
        this._creatElementyuo(this);
      }
      if(canvs){//如果创建了，则清除
        parent.removeChild(canvs);//清除大图
      }
      this.saveArray();//保存数据
      this.drawyuan();// 绘制数据
      this.createdPng(svgZuo)
      this.createdPng(svgYou)
    },
    _bigCanv(zy){//放大canvas
      //标记字体的大小
      this.markFontSize = {size:24,top:10};
      // 设置听力线线宽
      this.tinglixianWidth = 2;
      this._hiddenPerent(false);
      let parent = jq("#add-zhu");
      this.showBigSvg = true;
      // let zuoEr1 = jq('#zuoEr1')
       var ming = 'http://www.w3.org/2000/svg'
      let div = document.createElement('div');
      let svgNew = this.createTag('svg',{'xmlns': ming});
      div.className = "bigCanvas";
      div.id = "bigCanvas" +zy;
      svgNew.style='cursor: crosshair;';
      svgNew.id='big'+zy;
      svgNew.style.width="1140px";
      svgNew.style.height="600px";
      parent.appendChild(div);
      div.appendChild(svgNew);
      let coord = {
        leftTopX:50,
        rightTopX:15,
        leftBottomX:50,
        rightBottomX:15,
        leftTopY:30,
        rightTopY:30,
        leftBottomY:5,
        rightBottomY:5,
        dashLineCoord:22,
        textCoord:50,
        xDis:60,
        yDis:70,
        xDisCha:65,
      };
      if(zy === "zuo"){this.tu(svgNew, 1135, 600, '#0000FF',coord,16);}else{
        this.tu(svgNew, 1135, 600, '#FF0000',coord,16);
      }
      // this.tu(svgNew, 1140, 600, '#000')
      this.xian(svgNew, 1140, 600,coord);
      var vueD = this;
      if(zy == "zuo"){
        this.bigleft = true;
        // svgNew.addEventListener("touchstart",function(e){ leftClick(e,vueD,svgZuo,vueD.argument)},false);
        svgNew.addEventListener("click",function(e){ leftClick(e,vueD,svgZuo,vueD.argument)},false);
        // svgNew.addEventListener("mousemove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        // svgNew.addEventListener("touchmove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        // svgNew.addEventListener("touchstart",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        svgZuo = svgNew;
      }else{
        this.bigleft = false;
        // svgNew.addEventListener("touchstart",function(e){ rightClick(e,vueD,svgYou,vueD.argumentR)},false);
        svgNew.addEventListener("click",function(e){ rightClick(e,vueD,svgYou,vueD.argumentR)},false);
        // svgNew.addEventListener("mousemove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        // svgNew.addEventListener("touchmove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        // svgNew.addEventListener("touchstart",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        svgYou = svgNew;
      }
      this.saveArray();
      this.drawyuan();//读取数据
      gMove = this.createTag('g', {})
    },
    // 隐藏父元素的按钮组
    _hiddenPerent(e){
      // console.log(e)
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
        'LHTL':setDate(this.LHTL),
        'RHTL':setDate(this.RHTL),
        'LEffect':setDate(this.LEffect),
        'REffect':setDate(this.REffect)
      }
      // console.log(obj)
      // 发送消息到repo
      this.$store.commit('hasTestCanvasData',obj);
    },
    // 将svg转换成png图片
    createdPng: function (svg) {
      // console.log(2222)
      if(document.getElementById('moveline')){
        this.clearG(svg, gMove)
      }
      var ghtml;
      var htmlData = svg.outerHTML
      if(document.getElementById(svg.id + 'yuanshi')){
         ghtml = document.getElementById(svg.id + 'yuanshi').outerHTML;
         htmlData = htmlData.replace(ghtml,'')
      } 
      var svgData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(htmlData)))
      var img = new Image()
      img.width = svg.clientWidth
      img.height = svg.clientHeight
      img.src = svgData
      var c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      var ctx = c.getContext('2d')
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        // 图片导出为 png 格式
        var type = 'png'
        var imgData = c.toDataURL(type)
        // console.log(imgData)
        var item = svg.id + 'imgData'
        sessionStorage.setItem(item,imgData)
      }
      // 
      // console.log(this.$route.query.id)
    },
    // 创建svg标签以及子标签
    createTag: function (tagName, tagAttr) {
      let tag = document.createElementNS(ming, tagName)
      for (var attr in tagAttr) {
        tag.setAttribute(attr, tagAttr[attr])
      }
      return tag
    },
    // 清空svg标签下gmove标签的所有内容
    clearG: function (svg, g) {
      while (g.hasChildNodes()) {
        g.removeChild(g.childNodes[0])
      }
      svg.removeChild(g)
    },
    // 清空svg 下gTu标签
    clearTu: function (uid) {
      // console.log('clear::' + document.getElementById(uid + 'tu'))
      if (document.getElementById(uid + 'tu')) {
        var gtu = document.getElementById(uid + 'tu')
        while (gtu.hasChildNodes()) {
          gtu.removeChild(gtu.childNodes[0])
        }
        document.getElementById(uid).removeChild(gtu)
      }
      // console.log(document.getElementById(uid + 'tu'))
    },
    wu: function () {
      yanbi = false
      wufanying = true
      buke = false
    },
    // 获取鼠标在canvas上的坐标
    getCanvasPos: function (svg, e) {
      // 获取鼠标在canvas上的坐标
      var rect = svg.getBoundingClientRect()
      return {
        x: e.clientX - Math.round(rect.left),
        y: e.clientY - Math.round(rect.top)
      }
    },
    // 检查X轴点是否存在和此点坐标是否已经存在 为arrayyuan添加数据
    chcekX: function (x, y, arrayL, dataType) {
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] === x) {
          // 检查此点坐标是否已经存在
          if (arrayL[i][1] === y) {
            arrayL.splice(i, 1)
            // arrayL.push([x, -1, dataType])
            return
          } else {
            arrayL.splice(i, 1)
            arrayL.push([x, y, dataType])
            return
          }
        }
      }
      arrayL.push([x, y, dataType])
    },
    // 原始数据是是否有改变
    chcekXInYuan(x, y, arrayL, arrayM, dataType, svg, fontMask){
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] === x) {
          if (arrayM.length == 0) {
            arrayM.push(arrayL[i]);         
            this.yuanshi(svg, arrayM, '#000000', fontMask)
          } else {
            for (var j = 0; j < arrayM.length; j++) {              
                if (arrayM[j][0] === x) {
                 return     
                }                        
            }
            arrayM.push(arrayL[i]);               
            this.yuanshi(svg, arrayM, '#000000', fontMask)  
          }
          return       
        }
      }
    },
    // 添加言语图
    addImg: function (svg) {
      var svgPol = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
      svgPol.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
      svg.appendChild(svgPol)
    },
    // 保存现有的绘制的听力图数组
    saveArray: function () {
      if (tingyu) {
        for (var f in addData) {
          if (addData[f].type === '6') {
            addData.length = 0;
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '6', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '6', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
    },
    toParent(){
      var obj = {
        'addData':addData,
      }
      this.$emit('plivate',obj);
    },
    // 将听力图数组改变成后台传输格式
    changeFormat: function (arrayL) {
      var Data = []
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] >= 20) {
          Data.push({'x': arrayXxia2[arrayL[i][0] - 20], 'y': arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        } else {
          Data.push({'x': arrayX2[arrayL[i][0]], 'y': arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        }
      }
      return Data
    },
    // 读取数据
    ReadData: function (obj, arrayL) {
      arrayL = []
      for (var i = 0; i < obj.length; i++) {
        arrayL.push([this.dataX(obj[i].x), this.datay(obj[i].y), obj[i].dataType]);
      }
      return arrayL
    },
    // 数据 在x轴的坐标听力值
    dataX: function (x) {
      for (var i = 0; i < arrayX2.length; i++) {
        if (arrayX2[i] === x) {
          return i
        }
      };
      for (var j = 0; j < arrayXxia2.length; j++) {
        if (arrayXxia2[j] === x) {
          return j + 20
        }
      }
    },
    // 数据 在y轴的坐标听力值
    datay: function (y) {
      for (var i = 0; i < arrayYline1.length; i++) {
        // console.log(arrayYline1[i])
        if (arrayYline1[i] == y) {

          return i
        }
      }
    },
   
    // 计算HTL BCL的值
    average: function (sing, arrayL) {
      let num = 0;
      let count = 0;
      let otherCount = 0;
      // if(tingyu){
        // 清空当前类别的值，主要是为了防止500、1000、2000、4000
        // 的值取消后，平均值没有重新计算
        this[sing + 'HTL'] = null;
        this[sing + 'BCL'] = null;
        for (var i = 0; i < arrayL.length; i++) {
          if(arrayL[i][0] === 2 || arrayL[i][0] === 3 || arrayL[i][0] === 4){
            otherCount += 1;
          }
          if (arrayL[i][0] === 2 || arrayL[i][0] === 3 || arrayL[i][0] === 4 || arrayL[i][0] === 5) {
            // 获得 db 值
            num += arrayYline1[(arrayL[i][1])];
            count += 1;
          }
        };
        //计算500、1000、2000、4000，的平均值
        //缺少4000 仍然可以求平无，其余3个频率再缺少任意一个值，都不能计算结果
        if(count === 4 || otherCount === 3){
          let total = 0;
          if(count === 4){
            total = 4;
          }else if(otherCount === 3){
            total = 3;
          }
          //计算听阈平均值
          this[sing + 'HTL'] = parseInt(num / total);
          this[sing + 'BCL'] = parseInt(num / total);
        }
      // };
      this.emit()
    },
    // 绘制听力图的x,y轴和计算数值记录
    tu: function (svg, x, y, colors,coord,fontSize) {
      let size = "10pt";
      if(fontSize){
        size = fontSize +'pt'
      }
      // debugger
      arrayXcoordinate = []
      arrayYcoordinate = []
      arrayXxiaCoordinate = []
      arrayYline2 = [];
      // 画线间隔
      xcha = (x - coord.xDis) / arrayX.length
      ycha = (y - coord.yDis) / arrayY.length
      for (var i = 0; i < arrayX.length; i++) {
        arrayXcoordinate.push(i * xcha + coord.xDisCha)
        svgText = this.createTag('text', {'x': i * xcha + coord.leftTopX, 'y': coord.dashLineCoord,'style':'font-size:'+size})
        svgText.textContent = arrayX[i]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
      // 添加标记
      svgText = this.createTag('text', {'x': 0, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      svgText.textContent = 'db'
      svgText.style.fill = colors
      svg.appendChild(svgText)
      svgText = this.createTag('text', {'x': arrayX.length * xcha - coord.textCoord, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      svgText.textContent = 'Hz'
      svgText.style.fill = colors
      svg.appendChild(svgText)
      for (var j = 0; j < arrayYline1.length; j++) {
        arrayYline2.push(j * ycha / 2 + coord.leftTopX)
      };
      for (var q = 0; q < arrayY.length; q++) {
        arrayYcoordinate.push(q * ycha + coord.leftTopX)
        svgText = this.createTag('text', {'x': 0, 'y': q * ycha + coord.leftTopX, 'style': 'font-size:'+size})
        svgText.textContent = arrayY[q]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
      // console.log(arrayYcoordinate)
      for (var k = 0; k < arrayXxia.length; k++) {
        if (arrayXxia[k] == '5k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 2] + (xcha / 4))
        } else if (arrayXxia[k] == '6k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 2] - (xcha / 2))
        } else if (arrayXxia[k] == '9k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 1] + (xcha / 4))
        } else {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 3] - (xcha / 2))
        }
     
        if (arrayXxia[k] == '6k') {
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k], 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        } else {
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k] - coord.dashLineCoord, 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        }
        svgText.textContent = arrayXxia[k]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      }
    },
    // 绘制听力图上的坐标线
    xian: function (svg, x, y,coord) {
      var _strokeStyle = '#000000'
      svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': x - xcha + coord.rightTopX, 'y2': coord.rightTopY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': x - xcha + coord.rightTopX, 'y1': coord.rightTopY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha -coord.rightBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': coord.leftBottomX,'y1': y - ycha -coord.leftBottomY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha-coord.rightBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': coord.leftBottomX, 'y2': y - ycha -coord.leftBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      _strokeStyle = '#d9d9d9'
      for (var j = 0; j < arrayY.length; j++) {
        svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': arrayYcoordinate[j], 'x2': x - xcha + coord.rightTopX, 'y2': arrayYcoordinate[j]})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var i = 0; i < arrayX.length; i++) {
        svgLine = this.createTag('line', {'x1': arrayXcoordinate[i], 'y1': coord.leftTopY, 'x2': arrayXcoordinate[i], 'y2': y - ycha -coord.leftBottomY})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var k = 0; k < arrayXxia.length; k++) {
        this.drawDashLine(svg, arrayXxiaCoordinate[k], y - ycha -coord.leftBottomY, arrayXxiaCoordinate[k], coord.dashLineCoord)
      };
    },
    // 画虚线
    drawDashLine: function (svg, x1, y1, x2, y2, dashLength) {
      var dashLen = dashLength === undefined ? 5 : dashLength
      var xpos = x2 - x1 // 得到横向的宽度;
      var ypos = y2 - y1 // 得到纵向的高度;
      var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen)
      // 利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for (var i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {
        } else {
          svgLine = this.createTag('line', {'x1': x1 + (xpos / numDashes) * (i - 1), 'y1': y1 + (ypos / numDashes) * (i - 1), 'x2': x1 + (xpos / numDashes) * i, 'y2': y1 + (ypos / numDashes) * i})
          svgLine.style.stroke = '#d9d9d9'
          svg.appendChild(svgLine)
        }
      }
    },
    // 画亮线
    liang: function (svg, x, y, colors,coord,svgYou) {
      gMove.id = 'moveline'
      //
      svgLine = this.createTag('line', {'x1': x, 'y1': coord.leftTopY, 'x2': x, 'y2': svgYou.getBoundingClientRect().height - ycha -coord.leftBottomY})
      svgLine.style.stroke = '#ABABAB'
      gMove.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': y, 'x2': svgYou.getBoundingClientRect().width - xcha + coord.rightBottomX, 'y2': y})
      svgLine.style.stroke = '#ABABAB'
      gMove.appendChild(svgLine)
      // 画虚框
      svgLine = this.createTag('rect', {'x': x - 5, 'y': y - 5, 'width': 10, 'height': 10, 'fill': 'none'})
      svgLine.style.stroke = colors
      gMove.appendChild(svgLine)
      //
      svg.appendChild(gMove)
    },
    // 根据 是否能画图的标记 来判断画图的数据
    drawyuan: function () {
      objZong = addData
      // 根据数据生成表中数据
      for (var v in objZong) {
        // 生成右耳图
        if (objZong[v].ears === '右') {
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
            arrayyuanshi = this.ReadData(objZong[v].data, arrayyuanshi)
          };
          // this.tableText(arrayyuan, 'r')
          this.yuan(svgYou, arrayyuan, '#FF0000', fontSign + 'R')
          this.average('R', arrayyuan)
        }
        // 生成左耳图
        if (objZong[v].ears === '左') {
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
            arrayyuanshizuo = this.ReadData(objZong[v].data, arrayyuanshizuo)
          }
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', fontSign + 'L')
          this.average('L', arrayyuanzuo)
        }
      }
    },
    // 原始数据画图
    yuanshi: function (svg, arrayL, color, mask) {
      gshi = this.createTag('g', {})
      gshi.id = svg.id + 'yuanshi'
      let fontOp;
      for (var i = 0; i < arrayL.length; i++) {
        fontOp = mask
        if (arrayL[i][0] >= 20) {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {

              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXxiaCoordinate[(arrayL[i][0] - 20)] - 8, 'y': arrayYline2[(arrayL[i][1])] + 5, 'font-family': 'fonteditor','font-size':18})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gshi.appendChild(svgText)
        } else {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXcoordinate[(arrayL[i][0])] - 8, 'y': arrayYline2[(arrayL[i][1])] + 5, 'font-family': 'fonteditor','font-size':18})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gshi.appendChild(svgText)
        }
      }
      if (document.getElementById(gshi.id)) {

        document.getElementById(gshi.id).parentNode.removeChild(document.getElementById(gshi.id))
      }
      svg.appendChild(gshi)
    },
    // 画图
    yuan: function (svg, arrayL, color, mask) {
      
      gTu = this.createTag('g', {})
      gTu.id = svg.id + 'tu'
      let fontOp;
      const that = this;
      for (var i = 0; i < arrayL.length; i++) {
        fontOp = mask
        if (arrayL[i][0] >= 20) {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {

              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXxiaCoordinate[(arrayL[i][0] - 20)] - that.markFontSize.top, 'y': arrayYline2[(arrayL[i][1])] + that.markFontSize.top, 'font-family': 'fonteditor','font-size':that.markFontSize.size,'font-weight':'bold'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText)
        } else {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXcoordinate[(arrayL[i][0])] - that.markFontSize.top, 'y': arrayYline2[(arrayL[i][1])] + that.markFontSize.top, 'font-family': 'fonteditor','font-size':that.markFontSize.size,'font-weight':'bold'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText)
        }
      }
      this.tinglixian(svg, gTu, arrayL, color)
    },
    // 听力线
    tinglixian: function (svg, gTu, arrayL, color) {
      // 将画布上圆的x坐标从小到大排序
      arrayL.sort(this.sortNumber);
      var x2
      var y2
      var xp
      var yp
      var num
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] >= 20) {
          if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayL[i - 1][2] === 'wu' || arrayL[i - 1][2] === 'bu') {
                continue
              }
              if (arrayL[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = Math.abs(arrayXxiaCoordinate[(arrayL[i][0] - 20)] - arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)])
              } else {
                x2 = arrayXcoordinate[(arrayL[i - 1][0])]
                // 得到横向的宽度;
                xp = arrayXxiaCoordinate[(arrayL[i][0] - 20)] - arrayXcoordinate[(arrayL[i - 1][0])]
              }
              y2 = arrayYline2[(arrayL[i - 1][1])]
              // 得到纵向的高度;
              yp = arrayYline2[(arrayL[i][1])] - arrayYline2[(arrayL[i - 1][1])]
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color;
              svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(svgLine)
            }
          }
        } else {
          if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayL[i - 1][2] === 'wu' || arrayL[i - 1][2] === 'bu') {
                continue
              }
              if (arrayL[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = arrayXcoordinate[(arrayL[i][0])] - arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
              } else {
                x2 = arrayXcoordinate[(arrayL[i - 1][0])]
                xp = arrayXcoordinate[(arrayL[i][0])] - arrayXcoordinate[(arrayL[i - 1][0])]// 得到横向的宽度;
              }
              y2 = arrayYline2[(arrayL[i - 1][1])]
              yp = arrayYline2[(arrayL[i][1])] - arrayYline2[(arrayL[i - 1][1])]// 得到纵向的高度;
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color;
              svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(svgLine)
            }
          }
        }
      }
      if (document.getElementById(gTu.id)) {
        document.getElementById(gTu.id).parentNode.removeChild(document.getElementById(gTu.id))
      }
      svg.appendChild(gTu)
    },
    // 排序
    sortNumber: function (a, b) {
      var a1
      var b1
      if (a[0] >= 20) {
        a1 = arrayXxiaCoordinate[a[0] - 20]
      } else {
        a1 = arrayXcoordinate[a[0]]
      };
      if (b[0] >= 20) {
        b1 = arrayXxiaCoordinate[b[0] - 20]
      } else {
        b1 = arrayXcoordinate[b[0]]
      };
      return a1 - b1
    }
  }
}
</script>

