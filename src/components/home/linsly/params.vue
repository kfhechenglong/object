<template>
  <div class="liu-params">
		<div class="title clearfix">
			<h3 class="fl">参数设置-{{testname}}</h3>	
			<span class="fr"><i class="fa fa-question-circle"></i></span>
		</div>
		<div class="params-main">
			<dl class="clearfix">
				<dt>
					{{testname}}：
				</dt>
				<dd class="lin-tone">
					<span v-for ="item in group">/{{item}}/</span>
				</dd>
			</dl>
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
					测试距离：
				</dt>
				<dd class="checkradio">
				    <el-checkbox-group v-model="distance" size="large">
						<el-checkbox-button v-for="item in distances" :label="item" :key="item">{{item+'m'}}</el-checkbox-button>
					</el-checkbox-group>
				</dd>
			</dl>
			<dl class="clearfix">
				<dt style="line-height:40px;">
					测试环境：
				</dt>
				<dd class="checkradio">
				    <el-radio-group v-model="environment" size="large">
					    <el-radio-button label="安静">安静</el-radio-button>
					    <el-radio-button label="嘈杂">嘈杂</el-radio-button>
					</el-radio-group>
				</dd>
			</dl>
			<!-- 游戏选择组件 -->
			<gameType :ActiveContent = "currentGameType" v-on:active = "currentActive"></gameType>
		</div>
		<div>
			<buttongroup :paramData= "checkdata"></buttongroup>
		</div>
  </div>
</template>
<script>
const distances = ['0.5', '1.0', '2.0'];
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
 			// 游戏测试名称
 			testname:'',
 			// 测试的数据
 			testgroup:'',
 			Active : "",
 			wsData : 'a',
 			leixing :'zhuan',
 			radioEar:'A',//测试耳
 			distances:distances,
			distance:['0.5', '1.0', '2.0'],//测试距离
			environment:'安静',//测试环境
			group:[],
			groupAll:[],
			// 排序后的词组
			groupSort:[],
			level:0
 		}
 	},
 	created(){
 		// 获取测试类型
 		var gametest = {'id':sessionStorage.getItem('test_id')};
 		// 获取点击返回按钮的参数
 		if(this.$route.query && this.$route.query['isEar']){
 			this.radioEar = this.$route.query['isEar'];
 			this.distance = this.$route.query['distance'];
		 	this.environment = this.$route.query['environment'];
 		}
 		this.$ajax.post(`/assess/getGroups`,gametest).then((response)=>{
 			if(response.code == 200){
				this.testname = response.data['name'];
	 			this.testgroup = response.data.data;
	 			// 生成排序列表
	 			console.log(response.data)
	 			this.arr();
 			}else{
 				msgTipsErr(this,'请求错误！');
 			}
 		}).catch(function(error){
 			console.log(error)
 		});
 	},
  	mounted(){
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
 		Vm.$on('servermsg',(msg,res)=>{
 		})
 	},
 	watch:{
		wsData:function(){
		}
 	},
 	computed:{
 		checkdata:function(){
 			return{
				'data':this.groupSort,
				'isEar':this.radioEar,
				'crtgame':this.Active,
				'distance':this.sort,
				'environment':this.environment,
				'level':this.level,
				'gamesPath' : this.gamesPath,
			}
 		},
 		// 对距离进行排序,有近到远
 		sort:function(){
 			function sumSort(a,b){
	    		return a-b;
	    	};	    
	    	this.distance.sort(sumSort);
	    	return this.distance;
 		}
 	},
 	methods:{
 		// 操作数组
 		arr(){
 			var abs = this.testgroup;
 			
 			var arrlist = [];
 			var str = [];
 			abs.forEach((value,index) =>{
 				this.group = value['children'].split(',');
 				str.push(JSON.stringify(value));
 			});
 			// this.group = arrlist;
 			console.log(str)
 			// 默认全选
 			this.groupSort  = str;
 		},
 		// 接收子组件的游戏选择类型
	 	currentActive(str){
	 		console.log(str)
	 		this.Active = str.active;
			 this.level = str.level;
			 this.gamesPath = str.gamesPath;
	 	}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
@bgc:#13ce66;
	.liu-params{
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
			span{
				line-height: 50px;
    			font-size: 28px;
    			color:#5f9770;
    			i{
    				cursor: pointer;
    			}
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
				.lin-tone span{
					float: left;
					margin-left: 15px;
				    font-size: 26px;
				    line-height: 25px;
				}
			}
			/*单选按钮开始*/
			.checkradio{
				.el-checkbox-button.is-checked .el-checkbox-button__inner,.el-radio-button__orig-radio:checked+.el-radio-button__inner{
					background-color:@bgc;
					border:1px solid @bgc;
					box-shadow: -1px 0 0 0 @bgc;
				}
			}
			ul{
				width: 850px;
			}
			/*ul li{
				width: 375px;
				position: relative;
				height: 35px;
				line-height: 35px;
				border:1px solid #ccc;
				border-radius:5px;
				margin:5px 30px 5px 0px;
				.check-main{
					position: absolute;
					left:0px;
					top:0px;
					width: 380px;
					span{
						border-radius:5px 0 0 5px;
						background-color: @bgc;
						width: 80px;
						color: #fff;
						font-size: 16px;
						font-weight: 600;
						text-indent: 40px;
						height: 35px;
					}
					p{
						font-size: 20px;
						em{
							float: left;
							margin-left: 10px;
						}
					}
				}
				.el-checkbox__label{
					visibility: hidden;
				}
			}*/
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
