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
		  <div class="fz" style="margin-bottom:10px;">确定返回到参数设置吗？</div>
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
		console.log(this.params)
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
 			this.goBackTips = false;
			let url = "";
			url = sessionStorage.getItem('path_url');
 			window.isToggle = false;
 			console.log({query:this.params})
 			this.$router.push({path:url,query:this.params});
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