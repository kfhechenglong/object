<template>
	<div class="img">
    	<div class="topBigimg" id="img-print" v-loading="loading"
    element-loading-text="拼命旋转中">
	    	<div id="imgp-p-s">
	    		<i class="el-icon-arrow-left" @click="preImg"></i>
	    		<i class="el-icon-arrow-right" @click="nextImg"></i>
		    	<img id="bigImg" v-if="port == 8080" :src="web_url+bigImg"  @click="_lookBigImg" :style="ImgrotateStyle" ref="img">
				<img id="bigImg" v-else :src="web_url+bigImg"  @click="_lookBigImg" :style="ImgrotateStyle" ref="img">
			</div>
    	</div>
		<div class="bottomsimg" id="warp">
			<ul class="clearfix" id="thumbnail" style="left:0px">
	    		<li class="fl" v-for=" (item,index) in serverImgUrl" @click="currentImgShow(item['src'],index)">
	    			<img :class="[index === currentImg ? 'currentImg' :'']" :src="web_url+item['src']" width="80" height="65" alt="">
	    		</li>
	    	</ul>
		</div>
		<!-- 图片预览 -->
		<div class="preview" v-show="showPreview" @keyup.esc="_lookBigImg">
	    	<div class="box-preview">
	    		<a @click="_lookBigImg"></a>
	    		<img id="preview" v-if="port == 8080" :src="web_url+bigImg">
				<img id="preview" v-else :src="web_url+bigImg">
	    	</div>
	    </div>
	</div>
