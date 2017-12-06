<template>
	<div class="gobackup">
		<el-button class="gb" type="warning"  :disabled="isGoBack" @click="goBack">
			<slot></slot>
		</el-button>
		<el-dialog
		  title="提示"
		  :visible.sync="goBackTips"
		  size="tiny"
		  custom-class="dialog_gobackup" 
		  v-model="goBackTips"
		  top="40%">
		  <div class="fz" style="margin-bottom:10px;">确定返回到上一页面吗？</div>
		  <!-- <div class="fz">确认后将放弃本次的测听数据！</div> -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="goBackTips = false">取 消</el-button>
		    <el-button type="primary" @click="_argument">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
export default{
	data(){
		return{
			goBackTips:false,
			params:null
		}
	},
	props:{
		isGoBack:{
 			type:null
 		},
 		start:{
 			type:Boolean,
 			default:false
 		}
	},

	created(){
		this.params = this.$route.query;
	},
	methods:{
		goBack(){
			console.log(this.start)
			if(this.start){
				this.goBackTips = true;
		        return
 			};
 			// console.log(222)
 			this._argument();
 		},
 		_argument(){
 			let flag = this.$route.query.flag;
 			this.goBackTips = false;
 			window.isToggle = false;
 			if(flag){
 				this.$router.push({path:"/home"});
 			}else{
				let url = sessionStorage.getItem('path_url');
 				this.$router.push({path:url,query:this.params});
 			}
 			// 返回游戏主页
            var argument = this.wskt.gohome();
            websocket.send(JSON.stringify(argument));
 		}
	}
}
</script>
<style lang ="less">
	.gobackup{
		.gb{
			line-height: 24px;
			padding:5px 15px;
		}
		.el-message-box__btns{
			padding: 0px 20px 15px;
		}
		.fz{
			font-size:16px;
		}
	}
	
</style>