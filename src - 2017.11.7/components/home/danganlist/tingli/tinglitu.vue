<template>
    <div class="tinglituclass" style="wmargin:0 auto">
        <div class="ibox height-auto"  >
          <div class="ibox-title clearfix">
            <!-- 多选按钮组 -->
            <div class="fl ibox-title-row">
              <i :class="[{arrowsActive:showNew},'el-icon-caret-bottom','arrows']"></i>
              <div  v-if="!showNew" @click="addImg"> 无背景图</div>
              <div  v-if="showNew" @click="removeImg"> 言语香蕉图</div> 
            </div>
            <el-checkbox-group class="fl" v-model="active" fill="#60b45d" text-color="#fff">
              <el-checkbox-button  id="qidao" @change ="qidaoC" label="气导">
                           <i id="qidao-L" class="testicon testicon-AC-L font-color-blue" ></i>气导<i  id="qidao-R" class="testicon testicon-AC-R font-color-red" ></i>
              </el-checkbox-button>
              <el-checkbox-button id="gudao" @change="gudaoC" label="骨导">
                          <i id="gudao-L" class="testicon testicon-BC-L font-color-blue"></i>骨导<i id="gudao-R" class="testicon testicon-BC-R font-color-red"></i>
              </el-checkbox-button>
              <el-checkbox-button  id="shushiyu" @change="shushiyuC" label="舒适阈">
                          <i id="shushiyu-L" class="testicon testicon-MCL font-color-blue"></i>舒适阈<i id="shushiyu-R" class="testicon testicon-MCL font-color-red"></i>
              </el-checkbox-button>
              <el-checkbox-button  id="bushiyu" @change="bushiyuC" label="不舒适阈">
                          <i id="bushiyu-L" class="testicon testicon-UCL font-color-blue"></i>不舒适阈<i id="bushiyu-R" class="testicon testicon-UCL font-color-red"></i>
              </el-checkbox-button>
             <!--  <el-checkbox-button  id="shengchang" @change="shengchangC" label="声场">
                          <i  id="shengchang-L" class="testicon testicon-SF font-color-blue"></i>声场<i id="shengchang-R" class="testicon testicon-SF font-color-red"></i>
              </el-checkbox-button> -->
              <el-checkbox-button  id="tingyu" @change="tingyuC" label="助听听阈">
                          <i id="tingyu-L" class="testicon testicon-FF-L font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-R font-color-red"></i>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="ibox-content" style=" padding-bottom:0px; margin:0;">
            <!--听力图-->
            <div class="rowsvg "  style="">
              <!--右耳听力图-->
              <div  style="float: left;text-align:center;color:red;">右耳</div>
              <div  style="float: left;text-align:center;color:#0000ff;">左耳</div>
              <div id="youtu" style="float: left;">
                <div id="youer" style="width: 100%;"> 
                </div>
              </div>
              <!--左耳听力图-->
              <div id="zuotu" style="float: left;">  
                <div id="zuoEr" style="width:100%;"></div>
              </div>
            </div>
            <!--听力图结束-->
            <!-- 听力检测结果 -->
            <div class="row clearfix" style="height:calc(20%);">
              <div  class="markData">
                <dl class="" >
                  <dt>测听设备：<span>{{canvasMarks.apparatus}}</span></dt>
                  <dt>测听日期：<span>{{getTime}}</span></dt>
                  <dt>配&nbsp;合&nbsp;度&nbsp;：<span>{{canvasMarks.degree}}</span></dt>
                </dl>
              </div>
              <div  class="markData" style="width:30%;">
                <textarea class="form-control" rows="3" placeholder="备注：" readonly="readonly">{{canvasMarks.remark}}</textarea>
              </div>
              <div  class="markData">
                <table class="">
                  <thead>
                    <tr>
                      <th>侧别</th>
                      <th>AC</th>
                      <th>BC</th>
                      <th>助听听阈</th>
                      <th>助听效果</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>左耳</td>
                      <td><span id="HTL_zuo" style="width:30px;" v-text:text="canvasMarks.ACL"></span></td>
                      <td><span id="BCL_zuo" style="width:30px;" v-text:text="canvasMarks.BCL"></span></td>
                      <td><span id="BCL_zuo" style="width:60px;" v-text:text="canvasMarks.LHTL"></span></td>
                      <td><span id="BCL_zuo" style="width:60px;" v-text:text="canvasMarks.LEffect"></span></td>
                    </tr>
                    <tr>
                      <td>右耳</td>
                      <td><span id="HTL_you" style="width:30px;" v-text:text="canvasMarks.ACR"></span></td>
                      <td><span id="BCL_you" style="width:30px;" v-text="canvasMarks.BCR"></span></td>
                      <td><span id="BCL_you" style="width:60px;" v-text="canvasMarks.RHTL"></span></td>
                      <td><span id="BCL_you" style="width:60px;" v-text="canvasMarks.REffect"></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 听力检测结果 -->
          </div>
        </div>
    </div>
    
