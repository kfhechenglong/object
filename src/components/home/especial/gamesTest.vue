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
				<!-- 音量控制组件 -->
				<voiceNum  v-on:volume="toggleVol"></voiceNum>
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
 			currentVolume:0
 		}
 	},
 	// props:{
 	// 	socket:null,
 	// },
 	mounted(){
 		// 默认显示连接对话框
 		this.dialogVisibleTips = true;

 		this.getUrlData();
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
 		},
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
 		// 开始开关
 		toStart(){
 			// this.groupNum++;
				// 点击开始按钮，让被控端发送游戏训练指令
			this.toSendParams();
			this.start = !this.start;
 			this.step = 1;
 			this.topause = false;
 		},
 		toSendParams(){
	    	let group = this.groupList;
	    	// let vpath = sendPath[this.group_num][2];
	    	let groupurl = this.vpath;
	    	var params = {
					'ear':this.currentear,//左右耳信息
			    	'testType':'tone',//测听类型
			    	'game':this.currentgame,//游戏类别
			    	'volume':this.currentVolume ,
			    	'group':group,//当前词组
			    	'groupurl':groupurl,
			    	'level':this.$route.query['level']
			    }
			    // console.log(group,groupurl)
			    console.log(params)
			var argument = this.wskt.wstoctld('games_train_start',params);
	    	websocket.send(JSON.stringify(argument));
 			// this.currentHzNum++;
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
 		goNext(){
 			window.isToggle = false;
			let param = {'voideType':this.voideType,'isEar':this.currentear,'crtgame':this.currentgame,'data': this.group,'level':this.$route.query['level']};
			console.log(param);
 			websocket.send(JSON.stringify(this.wskt.goaudioplan('yinsu','official',this.currentgame)));
	    	this.$router.push({ path: '/home/especial/audiometry',query:param}  )
 		}
 	}
}
</script>

<style lang ="less">

</style>
