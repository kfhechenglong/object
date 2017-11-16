<template>
  <div id="liu-audiometry">
	<div class="audiometry-left fl">
		<div class="liu-top">
		<!-- 头部信息 -->
			<top @textarea = "textareaChange"></top>
			<div class="group clearfix">
				<span class="fl">记&nbsp;&nbsp;录&nbsp;&nbsp;表：</span>
				<!-- <ul  class="clearfix fl">
					<li v-for="item ,index in newTitle"  class="fl" @click= "showTable(index,item[1])" :class=" currentIndex == index ? 'currentGroup' : ''" disabled>第{{item[0]}}</li>
				</ul> -->
			</div>
		</div>
		<div class="liu-table" id="aa">
			<table>
				<tr>
					<td v-for="item,index in tableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td"><span>{{item}}</span></td>
				</tr>
				<tr v-for="val,index1 in distance">
				<!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
				<!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
					<td v-for="item,index2 in tableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
						<span v-if="index2 == 0">{{val}}</span>
						<!-- 首先判断测试结果是否为空,空则不显示；结果为0不显示 -->
						<!-- 当行的值和列的值相等，且不为空时，显示当前词组正确的个数 -->
						<!-- 当行的值和列的值不相等，且不为空时，显示当前词组错误的个数 -->
						<span v-if="resultData[1][item] && resultData[1][item][val]">
							<span v-if="resultData[1][item][val]['success'] >= 2 ">{{'√'}}</span>
							<span v-else-if="resultData[1][item][val]['false'] >= 2 ">{{'×'}}</span>
							<span v-else>{{"—"}}</span>
						</span>
					</td>
				</tr>
			</table>
		</div>
		<!-- <Star :distance="distance" :value="valueStar"></Star> -->
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
			<dl class="clearfix">
				<span class="demonstration fl">距离：</span>
				<el-checkbox-group v-model="distance" size="large">
						<el-checkbox-button v-for="item in distance" :label="item" :key="item" disabled>{{item+'m'}}</el-checkbox-button>
				</el-checkbox-group>
			</dl>
		</div>
		<div class="button">
			<ul class="z-c-t">
				<el-button type="success" :disabled="!start || !isOnline" @click="toStart"><i class="iconfont icon-kaishi"></i>开始</el-button>
				<el-button type="warning" :disabled="start || pauseFalse" v-show="pause"  @click="isPause('pause')"><i class="iconfont icon-zanting"></i>暂停</el-button>
				<el-button type="success" :disabled="start || pauseFalse" v-show="!pause"  @click="isPause('continue')"><i class="iconfont icon-jixu"></i>继续</el-button>
				<el-button type="danger" :disabled="!isSave" @click="toSave"><i class="iconfont icon-baocun"></i>存档</el-button>
				<el-button type="info" :disabled="!isPrinter"  @click="_print"><i class="iconfont icon-iconfontdayinji"></i>打印</el-button>
			</ul>
		</div>
		<div>
			<StartTips :loadOver="dialogVisibleTips"></StartTips>
		</div>
  	</div>
  	<Print ref="print" :distance="distance" :tableHeader="tableHeader" :info="printInfo" :resultData="resultData" :resultEstimateArry="resultEstimateArry"></Print>
  </div>
