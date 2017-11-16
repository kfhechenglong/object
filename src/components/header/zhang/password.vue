<template>
	<div class="password">
		<el-dialog title="修改密码" v-model="dialogFormVisible"  @close="resetForm('formPass')">
		  <el-form :model="formPass" :rules="passRules" ref="formPass" class="demo-ruleForm">
			<el-row>
				<el-form-item label="原始密码:" prop="yspassword">
			  		<el-input type="password" v-model="formPass.yspassword"></el-input>
			  	</el-form-item>
		    </el-row>
			<el-row v-bind:class="{'errorClass':passShow}">
				<el-form-item label="修改密码" prop="password">
			  		<el-input type="password" v-model="formPass.password" auto-complete="off"></el-input>
			  	</el-form-item>
			  	
		    </el-row>
			<el-row v-bind:class="{'errorClass':checkShow}">
				<el-form-item label="确认密码" prop="checkPass">
			  	<el-input type="password" v-model="formPass.checkPass" auto-complete="off"></el-input>
			  	</el-form-item>
		    </el-row>   
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="submitForm('formPass')">确 定</el-button>
		  </div>
		</el-dialog>
		
	</div>
  
</template>
<script>
import {uppwd,showStudentInfo} from '../../../api/api'
export default {
  data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
        	this.checkShow = true;
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formPass.password) {
          callback(new Error('两次输入密码不一致!'));
          // this.checkPass = true;
          // this.checkShow = false;
        } else {
	        // this.checkShow = false;
	        callback();
        }
      };
  	return {
  		dialogFormVisible: false,
        formPass: {
          yspassword: '',
          password:'',
          checkPass : ''
        },
        formLabelWidth: '120px',
        // 表单验证规则
        passRules:{
        	yspassword:[
        		{required: true,message: '请输入原始密码',  trigger: 'blur'},
        		{ min: 6, max: 30, message: '长度在 6 到 30 个字符'},
        		{ pattern:/^[a-zA-Z0-9_\.]+$/, message: '密码只能由字母、数字和下划线'}
        	],
        	password :[
        		{required: true,message: '请输入密码',  trigger: 'blur'},
        		{ min: 6, max: 30, message: '长度在 6 到 30 个字符'},
        		{ pattern:/^[a-zA-Z0-9_\.]+$/, message: '密码只能由字母、数字和下划线'}
        	],
        	checkPass: [
	            {required: true, validator: validatePass2, trigger: 'blur' },
	            { min: 6, max: 30, message: '长度在 6 到 30 个字符'}
	        ]
        },
        checkShow : false,
        passShow : false
        // checkPass:false
  	};
  },
  props:{
  	pwd:null
  },
  methods : {
  	showTable(){
  		this.dialogFormVisible = true;
  	},
  	//关闭添加学生模块时，重置内容
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  	// 重设密码验证
  	submitForm(formName) {
  		// console.log(this.$refs[formName]);
  		var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var updata = {
	        	operator_id : this.pwd,
	        	yspassword : this.formPass.yspassword,
	        	password : this.formPass.password
	        };
			uppwd(updata).then(function(response){
		        	console.log(response);
		        	if(response.msg == "修改成功"){
		        		msgTipsSuccess(that,'密码修改成功,请重新登录!');
		        		setTimeout(()=>{
		        			that.$router.push('/login');
		        		},1500);
		        	}else{
		        		msgTipsErr(that,'密码修改失败!');
		        	}
		        }).catch(function(error){
		            console.log(error);
		        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      }
  	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
	.password{
		.el-dialog__body{
			padding:10px 20px;
		}
		.el-dialog__header{
			padding:0px 20px 0px 20px;
			// padding-left:20px;
			line-height: 40px;
			background-color: #f8f8f8;
			border-bottom:1px solid #ccc;
		}
		.el-form-item{
			margin: 0px;
		}
		/*.el-row{
			margin-top: 6px;
			margin-left:5px;
		}*/
		.el-dialog{
			width: 400px;
			height: 400px;
		}
		.el-dialog__footer{
			padding:0px 20px 0px;
		}
		.el-form-item__content{
			margin-bottom: 15px;
		}
		/*密码提示框*/
		/*.el-form-item__error{
			top: 80px;
    		left: 7px;
		}*/
		/*.errorClass{
			.el-input__inner{
				border:1px solid red;
			}
			.tips{
				color:red;
			}
		}*/
	}
</style>
