<template>
	<div class="voice-num">
		<p class="fl">音量控制</p>
		<div class="fl">
			<el-input-number class="num" v-model="value" :step="1" @change="handleChangeVoiceNum" :min="1" :max="6"></el-input-number>
		</div>
	</div>
</template>
<script>
import util from'../../../common/util.js'
export default{
	data(){
		return{
			value:6,
			changeToggle:false
		}
	},
	// props:{
	// 	name:{
 // 			type:String,
 // 			default:"这是默认值"
 // 		}
	// },
	created(){
		this.initialVolumeNum = this.$store.state.zhutingData['1000'];
	},
	mounted(){
		util._getVolumNum(this);//获取音量差值
		console.log(jq('input'))
	},
	methods:{
		handleChangeVoiceNum(evt){
			// console.log((6-evt)*10)
			let num = -(6-evt)*10 + this.initialVolumeNum;
			this.$emit('volume',num);
			// 保存音量差值
 			util._setVolumNum(this,{'decibel':(6-evt)*10,'test_id':sessionStorage.getItem('test_id')});
			var argument = this.wskt.wstoctld('games_audio_toggle',{'volume':num});
				// console.log(num);
			websocket.send(JSON.stringify(argument));
 		},
	}
}
</script>
<style lang ="less">
	/*控制音量大小*/
.voice-num{
	margin:0px;
	margin-left: 30px;
	p{
		height: 59px;
		font-size: 20px;
		text-align: center;
		line-height: 59px;
		padding: 0 15px;
		color:#fff;
		border:1px solid #42d885;
		border-radius:4px 0 0 4px;
		border-bottom: 0px none;
		background-color: #42d885;
	}
	.num{
		width: 250px;
		font-size: 20px;
		span{
			line-height: 60px;
		}
		.el-input-number__decrease{
			right: 0;
			left:0;
			width: 85px;
			border-left: 0px none;
			border-right: 1px solid #bfcbd9;
		}
		.el-input-number__increase{
			width: 85px;
		}
		.el-input__inner{
			text-align: center;
			height: 60px;
			border-radius:0 4px 4px 0;
			padding-right: 0;
			border-left: 0px none;
		}
		.el-input{font-size: 20px;}
	}
}
</style>