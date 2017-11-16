<template>
  <div class="about">
	 <el-dialog title="关于" v-model="dialogAboutVisible">
		<div class="about-content">
			<h3>智能测评听能管理互动系统</h3>
			<p><span>版本：</span><em>V2.013</em></p>
			<div class="copy"><i class="fa fa-copyright"></i><span>版权所有：</span>北京诺信畅听科技有限公司</div>
		</div>
	</el-dialog>
  </div>
</template>
<script>
export default {
  data(){
  	return {
  		dialogAboutVisible:false
  	}
  }
}
</script>

<style lang ="less">
.about{
	.el-dialog{
		width:600px;
		margin-bottom: 0px;
	}
}
.about-content{
	padding: 20px 40px;
	h3{
		height: 60px;
		line-height: 60px;
		font-size: 28px;
		font-weight: 600;
		border-bottom: 2px solid #ccc;
		width:400px;
	}
	p{
		font-size: 20px;
		height: 60px;
		line-height: 60px;
		margin-bottom: 20px;
	}
	.copy{
		font-size: 16px;
	}
}
</style>
