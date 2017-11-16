<template>
	<div class="history">
		<el-dialog title="历史日志" v-model="dialogHistoryVisible">
		  	<el-collapse accordion>
			  	<el-collapse-item>
				    <template slot="title">
				      <span>一致性</span> 
				      <span class="fr">2017-1-20&nbsp;&nbsp;<i class="header-icon el-icon-information"></i>&nbsp;&nbsp;</span>
				    </template>
				    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
				    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  	</el-collapse-item>
			  	<el-collapse-item>
			  		<template slot="title">
				      <span>一致性</span> 
				      <span class="fr">2017-1-20&nbsp;&nbsp;<i class="header-icon el-icon-information"></i>&nbsp;&nbsp;</span>
				    </template>
				    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  	</el-collapse-item>
			  	<el-collapse-item>
			  		<template slot="title">
				      <span>一致性</span> 
				      <span class="fr">2017-1-20&nbsp;&nbsp;<i class="header-icon el-icon-information"></i>&nbsp;&nbsp;</span>
				    </template>
				    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  	</el-collapse-item>
			  	<el-collapse-item>
			  		<template slot="title">
				      <span>一致性</span> 
				      <span class="fr">2017-1-20&nbsp;&nbsp;<i class="header-icon el-icon-information"></i>&nbsp;&nbsp;</span>
				    </template>
				    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  	</el-collapse-item>
			  	<el-collapse-item>
			  		<template slot="title">
				      <span>一致性</span> 
				      <span class="fr">2017-1-20&nbsp;&nbsp;<i class="header-icon el-icon-information"></i>&nbsp;&nbsp;</span>
				    </template>
				    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  	</el-collapse-item>
			</el-collapse>
			<div class="block">
			  <!-- <span class="demonstration">大于 7 页时的效果</span> -->
			  <el-pagination
			  	@size-change="handleSizeChange"
      			@current-change="handleCurrentChange"
			    layout="prev, pager, next"
			    :page-size="5"
			    :total="50">
			  </el-pagination>
			</div>
		  <div slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogHistoryVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="dialogHistoryVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
export default {
  data() {
  	return {
  		dialogHistoryVisible: false,
        formLabelWidth: '120px',
  	}
  },
  methods : {
  	showTable(){
  		this.dialogHistoryVisible = true;
  	},
	handleSizeChange(val) {
	    console.log(`每页 ${val} 条`);
	},
	handleCurrentChange(val) {
	    console.log(`当前页: ${val}`);
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
	.history{
		.el-dialog{
			width:500px;
		}
		.el-dialog__body{
			padding-bottom:0px; 
		}
		.block{
			margin-top: 20px;
    		text-align: center;
		}
	}
	
</style>
