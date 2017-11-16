<template>
  <div class="add">
 	<div>
 		<el-dialog title="新增学生" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="学号" prop="user_num">
					<el-input v-model.number="addForm.user_num" placeholder="请输入学号"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="user_name">
					<el-input v-model.trim="addForm.user_name" auto-complete="off" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.gender">
						<el-radio class="radio" label='男'>男</el-radio>
						<el-radio class="radio" label='女'>女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="YYYY-MM-DD" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
 	</div>
  </div>
</template>
<script>
// 导入日期转换js
import util from '../../../common/util'
// 导入年龄转换js
// import age from '../../common/age'
import {addStudentInfo} from'../../../api/api'
export default {
 	data(){
 		return {
 			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				user_name: [
					{required: true, message: '请输入姓名', trigger: 'blur' },
					{ min: 2, max: 6, message: '长度在 2 到 6 个字符'}
				]
			},
			//新增界面数据
			addForm: {
				user_name: '',
				gender: '男',
				user_num:'' ,
				birth: '',
			},
 		}
 	},
 	methods:{
 		showTable(){
 			this.addFormVisible = true;
 		},
 		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					// this.$confirm('确认提交吗？', '提示', {}).then(() => {
						// this.addLoading = true;
						//对象拷贝,格式转换
						let para = Object.assign({}, this.addForm);
						// 转换年龄日期格式
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
						// 发送请求
						addStudentInfo(para).then((res) => {
							// this.addLoading = false;
							let data = res.data.data;
							// 给父组件传递数据
							this.$emit('newStudent',data);
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							// 从新获取数据列表
							// this.getUsers();
						});
					// });
				}
			});
		}

 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
	.add{
		.el-dialog--small{
			width: 600px;
			height: 370px;
			.el-dialog__header{
				padding:0px 20px 0px 20px;
				// padding-left:20px;
				line-height: 40px;
				background-color: #f8f8f8;
				border-bottom:1px solid #ccc;
			}
			.el-dialog__body{
				padding: 30px 30px 0px 20px;
				.el-form{
					margin-right: 10px;
				}
			}
			.el-dialog__footer{
				padding:0px 20px 0px;
			}
		}
	}
</style>
