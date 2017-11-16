<template>
  <div class="caseFiles clearfix">
  	<div v-show="serverImgUrl.length > 0" style="height:100%;">
  		<div class="content-title clearfix">
  			<h3 class="fl"  style="line-height:50px; font-size:18px; text-indent:1em;">详情</h3>
  			<ul class="fr"> 
  				<li title="旋转图片" @click="_Rotate"><i class="fa fa-undo"></i>旋转</li>
                <li title="删除图片" @click="_deldeImg"><i class="el-icon-delete2"></i>删除</li>
                <li title="扫码上传" @click="upload"><i class="el-icon-edit"></i>上传</li>
                <li title="扫码下载" @click="download"><i class="fa fa-cloud-download"></i>下载</li>
                <li title="在线打印" @click="_print"><i class="fa fa-print"></i>打印</li>
  			</ul>
		</div>
	    <div class="caseFilesLeft fl">
	    	<imgpreview ref="imgs" v-on:imgs="_Allimgs"></imgpreview>
	    </div>
   	</div>
	<div v-show="serverImgUrl.length == 0"  class="noData">
			<img src="../../../../../static/images/nodata.png" alt="" width="300px">
		<ul>
			<li @click="upload"><i class="fa fa-cloud-upload"></i>&nbsp;&nbsp;上传图片</li>
		</ul>
	</div>
	<div v-if="showQQVisible">
		<codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
	</div>
  </div>
</template>

<script>
let deg = 0;
let testImgUrl = ['1.jpg','1024.jpg','timg.jpg','d3.jpg','163.jpg'];

import {mapState,mapMutations} from 'vuex'
import util from'../../../../common/util'
import Imgpreview from'../../commonvue/imgpreview.vue'
import codeQQ from'../../commonvue/codeQQ/codeQQ.vue'
export default {
	components:{
		Imgpreview,
		codeQQ
	},
	data (){
		return{
			bigImg:'1.jpg',
			currentImg:0,
			testImgUrl:testImgUrl,
			serverImgUrl:[],
			showPreview:false,
			type:'up',
			time:'',
			showQQVisible:false
		}
	},
	computed:{
		...mapState(['studyID','wepAppTime']),
		codeInfo:function(){//生成二维码的信息
			return {'time':this.time,'type':this.type,'user_id':this.studyID,'file':'bingli','id':null}
		}
	},
	watch:{
        wepAppTime:function(){   
            if(this.wskt.up_loder(this) === 'redact'){
                // this.$refs.code.dialogQQVisible = false;//关闭二维码
                this._closeCodeQQ()
                //刷新当前日期图片
                this.hasDataImg();
                this.$refs.imgs.getStudyImg('/file/bingli',{'user_id':this.studyID}); 
            }
        }
    },
	beforeRouteEnter (to, from, next) {
	    next(function(vm){
	    	vm.time = parseInt(new Date().getTime());//获取时间戳，用于生成二维码信息
	    	vm.hasDataImg();
	    	vm.$store.commit('getter_code_time',vm.time);
	    	vm.$refs.imgs.getStudyImg('/file/bingli',{'user_id':vm.studyID});
	    })
	},
	beforeRouteLeave (to, from, next) {//路由离开时，清空信息
		this.serverImgUrl = [];
		this.currentImg = 0;
		this.time = null;
		this.$store.commit('getter_code_time',this.time);
		this.$refs.imgs.serverImgUrl = [];
        this.$refs.imgs.bigImg = null;
		next();
	},
	methods:{
		_print(){
			let that = this;
            util.getPrint(this,next);
            function next(){
                // util.print('#img-print');
                that.$refs.imgs.print()
            }
		},
		_deldeImg(){
			this.$refs.imgs._deldeImg('/file/delete');
		},
		_Rotate(){
			this.$refs.imgs._Rotate();
		},
		_Allimgs(data){
			this.serverImgUrl = data;
		},
		hasDataImg(){
			this.$ajax.post('/file/bingli',{'user_id':this.studyID}).then((response) =>{
				if(response.code === 200){
					this.serverImgUrl = response.data;
				}else{
					this.serverImgUrl = []
				}
				console.log(this.serverImgUrl);
			});
			return 
		},
		_closeCodeQQ(e){//下载按钮，二维码关闭时的函数
	      	this.showQQVisible = false;
	      	// this.$store.commit('getter_code_time','');
	    },
		// 上传
		upload(){
			util.getterIpCode(this,next);
			function next(pointer){
				pointer.$store.commit('code_api','up');
				pointer.type = "up";
				pointer.showQQVisible = true;
				setTimeout(() =>{
					pointer.$refs.code.useqrcode();
				},50)
			};
		},
		//下载
		download(){
			util.getterIpCode(this,next);
			function next(pointer){
				pointer.$store.commit('code_api','dw');
				pointer.type = "down";
				pointer.showQQVisible = true;
				setTimeout(() =>{
					pointer.$refs.code.useqrcode();
				},50)
			};
		}
	}
}
</script>

