<template>
  <div class="train">
		<div class="title clearfix">
			<h3 class="fl">游戏训练</h3>
			<div class="fr" style="margin-top: 6px;">
				<goback :isGoBack="gobackFalg">
					<div class="fr" style=""><i class="fa fa-arrow-left"></i>返回</div>
				</goback>
			</div>
		</div>
		<div class="train-main clearfix">
			<div class="train-main-top clearfix">
				<div>
					<el-button type="success"  @click="toStart" :disabled="start || !isOnline"><i class="fa fa-play"></i>开始</el-button>
					<el-button type="success"  @click="toPause('finish')"  :disabled="topause" v-show="isPause"><i class="fa fa-pause"></i>暂停</el-button>
					<el-button type="success" @click="toPause('jixun')"  :disabled="!start" v-show="!isPause"><i class="fa fa-play"></i>继续</el-button>
				</div>
				<!-- 样式参考voiceNum组件 -->
				<div class="fl voice-num">
					<p class="fl">给声时长</p>
					<el-input-number class="num" v-model="value" :step="1" @change="change" :min="1" :max="5"></el-input-number>
					<div class="fz16 m-l-20" v-if="step && gamesTimesObj.step">
						<span class="d-block height-30">有效次数：{{gamesTimesObj.times}}次</span>
						<span class="d-block height-30">平均反应时间：{{gamesTimesObj.time}}s</span>
					</div>
				</div>
				<!-- 改变默认有效时长 -->
				<div class="temp-btn">
					<DefaultTime @changedefault ="change_default"></DefaultTime>
				</div>
				<div style="margin-left:378px;margin-top:30px;">
					<voiceNum v-on:volume="toggleVol"></voiceNum>
				</div>
			</div>
			<div class="train-main-middle">
				<el-steps :space="100" direction="vertical" :active="step">
				  <el-step title="步骤 1" description="跟着提示，一步一步操作"></el-step>
				  <el-step title="步骤 2" description="没有提示，自由练习，直到完全掌握游戏规则"></el-step>
				</el-steps>
			</div>
		</div>
		<div class="button">
			<div class="fl">
				<el-button type="info" :disabled="'finish' != isfinish" @click="angin">
					<i class="fa fa-repeat"></i>
					重头再来一遍
				</el-button>
			</div>
			<div class="fr">
				<el-button type="success" class="btnd" @click="goNext" :disabled="'finish' != isfinish">完成训练&nbsp;&nbsp;&nbsp;&nbsp;进入测听<i class="fa fa-chevron-right"></i></el-button>
			</div>
		</div>
		<!-- 被控端loading完成提示 -->
		<div>
			<StartTips :loadOver="loadOver"></StartTips>
		</div>
		<GamesTime ref="gamestime" :show="true" :games="currentgame" :value="gamesvalue" :feedbackTime="feedbackTime"></GamesTime>
  </div>
