<template>
  <div id="audiometry">
	<div class="audiometry-left fl">
		<div class="audiometry-left-top">
			<div ref="radioright" id="radioright">音响</div>
			<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
				<div v-show="'右' == text || all">右耳</div>
			</transition>

			<div>头</div>
			<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
				<div v-show="'左' == text || all">左耳</div>
			</transition>
			<div ref="radioleft" id="radioleft">音响</div>
		</div>
		<div class="audiometry-table">
			<div class="table-HZ">
				<ul>
					<li>
						<span>当前侧别</span>
						<strong>{{text}}</strong>
					</li>
					<li>
						<span>频率</span>
						<strong>{{frequency}}&nbsp;Hz</strong>
					</li>
					<li>
						<span>强度</span>
						<strong>{{intensity}}&nbsp;dB</strong>
					</li>
				</ul>
			</div>
			<div id="table">
				<!--循环出table头部 -->
				<ul>
					<li v-for="(item,index) in line">{{item}}</li>
				</ul>
				<div class="warp">
					<table>
						<tr>
							<th v-for="(item,index) in tableTop" :class="{ 'currenthzClass': item == frequency,'nexthzClass':checkData[item] && checkData[item].isneed == 1 }">
								<p @click="_click_toggle_Hz(item)">
									{{item}}
								</p>
							</th>
						</tr>
						<tr v-for="( tit,index1) in dubline" :class="[intensity == (tit*5-10) ? 'trborder':'']">
							<td v-for="(item,index2) in tableTop" :class="[frequency == item ? 'tdborder' :'',{maxDbClass:_testFn(tit,item)}]">
								<div class="sign" v-if="_isShowSign(tit*5-10,item) === 'success' ">
								</div>
								<div class="signMax" v-if="_isShowSign(tit*5-10,item) === 'error'">
								</div>
							</td>
						</tr>
						<tr>
							<th v-for="(item,index) in tableTop" class="rest-btn">
								<span @click="_click_rest_Hz(item)" v-if="(item != frequency) && checkData[item] && checkData[item].isfinish == 1 ">
									重测
								</span>
							</th>
						</tr>
					</table>
					<div id="horn" v-if="frequency && !disabled" :class="[hornStartStyle ? 'hornStartStyle':'hornStopStyle']">
						<i class="fa fa-volume-up"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="audiometry-right fr">
  		<div class="title clearfix">
			<h3 class="fl">控制</h3>
			<div class="fr" style="margin-right: 6px;margin-top: 10px;">
				<goback :isGoBack="gobackFalg" :start="start">
					<div class="fr" style="line-height:24px;"><i class="fa fa-arrow-left"></i>返回</div>
				</goback>
			</div>
		</div>
		<div class="audiometry-main">
			<dl class="clearfix">
				<dt>
					侧别：
				</dt>
				<dd>
					{{_earText}}
				</dd>
			</dl>
			<dl class="clearfix hidden">
				<dt>
					信号：
				</dt>
				<dd>
					<div class="clearfix xin">
						<span  :class="{'active': 'zhuan' == xcurrent}" @click="toggle('zhuan')">啭音</span>
						<span :class="{'active': 'zhai' == xcurrent}" @click="toggle('zhai')">窄带</span>
					</div>
				</dd>
			</dl>
			<dl class="clearfix voice-num">
				<span class="demonstration fl">给声时长：</span>
					<div class="fl">
						<el-input-number class="num" v-model="value" :step="1" @change="change" :min="1" :max="5"></el-input-number>
					</div>
			</dl>
		</div>
		<div class="button">
			<ul class="z-c-t">
				<el-button type="success" @click="toStart" :disabled="start || !isOnline"><i class="iconfont icon-kaishi"></i>开始</el-button>
				<el-button type="warning"@click="toPause('finish')"  :disabled="!start || disabled" v-show="isPause"><i class="iconfont icon-zanting"></i>暂停</el-button>
				<el-button type="success"@click="toPause('false')"  :disabled="!start || disabled" v-show="!isPause"><i class="iconfont icon-jixu"></i>继续</el-button>
				<el-button type="info" @click="lookResult" :disabled="'finish' != isfinish"><i class="iconfont icon-baocun"></i>完成</el-button>
				<el-button type="info" @click="_toggle_ear" ><i class="iconfont icon-baocun"></i>切换耳别</el-button>
			</ul>
		</div>
  	</div>
  	<!-- 被控端loading完成提示 -->
	<div>
		<StartTips :loadOver="dialogVisibleTips"></StartTips>
	</div>
  	<ele-result ref ="result" :checkhz="hz" :line="line" :trueLine="trueLine" :statisticsInfo="statisticsInfo" :getServer="getServer" :tonetype="xcurrent" :ear="currentear"></ele-result>
  </div>
