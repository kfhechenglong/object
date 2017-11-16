<template>
  	<div class="printer-warp">
		<el-dialog title="打印机" v-model="dialogStatusPrinterVisible">
			<div class="printer-main">
				<dt>
					<dd>打印机状态：</dd>
					<dl v-if = "printMsg != 0 " style="color:green;">打印机：{{printData.printer}}—已连接</dl>
					<dl v-else style="color:red;">失去连接</dl>
				</dt>
				<div v-if = "printMsg != 0 ">
					<p >任务列表：</p>
					<div class="table-warp" >
						<table>
							<thead>
								<tr>
									<th>文档名</th>
									<th>状态</th>
									<th>大小</th>
									<th class="handle">操作</th>
								</tr>
							</thead>
						</table>
						<div class="tbody-warp">
							<table>
								<tbody>
									<tr v-for="(item,index) in printData.data">
										<td>{{item.name}}</td>
										<td>未打印</td>
										<td>{{item.size}}kb</td>
										<td v-if="index === 0" :rowspan="printData.data.length" class="handle" @click="_printCancel(item.id)" style="color:red;">
										<el-button>删除任务</el-button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
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
			dialogStatusPrinterVisible:false,
			printData:{
				data:Array
			}
		}
	},
	created(){
	},
	computed:{
        ...mapState(['printMsg']),
    },
	methods:{
		show(){
			util.getPrint(this);
			setTimeout(()=>{
				this.dialogStatusPrinterVisible = true;
			},50)
		},
		_printCancel(checkid){
			util.getPrint(this,undefined,{printer:2});
		}
	}
}
</script>

<style scoped lang ="less">
.printer-warp{
	dd{width: 130px;text-align: left;margin:20px;}
	dl,dd{
		letter-spacing: 2px;
		display: inline-block;
		font-size: 18px;
		font-weight: 600;
		color:#333;
	}
	p{
		font-size: 18px;
		margin-left:20px;
		margin-bottom:20px;
		color:blue;
	}
	.table-warp{
		width: 639px;
		margin-left: 10px;
	}
	.tbody-warp{
		max-height: 301px;
		overflow: auto;
	}
	table{
		border-collapse: collapse;
		th,td{
			color:#333;
			width:140px;
			text-align: center;
			height: 40px;
			border: 1px solid #333;
			border-right: 1px solid #333;
			&:first-child{
				width:200px;
			}
		}
		tbody tr:first-child td{
			border-top: 0 none;
		}
		th{
			font-size: 18px;
			background-color: #ccc;
		}
	}
}
</style>
