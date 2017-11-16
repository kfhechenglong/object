<template>
  <div class="adduser" v-show="dialogFormVisible">
	<div class="adduser-content">
		<div class="title clearfix">
			<h3>添加用户</h3>
			<span  @click="close">&times</span>
		</div>
		
		<div class="adduser-info">
			<el-form :model="addUser" :rules="addUserRules" ref="addUser">

				<el-row>
					<el-form-item label="姓名：" prop="name">
						<el-input v-model.trim.lazy="addUser.name" placeholder="张"></el-input>
					</el-form-item>
			    </el-row>
				<el-row>
					<el-form-item label="密码：" prop="pwd">
						<el-input v-model="addUser.pwd" placeholder="123456789"></el-input>
					</el-form-item>
			    </el-row>
			    <!-- <el-row>
			    	<div class="adduser-danan">
				  	档案权限:
			    	</div>
				</el-row>
				<el-row>
			  		<template>
					  <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</template>
			    </el-row> -->
			 </el-form>
		</div>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submit('addUser')">确 定</el-button>
		  </div>
	</div>
  </div>
</template>
<script>
import {operatorAdd} from'../../../api/api'
import util from 'common/util'
export default {
    data() {
	  	return {
	  		dialogFormVisible: false,
	        addUser: {
		         name: '',
		         pwd: '',
		    },
		    options: [{
	          value: '0',
	          label: '仅自己'
	        }, {
	          value: '1',
	          label: '所有人'
	        }],
	        value: '',
	        addUserRules:{
	        	name:[
	        		{required: true,message: '请输入姓名',  trigger: 'blur'},
	        		{ pattern:/^[A-Za-z\u4e00-\u9fa5]+$/, message: '用户名只能为字母或汉字'},
	        		{ min: 2, max: 10, message: '长度在 2 到 10 个字符'}
	        	],
	        	pwd :[
	        		{required: true,message: '请输入密码',  trigger: 'blur'},
	        		{ pattern:/^\w+$/, message: '密码只能为字母、数字或下划线'},
	        		{ min: 6, max: 20, message: '长度在 6 到 20 个字符'}
	        	]
	        },
		}
	},
	methods : {
	  	childShow(){
	  		this.dialogFormVisible = true;
	  	},
	  	close(){
	  		this.dialogFormVisible = false;
	  		this.$refs.addUser.resetFields();
	  	},
	  	submit(formName){
	  		this.$refs[formName].validate((valid) => {
          		if (valid) {
			  		util._click(this,submit)
			  		function submit(str){
				  		var add = {
				  			name:str.addUser.name,
				  			passwd:str.addUser.pwd,
				  			// is_all:str.value
				  		}
				  		operatorAdd(add).then(function(response){
				  			console.log(response)
				  			if(response.code == "200"){
				  				if(response.msg != '没有权限'){
									str.$emit('newUser',response.data[0]);
					  				msgTipsSuccess(str,'添加成功！');
									str.resetForm();
									str.dialogFormVisible = false;
								}else {
									msgTipsErr(str,'您没有权限操作');
								}
				  			}else if(response.code == "100"){
				  				msgTipsErr(str,'用户名已存在！');
				  			}else{
				  				msgTipsErr(str,'添加失败！');
				  			}
				  		})
			  		}
			  	}
			  })
	  	},
	  	resetForm() {
            this.$refs.addUser.resetFields();
        }
	
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang ="less">
	.adduser{
		position: fixed;
		width: 100%;
		height: 90%;
		top:55%;
		left:50%;
		right:0px;
		bottom:0px;
		transform: translate(-50%,-50%);
		background-color: rgba(0,0,0,0.3);
		z-index: 10000;

		.adduser-content{
			background-color: #fff;
			position: absolute;
			width: 300px;
			height: 367px;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			/*padding:10px 20px;*/
			border-radius: 10px;
			.title{
				border-bottom:1px solid #ccc;
				padding:5px 20px;
				font-size: 14px;
				height: 30px;
				line-height: 30px;
				h3{
					float: left;
				}
				span{
					font-size: 20px;
					float: right;
					cursor: pointer;
				}
			}
			.adduser-danan{
				margin-bottom: 10px;
			}
			.adduser-info{
				height: 60%;
				margin-top: -13px;
				padding:20px 20px 20px 20px;
				border-bottom: 1px solid #ccc;
			}
			.dialog-footer{
				float: right;
				margin:15px 20px;

			}
		}
		.el-row{
			margin-top: -2px;
			margin-left:5px;
		}
		.el-dialog{
			width: 400px;
			height: 400px;
		}

	}
</style>
