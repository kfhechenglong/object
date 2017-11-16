<template>
	<div class="jigou">
		<div>
			<el-dialog title="机构设置" v-model="dialogTableVisible" @close="resetForm('formJigou')">
				<el-form :label-position="labelPosition" label-width="80px" :model="formJigou" ref="formJigou" :rules="rulesJigou">
				  	<el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-bank"></i>机构全称 :
					  	</el-col>
					  	<el-col :span="18">
					  		<el-form-item  prop="name">
					  			<el-input v-model="formJigou.name" placeholder="北京听力协会">{{formJigou.name}}</el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
					<el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-home"></i>机构简称 :
					  	</el-col>
					  	<el-col :span="18">
					  		<el-form-item  prop="full_name">
					  			<el-input v-model="formJigou.full_name" placeholder="听力协会"></el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
				    <el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-map-marker"></i>地址 :
					  	</el-col>
					  	<el-col :span="18">
					  		<el-form-item  prop="address">
					  			<el-input v-model="formJigou.address" placeholder="北京西城区"></el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
				    <el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-phone"></i>电话 :
					  	</el-col>
					  	<el-col :span="7">
					  		<el-form-item  prop="phone">
					  			<el-input v-model="formJigou.phone" placeholder="12123"></el-input>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="4">
					  		<i class="glyphicon glyphicon-phone"></i>手机 :
					  	</el-col>
					  	<el-col :span="7">
					  		<el-form-item  prop="cellphone">
					  			<el-input v-model="formJigou.cellphone" placeholder="123456789"></el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
				    <el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-qq"></i>QQ :
					  	</el-col>
					  	<el-col :span="7">
					  		<el-form-item  prop="qq">
					  			<el-input v-model="formJigou.qq" placeholder="12123"></el-input>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="4">
					  		<i class="fa fa-wechat"></i>微信 :
					  	</el-col>
					  	<el-col :span="7">
					  		<el-form-item  prop="wechat">
					  			<el-input v-model="formJigou.wx" placeholder="123456789"></el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
				    <el-row type="flex" :gutter="5" align="middle">
					  	<el-col :span="6">
					  		<i class="fa fa-envelope"></i>Email :
					  	</el-col>
					  	<el-col :span="7">
					  		<el-form-item  prop="email">
					  			<el-input v-model="formJigou.email" placeholder="12123@qq.com"></el-input>
					  		</el-form-item>
					  	</el-col>
					  	<el-col :span="4">
					  		<i class="fa fa-globe"></i>网址 :
					  	</el-col>
					  	<el-col :span="7">
						  	<el-form-item prop="website">
						  		<el-input v-model="formJigou.website" placeholder="http://www."></el-input>
					  		</el-form-item>
					  	</el-col>
				    </el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
				    <el-button type="primary" @click.native="submitJigouForm('formJigou')">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import {jgshow,jgupdate} from '../../../api/api'
