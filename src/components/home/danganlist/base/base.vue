<template>
	<div class="base" v-bind:class="[!showNew? 'infoBase': '']">
		<div  v-loading.body="loading">
			<form action="">
				<el-row>
					<div class="base-top">
						<el-col :span="7">
							<div class="studyBase">
								<img v-if="study.gender == '男' "  :src="imgSrc" :onerror="errorImgBody">
								<img v-else :src="imgSrc" :onerror="errorImgGirl">
								<div class="studyBase-middle clearfix">
									<div v-if="user_name_length &&user_name_length.length > 4" >
										<el-tooltip class="item" effect="dark" :content="study.user_name" placement="right">
										 	<div class="name" :class="{update : !showNew}"v-text="study.user_name"></div>
										 </el-tooltip>
									</div>
									 <div v-else class="name" :class="{update : !showNew}"v-text="study.user_name"></div>
									<div class="upLoad" v-show="showNew" @click="upLoad">
										上传照片
									</div>
								</div>
								<p v-if="svgData.updatetime" @click="showSvg">{{svgData.updatetime}} 助听听阈<br>左耳：<span v-if="svgData.LHTL === '—' ||svgData.LHTL === ''">—</span><span v-else>{{svgData.LHTL}}db</span>，右耳：<span v-if="svgData.RHTL === '—' ||svgData.RHTL === ''">—</span><span v-else>{{svgData.RHTL}}db</span></p>
								<p v-else>暂无助听记录！</p>
								<ul class="studyBase-bottom clearfix">
									<li class="wszl" v-if="!showNew" @click="toUpdate">
										<i class="el-icon-edit"></i>完善资料
									</li>
									<li class="bc clearfix" v-if="showNew">
										<div @click="toSave">保存</div>
										<div @click="toEsc">取消</div>
									</li>
									<li  class="wszl dele" @click="deleStudentInfo">
										<i class="el-icon-delete"></i>删除档案
									</li>
									<li  class="wszl print" @click="_checked($event,0)">
										<i class="fa fa-print"></i>打印档案
									</li>
								</ul>
							</div>
						</el-col>
						<el-col :span="17">
							<el-row>
								<el-col :span="12">
								  	<div class="">
								  		<dl>
								  			<dt>姓名：</dt>
								  			<dd>
								  				<span v-if="!showNew" v-text="study.user_name"></span>
								  				<input type="text" v-model="studyUpdata.user_name" v-if="showNew" >
								  			</dd>
								  			<div class="clearfix">
									  			<dt>性别：</dt>
									  			<dd class="sex">
									  				<span v-if="!showNew">{{study.gender}}</span>
									  				<input id="man" type="radio" v-model="studyUpdata.gender" v-if="showNew"value="男" name="gender" >
									  				<label for="man"  v-if="showNew">男</label>
									  				<input id="women" type="radio" v-model="studyUpdata.gender" v-if="showNew"value="女" name="gender" >
									  				<label for="women"  v-if="showNew">女</label>
									  			</dd>
								  			</div>
								  			<dt>年龄：</dt>
								  			<dd>
								  				<span v-if="!showNew" v-text="study.age"></span>
								  				<input type="text"v-if="showNew" v-model="studyUpdata.age" readonly="readonly">
								  			</dd>
								  			<dt>出生年月：</dt>
								  			<dd>
								  				<span v-if="!showNew" v-text="study.birth"></span>
								  				<div v-if="showNew">
													<el-date-picker
												      v-model="studyUpdata.birth"
												      type="date"
												      format="yyyy-MM-dd"
												      placeholder="出生年月"
												      @change="birth"
												      :picker-options="pickerOptions0"
												      :clearable="false"
												      >
												    </el-date-picker>
												</div>
								  			</dd>
								  			<dt>籍贯：</dt>
								  			<dd>
								  				<span v-if="!showNew"v-text="study.native_place"></span>
								  				<input v-if="showNew" type="text" v-model="studyUpdata.native_place">
								  			</dd>
								  			<dt>现居地址：</dt>

								  			<dd class="address-warp" style="min-height:50px;">
								  				<span v-if="!showNew">{{study.province}}{{study.city === "市辖区" ?'' : study.city}}{{study.area}}{{study.address}}</span>
								  				<div v-if="showNew" style="margin-left:45px;">
								  					<el-input @focus ="_check_area($event,'area')" v-model="optionArea" placeholder="请选择省市区县！" readonly="readonly"></el-input>
								  					<input id="b-address" placeholder="请输入详细地址！" type="text" v-model="studyUpdata.address">
								  				</div>
								  			</dd>
								  		</dl>
								  	</div>
								</el-col>
								<el-col :span="12">
									<div class="">
										<dl v-if="!showNew">
								  			<dt>监护人：</dt>
								  			<dd>
								  				<span v-text="study.guardian"></span>
								  			</dd>
								  			<dt>关系：</dt>
								  			<dd>
								  				<span v-text="study.relation"></span>
								  			</dd>
								  			<dt>手机：</dt>
								  			<dd>
								  				<span v-text="study.phone"></span>
								  			</dd>
								  			<dt>微信：</dt>
								  			<dd>
								  				<span v-text="study.wx"></span>
								  			</dd>
								  			<dt>QQ：</dt>
								  			<dd>
								  				<span v-text="study.qq"></span>
								  			</dd>
								  		</dl>
								  		<el-form class="base-form" v-else :model="studyUpdata" ref="form" :rules="rules">
								  			<div class="clearfix">
									  			<dt>监护人：</dt>
									  			<el-form-item prop="guardian">
									  				<el-input type="text" v-model="studyUpdata.guardian"></el-input>
									  			</el-form-item>
								  			</div>
								  			<div class="clearfix">
									  			<dt>关系：</dt>
									  			<el-form-item prop="relation">
									  				<el-input type="text" v-model="studyUpdata.relation"></el-input>
									  			</el-form-item>
								  			</div>
								  			<div class="clearfix">
									  			<dt>手机：</dt>
									  			<el-form-item prop="phone">
									  				<el-input type="text" v-model="studyUpdata.phone"></el-input>
									  			</el-form-item>
								  			</div>
								  			<div class="clearfix">
									  			<dt>微信：</dt>
									  			<el-form-item prop="wx">
									  				<el-input type="text" v-model="studyUpdata.wx"></el-input>
									  			</el-form-item>
								  			</div>
								  			<div class="clearfix">
									  			<dt>QQ：</dt>
									  			<el-form-item prop="qq">
									  				<el-input type="text" v-model="studyUpdata.qq"></el-input>
									  			</el-form-item>
								  			</div>
								  		</el-form>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<div>
										<dl>
											<dt>耳聋性质：</dt>
											<dd>
												<span v-if="!showNew">{{study.deaf_nature}}</span>
												<div v-if="showNew" class="check-class">
													<el-input @focus ="_checked($event,3)"  readonly="readonly" v-model="studyUpdata.deaf_nature" placeholder="请选择耳聋性质！"></el-input>
												</div>
											</dd>
											<dt>耳聋程度：</dt>
											<dd>
												<span v-if="!showNew">{{study.deaf_degree}}</span>
												<div v-if="showNew" class="check-class">
												<el-input @focus ="_checked($event,2)"  readonly="readonly" v-model="studyUpdata.deaf_degree" placeholder="请选择耳聋程度！"></el-input>
												</div>

											</dd>
										</dl>
									</div>
								</el-col>
								<el-col :span="12" class="textarea">
									<div>
										<el-input
										  type="textarea"
										  :rows="2"
										  placeholder="个人备注："
										  :disabled="!showNew"
										  v-model="study.remark"  v-if="!showNew">
										</el-input>
										<el-input
										  type="textarea"
										  :rows="2"
										  placeholder="个人备注："
										  v-model="studyUpdata.remark"  v-if="showNew">
										</el-input>
									</div>
								</el-col>
							</el-row>
						</el-col>
					</div>
				</el-row>
				<el-row class="base-bottom">
					<el-col :span="17" :offset="7">
					<div class="base-bottom-main">
						<el-col :span="12">
							<div class="base-bottom-warp zuting">
							<el-row>
								<h3>助听器设备</h3>
							</el-row>
							<el-row v-if="!showNew">
								<dl  @click="_showProduct">
									<dt>
										左耳：
									</dt>
									<dd style="vertical-align:middle;display:table-cell;line-height:20px;">
										<span>{{study.eq_left.string}}</span>
									</dd>
									<dt  style="height:25px;line-height:25px;">佩戴时间：</dt>
							  			<dd  style="height:25px;line-height:25px;">
							  				<span>{{study.eq_timel}}</span>
							  			</dd>
									<dt>
										右耳：
									</dt>
									<dd style="vertical-align:middle; display:table-cell;line-height:20px;">
										<span>{{study.eq_right.string}}</span>
									</dd>
									<dt  style="height:25px;line-height:25px;">
										佩戴时间：
									</dt>
									<dd  style="height:25px;line-height:25px;">
										<span>{{study.eq_timer}}</span>
									</dd>
								</dl>
							</el-row>
							<el-row v-else>
								<dl>
									<dt>左耳：</dt>
									<dd>
										<div class="check-class">
										<el-input @focus ="_check_product($event,'left')" v-model="studyUpdata.eq_left.string" readonly="readonly" placeholder="请选择助听设备！"></el-input>
										</div>
									</dd>
									<dt>时间：</dt>
									<dd>
										<el-date-picker
								      v-model="studyUpdata.eq_timel"
								      type="date"
								      format="yyyy-MM-dd"
								      placeholder="选择日期"
								      @change="eq_timelTime"
								      :picker-options="pickerOptions0"
								      :clearable="false"
								      >
								    </el-date-picker>
									</dd>
									<dt>右耳：</dt>
									<dd>
										<div class="check-class">
										<el-input @focus ="_check_product($event,'right')" v-model="studyUpdata.eq_right.string" readonly="readonly" placeholder="请选择助听设备！"></el-input>
										</div>
									</dd>
									<dt>时间：</dt>
									<dd>
										<el-date-picker
									      v-model="studyUpdata.eq_timer"
									      type="date"
									      format="yyyy-MM-dd"
									      placeholder="选择日期"
									      @change="eq_timerTime"
									      :picker-options="pickerOptions0"
									      :clearable="false"
									      >
									    </el-date-picker>
									</dd>
				              	</dl>
							</el-row>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="base-bottom-warp">
							<el-row>
								<h3>入园信息</h3>
							</el-row>
							<el-row>
								<dl>
									<dt>
										入园时间：
									</dt>
									<dd>
										<span v-if="!showNew">{{study.garten_time}}</span>
										<div v-if="showNew">
											<el-date-picker
										      v-model="garten_time"
										      type="date"
										      format="yyyy-MM-dd"
										      placeholder="选择日期"
										      @change="gartentime"
										      :picker-options="pickerOptions0"
										      :clearable="false"
										      >
										    </el-date-picker>
										</div>
									</dd>
									<dt>在园状态：</dt>
							  			<dd>
							  				<span v-if="!showNew">{{study.sc_status === "1" ? "在校" :"离校"}}</span>
					                        <div v-else class="check-class">
											<input readonly="readonly" :value='studyUpdata.sc_status === "1" ? "在校" :"离校"'></input>
										</div>
							  			</dd>
									<dt>
										班级：
									</dt>
									<dd>
										<span v-if="!showNew">{{study.class_name}}</span>
										<div v-else class="check-class">
											<el-input @focus ="checkClass" readonly="readonly" v-model="studyUpdata.class_name" placeholder="请选择班级！"></el-input>
										</div>
									</dd>
									<dt>
										班主任：
									</dt>
									<dd>
										<span v-if="!showNew">{{study.teacher}}</span>
										<div v-else  class="check-class">
											<el-input @focus ="_checked($event,1)" readonly="readonly" v-model="studyUpdata.teacher" placeholder="请选择班主任！"></el-input>
										</div>
									</dd>
								</dl>
							</el-row>
							</div>
						</el-col>
					</div>
					</el-col>
				</el-row>
			</form>
		</div>
		<!-- 批量打印 start -->
	    <div class="print-a" v-if = "hiddenPrient">
	      	<div  style="width:100%;height:100%;position: fixed;right:0;bottom:0;left: 0px;top: 0px;z-index:2000;">
	        	<ele-print-all ref="printall" :type="type" :data="printAllData" @close="colsePrint" :ptintArray = "obj_to_arr" :imgSrc="imgSrc" :errorImgBody="errorImgBody" :errorImgGirl="errorImgGirl" :studydata="study"></ele-print-all>
	      	</div>
	      	<!-- 助听听阈下绘制听力图 -->
	      	<div style="width:750px;height:600px;position: absolute;left: 0px;top: 0px;z-index:-1;">
	      		<ele-tinglitu :objZong="canvasData" ref="tinglitu"></ele-tinglitu>
	      	</div>
	    </div>
	    <!-- 批量打印 end -->
	    <!-- 查看当前学生的助听听阈信息 -->
	    <div v-else>
	    	<ele-svg ref="svg" :objZong="svgDataLook"></ele-svg>
	    </div>
	    <!-- 新增班级 -->
		<ele-addclass ref="addClass" @newClassName="classNameAdd"></ele-addclass>
		<!-- 选择助听设备 -->
		<ele-product ref="product" :isProduct="isProduct" @productData = "productData" :initProductData="initProductData" @closeCheckArea="closeCheckArea"></ele-product>
		<!-- 选择项 -->
		<ele-optionmenu ref="print" :isAllPrint="false" @toggleNum = "toggle_num" @testType="_hadCheckData" :htmlValue="hasInputValue" :curtStatus="check_value" :teachers="teacher_list"></ele-optionmenu>
		<div v-if="showQQVisible">
			<ele-codeqq ref="code" :info="codeInfo" @close="_closeCodeQQ"></ele-codeqq>
		</div>
	</div>
