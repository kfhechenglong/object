<template>
  <div class="ba-svg" >
    <el-dialog title="查看听力数据" v-model="dialogSvgVisible"  :close-on-click-modal="false">
		<div class="svg-warp">
			<ele-tingli  :objZong="objZong" ref="tinglitu"></ele-tingli>
		</div>
    </el-dialog>
  </div>
</template>

<script>
import tingli from'../tingli/tinglitu.vue'
export default {
	components:{
		'ele-tingli':tingli
	},
	data(){
		return {
			dialogSvgVisible:false,
		}
	},
	props:{
		objZong:{
			type:Array,
			default:function(){
				return []
			}
		}
	},
	mounted(){
		
	},
	methods:{
		show(){
			this.dialogSvgVisible = true;
			setTimeout(() =>{
                this.$refs.tinglitu.drawyuan();//调用听力图中svg渲染
            },50)
		}
	}
}
</script>

<style lang ="less">
	.ba-svg{
		.el-dialog{
			width: 800px;
			margin-bottom:0;
		}
		.svg-warp{
			width: 750px;
			height: 550px;
		}
		dt{
			text-align: left;
			width: auto;
			font-weight: 400;
			float: none;
		}
	}
</style>
