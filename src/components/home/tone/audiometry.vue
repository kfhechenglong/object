<template>
  <div id="tone-audiometry" class="clearfix">
	<div class="audiometry-left fl">
		<div class="tone-top">
			<top @textarea = "textareaChange"></top>
			<div class="group clearfix">
				<span class="fl" @click="_statisticsAccuracy">记&nbsp;&nbsp;录&nbsp;&nbsp;表：</span>
				<ul  class="clearfix fl">
					<li v-for="item ,index in newTitle"  class="fl" @click= "showTable(index,item[1])" :class=" currentIndex == index ? 'currentGroup' : ''" disabled>第{{item[0]}}</li>
				</ul>
			</div>
		</div>
		<div class="tone-table" id="aa">
			<table>
			<!-- (item == sendGroup[0] || item == sendGroup[1])?'highlight':'', -->
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
						<span v-if=" (index1 === 0) && statisticsAccuracy[item]">
							{{statisticsAccuracy[item]['statistics']}}
						</span>
						<span v-if=" (index1 === 1) && statisticsAccuracy[item]">
							<i v-for="ele in statisticsAccuracy[item]['hasFalse']"><em v-if="ele != '—'">{{item}}/</em>{{ele}}&nbsp;</i>
						</span>
					</td>
				</tr>
			</table>
		</div>
		<toneStar :starValue="starValue" :groupId="groupId"></toneStar>
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
			<!-- <dl class="clearfix voice-num">
				<p class="fl">音量控制</p>
				<div class="fl">
					<el-input-number class="num" v-model="value" :step="1" @change="change" :min="1" :max="6"></el-input-number>
				</div>
			</dl> -->
			<!-- 音量控制组件 -->
			<voiceNum v-on:volume="toggleVol"></voiceNum>
		</div>
		<div class="button">
			<ul class="z-c-t">
				<el-button type="success" :disabled="!start || !isOnline" @click="toStart"><i class="iconfont icon-kaishi"></i>开始</el-button>
				<el-button type="warning" :disabled="start || pauseFalse" v-show="pause"  @click="isPause('pause')"><i class="iconfont icon-zanting"></i>暂停</el-button>
				<el-button type="success" :disabled="start || pauseFalse" v-show="!pause"  @click="isPause('continue')"><i class="iconfont icon-jixu"></i>继续</el-button>
				<el-button type="danger" :disabled="!isSave" @click="toSave"><i class="iconfont icon-baocun"></i>存档</el-button>
				<el-button type="info" :disabled="!isPrinter" @click="_print"><i class="iconfont icon-iconfontdayinji"></i>打印</el-button>
			</ul>
		</div>
		<div>
			<StartTips :loadOver="dialogVisibleTips"></StartTips>
		</div>
  	</div>
  	<Print ref="print" :starValue="starValue" :info="printInfo" :jieguo="statisticsAccuracy" :rederData="resultData"></Print>
  </div>
