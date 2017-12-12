<template>
  <div class="header-info">
 	<div>
		<div class="header-st-info">
			<div class="img-name">
				<img v-if="study_info.gender == '男' "  :src="imgSrc" :onerror="errorImgBody">
				<img v-else :src="imgSrc" :onerror="errorImgGirl">
				<div>
					<p v-if="study_info_length &&study_info_length.length >  4" >
						<el-tooltip class="item" effect="dark" :content="study_info.user_name" placement="bottom">
							<span class="name" v-text="study_info.user_name"></span>
						</el-tooltip>
					</p>
					<span v-else class="name" v-text="study_info.user_name"></span>
					<i><em v-if="study_info.gender">{{study_info.gender}}&nbsp;</em>{{study_info.age}}<em v-if="study_info.age">&nbsp;岁</em></i>
				</div>

			</div>
			<div class="equipment clearfix">
				<ul>
					<li class="clearfix">
						<span>左耳设备：</span>
						<p>{{study_info.eq_left.string}}</p>
					</li>
					<li class="clearfix">
						<span>右耳设备：</span>
						<p>{{study_info.eq_right.string}}</p>
					</li>
				</ul>
			</div>
			<div class="t-e">
				<p class="fl">个人备注：</p>
				<textarea readonly="readonly" class="text fl">{{study_info.remark}}</textarea>
			</div>
			<div>{{test}}</div>
			<ele-backbtn></ele-backbtn>
			<!-- <div class="back button button-inline button-large button-danger" @click="goBack"><i class="el-icon-close"></i>&nbsp;退出测听</div> -->
		</div>
		<router-view :params="study_id"></router-view>
 	</div>

  </div>
</template>
<script>
const port= window.location.port;
const body = require('../../../../static/images/body.png');
const girl = require('../../../../static/images/girl.png');
import Backbtn from '../commonvue/go-backBtn.vue'
import util from './../../../common/util.js'
export default {
	components:{
		'ele-backbtn' : Backbtn
	},
 	data(){
 		return {
 			port:port,
 			web_url:web_url,
 			textarea:'',
 			// 获取学生的id
 			study_id:'',
 			// 学生的信息
 			study_info:{
 				eq_right:{
					string:'',
					array:[]
				},
				eq_left:{
					string:'',
					array:[]
				},
 			},
 			study_info_length:null,
 			errorImgBody:'this.src="' + body + '"',
		    errorImgGirl:'this.src="' + girl + '"'
 		}
 	},
 	created(){
 		this.study_id = this.$route.query.id ? this.$route.query.id : this.$route.query.user_id;
 		// 获取当前id学生的信息
 		this.getStInfo();
 		util.getterIp(this);
 	},
 	mounted(){
 	},
 	computed:{
 		test(){
 			return this.$store.state.test_spl;
 		},
 		imgSrc:function(){
    		if(!this.study_info.picture){
    			if(this.study_info.gender === "男"){
    				return body;
    			}else{
    				return girl;
    			}
        	}else{
        		return web_url+ this.study_info.picture;
        	}
        }
 	},
 	destroyed(){
	    this.$store.commit('getterIp',null);
	},
 	methods:{
 		getStInfo(){
 			const str = {"id":this.study_id};
		    this.$ajax.post(`/user/info`,str).then((response)=>{
		        // console.log(response)
		        if(response.code !== 200){throw Error(response.data);return;}
	          	this.study_info = response.data;
	          	sessionStorage.setItem('user_info', JSON.stringify(response.data));
	          	this.study_info_length = this.study_info.user_name;
	          	return Promise.resolve(response.data)
		    }).catch((err)=>{
		        msgTipsErr(this,'学生信息请求失败！');
		   	}).then((res)=>{
		   		const str = {
					'selectL':res.selectL,
					'selectR':res.selectR,
					'eq_right':res.eq_right,
					'eq_left':res.eq_left,
				};
				sessionStorage.setItem('user_text', JSON.stringify(str));
		   	})
 		},
 	}
}
</script>
<style lang ="less">
	.header-info{
		.header-st-info{
			height: 80px;
			padding:20px 20px 14px 20px;
			border-top:6px solid #eeeeee;
			border-bottom: 10px solid #eeeeee;
			background-color: #fff;
			li{
				list-style:none;
			}
			.img-name{
				float: left;
				font-size: 25px;
				width: 200px;
				overflow: hidden;
				border-right: 1px solid #cbcbcb;
				img{
					float: left;
					height: 80px;
					width: 80px;
					border-radius: 50%;
				}
				div{
					height: 80px;
					float: left;
					margin-left: 20px;
					i{
						font-size: 18px;
					}
				}
				.name{
					line-height: 40px;
					display: block;
					width: 4em;
					overflow: hidden; /*自动隐藏文字*/
					text-overflow: ellipsis;/*文字隐藏后添加省略号*/
					white-space: nowrap;/*强制不换行*/
				}
			}
			.equipment{
				float: left;
				font-weight: 600;
				margin-left: 20px;
				span{
					width: 100px;
    				letter-spacing: 2px;
					font-size: 16px;
					background-color: #777777;
					border-radius: 20px;
					text-align: right;
					padding: 0px 10px;
					color:#fff;
				}
				p{
					line-height: 27px;
					margin-left:10px;
					color: #333;
					font-size: 16px;
					em{
						display: inline-block;
						width: 120px;
						text-align: right;
						padding-right: 10px;
						font-weight: 600;
					}
				}
				span,p{
					height: 30px;
					line-height: 30px;
					float: left;
				}
				li{margin-bottom: 10px;}
				ul{
					margin:0px;
				}
			}
			.t-e{
				float: left;
			    margin-left: 100px;
			}
			.text{
				padding: 5px;
				border-radius: 3px;
				border:1px solid #ccc;
				box-sizing: border-box;
			    width: 20%;
			    min-width: 280px;
				color: #333;
				height: 75px;
				overflow: auto;
				word-wrap: break-word;
				font-size:16px;
				letter-spacing: 2px;
			}
		}
	}
</style>
