
<template>
	<div class="drawsvg clearfix">
		<div v-if="onlyDraw" class="ibox-title clearfix">
            <!-- 多选按钮组 -->
            <!-- <div class="fl ibox-title-row">
              <i :class="[{arrowsActive:showNew},'el-icon-caret-bottom','arrows']"></i>
              <div  v-if="!showNew" @click="addImg"> 无背景图</div>
              <div  v-if="showNew" @click="removeImg"> 言语香蕉图</div> 
            </div> -->
            <el-checkbox-group class="fl" v-model="active" fill="#60b45d" text-color="#fff">
              <el-checkbox-button  id="qidao" label="0"  @change = "toggle_btn(0)">
                <i id="qidao-L" class="testicon testicon-AC-L font-color-blue" ></i>气&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导<i  id="qidao-R" class="testicon testicon-AC-R font-color-red" ></i>
              </el-checkbox-button><el-checkbox-button id="gudao" label="1"  @change = "toggle_btn(1)">
                <i id="gudao-L" class="testicon testicon-BC-L font-color-blue"></i>骨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导<i id="gudao-R" class="testicon testicon-BC-R font-color-red"></i>
              </el-checkbox-button><el-checkbox-button  id="shushiyu" label="2"  @change = "toggle_btn(2)">
                <i id="shushiyu-L" class="testicon testicon-MCL font-color-blue"></i>舒&nbsp;&nbsp;适&nbsp;&nbsp;阈<i id="shushiyu-R" class="testicon testicon-MCL font-color-red"></i>
              </el-checkbox-button><el-checkbox-button  id="bushiyu" label="3"  @change = "toggle_btn(3)">
                <i id="bushiyu-L" class="testicon testicon-UCL font-color-blue"></i>不舒适阈<i id="bushiyu-R" class="testicon testicon-UCL font-color-red"></i>
              </el-checkbox-button><el-checkbox-button v-if = "ear == 'A'"  id="tingyu" label="5"  @change = "toggle_btn(5)">
                <i id="tingyu-L" class="testicon testicon-FF-S font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-S font-color-red"></i>
              </el-checkbox-button><el-checkbox-button v-else id="tingyu" label="5"  @change = "toggle_btn(5)">
                <i id="tingyu-L" class="testicon testicon-FF-L font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-R font-color-red"></i>
              </el-checkbox-button>
            </el-checkbox-group>
        </div>
		<div :style="{height:svgHeight,width}">
            <!--听力图-->
            <div class="clearfix" style="height:100%; width:100%;">
                <!--右耳听力图-->
                <div class="l-ear fl" :style="{width:svgWidth+'%'}">
                  	<p style="text-align:center;color:red;height:25px;font-size:18px;">右耳</p>
                  	<div style=" height:calc(100% - 25px);">
                    	<div :id="'rightEar' + this.svgId" v-on:click="_bigCanv('you','R')"></div>
                  	</div>
                </div>
                 <!--功能按钮-->
                <slot></slot>
                <!--左耳听力图-->
                <div class="r-ear fr" :style="{width:svgWidth+'%'}">
                 	<p style="text-align:center;color:#0000ff;height:25px;font-size:18px;">左耳</p>
                  	<div style="height:calc(100% - 25px);">
                    	<div :id="'leftEar' + this.svgId" v-on:click="_bigCanv('zuo','L')">
											</div>
                  	</div>
                </div>
                <!--听力图数据表-->
                <div class="row clearfix d-none" v-if="isShowInput">
	                <div class="fl clearfix">
	                    <table class="table tl-data-table tl-r fl">
		                    <thead>
		                        <tr>
		                        	<th v-for="val in tableheader">{{val}}</th>
		                        </tr>
		                    </thead>
	                      	<tbody>
		                        <tr class="qidao-table change" v-show="item.value" v-for="(item,index) in control_arr">
		                         	<td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
		                        </tr>
	                      	</tbody>
	                    </table>
	                    <ul class="fl">
	                      	<li>：听力值</li>
	                    </ul>
	                </div>
                  	<div class="fr clearfix">
                    	<ul class="fl">
                      	<li>听力值：</li>
                    	</ul>
                    	<table class="table tl-data-table tl-l fl">
	                      	<thead>
	                        	<tr>
	                          	<th v-for="val in tableheader">{{val}}</th>
	                        	</tr>
	                      	</thead>
	                      	<tbody>
		                        <tr class="qidao-table change" v-show="item.value" v-for="(item,index) in control_arr">
		                          	<td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
		                        </tr>
	                      	</tbody>
                    	</table>
                  	</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
	</div>
