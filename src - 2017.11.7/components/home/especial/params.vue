<template>
  <div class="especial-params">
		<div class="title clearfix">
			<h3 class="fl">参数设置-混淆音区分</h3>
			<div class="fr bg" @click="gobcak">
				<el-button type="warning" >
					<div class="fr" style="">
						<i class="fa fa-arrow-left"></i>返回
					</div>
				</el-button>
			</div>
		</div>
		<div class="params-main">
			<dl class="clearfix">
				<dt style="line-height:40px;">
					&nbsp;&nbsp;&nbsp;测试耳：
				</dt>
				<dd class="checkradio">
				    <el-radio-group v-model="radioEar" size="large">
					    <el-radio-button label="A">双</el-radio-button>
					    <el-radio-button label="R">右</el-radio-button>
					    <el-radio-button label="L">左</el-radio-button>
					</el-radio-group>
				</dd>
			</dl>
			<dl class="clearfix">
				<dt style="line-height:40px;">
					声音类别：
				</dt>
				<dd class="checkVoideType">
				    <el-radio-group v-model="VoideType" size="large">
					    <el-radio-button label="man">
					    <i class="fa fa-male"></i>男
					    </el-radio-button>
					    <el-radio-button label="woman"><i class="fa fa-female"></i>女</el-radio-button>
					</el-radio-group>
				</dd>
			</dl>
			<dl class="clearfix">
				<dt>
					选择拼音：
				</dt>
				<dd>
					<ul class="clearfix">
						<li>
							<div class="check-main clearfix">
								<span class="fl item-title">
									<i>{{voicesGroup[0][0]['hanzi']}}</i>
								</span>
							</div>
							<div>
								<el-radio-group v-model="radio1" @change="handleCheckedChange">
									<p class="fl" v-for = "(val,index1) in voicesGroup[0]">
										<el-radio :disabled="JSON.stringify(val) === radio2" :label="JSON.stringify(val)" :key="val['pinyin']" >{{val['pinyin']}}</el-radio>
									</p>
								</el-radio-group>
							</div>
						</li>
						<li>
							<div class="check-main clearfix">
								<span class="fl item-title">
									<i>{{voicesGroup[1][0]['hanzi']}}</i>
								</span>
							</div>
							<div>
								<el-radio-group v-model="radio2" @change="handleCheckedChange">
									<p class="fl" v-for = "(val,index1) in voicesGroup[1]">
										<el-radio :disabled="JSON.stringify(val) === radio1"  :label="JSON.stringify(val)" :key="val['pinyin']">{{val['pinyin']}}</el-radio>
									</p>
								</el-radio-group>
							</div>
						</li>
					</ul>
				</dd>
			</dl>
			<!-- 游戏选择组件 -->
			<gameType :ActiveContent = "currentGameType" v-on:active = "currentActive"></gameType>
		</div>
		<div>
		<!-- 按钮组件 -->
			<buttongroup :paramData= "checkdata"></buttongroup>
		</div>
  </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import util from '../../../common/util.js'
import Buttongroup from '../commonvue/butotn'
import GameType from '../commonvue/gameType.vue'
export default {
	name:'liu',
	components:{
		Buttongroup,
		GameType
	},
 	data(){
 		return {
 			currentGameType:0,
 			Active : "eggFrenzy",
 			wsData : 'a',
 			VoideType:'man',
 			radioEar:'A',
 			radio1:'',
 			radio2:'',
 			level:0
 		}
 	},
 	created(){
 		// 获取点击返回按钮的参数
 		if(this.$route.query && this.$route.query['isEar']){
 			this.radioEar = this.$route.query['isEar'];
 			this.VoideType = this.$route.query['voideType'];
 			this.radio1 = this.$route.query['data']['radio1'];
 			this.radio2 = this.$route.query['data']['radio2'];
 		}else{
 			this.handleCheckedFirst();
 		}
 	},
  	mounted(){
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
 	},
 	computed:{
 		...mapState(['voicesGroup']),
 		checkdata:function(){
 			return{
 				'voideType':this.VoideType,
				'data':{'radio1':this.radio1,'radio2':this.radio2},
				'isEar':this.radioEar,
				'crtgame':this.Active,
				'level':this.level
			}
 		},
 		gobackFalg:function(){
 			return false;
 		},
 	},
 	methods:{
 		// 操作数据，默认选择第一个
 		handleCheckedFirst(){
 			let voicesGroupString1 = JSON.stringify(this.voicesGroup[0]);
 			let voicesGroupString2 = JSON.stringify(this.voicesGroup[1]);
 			this.radio1 = JSON.stringify(this.voicesGroup[0][0]);
 			if(voicesGroupString1 === voicesGroupString2){
 				this.radio2 = JSON.stringify(this.voicesGroup[1][1]);
 				return;
 			}else{
 				this.radio2 = JSON.stringify(this.voicesGroup[1][0]);
 			}
 		},
 		// 单选按钮
 		handleCheckedChange(value) {
	        let checkedCount = value.length;
	    },
 		// 接收子组件的游戏选择类型
	 	currentActive(str){
	 		console.log(str)
	 		this.Active = str.active;
	 		this.level = str.level;
	 	},
	 	// 返回上一页
	 	gobcak(){
	 		this.$router.push({path:'/home/especial/baseA'})
	 	}
 	}
}
</script>
<style lang ="less">
@bgc:#13ce66;
	.especial-params{
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
			.el-button{
				line-height: 24px;
				padding:5px 15px;
			}
		}
		.bg{
			margin-right: 6px;margin-top: 7px;
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
			.checkradio,.checkVoideType{
				.el-radio-button__orig-radio:checked+.el-radio-button__inner{
					background-color:@bgc;
					border:1px solid @bgc;
					box-shadow: -1px 0 0 0 @bgc;
				}
			}
			.checkVoideType .el-radio-button__inner{
				i{
					font-size: 18px;
				}
				padding: 10px 10px;
			}
			ul{
				width: 850px;
			}
			ul li{
				width: 570px;
				position: relative;
				height: 35px;
				line-height: 35px;
				/*margin-right: 30px;*/
				border:1px solid #ccc;
				border-radius:5px;
				margin:5px 30px 15px 0px;
				.el-radio-group{
					margin-left: 40px;
					p{
						line-height: 35px;
						margin-right:10px;
						.el-radio__label{
							float: left;
							text-align: center;
							width: 60px;
							font-size: 18px;
							margin-left:10px;
						}
					}
				}
				.check-main{
					position: absolute;
					left:0px;
					top:0px;
					width: 100%;
					.item-title{
						border-radius:5px 0 0 5px;
						background-color: @bgc;
						width: 56px;
						color: #fff;
						font-size: 16px;
						font-weight: 600;
						text-indent: 20px;
						height: 35px;
					}
				}
				.el-checkbox__label{
					visibility: hidden;
				}
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