</template>
<script>
let res = ""
let numFalg = 0;
let hasTrueData = false;//判断是否有测试数据
import util from'../../../common/util'
import {assess} from '../../../api/api'
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import Print from '../commonvue/printTone.vue'
import {mapState} from 'vuex'
import toneStar from '../commonvue/star/tonestar.vue'
import Top from '../commonvue/test-top.vue'
import VoiceNum from '../commonvue/voiceNum.vue'
export default {
	components:{
		Goback,
		StartTips,
		Print,
		toneStar,
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
 			groupId:Number,
 			tableList:[],
 			// 组标题
 			newTitle:[],
 			// 表头
 			tableHeader:[],
 			// 渲染的行
 			tableTr : ['识别率','混淆'],
 			// 记录当前发送参数的位置
 			currentHzNum:0,
 			// 记录当前测试的组
 			groupNum:0,
 			currentVolume:null,//当前测试的音量
 			// 禁止列表切换
 			toggle:true,
 			// 保存结果
 			resultData:{},
 			// 统计错误和正确的次数
 			success:0,
 			error:0,
 			isOnline:true,
 			vpath:'',
 			currentear:'',
 			statisticsAccuracy:{},//统计正确率
 			starValue:{},//星级综合评价
 			getVolumNum:20
 		}
 	},
 	mounted(){
 		// 默认显示连接对话框
 		this.dialogVisibleTips = true;
 		this.currentear = this.$route.query['isEar'];
 		let groupString = this.$route.query['data'];
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
 		// console.log(this.group)
		let that = this;
		// 接收被控端消息websocket连接
		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
 		// 接收server msg ctld is online
 		Vm.$on('servermsg',(msg,res,str)=>{
 			// console.log(res)
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
		// 将词组进行组合
		// this.groupTeat = util.groupArray(this.groupList[0]);
 		// 初始化默认第一个表格
 		this.$nextTick(function(){
 			this.changeToggle = true;
 			this.showTable(0);
 		});
 	},
 	watch:{
 		// 测试websocket连接
 		wsData:function(){
 			let testparams = this.wsData.params;
			if(testparams['testType'] === 'yinsu'){
				this.groupNum++;
				// 统计测试结果
				if(testparams['group']){
					this.storagedata(testparams['group']);
				};
			};
			if(this.wsData.params && testparams.prepare){// 被控端页面准备好后，可进行操作
				this.dialogVisibleTips = false;
			};
 		},
 	},
 	created(){
 	},
 	computed:{
 		timeToSave:() =>{
		    return util.dateToggle('-','-','',);
 		},
 		// 打印要填写的信息
 		printInfo:function(){
 			let ear = this.currentear=== 'L' ? '左耳' : (this.currentear === 'R' ? '右耳' : '双耳');
 			let info = {
 				'teacher':this.name,
 				'time':this.time,
 				'ear':ear,
 				'environment':'安静'
 			};
 			return info;
 		},
 		aaa(){
 			return this.$store.state.CMDisOnline
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
 		// 打印
 		_print(){
 			this.$refs.print._isToPrint();
 		},
 		// 点击开始按钮
 		toStart(){
	   		Common.toStart(this)
 		},
 		// 切换给声音量
 		toggleVol(e){
 			this.currentVolume = e;
 		},
 		// 接收被控端的数据进行分析
 		storagedata(str){
 			let result = this.resultData;
 			let id = this.newTitle[this.currentIndex][1];
 			if(this.wsData.params['success'] == "false"){
 				this.error++;
 				if( this.error >= 2){
 					hasTrueData = true;
 					this.success = 0;
 					this.error = 0;
 					result[id][str[0]]['false'].push(str[1]);
 					result[id][str[1]]['false'].push(str[0]);
 					this.toSendParams();
 				}
 			}else{
 				this.success++;
 				if( this.success >= 2){
 					hasTrueData = true;
 					this.success = 0;
 					this.error = 0;
 					result[id][str[0]]['success'].push(str[1]);
 					result[id][str[1]]['success'].push(str[0]);
 					this.toSendParams();
 				}
 			};
 			// 更换词组
			// console.log(result)
			if(this.groupNum == 3){
				hasTrueData = true;
				// 换组
				this.toSendParams();
			}
 		},
 		// 统计识别率
 		_statisticsAccuracy(){
 			let statistics = this.resultData;
 			let currentItem = {};//正确率
			//保存综合评价的结果
    		let result = {};
 			for(let key in statistics){
 				// console.log(typeof statistics[key]);
 				let keyVal = statistics[key];
				for(let val in keyVal){
					currentItem[val] = {};
					let success= keyVal[val]['success'].length;
					let error= keyVal[val]['false'].length;
					if(success === 0 && error === 0){//暂未进行测试的元素
						currentItem[val]['statistics'] = '—';
					}else{//只要有该元素进行测试
						currentItem[val]['statistics'] = (success/(success + error)).toFixed(2) *100+"%";
					}
					currentItem[val]['hasFalse'] = '—';
					if(error > 0){//如果测试的结果为FALSE，则记录错误的元素
						currentItem[val]['hasFalse'] = keyVal[val]['false'];
					}
 				}
        		//	获取综合评价
 				let a = 0,
            		b = 0;
		 		for(let i in keyVal){
					//计算当前词组的综合评价
			        a++;
			        const percentage = currentItem[i]['statistics'];
			        if(percentage !== '—'){
			            console.log(+percentage.replace("%",""));
			            b += +percentage.replace("%","");
			        }
		        }
		        const currentGroupResult = (b/a);
		        // console.log(currentGroupResult)
				//        分别计算词组的听力建议
		        let advise = "",
		            star = 0,
		            star_value = "";
		        if(currentGroupResult >= 80 ){
		          star = 5;
		          star_value = "优秀";
		          advise ="";
		        }else if(currentGroupResult < 80 && currentGroupResult >= 60){
		          advise ="";
		          star = 3;
		          star_value = "合格";
		        }else if(currentGroupResult < 60){
		          advise ="助听设备有待改善或需要进一步加强区分能力训练";
		          star = 1;
		          star_value = "不合格";
		          let value = "";
		          if(sessionStorage.getItem('test_id') === '2' && key !== '7'){
		              switch ( key ){
		                case '2':
		                  value = "6000Hz-9000Hz";
		                      break;
		                case '3':
		                  value = "3000Hz-6000Hz";
		                  break;
		                case '4':
		                  value = "2000Hz-4000Hz";
		                  break;
		                case '5':
		                  value = "1000Hz-2000Hz";
		                  break;
		                case '6':
		                  value = "250Hz-500Hz";
		                  break;
		                case '8':
		                  value = "3000Hz-6000Hz";
		                  break;
		                case '14':
		                  value = "5000Hz-9000Hz";
		                  break;
		              }
		              advise += "，你还可以进行"+ value +"精细化位点测试";
		          }
		        }
		        result[key] = {};
		        result[key]['advise'] = advise;
		        result[key]['star'] = star;
		        result[key]['star_value'] = star_value;
		        
 			}
 			// console.log(result)
 			// 综合评价和听力干预建议
 			this.starValue = result;
 			// 识别率
 			this.statisticsAccuracy = currentItem;
 			// console.log(JSON.stringify(this.statisticsAccuracy));
 		},
 		// 发送数据
 		toSendParams(){
 			// if(this.groupList.length - 1 + numFalg === this.currentHzNum){
 			// 	// 判断显示当前字母是否已测试完成，若是，则显示数据当前字母的识别率
 			// 	this._statisticsAccuracy();
 			// 	numFalg ++;
	   		//  }
 			// debugger;
	    	if(this.currentHzNum == this.groupTeat.length){
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
			        	// 启用打印按钮
	 					// _this.isPrinter = true;
			        	// 禁用开始暂停按钮
			        	_this.pauseFalse = true;
			        	// 启用打印按钮
	 					_this.isPrinter = true;
			        // }).catch(() => {
			        // });
			        	_this._statisticsAccuracy();
				        websocket.send(JSON.stringify(_this.wskt.wstoctld('games_audio_over','')));
				        // 清除高亮提示色
				        _this.clearClass(true);
			      return ;
			    }
			    this.currentHzNum = 0;
	    	};
	    	this.sendGroup = this.groupTeat[this.currentHzNum];
	    	let sendPath = this.groupPath[this.currentHzNum];
	    	// 音频路径组合
	    	let groupurl = [this.sendvpath+sendPath[0],this.sendvpath+sendPath[1]];
	    	let currentVolume = this.currentVolume;
	    	let params = {
					'ear':this.currentear,//左右耳信息
			    	'testType':'tone',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'volume':currentVolume,//测听音量
			    	'group':this.sendGroup,//当前词组
			    	'groupurl':groupurl,
			    	'level': this.$route.query['level']
			    };
			console.log(params);
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
 				// this.isPrinter = false;
 				this.clearClass(false);
 				// 发送暂停指令
		    	websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
 			}else{
 				this.isSave = true;
 				// this.isPrinter = true;
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
 			this._statisticsAccuracy();
 			if(!this.pauseFalse){
 				// 清除高亮提示色
				this.clearClass(true);
	 			// 禁用暂停，继续按钮
	 			this.pauseFalse = true;
	 			this.isPrinter = true;
	 			// 开启切换列表
	 			this.toggle = true;
 			}
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
	 			// console.log(info)
	 			const resultSave = {
	 				'user_id' :user_id,
	 				'type_id':type_id,
	 				// 'data':str.resultData,
	 				'data':JSON.stringify(str.resultData),
	 				'time':str.timeToSave,
	 				'teacher':JSON.parse(sessionStorage.getItem('user')),
	 				'accuracy':JSON.stringify(str.statisticsAccuracy),
	 				'advise':str.starValue,
	 				'textarea':str.textarea,
	 				'ear':str.currentear,
	 				'testType':str.currentgame,
	 				'environment':'安静',
	 				...info
	 			};
	 			// console.log(JSON.stringify(resultSave));
	 			// console.log(resultSave);
	 			assess(resultSave).then((response) =>{
	 				// console.log(response);
	 				if(response.code == "200"){
	 					str.isSaveSuccess = true;
	 					// 查询未测名单
	 					util.getLocalStorage(user_id,type_id);
	 					msgTipsSuccess(str,'提交成功!');
	 				}else{
	 					msgTipsErr(str,'提交失败!');
	 				}
	 			}).catch((error) =>{
	 				// console.log(error);
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
 				id = this.newTitle[str][1];
 			}
 			this.groupId = id;
 			// 当前列表的词组组合
 			this.groupTeat = util.groupArray(this.groupList[str]);
 			// 获取当前词组path
 			this.groupPath = util.groupArray(this.newpath[str]);
 			// 获取音频的url
 			this.sendvpath = this.vpath[str];
 			// console.log(this.groupTeat);
 			// 当前渲染的表格
 			this.currentIndex = str;
 			this.tableList = this.groupList[str];
 			// 生成当前词组的数据格式,如果有该id的数据就不添加
 			if(!this.resultData[id]){
 				let Result = {}
	 			for (let i = 0; i < this.tableList.length; i++) {
	 				let aaa = this.tableList[i]
	 				Result[aaa] = {};
	 				// for (let j = 0; j < this.tableList.length; j++) {
	 				// 	let bb = this.tableList[j];
	 				// 	if( bb != aaa){
	 				// 		Result[aaa][bb] = 0;
	 				// 	}
	 				// }
	 				Result[aaa]['success'] = [];
	 				Result[aaa]['false'] = [];
	 			}
	 			// 统计正确的词组
	 			// Result['success'] = [];
	 			// Result['error'] = [];
	 			// 统计正确率
	 			// Result['itemAccuracy'] = 0;
	 			// 响应监听数据变化
	 			this.$set(this.resultData,id,Result);
	 			// console.log(this.resultData)
 			}
 			// console.log(this.resultData)
 			// 如果当前的词组元素小于6个，则添加空元素
 			let tableshow  = [];
 			if(this.tableList.length <6){
 				tableshow = this.tableList.concat();
 				for (let i = 0; i < 6 - this.tableList.length; i++) {
 					tableshow.push('')
 				}
 			}else{
 				tableshow = this.tableList.concat();
 			}
 			// this.tableTr = tableshow;
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

<style lang ="less" >
@bgc:#fff;
@bor:#5e9b71;
@hover:#5c946c;
	#tone-audiometry{
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
			.tone-top{
				font-size: 20px;
				margin:30px 70px 15px 70px;
				color:#333;
			}
			.tone-table{
				margin:0px auto;
				width: 90%;
				min-height: 140px;
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
				td span{
					display: inline-block;
				    word-wrap: break-word;
				    width: 88px;
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
