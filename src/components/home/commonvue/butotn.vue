<template>
	<div class="g-btn">
		<div class="post-abs">
			<button v-show="show" class="xunlian button button-inline button-small button-warning" @click="gamesTrain">
				<i class="fa fa-gamepad"></i>
				游戏训练
			</button>
			<button class="ceting button button-inline button-large button-success" @click="gamesAudio">
				<i class="fa fa-bar-chart"></i>
				<slot name="btn-text">
    		正式测听
  			</slot>
			</button>
		</div>
	</div>
</template>
<script>
import util from '../../../common/util.js'

export default{
	data(){
		return{
			baseurl:''
		}
	},
	props:{
		paramData:{
 			type:null
		},
		show:{
			 type:Boolean,
			 default:true
		}
	},
	created(){
		// 获取当前url
		this.baseurl = window.location.hash.split('/')[2];
		// 保存path用于返回上一步功能
		this.show ? sessionStorage.setItem('path_url',this.$route.path) : "" ;
		// console.log(this.$route.path)
	},
	methods:{
		gamesAudio(){
			if(this.show){
				// 页面跳转的时候向被控端发送指令，通知准备正式测听
				this._util('audiometry','games_url','official');
			}else{
				Utils.gamesPath('audiometry','games_url','official',this.paramData,this.baseurl,this,"toggle")
				this.$emit('hadSend',true)
			}
		},
		gamesTrain(){
			this._util('train','games_url','drill');
		},
		_util(url,mescon,str){
			Utils.gamesPath(url,mescon,str,this.paramData,this.baseurl,this)
			return
		},
		// 路由传参函数
		// urlQuery(str){
		// 	console.log(str)
		// 		// 路由跳转，并通过路由传参数
		// 	window.isToggle = false;
		// 	var aa = {'aa':1}
		// 		this.$router.push({ path:str,params:aa,query:this.paramData});
			
		// }
	}
}
</script>
<style lang ="less">
	.g-btn{
		position: relative;
		height: 80px;
		div{
			button{
				width: 265px;
				height: 75px;
				display: inline-block;
				color: #fff;
				text-transform: uppercase;
				text-align: center;
				padding-top: 6px;
				margin-right: 10px;
				position: relative;
				cursor: pointer;
				border-radius: 5px;
				font-weight: 500;
				border: 1px solid transparent;
				font-size: 40px;
				line-height: 1em;
			}
		}
	}
</style>