export default {
  	data() {
  		var validatePass = (rule, value, callback) => {
	  		var reg = /^1[3578]\d{9}$/;
	        if (!reg.test(value)) {
	          callback(new Error('请合法的手机号'));
	        }else{
	        	callback();
	        }
	    };
	    var validatePhone = (rule, value, callback) => {
	  		var reg = /^0\d{2}-\d{8}$|^0\d{3}-\d{7}$/;
	        if (!reg.test(value)) {
	          callback(new Error('请合法的座机号，区号后加 —'));
	        }else{
	        	callback();
	        }
	    };
      	return {
      		uploadData:{"logo":''},
      		port:port,
	       	labelPosition: 'right',
	       	web_url:web_url,
	        data:{
	        	logo:''
	        },
	        formJigou: {
	        },
	        src:'',
	        imageUrl: '',
	        dialogTableVisible: false,
	        rulesJigou:{
	        	name: [
	                { min: 1, max: 50, message: '长度在 1 到 50 个字符',trigger: 'blur'}
	            ],
	            full_name: [
	                { min: 1, max: 20, message: '长度在 1 到 20 个字符',trigger: 'blur'}
	            ],
	        	phone: [
	                { message: '请输入座机号', trigger: 'blur' },
	                // { validator: validatePhone, trigger: 'blur' },
	                { pattern:/^0\d{2}-\d{8}$|^0\d{3}-\d{7}$/, message: '请合法的座机号，区号后加 —',trigger: 'blur'},
	                { min: 10, max: 12, message: '长度不大于12位的座机号', trigger: 'blur'}
	              ],
	             cellphone: [
	                  { message: '请输入手机号', trigger: 'blur' },
	                  // { validator: validatePass, trigger: 'blur' },
	                  { pattern:/^1[3578]\d{9}$/, message: '请合法的手机号',trigger: 'blur'},
	                  { min: 11, max: 11, message: '长度在11位的手机号', trigger: 'blur'}
	              ],
	            qq: [
	                  {  message: '请输入用QQ', trigger: 'blur' },
	                  { pattern:/^[1-9][0-9]+$/, message: '请合法的QQ号'},
	                  { min: 3, max: 12, message: '长度在 3 到 12 个字符'}
	              ],
	            wechat: [
	                  {  message: '请输入用微信号', trigger: 'blur' },
	                  { min: 1, max: 20, message: '长度在 1 到 20 个字符'}
	              ],
	            email:[
	            	{ pattern:/^\w+@\w{2,5}(\.[a-z]+){1,2}$/i, message: '请合法的Email', trigger: 'blur'}
	            ],
	            website:[
	            	{ pattern:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, message: '网址需以http://开头', trigger: 'blur'},
	            	{ min: 5, max: 50, message: '长度在 1 到 50 个字符',trigger: 'blur'}
	            ]
	        }
	    }
	},
	mounted (){
	},
	methods:{
		jigouInfo(){
			var that = this,
				institution = {institution:sessionStorage.getItem('user')}
			this.$ajax.post(`/operator/jgshow`,institution).then(function(response){
				if(response.code === 200) {
					that.formJigou = response.data;
				} else{
					that.msgTipsSuccess(this,'信息获取出现错误！')
				}
			}).catch((err)=>{
				alert(err)
			})
		},
		upLoad(){
			// 图片上传功能
			this.$refs.upload.show()
		},
		showTable:function (){
		// 显示表单信息
			this.dialogTableVisible = true
		},
	    resetForm(formName) {
            this.$refs[formName].resetFields();
        },
		submitJigouForm(str){
			console.log(this.formJigou)
			var that = this
			this.$refs[str].validate((valid) => {
	          if (valid) {
	          	this.$ajax.post(`/operator/jgupdate`,this.formJigou).then(function(response){
	          		console.log(response);
	          		if(response.code == 200) {
						that.formJigou = response.data;
						that.dialogTableVisible = false;
						msgTipsSuccess(that,'信息更改成功！')
					} else{
						msgTipsErr(that,'信息获取错误！')
					}
	          	}).catch(function(error){
	          		console.log(error)
	          		alert(error);
	          	})
	          } else {
	            alert('有不合法信息!');
	            return false;
	          }
        	});
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
	.jigou{
		.el-dialog__body{
			padding:10px 45px;
		}
		/*标题样式*/
		.el-dialog__header{
			padding:0px 20px 0px 20px;
			/* padding-left:20px;*/
			line-height: 40px;
			background-color: #f8f8f8;
			border-bottom:1px solid #ccc;
		}
		.el-form-item{
			margin: 0px;
		}
		.el-form-item__content{margin:0px !important;}
		/*input框label样式自定义*/
		.el-col-6,.el-col-4{
			text-align: right;
			padding-right: 20px!important;
			font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
			font-weight: 700;
			font-size: 14px;
			color:#333;
		}
		/*input框间距*/
		.el-row--flex.is-align-middle{
			margin:20px 0px;
		}
		/*按钮样式自定义*/
		.dialog-footer{
			padding-right:23px;
			padding-bottom: 10px;
		}
	}
	.v-modal{
		z-index: 2000!important;
	}
</style>