</template>
<script>
let deg = 0;
import {mapState} from 'vuex'
import util from'../../../common/util'
export default {
 	data(){
 		return {
        	bigImg:'',
			currentImg:0,
			web_url:web_url,
			port:port,
			// testImgUrl:testImgUrl,
			serverImgUrl:[],
			showPreview:false,
			deg:0,
			loading:false
 		}
 	},
 	// 接收父组件传过来的数据
 	props:{
 	},
 	mounted(){
 	},
 	computed:{
 		...mapState(['studyID']),
 		ImgrotateStyle:function(){
 			return {
				transform:'rotate(0deg) translate(-50%,-50%)',
				transformOrigin:'0 0%'
			};
 		}
 	},
 	methods:{
 		print(){
 			// 将打印的图片地址发送给服务器
 			const url = this.bigImg.split('?');
 			const printImg = () =>{
 				this.$ajax.post('/info/printimg',{path:url[0]}).then((res)=> {
 					console.log(res);
 					if(res.code === 200){
 						msgTipsSuccess(this,'打印信息已发送！')
 					}
 				}).catch((err) =>{
 					alert(err +'发送图片打印数据失败！')
 				})
 			};
 			util.clearPrintData(this,printImg);
 		},
 		// 图片预览
		_lookBigImg(){
			this.showPreview = !this.showPreview;
		},
		// 获取图片
		getStudyImg(api,params){
			// 初始化数据
			this.currentImg = 0;
			this.$ajax.post(api,params).then((response) =>{
				if(response.code === 200){
					if(response.data.length === 0){return;}
					this.serverImgUrl = response.data;
					// 显示第一张图片
					this.bigImg = response.data[0]['src'] + "?t="+Math.random();
					// 根据图片的数量计算ul的宽度
					jq('#thumbnail').style.width = response.data.length*98 + 'px';
					// 调用获取元素的函数
					this.itemSlider();
				}else{
					// 没有数据数据时，初始化为空
					this.serverImgUrl = [];
				};
				// console.log(this.serverImgUrl);
			});
			return 
		},
		// 删除图片
		_deldeImg(api,id){
			let getImgId = null;
			deleimg(this);
			function deleimg(that){
				if(that.serverImgUrl.length <= 0){msgTipsSuccess(that,'没有可删除的图片!');return;}
				// 获取当前图片的id
				getImgId = that.serverImgUrl[that.currentImg]['id'];
				let params ;
				console.log(id)
				if(id != undefined){
					params ={
						'id':id,
						'image_id':getImgId
					};
				}else{
					params ={
						'id':getImgId
					};
				};
				console.log(params);
				// 确认是否删除
				that.$confirm('您是否要删除当前图片？', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	             }).then(() =>{
	             	// 发送删除请求
					that.$ajax.post(api,params).then((response) =>{
						console.log(response);
						if(response.code === 200){
							msgTipsSuccess(that,'删除成功!');
							deleteAfterSuccess();
						}else{
							msgTipsErr(that,'删除失败');
						}
					}).catch((err) =>{
						console.log(err);
					});
	             }).catch((err) =>{
	             	console.log(err);
	             })
			};
			// 从列表中删除已删除过的图片
			let imgsUrl = this.serverImgUrl,
				that = this;
			function deleteAfterSuccess (){
				let newImgs = imgsUrl.filter((item,index) =>{
					return item['id'] !== getImgId;
				});
				that.serverImgUrl = newImgs;
				that.$emit('imgs',newImgs);
				// 对图片列表重新赋值，计算宽度
				jq('#thumbnail').style.width = that.serverImgUrl.length*98 + 'px';
				// 删除后要显示的图片
				if(that.serverImgUrl.length <= 0){msgTipsSuccess(that,'当前图片组已全部删除!');return;}
				if(that.currentImg === 0){//如果删除的当前图片是列表的第一张，则删除后显示第一张
					that.bigImg = that.serverImgUrl[0]['src'] + "?t="+Math.random();
				}else{
					that.currentImg --;
					that.itemSlider();
					setTimeout(() =>{//从新获取元素的style属性后再进行下一张
						that.nextImg();
					})
				};
			};
			// console.log(this.currentImg);
		},
		currentImgShow(item,index){
			this.bigImg = item + "?t="+Math.random();
			this.currentImg = index;
		},
		_Rotate(){
			if(this.loading){return;}
			this.loading = true;

			this.$ajax.post('/file/imgturn',{src:this.serverImgUrl[this.currentImg].src}).then((response)=>{
				// console.log(response)
				if(response.code === 200){
					let bigImg = jq("#bigImg");
					let currentImg = jq(".currentImg")[0];
					bigImg.setAttribute('src',web_url+response.data+'?r='+Math.random())
					currentImg.setAttribute('src',web_url+response.data+'?r='+Math.random())
					jq("#preview").setAttribute('src',web_url+response.data+'?r='+Math.random());
					this.loading = false;
				}
			}).catch((err)=>{
				alert(err+"旋转出错！")
			});
		},
		// 点击下一张
		nextImg(){
			let img = this.serverImgUrl;
			let ul = this.ul;
			const warp = this.warp;
			let lis = this.lis;
			// 获取当前li
			let currentLi = lis[this.currentImg];
			// 获取最后的li
			let lastLi = lis[lis.length-1];
			let left = parseInt(ul.style.left);
			const currentLiLeft = currentLi.offsetLeft;
			const lastLiLeft = lastLi.offsetLeft;
			const warpWith = warp.offsetWidth;
			const ulWidth = ul.offsetWidth;
			if(ulWidth > warpWith){
				if(lastLiLeft - currentLiLeft > warpWith){
					ul.style.left = left - 98 + 'px';
				}else{
					ul.style.left = -parseInt(ulWidth-warpWith) + 'px';
				};
				// 如果是为最后一张时则，播放第一张
				if( this.currentImg >= img.length-1){
					this.currentImg = 0;
					ul.style.left = 0 + 'px';
				}else{
					this.currentImg++;
				};
			}else{
				if( this.currentImg >= img.length-1){
					this.currentImg = 0;
					ul.style.left = 0 + 'px';
				}else{
					this.currentImg++;
				};
			};
			this.bigImg = img[this.currentImg]['src'];
			// console.log(this.currentImg)
		},
		// 点击上一张
		preImg(){
			let img = this.serverImgUrl;
			let ul = this.ul;
			const warp = this.warp;
			let lis = this.lis;
			// 获取当前li
			let currentLi = lis[this.currentImg];
			// 获取第一个的li
			let lastLi = lis[0];
			let left = parseInt(ul.style.left);
			const currentLiLeft = currentLi.offsetLeft;
			const firstLiLeft = lastLi.offsetLeft;
			const warpWith = warp.offsetWidth;
			const ulWidth = ul.offsetWidth;
			// 如果图片的整体长度大于视口的长度；
			if(ulWidth > warpWith){
				if( currentLiLeft - firstLiLeft > warpWith){
					ul.style.left = left + 98 + 'px';
				}else{
					ul.style.left = 0 + 'px';
				};
				// 如果是为第一张时，则播放最后一张
				if(this.currentImg <= 0){
					this.currentImg = img.length-1;
					ul.style.left = -parseInt(ulWidth-warpWith) + 'px';
				}else{
					this.currentImg--;
				}
			}else{
				if(this.currentImg <= 0){
					this.currentImg = img.length-1;
					ul.style.left = 0 + 'px';
				}else{
					this.currentImg--;
				}
			};
			this.bigImg = img[this.currentImg]['src'] + "?t="+Math.random();
			// console.log(this.currentImg)
		},
		itemSlider(){
			this.ul = jq('#thumbnail');
			this.warp = jq('#warp');
			this.lis = this.ul.getElementsByTagName('li');
		}
 	}
}
</script>

<style lang ="less" >
	.img{
		/*position: relative;**/ 
		width: 100%;
		height:100%;
		/*background-color: #ccc;*/
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
			/*background-color: #337ab7;*/
			height:550px;
			height: 80%;
			position: relative;
			#imgp-p-s{
				height: 100%;
			}
			img{
			position: absolute;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
			max-width:450px;
			max-height: 450px;
			max-height: 95%;
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
			height: 20%;
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
					/*&:hover{
						opacity:1;
					}*/
				}
			}
		}
		/**图片预览***/ 
		.preview{
			position: fixed;
			top:0;
			left:0;
			bottom: 0;
			right:0;
			margin:auto;
			z-index: 100;
			background-image: url('../../../../static/images/fancyboxoverlay.png');
			.box-preview{
				position: absolute;
				left:50%;
				top:50%;
				transform:translate(-50%,-50%);
				max-height:700px;
				max-width:900px;
				padding: 13px;
				margin:auto;
				background: #f9f9f9;
				color: #444;
				text-shadow: none;
				border-radius: 4px;
				box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
				a{	
					position:absolute;
					cursor:pointer;
					right:-10px;
					top:-10px;
					width: 36px;
					height: 34px;
					z-index:1000;
					background-image: url('../../../../static/images/fancybox_sprite.png');
				}
				img{
				max-height:700px;
				max-width:900px;
				}
			}
		}
	}
</style>