</template>
<script>
let res = "";
let hasTrueData = false;
import util from'../../../common/util'
import {assess} from '../../../api/api'
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import Print from '../commonvue/printliu.vue'
import Star from '../commonvue/star/liustar.vue'
import Top from '../commonvue/test-top.vue'
export default {
	components:{
		Goback,
		StartTips,
		Print,
		Star,
		Top
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
 			newTitle:[],
 			// 表头
 			tableHeader:[],
 			// 渲染的行
 			tableTr : [],
 			// 记录当前发送参数的位置
 			currentHzNum:1,
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
 			distance:[],//测试的距离
 			distanceNum:0,//当前测试的距离
 			volumeNum:80,//当前测试的音量
 			getVolumNum: 0,//音量衰减值
 			// value2: 5,
 			// value5: 4,
 			valueStar:{},
 			resultEstimateArry:[],
 			currentear:''
 		}
 	},
 	mounted(){
 		// 默认显示连接对话框
 		this.dialogVisibleTips = true;
 		this.currentear = this.$route.query['isEar']; 
 		let groupString = this.$route.query['data'];
 		console.log(groupString)
 		if (Object.prototype.toString.call(groupString) !== "[object Array]"){
 				groupString.split('');
 				groupString = [groupString]
 			}
 		let group = [];
 			groupString.forEach((item) =>{
 				group.push(JSON.parse(item))
 			});
 		this.group = group;
 		this.currentgame = this.$route.query['crtgame'];
 		// 接收测试距离
 		this.distance = this.$route.query['distance'];
 		// 接收测试环境
 		this.environment = this.$route.query['environment'];
 		console.log(this.distance,this.environment)
 	
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
 		// 获取处理后的数组数据
 		const toArray = util.toArray(this.group);
 		this.groupList = toArray['newArr'];
		this.newTitle =  toArray['newTitle'];
		this.newpath =  toArray['newpath'];
		this.vpath =  toArray['vpath'];
		// console.log(this.groupList,this.newTitle,this.newpath,this.vpath)
		// 将词组进行组合
		// this.groupTeat = util.groupArray(this.groupList[0]);
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
				// console.log(this.groupNum);
			}
 		}
 	},
 	created(){
 		util._getVolumNum(this);//获取音量差值
 		this.volumeNum = this.$store.state.zhutingData['1000'];
 		// console.log(this.volumeNum)
 	},
 	computed:{
 		timeToSave:() =>{
		    return util.dateToggle('-','-','',);
 		},
 		// 返回上级
 		gobackFalg:function(){
 			let backfalg = !this.start && !this.isSave;
 			return backfalg;
 		},
 		// 打印要填写的信息
 		printInfo:function(){
			let ear = this.currentear== 'L' ? '左耳' : (this.currentear == 'R' ? '右耳' : '双耳');
 			let info = {
 				'teacher':this.name,
 				'time':this.time,
 				'ear':ear,
 				'environment':this.environment
 			};
 			return info;
 		},
 	},
 	beforeRouteLeave(to,form,next){
 		this.closeLay = true;
 		next();
 	},
 	methods:{
 		// 打印
 		_print(){
 			this.$refs.print._isToPrint();
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
 		// 接收被控端的数据进行分析
 		storagedata(str){
 			let result = this.resultData;
 			let id = this.newTitle[this.currentIndex][1];
 			let distance = this.distance[this.distanceNum - 1];
 			if(this.wsData.params['success'] == "false"){
 				result[id][str[0]][distance]['false']++;
 				if( result[id][str[0]][distance]['false'] >= 2){
 					if(distance == '0.5' || distance == '1.0'){
 						this.currentHzNum += 1;
 						this.distanceNum = 0;
 					}
 					hasTrueData = true;
 					this.toSendParams();
 				}
 				this.error++;
 			}else{
 				this.success++;
 				result[id][str[0]][distance]['success']++;
 				if( result[id][str[0]][distance]['success'] >= 2){
 					hasTrueData = true;
 					this.toSendParams();
 				}
 				// result[id][str[1]][str[1]]++;
 			}
 			console.log(result)
 			// result[id]['itemAccuracy'] = '50%';
			if(this.groupNum == 3){// 换组
				hasTrueData = true;
				this.toSendParams();
			}
 			// this.resultData = Object.assign(result);
 		},
 		// 发送数据
 		toSendParams(){
 			// debugger;
 			if(this.distanceNum >= this.distance.length){
 			//判断当前词组下的距离是否测听完成
	    		this.distanceNum = 0;
	    		this.currentHzNum++;
	    	}
	    	if(this.currentHzNum > this.groupTeat.length){
	    	//判断整个测听是否完成
	    		this.toggle = true;
				let _this = this;
				window.isToggle = false;
				this.$confirm('测听完成!', '提示', {
					closeOnClickModal:false,
					closeOnPressEscape:false,
	              	showCancelButton:false,
		        });
	        	// 启用完成按钮
	        	_this.isSave = true;
	        	_this.pauseFalse = true;
	        	_this.isPrinter = true;
		        websocket.send(JSON.stringify(_this.wskt.wstoctld('games_audio_over','')));
		        // 清除高亮提示色
		        _this.clearClass(true);
		        // 统计数据
		        _this._computedEstimate();
		      return ;  
	    	};
	    	// 获取发送的词组组合
	    	this.sendGroup = this.groupTeat[this.currentHzNum - 1];
	    	let sendPath = this.groupPath[this.currentHzNum - 1];
	    	let currentDistance = this.distance[this.distanceNum];//当前的测听距离
	    	// 获取当前的音量
	    	let currentVolume = this.volumeNum - this.getVolumNum - Math.ceil(+currentDistance - 0.5)*6;
	    	// let currentVolume = this.volumeNum - Math.ceil(+currentDistance - 0.5)*6;
	    	console.log(this.distance,currentVolume);
	    	// 音频路径组合
	    	let groupurl = [this.sendvpath+sendPath[0],'null'];
	    	let params = {
					'ear':this.currentear,//左右耳信息
			    	'testType':'liu',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'volume':currentVolume,//测听音量
			    	'group':this.sendGroup,//当前词组
			    	'groupurl':groupurl,
			    	'level':this.$route.query['level']
			    }
			console.log(params);
			this.clearClass(false);//调用样式函数
			let argument = this.wskt.wstoctld('games_audio_start',params);
	    	websocket.send(JSON.stringify(argument));
 			this.distanceNum++;
 			// this.currentHzNum++;
 			this.groupNum = 0;
 		},
 		// 控制表头的class类
 		clearClass(str){
 			// let td = this.$refs.td;
 			let td = jq('.headerbg');
	    	for (let i = 0; i <td.length; i++) {
	    		let span = td[i].getElementsByTagName('span')[0];
	    		// 获取元素的类
	    		let classVal = td[i].getAttribute("class");
	    		// 移除里面的类
	    		classVal = classVal.replace(" highlight",'');
	    		classVal = classVal.replace(" pasehighlight",'');
	    		td[i].setAttribute("class",classVal);
	    		setTimeout(() =>{
		    		if(span.innerHTML == this.sendGroup[0] || span.innerHTML == this.distance[this.distanceNum-1]){
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
 		// 计算综合评价的结果
 		_computedEstimate(){
 			const result = this.resultData[1];
 			// let resultEstimate = {'0.5':{'success':[],'error': ['a','m']},'1.0':{'success':[],'error': []},'2.0':{'success':[],'error': ['i','sh']}};
 			let resultEstimate = {'0.5':{'success':[],'error': []},'1.0':{'success':[],'error': []},'2.0':{'success':[],'error': []}};
 			for(let key in result){
 				if(typeof result[key]  === 'object'){
 					let value  = result[key];
 					// console.log(key)
 					for( let item in value){
 						// console.log(item)
 						if(value[item]['success'] >= 2){
 							resultEstimate[item]['success'].push(key)
 						};
 						if(value[item]['false'] >= 2){
 							resultEstimate[item]['error'].push(key)
 						};
 					}
 				}
 			};
 			// debugger;
 			let resultEstimateArry = []
 			for (var i = 0; i < this.distance.length; i++) {
 				for(let j in resultEstimate){
 					if( j === this.distance[i]){
 						let aa = +((resultEstimate[j]['success'].length/6)*5).toFixed(0);
 						resultEstimateArry.push(aa*2);
 					}
 				};
 			};
 			// 测试结果有效距离建议判断
 			if(resultEstimateArry[resultEstimateArry.length-1] < 2){
 				console.log('不合格')
 			}else{
 				for (var k = resultEstimateArry.length-1; k >= 0; k--) {
	 				if(resultEstimateArry[k] === 10){
	 					if(this.distance[k] === '0.5'){console.log('在距离'+this.distance[k]+'合格');break}
	 					if(this.distance[k] === '1.0'){console.log('在距离'+this.distance[k]+'良好');break}
	 					if(this.distance[k] === '2.0'){console.log('在距离'+this.distance[k]+'优秀');break}
	 				}
	 			}
 			};
 			// 测试结果综合评价星星
 			let value5 = +((resultEstimate['0.5']['success'].length/6)*5).toFixed(0);
 			let value1 = +((resultEstimate['1.0']['success'].length/6)*5).toFixed(0);
 			let value2 = +((resultEstimate['2.0']['success'].length/6)*5).toFixed(0);
 			this.resultEstimateArry = resultEstimateArry;
 			this.valueStar = {'value1':value1,'value2':value2,'value5':value5,'all':resultEstimateArry};
 			this._judgementStandard(resultEstimate);
 			console.log(resultEstimate)
 		},
 		// 测试结果对比，分析数据，得出结论
 		_judgementStandard(obj){
			let arrObj = new Array;
 			for(let key in obj){
 				 arrObj.push(obj[key]['error']);
 			};
 			// console.log(arrObj)
 			let one = arrObj[0];
 			let two = arrObj[1];
 			let three = arrObj[2];
 			let result = "";
 			util.arrayRemove();//调用数组的删除方法
 			for (let i = 0; i < one.length; i++) {
 				switch(one[i]){
 					case 'm':
 					two.remove('u');
 					three.remove('u');
 					break;
 					case 'u':
 					two.remove('m');
 					three.remove('m');
 					break;
 					case 'i':
 					two.remove('u');
 					three.remove('u');
 					break;
 				}
 			};
 			for (let i = 0; i < two.length; i++) {
 				switch(two[i]){
 					case 'm':
 					three.remove('u');
 					break;
 					case 'u':
 					three.remove('m');
 					break;
 					case 'i':
 					three.remove('u');
 					break;
 				}
 			}
 			// console.log(arrObj)
 			// return;
 			for (var n = 0; n < arrObj.length; n++) {
 				// console.log(arrObj[n])
 				if(n === 0){res(arrObj[n],'0.5米距离下')}
 				if(n === 1){res(arrObj[n],'1.0米距离下')}
 				if(n === 2){res(arrObj[n],'2.0米距离下')}
 			}
 			function res(arrObj,key){
 				if(arrObj.length > 0){
					let m = false,
						i = false,
						u = false;
					for (let j = 0; j < arrObj.length; j++) {
						let string = arrObj[j];
						switch(string){
							case 'a':
								result += (key+'，中频听力不好！');
								console.log(key+'，中频听力不好！'); 
			                break;
			                case 'sh':
			                	result += (key+"，2-4k高频听的不好！");
								console.log(key+"，2-4k高频听的不好！"); 
			                break;
			                case 's':
			                	result += (key+"，3-7k高频听的不好！建议做高频！");
								console.log(key+"，3-7k高频听的不好！建议做高频!"); 
			                break;
			                case 'm':
								m = true;
			                break;
			                case 'u':
								u = true;
			                break;
			                case 'i':
								i = true;
			                break;
						}
						// console.log(arrObj[j])
					}
					if(m || u){//如果m错误
						let conterror = '，200-500赫兹低频的不好！'
						if(u){
							conterror = "，900赫兹低频的不好！"
						}
						if(m && u){//如果u错误
							conterror = "，低频的不好！"
						}
						result += (key+conterror);
						console.log(key+conterror); 
					};
					if(i){//如果m错误
						let conterror = '，2500赫兹低频的不好'
						if(u){//如果u错误
							conterror = "，300hz的不好！"
						}
						console.log(key+conterror); 
						result += (key+conterror);
					};
				}
 			}
 			console.log(result)
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
 			};
 			this._computedEstimate()//统计综合评价结果
 			// 控制点击频率
 			// util._click(this,save);
 			save(this);
 			function save (str){
 				// 如果数据保存成功则不在保存
 				// 保存数据
 				// if(!hasTrueData){
 				// 	msgTipsSuccess(str,'提交的数据不能为空!');
 				// 	return
 				// }
 				if(str.isSaveSuccess){
 					msgTipsSuccess(str,'您已提交过数据!');
 					return
 				};
 				let info = JSON.parse(sessionStorage.getItem('user_text'));
 				const user_id = JSON.parse(sessionStorage.getItem('user_id'));
 				const type_id = sessionStorage.getItem('test_id');
	 			const resultSave = {
	 				user_id :user_id,
	 				type_id :type_id,
	 				data:JSON.stringify(str.resultData),
	 				'time':str.timeToSave,
	 				'teacher':JSON.parse(sessionStorage.getItem('user')),
	 				'accuracy':JSON.stringify(str.valueStar),
	 				'textarea':str.textarea,
	 				'ear':str.currentear,
	 				'testType':str.currentgame,
	 				'environment':str.environment,
	 				...info
	 			};
	 			assess(resultSave).then((response) =>{
	 				console.log(response);
	 				if(response.code =="200"){
	 					str.isSaveSuccess = true;
	 					// 查询未测名单
	 					util.getLocalStorage(user_id,type_id);
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
 				id = this.newTitle[str][1]
 			}
 			// 当前列表的词组组合
 			this.groupTeat = util.toArrayLin(this.groupList[str]);
 			// 获取当前词组path
 			this.groupPath = util.toArrayLin(this.newpath[str]);
 			// 获取音频的url
 			this.sendvpath = this.vpath[str];
 			// console.log(this.groupTeat,this.groupPath,this.sendvpath);
 			// 当前渲染的表格
 			this.currentIndex = str;
 			this.tableList = this.groupList[str];
 			// 生成当前词组的数据格式,如果有该id的数据就不添加
 			if(!this.resultData[id]){
 				let Result = {}
	 			for (let i = 0; i < this.tableList.length; i++) {
	 				let aaa = this.tableList[i]
	 				Result[aaa] = {};
	 				for (let j = 0; j < this.distance.length; j++) {
	 					let bb = this.distance[j];
	 					Result[aaa][bb] = {};
	 					Result[aaa][bb]['success'] = 0;
	 					Result[aaa][bb]['false'] = 0;
	 				}
	 			}
	 			// 统计正确的词组
	 			// Result['success'] = [];
	 			// Result['error'] = [];
	 			// 统计正确率
	 			// Result['itemAccuracy'] = 0;
	 			// 响应监听数据变化
	 			this.$set(this.resultData,id,Result);
	 			console.log(this.resultData)
	 			// console.log(this.resultData[1]['m'][1])
 			}
 			// console.log(this.resultData)
 			// 如果当前的词组元素小于6个，则添加空元素
 			let tableshow  = this.tableList.concat();
 			// if(this.tableList.length <6){
 			// 	tableshow = ;
 			// 	for (let i = 0; i < 6 - this.tableList.length; i++) {
 			// 		tableshow.push('')
 			// 	}
 			// }else{
 			// 	tableshow = this.tableList.concat();
 			// }
 			this.tableTr = tableshow;
 			// 数组深拷贝实现表头
 			this.tableHeader = tableshow.concat();
 			this.tableHeader.unshift('距离（米）');
 			// 绘制表格
			// this.$nextTick(function(){
				// 初始化表格
				// util.initTable('#aa','td',tableshow.length,tableshow.length);
			// });
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
	#liu-audiometry{
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
				dl{
					margin-top:30px;
				}
				dt,.demonstration{
					float: left;
				    margin-left: 65px;
				    margin-top: 4px;
				    font-size: 22px;
				    
				}
				dd{
					float: left;
				}
				.demonstration{
					margin-left: 15px;
				}
				.block{
					width: 245px;
				    margin-right: 20px;
				    margin-left: 20px;
					.el-slider__runway.show-input{
						margin-right:90px;
					}
					.el-input-number{
						width: 105px;
					}
					.el-slider__button-wrapper{
						top:-18px;
						.el-slider__button{
							width: 25px;
							height: 40px;
							border-radius:10%;
						}
						.el-slider__button.dragging, .el-slider__button.hover, .el-slider__button:hover{
							transform: scale(1.1);
							background: red;
						}
					}
				}
			}
			.button{
				margin:85px 88px;
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
				height: 170px;
				table{
					width: 100%;
					/*height: 100%;*/
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
					width: 50px;
				}
				tr{
					height: 45px;
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
