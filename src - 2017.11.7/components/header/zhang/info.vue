<template>
	<div class="info">
		<el-dialog title="个人信息" v-model="dialogFormVisible">
		  <el-form ref="info_form" :model="operatorInfo" :rules="rules">
		    <el-row>
			  	<i class="fa fa-male"></i>姓名:
			</el-row>
			<el-row>
				<!-- <el-form-item  prop="name"> -->
			  		<el-input v-model="operatorInfo.name" :disabled="true" placeholder="张" ></el-input>
		    	<!-- </el-form-item> -->
		    </el-row>
		    <el-row>
			  	<i class="glyphicon glyphicon-phone"></i>手机:
			</el-row>
			<el-row>
				<el-form-item  prop="phone">
				  	<el-input v-model="operatorInfo.phone" ></el-input>
			  	</el-form-item>
		    </el-row>
		    <el-row>
			  	<i class="fa fa-qq"></i>QQ:
			</el-row>
			<el-row>
				<el-form-item  prop="qq">
				  	<el-input v-model="operatorInfo.qq" placeholder="47125452"></el-input>
			  	</el-form-item>
		    </el-row>
		    <el-row>
			  	<i class="fa fa-wechat"></i>微信:
			</el-row>
			<el-row>
				<el-form-item  prop="wx">
			  		<el-input v-model="operatorInfo.wx" placeholder="245215253"></el-input>
			  	</el-form-item>
		    </el-row>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>

</template>

<script>
export default {
  data() {
  	var validatePass = (rule, value, callback) => {
  		var reg = /^1[3578]\d{9}$/;
        if (!reg.test(value)) {
        	console.log(22)
          callback(new Error('请合法的手机号'));
        }else{
        	callback();
        }
      };
  	return {
  		dialogFormVisible: false,
        formLabelWidth: '120px',
        operatorInfo:{},
        rules:{
        	phone: [
                  { message: '请输入手机号', trigger: 'blur' },
                  { validator: validatePass, trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在11位手机号'}
                  
              ],
            qq: [
                  {  message: '请输入用QQ', trigger: 'blur' },
                  { pattern:/^[1-9][0-9]+$/, message: '请合法的QQ号'},
                  { min: 3, max: 20, message: '长度在 3 到 25 个字符'}
              ],
            wx: [
                  {  message: '请输入用微信号', trigger: 'blur' },
                  { min: 1, max: 20, message: '长度在 1 到 25 个字符'}
              ]
        }
  	}
  },
  props:{
  	user_name:null
  },
  methods : {
  	showTable(){
  		 var that = this,
            operator = {operator_id:this.user_name};
        this.$ajax.post('/operator/personal',operator).then(function(response){
            if(response.code == 200){
                that.operatorInfo = response.data;
                that.dialogFormVisible = true;
            }
        }).catch(function(error) {
            console.log(error)
        })
  	},
  	submit(){
  		let _this = this;
  		let operatorInfo = this.operatorInfo;
  		let data = {
  			operator_id:this.user_name,
  			...operatorInfo
  		}
  		this.$refs.info_form.validate((valid) => {
          	if (valid) {
          		_this.$ajax.post('/operator/update',data).then((res)=>{
          			if(res.code === 200){
          				_this.dialogFormVisible = false;
          			}else{
          				alert('修改失败！')
          			}
          		}).catch((err)=>{
          			alert(err+"修改信息出错！")
          		})
            }else{
            	console.log("验证不通过！")
            }
        });
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
	.info{
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
		.el-row{
			margin-top: 6px;
			margin-left:5px;
		}
		.el-dialog{
			width: 400px;
		}
	}
	
</style>
