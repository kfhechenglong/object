<template>
<div>
 	<div class="add">
 		<div class="my-d-h">
 			<el-dialog  @close="resetForm('addForm')"  v-model="addshow" :close-on-click-modal="false">
	 			<h3 class="add-title"></h3>
				<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
					<el-form-item class="add-n-c" label="班级：" prop="class">
						<el-input @focus ="checkClass"  readonly="readonly" v-model="addForm.class_name" placeholder="请选择班级！"></el-input>
					</el-form-item>
					<el-form-item class="add-n-c" label="姓名：" prop="user_name">
						<el-input v-model.trim="addForm.user_name" auto-complete="off" placeholder="请输入姓名！"></el-input>
					</el-form-item>
					<el-form-item label="性别：" prop="gender">
						<el-radio-group v-model="addForm.gender">
							<el-radio class="radio" label='男'>男</el-radio>
							<el-radio class="radio" label='女'>女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="生日：" prop="birth">
						<el-date-picker type="date" placeholder="请选择生日！" v-model="addForm.birth" :picker-options="pickerOptions"></el-date-picker>
					</el-form-item>
					<el-form-item class="eq-sb" label="左耳设备：" prop="shebeil">
						<el-input @focus ="_check_product($event,'left')"  readonly="readonly" v-model="eq_left_string" placeholder="请选择助听设备！"></el-input>
		                佩戴时间
		                <el-date-picker
					      v-model="addForm.eq_timel"
					      type="date"
					      format="yyyy-MM-dd"
					      placeholder="选择日期"
					      @change="eq_timelTime"
							:picker-options="pickerOptions"
					      >
					    </el-date-picker>
	              	</el-form-item>
		              <el-form-item class="eq-sb" label="右耳设备：" prop="shebeir">
						<el-input @focus ="_check_product($event,'right')"  readonly="readonly" v-model="eq_right_string" placeholder="请选择助听设备！"></el-input>
		                佩戴时间
		                <el-date-picker
					      v-model="addForm.eq_timer"
					      type="date"
					      format="yyyy-MM-dd"
					      placeholder="选择日期"
					      @change="eq_timerTime"
						 :picker-options="pickerOptions"
					      >
					    </el-date-picker>
	              	</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>
			<addclass ref="addClass" @newClassName="classNameAdd"></addclass>
 		</div>
 	</div>
	<!-- 选择助听设备 -->
	<ele-product ref="product" @productData = "productData" ></ele-product>
