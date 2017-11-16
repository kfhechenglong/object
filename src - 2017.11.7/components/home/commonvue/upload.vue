<template>
  <div class="upload" >
    <el-dialog title="上传照片" v-model="dialogUploadVisible" @close="close" :close-on-click-modal="false">
		<!-- action="/ghdev/index.php/user/update" -->
		<el-upload
			ref = "upload"
			:class="[{avataruploader:imageUrl},'uploadshow']"
		  :action="api"
		  list-type="picture-card"
		  name ="file0"
		  :show-file-list="true"
		  :data = "data"
		  :on-change="onChange"
		  :on-success="success"
		 	:on-error="error"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove"
		  :auto-upload="false">
  		<i class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
		
		<div slot="footer" class="dialog-footer">
			<!-- <div class="dele" v-if="imgs.length>0"> -->
		        <!-- <el-button><i class="el-icon-delete2" @click='delete_img()'>删除</i></el-button> -->
			<!-- </div> -->
			<el-button type="primary" @click="addSubmit">提交</el-button>
		</div>
    </el-dialog>
    <el-dialog v-model="dialogVisible" custom-class="imgdialog">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
  </div>
</template>

<script>

export default {
	data(){
		return {
			dialogUploadVisible:false,
			imageUrl: false,
			dialogImageUrl: '',
			data:{},
			imgs:[],
			showDelet:false,
        	dialogVisible: false
		}
	},
	props:{
		userid:null,
		api:String
	},
	mounted(){
	},
	methods:{
		onChange(file, fileList) {
			// console.log(file, fileList);
			this.imageUrl = true;
		},
  		handleRemove(file, fileList) {
	        // console.log(file, fileList);
	        this.imageUrl = false;
	      },
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	      // 文件上传成功
	    success(file, fileList){
	      	console.log(file, fileList);
	      	if(file.code === 200 && (file.msg === "修改成功" || file.msg === "更新成功")){
	      		msgTipsSuccess(this,'恭喜你，图片修改成功！');
	      		this.dialogUploadVisible = false;
	      	}else{
	      		msgTipsErr(this,'很遗憾，图片修改失败！');
	      	}
			this.$refs.upload.clearFiles();
	    },
	    error(file, fileList){
      		msgTipsErr(this,'很遗憾，图片修改失败！');
	    	this.$refs.upload.clearFiles();
	      	console.log(file, fileList);
	    },
		show(){
		  	this.data = this.userid;
		  	this.dialogUploadVisible=true
		},
		close(){
			this.$refs.upload.clearFiles();
		},
		addSubmit(){
		  	this.$refs.upload.submit();
		}
	}
}
</script>

<style lang ="less">
	.upload{
		.el-dialog--small{
			width: 400px;
			.el-dialog__body{
				padding: 20px 20px;
			}
		}
		.dele{
			float: left;
		}
		.uploadshow{
			height: 160px;
			.el-upload{
				position: absolute;
				left: 20px;
				z-index: 1;
			}
			.el-upload-list__item{
				z-index: 2;	
			}
		}
		
		.avataruploader{
			.el-upload{
				overflow: hidden;
				position: absolute;
				left: 20px;
			}
			.el-upload-list__item{
			z-index: 100;	
			}
		}
	}
</style>
