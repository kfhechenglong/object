<template>
	<div class="add-class my-d-h">
		<el-dialog  v-model="classShow" :close-on-click-modal="false">
			<h3 class="check-title"></h3>
			<ul class="clearfix" id="class-ul">
				<li v-for="(item,index) in class_name_list" :class="{'checked-class':!addNewClass}" @click="checkedClassName($event,item,index)">{{item.class_name}}</li>
				<li v-if="addNewClass" @click="newAddClass" class="add-new-class"><i class="el-icon-plus"></i>新增班级</li>
				<li v-else :class="{'checked-class':!checked}" @click="submit">确&nbsp;&nbsp;定</li>
			</ul>
		</el-dialog>
	</div>
</template>
<script>
import util from '../../../common/util.js'
export default{
	data(){
		return{
			classShow:false,
			class_name_list :[],
			classArray :[],
		}
	},
	props:{
		paramData:{
 			type:null
 		},
 		addNewClass:{
 			default:function(){
 				return true;
 			}
 		}
	},
	created(){
	},
	computed:{
		checked(){
			if(this.classArray.length > 0){
				return true
			}else{
				return false
			}
		}
	},
	methods:{
		show(){
			util.getClass(this,showDilog);
			function showDilog(str){
				// str.classShow = true;
			}
			this.classShow = true;
		},
		// 选择班级
        checkedClassName(e,item,index){
        	if(this.addNewClass){//选择班级
        		this.$emit('newClassName',item);
 				this.classShow = false;
        	}else{//高级查询选择班级，多选状态下
        		let privateClass = e.currentTarget.className;
        		let privateClassArray = this.classArray;
        		// 判断是否选择过该班级
        		if(e.currentTarget.className){
        			e.currentTarget.className = '';
        			privateClassArray.push(item);
        		}else{
        			let privateArray = [];
        			for (var i = 0; i < privateClassArray.length; i++) {
        				if(privateClassArray[i].class_id !== item.class_id){
        					privateArray.push(privateClassArray[i])
        				}
        			}
        			this.classArray = privateArray;
        			e.currentTarget.className = 'checked-class';
        		}
        	}
        	
 		},
 		submit(){//高级查询选择班级的结果
 			this.$emit('checkedClassName',this.classArray);
 			this.classShow = false;
 		},
		newAddClass() {
	        this.$prompt('请输入班级！', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputPattern: /^[\da-zA-Z_—\u4E00-\u9FA5]{2,5}$/,
	          inputErrorMessage: '2-5个字符,且只能为字母、数字、汉字或"_"！',
	          customClass:"add-new"
	        }).then(({ value }) => {
	        	this.$ajax.post('/class/add',{'class_name':value}).then((res)=>{
	        		if(res.code === 200){
	        			msgTipsSuccess(this,value+'添加成功');
	        			this.$emit('newClassName',{'class_name':value,'class_id':null});
		 				this.classShow = false;
	        		}
	        	}).catch((err)=>{
	        		alert(err + '添加失败！')
	        	})
	        }).catch(() => {
	            
	        });
	    }
	}
}
</script>
<style lang ="less">
.check-title{
	position: absolute;
    left:30px;
    top:-90px;
    width:300px;
    height:80px;
    background: url(../../../../static/images/new-title.png) no-repeat 3px -98px ;
}
.add-class{
	.el-dialog--small{
		height: 500px;
		width: 650px;
		.el-dialog__body{
			margin: 50px 30px 0px 20px;
			position: relative;
			padding: 0;
		}
	}
	ul{
		height: 500px;
		overflow-y: auto;
	}
	li{
		cursor: pointer;
		float: left;
		height: 40px;
		width: 95px;
		line-height: 40px;
		border-radius: 3px;
		margin:5px;
		padding: 3px;
		text-align: center;
		font-size: 18px;
		color:#fff;
		background-color: #169bd5;
		box-shadow: 3px 3px 3px #ccc;
		&:hover{
			background-color: #1772f9;
			transform: scale(1.1);
		}
	}
	.add-new-class{
		background-color: #13ce66;
		box-shadow: 3px 3px 3px #ccc;
		&:hover{
			background-color: #13ce66;
			transform: scale(1.1);
		}
	}
	/*选择班级时，的默认样式*/
	.checked-class{
		color:#333;
		background-color: #13ce66;
		box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
	}
}
.el-message-box__wrapper .add-new{
	border:3px solid #109bff;
	border-radius: 15px;
	position: absolute;
	left: 50%;
    top: 160px;
    transform: translate(-50%);
	.el-message-box__wrapper{top:300px;}
    .el-message-box__header{display: none;}
}
</style>