<style lang="less" scoped>
@btn:#307bbc;
@bcl:#25c6ca;
	.caseFiles{
		/*****暂无数据*******/ 
		.noData{
			ul>li{
				font-size: 20px;
                 background-color: #25c6ca;
                  width: 150px;
                  height: 50px;
                  margin:8px auto;
                  line-height: 50px;
                  text-align: center;
                  margin-top: 10px;
                  border-radius: 5px;
                  cursor:pointer;
                  color:#fff;
                  // &:hover{
                  //   background-color:#25C707;
                  // }
            }
		}
		/**********/ 
		.caseFilesLeft{
			width: 100%;
			// min-width: 800px;
			height:calc(~"100% - 52px");
			.img{
				// position: relative;
				width: 100%;
				height:100%;
				i{
					font-size: 50px;
					position: absolute;
					top:50%;
					transform:translateY(-50%);
					cursor:pointer;
					color: #ccc;
				}
				.el-icon-arrow-left{
					left:80px;
					&:hover{
						color:#000;
					}
				}
				.el-icon-arrow-right{
					right:80px;
					&:hover{
						color:#000;
					}
				}
				.topBigimg{
					height:550px;
					position: relative;
					// &:hover i{
					// 	color:#000;
					// }
					img{
					position: absolute;
					left:50%;
					top:50%;
					transform:translate(-50%,-50%);
					max-width:500px;
					max-height: 500px;
					transform-origin:center center;
					cursor:pointer;
					}
				} 
				.warp{
					width:800px;
					margin:auto;
					overflow:hidden;
					position: relative;
				}
				.coverright{
					position: absolute;
				    right: 0px;
				    top: 32px;
				    width: 102px;
				    height: 73px;
				    z-index: 100;
				    background-color: rgba(0, 0, 0, 0.5);
				    box-shadow: 4px 2px 4px #888882;
				}
				.bottomsimg{
					position: relative;
					height:125px;
					width: 490px;
					margin:auto;
					overflow:hidden;
				}
				ul{
					position: absolute;
					background-color: rgba(0,0,0,0.4);
					left:0px;
					margin:0 auto;
					bottom: 20px;
					li{
						margin-right: 5px;
						margin-left: 5px;
						img{
							cursor:pointer;
							border:4px solid #ccc;
							opacity:0.4;
							&.currentImg{
								border:4px solid #3579b7;
								opacity:1;
							}
							// &:hover{
							// 	opacity:1;
							// }
						}
					}
				}
			}
		}
		.content-title{
	        height:40px;
	        width:855px;
	        margin-left:20px;
	        width:calc(~"100% - 40px");
	        padding-bottom: 5px;
	        border-top:5px solid @bcl;
	        border-bottom: 2px solid @bcl;
	        ul{ 
	           li{
	              float: left;
	              background-color: #25c6ca;
	              // width: 80px;
	              padding:0 10px;
	              height: 35px;
	              margin-left:8px;
	              line-height: 35px;
	              text-align: center;
	              margin-top: 4px;
	              border-radius: 5px;
	              cursor:pointer;
	              color:#fff;
	              // &:hover{
	              // 	box-shadow: 2px 3px 2px #ccc;
	              //   background-color:#25C707;
	              // }
	            }
	        }
	    }
		.caseFilesRight{
			margin-right: 70px;
   			margin-top: 70px;
   			/*****按钮*******/ 
   			input{
				cursor:pointer;
				width: 87px;
			    height: 38px;
			    border-radius: 5px;
			    color:#fff;
			    font-size: 18px;
			    border: 1px solid @btn;
				background-color: @btn;
			}
   			ul{
   				li{
   					margin:10px 0px;
   					// &:hover input{
   					// 	background-color:#25C707;
   					// 	border: 1px solid #25C707;
   					// }
   				}
   				
   			}
		}
	}
</style>
