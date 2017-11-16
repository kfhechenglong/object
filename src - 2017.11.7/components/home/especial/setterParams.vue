<template>
  <div class="especialParams">
		<paramsTitle :name="testname"></paramsTitle>
		<div class="params_content">
			<p>请录入两个发音容易混淆的字</p>
			<div class="params_content_div clearfix">
				 <el-form  class="fl" :model="formPass" :rules="codeinner" ref="formPass">
				 	<div class="params_content_div_list clearfix">
				 		<div class="background-img imgLeft"></div>
						<el-form-item  prop="Apronunciation" class="fr inputWidth">
							<input :autofocus="true" :maxlength="1" type="text" v-model.trim="formPass.Apronunciation" @keyup.space.enter="focus" @blur="change('formPass') ">
						</el-form-item>
						<span class="spanInner fr">把</span>
				 	</div>
				</el-form>
				<el-form class="fl" :model="formPass2" :rules="codeinner" ref="formPass2">
					<div class="params_content_div_list clearfix">
						
						<div class="background-img "></div>
						<el-form-item  prop="Bpronunciation"  class="fr inputWidth">
							<input ref="input" :maxlength="1" type="text" v-model.trim="formPass2.Bpronunciation" @blur="change2('formPass2')">
						</el-form-item><span class="spanInner fr">念成</span>
					</div>	
				</el-form>
			</div>
			<div class="params_content_next">
				<el-button @click.native="getPath()" type="warning">下一步</el-button>
			</div>
		</div>
  </div>
</template>
<script>
import ParamsTitle from '../commonvue/paramsTitle'
import {getPinyin} from '../../../api/api.js'
import util from '../../../common/util.js'
import {mapMutations} from 'vuex'
export default {
	name:'liu',
	components:{
		ParamsTitle
	},
 	data(){
 		return {
 			// 游戏测试名称
 			testname:'混淆音区分',
 			formPass:{
 				Apronunciation:''
 			},
 			formPass2:{
				Bpronunciation:''
 			},
 			codeinner:{
        		Apronunciation:[
	 				{required: true,message: '请输入汉字'},
	        		{ pattern:/^[\u4e00-\u9fa5]+$/, message: '只能为汉字'}
        		],
        		Bpronunciation:[
	 				{required: true,message: '请输入汉字'},
	        		{ pattern:/^[\u4e00-\u9fa5]+$/, message: '只能为汉字'}
        		]
 			},
 			voicesGroup:[],
 			message:"请输入汉字！",
 			firstFormPass:false,
 			senFormPass:false,
 		}
 	},
 	created(){
 	},
 	computed:{
 		checkdata:function(){
 			return{
				'data':this.groupSort,
				'isEar':this.radioEar,
				'crtgame':this.Active
			}
 		}
 	},
 	methods:{
 		focus(e){
 			this.$refs.input.focus();
 		},
 		change(e){
 			this.$refs[e].validate((valid) => {
 				// 清空词组
 				this.firstFormPass = false;
 				this.voicesGroup = [];
 				if(valid){
 					this.firstFormPass = true;
 				}
 			});
 		},
 		change2(e){
 			this.$refs[e].validate((valid) => {
 				// 清空词组
 				this.voicesGroup = [];
 				this.senFormPass = false;
 				if(valid){
 					this.senFormPass = true;
 				}
 			});
 		},
 		// 发送请求，请求拼音
 		getPath(){
 			// 两个汉字同时严重通过！
 			if(this.senFormPass && this.firstFormPass){
	 			let data = {
		 			"hanzi":{
		 				'0' : this.formPass.Apronunciation,
		 				'1' : this.formPass2.Bpronunciation
		 			}
		 		};
	 			this.$ajax.post(`/voices/getPath`,data).then((response) => {
		 			if(response.code === 200){
		 				// console.log(response.data);
		 				this.isMultitone(response.data)
		 			}else{
		 				console.log(response.data);
		 			}
		 		}).catch(function(error){
		 			console.log(error)
		 		});
		 	}else{
		 		msgTipsErr(this,'请输入汉字！');
		 	}
 		},
 		// 判断是不是多音字
 		isMultitone(str){
			if(str[0].length == 1 && str[1].length == 1){
 				if(JSON.stringify(str[0]) === JSON.stringify(str[1])){
 					msgTipsErr(this,'您输入的汉字相同，且不是多音字！');
 					return;
 				}
 			};
			this.voicesGroup = str;
			this.goToNext()
 		},
 		goToNext(){
 			if(this.voicesGroup.length <= 0){
 				msgTipsErr(this,'请输入汉字！');
 				return;
 			}else{
 				const voicesGroup = this.voicesGroup;
 				// 保存数据
 				this.$store.commit("setterVoicesGroup",voicesGroup);
	    	 	this.$router.push({ path:`/home/especial/base`});
 			}
 		},
	 
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
@fontColor:#ff991f;
	.especialParams{
		width: 1150px;
		height: 700px;
		margin:0px auto ;
		margin-top: 60px;
		background-color: #fff;
		border:8px solid #5f9970;
		.params_content{
			/*background-color: #ccc;*/
			width: 70%;
			height: 300px;
			margin:150px auto 0px;
			.spanInner{
				margin-right: 30px;
				line-height: 90px;
				color: @fontColor;
				font-size: 30px;
				text-align: center;
			}
			.el-input__inner{
				padding: 3px 0 3px 30px;
			}
			/*验证提示*/
			.el-form-item__error{
				font-size: 14px;
				left: 15px;
			}
			.params_content_div{
				width: 550px;
				margin:0 auto;
			}
			.params_content_div_list{
				position: relative;
				padding: 0px 20px;
				.inputWidth,.el-input{
					width: 100px;
					font-size: 30px;
				}
			}
			.el-form{
				.el-input__inner{
					height: 90px;
				}
			}
			/*字体背景田字格*/
			.background-img{
				position: absolute;
				width: 100px;
				height: 100px;
				right: 12px;
				top:2px;
				background:url('../../../../static/images/coin.jpg') no-repeat center;
			}
			.imgLeft{
				right: 14px;
			}
			input{
				width: 76px;
				height: 100px;
				border-radius: 5px;
				border: 1px solid #ccc;
				font-size: 40px;
				padding-left: 33px;
				background: cornsilk;
				background: rgba(255,252,238,0.5);
				color:navy;
			}
			/*验证不通过时的样式*/
			.is-error {
				input{
					border: 1px solid red;
				}
				input:focus{
					border: 1px solid red;
					outline-offset: 0px;
				}
			}
			input:focus{
				border: 1px solid #20a0ff;
				outline-offset: 0px;
			}
		}
		p{
			font-size: 34px;
			color: @fontColor;
			font-weight: 700;
			text-align: center;
			margin:50px 0px;
		}
		.params_content_next{
			margin-top: 60px;
			text-align: center;
			 .el-button{
				font-size: 30px;
				width: 150px;
			}
		}
	}
</style>