</template>
<script>
var arr = [];
var step = -15;
for (var i = 0; i < 27; i++) {
	step +=5;
	arr.push(step);
}
var line = ['-10','0','10','20','30','40','50','60','70','80','90','100','110','120']
var trueLine = arr;
var tableTop = ['','125','250','500','750','1000','1500','2000','3000','4000','5000','6000','8000','9000'];
import Result from './result'
import HZ from '../commonvue/hz'
import util from'common/util'
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import {mapState,mapMutations} from 'vuex'
export default {
	components:{
		'ele-result' : Result,
		HZ,
		Goback,
		StartTips
	},
 	data(){
 		return {
 			dialogVisibleTips:false,
 			hzVisible:true,
 			tableTop:tableTop,
 			// 耳旁信息
 			currentear : "",
 			xcurrent :"zhuan",
 			currentgame : 'cat',
 			all: false,
 			text:'',
 			// 频率
 			hz :[],
 			// 最大强度的值
 			maxDb:0,
 			trueLine:arr,
 			line:line,
 			dubline:arr.length-1,
 			// 接收频率
 			frequency:'',
 			// 接收强度
 			intensity:'70',
 			// 是否开始
 			start:false,
 			// 是否完成
 			isfinish:true,
 			isPause:true,
 			disabled:false,
 			// 用于临时保存测试正确的坐标点
 			signArry :[],
 			// 用于临时保存测试错误的坐标点
 			signArryFalse :[],
 			// 用于保存表格显示标记的坐标点
 			arry :[],
 			objsign:{},
 			// 用于保存正确的强度和频率
 			Hz_Db:[],
 			// 绘制表格的参数
 			table: null,
			height: null,
			width: null,
			cells :null,
			cellHeight: null,
			cellWidth :null,
			indexLeft: null,
			indexTop :null,
			tr: null,
			sign: null,
 			value: null,
 			wsData : '',
 			// 记录赫兹发送的位置
 			currentHzNum :0,
 			// 记录统计信息
 			statisticsInfo:{
 				'left':'',
 				'right':'',
 				'all':''
 			},
 			// 给服务器保存数据
 			getServer:[
	 			{
	 				'type':'6',
	 				'ears':'左',
	 				'data':[]
	 			},
	 			{
	 				'type':'6',
	 				'ears':'右',
	 				'data':[]
	 			}
 			],
 			// 是否为第一次测听
 			isFirst:true,
 			isOnline:true,
 			flag:true,
 			timer:true,
 			classHz:[],//未测的hz
 			// 声音是否在播放
 			hasSound:false,
 			nextHzData:{},
 			checkData:{},
 			currentEarIndex:0
 		}
 	},
 	mounted(){
 		this.dialogVisibleTips = true;
 		const getEar = new Promise((resolve,reject) =>{
 			this.xcurrent = this.$route.query.crtsign;
	 		let tonetype = this.xcurrent === 'zhuan' ? "啭音" : "纯音";
	 		this.$store.commit('hasCurrenttonetype',{'tonetype':tonetype});
	 		this.currentear = this.$route.query.isEar;
	 		this.currentgame = this.$route.query.crtgame;
	 		const ear = this.currentear.charAt(0);
	 		this.currentearStyle(ear);
	 		// 显示耳旁信息
	 		resolve(this.currentear)
 		});
 		getEar.then((res)=> {
 			const getParamsPageData = JSON.parse(this.$route.query.data);
 			const a = [];
			for (var i = 0; i < res.length; i++) {
				const currentTestEarHz = new Utils.earDataClass();
				currentTestEarHz.setEar(res[i]);
				currentTestEarHz.setDataDetail(getParamsPageData);
				a.push(currentTestEarHz)
			}
			this.checkDataArray = a;
			this._getHzAndDb(0);
	 		return new Promise((resolve,reject) =>{
	 			resolve()
	 		})
 		}).then((a)=>{
 			// 初始化表格
 			this.changeToggle = true;
			this.initTable();
 		}).catch((err) =>{
 			throw new Error(err)
 		})
		// 获取平均反应时间
		this.getAverageTime();
		var that = this;
		// 接收被控端消息websocket连接
		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
 		// 接收server msg ctld is online
 		Vm.$on('servermsg',(msg,res,str)=>{
 			if(!that.closeLay){
				util.ctld_isOnline(that,res,str,next);
	 			function  next(that){
					// 启用完成按钮
			        that.isfinish = "finish";
			        that.disabled = true;
	 			}
 			}
 		})
 	},
 	watch:{
 		// 根据正取次数大于三次的数组变化，监听是否进行下一个频率测试
 		arry:function(){
 			this.toParams()
 		},
 		// 测试websocket连接
 		wsData:function(){
 			if(this.wsData.params && this.wsData.params.prepare){// 被控端页面准备好后，可进行操作
				this.dialogVisibleTips = false;
			};
 			// 调用统计函数
 			if(this.wsData.mescon === 'message_success' || this.wsData.mescon === 'message_error' ){
 				this.statistics();
 				console.log(JSON.stringify(this.statisticsInfo));
 			};
 			// 接收声音播放停止和开始的指令
 			if(this.wsData.mescon === 'playsound'){
 				this.hasSound = true;
 			}else if(this.wsData.mescon === 'stopsound'){
 				this.hasSound = false;
 			}
 		}
 	},
 	created(){
 		// this.getterDb();
 	},
 	computed:{
 		...mapState(['zhutingData']),
 		// 显示侧别
 		_earText(){
 			switch (this.currentear){
                case 'L':
                return "仅测左耳";
                break;
                case 'R':
                return "仅测右耳";
                case 'LR':
                return "先左后右";
                case 'RL':
                return "先右后左";
                case 'A':
                return "双耳同时";
            }
 		},
 		// 返回上级
 		gobackFalg:function(){
 			let backfalg = false;
	 		if(this.start){
 				backfalg = true;
 			}
 			if(this.isfinish == "finish"){
 				backfalg = false
 			}
 			if(this.isfinish == "false"){
 				backfalg = true
 			}
 			// console.log(backfalg)
 			return backfalg;
 		},
 		// 喇叭播放声音时的样式
 		hornStartStyle:function(){
 			return this.gobackFalg && this.hasSound;
 		},
 		// 未测的hz
 		nextallHz:function(){
 			let classHzObj = {};
 			this.classHz.forEach((item) =>{
 				this.$set(classHzObj,item,item)
 			});
 			return classHzObj
 		}
 	},
 	beforeRouteLeave(to,form,next){
 		this.closeLay = true;
 		next();
 	},
 	methods:{
 		// 是否显示已测试完毕正确或错误点的标记
 		_isShowSign(db,hz){
 			const checkData = this.checkData;
 			if(checkData[hz] && checkData[hz].isneed == 1 && checkData[hz].isfinish == 1 ){
 				if(checkData[hz].data[db] && 3 === checkData[hz].data[db].true && db == checkData[hz].result.systemvalue.y){
 					return 'success'
 				}
 				if(checkData[hz].data[db] && 3 === checkData[hz].data[db].false && db == checkData[hz].result.systemvalue.y){
 					return 'error'
 				}
 			}
 			return false;
 		},
 		// 切换耳别
 		_toggle_ear(){
 			console.log(this.checkDataArray)
 			if(this.currentear.length === 2){
 				const index =  this.currentear.indexOf(this.curtEar) === 1 ? 0 : 1 ;
 				console.log(index)
 				this.currentearStyle(this.currentear.charAt(index));
 				this.checkData = this.checkDataArray[index].dataDetail;
 			}
 		},
 		// 添加删除频率
 		_click_toggle_Hz(e){
 			const obj = this.checkData;
 			if(e == this.frequency) return false;
 			if(obj[e].isneed === 0){
 				obj[e].isneed = 1;
 			}else{
 				obj[e].isneed = 0;
 			}
 			console.log(e,this.checkData)
 		},
 		// 重置频率
 		_click_rest_Hz(e){
 			const obj = this.checkData;
 			if(e == this.frequency) return false;
 			if(obj[e].isfinish === 1 && obj[e].isneed === 1){
 				obj[e].isfinish = 0;
 				obj[e].data = {};
 				obj[e].result = {'systemvalue':{},'user_defined':{}};
 			}
 			console.log(e,this.checkData)
 		},
 		// 显示不可测范围的样式
 		_testFn(str1,str2){
 			if(this.zhutingData[str2] >= str1*5-10 && (this.zhutingData[str2] && 10 < str1*5-10)){
 				return true
 			}else{
 				return false
 			}
 		},
 		// 获取给声时长
 		getAverageTime(){
 			this.$ajax.post('/info/getvolume',{'test_id':sessionStorage.getItem('test_id')}).then((response)=>{
	            if(response.code === 200){
	                this.value = +response.data.decibel
	            }
	        }).catch((err)=>{
	            alert(err)
	        });
 		},
 		//获取初始的hz db
 		_getHzAndDb(index){
 			this.checkData = this.checkDataArray[index].dataDetail;
	 		// 初始化默认开始坐标
	 		this.nextHzData = Utils.getNextHz(this.checkData);
	 		if(!this.nextHzData){throw new Error('next test hz is null or undefined！')}
	 		// 获取要测值的hz
	 		this.frequency = Object.keys(this.nextHzData)[0];
	 		// 获取要测值的db值
	 		const getDb = this.nextHzData[this.frequency].db;
	 		this.intensity = getDb <= 70 ? getDb : 70;
	 		this.maxDb = getDb;
 		},
 		statistics(){
 			this.isFirst=false;
 			// 先判断左右耳
 			// if(this.wsData.params['ear'] === 'L'){//记录左耳信息
 			// 	this.storagedata('left')
 			// }else if(this.wsData.params['ear'] === 'R'){
 			// 	this.storagedata('right')
 			// }else{
				// this.storagedata('all')
 			// }
 			this.storagedata();
 			// 获取传过来的频率,判断频率是否等于发送频率
 			let receive_hz = this.wsData.params['hz'];
 			if(receive_hz != this.frequency){
 				alert("接收的频率不正确");
 			};
 			// 获取传过来的强度
			let receive_db = this.wsData.params['nextdb'];
 			console.log(receive_db,this.intensity)
			if(receive_db > this.maxDb){
				this.Hz_Db.unshift([receive_hz,receive_db]);
				this.toParams();
				alert("接收的强度大于最大值");
			}else{
				this.intensity = this.wsData.params['nextdb'];
			}
			// 调用坐标函数
			this.startCeTing();
 		},
 		// 数据存储函数
 		storagedata(str){
 			var isSuccess = this.wsData.params['success'].toString(),
 				crtHz= this.wsData.params['hz'].toString(),
 				crtDb = this.wsData.params['db'].toString(),
 				obj = this.checkData[crtHz].data;
 			if(obj){
 				if(obj[crtDb]){
 					obj[crtDb][isSuccess] +=1;
 				}else{
 					obj[crtDb] = {'true':0,'false':0};
 					obj[crtDb][isSuccess] +=1;
 				}
 			}else{
 				obj ={};
 				obj[crtDb] = {'true':0,'false':0};
 				obj[crtDb][isSuccess] +=1;
 			}
 			// if(this.statisticsInfo[str]){
 			// 	// 确定hz是否存在
				// if(this.statisticsInfo[str][crtHz]){
				// 	// 判断强度是否存在
				// 	if(this.statisticsInfo[str][crtHz][crtDb]){
				// 		// 判断对错
				// 		this.statisticsInfo[str][crtHz][crtDb][isSuccess] +=1;
				// 	}else {
				// 		this.statisticsInfo[str][crtHz][crtDb] = {'true':0,'false':0};
				// 		this.statisticsInfo[str][crtHz][crtDb][isSuccess] +=1;
				// 	}
				// }else{
				// 	//确定对错
				// 	this.statisticsInfo[str][crtHz] = {}
				// 	this.statisticsInfo[str][crtHz][crtDb] = {'true':0,'false':0};
				// 	this.statisticsInfo[str][crtHz][crtDb][isSuccess] +=1;
				// }
 			// }else{
 			// 	this.statisticsInfo[str] = {};
 			// 	this.statisticsInfo[str][crtHz] = {}
				// this.statisticsInfo[str][crtHz][crtDb] = {'true':0,'false':0};
				// this.statisticsInfo[str][crtHz][crtDb][isSuccess] +=1;
 			// }

 		},
	  	// 左右耳信息显示
	  	currentearStyle(str){
	  		// 若是双耳，则两边同时出现提示
	  		var radioleft = document.getElementById('radioleft');
			var radioright = document.getElementById('radioright');
			radioleft.style.backgroundColor = 'transparent';
			radioright.style.backgroundColor = 'transparent';
			this.curtEar = str;
	 		if(str == 'A'){
	 			this.all = true;
	 			radioleft.style.backgroundColor = "#fff";
	 			radioright.style.backgroundColor = "#fff";
	 			this.text = "双";
	 		} else if('L' == str){
	 			radioleft.style.backgroundColor = "#fff";
	 			this.text = "左";
	 		} else{
	 			radioright.style.backgroundColor = "#fff";
	 			this.text = "右";
	 		}
	 		this.radioStyleShow = str;
	  	},
 		// 切换给声时长
 		change(evt){
 			// 页面初始化后不主动发送数据
 			if(this.changeToggle){
 				const params = {
		    		'tonetype':this.xcurrent,//信号类别
			    	'testType':'zhuting',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'time':evt,//给声时长
			    };
			    Utils.chang_params(this,params);
 			};
 		},
 		// 点击开始禁用按钮
 		toStart(){
 			const send_instructions = ()=>{
 				this.start = !this.start;
	 			// 点击开始向被控端发送测听参数
				this.toParams();
			    // 点击开始，显示第一个测试点的位置;
			    // this.frequency = this.hz[0];
	 			// 发送最大强度数据;
	 			const argument = this.wskt.wstoctld('games_audio_maxDbList',this.zhutingData);
				websocket.send(JSON.stringify(argument));
 			}
			// 开始测听前，先提示当前测试耳的信息，双耳同时测得话，不进行任何提示
			if(this.currentear !== "A"){
				const getFirstEar = this.currentear.charAt(0);
				const oneear = getFirstEar == 'L'?'左':'右';
				const twoear = getFirstEar == 'R'?'左':'右';
				const h = this.$createElement;
				this.$msgbox({
					title:'重要提示',
			        message: h('p', {style:'font-size:18px'}, [
			            h('div', { class: 'seconddiv' }, [
			            	h('span',null,'请'),
			            	h('strong',{style:'font-weight:700'},'打开'+oneear+'耳'),
			            	h('span',null,'助听设备，同时'),
			            	h('strong',{style:'font-weight:700'},'关闭'+twoear+'耳'),
			            	h('span',null,'设备或'),
			            	h('strong',{style:'font-weight:700'},'掩蔽'+twoear+'耳'),
			            	h('span',null,'耳道')
			            	])
			          ]),
			        customClass:'msgboxClass',
					confirmButtonText: '继续',
					closeOnClickModal:false,
					closeOnPressEscape:false,
	              	showCancelButton:true,
	              	cancelButtonText: '取消',
		        }).then((btn) => {
		        	if(btn === "confirm"){
		        		send_instructions();
		        	}
		        }).catch((err) => {
					console.log(err)
		        });
	    	}else{
	    		send_instructions();
	    	}
 		},
 		toPause(str){
 			this.isPause = !this.isPause;
 			this.isfinish = str;
 			// 发送暂停指令
 			if('finish' == str){
				// 发送暂停指令
		    	websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
 			}else{
 				// 发送继续指令
 				websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
 			}
 		},
 		// 点击开始后触发的函数
 		toParams(){
			// 判断左右耳是否发送完毕；
			var ear = '';
			var isToggleEar = false;
			if(!this.isLeftEar){
				ear = this.currentear.charAt(0);
			} else{
				ear = this.currentear.charAt(1);
			}
			const hasNextData = Utils.getNextHz(this.checkData);
			let isToSendNextHz = true;
			if(hasNextData && Object.prototype.toString.call(hasNextData) === '[object Object]'){
				// 获取要测值的hz
		 		this.frequency = Object.keys(hasNextData)[0];
		 		// 获取要测值的db值
		 		const getDb = hasNextData[this.frequency].db;
		 		// console.log(getDb)
		 		// this.intensity = getDb;
		 		this.maxDb = getDb;
			}else{//没有待测的hz
				isToSendNextHz = false;
			}
			// 根据后台返回的数据监听判断是否测试完毕
			if (!isToSendNextHz ){
				const getSecondEar = this.currentear.charAt(1);
				if(this.currentear.charAt(1) && !this.isLeftEar){
					// 提示是否需要进行下一耳旁测评
					// 发送暂停指令
					websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
					// twoear+'侧完成测听，将进行'+oneear+'耳测听，请关闭'+twoear+'侧助听设备或掩蔽'+twoear+'耳耳道，同时打开'+oneear+'侧助听设备。', twoear+'侧完成测听',
					const oneear = getSecondEar == 'L'?'左':'右';
					const twoear = getSecondEar == 'R'?'左':'右';
					const h = this.$createElement;
					this.$msgbox({
						title: twoear+'耳完成测听',
				        message: h('p', {style:'font-size:18px'}, [
				            h('div', {class:'firstdiv'}, '接下来将进行'+oneear+'耳测听 '),
				            h('div', { class: 'seconddiv' }, [
				            	h('span',null,'请'),
				            	h('strong',{style:'font-weight:700'},'打开'+oneear+'耳'),
				            	h('span',null,'助听设备，同时'),
				            	h('strong',{style:'font-weight:700'},'关闭'+twoear+'耳'),
				            	h('span',null,'设备或'),
				            	h('strong',{style:'font-weight:700'},'掩蔽'+twoear+'耳'),
				            	h('span',null,'耳道')
				            	])
				          ]),
				        customClass:'msgboxClass',
						confirmButtonText: '继续',
						closeOnClickModal:false,
						closeOnPressEscape:false,
		              	showCancelButton:false,
			        }).then(() => {
			        	// 将hz的状态改为未完成
			        	isToggleEar = true;
			        	this.isFirst = true;
			        	// 清空标记数组
			        	this.arry = [];
			        	// 重置计算器
			            this.currentHzNum = 0;
			            this.isLeftEar = true;
			            // this.currentEarIndex = 1;
			            this._getHzAndDb(1);
				 		isToSendNextHz = true;
			            // 清空标记点样式
			            const eleSign = util.jq('.sign');
			            for (let i = 0; i < eleSign.length; i++) {
			            	eleSign[i].style.backgroundColor = "transparent";
			            }
			  			// 改变左右耳样式
			  			this.currentearStyle(getSecondEar);
			            // 发送继续指令
			            websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
			        }).catch(() => {
			        	this.start = false;
			        	this.step = 0;
			        });
				}else{
					console.log(this.checkDataArray)
					console.log(JSON.stringify(this.checkDataArray))
					// 提示测评完成
					websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
 					window.isToggle = false;
					this.$confirm('测听完成!', '提示', {
						closeOnClickModal:false,
						closeOnPressEscape:false,
		              	showCancelButton:false,
			        })
			        // 启用完成按钮
			        this.isfinish = "finish";
			        // 禁用开始暂停按钮
			        this.disabled = true;
			        websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_over','')));
			        return ;
				}
			}
			if(isToSendNextHz){
				// 定义每次发送的强度
				// this.sendDb = '50';
				if(!this.isFirst){
					const num = parseInt(this.Hz_Db[0][1])+20;
					this.intensity = num < this.maxDb ? num : this.maxDb;
				};
				console.log('换频')
		 		this.isFirst = true;
		 		this.startCeTing();
				// debugger;
				var params = {
					'isToggleEar':isToggleEar,
			    	'ear':ear,//左右耳信息
		    		'tonetype':this.xcurrent,//信号类别
			    	'testType':'zhuting',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'time':this.value,//给声时长
			    	'hz':this.frequency,//当前赫兹
			    	'db':this.intensity,//当前强度this.currentDb
			    	'level':this.$route.query['level']
			    };
			    console.log(params);
				this.currentHzNum += 1;
				var argument = this.wskt.wstoctld('games_audio_start',params);
		    	websocket.send(JSON.stringify(argument));
			}
 		},
 		// table表格
 		initTable(){
			const everysize = util.initTable('#table','td',this.dubline,this.tableTop.length);
			// console.log();
			this.cellWidth = everysize.cellWidth;
			this.cellHeight = everysize.cellHeight;
			this.startCeTing();

		},
		startCeTing(){
			// 首先判断频率及强度是否有值
			if(!this.frequency && !this.intensity) return;
			// 给喇叭进行定位
			var horn = document.getElementById('horn');
			// console.log(horn)
				// 查询当前值在数组的index值
			this.indexLeft = this.tableTop.indexOf(this.frequency);
			// 下一个强度要测试的位置
			this.indexTop = this.trueLine.indexOf(parseInt(this.intensity));
			// 当前测试强度的位置
			if(!this.isFirst){
				this.trueIndexTop = this.trueLine.indexOf(parseInt(this.wsData.params['db']));
			}
				// 判断是否该频率和强度是否存在
			if(this.indexLeft >=0 && this.indexTop>=0){
				// 确定喇叭的位置
				horn.style.top = this.indexTop*this.cellHeight +30+'px';
				horn.style.left = this.indexLeft*this.cellWidth-13 +'px';
				this.showSign()
			}
		},
		showSign(){
			// 当前元素的标记点显示；若该点为最大值，应进行统计
			// 需要另外添加判断，该频率是否为正确结果,且点第二次后才能进行标记
			// 需要判断最大值正确三次的特例情况
			if((!this.isFirst && this.wsData.params['success'] == "true")){
				this.isTrue(this.signArry,'#13ce66');
				return ;
			}
			if((!this.isFirst && this.wsData.params['success'] == "false")&&(this.wsData.params['db'] == this.maxDb)){
				this.isTrue(this.signArryFalse,'red')
			}
		},
		isTrue (str,color){
			// 判断该元素点是不是出现三次
			str.unshift([this.indexLeft,this.trueIndexTop]);
			let temp = '',
				len = str.length;
			for(var i=0;i< str.length;i++){
			    temp = str[i].toString();
			    var count = 0;
			    for(var j = 0 ;j< str.length;j++){
			      	if(str[j].toString()==temp){
			        	count++;
			      	}
			      	if(count == 3){
			        	this.arry.unshift(str[j]);
			        	// 保存一个对象，用于传给canvas绘图
			        	var type = 1,
			        		params_obj = this.wsData.params,
			        		// ear = params_obj['ear'],
			        		db = params_obj['db'],
			        		hz = params_obj['hz']
			        		;
			        	if(params_obj['success'] == "false" && (db == this.maxDb)){
			        		type = 'wu';
			        	}
			        	// 将当前hz的isfinish 置为1
			    		Utils.setHzIsfinish(this.checkData,this.frequency);
			        	this.checkData[hz].result.systemvalue = {'x':hz,'y':db,'dataType':type};
			        	// if(ear == "L"){
			        		// 保存左耳的信息
			        		// this.getServer[0]['data'].push({'x':hz,'y':db,'dataType':type});
			        	// } else if(ear == "R"){
			        		// 保存右耳的信息
			        		// this.getServer[1]['data'].push({'x':hz,'y':db,'dataType':type});
			        	// } else{
			        		// this.getServer[0]['data'].push({'x':hz,'y':db,'dataType':type});
							// this.getServer[1]['data'].push({'x':hz,'y':db,'dataType':type});
			        	// }
			        	this.objsign[hz] = db;
			        	// 保存正确次数大于三次的频率和强度
			        	this.Hz_Db.unshift([hz,db])
			        	// 清空当前数组
			        	str.length = 0;
			        	// this.changeColorSign(color);
			        }
			    }
			}
		},
		changeColorSign(color){
			return
			console.log(this.arry)
        	if(this.arry.length > 0){
				// 获取出现三次的坐标点
				var left = this.arry[0][0],
					top = this.arry[0][1],
					table = jq('#table');
				this.tr = table.getElementsByTagName('tr');
				var currentTd = this.tr[top].getElementsByTagName('td');
				// 将该行的点变色
				// 如果该点是最大值，则将该点显示为红色
				currentTd[left].childNodes[0].style.backgroundColor = color;
			}
		},
		lookResult(){
			window.isToggle = false;
			this.disabled =true;
			this.$refs.result.show();
			this.$refs.result.setStyle();
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
	#audiometry{
		width: 1330px;
		/*height: 790px;*/
		margin:5px auto;
		/*background-color: bgc;*/
		.audiometry-right{
			width: 420px;
			background-color: @bgc;
			margin-top: 190px;
			height: 570px;
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
					margin-top:20px;
				}
				dt,.demonstration{
					float: left;
				    margin-left: 65px;
				    margin-top: 4px;
				    font-size: 22px;
				}
				dd{
					float: left;
					height: 35px;
					line-height: 35px;font-size: 18px;
				}
				.demonstration{
					margin-left: 0px;
					margin-top:10px;
				}
				.num{
					width: 200px;
					font-size: 20px;
					span{
						line-height: 50px;
					}
					.el-input-number__decrease,.el-input-number__increase{
						width: 60px;
					}
					.el-input__inner{
						height: 50px;
						border-left: 1px solid #bfcbd9;
						border-radius:4px;
					}
				}
			}
			.button{
				margin:90px 88px 0 88px;
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
					/*line-height: 60px;*/
					margin-bottom: 10px;
					border-radius: 5px;
					cursor: pointer;
					color: #fff;
					text-align: center;
					/*background: #0ddd47;*/
					font-size: 24px;
				}
			}
		}
		.audiometry-left{
			width: 770px;
			.audiometry-left-top{
				height: 190px;
				/*background: #fff;*/
				position: relative;
				div{
					position: absolute;
					text-indent: -9999px;
				}
				div:nth-child(1){
					width: 88px;
					height: 128px;
					background: url(../../../../static/images/audio.png) no-repeat 0 0 ;
					bottom: 0px;
					left:60px;

				}
				div:nth-child(2){
					width: 200px;
					height: 35px;
					background: url(../../../../static/images/left.png) no-repeat 0 0 ;
					bottom: 65px;
					left:125px;
				}
				div:nth-child(3){
					width: 150px;
					height: 190px;
					background: url(../../../../static/images/child.png) no-repeat 0 0 ;
					background-size:150px 195px;
					bottom: 0px;
					left:300px;
				}
				div:nth-child(4){
					width: 200px;
					height: 35px;
					background: url(../../../../static/images/right.png) no-repeat 0 0 ;
					bottom: 65px;
					right: 125px;
					z-index: 100;
				}

				div:nth-child(5){
					width: 88px;
					height: 128px;
					background: url(../../../../static/images/audio.png) no-repeat 0 0 ;
					bottom: 0px;
					right:60px;
				}
			}
			.audiometry-table{
				height: 570px;
				border:6px solid @bor;
				background: #fff;
				.table-HZ{
					position: relative;
					height: 120px;
					background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#41484e), to(#000));
					/*切换频率定位*/
					.toggleHz{
						position: absolute;
						right:-93px;
						bottom:-39px;
					}
					/*切换频率弹框*/

					.el-dialog{
						top:40%;
						width: 1000px;
						.el-dialog__header{
							text-align: center;
							font-size: 18px;
						}
						.el-dialog__body{
							padding-top: 0px;
						}
					}
					ul{
						margin: 0px;
					}
					ul>li{
						padding-top:10px;
						width: 40%;
						float: left;
						list-style:none;
						color:#01ff30;
						text-align: center;
						&:nth-child(1){
							width: 20%;
						}
						&:nth-child(2){
							strong{
								border-right: 3px solid #01ff30;
							}
						}
						strong{
							display: block;
							font-weight: 500;
							font-size: 50px;
						}
					}
				}
				#table{
					height: 430px;
					background: @bgc;
					ul{float: left;margin-top: 30px;margin-left: 16px;text-align: right;}
					li{
						list-style: none;
    					line-height: 28px;
    					font-size: 15px;
    					font-weight: 600;
					}
					.warp{
						margin-left: 52px;
						position: relative;
						.trborder{
							border-bottom: 3px solid green;
						}
						.tdborder{
							/*border-left:  3px solid green;*/
						}
						.maxDbClass{
							border-left: 3px solid #13ce66;
						}
						/*频率位置*/
						th{
							height: 40px;
							font-size: 18px;
							text-align: left;
    						/*text-indent: -27px;*/
    						p{
    							margin:0px;
    							margin-left: -27px;
    							width: 47px;
    							height:30px;
    							line-height: 30px;
    							text-align: center;
    							border-radius: 6px;
    							cursor:pointer;
    						}

    						&.nexthzClass{
    							p{
    								background-color: #ccc;
    								color:#000;
    							}
    						}
    						&.currenthzClass{
    							p{
    								background-color: #13ce66;
    								color:red;
    							}
    						}
						}
						/*重置按钮*/
						.rest-btn span{
							display: inline-block;
							margin-left:-27px;
							letter-spacing: 2px;
							background: #da4f49;
							padding: 3px;
							color:#fafafa;
							border-radius: 3px;
							cursor: pointer;
						}
						#horn{
							position: absolute;
							left:5px;
							top:0px;
							font-size: 20px;
							width: 26px;
							height: 26px;
							/*background: #fff;*/
							border-radius: 50%;
							line-height: 26px;
							text-align: center;
						}
						.hornStopStyle{
							background-color:#fff;
							/*opacity:1;*/
							animation:light 1000ms ease 1;
						}
						.hornStartStyle{
							background-color:yellow;
							color:red;
							opacity:0.3;
							-webkit-animation-name: light;
							-webkit-animation-duration: 1000ms;
							-webkit-animation-iteration-count: infinite;
							-webkit-animation-timing-function: ease-in-out;
						}
						@-webkit-keyframes light{
							0% {
							        opacity:0.1;
							    }
							50% {
							        opacity:0.7;
							    }
							100% {
							        opacity:1;
							    }
						}
						.sign,.signMax{
							width: 15px;
							height: 15px;
							border-radius: 50%;
							position: absolute;
							left:-8px;
							top:7px;
							background-color: blue;
						}
						/*显示最大值*/
						.signMax{
							background-color: red;
						}
					}
					table{
						border-collapse: collapse;
					}
					tr{

						td{
							position: relative;
							box-sizing: border-box;
							height: 5px;
							padding:0px;
							border: 1px solid #ccc;
						}
						&:nth-of-type(2n){
							td{
								border-top: 1px solid transparent;
								border-bottom: 1px solid transparent;
							}
						}
						&:nth-of-type(2){
							td{
								border-top: 1px solid #ccc;
							}
						}
					}
				}
			}
		}
	}
	.el-message-box.msgboxClass{
			width: 500px;
			.el-message-box__header .el-message-box__title{
				font-size: 20px;
			}
			.el-message-box__close{
				display: none;
			}
			.el-message-box__content{
				padding:20px;
				p div{
					margin:10px 0;
				}
			}
			.firstdiv{

			}
			.seconddiv{
				strong{
					color:orange;
				}
			}
		}
</style>