</template>
<script>
const body = require('../../../../../static/images/body.png');
const girl = require('../../../../../static/images/girl.png');
import {mapState,mapMutations} from'vuex'
import print from '../../morehigh/print-all.vue'
import codeQQ from '../../commonvue/codeQQ/codeQQ.vue'
import optionMenu from '../../commonvue/option-menu.vue'
import Product from '../../commonvue/product.vue'
import Addclass from '../../commonvue/add-class.vue'
import svg from './svg.vue'
import tinglitu from'./../tingli/tinglitu.vue'
import {updataStudentInfo} from '../../../../api/api'
import util from '../../../../common/util.js'
import age from '../../../../common/age.js'
  export default {
	  	components : {
	    // 'ele-upload' : upLoad,
	    'ele-codeqq' : codeQQ,
	    'ele-addclass':Addclass,
	    'ele-optionmenu':optionMenu,
	    'ele-print-all':print,
	    'ele-svg':svg,
	    'ele-tinglitu':tinglitu,
	    'ele-product':Product
	  	},
  		data (){
  			return {
  				uploadData:{"user_id":""},
  				api:base+'/user/update',
  				port:port,
  				web_url:web_url,
  				study:{
  					eq_right:{
  						string:'',
  						array:[]
  					},
  					eq_left:{
  						string:'',
  						array:[]
  					},
  				},
  				studyUpdata:{
  					deaf_degree:'',
  					user_name:'',
  					age:'',
  					birth:'',
  					native_place:'',
  					guardian:'',
  					relation:'',
  					phone:'',
  					wx:'',
  					qq:'',
  					deaf_nature:'',
  					deaf_degree:'',
  					garten_time:'',
  					user_id:'',
  					teacher:'',
  					class_name:'',
  					class_id:'',
  					eq_left:{
  						array:[]
  					},
  					eq_timel:'',
  					eq_right:{
  						array:[]
  					},
  					eq_timer:'',
  					address:'',
  					province:'',
  					city:'',
  					area:''
  				},
  				optionArea:"",
  				thatData : {},
  				// 控制学员信息编辑
  				showNew : false,
  				// 下拉菜单选项
  				check_value:0,
  				focusNum:0,
  				hasInputValue:'',
		        // 班主任列表
		        teacher_list:[],
		        // 时间选择
		        pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() >= Date.now() - 8.64e7 + 24*60*60*1000;
		          }
		        },
		        classList:[],
		        // 获取的日期
		        eq_timel:'',
		        eq_timer:'',
		        garten_time:'',
		        user_name_length:null,
		        showQQVisible:false,
		        loading:true,
		        initProductData: {},
		        errorImgBody:'this.src="' + body + '"',
		        errorImgGirl:'this.src="' + girl + '"' ,
		        svgData:{},
		        // 打印的数据
		        printUsersData:[],
		        printUsersOtherData:[],
		        type:null,
		        printAllData:[],
		        printEveryData:[],
		        jieguo:null,
		        // 隐藏打印
		        hiddenPrient:false,
		        canvasData:[],
		        // 选择打印测试报告的个数
		        obj_to_arr:[],
		        isProduct:true,
		        rules:{
		        	guardian: [
		                { min: 2, max: 10, message: '长度在 2 到 10 个字符',trigger: 'blur'},
		                { pattern:/^[A-Za-z\u4e00-\u9fa5]+$/, message: '用姓名只能为字母或汉字！'},
		            ],
		            relation:[
		            	{ min: 2, max: 10, message: '长度在 2 到 10 个字符',trigger: 'blur'},
		                { pattern:/^[A-Za-z\u4e00-\u9fa5]+$/, message: '用关系只能为字母或汉字！'},
		            ],
		            phone: [
		                  { message: '请输入手机号', trigger: 'blur' },
		                  { pattern:/^1[3578]\d{9}$/, message: '请合法的手机号',trigger: 'blur'},
		                  { min: 11, max: 11, message: '长度在11位的手机号', trigger: 'blur'}
		            ],
		            qq: [
		                  {  message: '请输入用QQ', trigger: 'blur' },
		                  { pattern:/^[1-9][0-9]+$/, message: '请合法的QQ号'},
		                  { min: 3, max: 12, message: '长度在 3 到 12 个字符'}
		            ],
		            wx: [
		                  {  message: '请输入用微信号', trigger: 'blur' },
		                  { min: 2, max: 20, message: '长度在 2 到 20 个字符'}
		            ]
		        }
  			}
  		},
  		computed:{
  			codeInfo:function(){//生成二维码的信息
            return {'time':this.time,'type':null,'user_id':this.studyUpdata["user_id"],'file':"user",'id':null}
        	},
        	...mapState(['wepAppTime','product']),
        	imgSrc:function(){
        		if(!this.study.picture){
        			if(this.study.gender == "男"){
        				return body;
        			}else{
        				return girl;
        			}
	        	}else{
	        		return web_url+ this.study.picture +'?=' + Math.random();
	        	}
	        },
	        leftProduct:function(){
	        	return this.study.eq_left['string'];
	        },
	        svgDataLook:function(){
	        	const data = this.svgData.data ? JSON.parse(this.svgData.data) : false;
	        	if(data){
	        		return new Array(data);
	        	}
	        	return [];
	        }
  		},
  		watch:{
  			wepAppTime:function(){
	            if(this.wskt.up_loder(this) === 'redact'){
	                this._closeCodeQQ(false);
		            this.$ajax.post(`/user/info`,{"id":this.study.user_id}).then((response) =>{
		            	if(response.code ===200){
		            		this.study.picture = response.data.picture;
		            	}
		            }).catch((error)=>{
		                alert(error + '头像上传出错');
		            })
	            }
	        },
  		},
  		mounted(){
  			const that = this;
  			// 接收点击事件的学生信息
			Vm.$on('change',(test,svgData)=>{
				if(that.update){//如果是档案信息是编辑状态，切换学生信息，关闭编辑！
					that.showNew = false;
				}
				that.svgData = svgData;
				that.loading = false;
				that.study = test;
				that.uploadData["user_id"] = test.user_id;
				that.user_name_length = that.study.user_name;
			});
			Vm.$on('loading',(e)=>{that.loading = e;});
			// 获取班级
			this.$ajax.post('/class/showlist',null).then((res) =>{
				// console.log(res)
				if(res.code === 200){
					this.classList = res.data;
				}
			})
  		},
  		beforeRouteEnter (to, from, next) {
		    next(function(vm){
		    	let studyID = sessionStorage.getItem('user_id');
		    	vm.$ajax.post(`/user/info`,{"id":JSON.parse(studyID)}).then(function(response){
	                if(response.code === 200){
	                	vm.study = response.data;
		                vm.uploadData["user_id"] = response.data.user_id;
						vm.user_name_length = response.data.user_name;
						vm.getSvgData(response.data.user_id)
	                }
	            }).catch(function(error){
	                console.log(error);
	            });
		    })
		},
		created(){
			// this.getChanPin();
		},
  		methods : {
  			// 查看听力数据
  			showSvg(){
  				this.$refs.svg.show();
  			},
  			// 路由切换时，获取听力数据
  			getSvgData(str){
				const id = new Array(str);
	        	this.$ajax.post('/info/getaudiograms',{user_id:id,type_id:"6"}).then((res)=>{
	        		console.log(res)
					if(res.code === 200 && res.data.users){
						this.svgData = res.data.users[0];
						this.$store.commit('hasCanvasData',res.data.users[0]);
					}else{
						this.svgData = new Object;
						this.$store.commit('hasCanvasData',{});
					}
					this.loading = false;
				})
  			},
  			// 关闭打印预览，清空数据
  			colsePrint(e){
  				this.hiddenPrient = false;
  				this.printAllData = [];
  				this.printEveryData = [];
  				this.type = [];
  			},
  			_showProduct(){
  				this.$refs.product.dialogToggleVisible = true;
  			},
  			_hadCheckData(e){
  				console.log(e)
  				if(this.focusNum === 1){
  					this.studyUpdata.teacher = e.name;
  					return;
  				}else if(this.focusNum === 2){
  					this.studyUpdata.deaf_degree = e.name;
  					return;
  				}else if(this.focusNum === 3){
  					this.studyUpdata.deaf_nature = e.name;
  					return;
  				}else if(this.focusNum === 0){
  					this.printType(e);
  					return;
  				}
  			},
  			// 处理打印的数据
  			printType(e){
  				const typeId = new Array;
  				e.forEach((id)=>{
  					typeId.push(id.key)
  				})
  				const data = {
  					user_id:this.study.user_id,
  					type_id:typeId
  				};
  				if(typeId.length === 0){
  					this.obj_to_arr = [];//清空选择的测试报告
  					this.hiddenPrient = true;
  					return;
  				}
  				let doSome = (str) =>{
		            let errortype = str.errorType;
		            let successtype = str.successType;
		            if(errortype && Object.prototype.toString.call(errortype) === '[object Array]'){
		              const h = this.$createElement;
		              let string = "";
		              errortype.forEach((o)=>{
		                string += o;
		                string += " ";
		              });
		              if(typeof(successtype) === "undefined"){
		                this.$confirm("该学生暂无"+string+'测试数据！', '提示', {
		                  type: 'warning',
		                  message: h('p',null, [
		                    h('div', null, [
		                      h('span',null,'该学生暂无'),
		                      h('strong',{style:'color:red;overflow: hidden;word-wrap:break-word;'},string),
		                      h('span',null,'暂无可打印数据！'),
		                    ])]),
		                })
		              }else{
		                this.$confirm("该学生暂无"+string+'测试数据，是否继续打印其它测试数据？', '提示', {
		                  type: 'warning',
		                  message: h('p',null, [
		                    h('div', null, [
		                      h('span',null,'该学生暂无'),
		                      h('strong',{style:'color:red;overflow: hidden;word-wrap:break-word;'},string),
		                      h('span',null,'测试数据，是否继续打印其它测试数据？'),
		                    ])]),
		                }).then(()=>{//继续打印
		                  setTimeout(()=>{
		                    this.hiddenPrient = true;
		                    this.filterData(successtype)
		                  },50)
		                }).catch(()=>{
		                  console.log('取消')
		                })
		              }
		            }else if(successtype){
		              this.hiddenPrient = true;
		              this.filterData(successtype);
		            }
		        };
  				// 获取当前学生的打印各测试类型的打印信息
  				this.$ajax.post('/user/printbg',data).then((res)=> {
  					console.log(res);
  					if(res.code === 200){
  						doSome(res.data);
  					}
  				}).catch((err) =>{
  					console.log(err +'获取数据出错！')
  				});
  			},
  			filterData(data){
  				// 将对象转为数组
  				this.obj_to_arr = Object.keys(data).map(el =>{
								    return data[el];
								});
  				const getPrintDataArray = [];
  				const testTypeId = [];
  				const that = this;
  				// 清除vuex中的svgPrintImgs
	        	this.$store.commit('clearAllPrintImgs',null);
  				for(let key in data){
  				    if(data.hasOwnProperty(key)){
  					    Options.testType.forEach((item,index)=>{
		                if(item.key == key){
		                    // 可以打印的类型id
		                    testTypeId.push(item);
		                    if( key === "6"){// 助听听阈的数据
		                      	setSvgData(new Array(data[key])).then(()=>{
		                        	return drawSvg()
		                      	}).then(()=>{
		                        	return printDom(key,new Array(data[key]))
		                      	}).catch((err)=>{
		                        	console.log(err)
		                        })
		                    }else{
			                    // 添加空的svgPrintImgs
			                    this.$store.commit('setAllPrintImgs',1);
			                    this.$store.commit('setAllPrintImgs',1);
			                    printDom(key,new Array(data[key])).then((str) =>{
			                        if(key != "1"){// 获取音素测试类的处理数据
			                          return new Promise((resolve,reject) =>{
		                                    const get_tone_data = util.todotonedata(str);
		                                    resolve(get_tone_data)
		                                })
			                        }else{// 获取林氏六音的处理数据
			                          return new Promise((resolve,reject) =>{
		                                    const get_data = util.todoliudata(str);
		                                    resolve(get_data)
		                                })
			                        }
			                    }).then((str)=>{
			                        const obj = {
		                                  ...str,
		                                  'userText' : this.printUsersOtherData[0],
		                                  'userInfo' : this.study,
		                                  'jieguo': this.jieguo
		                                };
		                                // 生成数据，传递给子组件渲染
		                                this.printEveryData.push(obj)
			                        }).catch((err)=>{
			                        	console.log(err)
			                        })
			                    }
		                  	}
		                })
  				    }
  				}
  				// 最终传递给子组件的数据
  				this.printAllData = this.printEveryData;
  				this.type = testTypeId;
  				// 获取听力图的数据
	            function setSvgData (params){
	                return new Promise((resolve,reject) =>{
	                    that.canvasData = [];
	                    that.canvasData.push(JSON.parse(params[0].data));
	                    resolve();
	                })
	            }
	            // 绘制听力图，并将图片保存在vuex中
	            function drawSvg (){
	                return new Promise((resolve,reject) =>{
	                	setTimeout(()=>{
	                		that.$refs.tinglitu.drawyuan(true);
	                	},50)
	                    resolve();
	                })
	            }
  				function printDom(key,params){
	                return new Promise((resolve,reject) =>{
	                    setTimeout(()=>{
	                        that.printUsersOtherData = params;
	                        if(key !== "6" && params[0].accuracy){
	                        	const accuracy = params[0].accuracy;
	                        	if(Object.prototype.toString.call(accuracy) === '[object String]'){
			                    	that.jieguo = JSON.parse(accuracy)
			                    }else{
			                    	that.jieguo = accuracy;
			                    }
	                        }else if(key === "6"){
	                          // debugger
	                          const obj = {
	                            'userText' : that.printUsersOtherData[0],
	                            'userInfo' : that.study
	                          };
	                          that.printAllData.push(obj)
	                        }
	                        resolve(params);
	                        return params;
	                    },0)
	                })
	            }
  			},
  			...mapMutations(['hadStudyInfo']),
  			// 删除当前的学生
  			deleStudentInfo(){
  				console.log(this.study);
	            const str = this.study.user_name;
	            const ids = new Array(this.study.user_id);
	            this.$confirm('您是否要删除'+str+'？', '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'warning'
	            }).then(() => {
	                // 发送删除的数据
	                let data = {
	                    users:'delete',
	                    data: ids
	                };
	                // 发送删除请求
	                this.$ajax.post('/user/delete',data).then((response)=>{
	                    console.log(response);
	                    if(response.code === 200){
	                    	// 存储删除成功的学生信息
	                    	this.hadStudyInfo(ids);
	                        // 显示删除成功提示信息
	                        msgTipsSuccess(this,'您删除成功!');
	                    }
	                }).catch((error)=>{
	                    console.log(error);
	                    // 很不幸，删除失败
	                    msgTipsErr(this,'很不幸，删除失败!')
	                })
	            }).catch(() => {
	            });
  			},
  			province(evt){//选择省份
  				this.studyUpdata.province = evt.value;
  			},
  			city(evt){//选择市
  				this.studyUpdata.city = evt.value;
  			},
  			area(evt){//选择区县
  				this.studyUpdata.area = evt.value;
  			},
  			// 选择省市区县
  			_check_area(e,str){
  				this.earSide = str;
  				this.isProduct = false;
  				const arr = [];
  				if(this.study.province && this.study.city && this.study.area){
  					arr.push(this.study.province);
  					arr.push(this.study.city);
  					arr.push(this.study.area);
  				}else if(this.study.province && !this.study.city && this.study.area){
  					arr.push(this.study.province);
  					arr.push(this.study.area);
  				}
  				this.initProductData = {
  					'array':arr
  				};
  				this.$refs.product.dialogProductVisible = true;
  			},
  			// 关闭选择区县
  			closeCheckArea(e){
  				this.isProduct = e;
  			},
  			// 获取设备的名称
  			productData(e){
  				const string = e.map((item) =>{
  					return item.label
  				});
  				if(this.earSide === "area"){
  					console.log(string)
  					if(string.length > 2){
  						this.studyUpdata.province = string[0];
  						this.studyUpdata.city = string[1];
  						this.studyUpdata.area = string[2];
  					}else{
  						this.studyUpdata.province = string[0];
  						this.studyUpdata.city = null;
  						this.studyUpdata.area = string[1];
  					}
  					this.optionArea = string.toString().replace(/,/g,'');
  					this.studyUpdata.address = null;
  					// 自动获取详细地址的焦点！
  					const input = jq("#b-address");
  					input.focus()
  					return false;
  				}else{
  					const arr = e.map((item) =>{
	  					return item.value;
	  				});
	  				const inputValue = string.toString().replace(/,/g,' / ');
	  				console.log(string)
  					if(this.earSide === 'left'){
						this.studyUpdata.eq_left.string = inputValue;
						this.studyUpdata.eq_left.array = arr;
	  				}else if(this.earSide === 'right'){
	  					this.studyUpdata.eq_right.string = inputValue;
						this.studyUpdata.eq_right.array = arr;
	  				}
  				}
				
  			},
  			// 选择设备
  			_check_product(e,str){
  				this.isProduct = true;
  				let string = "",arr = [];
  				if(str === 'left'){
					string = this.studyUpdata.eq_left.string;
					arr = this.studyUpdata.eq_left.array;
  				}else if(str === 'right'){
  					string = this.studyUpdata.eq_right.string;
					arr = this.studyUpdata.eq_right.array;
  				}
  				this.initProductData = {
  					'string':string,
  					'array':arr
  				};
  				this.earSide = str;
  				this.$refs.product.dialogProductVisible = true;
  			},
  			// 点击选择班主任
  			_checked(e,num){
  				this.hasInputValue = typeof(e.target.value) ==='string' ? e.target.value.toString() : (e.target.innerText ? e.target.innerText : '');
  				this.check_value = num;
  				this.focusNum = num;
  				if(num === 0){
  					// 判断打印机是否正常
		            const next = ()=>{
		                this.$refs.print.dialogToggleVisible = true;
		            };
		            util.getPrint(this,next);
		            return;
  				}else{
  					this.$refs.print.dialogToggleVisible = true;
  				}
  			},
  			toggle_num(e){
  				this.check_value = 0;
  			},
  			// 点击选择班级
	        checkClass(){
	        	this.$refs.addClass.show();
	        },
	        classNameAdd(item){
	 			this.studyUpdata.class_name = item.class_name;
	 			this.studyUpdata.class_id = item.class_id;
	 		},
  			// 日期格式转换
  			gartentime (evt){
  				this.studyUpdata.garten_time = evt;
  			},
  			eq_timerTime (evt){
  				this.studyUpdata.eq_timer = evt;
  			},
  			eq_timelTime(evt){
  				this.studyUpdata.eq_timel= evt;
  			},
  			birth(evt){
  				// 出生日期
  				this.studyUpdata.birth = evt;
  				// 计算年龄
  				this.studyUpdata.age = age.age(evt);
  			},
  			upLoad(){
  				util.getterIpCode(this,next);
  				function next(pointer){
  					pointer.$store.commit('code_api','tx');
	  				pointer.showQQVisible = true;
	  				setTimeout(() =>{
	                	pointer.$refs.code.useqrcode();
	            	},50)
  				}
  			},
  			 _closeCodeQQ(e){//下载按钮，二维码关闭时的函数
	          this.showQQVisible = false;
	          // this.$store.commit('getter_code_time','');
	        },
  			// 点击保存
  			toSave(){
  				// 将修改完毕的数据发送到后台服务器
  				if(!this.studyUpdata.province){
  					msgTipsSuccess(this,'现居地址不完善！')
  					return;
  				}
  				this.$ajax.post(`/user/update`,this.studyUpdata).then((response)=>{
  					if(response.msg === '修改成功'){
  						console.log(response.data)
  						this.study = response.data;
  						msgTipsSuccess(this,'提交成功');
  						// 切换状态
  						this.showNew = !this.showNew;
  					}else{
  						msgTipsErr(this,'提交失败');
  					}
  				}).catch((error)=>{
	                console.log(error);
  				})
  			},
  			// 点击修改
  			toUpdate(){
  				this.update = true;
		        this.garten_time = this.study.garten_time;
  				// this.$refs.upload1.show()
  				this.studyUpdata = this.study;
  				// 点击修改完善资料时，将数据放到表格中
  				this.showNew = !this.showNew;
				this.time = parseInt(new Date().getTime());//时间戳
				this.$store.commit('getter_code_time',this.time);
				// 获取班主任
				util.getTeacher(this);
				this.optionArea = this.study.province + this.study.city + this.study.area;
		        this.studyUpdata.eq_left.array = this.study.eq_left.array;
		        this.studyUpdata.eq_right.array = this.study.eq_right.array;
  			},
  			// 点击取消
  			toEsc(){
  				this.update = false;
  				// 点击取消再次请求数据
  				const str = {"id":this.study.user_id};
	            this.$ajax.post(`/user/info`,str).then((response)=>{
	               	this.study = response.data;
	               	this.showNew = !this.showNew;
	            }).catch((error)=>{
	                console.log(error);
	            })

  			}
  		}
    }