</div>
</template>
<script>
// 导入日期转换js
import util from '../../../../common/util'
// 导入年龄转换js
import Addclass from '../../commonvue/add-class.vue'
import Product from '../../commonvue/product.vue'
import {addStudentInfo} from'../../../../api/api'
import{mapState} from'vuex'
export default {
	components:{
		Addclass,
		'ele-product':Product
	},
 	data(){
 		var checkClass = (rule, value, callback) => {
	        if (!this.addForm.class_name) {
	          return callback(new Error('请选择班级'));
	        }else{
	        	callback();
	        }
	    };
	    // var checkEq_r = (rule, value, callback) => {
	    //     if (!this.addForm.selectR || !this.addForm.eq_right) {
	    //       return callback(new Error('请选择右耳助听设备'));
	    //     }else{
	    //     	callback();
	    //     }
	    // };
	    // var checkEq_l = (rule, value, callback) => {
	    //     if (!this.addForm.selectL || !this.addForm.eq_left) {
	    //       return callback(new Error('请选择左耳助听设备'));
	    //     }else{
	    //     	callback();
	    //     }
	    // };
 		return {
 			addshow: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				class: [
                    {required: true,validator: checkClass, trigger: 'change' },
                ],
                user_name: [
                    {required: true, message: '请输入姓名！', trigger: 'blur' },
                    { pattern:/^[A-Za-z\u4e00-\u9fa5]+$/, message: '用姓名只能为字母或汉字！'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符！', trigger: 'blur'}
                ],
				gender: [
					{required: true, message: '请选择性别', trigger: 'blur' },
				],
				birth: [
					{required: true, message: '请选择生日' }
				],
				// shebeil:[{required: true,validator: checkEq_l,trigger: 'change' }],
				// shebeir:[{required: true,validator: checkEq_r,trigger: 'change' }],
				// eq_timer:[{required: true, message: '请选择右耳助听设备佩戴时间'}],
				// eq_timel:[{required: true, message: '请选择左耳助听设备佩戴时间'}]
			},
			//新增界面数据
			addForm: {
				user_name: '',
				gender: '男',
				class_name:'' ,
				birth: '',
				class_id:'',
				eq_timel:'',
				eq_timer:'',
				eq_right:[],
				eq_left:[]
			},
			eq_right_string:"",
			eq_left_string:"",
			pickerOptions: {
	          	disabledDate(time) {
	            	return time.getTime() >= Date.now() - 8.64e7 + 24*60*60*1000;
	          	}
	        },
			// selectedOptionsLeft: [],
		    // selectedOptionsRight: [],
 		}
 	},
 	computed:{
 		// 获取产品列表
 		...mapState(['product']),
 	},
 	methods:{
      	// 获取设备的名称
		productData(e){
			const arr = e.map((item) =>{
				return item.value;
			});
			const string = e.map((item) =>{
				return item.label
			}).toString().replace(/,/g,' / ');
			if(this.earSide === 'left'){
				this.eq_left_string = string;
				this.addForm.eq_left = arr;
			}else if(this.earSide === 'right'){
				this.eq_right_string = string;
				this.addForm.eq_right = arr;
			}
		},
		// 选择设备
		_check_product(e,str){
			this.earSide = str;
			this.$refs.product.dialogProductVisible = true;
		},
 		eq_timerTime (evt){
			this.addForm.eq_timer = evt;
		},
		eq_timelTime(evt){
			this.addForm.eq_timel= evt;
		},
 		showTable(){
 			this.addshow = true;
 		},
 		classNameAdd(item){
 			this.addForm.class_name = item.class_name;
 			this.addForm.class_id = item.class_id;
 		},
 		//关闭添加学生模块时，重置内容
        resetForm(formName) {
        	this.eq_right_string = "";
			this.eq_left_string = "";
        	this.addForm.class_name = "";
            this.$refs[formName].resetFields();
            this.$emit('showStudylist',true);
        },
        // 点击选择班级
        checkClass(){
        	this.$refs.addClass.show();
        },
 		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					//对象拷贝,格式转换
					let para = Object.assign({}, this.addForm);
					// 转换年龄日期格式
					para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
					JSON.stringify(para);
					// 发送请求
					addStudentInfo(para).then((res) => {
						if(res.data.code == 200){
							let data = res.data.data;
							// 给父组件传递数据
							this.$emit('newStudent',data);
							msgTipsSuccess(this,'提交成功');
							this.addshow = false;
						}else{
							msgTipsErr(this,"学生添加失败！")
						}
					}).catch((err) =>{
						alert(err)
					});
				}
			});
		},
		
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
	.add>div{
		.add-title{
            position: absolute;
            left:30px;
            top:-90px;
            width:300px;
            height:90px;
            background: url(../../../../../static/images/new-title.png) no-repeat 0 -3px ;
        }
        .eq-sb{
    		.el-input{width: 235px;}
    	}
    	.add-n-c .el-form-item__content{width: 250px;}
		.el-dialog--small{
			width: 730px;
			height: 480px;
			.el-dialog__header{
				/*padding:0px 20px 0px 20px;*/
				line-height: 40px;
				/*background-color: #f8f8f8;*/
				border-bottom:1px solid #ccc;
			}
			.el-dialog__body{
				margin: 50px 30px 0px 20px;
				position: relative;
				padding: 0;
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
