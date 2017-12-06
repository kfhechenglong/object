<template>
	<div class="g-btn">
		<div>
			<button class="xunlian button button-inline button-small button-warning" @click="gamesTrain">
				<i class="fa fa-gamepad"></i>
				游戏训练
			</button>
			<button class="ceting button button-inline button-large button-success" @click="gamesAudio">
				<i class="fa fa-bar-chart"></i>
				正式测听
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
 		}
	},
	created(){
		// 获取当前url
		this.baseurl = window.location.hash.split('/')[2];
		// 保存path用于返回上一步功能
		sessionStorage.setItem('path_url',this.$route.path);
		// console.log(this.$route.path)
	},
	methods:{
		gamesAudio(){
	    	// 页面跳转的时候向被控端发送指令，通知准备正式测听
			this._util('audiometry','games_audio_plan','official');
	    },
	    gamesTrain(){
			this._util('train','games_train_plan','drill');
	    },
	    _util(url,mescon,str){
	    	Utils.gamesPath(url,mescon,str,this.paramData,this.baseurl,this)
	    	return
	    },
	    // 路由传参函数
	    urlQuery(str){
	    	console.log(str)
	    	 // 路由跳转，并通过路由传参数
	    	window.isToggle = false;
	    	var aa = {'aa':1}
	    	 this.$router.push({ path:str,params:aa,query:this.paramData});
	    	
	    }
	}
}
</script>
<style lang ="less">
	.g-btn{
		position: relative;
		height: 80px;
		div{
			position: absolute;
			left:50%;
			top:50%;
			transform: translate(-50%,-50%);
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
			.button.button-warning {
			  background: #faa732;
			  color: #fafafa;
			}
			.button.button-warning:hover,
			.button.button-warning:focus {
			  background: #f9960a;
			  color: #fafafa;
			}
			.button.button-success {
			  background: #5bb75b;
			  color: #fafafa;
			}
			.button.button-success:hover,
			.button.button-success:focus {
			  background: #47a247;
			  color: #fafafa;
			}
			.button-large.button-success,
			.button.button-warning {
			  -webkit-box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2);
			  -moz-box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2);
			  box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2);
			}
		}
	}
</style>