</script>
<style lang ="less">
	.base{
    	dt{
			float: left;
			width: 80px;
			text-align: right;
			font-weight: 600;
			font-size: 14px;
    	}
    	.upLoad,.wszl{
    		cursor: pointer;
    	}
    	/*地址*/
    	.address-warp{
    	}
    	.address{
    		select{
    			width: 109px;
    			padding:0;
    			padding-left:5px;
    			border-radius: 0;
    			height: 35px;
    			margin-top:5px;
    			appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none;
    		}
    	}
    	.print-tone{
			border-bottom: 1px solid #ccc;
	    }
    	.studyBase{
    		position: relative;
    		img{
    			width: 100px;
    			height: 100px;
    			border-radius: 50%;
				position: relative;
				left:50%;
				transform: translate(-50%);
				top:30px;
    		}
    		.studyBase-middle{
    			width: 200px;
    			position: relative;
    			left:50%;
				transform: translate(-50%);
    			margin-top:50px;
    			height: 50px;
    			.name{
    				/*float: left;*/
    				position: absolute;
				    left: 50%;
				    transform: translate(-50%);
    				font-size: 26px;
    				font-weight: 100;
    				margin-left: -35px;
    				width: 150px;
    				text-align: center;
    				overflow: hidden; /*自动隐藏文字*/
		            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
		            white-space: nowrap;/*强制不换行*/
    			}
    			.update{
    				margin: 0px;
    			}
    			.upLoad{
    				position: absolute;
				    left: 50%;
				    transform: translate(50%);
    				/*float: left;*/
    				background-color: #5cb85c;
    				color:#fff;
    				width: 70px;
    				height: 30px;
    				line-height: 30px;
    				text-align: center;
    				border-radius: 5px;
    				/*margin-left: 20px;*/
    				margin-top: 3px;
    				font-weight: 200;
    				font-size: 14px;
    			}
    		}
    		p{
    			text-align: center;
    			border:1px solid #ccc;
    			margin: 0 auto;
			    width: 215px;
			    border-radius: 7px;
			    line-height: 30px;
			    color: #333;
			    cursor: pointer;
    		}
    		.studyBase-bottom{
    			position: absolute;
			    left: 50%;
			    margin-top: 30px;
			    transform: translate(-50%);
			    z-index:100;
			    .wszl{
			    	width: 90px;
			    	height: 35px;
			    	font-size: 16px;
			    	color:#fff;
			    	background-color: #1ab394;
			    	border-radius: 5px;
			    	line-height: 35px;
			    	text-align: center;
					/*float: left;*/
					margin-right: 5px;
					margin-top: 20px;
					padding:0 5px;
					i{margin:0 5px;}
			    }
			    .dele{
			    	background-color: #d9534f;
			    }
			    .bc{
			    	/*float: left;*/
			    	div{
			    		color:#fff;
			    		font-weight: 200;
			    		font-size: 16px;
			    		width: 65px;
			    		height: 35px;
			    		border-radius: 5px;
			    		line-height: 35px;
			    		text-align: center;
			    		float: left;
			    	}
			    	div:first-child{
						background-color:#1ab394;
						margin-right: 10px;cursor: pointer;
			    	}
			    	div:last-child{
			    		background-color: #d9534f;cursor: pointer;
			    	}
			    }
    		}
    	}
    	/*表单验证*/
    	.base-form{
    		.el-form-item{
    			float: left;
    			margin-bottom:9px;
    		}
			.el-form-item__error{
				padding-top: 0px;
			}
    	}
    	dl,.base-form{
			/*padding:10px;*/
			margin:0px;
			font-size: 14px;
			dt{
				margin: 10px 5px 0 0;
			}
			input{
				width: 200px;
				height: 35px;
				margin-top:5px;
				border:1px solid #ccc;
				padding: 0px 10px
			}
			.el-input__inner:focus{
			border:1px solid #8daee5;
			}
			.el-input__inner{
			width: 223px;
			border-radius: 0px;
			}
			/*选择框图标样式*/
			.el-input__icon{
			right:-25px;
			}
			/*性别样式修改*/
			.sex{
				input{
					width: 15px;
					height: 15px;
					margin-top: 15px;
				}
			}
		}
		.el-select .el-input .el-input__icon{
			right:0px;
		}
		/*输入框样式修改*/
		.textarea{
			max-width: 320px;margin-top:10px;
		}
    	.base-bottom{
    		.base-bottom-main{
    			/*margin: 0 auto;*/
    			max-width: 900px;
    			max-height: 300px;
    		}
    		.base-bottom-warp{
    			border:1px solid #ccc;
    			margin:20px 15px;
    			border-radius: 5px;
    			height:220px;
   				dl{
   					padding: 10px;
   					margin:0px;
   					input{
   						width: 200px;
   						height: 35px;
   						margin-top:5px;
   						border:1px solid #ccc;
   						padding: 0px 10px
   					}
   					.el-input__inner:focus{
						border:1px solid #8daee5;
   					}
   					.el-input__inner{
						width: 223px;
						border-radius: 0px;
   					}
   				}
   				.check-class .el-input{
   					width: auto;
   				}
    		}
    		h3{
    			margin:0px;
    			background-color: #f5f5f5;
    			border-color: #ddd;
    			font-weight: 200;
    			height: 40px;
    			line-height: 40px;
    			border-bottom: 1px solid #ccc;
				padding-left: 20px;
    		}
    	}
	}
	.check-class .el-input{
		width: auto;
	}
	.infoBase{
		div dt,div dd{
			/*float: none;*/
			margin:0px;
			height: 30px;
			line-height: 30px;
			padding:3px;
		}
	}
	/*媒体查询*/
@media screen and(max-width:1480px){
  .base dl input,.base .base-bottom .base-bottom-warp dl input{
    width: 155px;
    height: 30px;
  }
  .base dl .el-input__inner,.base .base-bottom .base-bottom-warp dl .el-input__inner{
  	width: 177px;
  }
  .base dl .el-input__inner,.base .base-bottom .base-bottom-warp dl .el-input__icon{
  	right: 10px;
  }
  .base .eq-sb input{
  	height: 31px;
  }
  .base dl .el-input__icon{
  	right: 10px;
  }
}
</style>
