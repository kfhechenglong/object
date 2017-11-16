<template>
  	<div class="status-warp">
		<el-dialog title="网络状态" v-model="dialogStatusVisible">
			<div class="status-main">
				<dt>
					<dd>网络状态：</dd>
					<dl v-if = "IP" style="color:green;">已连接</dl>
					<dl v-else style="color:red;">未连接</dl>
				</dt>
				<dt>
					<dd>IP地址：</dd>
					<dl>{{IP}}</dl>
				</dt>
			</div>
		</el-dialog>
  	</div>
</template>
<script>
import util from '../../../common/util.js'
import {mapState} from 'vuex'
export default {
	data(){
		return{
			dialogStatusVisible:false,
			class_name_list :[],
			checkedClass:[]
		}
	},
	created(){

	},
	computed:{
        ...mapState(['IP']),
    },
	methods:{
		show(){
			this.dialogStatusVisible = true;
		}

	}
}
</script>

<style lang ="less">
.status-warp{
	.el-dialog{width:600px;}
	dd{width: 100px;text-align: right;}
	dl,dd{
		letter-spacing: 2px;
		display: inline-block;
		font-size: 18px;
		font-weight: 600;
		color:#333;
	}
}
</style>