</template>
<script>
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import GamesTime from '../commonvue/games-time.vue'
import DefaultTime from '../commonvue/games-default-time.vue'
import VoiceNum from '../commonvue/voiceNum.vue'
import {mapState} from 'vuex'
export default {
	components:{
		Goback,
		VoiceNum,
		StartTips,
		GamesTime,
		DefaultTime
	},
 	data(){
 		return {
 			loadOver: false,
 			hz:'',
 			current:'',
 			currentgame:'',
 			currentsign:'',
 			// 是否开始
 			start:false,
 			// 被控端是否连接
 			isOnline : false,
 			// 是否完成
 			isfinish:'test',
 			isPause:true,
 			topause:true,
 			wsData :'',
 			step:0,
 			// 连续正确的次数
 			successTimesNum:0,
 			// 第三关正确的总次数
 			successAllNum:0,
 			// 反应的总时间
 			successResponseTime:0,
 			value: 5,
 			feedbackTime:5,
			gamesvalue:5,
			defaultvoice:0
 		}
 	},
 	created(){
	},
 	mounted(){
 		// 默认显示连接对话框
 		this.loadOver = true;
 		this.db= this.$route.query.crtdb;
 		this.hz = this.$route.query.data;
 		this.current = this.$route.query.isEar;
 		this.currentgame = this.$route.query.crtgame;
 		this.currentsign = this.$route.query.crtsign
 		// 接收websocket数据
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		})
 		Utils._getVolumNum(this).then((res)=>{
			this.value = +res.time;
			this.gamesvalue = +res.time;
		})
 		Vm.$on('servermsg',(msg,res,str)=>{
 			// console.log(msg.mescon,res,str)
 			if(!that.closeLay){
	 			Utils.ctld_tran_isOnline(that,res,str);
	 		}
		 });
 	},
 	watch:{
		wsData:function(){
			// 被控端页面准备好后，可进行操作
			if(this.isOnline){
				this.loadOver = false;
			};
			// 判断当前训练的关数
			this.stops();
			// 判断当前训练是否连续正确三次
			this.successNum();
		}
 	},
 	computed:{
 		...mapState(['gamesTimesObj']),
 		gobackFalg:function(){
 			let backfalg = this.start && ('finish' != this.isfinish)
 			return backfalg;
 		},
 		averageTime :function(){
 			let averageTime = Math.round(this.successResponseTime/this.successAllNum);
 			if(averageTime > 5 || isNaN(averageTime)){return averageTime = 5};
 			if(averageTime < 1){return averageTime = 1};
 			return  averageTime;
 		},
 	},
 	beforeRouteLeave(to,form,next){
 		// console.log(to,form,next);
 		this.closeLay = true;
 		next();
 	},
 	methods:{
		//  改变默认有效时长
		change_default(e){
			this.defaultvoice = e;
		},
 		// 切换给声时长
 		change(evt){
 			// 页面初始化后不主动发送数据
 			const params = {
	    		'tonetype':this.currentsign,//信号类别
		    	'testType':'zhuting',//测听类型
		    	'game':this.currentgame,//游戏类别
		    	'time':evt,//给声时长
		    };
		    this.gamesvalue = evt;
		    Utils.chang_params(this,params);
 		},
 		toggleVol(e){
 			this.currentVolume = e;
 		},
 		// 开始开关
 		toStart(){
			// 点击开始按钮，让被控端发送游戏训练指令
			var params = {
				'ear':'A',//左右耳信息
	    		'tonetype':this.currentsign,//信号类别
		    	'testType':'zhuting',//测听类型
		    	'game':this.currentgame,//游戏类别
		    	'time':this.value,//默认给声时长
		    	'hz': '1000',//当前赫兹
		    	'level':this.$route.query['level'],
		    	'validTime':this.defaultvoice,//有效时长
		    	'volume':this.currentVolume//当前强度this.currentDb
			};
			console.log(params)
	    	var argument = this.wskt.wstoctld('games_train_start',params);
	    	websocket.send(JSON.stringify(argument));
 			this.start = !this.start;
 			this.step = 1;
 			this.topause = false;
 		},
 		successNum(){
			Utils.successNum(this,true);
 		},
 		// 重新开关
 		angin(){
 			Utils.angin(this);
 		},
 		// 暂停继续开关
 		toPause(str){
 			Utils.toPause(str,this);
 		},
 		stops(){
 			Utils.stops(this);
 		},
 		// 训练完成提示
 		_trainOverTips(){
 			Utils._trainOverTips(this);
 		},
 		goNext(){
			Utils.gamesPath('audiometry','games_url','official',this.$route.query,'zhuting',this)
			return false
 			// window.isToggle = false;
 			// var param = this.hz;
 			// var ear = this.current;
 			// var games = this.currentgame;
			//  var sign = this.currentsign;
			//  console.log(this.$route.query)
 			// websocket.send(JSON.stringify(this.wskt.goaudioplan('zhuting','official',games)));
	    	// this.$router.push({ path: '/home/zhuting/audiometry',query:{data:param,crtdb:this.db,isEar:ear,crtgame:games,crtsign:sign,'level':this.$route.query['level']}})
 		}
 	}
}
</script>
<style lang ="less">
.temp-btn{
	.el-radio-button__inner{
		padding: 20px 21px;
    	font-size: 20px;
	}
}
</style>

<style lang ="less" scoped>
.train{position: relative;}
.train .train-main .train-main-middle{
	margin-top:20px;
}
.train-main-top{
	position: relative;
}
.temp-btn{
	position: absolute;
	left: -30px;
	top:90px;
	p{padding:0 5px;}
}
</style>
