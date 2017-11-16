<template>
	<div class="loadOver" >
		<el-dialog
		  title="提示"
		  v-model="aaa"
		  size="tiny"
		  custom-class="dialog_gobackup"
		  top ="40%"
		  >
		  <span style="font-size:20px; color:#6ec1ff;">正在连接服务中 &nbsp;&nbsp;<i class="el-icon-loading"></i></span>
		</el-dialog>
	</div>
</template>
<script>
export default{
	data(){
		return{
			aaa:false
		}
	},
	props:{
		loadOver:{
 			type:Boolean,
 			default:true
 		}
	},
	watch:{
		loadOver:function(){
			this.aaa = this.loadOver;
		}
	},
	created(){
	},
	methods:{

	}
}
</script>
<style lang ="less">
	.loadOver .el-dialog{
		text-align: center;
	}
</style>