<template>
	<div class="games-time">
		<div class="confirm" v-show="isShowConfirm">
			<h3>游戏训练反馈时长</h3>
			<p>反馈时间：{{feedbackTime}}&nbsp;秒<span v-if="show">，播放时长：{{value}}&nbsp;秒</span></p>
			<button class="cancal" @click="close_confirm">无效</button>
			<button @click="save_confirm">有效</button>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
 			isShowConfirm:false,
 			times:0,
 			alltime:0
		}
	},
	props:{
		value:{
 			type:Number,
 			default:0
 		},
 		feedbackTime:null,
 		games:String,
 		show:{
 			type:Boolean,
 			default:false
 		}
	},
	created(){
		this.$store.commit('gamesTimes',{time:0,times:0,step:false});
	},
	destroyed(){
		this.$store.commit('gamesTimes',{time:0,times:0,step:false});
	},
	methods:{
		close_confirm(){
 			this.isShowConfirm = false;
 			if(this.times === 0){
				this.$store.commit('gamesTimes',{time:0,times:0,step:true});
 			}
 		},
 		save_confirm(){
 			const data = {
 				'feedbackTime':this.feedbackTime,
 				'playTimer':this.value,
 				'games':this.games
 			};
 			this.times++;
 			this.alltime += this.feedbackTime;
 			let averageTime = this.alltime/this.times;
			let time = isNaN(averageTime) ? 0 : averageTime.toFixed(2);
			this.$store.commit('gamesTimes',{time:time,times:this.times,step:true});
 			Utils.setFeedTime(this,'/game/log',data).then((res)=>{
 				this.isShowConfirm = false;
 			})
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