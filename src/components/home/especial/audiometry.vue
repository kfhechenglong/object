<template>
  <div id="especial-audiometry">
	<div class="audiometry-left fl">
		<div class="liu-top">
			<top @textarea = "textareaChange" :testAccuracy="testAccuracy"></top>
			<div class="group clearfix">
				<span class="fl">记&nbsp;&nbsp;录&nbsp;&nbsp;表：</span>
				<ul  class="clearfix fl" >
					<li v-for="item ,index in newTitle"  class="fl" @click= "showTable(index,item[1])" :class=" currentIndex == index ? 'currentGroup' : ''" disabled>第{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="liu-table" id="aa">
			<table>
				<tr>
					<td v-for="item,index in tableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td">{{item}}</td>
				</tr>
				<tr v-for="val,index1 in tableTr">
				<!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
				<!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
					<td v-for="item,index2 in tableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
						{{ index2 == 0 ? val :''}}
						<!-- 首先判断测试结果是否为空,空则不显示；结果为0不显示 -->
						<!-- 当行的值和列的值相等，且不为空时，显示当前词组正确的个数 -->
						<!-- 当行的值和列的值不相等，且不为空时，显示当前词组错误的个数 -->
						<span v-show="resultData[val] && resultData[val][item] !=0 ">
							{{(item == val)&&(item) ? resultData[val][item] :''}}
							{{(item != val) && (val && item) ? resultData[val][item] :''}}
						</span>
					</td>
				</tr>
			</table>
		</div>
		<!-- <div>{{testComputed}}</div> -->
	</div>
	<div class="audiometry-right fr">
  		<div class="title clearfix">
			<h3 class="fl">控制</h3>
			<div class="fr" style="margin-right: 6px;margin-top: 7px;">
				<goback :isGoBack="gobackFalg" :start="!start">
					<div class="fr" style="line-height:24px;"><i class="fa fa-arrow-left"></i>返回</div>
				</goback>
			</div>
		</div>
		<div class="audiometry-main">
			<!-- 音量控制组件 -->
			<voiceNum v-on:volume="toggleVol"></voiceNum>
			<!-- <dl class="clearfix voice-num">
				<p class="fl">音量控制</p>
				<div class="fl">
					<el-input-number class="num" v-model="value" :step="1" @change="change" :min="1" :max="6"></el-input-number>
				</div>
			</dl> -->
		</div>
		<div class="button">
			<ul class="z-c-t">
				<el-button type="success" :disabled="!start || !isOnline" @click="toStart"><i class="iconfont icon-kaishi"></i>开始</el-button>
				<el-button type="warning" :disabled="start || pauseFalse" v-show="pause"  @click="isPause('pause')"><i class="iconfont icon-zanting"></i>暂停</el-button>
				<el-button type="success" :disabled="start || pauseFalse" v-show="!pause"  @click="isPause('continue')"><i class="iconfont icon-jixu"></i>继续</el-button>
				<el-button type="danger" :disabled="!isSave" @click="toSave"><i class="iconfont icon-baocun"></i>存档</el-button>
				<!-- <el-button type="info" :disabled="!isPrinter">打印</el-button> -->
			</ul>
		</div>
		<div>
			<StartTips :loadOver="dialogVisibleTips"></StartTips>
		</div>
  	</div>
  </div>
</template>
<script>
let res = ""
import util from'../../../common/util'
import {personaladd} from '../../../api/api'
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import Top from '../commonvue/test-top.vue'
import VoiceNum from '../commonvue/voiceNum.vue'
export default {
	components:{
		Goback,
		StartTips,
		Top,
		VoiceNum
	},
 	data(){
 		return {
 			dialogVisibleTips:false,
 			// 按钮控制
 			start:true,
 			pause:true,
 			pauseFalse:false,
 			// 打印按钮
 			isPrinter:false,
 			// 保存按钮
 			isSave:false,
 			wsData:'',
 			value:6,
 			// 测试组
 			group:[],
 			// 每次发送的词
 			sendGroup:[],
 			// 处理后的数据
 			groupList:{},
 			textarea:'',
 			// 当前渲染的表格
 			currentIndex:0,
 			tableList:[],
 			// 组标题
 			newTitle:["一组"],
 			// 表头
 			tableHeader:[],
 			// 渲染的行
 			tableTr : [],
 			// 记录当前发送参数的位置
 			currentHzNum:0,
 			// 记录当前测试的组
 			groupNum:0,
 			// 禁止列表切换
 			toggle:true,
 			// 保存结果
 			resultData:{},
 			// 统计错误和正确的次数
 			success:0,
 			error:0,
 			isOnline:true,
 			vpath:'',
 			voideType:'',
 			objChinese:'',
 			// getVolumNum:0
 		}
 	},
 	mounted(){
 		this.getUrlData();
 		// 默认显示连接对话框

		var that = this;
		// 接收被控端消息websocket连接
		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		})
 		// 接收server msg ctld is online
 		Vm.$on('servermsg',(msg,res,str)=>{
 			if(!that.closeLay){
	 			util.ctld_isOnline(that,res,str,next);
	 			function  next(that){
 					// 禁用暂停，继续按钮
		 			that.pauseFalse = true;
		 			// 开启切换列表
		 			that.toggle = true;
		 			// 启用存档按钮
			        that.isSave = !that.isSave;
	 			}
	 		}
 		});
 		// 初始化默认第一个表格
 		this.$nextTick(function(){
 			this.changeToggle = true;
 			this.showTable(0);
 		})
 	},
 	watch:{
 		// 测试websocket连接
 		wsData:function(){
 			let testparams = this.wsData.params;
 			if(this.wsData.params && testparams.prepare){// 被控端页面准备好后，可进行操作
				this.dialogVisibleTips = false;
			};
			if(testparams['testType'] == 'yinsu'){
				this.groupNum++;
				// 统计测试结果
				if(testparams['group']){
					this.storagedata(testparams['group']);
				}
				// 更换词组
				console.log(this.groupNum)
				if(this.groupNum == 3){
					// 换组
					this.toSendParams();
				}
			}
 		}
 	},
 	created(){
 		// util._getVolumNum(this);//获取音量差值
 		// this.initialVolumeNum = this.$store.state.zhutingData['1000'];
 		// this.volumeNum = this.$store.state.zhutingData['1000'];
 	},
 	computed:{
 		// 测试人
 		name:() =>{
 			return JSON.parse(sessionStorage.getItem('user'));
 		},
 		time:() =>{
 			let date = new Date();
 			let y = date.getFullYear();  
		    let m = date.getMonth() + 1;  
		    m = m < 10 ? '0' + m : m;  
		    let d = date.getDate();  
		    d = d < 10 ? ('0' + d) : d;  
		    return y + '年' + m + '月' + d +'日';
 		},
 		timeToSave:() =>{
 			let date = new Date();
 			let y = date.getFullYear();  
		    let m = date.getMonth() + 1;  
		    m = m < 10 ? '0' + m : m;  
		    let d = date.getDate();  
		    d = d < 10 ? ('0' + d) : d;  
		    return y + '-' + m + '-' + d;
 		},
 		testAccuracy:function(){
 			// 统计正确率
 			let accuracy = this.success/(this.success+this.error)*100 ;
 			return isNaN(accuracy.toFixed(2)) ? '暂无数据': accuracy.toFixed(2)+'%';
 		},
 		// 返回上级
 		gobackFalg:function(){
 			let backfalg = !this.start && !this.isSave;
 			return backfalg;
 		}
 	},
 	beforeRouteLeave(to,form,next){
 		this.closeLay = true;
 		next();
 	},
 	methods:{
 		// 获取路由数据
 		getUrlData(){
 			this.dialogVisibleTips = true;
	 		this.currentear = this.$route.query['isEar']; 
	 		this.group = this.$route.query['data'];
	 		this.currentgame = this.$route.query['crtgame'];
	 		this.voideType = this.$route.query['voideType'];
	 		const group1 = JSON.parse(this.group["radio1"]);
	 		const group2 = JSON.parse(this.group["radio2"]);
	 		// 词组组合
	 		this.groupList = [group1["pinyin"],group2["pinyin"]];
	 		// 获取汉字
			let chinese = [group1["hanzi"],group2["hanzi"]];
			let objChinese = {};
			objChinese[chinese[0]] = this.groupList[0];
			objChinese[chinese[1]] = this.groupList[1];
			this.objChinese = objChinese;
			// 音频文件路径拼接，发送给被控端
			const path1 = group1["path"]+"/"+this.voideType+"/"+group1["name"];
			const path2 = group2["path"]+"/"+this.voideType+"/"+group2["name"];
			this.vpath =  [path1,path2];
			console.log(this.vpath);
 		},
 		// 点击开始按钮
 		toStart(){
 			// 测试的组数
 			this.currentIndex = 0 ;
 			this.showTable(0);
 			// 禁止列表切换
 			this.toggle = false;
 			// 禁用开始按钮
 			this.start = !this.start;
 			this.pauseFalse = false;
 			// 向被控端发送参数
 			this.toSendParams();
 		},
 		// 切换给声音量
 		// change(evt){
 		// 	// 页面初始化后不主动发送数据
 		// 	if(this.changeToggle){
 		// 		this.getVolumNum = (6-evt)*10;
 		// 		var volumeNum = this.initialVolumeNum - this.getVolumNum;
			//     var argument = this.wskt.wstoctld('games_audio_toggle',{'volume':volumeNum});
 		// 		//更新音量值
 		// 		util._setVolumNum(this,{'decibel':this.getVolumNum,'test_id':sessionStorage.getItem('test_id')});
			// 	websocket.send(JSON.stringify(argument));
 		// 	};
 		// },
 		// 切换给声音量
 		toggleVol(e){
 			this.currentVolume = e;
 		},
 		// 接收被控端的数据进行分析
 		storagedata(str){
 			let result = this.resultData;
 			// let id = this.newTitle[this.currentIndex][1];

 			if(this.wsData.params['success'] == "false"){
 				result[str[0]][str[1]]++;
 				result[str[1]][str[0]]++;
 				this.error++;
 			}else{
 				this.success++;
 				result[str[0]][str[0]]++;
 				result[str[1]][str[1]]++;
 			}
 			// 统计每组的正确率
 			result['itemAccuracy'] = (result[str[0]][str[0]] /(result[str[0]][str[0]] + result[str[1]][str[0]])*100).toFixed(2) + '%';
 			// this.resultData = Object.assign(result);
 		},
 		// 发送数据
 		toSendParams(){
 			// debugger;
	    	// if(this.currentHzNum == this.groupTeat.length){
	    		this.toggle = true;
	    		// websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
				let _this = this;
				if(this.groupList.length-1 >this.currentIndex){
				    this.currentIndex++;
		        	// console.log(this.currentIndex)
		        	// 切换渲染的表格
		        	this.showTable(this.currentIndex);
		 			this.toggle = false;
			        // 启用完成按钮
			        // this.isSave = true;
				}else{
 					window.isToggle = false;
					this.$confirm('测听完成!', '提示', {
						closeOnClickModal:false,
						closeOnPressEscape:false,
		              	showCancelButton:false,
			        });
			        // .then(() => {
			        	// 启用完成按钮
			        	_this.isSave = true;
			        	// 禁用开始暂停按钮
			        	_this.pauseFalse = true;
			        	_this.isPrinter = true;
			        // }).catch(() => {
			        // });
				        websocket.send(JSON.stringify(_this.wskt.wstoctld('games_audio_over','')));
				        // 清除高亮提示色
				        _this.clearClass(true);
			      return ;  
			    }
			    this.currentHzNum = 0;
	    	// };
	    	this.sendGroup = this.groupList;
	    	// 音频路径组合
	    	let groupurl = this.vpath;
	    	let currentVolume = this.currentVolume;
	    	let params = {
					'ear':this.currentear,//左右耳信息
			    	'testType':'tone',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'volume':currentVolume,//测听音量
			    	'group':this.sendGroup,//当前词组
			    	'groupurl':groupurl,
			    	'level':this.$route.query['level']
			    }
			console.log(params)
			this.clearClass(false);//调用样式函数
			let argument = this.wskt.wstoctld('games_audio_start',params);
	    	websocket.send(JSON.stringify(argument));
 			this.currentHzNum++;
 			this.groupNum = 0;
 		},
 		// 控制表头的class类
 		clearClass(str){
 			let td = this.$refs.td;
	    	for (let i = 0; i <td.length; i++) {
	    		// 获取元素的类
	    		let classVal = td[i].getAttribute("class");
	    		// 移除里面的类
	    		classVal = classVal.replace(" highlight",'');
	    		classVal = classVal.replace(" pasehighlight",'');
	    		td[i].setAttribute("class",classVal);
	    		setTimeout(() =>{
		    		if(td[i].innerHTML == this.sendGroup[0] || td[i].innerHTML ==this.sendGroup[1]){
			    		if(!str){
				    		classVal = classVal.concat(" highlight");
				    		td[i].setAttribute("class",classVal)
				    	};
			    		if(!this.pause && !this.pauseFalse){
			    			classVal = classVal.concat(" pasehighlight");
							td[i].setAttribute("class",classVal)
			    		}
		    		};
		    	},50);
	    	}
 		},
 		isPause(str){
 			// this.toSendParams();
 			this.pause = !this.pause;
 			if(str === "continue"){
 				this.isSave = false;
 				this.clearClass(false);
 				// 发送暂停指令
		    	websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
 			}else{
 				this.isSave = true;
 				this.clearClass(true);
 				// 发送继续指令
 				websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
 			}
 			
 		},
 		textareaChange(e){
 			this.textarea = e.textarea;
 			this.time = e.time;
 		},
 		// 存档按钮
 		toSave(){
 			if(!this.pauseFalse){
 				// 清除高亮提示色
				this.clearClass(true);
	 			// 启用打印按钮			
	 			this.isPrinter = true;
	 			// 禁用暂停，继续按钮
	 			this.pauseFalse = true;
	 			// 开启切换列表
	 			this.toggle = true;
 			}
 			// 控制点击频率
 			// util._click(this,save);
 			save(this);
 			function save (str){
 				// 如果数据保存成功则不在保存
 				// 保存数据
 				if(str.isSaveSuccess){
 					msgTipsSuccess(str,'您已提交过数据!');
 					return
 				};
				const info = JSON.parse(sessionStorage.getItem('user_text'));
	 			const resultSave = {
	 				user_id :JSON.parse(sessionStorage.getItem('user_id')),
	 				"chinese":str.objChinese,
	 				data:{1:str.resultData},
	 				'time':str.timeToSave,
	 				'teacher':JSON.parse(sessionStorage.getItem('user')),
	 				'accuracy':str.testAccuracy,
	 				'textarea':str.textarea,
	 				'ear':str.currentear,
	 				'testType':str.currentgame,
	 				...info
	 			};
	 			console.log(resultSave);
	 			personaladd(resultSave).then((response) =>{
	 				console.log(response);
	 				if(response.code === 200){
	 					str.isSaveSuccess = true;
	 					msgTipsSuccess(str,'提交成功!');
	 				}else{
	 					msgTipsErr(str,'提交失败!');
	 				}
	 			}).catch((error) =>{
	 				console.log(error);
	 				alert(error +'提交失败！');
	 			})
 			};
 			
 		},
 		// 当前要显示的表格
 		showTable(str,id){
 			// 点击开始之后，禁止切换列表
 			if(!this.toggle){return false;}
 			// 获取到期表格词组的ID值
 			if(!id){
 				// id = this.newTitle[str][1]
 			}
 			id = this.newTitle[0][1]
 			console.log(id)
 			// 当前列表的词组组合
 			// this.groupTeat = util.groupArray(this.groupList[str]);
 			// 获取当前词组path
 			// this.groupPath = util.groupArray(this.newpath[str]);
 			// 获取音频的url
 			// this.sendvpath = this.vpath[str];
 			// console.log(this.groupTeat,this.groupPath,this.sendvpath);
 			// 当前渲染的表格
 			this.currentIndex = str;
 			// this.tableList = this.groupList[str];
 			this.tableList = this.groupList;
 			// console.log(this.tableList)
 			// 生成当前词组的数据格式,如果有该id的数据就不添加
 			// if(!this.resultData[id]){
 				let Result = {}
	 			for (let i = 0; i < this.tableList.length; i++) {
	 				let aaa = this.tableList[i]
	 				// Result[aaa] = {};
	 				this.$set(this.resultData,aaa,{});
	 				for (let j = 0; j < this.tableList.length; j++) {
	 					let bb = this.tableList[j];
	 					// console.log(bb)
	 					// Result[aaa][bb] = 0;
	 					this.$set(this.resultData[aaa],bb,0);
	 				}
	 			}
	 			// 统计正确的词组
	 			// Result['success'] = [];
	 			// Result['error'] = [];
	 			// 统计正确率
	 			// Result['itemAccuracy'] = 0;
	 			// 响应监听数据变化
	 			this.$set(this.resultData,'itemAccuracy',0);
	 			// console.log(this.resultData)
 			// }
 			// console.log(this.resultData)
 			// 如果当前的词组元素小于6个，则添加空元素
 			let tableshow  = [];
 			if(this.tableList.length <6){
 				// console.log(this.tableList)
 				tableshow = this.tableList.concat();
 				for (let i = 0; i < 6 - this.tableList.length; i++) {
 					tableshow.push('')
 				}
 			}else{
 				tableshow = this.tableList.concat();
 			}
 			this.tableTr = tableshow;
 			// 数组深拷贝实现表头
 			this.tableHeader = tableshow.concat();
 			this.tableHeader.unshift(' ');
 			// 绘制表格
			this.$nextTick(function(){
				// 初始化表格
				util.initTable('#aa','td',tableshow.length,tableshow.length);
			});
 		},
		lookResult(){
			this.disabled =true;
			// 如果被控端连接成功
			if(this.isOnline){
				websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_over','')));
			}
			
		}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less" >
@bgc:#fff;
@bor:#5e9b71;
@hover:#5c946c;
	#especial-audiometry{
		width: 1330px;
		height: 600px;
		margin:80px auto;
		.audiometry-right{
			width: 420px;
			background-color: @bgc;
			height: 100%;
			border:6px solid @bor;
			.active{
				background-color: @hover;
				color:#fff;
			}
			.title{
				h3{
					margin:0px;
					margin-left:30px;
					line-height: 50px;
					font-size: 20px;
				}
				border-bottom: 3px solid @bor;
			}
			dt,h3,.demonstration{
				color:#579b6a;
			}
			.audiometry-main{
				margin-top:30px;
			}
			.button{
				margin:130px 88px;
				ul,li{
					list-style: none;
					margin:0px;
					padding: 0px;
				}
				.el-button+.el-button{
					margin-left: 0px;
				}
				button{
					width: 260px;
					height: 60px;
					margin-bottom: 10px;
					border-radius: 5px;
					cursor: pointer;
					color: #fff;
					text-align: center;
					font-size: 24px;
				}
			}
		}
		.audiometry-left{
			width: 770px;
			border:6px solid @bor;
			height: 600px;
			background-color: #fff;
			.liu-top{
				font-size: 20px;	
				margin:30px 70px 15px 70px;
				color:#333;
			}
			.liu-table{
				margin:0px auto;
				width: 90%;
				height: 250px;
				table{
					width: 100%;
					height: 100%;
					border-collapse: collapse; 
				}
				/*表头背景色*/
				.headerbg{
					background-color: #eef1f6;
				}
				.gray{
					background-color: #eee;
				}
				
				/*背景色高亮*/
				.highlight{
					background-color: orange;
					box-shadow: 0 0 5px orange;
					opacity:0.3;
					-webkit-animation-name: light;
					-webkit-animation-duration: 500ms;
					-webkit-animation-iteration-count: infinite;
					-webkit-animation-timing-function: ease-in-out;
				}
				.pasehighlight{
					background-color: orange;
					box-shadow: 0 0 5px orange;
				}
				@-webkit-keyframes light{
					0% {
					        opacity:0.1;
					    }
					100% {
					        opacity:1;  
					    }
				}
				td,th{
					box-sizing: border-box;
					text-align: center;
					padding:0px;
					border: 1px solid #ccc;
				}
			}
			
		}
		.tips{
			.el-dialog__header,.el-dialog__body{
				padding:0px;
			}
			img{
				width: 100%;
			}
		}
	}
</style>
