<template>
  <div class="params">
		<div class="title">
			<h3>参数设置-助听听阈</h3>
		</div>
		<div class="params-main">
			<dl class="clearfix">
				<dt>
					测听类型：
				</dt>
				<dd>
					<el-button type="success">助听听阈</el-button>
				</dd>
			</dl>
			<dl class="clearfix">
				<dt>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;侧别：
				</dt>
				<dd class="checkradio">
					<div class="fl" style="margin:0px 15px;">
						<!-- <span :class="{'currentClass': radioEar == 'L' || radioEar == 'R'}">单耳:</span> -->
					    <el-radio v-model="radioEar" label="L">仅测左耳</el-radio>
					    <el-radio v-model="radioEar" label="R">仅测右耳</el-radio>
					</div>
					<el-tooltip :manual="false" class="item fl" effect="light" placement="top-start">
						<div>
							<!-- <span :class="{'currentClass': radioEar == 'A' || radioEar == 'LR'|| radioEar == 'RL'}">双耳:</span> -->
						    <el-radio v-model="radioEar" label="LR">先左后右</el-radio>
						    <el-radio v-model="radioEar" label="RL">先右后左</el-radio>
						    <el-radio v-model="radioEar" label="A">双耳同时</el-radio>
							</div>
						<div slot="content" style="font-size:14px;">建议先从听力相对较好的一侧开始测听。</div>
					</el-tooltip>
				</dd>
			</dl>
			<dl class="clearfix hidden">
				<dt>
					信号类型：
				</dt>
				<dd>
					<el-button-group>
						<el-button size="large":class="{active : 'zhuan'== leixing}" @click="lei('zhuan')">啭音</el-button>
						<el-button size="large":disabled="true"  :class="{active : 'zhai'== leixing}" @click="lei('zhai')">窄带</el-button>
					</el-button-group>
				</dd>
			</dl>

			<ele-hz @checkedHz="get" ></ele-hz>
		<gameType :ActiveContent = "currentGameType" v-on:active = "currentActive"></gameType>
		</div>
		<div>
			<buttongroup :paramData= "checkdata"></buttongroup>
		</div>
  </div>
</template>
<script>

import HZ from '../commonvue/hz'
import Buttongroup from '../commonvue/butotn.vue'
import GameType from '../commonvue/gameType.vue'
export default {
	components:{
		'ele-hz' : HZ,
		Buttongroup,
		GameType
	},
 	data(){
 		return {
 			currentGameType:1,
 			Active : "diglett",
 			checkList: "",
 			// 接收websocket传值
 			wsData : 'a',
 			isIndeterminate: true,
 			leixing : 'zhuan',
 			radioEar:'A',
			doubleEar:'',
			level:0
 		}
 	},
 	// props:{
  	//   socket:null,
  	// },
  	mounted(){
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 			var url = window.location.hash;
    	})
      	// 获取点击返回按钮的参数
 		if(this.$route.query && this.$route.query['isEar']){
 			this.radioEar = this.$route.query['isEar'];
 			this.leixing = this.$route.query['crtsign'];
 		}
 	},
 	watch:{
		wsData:function(){
			console.log(this.wsData);
			console.log(this.wsData.params);
		}
 	},
 	computed:{
 		checkdata:function(){
 			return{
 				'crtdb':this.db,
				'data':JSON.stringify(this.checkList),
				'isEar':this.radioEar,
				'crtgame':this.Active,
				'crtsign':this.leixing,
				'level':this.level
			}
 		},
 	},
 	methods:{
 		// 接收子组件的游戏选择类型
	 	currentActive(str){
	 		// console.log(str)
	 		this.Active = str.active;
	 		this.level = str.level;
	 	},
	    lei(res){
	    	this.leixing = res;
	    },
	    get(res,req){
	    	console.log(res,req)
	    	this.checkList = res;
	    	this.db = req
	    }
 	}
}
</script>
<style lang ="less">
	.params{
		width: 1150px;
		height: 700px;

		margin:0px auto ;margin-top: 60px;
		background-color: #fff;
		border:8px solid #5f9970;
		.title{
			border-bottom:3px solid #5b9b69;
			margin:0px 20px;
			h3{
				font-weight: 500;
				margin:0px;
				line-height: 50px;
				font-size: 25px;
			}
		}
		.el-checkbox{
			width: 45px;
    		text-align: center;
    		.el-checkbox__label{
				display: block;
    		}
		}
		.params-main {
			padding-left: 100px;
			dl{
				margin-top:25px;
			}
			/*单选按钮开始*/
			.checkradio{
				float: left;
				border:1px solid  #bfcbd9;
				border-radius: 5px;
				padding-right:10px;height: 35px;line-height: 35px;

			}
			/*单选按钮结束*/
			dt,dd{
				float: left;
			}
			dt{
				font-size: 18px;
				color:#3377b8;
			}
			.check{
				margin-left: 115px;
				margin-top: 20px;
			}
		}
	}
</style>
