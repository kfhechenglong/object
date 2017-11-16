<template>
  	<div class="class-re">
		<el-dialog title="班主任管理" v-model="dialogTeacherVisible">
			<div class="cl-list">
				<!-- <p >请选择您要删除的老师</p> -->
				<div class="cl-l-check">
					<el-checkbox-group v-model="checkedTeacher" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="item in teacher_list" :label="item.name" :key="item.name">{{item.name}}</el-checkbox>
				  	</el-checkbox-group>
			  	</div>
			  	<!-- <span><em style="color:red;">提示：</em>被删除的老师中不能包含任何学生信息！</span> -->
			  	<ul class="clearfix btn">
				  	<li class="fl dele" @click="deleTeacher"><i class="el-icon-delete"></i>删除所选</li>
				  	<li class="fr add" @click="addTeacher"><i class="el-icon-plus"></i>增加老师</li>
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
			dialogTeacherVisible:false,
			teacher_list :[],
			checkedTeacher:[]
		}
	},
	created(){

	},
	methods:{
		showTeacher(){
			// 先获取老师列表，然后显示模态框
			util.getTeacher(this,show);
			function show(pointer){
				pointer.dialogTeacherVisible = true;
			};
		},
		handleCheckedCitiesChange(value){
		},
		deleTeacher(){//删除班级
			if(this.checkedTeacher.length === 0){ msgTipsErr(this,'请选择您要删除的对象！');return;}
			let msg = ""
			this.$ajax.post('/teacher/del',{data:this.checkedTeacher}).then((res)=>{
				// console.log(res)
				const backData = res.data;
				if(res.code === 200 && res.msg === "删除成功"){
					this.teacher_list = backData;
					msgTipsSuccess(this,'删除成功！')
				}
			}).catch((err) =>{
				alert(err + '删除出错！')
			})
		},
		addTeacher(){
	        this.$prompt('请输入名字！', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputPattern: /^[\da-zA-Z\u4E00-\u9FA5]{2,5}$/,
	          inputErrorMessage: '2-5个字符,且只能为字母、汉字！',
	          customClass:"add-new"
	        }).then(({ value }) => {
	        	this.$ajax.post('/teacher/add',{'teacher':value}).then((res)=>{
	        		if(res.code === 200){
	        			if(res.msg ==='添加成功'){
	        				this.teacher_list = res.data;
	        				msgTipsSuccess(this,value+'添加成功');
	        			}else if(res.msg ==='姓名重复'){
	        				msgTipsSuccess(this,value+'存在重复名字！');
	        			}
	        		}else{
	        			alert(res)
	        		}
	        	}).catch((err)=>{
	        		alert(err + '添加老师失败！')
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
