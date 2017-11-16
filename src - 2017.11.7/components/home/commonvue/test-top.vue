<template>
	<div class="test-t">
		<ul class="tone-top-title clearfix">
			<li class="fl l-class"><span>测试时间：</span>{{time}}</li>
			<li class="fl l-class"><span>测试人：</span>{{name}}</li>
			<li v-if="show"><span>识别率：</span>{{testAccuracy}}</li>
		</ul>
		<div class="textarea clearfix">
			<span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
			<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model.trim="textarea"
			  @blur = "blur"
			  resize="none">
			</el-input>
		</div>
	</div>
</template>
<script>
import util from '../../../common/util.js'
export default{
	data(){
		return{
			textarea:'',
			show:false,
			time:''
		}
	},
	props:{
 		testAccuracy:{
 			type:String,
 			default:""
 		}
	},
	created(){
		this.time = util.dateToggle('年','月','日');
		this._show_last();
		this.blur();
	},
	mounted(){
		
	},
	computed:{
 		// 测试人
 		name:() =>{
 			return JSON.parse(sessionStorage.getItem('user'));
 		}
 	},
	methods:{
		_show_last(){
 			this.show = sessionStorage.getItem('test_id') == 7 ? true:false
 		},
 		blur(){
 			sessionStorage.setItem('textarea', this.textarea);
 			this.$emit('textarea',{'textarea':this.textarea,'time':this.time});
 		}
	}
}
</script>
<style lang ="less" >
.test-t{
	a{color: #fff;}
	/*.liu-top-title{*/
		li{
			float: left;
			margin:15px 0px;
			margin-right: 30px;
			line-height: 50px;
		}
		li:last-child{
				margin-right: 0px;
			}
	/*}*/
	.textarea{
		line-height: 55px;
		.el-textarea{
			margin-left: 20px;
			width: 70%;
		}
	}
}
</style>