</template>

<script>
  // 听力图 图标对照
  // var fontarray = {'SFN': 'a', 'SFR': 'b', 'SFL': 'b', 'SFLM': 'c', 'SFRM': 'd', 'UCLN': 'e', 'UCLL': 'f', 'UCLR': 'f', 'FFL': 'g', 'FFR': 'h', 'FFS': '8', 'FFLN': ',', 'FFRN': '9', 'FFSN': '.', 'MCLN': 'i', 'MCLL': 'j', 'MCLR': 'j', 'BCLMC': 'k', 'BCLMN': 'l', 'BCLM': 'm', 'BCLC': 'n', 'BCLN': 'o', 'BCL': 'p', 'BCRMC': 'q', 'BCRMN': 'r', 'BCRM': 's', 'BCRC': 't', 'BCRN': 'u', 'BCR': 'v', 'ACLMC': 'w', 'ACLMN': 'x', 'ACLM': 'y', 'ACLC': 'z', 'ACLN': '4', 'ACL': '5', 'ACRMC': '6', 'ACRMN': '7', 'ACRM': '0', 'ACRC': '1', 'ACRN': '2', 'ACR': '3'}
  var fontarray = {'SFRN': 'a','SFLN': 'a', 'SFR': 'b', 'SFL': 'b', 'SFLM': 'c', 'SFRM': 'd', 'UCLLN': 'e', 'UCLRN': 'e', 'UCLL': 'f', 'UCLR': 'f', 'FFL': 'g', 'FFR': 'h', 'FFS': '8', 'FFLN': ',', 'FFRN': '9', 'FFSN': '.', 'MCLLN': 'i','MCLRN': 'i', 'MCLL': 'j', 'MCLR': 'j', 'BCLMC': 'k', 'BCLMN': 'l', 'BCLM': 'm', 'BCLC': 'n', 'BCLN': 'o', 'BCL': 'p', 'BCRMC': 'q', 'BCRMN': 'r', 'BCRM': 's', 'BCRC': 't', 'BCRN': 'u', 'BCR': 'v', 'ACLMC': 'w', 'ACLMN': 'x', 'ACLM': 'y', 'ACLC': 'z', 'ACLN': '4', 'ACL': '5', 'ACRMC': '6', 'ACRMN': '7', 'ACRM': '0', 'ACRC': '1', 'ACRN': '2', 'ACR': '3','FFLM': 'g', 'FFRM': 'h'}
  // var arrayinput = [0, 1, 2, 3, 4, 5, 6, 20, 21, 22, 23]
  var arrayX = ['125', '250', '500', '1k', '2k', '4k', '8k', '16k']
  var arrayX2 = ['125', '250', '500', '1000', '2000', '4000', '8000', '16000']
  var arrayY = ['-10', ' 0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
  var arrayXxia = ['750', '1.5k', '3k', '5k', '6k', '9k']
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
  // var arrayyuanzuo = []

  // 画布上鼠标坐标
  var mycanvasx
  var mycanvasy

  // 坐标轴上坐标点之间的相差像素
  var xcha
  var ycha
  // 插入svg 需要引用的
  var ming = 'http://www.w3.org/2000/svg'
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

  // 是否能画图的标记
  var qidao = false
  var gudao = false
  var shushiyu = false
  var bushiyu = false
  var shengchang = false
  var tingyu = true

  // 记录font的标记
  var fontSign = 'AC'
  // input 标记
  // var inputSign = 'q'
  // var addData = []
  var objZong = [{'type': '1', 'ears': '左', 'data': [{'x': '125', 'y': '100', 'dataType': '1'}, {'x': '500', 'y': '30', 'dataType': '1'}]}, {'type': '2', 'ears': '左', 'data': [{'x': '500', 'y': '40', 'dataType': '1'}]}, {'type': '3', 'ears': '右', 'data': [{'x': '250', 'y': '40', 'dataType': '1'}]}, {'type': '4', 'ears': '左', 'data': [{'x': '750', 'y': '50', 'dataType': '1'}]}, {'type': '5', 'ears': '左', 'data': [{'x': '1000', 'y': '100', 'dataType': '1'}]}, {'type': '6', 'ears': '左', 'data': [{'x': '1500', 'y': '25', 'dataType': 'wu'}]}
  ];
import {mapState,mapMutations,mapGetters} from'vuex'
export default{
  name: 'tingli',
  components: {
    
  },
  data () {
    return {
      isNowPage: true,
      LBCL: null,
      LHTL: null,
      RBCL: null,
      RHTL: null,
      showNew: true,
      active:['助听听阈'],
      // objZong:[]
    }
  },
  created () {
    // console.log(this.renderData ,this.objZong)
    
  },
  destroyed(){
    qidao = false
    gudao = false
    shushiyu = false
    bushiyu = false
    shengchang = false
    tingyu = true
  },
  computed:{
    ...mapGetters(['getTime']),
    ...mapState(['canvasMarks']),
  },
  props:{
      objZong:null,
      render:null,
  },
  mounted () {
    document.getElementById('tingyu').getAttributeNode('class').value = 'btn btn-sm btn-white active'
    // ----------------右耳------------------------
    svgYou = this.createTag('svg', {'xmlns': ming})
    document.getElementById('youer').appendChild(svgYou)
    // document.getElementById('youer').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
    svgYou.id = 'you'
    svgYou.style = 'cursor: crosshair'
    var youX = document.getElementById('youer').clientWidth;
    var youY = document.getElementById('youer').clientHeight;
    svgYou.style.width = youX
    if(youX < youY){
      svgYou.style.height = youX
    }else{
      svgYou.style.height = youY
    }
    var vueD = this
    gMove = this.createTag('g', {})
    // 右耳的鼠标移动
    // svgYou.onmousemove = function (e) {
    //   svgYou.appendChild(gMove)
    //   mycanvasx = vueD.getCanvasPos(svgYou, e).x
    //   mycanvasy = vueD.getCanvasPos(svgYou, e).y
    //   var xmi = false
    //   var ymi = false
    //   var cha = ycha / 6
    //   for (var i = 0; i < arrayXcoordinate.length; i++) {
    //     if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
    //       mycanvasx = arrayXcoordinate[i]
    //       xmi = true
    //       break
    //     }
    //   };
    //   for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    //     if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
    //       mycanvasx = arrayXxiaCoordinate[k]
    //       xmi = true
    //       break
    //     }
    //   };
    //   for (var j = 0; j < arrayYline2.length; j++) {
    //     if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
    //       mycanvasy = arrayYline2[j]
    //       ymi = true
    //       break
    //     }
    //   };
    //   if (xmi === true && ymi === true) {
    //     vueD.liang(svgYou, mycanvasx, mycanvasy, '#FF0000')
    //   } else {
    //     vueD.clearG(svgYou, gMove)
    //   }
    // }
    // ----------------左耳------------------------
    svgZuo = this.createTag('svg', {'xmlns': ming})
    document.getElementById('zuoEr').appendChild(svgZuo)
    // document.getElementById('zuoEr').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
    svgZuo.id = 'zuo'
    svgZuo.style = 'cursor: crosshair'
    var zuoX = document.getElementById('zuoEr').clientWidth;
    var zuoY = document.getElementById('zuoEr').clientHeight;
    svgZuo.style.width = zuoX
    if(zuoX < zuoY){
      svgZuo.style.height = zuoX
    }else{
      svgZuo.style.height = zuoY
    }
    this.add()
    // 左耳的鼠标移动
    // svgZuo.onmousemove = function (e) {
    //   svgZuo.appendChild(gMove)
    //   mycanvasx = vueD.getCanvasPos(svgZuo, e).x
    //   mycanvasy = vueD.getCanvasPos(svgZuo, e).y
    //   var xmi = false
    //   var ymi = false
    //   var cha = ycha / 6
    //   for (var i = 0; i < arrayXcoordinate.length; i++) {
    //     if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
    //       mycanvasx = arrayXcoordinate[i]
    //       xmi = true
    //       break
    //     }
    //   };
    //   for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    //     if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
    //       mycanvasx = arrayXxiaCoordinate[k]
    //       xmi = true
    //       break
    //     }
    //   };
    //   for (var j = 0; j < arrayYline2.length; j++) {
    //     if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
    //       mycanvasy = arrayYline2[j]
    //       ymi = true
    //       break
    //     }
    //   };
    //   if (xmi === true && ymi === true) {
    //     vueD.liang(svgZuo, mycanvasx, mycanvasy, '#0000FF')
    //   } else {
    //     vueD.clearG(svgZuo, gMove)
    //   }
    // }
    // 创建香蕉图
    this.addImg();
  },
  methods: {
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
    clearTu: function (uid,index) {
      for (var i = 1; i < 7; i++) {
        // console.log(document.getElementById(uid + i +index+ 'tu'))
        if (document.getElementById(uid + i +index+ 'tu')) {
          var gtu = document.getElementById(uid + i+index + 'tu')
          while (gtu.hasChildNodes()) {
            gtu.removeChild(gtu.childNodes[0])
          }
          document.getElementById(uid).removeChild(gtu)
        }
      }
      // console.log(document.getElementById(uid + 'tu'))
    },
    // 添加言语图
    addImg: function () {
      this.showNew = true;
      var svgPol = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
      svgPol.id = 'tingli-pol';
      svgPol.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
      svgYou.appendChild(svgPol)
      var svgPol2 = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
      svgPol2.id = 'tingli-pol2';
      svgPol2.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[4] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
      svgZuo.appendChild(svgPol2)
    },
    // 删除言语图
    removeImg: function () {
      this.showNew = false;
      svgYou.removeChild(document.getElementById('tingli-pol'))
      svgZuo.removeChild(document.getElementById('tingli-pol2'))
    },
    qidaoC: function (evt) {
      qidao = !qidao
      this.drawyuan()
    },
    gudaoC: function (evt) {
      gudao = !gudao
      this.drawyuan()
    },
    shushiyuC: function (evt) {
      shushiyu = !shushiyu
      this.drawyuan()
    },
    bushiyuC: function (evt) {
      bushiyu = !bushiyu
      this.drawyuan()
    },
    shengchangC: function (evt) {
      shengchang = !shengchang
      this.drawyuan()
    },
    tingyuC: function (evt) {
      tingyu = !tingyu
      this.drawyuan()
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
    // 读取数据
    ReadData: function (obj) {
      arrayyuan = []
      for (var i = 0; i < obj.length; i++) {
        arrayyuan.push([this.dataX(obj[i].x), this.datay(obj[i].y), obj[i].dataType])
      }
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
        if (arrayYline1[i] === parseInt(y)) {
          return i
        }
      }
    },
    // 计算HTL BCL的值
    average: function (sing, arrayL) {
      var num = 0
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] === 2 || arrayL[i][0] === 3 || arrayL[i][0] === 4 || arrayL[i][0] === 5) {
          // 获得 db 值
          num += arrayYline1[(arrayL[i][1])]
        }
      }
      this[sing + 'HTL'] = parseInt(num / 4)
      this[sing + 'BCL'] = parseInt(num / 4)
    },
    // 绘制底图
    add: function () {
      console.log('333333')
      // 绘制右 底层画布
      this.tu(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height, '#FF0000')
      this.xian(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height)
      // 绘制左 底层画布
      this.tu(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height, '#0000FF')
      this.xian(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height)
      //
      this.drawyuan()
    },
    // 绘制听力图的x,y轴和计算数值记录
    tu: function (svg, x, y, colors) {
      arrayXcoordinate = []
      arrayYcoordinate = []
      arrayXxiaCoordinate = []
      arrayYline2 = []
      // 画线间隔
      xcha = (x - 30) / arrayX.length
      ycha = (y - 40) / arrayY.length
      for (var i = 0; i < arrayX.length; i++) {
        arrayXcoordinate.push(i * xcha + 35)
        svgText = this.createTag('text', {'x': i * xcha + 20, 'y': 10, 'style': 'font-size:10pt'})
        svgText.textContent = arrayX[i]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
      for (var j = 0; j < arrayYline1.length; j++) {
        arrayYline2.push(j * ycha / 2 + 25)
      };
      for (var q = 0; q < arrayY.length; q++) {
        arrayYcoordinate.push(q * ycha + 25)
        svgText = this.createTag('text', {'x': 0, 'y': q * ycha + 25, 'style': 'font-size:10pt'})
        svgText.textContent = arrayY[q]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
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
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k], 'y': y - ycha + 15, 'style': 'font-size:10pt'})
        } else {
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k] - 10, 'y': y - ycha + 15, 'style': 'font-size:10pt'})
        }
        svgText.textContent = arrayXxia[k]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      }
    },
    // 绘制听力图上的坐标线
    xian: function (svg, x, y) {
      var _strokeStyle = '#000000'
      svgLine = this.createTag('line', {'x1': 25, 'y1': 15, 'x2': x - xcha + 25, 'y2': 15})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': x - xcha + 25, 'y1': 15, 'x2': x - xcha + 25, 'y2': y - ycha})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': 25, 'y1': y - ycha, 'x2': x - xcha + 25, 'y2': y - ycha})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': 25, 'y1': 15, 'x2': 25, 'y2': y - ycha})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      _strokeStyle = '#d9d9d9'
      for (var j = 0; j < arrayY.length; j++) {
        svgLine = this.createTag('line', {'x1': 25, 'y1': arrayYcoordinate[j], 'x2': x - xcha + 25, 'y2': arrayYcoordinate[j]})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var i = 0; i < arrayX.length; i++) {
        svgLine = this.createTag('line', {'x1': arrayXcoordinate[i], 'y1': 15, 'x2': arrayXcoordinate[i], 'y2': y - ycha})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var k = 0; k < arrayXxia.length; k++) {
        this.drawDashLine(svg, arrayXxiaCoordinate[k], y - ycha, arrayXxiaCoordinate[k], 10)
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
    liang: function (svg, x, y, colors) {
      gMove.id = 'moveline'
      //
      svgLine = this.createTag('line', {'x1': x, 'y1': 15, 'x2': x, 'y2': svgYou.getBoundingClientRect().height - ycha})
      svgLine.style.stroke = '#ABABAB'
      gMove.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': 25, 'y1': y, 'x2': svgYou.getBoundingClientRect().width - xcha +25, 'y2': y})
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
      let objZong1 = this.objZong;
      this.clearTu('you','1');
      this.clearTu('zuo','1');
      this.clearTu('you','2');
      this.clearTu('zuo','2');
      fontSign = null;
      for(var i = 0; i < objZong1.length;i++){
        let objZong = objZong1[i];
        
        if(i === 0 && objZong1.length > 1){
          this.handleData(objZong,'#ccc','#ccc','1')
        }else{
          this.handleData(objZong,'#FF0000','#0000FF','2')
        }
      }
      this.createdPng(svgZuo)
      this.createdPng(svgYou)
    },
    drawyuanAll: function (flag) {
      qidao = true;
      gudao = true;
      shushiyu = true;
      bushiyu = true;
      shengchang = true;
      tingyu = true;
      // debugger
      let objZong1 = this.objZong;
      this.clearTu('you','1');
      this.clearTu('zuo','1');
      this.clearTu('you','2');
      this.clearTu('zuo','2');
      fontSign = null;
      for(var i = 0; i < objZong1.length;i++){
        let objZong = objZong1[i];
        
        if(i === 0 && objZong1.length > 1){
          this.handleData(objZong,'#ccc','#ccc','1')
        }else{
          this.handleData(objZong,'#FF0000','#0000FF','2')
        }
      };
      this.createdPng(svgZuo,flag);
      this.createdPng(svgYou,flag);
    },
     // 将svg转换成png图片
    createdPng: function (svg,flag) {
      if(document.getElementById('moveline')){
        this.clearG(svg, gMove)
      }
      var ghtml;
      var htmlData = svg.outerHTML
      if(document.getElementById(svg.id + 'yuanshi')){
         ghtml = document.getElementById(svg.id + 'yuanshi').outerHTML;
         htmlData = htmlData.replace(ghtml,'')
      } 
      var svgData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(htmlData)));
      var img = new Image()
      img.width = svg.clientWidth
      img.height = svg.clientHeight
      img.src = svgData
      var c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      var ctx = c.getContext('2d');
      var that = this;
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        // 图片导出为 png 格式
        var type = 'png'
        var imgData = c.toDataURL(type);
        var item = svg.id + 'imgData'
        sessionStorage.setItem(item,imgData);
        // console.log(imgData)
        if(flag){
           that.$store.commit('setAllPrintImgs',imgData);
        }
      }
    },
    handleData(objZong,color1,color2,str){
      // 根据数据生成表中数据
        for (var v in objZong) {
          // 生成右耳图
          if (objZong[v].ears === '右') {
            if (qidao && (objZong[v].type === '1')) {
              fontSign = 'ACR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
            if (gudao && (objZong[v].type === '2')) {
              fontSign = 'BCR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
            if (shushiyu && (objZong[v].type === '3')) {
              fontSign = 'MCLR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
            if (bushiyu && (objZong[v].type === '4')) {
              fontSign = 'UCLR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
            if (shengchang && (objZong[v].type === '5')) {
              fontSign = 'SFR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
            if (tingyu && (objZong[v].type === '6')) {
              fontSign = 'FFR'
              this.ReadData(objZong[v].data)
              this.yuan(svgYou, objZong[v].type, color1,str)
              this.average('R', arrayyuan)
            };
          }
          // 生成左耳图
          if (objZong[v].ears === '左') {
            if (qidao && (objZong[v].type === '1')) {
              fontSign = 'ACL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            };
            if (gudao && (objZong[v].type === '2')) {
              fontSign = 'BCL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            };
            if (shushiyu && (objZong[v].type === '3')) {
              fontSign = 'MCLL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            };
            if (bushiyu && (objZong[v].type === '4')) {
              fontSign = 'UCLL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            };
            if (shengchang && (objZong[v].type === '5')) {
              fontSign = 'SFL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            };
            if (tingyu && (objZong[v].type === '6')) {
              fontSign = 'FFL'
              this.ReadData(objZong[v].data)
              this.yuan(svgZuo, objZong[v].type, color2,str)
              this.average('L', arrayyuan)
            }
          }
        }
    },
    // 画图
    yuan: function (svg, sing, color,str) {
      gTu = this.createTag('g', {})
      gTu.id = svg.id + sing + str + 'tu';
      var fontOp
      for (var i = 0; i < arrayyuan.length; i++) {
        fontOp = fontSign
        if (arrayyuan[i][0] >= 20) {
          if (typeof (arrayyuan[i][2]) === 'number') {
            if (arrayyuan[i][2] === 1) {
              fontOp = fontSign
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayyuan[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayyuan[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXxiaCoordinate[(arrayyuan[i][0] - 20)] - 5, 'y': arrayYline2[(arrayyuan[i][1])] + 5, 'font-family': 'fonteditor'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText)
        } else {
          if (typeof (arrayyuan[i][2]) === 'number') {
            if (arrayyuan[i][2] === 1) {
              fontOp = fontSign
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayyuan[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayyuan[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXcoordinate[(arrayyuan[i][0])] - 5, 'y': arrayYline2[(arrayyuan[i][1])] + 5, 'font-family': 'fonteditor'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText)
        }
      }
      this.tinglixian(svg, gTu, color)
    },
    // 听力线
    tinglixian: function (svg, gTu, color) {
      // 将画布上圆的x坐标从小到大排序
      arrayyuan.sort(this.sortNumber)
      var x2
      var y2
      var xp
      var yp
      var num
      for (var i = 0; i < arrayyuan.length; i++) {
        if (arrayyuan[i][0] >= 20) {
          if (arrayyuan[i][2] === 'wu' || arrayyuan[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayyuan[i - 1][2] === 'wu' || arrayyuan[i - 1][2] === 'bu') {
                continue
              }
              if (arrayyuan[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayyuan[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = Math.abs(arrayXxiaCoordinate[(arrayyuan[i][0] - 20)] - arrayXxiaCoordinate[(arrayyuan[i - 1][0] - 20)])
              } else {
                x2 = arrayXcoordinate[(arrayyuan[i - 1][0])]
                // 得到横向的宽度;
                xp = arrayXxiaCoordinate[(arrayyuan[i][0] - 20)] - arrayXcoordinate[(arrayyuan[i - 1][0])]
              }
              y2 = arrayYline2[(arrayyuan[i - 1][1])]
              // 得到纵向的高度;
              yp = arrayYline2[(arrayyuan[i][1])] - arrayYline2[(arrayyuan[i - 1][1])]
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color
              gTu.appendChild(svgLine)
            }
          }
        } else {
          if (arrayyuan[i][2] === 'wu' || arrayyuan[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayyuan[i - 1][2] === 'wu' || arrayyuan[i - 1][2] === 'bu') {
                continue
              }
              if (arrayyuan[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayyuan[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = arrayXcoordinate[(arrayyuan[i][0])] - arrayXxiaCoordinate[(arrayyuan[i - 1][0] - 20)]
              } else {
                x2 = arrayXcoordinate[(arrayyuan[i - 1][0])]
                xp = arrayXcoordinate[(arrayyuan[i][0])] - arrayXcoordinate[(arrayyuan[i - 1][0])]// 得到横向的宽度;
              }
              y2 = arrayYline2[(arrayyuan[i - 1][1])]
              yp = arrayYline2[(arrayyuan[i][1])] - arrayYline2[(arrayyuan[i - 1][1])]// 得到纵向的高度;
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color
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

<style  lang="less">
.tinglituclass{
  width:100%;
  height: calc(~"100% - 52px");

  .text-center {
    display:inline
  }
 #youtu , #zuotu{
    float: left;
    height: calc(~"100% - 30px");
    height:100%;
  }
  #youer,#zuoEr{
    height:100%;
  }
  /*******tab标签*******/ 
  label{
    border:0px none;
  }
  .ibox-title-row{
    position: relative;
      cursor:pointer;
      width:120px;
      height: 35px;
      line-height: 35px;
      text-align:center;
      border: 1px solid #ccc;
      margin-right: 10px;
    // div{
      &:hover{
        color:#20a0ff;
      }
    // }
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
  .el-checkbox-button__inner{
    padding:10px 5px;
    width:105px;
    border:1px solid #ccc;
  }
  .form-control{
    width:90%;
    height: 75px;
    // border-radius:10px;
    padding-left:10px;
    padding-top:5px;
  }
  /*****备注样式******/ 
  .row{
    .markData{
      float: left;
      margin-right: 20px;
      dl{margin:0px;}
      dl dt{line-height: 30px;}
      table{border-collapse: collapse;}
      th,td{
        text-align:center;
        border:0px none;
        border-left:1px solid #ccc;
        padding:3px 5px;
      }
      tr{
        border:1px solid #ccc;
      }
    }

  } 
  .rowsvg{
    height:80%;
    width:100%;
    // width: 800px;
    // height: 400px;
  }
  .rowsvg > div{
      width:50%;
    }
  /**************/ 
  .ibox,.ibox-content{
    width:100%;
  }
  .ibox-content{
    height: calc(~"100% - 40px");
  }
}


</style>
