<template>
	<div class="games-time">
		<div class="confirm" v-show="isShowConfirm">
			<h3>游戏训练反馈时长</h3>
			<p>反馈时间：{{feedbackTime}}&nbsp;秒<span v-if="show">，播放时长：{{value}}&nbsp;秒</span></p>
			<button class="cancal" @click="close_confirm">取消</button>
			<button @click="save_confirm">保存</button>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
 			isShowConfirm:false
		}
	},
	props:{
		value:null,
 		feedbackTime:null,
 		gamse:String,
 		show:{
 			type:Boolean,
 			default:false
 		}
	},

	created(){
		
	},
	methods:{
		close_confirm(){
 			this.isShowConfirm = false;
 		},
 		save_confirm(){
 			const data = {
 				"user_id":JSON.parse(sessionStorage.getItem('user_id')),
 				'feedbackTime':this.feedbackTime,
 				'playTimer':this.value,
 				'games':this.gamse
 			};
 			this.$ajax.post('/game/log',data).then((res)=>{
 				if(res.code !== 200){
 					msgTipsErr(this,"保存失败！")
 				}else{
 					this.isShowConfirm = false;
 				}
 			});
 		},
	}
}
</script>
<style lang ="less" scoped>
.confirm{
	background: #eef1f6;
	position: fixed;
	left:50%;
	top:40%;
	transform:translate(-50%,-50%);
	border-radius:10px;
	width: 400px;
	height: 250px;
	box-sizing: border-box;
	padding: 10px;
	z-index:3000;
	box-shadow: 0px 0px 50px #000;
	h3{
		font-size: 20px;
		line-height: 30px;
		text-align: center;
	}
	p{
		margin-top: 20px;
		text-indent:2em;
		line-height: 100px;
		height: 130px;
		font-size: 18px;
	}
	button{
		width: 100px;
		height: 40px;
		background: #5bb75b;
		border:1px solid #5bb75b;
		box-shadow: 2px 2px 2px #000;
		float: right;
		margin-right:20px;
	}
	.cancal{
		float: left;
		margin-left:20px;
		background-color: #dd4c4c;
		border:1px solid #dd4c4c;
	}
}
</style>