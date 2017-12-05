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
			<ul class="t-ear clearfix" v-if="currentear.length === 2">
				<li class="fl box-b height-50 l-s-1em" :class="{'on':curtEar === 'R' && startLoad}" @click="_toggle_ear('R')">切换左耳</li>
				<li class="fl box-b height-50 l-s-1em" :class="{'on':curtEar === 'L' && startLoad}" @click="_toggle_ear('L')">切换右耳</li>
			</ul>
			<div class="table-HZ" :class="{'height-90':currentear.length === 2}">
				<ul class="clearfix">
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
				<div id="warp">
					<ul>
						<li v-for="(item,index) in line">{{item}}</li>
					</ul>
					<div class="warp">
						<table>
							<tr>
								<th v-for="(item,index) in tableTop" :class="{ 'currenthzClass': (item == frequency) && !hornhidden,'nexthzClass':checkData[item] && checkData[item].isneed == 1 }">
									<p @click="_click_toggle_Hz(item)">
										{{item}}
									</p>
								</th>
							</tr>
							<tr v-for="( tit,index1) in dubline" :class="[(intensity == (tit*5-10)) && !hornhidden ? 'trborder':'']">
								<td v-for="(item,index2) in tableTop" :class="[frequency == item ? 'tdborder' :'',{maxDbClass:_testFn(tit,item)}]">
									<div class="sign" v-if="_isShowSign(tit*5-10,item) === 'success' ">
									</div>
									<div class="signMax" v-if="_isShowSign(tit*5-10,item) === 'error'">
									</div>
								</td>
							</tr>
							<tr>
								<th v-for="(item,index) in tableTop" class="rest-btn">
									<span @click="_click_rest_Hz(item)" v-if="checkData[item] && checkData[item].isfinish == 1 ">
										重测
									</span>
								</th>
							</tr>
						</table>
						<div id="horn" v-if="frequency && !disabled" :class="[hornStartStyle ? 'hornStartStyle':'hornStopStyle',{'horn-hidden':hornhidden}]" >
							<i class="fa fa-volume-up"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="audiometry-right fr box-b" :style="{'height':height}">
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
				<el-button type="info" @click="_toNextHz"  :disabled="('finish' != isfinish) || !start">跳过当前</el-button>
				<el-button type="info" @click="lookResult" :disabled="overTest"><i class="iconfont icon-baocun"></i>完成</el-button>
				<el-button type="info" @click="_storage" :disabled="!start">暂存</el-button>
			</ul>
		</div>
  	</div>
	<div class="c-db check-toggle" @click="_click_div_warp_close" v-if="showCheckDb">
		<div class="c-warp"  @click.stop="aaa =>{}">
			<h3 v-show="awaitNext">请选择当前频率的测试强度</h3>
			<h3 v-show="!awaitNext">请选择下一频率</h3>
			<ul class="clearfix toggle-content" id="checked-db">
				<li v-for="ele,index in options" class="fl" @click.stop="_check_db($event,ele,awaitNext)">{{ele}}<i class="iconfont icon-xuanze2"></i></li>
				<li  @click.stop="_check_db($event,'wait')" v-show="awaitNext">
					待会再测
				</li>
				<div class="no-test-hz" v-if="options.length === 0 && !awaitNext">
					没有待测频率！
				</div>
			</ul>
			<div class="fr" style="margin-right:20px;">
				<el-button v-show="awaitNext" :disabled="false" type="info" class="btn" @click="save_defined">确定</el-button>
				<el-button v-show="!awaitNext" :disabled="false" type="info" class="btn" @click="test_next_hz">确定</el-button>
			</div>
		</div>
	</div>
  	<!-- 被控端loading完成提示 -->
	<div>
		<StartTips :loadOver="dialogVisibleTips"></StartTips>
	</div>
  	<ele-result ref ="result" :checkhz="hz" :line="line" :trueLine="trueLine" :getServer="getServer" :checkDataArray="checkDataArray" :tonetype="xcurrent" :earChinese="_earText" :ear="currentear" @closeResult="closeResult"></ele-result>
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
 			overTest:true,
 			isPause:true,
 			disabled:false,
 			// 用于临时保存测试正确的坐标点
 			signArry :[],
 			// 用于临时保存测试错误的坐标点
 			signArryFalse :[],
 			// 用于保存表格显示标记的坐标点
 			// arry :[],
 			objsign:{},
 			// 用于保存正确的强度和频率
 			Hz_Db:[],
 			// 绘制表格的参数
 			// table: null,
			height: null,
			// width: null,
			cells :null,
			cellHeight: null,
			cellWidth :null,
			indexLeft: null,
			indexTop :null,
			// tr: null,
			sign: null,
 			value: null,
 			wsData : '',
 			// 给服务器保存数据
 			getServer:[
 			],
 			// 是否为第一次测听
 			isFirst:true,
 			isOnline:true,
 			flag:true,
 			timer:true,
 			classHz:[],//未测的hz
 			// 声音是否在播放
 			hasSound:false,
 			// nextHzData:{},
 			checkData:{},
 			currentEarIndex:0,
 			showCheckDb:false,
 			checkDataArray:[],
 			options:[],
 			awaitNext:true,
 			startLoad:false,
 			curtEar:'',
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
				currentTestEarHz.ear = (res[i]);
				currentTestEarHz.dataDetail = JSON.parse(JSON.stringify(getParamsPageData));
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
 		// arry:function(){
 		// 	this.toParams()
 		// },
 		// 测试websocket连接
 		wsData:function(){
 			if(this.wsData.params && this.wsData.params.prepare){// 被控端页面准备好后，可进行操作
				this.dialogVisibleTips = false;
			};
 			// 调用统计函数
 			if(this.wsData.mescon === 'message_success' || this.wsData.mescon === 'message_error' ){
 				this.statistics();
 			};
 			// 接收声音播放停止和开始的指令
 			if(this.wsData.mescon === 'playsound'){
 				this.hasSound = true;
 			}else if(this.wsData.mescon === 'stopsound'){
 				this.hasSound = false;
 			}
 		},
 		currentear:function(){
 			this.getheight();
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
 		// 获取当前要测试的强度范围
 		checkDb:function(){
 			const num = this.maxDb / 5,
 				arr = [];
 			for (let i = 2; i < num + 1; i++) {
 				arr.push(i*5)
 			}
 			return arr;
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
 		// 监听喇叭是否显示
 		hornhidden:function(){
 			// 如果当前耳没有可以测试的数据，则隐藏喇叭和坐标线
 			if(Utils.getNextHz(this.checkData)){
 				// 清空坐标样式
 				return false;
 			}
 			return true;
 		},
 		// 未测的hz
 		nextallHz:function(){
 			let classHzObj = this.checkData,
 				arr = [];
 			for(let i in classHzObj){
 				if(classHzObj[i].isneed === 1 && classHzObj[i].isfinish === 0 && i != this.frequency){
 					arr.push(i)
 				}
 			}
 			return arr
 		}
 	},
 	beforeRouteLeave(to,form,next){
 		this.closeLay = true;
 		next();
 	},
 	methods:{
 		getheight:function(){
 			setTimeout(()=>{
 				const dom = jq('.audiometry-left')[0];
 				this.height = dom.offsetHeight + 'px';
 			},50)
 		},
 		// 关闭预览是，重新计算坐标点
 		closeResult(){
 			console.log(2222)
 			this.getInitValue(this.checkData);
 			this.startCeTing();
 		},
 		// 是否显示已测试完毕正确或错误点的标记
 		_isShowSign(db,hz){
 			const curHz = this.checkData[hz];
 			if(curHz && curHz.isneed == 1 && curHz.isfinish == 1 ){
 				// 显示系统值，且没有自定义值时
 				if(db == curHz.result.systemvalue.y && !curHz.result.user_defined.y){//显示正确显示的点
 					if(curHz.result.systemvalue.dataType == '1'){
 						return 'success'
 					}else{
 						return 'error'
 					}
 				}else if(db == curHz.result.user_defined.y){//显示系统值
 					if(curHz.result.user_defined.dataType == '1'){
 						return 'success'
 					}else{
 						return 'error'
 					}
 				}
 			}
 			return false;
 		},
 		// 跳过当前测试hz
 		_toNextHz(){
 			// 发送暂停指令
 			this.options = this.checkDb;
 			this.awaitNext = true;
 			this.showCheckDb = true;
 		},
 		// 关闭现在强度窗口
 		_click_div_warp_close(){
 			this.showCheckDb = !this.showCheckDb;
 			this.user_defined_db = null;
 			this.to_next_hz = null;
 		},
 		// 选择强度值
 		_check_db(e,ele,flag){
 			Utils.removeClassName('#checked-db','fl');
      		e.currentTarget.className = "fl li-active";
      		// 记录当前选中的db或者hz
      		flag ? this.user_defined_db = ele : this.to_next_hz = ele;
 		},
 		save_defined(){
 			// 设置当前hz的db值
      		if(!this.user_defined_db && !this.to_next_hz){msgTipsErr(this,'请选择强度值！'); return;}
      		this.awaitNext = false;
      		this.options = this.nextallHz;
      		return false;
 		},
 		test_next_hz(){
 			let db = this.user_defined_db,
 				c_hz = this.to_next_hz;
 			if(db && db !="wait"){//if checked db,to set your checked value
      			const hz_obj = this.checkData[this.frequency],
      				user_defined = hz_obj.result.user_defined;
      			hz_obj.isfinish = 1;
      			user_defined.dataType = 1;
      			user_defined.x = +this.frequency;
      			user_defined.y = +db;
      			hz_obj.resultdb = +db;
      		}
      		if(c_hz){//如果选择了下一个要测的hz
      			this.frequency = c_hz;
	      		this.maxDb = this.checkData[c_hz].db;
	      	}
      		this._click_div_warp_close();
      		this.toPause('false');
      		this.isFirst = false;//如果直接跳过第一个要测的hz时
      		// 发送继续指令，测试下一个频率
 			this.toParams(true);
 		},
 		// 切换耳别
 		_toggle_ear(e){
 			console.log(this.checkDataArray)
 			if(this.currentear.length === 2 && e === this.curtEar && this.startLoad){
 				const num = this.currentear.indexOf(e),
 				 	index =  num === 1 ? 0 : 1 ,
 				 	data = this.checkDataArray[num];
 				this.toPause('finish');
 				this.toggleEar = true;
 				//查询当前位置是否测试完成，若为完成则, 记住当前测试的位置
 				this.findRecordHz(data)
 				// 切换耳旁显示信息
 				this.currentearStyle(this.currentear.charAt(index));
        		this._getHzAndDb(index);
		 		this.startCeTing();
 			}
 		},
 		// 检查要保存的点是否已经测试完毕
 		findRecordHz(obj){
 			const res1 = obj.dataDetail[this.frequency].result;
 			if(res1 && res1.systemvalue.x){
 				return false;
 			}else{
				obj.nowPositionX = this.frequency;
				obj.nowPositionY = this.intensity;
			}
 		},
 		// 暂存数据
 		_storage(){
 			this.$confirm('是否暂存数据并退回到主页？', '提示', {
		            //type: 'warning'
		        }).then(() => {
		        	// 保存数据
        			const id = JSON.parse(sessionStorage.getItem('user_id')),
        				time = parseInt(new Date().getTime()),
        				obj = {'user_id':id,'time':time,'data':this.checkDataArray,'order':this.currentear},
        				typeObject = Options.testType;
        			return Utils.setLocalStorage("memoryStorageTestData",typeObject,{"key":6},obj)
		        }).then(()=>{
		        	this.$router.push({ path: '/home' });
		            window.isToggle = false;
		 			// 返回游戏主页
		            var argument = this.wskt.gohome();
		            websocket.send(JSON.stringify(argument));
		        }).catch((e) => {
		        	if(e === 'err'){
		        		msgTipsErr(this,'保存失败！')
		        	}
		        });
 			// console.log(this.checkDataArray)
 		},
 		// 添加删除频率
 		_click_toggle_Hz(e){
 			console.log(e)
 			const obj = this.checkData;
 			if(e == this.frequency) return false;
 			if(obj[e].isneed === 0){
				const nextHzData = Utils.getNextHz(obj);
				// 如果所有的频率都已测试完成，再添加新频率，则显示新频率的坐标点
		 		if(!nextHzData){
		 			// 获取要测值的hz
		 			this.frequency = e;
		 			// 获取要测值的db值
		 			const getDb = obj[this.frequency].db;
		 			this.intensity = getDb <= 70 ? getDb : 70;
		 			this.maxDb = getDb;
		 			this.startCeTing();
		 		}
		 		obj[e].isneed = 1;
 			}else{
 				obj[e].isneed = 0;
 				obj[e].isfinish = 0;
 				obj[e].resultdb = 0;
 				obj[e].data = {};
 				obj[e].result = {'systemvalue':{},'user_defined':{}};
 			}
 		},
 		// 重置频率
 		_click_rest_Hz(e){
 			const obj = this.checkData;
 			if(e == this.frequency) return false;
 			if(obj[e].isfinish === 1 && obj[e].isneed === 1){
 				obj[e].isfinish = 0;
 				obj[e].resultdb = 0;
 				obj[e].data = {};
 				obj[e].result = {'systemvalue':{},'user_defined':{}};
 			}
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
 			// 获取要测试的耳旁信息
			const nextEarData = this.checkDataArray[index];
			this.checkData = this.checkDataArray[index].dataDetail;
			// 获取切换耳旁之前的测试位置
    		if(nextEarData.nowPositionX){
     			this.frequency = nextEarData.nowPositionX;
     			this.intensity = nextEarData.nowPositionY;
     			this.maxDb = this.checkData[this.frequency].db;
     			//测试未完成的点测试过则删除属性
     			delete nextEarData.nowPositionX;
     			delete nextEarData.nowPositionY;
     			return false;
    		}
	 		// 初始化默认开始坐标
	 		this.getInitValue(this.checkData);
 		},
 		getInitValue(checkData){
 			// 初始化默认开始坐标
	 		const nextHzData = Utils.getNextHz(checkData);
	 		if(!nextHzData){
	 			console.log('当前耳旁暂无可测试数据');
	 			return false;
	 		}
	 		// 获取要测值的hz
	 		this.frequency = Object.keys(nextHzData)[0];
	 		// 获取要测值的db值
	 		const getDb = nextHzData[this.frequency].db;
	 		this.intensity = getDb <= 70 ? getDb : 70;
	 		this.maxDb = getDb;
	 		console.log(this.frequency,this.intensity)
 		},
 		statistics(){
 			this.isFirst=false;
 			// 获取传过来的频率,判断频率是否等于发送频率
 			let receive_hz = this.wsData.params['hz'];
 			if(receive_hz != this.frequency){
 				this.toPause('finish');
 				alert("接收的频率不正确");
 			};
 			// 获取传过来的强度
			let receive_db = this.wsData.params['nextdb'];
 			console.log(receive_db,this.intensity)
			if(receive_db > this.maxDb){
				this.checkData[this.frequency] = receive_db;
				this.toPause('finish');
				this.toParams();
				alert("接收的强度大于最大值");
			}else{
				this.intensity = this.wsData.params['nextdb'];
			}
			// 调用坐标函数
			this.startCeTing();
			this.storagedata();
 		},
 		// 数据存储函数
 		storagedata(str){
 			console.log('保存')
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
 			};
 			if(obj[crtDb][isSuccess] >= 3){//判断对错次数是否进行换频
 				this.toParams();
 			}
 		},
	  	// 左右耳信息显示
	  	currentearStyle(str){
	  		// 若是双耳，则两边同时出现提示
	  		var radioleft = document.getElementById('radioleft'),
	  			radioright = document.getElementById('radioright');
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
	 		radioleft = null;
	 		radioright = null;
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
 				this.overTest = false;
		        this.startLoad = true;
		        // 发送继续指令
 				websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
	 			// 点击开始向被控端发送测听参数
				this.toParams();
	 			// 发送最大强度数据;
	 			const argument = this.wskt.wstoctld('games_audio_maxDbList',this.zhutingData);
				websocket.send(JSON.stringify(argument));
 			}
			// 开始测听前，先提示当前测试耳的信息，双耳同时测得话，不进行任何提示
			if(this.currentear !== "A"){
				const getFirstEar = this.curtEar,
					oneear = getFirstEar == 'L'?'左':'右',
					twoear = getFirstEar == 'R'?'左':'右';
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
 			this.isfinish = str;
 			// 发送暂停指令
 			if('finish' == str){
 				this.isPause = false;
				// 发送暂停指令
		    	websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
 			}else{
 				this.isPause = true;
 				if(this.toggleEar){
 					websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
 					this.toParams(true);
 					this.toggleEar = false;
 					return false;
 				}
 				// 发送继续指令
 				websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
 			}
 		},
 		// 点击开始后触发的函数
 		toParams(userdefinedParams){
			// 判断左右耳是否发送完毕；
			var isToggleEar = false;
			const hasNextData = Utils.getNextHz(this.checkData);
			console.log(hasNextData)
			let isToSendNextHz = true;
			if(hasNextData && Object.prototype.toString.call(hasNextData) === '[object Object]'){
				if(!userdefinedParams){
					// 获取要测值的hz
		 			this.frequency = Object.keys(hasNextData)[0];
		 			// 获取要测值的db值
		 			this.maxDb = hasNextData[this.frequency].db;
		 			console.log(this.frequency,this.maxDb)
				}
			}else{//没有待测的hz
				isToSendNextHz = false;
			}
			// 根据后台返回的数据监听判断是否测试完毕
			if (!isToSendNextHz ){
				const currentear = this.currentear;
				let len = currentear.length,
					hasNextEarData = false,
					index = 0;
				if(len > 1){
					// 如果选择的是先左后右或者是先右后左，怎么每个耳听完后都得去检查另外一个耳旁是否有未测听完成的值
					const num = currentear.indexOf(this.curtEar);
					index =  num === 1 ? 0 : 1;
 				 	hasNextEarData = Utils.getNextHz(this.checkDataArray[index].dataDetail);
				}
				// console.log(len,hasNextEarData)
				if( len > 1 && hasNextEarData){
					console.log('换耳')
					// 提示是否需要进行下一耳旁测评
					// 发送暂停指令
					websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
					// twoear+'侧完成测听，将进行'+oneear+'耳测听，请关闭'+twoear+'侧助听设备或掩蔽'+twoear+'耳耳道，同时打开'+oneear+'侧助听设备。', twoear+'侧完成测听',
					const ear = this.curtEar,
						oneear = ear == 'R'?'左':'右',
						twoear = ear == 'L'?'左':'右';
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
			            this._getHzAndDb(index);
				 		isToSendNextHz = true;
			  			// 改变左右耳样式
			  			this.currentearStyle(currentear.charAt(index));
			            // 发送继续指令
			            websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_continue','')));
			            send();
			        }).catch(() => {
			        	this.start = false;
			        	this.step = 0;
			        });
				}else{
					console.log(this.checkDataArray)
					// 提示测评完成
					websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_pause','')));
 					window.isToggle = false;
 					this.start = !this.start;
					this.$confirm('测听完成!', '提示', {
						closeOnClickModal:false,
						closeOnPressEscape:false,
		              	showCancelButton:false,
			        })
			        return ;
				}
			}
			const that = this;
			send();
			function send(){
				if(isToSendNextHz){
					// 定义每次发送的强度
					if(!that.isFirst){
						// 获取上以测试hz的的db值
						const db = Utils.getBeforeHzResult(that.checkData);
						const num = db ? parseInt(Object.values(db)[0].resultdb) + 20 : that.maxDb;
						that.intensity = num < that.maxDb ? num : that.maxDb;
					};
					console.log('换频')
			 		that.isFirst = true;
			 		that.startCeTing();
					// debugger;
					var params = {
						'isToggleEar':isToggleEar,
				    	'ear':that.curtEar,//左右耳信息
			    		'tonetype':that.xcurrent,//信号类别
				    	'testType':'zhuting',//测听类型
				    	'game':that.currentgame,//游戏类别
				    	'time':that.value,//给声时长
				    	'hz':that.frequency,//当前赫兹
				    	'db':that.intensity,//当前强度that.currentDb
				    	'level':that.$route.query['level']
				    };
				    console.log(JSON.stringify(params));
					var argument = that.wskt.wstoctld('games_audio_start',params);
			    	websocket.send(JSON.stringify(argument));
				}
			}
 		},
 		sendTestParms(){

 		},
 		// table表格
 		initTable(){
			const everysize = util.initTable('#warp','td',this.dubline,this.tableTop.length);
			// console.log();
			this.cellWidth = everysize.cellWidth;
			this.cellHeight = everysize.cellHeight;
			this.startCeTing();
		},
		startCeTing(){
			// 首先判断频率及强度是否有值
			if(!this.frequency && !this.intensity) return;
			// 给喇叭进行定位
			let horn = document.getElementById('horn');
			// 查询当前值在数组的index值
			this.indexLeft = this.tableTop.indexOf(this.frequency);
			// 下一个强度要测试的位置
			this.indexTop = this.trueLine.indexOf(+this.intensity);
			// 当前测试强度的位置
			const a = this.wsData.params ? this.wsData.params.db : this.intensity;
			this.trueIndexTop = this.trueLine.indexOf(+a);
			// 判断是否该频率和强度是否存在
			if(this.indexLeft >=0 && this.indexTop>=0){
				// 确定喇叭的位置
				horn.style.top = this.indexTop*this.cellHeight +30+'px';
				horn.style.left = this.indexLeft*this.cellWidth-13 +'px';
				this.showSign()
			}
			horn = null;
		},
		showSign(){
			// 当前元素的标记点显示；若该点为最大值，应进行统计
			// 需要另外添加判断，该频率是否为正确结果,且点第二次后才能进行标记
			// 需要判断最大值正确三次的特例情况
			const params = this.wsData.params
			if((!this.isFirst && params && params['success'] == "true")){
				this.isTrue(this.signArry,'#13ce66');
				return ;
			}
			if((!this.isFirst && params && params['success'] == "false")&&(params['db'] == this.maxDb)){
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
			        	// this.arry.unshift(str[j]);
			        	// 保存一个对象，用于传给canvas绘图
			        	var type = 1,
			        		params_obj = this.wsData.params,
			        		// ear = params_obj['ear'],
			        		db = +params_obj['db'],
			        		hz = +params_obj['hz']
			        		;
			        	if(params_obj['success'] == "false" && (db == this.maxDb)){
			        		type = 'wu';
			        	}
			        	// 将当前hz的isfinish 置为1
			    		Utils.setHzIsfinish(this.checkData,this.frequency);
			        	this.checkData[hz].result.systemvalue = {'x':hz,'y':db,'dataType':type};
			        	this.objsign[hz] = db;
			        	// 保存正确次数大于三次的强度
			        	this.checkData[hz].resultdb = db;
			        	// 清空当前数组
			        	str.length = 0;
			        }
			    }
			}
		},
		lookResult(){
			window.isToggle = false;
			this.gameOverAddData();
			this.toPause('finish');
			this.start = false;
			this.$refs.result.show();
			// 如果被控端连接成功
			if(this.isOnline){
				// websocket.send(JSON.stringify(this.wskt.wstoctld('games_audio_over','')));
			}

		},
		// 测试完成，判断是否增加空数据
		gameOverAddData(){
			const localArr = this.checkDataArray;
			const obj = localArr[0];
			const object = JSON.parse(JSON.stringify(obj));
			if(this.currentear === "A"){//如果是双耳则，复制一条数据
				localArr[0].ear = "R";
				localArr.length = 1;
				localArr.push(object);
				localArr[1].ear = "L";
			}
			if(localArr.length === 1){
				if(this.currentear === "L"){//如果是左耳则，复制一条空数据给右耳
					localArr.push(init(object));
					localArr[1].ear = "R";
				}else if(this.currentear === "R"){
					localArr.push(init(object));
					localArr[1].ear = "L";
				}
			}
			function init(object){
				let a = object.dataDetail;
				for(let i in a){
					if(a[i].isneed === 1){
						a[i].isneed = 0;
						a[i].isfinish = 0;
						a[i].resultdb = 0;
						a[i].data = {};
						a[i].result = {'systemvalue':{},'user_defined':{}};
						continue;
					}
				}
				return object;
			}
		}
 	}
}
</script>
<style lang ="less" >
@bgc:#fff;
@bor:#5e9b71;
@hover:#5c946c;
	#audiometry{
		width: 1330px;
		margin:5px auto;
		overflow: hidden;
		.audiometry-right{
			width: 420px;
			background-color: @bgc;
			/*margin-top: 190px;*/
			/*height: 740px;*/
			border:6px solid @bor;
			.active{
				background-color: @hover;
				color:#fff;
			}
			.title{
				border-bottom: 3px solid @bor;
				h3{
					margin:0px;
					margin-left:30px;
					line-height: 50px;
					font-size: 20px;
				}
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
					line-height: 35px;
					font-size: 18px;
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
					height: 127px;
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
					height: 127px;
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
					}
					strong{
						display: block;
						font-weight: 500;
						font-size: 50px;
					}
				}
				.height-90{
					strong{font-size: 35px;}
				}
				.t-ear{
					li{
						background:#f0f0f0;
						font-size: 24px;
						width: 50%;
						color:#ddd;
						text-align: center;
					}
					.on{
						background: #13ce66;
    					color: #fff;
					}
				}
				#table{
					height: 430px;
					background: @bgc;
					ul{float: left;margin-top: 30px;margin-left: 16px;text-align: right;}
					li{
						list-style: none;
    					line-height: 26px;
    					font-size: 15px;
    					font-weight: 600;
					}
					#warp{
						height: 420px;
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
							height: 40px;
							background: #da4f49;
							padding: 3px;
							color:#fafafa;
							border-radius: 3px;
							cursor: pointer;
							height: 35px;
						    line-height: 35px;
						    margin-top: 5px;
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
						.horn-hidden{
							display: none;
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
		/*跳过hz选择db*/
		.c-db{
			position: fixed;
			left:0;
			top:0;
			right: 0;
			bottom:0;
			background:rgba(0,0,0,0.4); 
			z-index: 3000;
			.c-warp{
				position: fixed;
				left:50%;
				top:50%;
				transform: translate(-50%,-50%);
				width: 450px;
				box-sizing: border-box;
				padding: 10px;
				min-height:150px ;
				background:#fafafa;
				border-radius: 5px;
				box-shadow: 0 0 20px #000;
			}
			h3{
				height: 50px;
				line-height: 50px;
				text-align:center;
				color:#333;
				font-size: 22px;
			}
			.no-test-hz{
				font-size: 20px;
			    color: rebeccapurple;
			    text-indent: 2em;
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
