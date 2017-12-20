<template>
	<div id="back-btn">
		<div class="back button button-inline button-large button-danger" @click="goBack">
			<i class="el-icon-close"></i>&nbsp;退出测听
		</div>
	</div>
</template>
<script>
import {mapState} from'vuex'
export default{
	data(){
		return{
		}
	},
	props:{
		// flag:{
		// 	type:Boolean,
		// 	default:true
		// }
	},
	computed:{
		...mapState(['btn_tips'])
	},
	methods:{
		goBack(){
 			// 判断是已经保存测试数据，若未保存，则提示保存，否则直接退出
 			if(this.btn_tips){
 				var str  = '测试数据未保存，是否退回到主页？';
 				this.$confirm(str, '提示', {
		            //type: 'warning'
		        }).then(() => {
		            this.$router.push({ path: '/home' });
		            window.isToggle = false;
		 			// 返回游戏主页
		            var argument = this.wskt.gohome();
		            websocket.send(JSON.stringify(argument));
		        }).catch(() => {
		        });
 			}else{
 				this.$router.push({ path: '/home' });
	            window.isToggle = false;
	 			// 返回游戏主页
	            var argument = this.wskt.gohome();
	            websocket.send(JSON.stringify(argument));
 			}
 		}
	}
}
</script>
<style lang ="less">
#back-btn{
	overflow: hidden;
	.back{
		float: right;
		width: 120px;
		height: 50px;
		margin-top: 12px;
		font-weight: 600;
		cursor: pointer;
		text-align: center;
	}
	.button.button-danger {
	  background: #da4f49;
	  color: #fafafa;
	}
	.button.button-danger:hover,
	.button.button-danger:focus {
	  background: #d0312a;
	  color: #fafafa;
	}
	.button-large {
	  height: 50px;
	  padding: 0 18px;
	  border-radius: 6px;
	  -webkit-box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
	  -moz-box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
	  box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
	  font-size: 22px;
	  line-height: 46px;
	}
	.button-large:active{
	  line-height: 50px;
	}
}	
</style>