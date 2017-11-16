<template>
  <div class="train">
		<div class="title clearfix">
			<h3 class="fl" @click="toSendParams">游戏训练</h3>
			<!-- <div class="fr" :class="{currentActive : start && ('finish' != isfinish)  }" @click="goBack"><i class="fa fa-chevron-left"></i>返回上一步</div> -->
			<div class="fr" style="margin-top: 6px;">
				<goback :isGoBack="gobackFalg">
					<div class="fr" style="">
						<i class="fa fa-arrow-left"></i>返回
					</div>
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
				<!-- 距离控制组件 -->
				<voiceNum  v-on:volume="toggleVol"></voiceNum>
				<!-- <div>
					<p>测听距离</p>
					<el-radio-group v-model="currentDistance" size="large" @change="change">
					    <el-radio-button label="0.5">0.5米</el-radio-button>
					    <el-radio-button label="1.0">1.0米</el-radio-button>
					    <el-radio-button label="2.0">2.0米</el-radio-button>
					</el-radio-group>
				</div> -->
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
		<div>
			<StartTips :loadOver="dialogVisibleTips"></StartTips>
		</div>
  </div>
</template>
<script>
import util from'../../../common/util'
import Goback from '../commonvue/backup'
import StartTips from '../commonvue/startprepare'
import VoiceNum from '../commonvue/voiceNum.vue'
export default {
	components:{
		Goback,
		StartTips,
		VoiceNum
	},
 	data(){
 		return {
 			dialogVisibleTips: false,
 			group:'',
 			currentear:'',
 			currentgame:'',
 			currentsign:'',
 			// 是否开始
 			start:false,
 			// 被控端是否连接
 			isOnline : false,
 			// 是否完成
 			isfinish:'test',
 			// 要测试的词组
 			groupList:[],
 			// 组合词组
 			groupTeat:[],
 			isPause:true,
 			topause:true,
 			wsData :'',
 			step:0,
 			// 记录词组组合的发送位置
 			currentHzNum:0,
 			// 记录换词
 			groupNum:0,
 			// 记录发送词组的发送位置
 			group_num:0,
 			successTimesNum:0,
 			// 传递到下个页面的数据
 			groupString:null,
 			distance:[],//测试距离
 			currentDistance:'0.5',//当前距离
 			environment:null,//测试环境
 			currentVolume:0//当前音量
 		}
 	},
 	// props:{
 	// 	socket:null,
 	// },
 	mounted(){
 		// this.volumeNum = this.$store.state.zhutingData['1000'];
 		// this.currentVolume = this.volumeNum;
 		// 默认显示连接对话框
 		this.dialogVisibleTips = true;
 		this.currentear = this.$route.query['isEar']; 
 		let groupString = this.$route.query['data'];
 		// console.log(groupString)
 		this.groupString = groupString;
 		if (Object.prototype.toString.call(groupString) !== "[object Array]"){
 				groupString.split('');
 				groupString = [groupString]
 			};
 		let group = []
 			groupString.forEach((item) =>{
 				group.push(JSON.parse(item))
 			});
 		this.group = group;
 		this.currentgame = this.$route.query['crtgame'];
 		// 接收测试距离
 		this.distance = this.$route.query['distance'];
 		// 接收测试环境
 		this.environment = this.$route.query['environment'];
 		// console.log(this.group,this.distance,this.environment);
 		
 		// 接收websocket数据
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		})
 		Vm.$on('servermsg',(msg,res,str)=>{
 			if(!that.closeLay){
	 			util.ctld_tran_isOnline(that,res,str);
	 		}
 		});
 		// 获取出来后的数组数据
 		const toArray = util.toArray(this.group);
 		this.groupList = toArray['newArr'];
		this.newpath =  toArray['newpath'];
		this.vpath =  toArray['vpath'];
		// 将词组进行组合
 		this.groupTeat = util.toArrayLin(this.groupList[0]);
 		console.log(this.groupTeat)
 	},
 	beforeRouteLeave(to,form,next){
 		this.closeLay = true;
 		next();
 	},
 	watch:{
		wsData:function(){
			// 被控端页面准备好后，可进行操作
			if(this.isOnline){
				this.dialogVisibleTips = false;
			};
			// 判断当前训练的关数
			this.stops();
			if(this.wsData.params['testType'] == 'yinsu'){
				this.groupNum++;
				console.log(this.groupNum)
				if(this.groupNum == 3){
					// 换组
					this.toSendParams();
				}
			}
			// 判断当前训练是否连续正确三次
			this.successNum();
		}
 	},
 	computed:{
 		gobackFalg:function(){
 			let backfalg = this.start && ('finish' != this.isfinish)
 			return backfalg;
 		}
 	},
 	methods:{
 		toggleVol(e){
 			this.currentVolume = e;
 			console.log(e)
 		},
 		// change(e){
 		// 	let num = Math.ceil(+e - 0.5)*6;
 		// 	this.currentVolume = this.volumeNum - num;
 		// 	// 发送音量
 		// 	let argument = this.wskt.wstoctld('games_audio_toggle',{'volume':this.currentVolume});
 		// 	util._setVolumNum(this,{'decibel':num,'test_id':sessionStorage.getItem('test_id')});
 		// 	console.log(this.currentVolume);
			// websocket.send(JSON.stringify(argument));
 		// },
 		// 开始开关
 		toStart(){
 			this.groupNum++;
				// 点击开始按钮，让被控端发送游戏训练指令
			this.toSendParams();
			this.start = !this.start;
 			this.step = 1;
 			this.topause = false;
 		},
 		toSendParams(){
 			this.groupNum = 0;
 			// debugger;
	    	if(this.currentHzNum == this.groupTeat.length){
				this.currentHzNum = 0;
 				this.group_num++;
	    	};
	    	if(this.group_num >= this.groupList.length){

 				this.group_num = 0;
 			};
			// console.log(this.group_num)
			// console.log(this.currentHzNum)
	    	this.groupTeat = util.toArrayLin(this.groupList[this.group_num]);
	    	let sendPath = util.toArrayLin(this.newpath[this.group_num]);
	    	let vpath = this.vpath[this.group_num]
	    	// console.log(this.groupTeat)
	    	// console.log(sendPath)
	    	let group = this.groupTeat[this.currentHzNum];
	    	// let vpath = sendPath[this.group_num][2];
	    	let groupurl = [vpath+sendPath[this.currentHzNum][0],'null'];
	    	var params = {
					'ear':this.currentear,//左右耳信息
			    	'testType':'liu',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'volume':this.currentVolume,//测听音量
			    	'group':group,//当前词组
			    	'groupurl':groupurl,
			    	'level':this.$route.query['level']
			    }
			    // console.log(group,groupurl)
			console.log(params)
			var argument = this.wskt.wstoctld('games_train_start',params);
	    	websocket.send(JSON.stringify(argument));
 			this.currentHzNum++;
 		},
 		// 重新开关
 		angin(){
 			util.angin(this);
 		},
 		// 暂停继续开关
 		toPause(str){
 			util.toPause(str,this);
 		},
 		stops(){
 			util.stops(this);
 		},
 		successNum(){
 			util.successNum(this);
 		},
 		// 训练完成提示
 		_trainOverTips(){
 			util._trainOverTips(this);
 		},
 		// 进入正式游戏测听界面
 		goNext(){
			window.isToggle = false;
			let param = {'isEar':this.currentear,'crtgame':this.currentgame,'data': this.groupString,'distance':this.distance,'environment':this.environment,'level':this.$route.query['level']};
 			websocket.send(JSON.stringify(this.wskt.goaudioplan('yinsu','official',this.currentgame)));
	    	this.$router.push({ path: '/home/linsix/audiometry',query:param});
 			
 		}
 	}
}
</script>

<style lang ="less">

</style>