</template>
<script>
// 听力图 图标对照
var fontarray = {'SFRN': 'a','SFLN': 'a', 'SFR': 'b', 'SFL': 'b', 'SFLM': 'c', 'SFRM': 'd', 'UCLLN': 'e', 'UCLRN': 'e', 'UCLL': 'f', 'UCLR': 'f','UCLLM': 'f', 'UCLRM': 'f', 'FFL': 'g', 'FFR': 'h', 'FFSL': 'eight', 'FFSR': 'eight', 'FFSLM': 'eight', 'FFSRM': 'eight','FFLN': 'comma', 'FFRN': 'nine', 'FFSRN': 'period', 'FFSLN': 'period','MCLLN': 'i','MCLRN': 'i', 'MCLL': 'j', 'MCLR': 'j','MCLLM': 'j', 'MCLRM': 'j', 'BCLMC': 'k', 'BCLMN': 'l', 'BCLM': 'm', 'BCLC': 'n', 'BCLN': 'o', 'BCL': 'p', 'BCRMC': 'q', 'BCRMN': 'r', 'BCRM': 's', 'BCRC': 't', 'BCRN': 'u', 'BCR': 'v', 'ACLMC': 'w', 'ACLMN': 'x', 'ACLM': 'y', 'ACLC': 'z', 'ACLN': 'four', 'ACL': 'five', 'ACRMC': 'six', 'ACRMN': 'seven', 'ACRM': 'zero', 'ACRC': 'one', 'ACRN': 'two', 'ACR': 'three','FFLM': 'g', 'FFRM': 'h'};
var arrayY = ['-10', ' 0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
// var arrayXxia = ['750', '1500', '3000', '6000']
var arrayX = ['125', '250', '500', '1k', '2k', '4k', '8k', '16k']
var arrayXxia = ['750', '1.5k', '3k', '5k', '6k', '9k']
var arrayX2 = ['125', '250', '500', '1000', '2000', '4000', '8000', '16000']
var arrayXxia2 = ['750', '1500', '3000', '5000', '6000', '9000']
var tip = 5 // y轴可画线间距
var arrayYline = function (tip) {
  var data = []
  for (var i = -10; i <= 120;) {
    data.push(i)
    i = i + tip
  }
  return data
};
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
import html2canvas from '../../../api/html2canvas.js'
import util from'../../../common/util.js'
import {mapState} from'vuex'
export default{
	components:{
	},
  data () {
    return {
    	// 使用的内部数据
    	control_arr:[{"key":"1","markLeft":'ACL',"markRight":'ACR',"value":false},{"key":"2","markLeft":'BCL',"markRight":'BCR',"value":false},{"key":"3","markLeft":'MCLL',"markRight":'MCLR',"value":false},{"key":"4","markLeft":'UCLL',"markRight":'UCLR',"value":false},{"key":"5","markLeft":'SFL',"markRight":'SFR',"value":false},{"key":"6","markLeft":'FFL',"markRight":'FFR',"markR":'FFSR',"markL":'FFSL',"value":true}],
    	addData:[],
    	// x轴上显示坐标x值
		arrayXcoordinate : [],
		// y轴上显示坐标y值
		arrayYcoordinate : [],
		// 下方x轴上显示坐标x值
		arrayXxiaCoordinate : [],
		// y轴上所有的坐标听力值
		arrayYline1 :arrayYline(tip),
		// y轴上所有的坐标值的像素值
		arrayYline2 :[],
		// 画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
		arrayyuan :[],
		// 左耳画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
		arrayyuanzuo :[],
		// 画布上鼠标坐标
		mycanvasx:null,
		mycanvasy:null,
		// 坐标轴上坐标点之间的相差像素
		xcha:null,
		ycha:null,
		svgYou:null,
		svgZuo : null,
		// svg下字体标签
		svgText : null,
		// svg下画线标签
		svgLine : null,
		// svg下 g标签鼠标移动 下加重线
		gMove : null,
		// svg下 g标签画听力图
		gTu : null,
		// 是否已经有言语图
		addImgIf : false,
		// 是否能画图的标记
		qidao : false,
		gudao : false,
		shushiyu : false,
		bushiyu : false,
		shengchang : false,
		tingyu : true,
		//
		wufanying : false,
		yanbi : false,
		buke : false,
		// 听力节点类型
		dataType2:null,
		// 记录font的标记
		fontSign :'FF',
		fontMask:null,
		gshi:null,//g标签
		sys_arr_r : [],//右耳的原始数据
		sys_arr_l : [],//左耳的原始数据
		set_r:new Set(),//右耳修改的系统值
		set_l:new Set(),//左耳修改的系统值
    	// 结束
		showNew:true,
		active:['5'],
		updatetime:'',
		inputArryValuel:[
			{key:0,msg:null},
			{key:1,msg:null},
			{key:2,msg:null},
			{key:20,msg:null},
			{key:3,msg:null},
			{key:21,msg:null},
			{key:4,msg:null},
			{key:22,msg:null},
			{key:5,msg:null},
			{key:23,msg:null},
			{key:24,msg:null},
			{key:6,msg:null},
			{key:25,msg:null},
			{key:7,msg:null}
		],
		inputArryValuer:[
			{key:0,msg:null},
			{key:1,msg:null},
			{key:2,msg:null},
			{key:20,msg:null},
			{key:3,msg:null},
			{key:21,msg:null},
			{key:4,msg:null},
			{key:22,msg:null},
			{key:5,msg:null},
			{key:23,msg:null},
			{key:24,msg:null},
			{key:6,msg:null},
			{key:25,msg:null},
			{key:7,msg:null}
		],
		inputArryValueYanl:[
			{key:0,msg:null,disable:true},
			{key:1,msg:null,disable:true},
			{key:2,msg:null,disable:true},
			{key:20,msg:null,disable:true},
			{key:3,msg:null,disable:true},
			{key:21,msg:null,disable:true},
			{key:4,msg:null,disable:true},
			{key:22,msg:null,disable:true},
			{key:5,msg:null,disable:true},
			{key:23,msg:null,disable:true},
			{key:24,msg:null,disable:true},
			{key:6,msg:null,disable:true},
			{key:25,msg:null,disable:true},
			{key:7,msg:null,disable:true}
		],
		inputArryValueYanr:[
			{key:0,msg:null,disable:true},
			{key:1,msg:null,disable:true},
			{key:2,msg:null,disable:true},
			{key:20,msg:null,disable:true},
			{key:3,msg:null,disable:true},
			{key:21,msg:null,disable:true},
			{key:4,msg:null,disable:true},
			{key:22,msg:null,disable:true},
			{key:5,msg:null,disable:true},
			{key:23,msg:null,disable:true},
			{key:24,msg:null,disable:true},
			{key:6,msg:null,disable:true},
			{key:25,msg:null,disable:true},
			{key:7,msg:null,disable:true}
		],
		tableheader:['125','250','500','750','1k','1.5k','2k','3k','4k','5k','6k','8k','9k','16k'],
		bigleft:false,
		showBigSvg:false,
		add:true,
		markFontSize:{size:16,top:6},
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
		initProductData: {},
		// 下拉菜单选项
		check_value:0,
		focusNum:0,
		hasInputValue:'',
		width:'100%',
		BCL: '',
      	ACL:'',
      	ACR:'',
      	LHTL: '',
      	BCR: '',
      	RHTL: '',
    }
  },
  created() {
    
  },
  props:{
    svgData:{
  		type:[Object,String,Array],
  		default:function(){
  			return []
  		}
  	},
    isShowInput:{
      	type:Boolean,
      	default:false
  	},
  	ear:{
  		type:String,
  		default:'RL'
  	},
  	svgWidth:{
  		type:Number,
  		default:50
  	},
  	svgHeight:{
  		type:[String,Number],
  		default:"calc(100% - 37px)"
  	},
  	svgId:{
  		type:[String,Number],
  		default:"0"
  	},
  	onlyDraw:{
  		type:Boolean,
  		default:false
  	},
  	svgMarks:{
  		type:Object,
  		default:function(){
  			return {}
  		}
  	},
  	svgParentId:{
  		type:String,
  		default:"#add"
  	},
  	hzAaverage:{
  		type:Object,
  		default:function(){
  			return {}
  		}
  	},
  	isCreatedPng:{
  		type:Boolean,
  		default:false
  	},
  	bigSvgWidth:{
  		type:[String,Number],
  		default:1200
  	},
  	bigSvgHight:{
  		type:[String,Number],
  		default:680
  	}
  },
  mounted () {
    this.gMove = this.createTag('g', {})
    this.$nextTick(()=>{
    	this._creatElementyuo();//创建右耳
    	this._creatElement();//创建左耳图
    	// 创建香蕉图
    	this.addImg();
    })
  },
  destroyed(){
  	this.control_arr.forEach((item) =>{
  		if(item.key === "6"){
  			item.value = true;
  		}else{
  			item.value = false;
  		}
  	})
  },
  computed:{
  	argument(){
  		return {
  			'color':'#0000FF',
			'average':'L',
			'tableText' :'l',
			'clearTu':'zuo1',
			'accuracy':4,
			"data":this.arrayyuanzuo
  		}
  	},
  	argumentR(){
  		return{
  			'color':'#FF0000',
			'average':'R',
			'tableText' :'r',
			'clearTu':'you1',
			'accuracy':4,
			"data":this.arrayyuan
  		}
  	}
  },
  methods: {
    _befroeClose(){// 关闭前的回调
      	//所有数据清空
      	this.active = ["5"];
      	this.addData = [];
      	this.arrayyuan = [];
      	this.arrayyuanzuo = [];
      	this.arrayyuanshi = [],//右耳的原始数据
				this.arrayyuanshizuo = [],//左耳的原始数据
				this.set_r.clear();
				this.set_l.clear();
      	this.bigleft = true;
      	this._clearBigCanv();
      	this.bigleft = false;
      	this._clearBigCanv();
      	this.clearText('l');
      	this.clearText('r');
    },
		toClickSvg(e,svgZuo,argument) {//点击听力图的函数
			// console.log(argument)
			if(e.type == "touchstart"){
				var currentE = e.touches[0]
			}else{
				var currentE = e
			}
			this.fontMask = this.fontSign + argument.average
			this.mycanvasx = this.getCanvasPos(svgZuo, currentE).x
			this.mycanvasy = this.getCanvasPos(svgZuo, currentE).y
			// x轴是否对准
			var xmi = false
			// y轴是否对准
			var ymi = false
			// 左右差值
			var cha = this.ycha / argument.accuracy
			// 在x轴的数值数组中对应的键
			var indexx
			// 在y轴的数值数组中对应的键
			var indexy
			for (var i = 0; i < this.arrayXcoordinate.length; i++) {
				if (Math.abs(this.mycanvasx - this.arrayXcoordinate[i]) <= cha) {
					this.mycanvasx = this.arrayXcoordinate[i]
					xmi = true
					indexx = i
					break
				}
			};
			for (var k = 0; k < this.arrayXxiaCoordinate.length; k++) {
				if (Math.abs(this.mycanvasx - this.arrayXxiaCoordinate[k]) <= cha) {
					this.mycanvasx = this.arrayXxiaCoordinate[k]
					xmi = true
					indexx = k + 20
					break
				}
			};
			for (var j = 0; j < this.arrayYline2.length; j++) {
				if (Math.abs(this.mycanvasy - this.arrayYline2[j]) <= cha) {
					this.mycanvasy = this.arrayYline2[j]
					ymi = true
					indexy = j
					break
				}
			};
			if (xmi === true && ymi === true) {
				this.dataType2 = 1
				if (this.yanbi) {
						this.dataType2 = 0
						this.yanbi = false
				};
				if (this.wufanying) {
						this.dataType2 = 'wu'
						this.wufanying = false
				};
				if (this.buke) {
						this.dataType2 = 'bu'
						this.buke = false
				};
				// let data = argument.average === "R" ? this.arrayyuan : this.arrayyuanzuo;
				// 检查X轴点是否存在和此点坐标是否已经存在
				const fn1 = async ()=>{
					return this.chcekX(indexx, indexy,argument.data, this.dataType2 ,argument.average)
				}
				const fn2 = async ()=>{
					const arr = await fn1();
					await this._saveShowData(true,arr);
					if(!(argument.zhu)){this.tableText(argument.data, argument.tableText)}
					await argument.average === "R" ? this.publicFn("right",null,this.fontMask) : this.publicFn("left",null,this.fontMask);
				}
				fn2()
			}
		},
		toMove(e,svgZuo,argument,coord) {//鼠标移动时的函数
			svgZuo.appendChild(this.gMove)
			if(e.type == "touchmove" || e.type == "touchstart"){
				var currentE = e.touches[0]
			}else{
				var currentE = e
			}
			this.mycanvasx = this.getCanvasPos(svgZuo, currentE).x
			this.mycanvasy = this.getCanvasPos(svgZuo, currentE).y
			var xmi = false
			var ymi = false
			// debugger
			var cha = this.ycha / argument.accuracy
			for (var i = 0; i < this.arrayXcoordinate.length; i++) {
				if (Math.abs(this.mycanvasx - this.arrayXcoordinate[i]) <= cha) {
					this.mycanvasx = this.arrayXcoordinate[i]
					xmi = true
					break
				}
			};
			for (var k = 0; k < this.arrayXxiaCoordinate.length; k++) {
				if (Math.abs(this.mycanvasx - this.arrayXxiaCoordinate[k]) <= cha) {
					this.mycanvasx = this.arrayXxiaCoordinate[k]
					xmi = true
					break
				}
			};
			for (var j = 0; j < this.arrayYline2.length; j++) {
				if (Math.abs(this.mycanvasy - this.arrayYline2[j]) <= cha) {
					this.mycanvasy = this.arrayYline2[j]
					ymi = true
					break
				}
			};
			if (xmi === true && ymi === true) {
				this.liang(svgZuo,this.mycanvasx, this.mycanvasy, argument.color,coord,svgZuo)
			} else {
				this.clearG(svgZuo, this.gMove)
			}
		},
    _creatElement(){
      this.markFontSize = {size:16,top:6};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      this.svgZuo = this.createTag('svg',{'xmlns': ming});
      jq('#leftEar' +this.svgId).appendChild(this.svgZuo);
      jq('#leftEar' +this.svgId).style = 'height:100%;background-size:100% 100%;'
      this.svgZuo.id = 'zuo'+this.svgId;
      this.svgZuo.style = 'cursor:crosshair'
      this.svgZuo.style.width = jq('#leftEar' +this.svgId).clientWidth;
      this.svgZuo.style.height = jq('#leftEar' +this.svgId).clientHeight;
      const rect = this.svgYou.getBoundingClientRect();
      this.tu(this.svgZuo, rect.width, rect.height, '#0000FF',this.coord)
      this.xian(this.svgZuo, rect.width, rect.height,this.coord)
    },
    _creatElementyuo(){
      this.markFontSize = {size:16,top:6};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      this.svgYou = this.createTag('svg',{'xmlns': ming});
      jq('#rightEar' +this.svgId).appendChild(this.svgYou)
      jq('#rightEar' +this.svgId).style = 'height:100%;background-size:100% 100%;'
      this.svgYou.id = 'you'+this.svgId;
      this.svgYou.style = 'cursor:crosshair'
      this.svgYou.style.width = jq('#rightEar' +this.svgId).clientWidth;
      this.svgYou.style.height = jq('#rightEar' +this.svgId).clientHeight;
      const rect = this.svgYou.getBoundingClientRect();
      this.tu(this.svgYou, rect.width, rect.height, '#FF0000',this.coord)
      this.xian(this.svgYou, rect.width, rect.height,this.coord)
    },
    _clearBigCanv(){
      	let parent = jq(this.svgParentId);
      	const reId=/#/g;
      	if(!parent || !reId.test(this.svgParentId)){
			throw new Error('父元素id有误');
      	}
      let canvs = jq('.bigCanvas')[0];
      if(this.bigleft){
        let zuo1 = jq("#zuo" +this.svgId);
        let leftEar = jq("#leftEar" +this.svgId);
        leftEar.removeChild(zuo1);//清除原图，重新左绘制
        this._creatElement();
        // 判断是否已经开启背景图
        if(this.showNew){
        	// 先清除右耳背景图
          	this.svgYou.removeChild(document.getElementById('pol'+this.svgId));
          	this.addImg();
        }
      }else{
        let you1 = jq("#you" +this.svgId);
        let rightEar = jq("#rightEar" +this.svgId);
        rightEar.removeChild(you1);//清除原图，重新右绘制
        this._creatElementyuo();
        // 判断是否已经开启背景图
        if(this.showNew){
        	// 先清除左图的背景图
          	this.svgZuo.removeChild(document.getElementById('pol2'+this.svgId));
          	this.addImg();
        }
      }
      	if(canvs){//如果创建了，则清除
        	parent.removeChild(canvs);//清除大图
      	}
      	// 绘制数据
  		this._saveShowData().then(()=>{
				this._bigdrawyuan()//读取数据
						if(this.isCreatedPng){
							this.createdPng(this.svgZuo);
							this.createdPng(this.svgYou);
					}	
			});
    },
    _bigCanv(zy,aaa){//放大canvas
    	if(this.onlyDraw)return false;
    	this.drawEar = aaa;//用来标记当前正在编辑哪个耳旁
    	if(this.ear.indexOf(aaa) < 0 && this.ear !== 'A'){//禁用编辑功能
    		return false
    	}
      	//标记字体的大小
      	this.markFontSize = {size:26,top:11};
      	// 设置听力线线宽
      	this.tinglixianWidth = 2;
      	let parent = jq(this.svgParentId);
      	const reId=/#/g;
      	if(!parent || !reId.test(this.svgParentId)){
			throw new Error('父元素id有误');
      	}
			this.showBigSvg = true;
			this.$emit('showBigSvg',true,zy);
			// let leftEar = jq('#leftEar')
			var ming = 'http://www.w3.org/2000/svg'
			let div = document.createElement('div');
			let svgNew = this.createTag('svg',{'xmlns': ming});
			div.className = "bigCanvas";
			div.id = "bigCanvas" +zy;
			svgNew.style='cursor: crosshair;';
			svgNew.id='big'+zy;
			svgNew.style.width= this.bigSvgWidth + "px";
			svgNew.style.height= this.bigSvgHight + "px";
			parent.appendChild(div);
			div.appendChild(svgNew)
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
      	if(zy === "zuo"){
      		this.tu(svgNew, this.bigSvgWidth, this.bigSvgHight, '#0000FF',coord,16);
      	}else{
	        this.tu(svgNew, this.bigSvgWidth, this.bigSvgHight, '#FF0000',coord,16);
	    }
      	this.xian(svgNew, this.bigSvgWidth, this.bigSvgHight,coord);
      	let vueD = this,
         	beijing = null;//左右耳背景图
      	if(zy === "zuo"){
        	this.bigleft = true;
        	svgNew.addEventListener("click",function(e){ vueD.toClickSvg(e,vueD.svgZuo,vueD.argument)},false);
        	this.svgZuo = svgNew;
        	beijing = 'rightBig';
      	}else{
        	this.bigleft = false;
        	svgNew.addEventListener("click",function(e){ vueD.toClickSvg(e,vueD.svgYou,vueD.argumentR)},false);
        	this.svgYou = svgNew;
        	beijing = 'leftBig';
      	}
      	if(this.showNew === true){
        	this.addImg(beijing);
      	}
			this._saveShowData().then(()=>{
				this._bigdrawyuan();//读取数据
				this.gMove = this.createTag('g', {})	
			});
			this.toggle_btn(5);
    },
    // 创建svg标签以及子标签
    createTag: function (tag, attributes) {
      var elem = document.createElementNS(ming, tag)
      for (var attribute in attributes) {
        var name = (attribute in ATTR_MAP ? ATTR_MAP[attribute] : attribute)
        var value = attributes[attribute]
        if (attribute in NS_MAP) {
          elem.setAttributeNS(NS_MAP[attribute], name, value)
        } else {
          elem.setAttribute(name, value)
        }
      }
      return elem
    },
    // 清空svg标签下this.gmove标签的所有内容
    clearG: function (svg, g) {
      while (g.hasChildNodes()) {
        g.removeChild(g.childNodes[0])
      }
      svg.removeChild(g)
    },
    // 清空svg 下gTu标签
    clearTu: function (uid) {
    	var doc = document;
    	var gtu = doc.getElementById(uid + 'tu')
      	if (gtu) {
       		 while (gtu.hasChildNodes()) {
          		gtu.removeChild(gtu.childNodes[0])
        	}
        	doc.getElementById(uid).removeChild(gtu)
      	}
    },
    clearTu1: function (id,index) {
    	var doc = document;
      for (var i = 1; i < 7; i++) {
      	var gtu = doc.getElementById(id+ i+index + 'tu')
        if (gtu) {
          while (gtu.hasChildNodes()) {
            gtu.removeChild(gtu.childNodes[0])
          }
          doc.getElementById(id).removeChild(gtu)
        }
      }
    },
    // 添加言语图
    addImg: function (flag) {
    	const arrayXcoordinate = this.arrayXcoordinate;
    	const arrayXxiaCoordinate = this.arrayXxiaCoordinate;
    	const arrayYline2 = this.arrayYline2;
    	const xcha = this.xcha;
      this.showNew = true;
      if(flag !== "rightBig"){
        var svgPol = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
        svgPol.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
        svgPol.id = 'pol'+this.svgId
        this.svgYou.appendChild(svgPol)
      }
      if(flag !== "leftBig"){
        var svgPol2 = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
        svgPol2.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
        svgPol2.id = 'pol2'+this.svgId
        this.svgZuo.appendChild(svgPol2);
      }
    },
    removeImg: function () {
      	this.showNew = false
      	this.svgYou.removeChild(document.getElementById('pol'+this.svgId))
      	this.svgZuo.removeChild(document.getElementById('pol2'+this.svgId))
    },
    toggle_btn: function (evt) {
      	if(this.onlyDraw){
      		this.control_arr[evt].value = !this.control_arr[evt].value;
      		this.contrast()
      		return false;
      	}
      	this.saveArray()
      	this.allFalse()
      	this.control_arr[evt].value = true;
				let str = "";
				if(evt == 5 && this.addData[0] && this.addData[0].order == "A"){
					str = this.control_arr[5].markR;
				}else{
					str = this.control_arr[evt].markRight;
				}
      	this.fontSign = str.substring(0,str.length-1);
      	this.drawyuan()
    },
    // 清空所有
    allFalse: function () {
    	this.control_arr.forEach((item) =>{
    		item.value = false;
    	});
      	this.clearText('r')
      	this.clearText('l')
    },
    // 添加掩蔽
    yan: function () {
     		this.yanbi = true
      	this.wufanying = false
      	this.buke = false
      	return;
    },
    // 添加无响应
    wu: function () {
      	this.yanbi = false
      	this.wufanying = true
      	this.buke = false
    },
    // 添加不可测量
    bu: function () {
      	this.yanbi = false
      	this.wufanying = false
      	this.buke = true
    },
    // 复制到另一侧耳朵
    copy: function () {
      if (this.arrayyuan.length > this.arrayyuanzuo.length) {
        this.fontMask = this.fontSign + 'L'
        this.arrayyuanzuo = []
        this.arrayyuanzuo = this.arrayyuan.concat()
        this.clearText('l')
        this.tableText(this.arrayyuanzuo, 'l')
        this.publicFn("left",null,this.fontMask);
      } else {
        this.fontMask = this.fontSign + 'R'
        this.arrayyuan = []
        this.arrayyuan = this.arrayyuanzuo.concat()
        this.clearText('r')
        this.tableText(this.arrayyuan, 'r')
        this.publicFn("right",null,this.fontMask);
      }
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
    chcekX: function (x, y, arrayL, dataType,hand) {
	    for (var i = 0; i < arrayL.length; i++) {
	        if (arrayL[i][0] === x) {
	          // 检查此点坐标是否已经存在
	          if (arrayL[i][1] === y) {
	            arrayL.splice(i, 1)
	            arrayL.push([x, -1, dataType])
	            return Promise.resolve({arr:[x, y, dataType],isneed:false})
	          } else {
	            arrayL.splice(i, 1)
	            arrayL.push([x, y, dataType])
	            return  Promise.resolve({arr:[x, y, dataType],isneed:true})
	          }
	        }
	    }
	    arrayL.push([x, y, dataType])
		return  Promise.resolve({arr:[x, y, dataType],isneed:true});
    },
    // 保存现有的绘制的听力图数组
    saveArray: function () {
      //生成听力图数据
      this._saveShowData();
      this.arrayyuanzuo = [];
      this.arrayyuan = [];
    },
    _saveShowData(isclick,par){
      	let addData = this.addData,
      		arrayyuanzuo = this.arrayyuanzuo,
      		arrayyuan =this.arrayyuan,
      		isAllEar = false;
      	if(this.ear === "A"){
      		isAllEar = true;
      		if(this.drawEar == "R"){
						this.average("L",arrayyuanzuo)
      			arrayyuanzuo = arrayyuan;
      		}else if(this.drawEar == "L"){
						arrayyuan = arrayyuanzuo;
						this.average("R",arrayyuan)
      		}
      	}
      	const fnasync = async ()=>{
      		if(par){
	      		let a = this.svgData.length > 0 ? this.svgData : addData;
	      		this.control_arr.forEach((item) =>{
			      	if (item.value) {
				        if (isAllEar || this.drawEar == "L") {
				          	Utils.checkIsChange2(a,{'type': item.key, 'ears': 'L', 'data': this.changeFormat([par.arr])},this.ear,par.isneed)
				        }
				        if (isAllEar || this.drawEar == "R") {
				          	Utils.checkIsChange2(a,{'type': item.key, 'ears': 'R', 'data': this.changeFormat([par.arr])},this.ear,par.isneed)
				        }
				    };
			    })
	      	}
      	};
      	const sys_async = async ()=>{
					if(!isclick){ return false}
					if(!this.control_arr[5].value){return false}
      		let arr = this.svgData.length > 0 ? this.svgData : this.addData;
	        // 生成右耳图
        	arr.forEach(inele =>{
	        	if (inele.type === '6') {
		        	const data = inele.earData;
		        	if(!Array.isArray(data)){return false;}
		        	// 生成渲染的数据格式
		        	data.forEach(item =>{
		        		const getObj = Utils.getReaderSvgData(item),
		        			dist = getObj.dist;
		        		if(item.ear === "R"){
									this.set_data(this.set_r,dist)
		        		}
		        		if(item.ear === "L"){
									this.set_data(this.set_l,dist)
		        		}
		        	})
		        }
	        })
	        // console.log(2)
      	};
      	const dowork = async ()=>{
					await fnasync();
					await sys_async();
					if(this.control_arr[5].value){
						if(this.ear === "A"){
							if(this.drawEar == "R"){
								this.sys_yuan_fn("R",this.set_r)
								this.sys_yuan_fn("L",this.set_r)
							}else if(this.drawEar == "L"){
								this.sys_yuan_fn("R",this.set_l)
								this.sys_yuan_fn("L",this.set_l)
							}
						}else{
							this.sys_yuan_fn("R",this.set_r)
							this.sys_yuan_fn("L",this.set_l)
						}
					}
					this.$emit('newSvgDataToSave',addData);
					// console.log(3)
					return Promise.resolve();
      	};
      	return dowork()
    },
    // 将听力图数组改变成后台传输格式
    changeFormat: function (arrayL) {
      var Data = []
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] >= 20) {
          Data.push({'x': arrayXxia2[arrayL[i][0] - 20], 'y': this.arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        } else {
          Data.push({'x': arrayX2[arrayL[i][0]], 'y': this.arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        }
      }
      return Data
    },
    // 读取数据
    ReadData: function (obj) {
      const arrayL = []
      for (var i = 0; i < obj.length; i++) {
        arrayL.push([this.dataX(obj[i].x), this.datay(obj[i].y), obj[i].dataType])
      }
      return arrayL;
    },
    // 数据 在x轴的坐标听力值
    dataX: function (x) {
      for (var i = 0; i < arrayX2.length; i++) {
        if (+arrayX2[i] === +x) {
          return i
        }
      };
      for (var j = 0; j < arrayXxia2.length; j++) {
        if (+arrayXxia2[j] === +x) {
          return j + 20
        }
      }
    },
    // 数据 在y轴的坐标听力值
    datay: function (y) {
      for (var i = 0; i < this.arrayYline1.length; i++) {
        if (this.arrayYline1[i] === y) {
          return i
        }
      }
    },
    // 数据表填值
    tableText: function (arrayL, sing) {
      // debugger
      var inputValue =null,
          yanValue = null;
      if(sing == 'l'){
        inputValue = this.inputArryValuel;
        yanValue = this.inputArryValueYanl
      }else{
        inputValue = this.inputArryValuer;
        yanValue = this.inputArryValueYanr;
      }
      for (var j = 0; j < inputValue.length; j++) {
        for (var i = 0; i < arrayL.length; i++) {
          if(inputValue[j]['key'] == arrayL[i][0]){
            if (arrayL[i][1] === -1) {
              inputValue[j]['msg'] = null
              arrayL.splice(i, 1)
              continue
            }
            if (arrayL[i][2] === 'wu') {
              inputValue[j]['msg'] = '无响应'
            } else if (arrayL[i][2] === 'bu') {
              inputValue[j]['msg'] = '不可测量'
            } else if (arrayL[i][2] === 1) {
              inputValue[j]['msg'] = this.arrayYline1[(arrayL[i][1])]
              yanValue[j]['disable'] = false;//掩蔽值输入框启用
            } else {
              inputValue[j]['msg'] = this.arrayYline1[(arrayL[i][1])]
              yanValue[j]['disable'] = false;//掩蔽值输入框启用
            };
            break;
          }
        }
      }
    },
    // 清空数据表中的值
    clearText: function (sign) {
      var inputValue =null,
          yanValue = null;
      if(sign == 'l'){
        inputValue = this.inputArryValuel;
        yanValue = this.inputArryValueYanl
      }else{
        inputValue = this.inputArryValuer;
        yanValue = this.inputArryValueYanr;
      }
      for (var i = 0; i < inputValue.length; i++) {
        inputValue[i]['msg'] = null;
        yanValue[i]['disable'] = true;
      }
    },
    _changeSign(str,ip){//改变标记符号，掩蔽值
      var arrayL = [];
      str === "you" ? arrayL = this.arrayyuan : arrayL = this.arrayyuanzuo; 
      for (var i = 0; i < arrayL.length; i++) {//改变听力图的样式
       if(arrayL[i][0] === ip){
        arrayL[i][2] = 0
       } 
       str === "you" ? this.publicFn("right",null,null,true) :this.publicFn("left",null,null,true); 
       // this.yuan(svg0, arrayL, color, mask);
      }
    },
    // 数据表中的值发生改变
    update: function (str, ip, values) {
      var arrayL = [],sing1 = "";
      if(!( values == '无响应' || values == '不可测量' || ((-10 <= values) && (values<= 120) && (values % 5 == 0)))){
        event.target.value = null
        alert('请输入合法字符,数字只能是-10与120之间且为5的整数倍，或者是“无响应”，“不可测量”字符串！');
        return;
      }
      // 判断左右
       str === "you" ? arrayL = this.arrayyuan : arrayL = this.arrayyuanzuo; 
       str === "you" ? sing1 = "r" : sing1 = "l"; 
      for (var i in arrayL) {
        // 判断是否已经存在
        if (ip === arrayL[i][0]) {
          // 找到输入值 所有的 数组下标
          for (var j in this.arrayYline1) {
            if (this.arrayYline1[j] === parseInt(values)) {
              arrayL[i][1] = j
              if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
                arrayL[i][2] = 1
              }
            }
          }
          this.tableText(arrayL, sing1)
          str === "you" ? this.publicFn("right") :this.publicFn("left"); 
          return
        }
      }
      for (var k in this.arrayYline1) {
        if (this.arrayYline1[k] === parseInt(values)) {
          	arrayL.push([ip, k, 1])
          	this.tableText(arrayL, sing1)
           	str === "you" ? this.publicFn("right") :this.publicFn("left"); 
          	return
        }
      }
    },
    // 计算HTL BCL的值
    average: function (sing, arrayL) {
      let num = 0;
      let count = 0;
      let otherCount = 0;
      let bool_q = this.control_arr[0].value;
      let bool_g = this.control_arr[1].value;
      let bool_t = this.control_arr[5].value;
      if(bool_t || bool_q || bool_g){
        // 清空当前类别的值，主要是为了防止500、1000、2000、4000
        // 的值取消后，平均值没有重新计算
        if(bool_t){
          this.hzAaverage[sing + 'HTL'] = null;
        }else if(bool_q){
          this.hzAaverage['AC' +sing ] = null;
        } else if(bool_g){
          this.hzAaverage['BC' +sing ] = null;
		};
		let dataType = false;
		let data = 0;
        for (let i = 0; i < arrayL.length; i++) {
			dataType = arrayL[i][2] != "wu";
			data = arrayL[i][0];
			if(( data=== 2 && dataType) || (data === 3 && dataType) || (data === 4 && dataType)){
				otherCount += 1;
			}
			if ((data === 2 && dataType) ||( data === 3 && dataType) || (data === 4 && dataType) || (data === 5 && dataType)) {
				// 获得 db 值
				num += this.arrayYline1[(arrayL[i][1])];
				count += 1;
			}
        };
        //计算500、1000、2000、4000，的平均值
        //缺少4000 仍然可以求平值，其余3个频率再缺少任意一个值，都不能计算结果
        if(count === 4 || otherCount === 3){
          let total = 0;
          if(count === 4){
            total = 4;
          }else if(otherCount === 3){
            total = 3;
          }
          if(bool_t){//计算听阈平均值
            this.hzAaverage[sing + 'HTL'] = parseInt(num / total);
          }else if(bool_q){//计算气到平均值
            this.hzAaverage['AC' +sing ] = parseInt(num / total);
          } else if(bool_g){//计算骨导平均值
            this.hzAaverage['BC' +sing ] = parseInt(num / total);
          };
        }
        console.log(JSON.stringify(this.hzAaverage))
      };
    },
    // 绘制底图
    add: function () {
      // 绘制右 底层画布
      const rectR = this.svgYou.getBoundingClientRect();
      const rectL = this.svgZuo.getBoundingClientRect();
      this.tu(this.svgYou, rectR.width, rectR.height, '#FF0000',this.coord)
      this.xian(this.svgYou, rectR.width, rectR.height,this.coord)
      // 绘制左 底层画布
      this.tu(this.svgZuo, rectL.width, rectL.height, '#0000FF',this.coord)
      this.xian(this.svgZuo, rectL.width, rectL.height,this.coord)
    },
    // 绘制听力图的x,y轴和计算数值记录
    tu: function (svg, x, y, colors,coord,fontSize) {
      let size = fontSize ? fontSize +'pt' : "10pt";
      this.arrayXcoordinate = [];
      this.arrayYcoordinate = [];
      this.arrayXxiaCoordinate = [];
      this.arrayYline2 = [];
      let arrayXcoordinate = this.arrayXcoordinate;
      let arrayYcoordinate = this.arrayYcoordinate;
      let arrayXxiaCoordinate = this.arrayXxiaCoordinate;
      let arrayYline2 = this.arrayYline2;
      // 画线间隔
      // debugger
      this.xcha = (x - coord.xDis) / arrayX.length;
      this.ycha = (y - coord.yDis) / arrayY.length;
      let xcha = this.xcha;
      let ycha = this.ycha;
      for (var i = 0; i < arrayX.length; i++) {
        arrayXcoordinate.push(i * xcha + coord.xDisCha)
        this.svgText = this.createTag('text', {'x': i * xcha + coord.leftTopX, 'y': coord.dashLineCoord,'style':'font-size:'+size})
        this.svgText.textContent = arrayX[i]
        this.svgText.style.fill = colors
        svg.appendChild(this.svgText)
      };
      // 添加标记
      this.svgText = this.createTag('text', {'x': 0, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      this.svgText.textContent = 'db'
      this.svgText.style.fill = colors
      svg.appendChild(this.svgText)
      this.svgText = this.createTag('text', {'x': arrayX.length * xcha - coord.textCoord, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      this.svgText.textContent = 'Hz'
      this.svgText.style.fill = colors
      svg.appendChild(this.svgText);
      for (var j = 0; j < this.arrayYline1.length; j++) {
        arrayYline2.push(j * ycha / 2 + coord.leftTopX)
      };
      for (var q = 0; q < arrayY.length; q++) {
        arrayYcoordinate.push(q * ycha + coord.leftTopX)
        this.svgText = this.createTag('text', {'x': 0, 'y': q * ycha + coord.leftTopX, 'style': 'font-size:'+size})
        this.svgText.textContent = arrayY[q]
        this.svgText.style.fill = colors
        svg.appendChild(this.svgText)
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
          this.svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k], 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        } else {
          this.svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k] - coord.dashLineCoord, 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        }
        this.svgText.textContent = arrayXxia[k]
        this.svgText.style.fill = colors
        svg.appendChild(this.svgText)
      }
    },
    // 绘制听力图上的坐标线
    xian: function (svg, x, y,coord) {
    	let ycha = this.ycha;
    	let xcha = this.xcha;
      var _strokeStyle = '#000000'
      this.svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': x - xcha + coord.rightTopX, 'y2': coord.rightTopY})
      this.svgLine.style.stroke = _strokeStyle
      svg.appendChild(this.svgLine)
      //
      this.svgLine = this.createTag('line', {'x1': x - xcha + coord.rightTopX, 'y1': coord.rightTopY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha -coord.rightBottomY})
      this.svgLine.style.stroke = _strokeStyle
      svg.appendChild(this.svgLine)
      //
      this.svgLine = this.createTag('line', {'x1': coord.leftBottomX,'y1': y - ycha -coord.leftBottomY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha-coord.rightBottomY})
      this.svgLine.style.stroke = _strokeStyle
      svg.appendChild(this.svgLine)
      //
      this.svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': coord.leftBottomX, 'y2': y - ycha -coord.leftBottomY})
      this.svgLine.style.stroke = _strokeStyle
      svg.appendChild(this.svgLine)
      _strokeStyle = '#d9d9d9';
      let that = this;
      for (var j = 0; j < arrayY.length; j++) {
        this.svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': that.arrayYcoordinate[j], 'x2': x - xcha + coord.rightTopX, 'y2': that.arrayYcoordinate[j]})
        this.svgLine.style.stroke = _strokeStyle
        svg.appendChild(this.svgLine)
      };
      for (var i = 0; i < arrayX.length; i++) {
        this.svgLine = this.createTag('line', {'x1': that.arrayXcoordinate[i], 'y1': coord.leftTopY, 'x2': that.arrayXcoordinate[i], 'y2': y - ycha -coord.leftBottomY})
        this.svgLine.style.stroke = _strokeStyle
        svg.appendChild(this.svgLine)
      };
      for (var k = 0; k < arrayXxia.length; k++) {
        this.drawDashLine(svg, that.arrayXxiaCoordinate[k], y - ycha -coord.leftBottomY, that.arrayXxiaCoordinate[k], coord.dashLineCoord)
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
          this.svgLine = this.createTag('line', {'x1': x1 + (xpos / numDashes) * (i - 1), 'y1': y1 + (ypos / numDashes) * (i - 1), 'x2': x1 + (xpos / numDashes) * i, 'y2': y1 + (ypos / numDashes) * i})
          this.svgLine.style.stroke = '#d9d9d9'
          svg.appendChild(this.svgLine)
        }
      }
    },
    // 画亮线
    liang: function (svg, x, y, colors,coord,svgYou) {
      this.gMove.id = 'moveline'
      // debugger
      if(jq("#moveline").hasChildNodes()){//清空所有的坐标元素
        let childs = jq("#moveline").childNodes
        for (var i = childs.length-1; i >=0 ; i--) {
         jq("#moveline").removeChild(childs[i]) 
        }
      };
        this.svgLine = this.createTag('line', {'x1': x, 'y1': coord.leftTopY, 'x2': x, 'y2': svgYou.getBoundingClientRect().height - ycha -coord.leftBottomY})
        this.svgLine.style.stroke = '#ababab'
        this.gMove.appendChild(this.svgLine)
        //
        this.svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': y, 'x2': svgYou.getBoundingClientRect().width - xcha + coord.rightBottomX, 'y2': y})
        this.svgLine.style.stroke = '#ababab';
        this.gMove.appendChild(this.svgLine)
        // 画虚框
        this.svgLine = this.createTag('rect', {'x': x - 5, 'y': y - 5, 'width': 10, 'height': 10, 'fill': 'none'})
        this.svgLine.style.stroke = colors
        this.gMove.appendChild(this.svgLine)
        svg.appendChild(this.gMove)
    },
    // 放大图画圆
    _bigdrawyuan:function(flag){
      	let objZong = this.addData;
      	objZong.forEach(ele =>{
          	this.control_arr.forEach((item) =>{
        		if(ele.type === item.key){
        			var arr = ele.earData;
        			if(!Array.isArray(arr)){return false;}
        			arr.forEach(arrele =>{
        				const getObj = Utils.getReaderSvgData(arrele),
	        			getReaderSvgData = getObj.alldata;
        				if(arrele.ear === "R"){
        					this.arrayyuan = this.ReadData(getReaderSvgData);
									if(item.key == 6 && ele.order == "A"){//双耳同时测听时的标记
										this.publicFn("right",null,item.markR,true);
									}else{
										this.publicFn("right",null,item.markRight,true);
									}
        				}else if(arrele.ear === "L"){
        					this.arrayyuanzuo = this.ReadData(getReaderSvgData);
									if(item.key == 6 && ele.order == "A"){//双耳同时测听时的标记
										this.publicFn("left",null,item.markL,true);
									}else{
	        					this.publicFn("left",null,item.markLeft,true);
									}
        				}
        			})
        		}
        	})
        })
      // 获取当前类型的坐标点
      this.drawyuan(true)
		},
    drawyuan: function (falg) {
    	if(falg){
    		this.arrayyuanzuo = [];
      	this.arrayyuan = [];
    	}
      let objZong = this.addData;
	    // 根据数据生成表中数据
	    objZong.forEach(ele =>{
	    	var arr = ele.earData;
	    	if(!Array.isArray(arr)){return false;}
    		arr.forEach(arrele =>{
    			const getObj = Utils.getReaderSvgData(arrele),
        			getReaderSvgData = getObj.alldata;
    			this.control_arr.forEach((item) =>{
    				if(arrele.ear === "R"){
    					if(item.value && ele.type === item.key){
								this.arrayyuan = this.ReadData(getReaderSvgData);
							}
        			this.tableText(this.arrayyuan, 'r');
							if(!falg){
								this.publicFn("right");
							}
    				}else if(arrele.ear === "L"){
    					if(item.value && ele.type === item.key){
    						this.arrayyuanzuo = this.ReadData(getReaderSvgData);
							}
							this.tableText(this.arrayyuanzuo, 'l');
							if(!falg){
								this.publicFn("left");
							}
    				}
    			})
				})
			})
    },
    // 读取数据,用于编辑数据
    _editor_drawyuan: function () {
      try{
        const svgData = this.svgMarks;
        // 获取数据，绘制svg
        this.addData = JSON.parse(svgData.data);
        this._bigdrawyuan();
      } catch(err){
        alert(err +'读取数据出错！')
      }
    },
     // 根据 是否能画图的标记 来判断画图的数据
    contrast(flag) {
      	let objZong1 = this.svgData;
      	if(flag){
	      	this.control_arr.forEach((item) =>{
						item.value = true;
					})
      	}
      	this.clearTu1('you' + this.svgId,'1');
      	this.clearTu1('zuo' + this.svgId,'1');
      	this.clearTu1('you' + this.svgId,'2');
      	this.clearTu1('zuo' + this.svgId,'2');
      	this.fontSign = null;
      	for(var i = 0; i < objZong1.length;i++){
        	let objZong = objZong1[i];
        
        	if(i === 0 && objZong1.length > 1){
          	this.handleData(objZong,'#262626','#262626','1')
        	}else{
          	this.handleData(objZong,'#FF0000','#0000FF','2')
        	}
      	}
      	this.createdPng(this.svgZuo,flag)
      	this.createdPng(this.svgYou,flag)
		},
     // 将svg转换成png图片
    createdPng: function (svg,flag) {
    	var doc =document;
			if(doc.getElementById('moveline')){
				this.clearG(svg, this.gMove)
			}
			var ghtml;
			var htmlData = svg.outerHTML;
			if(doc.getElementById(svg.id + 'yuanshi')){
				ghtml = doc.getElementById(svg.id + 'yuanshi').outerHTML;
				htmlData = htmlData.replace(ghtml,'')
			} 
			var svgData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(htmlData)));
			var img = new Image();
			img.width = svg.clientWidth
			img.height = svg.clientHeight
			img.src = svgData;
			var c = doc.createElement('canvas');
			c.width = img.width;
			c.height = img.height;
			var ctx = c.getContext('2d');
			var that = this;
			img.onload = function () {
				ctx.drawImage(img, 0, 0)
				// 图片导出为 png 格式
				var type = 'png'
				var imgData = c.toDataURL(type);
				var item = svg.id.substr(0,3) + 'imgData'
				sessionStorage.setItem(item,imgData);
				// console.log(imgData)
				if(flag){
						that.$store.commit('setAllPrintImgs',imgData);
				}
			}
    },
    // 听力图档案查询画图
    handleData(objZong,color1,color2,str){
			console.log(objZong)
      // 根据数据生成表中数据
			let arrayyuan = this.arrayyuan;
			let arrayyuanzuo = this.arrayyuanzuo;
			// console.log(objZong)
			objZong.forEach(ele =>{
				this.control_arr.forEach((item) =>{
					if(item.value && ele.type === item.key){
						var arr = ele.earData;
						if(!Array.isArray(arr)){return false;}
						arr.forEach(arrele =>{
							const getObj = Utils.getReaderSvgData(arrele),
							getReaderSvgData = getObj.alldata;
							if(arrele.ear === 'R'){
								this.arrayyuan = this.ReadData(getReaderSvgData);
								let obj = {
									'ele' :this.svgYou,
									'arr' : this.arrayyuan,
									'color':color1,
									'mask': item.markRight,
									'type':ele.type,
									'str':str
								};
								if(item.key == 6 && ele.order == "A"){//双耳同时测听时的标记
									obj.mask = item.markR;
								}
								this.yuan(obj);
								this.average('R', obj.arr)
							} else if(arrele.ear === 'L'){
								this.arrayyuanzuo = this.ReadData(getReaderSvgData);
								let obj = {
									'ele' :this.svgZuo,
									'arr' : this.arrayyuanzuo,
									'color':color2,
									'mask': item.markLeft,
									'type':ele.type,
									'str':str
								};
								if(item.key == 6 && ele.order == "A"){//双耳同时测听时的标记
									obj.mask = item.markL;
								}
								this.yuan(obj);
								this.average('L', obj.arr)
							}
						})
					}
				})
			})
    },
    // 调用画圆和计算平均值的函数
    publicFn(hand,data_arr,mark,flag){
    	if(hand === "right"){
    		let obj = {
				'ele' :this.svgYou,
				'arr' : data_arr ? data_arr : this.arrayyuan,
				'color':'#FF0000',
				'mask': mark ? mark :this.fontSign + 'R'
			};
			this.yuan(obj);
	      	flag ? "" : this.average('R', obj.arr);
    	}else{
    		let obj = {
	    		'ele' :this.svgZuo,
	    		'arr' : data_arr ? data_arr : this.arrayyuanzuo,
	    		'color':'#0000FF',
	    		'mask': mark ? mark :this.fontSign + 'L'
	    	};
    		this.yuan(obj);
          	flag ? "" : this.average('L', obj.arr);
        }
    },
    // 助听听阈测试数据结果画图
    drawyuanzhu: function () {
    	let objZong = [];
    	this.addData = this.svgData;
			objZong = this.svgData[0];
			console.log(objZong)
			if(this.ear == "A"){this.fontSign = "FFS"};
			// 生成右耳图
			if (objZong.type === '6') {
				const data = objZong.earData;
				if(!Array.isArray(data)){return false;}
				// 生成渲染的数据格式
				data.forEach(item =>{
					const getObj = Utils.getReaderSvgData(item),
						getReaderSvgData = getObj.alldata,
						sysSvgData = getObj.sysdata,
						dist = getObj.dist;
					if(item.ear === "R"){
						this.arrayyuan = this.ReadData(getReaderSvgData);
						this.sys_arr_r = this.ReadData(sysSvgData);
						this.show_sys_yuan(this.set_r,item.ear,dist);
					}
					if(item.ear === "L"){
						this.arrayyuanzuo = this.ReadData(getReaderSvgData);
						this.sys_arr_l = this.ReadData(sysSvgData);
						this.show_sys_yuan(this.set_l,item.ear,dist);
					}
				})
				this.publicFn("right");
				this.publicFn("left");
			}
			this.createdPng(this.svgZuo);
			this.createdPng(this.svgYou);
    },
    show_sys_yuan(set,ear,dist){
			this.sys_yuan_fn(ear,this.set_data(set,dist))
    },
    set_data(set,dist){
    	set.clear();
			let b = this.ReadData(dist);
			b.forEach(e =>{
				set.add(e)
			})
			return set;
		},
		// 绘制系统修改的原始值
    sys_yuan_fn(hand,set){
    	var obj = {}
    	if(hand === "R"){
    		obj = {
				'ele' :this.svgYou,
				'arr' : Array.from(set),
				'color':'#ccc',
				'mask': this.fontSign + 'R',
				'type':6,
				'str':"R"
			};
    	}else{
    		obj = {
				'ele' :this.svgZuo,
				'arr' : Array.from(set),
				'color':'#ccc',
				'mask': this.fontSign + 'L',
				'type':6,
				'str':"L"
			};
    	}
			this.yuan(obj);
    },
    // 画图
    yuan: function (arg) {
      	this.gTu = this.createTag('g', {})
      	const type = arg.type ? arg.type : "",
      		str = arg.str ? arg.str : "",
      		svg = arg.ele,
      		arr = arg.arr,
      		color = arg.color,
      		mask = arg.mask,
      		masks = type ? "" : arg.mask;
      	this.gTu.id = svg.id + masks + type + str + 'tu';
      	this.gTu.style.fill = color;
      	let fontOp;
      	const that = this;
				// use 的html标签语言
      	for (var i = 0; i < arr.length; i++) {
        	fontOp = mask
        	if (arr[i][0] >= 20) {
        		var a = that.arrayXxiaCoordinate[(arr[i][0] - 20)] ;
        	}else{
        		var a = that.arrayXcoordinate[(arr[i][0])] ;
					}
	      	if (typeof (arr[i][2]) === 'number') {
	        	arr[i][2] === 1 ? fontOp = mask : fontOp = fontOp + 'M';
	      	} else {
	        	arr[i][2] === 'wu' ? fontOp = fontOp + 'N' :"";
	        	arr[i][2] === 'bu' ? fontOp = fontOp + 'C' :"";
					}
					// let weight = fontOp == "FFSL" || fontOp == "FFSR" || fontOp == "FFSLM" || fontOp == "FFSRM" ? "500" : "bold"; 
					// let weight = "bold"; 
	      	// this.svgText = this.createTag('text', {
					// 'x': a - that.markFontSize.top, 'y': that.arrayYline2[(arr[i][1])] + that.markFontSize.top, 'font-family': 'fonteditor', 'font-size':that.markFontSize.size,'font-weight':weight})
					this.svgText = this.createTag('svg',{'xmlns': ming,'x': a - that.markFontSize.top, 'y': that.arrayYline2[(arr[i][1])] - that.markFontSize.top - 4,'viewBox':"0 -212 1024 1024","width":that.markFontSize.size +"px","height":that.markFontSize.size +"px"});
					let path = fontarray[fontOp];
					let use = this.createTag('path',{'d':SvgPath[path],"style":"stroke-width:1000"});
					this.svgText.appendChild(use);
	      	this.gTu.appendChild(this.svgText);
      	}
      	this.tinglixian(svg, this.gTu, arr, color)
    },
    // 听力线
    tinglixian: function (svg, gTu, arrayL, color) {
      // console.log(arrayL)
      // 将画布上圆的x坐标从小到大排序
      arrayL.sort(this.sortNumber)
      var x2,y2,xp,yp,num;
      let arrayXxiaCoordinate = this.arrayXxiaCoordinate;
      let arrayXcoordinate = this.arrayXcoordinate;
      let arrayYline2 = this.arrayYline2;
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
              this.svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              this.svgLine.style.stroke = color;
              this.svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(this.svgLine)
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
              this.svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              this.svgLine.style.stroke = color;
              this.svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(this.svgLine)
            }
          }
        }
      }
      let ele = document.getElementById(gTu.id);
      if (ele) {
        ele.parentNode.removeChild(ele)
      }
      svg.appendChild(gTu)
    },
    // 排序
    sortNumber: function (a, b) {
      var a1
      var b1
      if (a[0] >= 20) {
        a1 = this.arrayXxiaCoordinate[a[0] - 20]
      } else {
        a1 = this.arrayXcoordinate[a[0]]
      };
      if (b[0] >= 20) {
        b1 = this.arrayXxiaCoordinate[b[0] - 20]
      } else {
        b1 = this.arrayXcoordinate[b[0]]
      };
      return a1 - b1
    }
  }
}
</script>
<style lang ="less" >
.drawsvg{
	height: 100%;
	width: 100%;
	.l-ear,.r-ear{
		height: 100%;
	}
	.clear{
       clear:both;
    }
    /*******tab标签*******/ 
    .ibox-title {
    	margin-top: 5px;
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
		.is-checked .el-checkbox-button__inner{
		    background-color: #278bc4 !important;
    		border-color: #278bc4 !important;
    		color: rgb(255, 255, 255);
    		box-shadow: #278bc4 -1px 0px 0px 0px !important;
		}
		.el-checkbox-button__inner{
		    padding:10px 5px;
		    width:130px;
		    /*border:1px solid #ccc;*/
		 }
	}
}
</style>