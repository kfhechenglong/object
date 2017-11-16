<template>
  	<div class="class-re">
		<el-dialog title="班级管理" v-model="dialogClassVisible">
			<div class="cl-list">
				<!-- <p >请选择您要删除的班级</p> -->
				<div class="cl-l-check">
					<el-checkbox-group v-model="checkedClass" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="item in class_name_list" :label="item.class_id" :key="item.class_id">{{item.class_name}}</el-checkbox>
				  	</el-checkbox-group>
			  	</div>
			  	<span><em style="color:red;">提示：</em>被删除的班级中不能包含任何学生信息！</span>
			  	<ul class="clearfix btn">
				  	<li class="fl dele" @click="deleClass"><i class="el-icon-delete"></i>删除所选</li>
				  	<li class="fr add" @click="addClass"><i class="el-icon-plus"></i>增加班级</li>
			  	</ul>
			</div>
		</el-dialog>
  	</div>
</template>
<script>
import util from '../../../common/util.js'

export default {
	data(){
		return{
			dialogClassVisible:false,
			class_name_list :[],
			checkedClass:[]
		}
	},
	created(){

	},
	methods:{
		showClass(){
			util.getClass(this,showDilog);
			function showDilog(str){
				str.dialogClassVisible = true;
			}
		},
		handleCheckedCitiesChange(value){
		},
		deleClass(){//删除班级
			if(this.checkedClass.length === 0){ msgTipsErr(this,'请选择您要删除的对象！');return;}
			let msg = ""
			this.$ajax.post('/class/del',{data:this.checkedClass}).then((res)=>{
				// console.log(res)
				const backData = res.data;
				if(res.code === 200 && res.msg === "删除成功"){
					this.class_name_list = backData.data;
					msgTipsSuccess(this,'删除成功！')
				}else if(res.code === 200 && res.msg === "部分删除失败"){
					this.class_name_list = backData.data;
					(backData.nodel).forEach((item) =>{
						(backData.data).forEach((val) =>{
							if(item == val.class_id){
								msg += val.class_name + " ";
							}
						})
					});
					alert(msg +"包含学生信息，您不能删除！");
					this.checkedClass = [];
				}
			}).catch((err) =>{
				alert(err + '删除出错！')
			})
		},
		addClass(){
	        this.$prompt('请输入班级！', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputPattern: /^[\da-zA-Z_—\u4E00-\u9FA5]{2,5}$/,
	          inputErrorMessage: '2-5个字符,且只能为字母、数字、汉字或"_"！',
	          customClass:"add-new"
	        }).then(({ value }) => {
	        	this.$ajax.post('/class/add',{'class_name':value}).then((res)=>{
	        		if(res.code === 200){
	        			util.getClass(this);
	        			msgTipsSuccess(this,value+'添加成功');
	        		}
	        	}).catch((err)=>{
	        		alert(err + '添加失败！')
	        	})
	        }).catch(() => {
	            
	        });
		}
	}
}
</script>

<style lang ="less">
.class-re{
	.cl-list{
		p{
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			background: #ccc;
			width: 200px;
			text-align: center;
			padding:0 10px;
			border-radius: 5px;
			margin-bottom: 20px;
		}
		.el-checkbox{
			margin-left: 20px;
			margin-bottom:10px;
		}
		.cl-l-check{
			max-height: 200px;
			overflow: auto;
		}
		label {
			span{font-size: 20px;line-height:30px;}
			.el-checkbox__label{
				float: right;
				width: 100px;
    			display: block;
    			overflow: hidden;
			}
		}
		.btn{
			margin-top: 20px;
			li{
				cursor: pointer;
				width: 120px;
				line-height: 35px;
				height: 35px;
				/*border:1px solid #ccc;*/
				border-radius: 3px;
				text-align: center;
				font-size: 18px;
				letter-spacing: 3px;
				color:#fff;
				box-shadow: 3px 3px 2px #ccc;
			}
			.dele{
				background-color: red;
			}
			.add{
				
				background-color: #20a0ff;
			}
		}
	}
}
</style>
