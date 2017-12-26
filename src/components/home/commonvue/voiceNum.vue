<template>
	<div class="voice-num clearfix">
		<p v-if="isZhu" class="fl">给声时长</p>
		<p v-else class="fl">音量控制</p>
		<div class="fl">
			<el-input-number class="num" v-model="value" :step="1" @change="handleChangeVoiceNum" :min="1" :max="6"></el-input-number>
		</div>
		<div class="fz16 m-l-20" v-if="show && gamesTimesObj.step">
			<span class="d-block height-30">有效次数：3{{gamesTimesObj.times}}次</span>
			<span class="d-block height-30">平均反应时间：0.32{{gamesTimesObj.time}}s</span>
		</div>
	</div>
</template>
<script>
import util from'../../../common/util.js'
import {mapState} from 'vuex'
export default{
	data(){
		return{
			changeToggle:false,
			initialVolumeNum:null,
			value:6
		}
	},
	props:{
		isZhu:{
			type:Boolean,
			default:false
		},
		// alltime:null,
		// times:null,
		show:{
			type:[Boolean,Number],
			default:false
		},
	},
	created(){
		this.initialVolumeNum = this.$store.state.voiceData['1000'];
	},
	computed:{
		...mapState(['gamesTimesObj']),
	},
	mounted(){
		util._getVolumNum(this).then((res)=>{
			const num = this.initialVolumeNum - res.decibel;
			// if(res.decibel == 0){return}
            this.value =  6 - (+res.decibel/10);
			if(isNaN(num)){
				throw new Error('websocket is ununited,Volume expect a number ,get NaN! ')
			}
			this.$emit('volume',num);
		})
	},
	methods:{
		handleChangeVoiceNum(evt){
			if(this.isZhu){
				this.$emit('volume',evt);
				return false;
			}
			let num = -(6-evt)*10 + this.initialVolumeNum;
			this.$emit('volume',num);
			// 保存音量差值
 			util._setVolumNum(this,{'decibel':(6-evt)*10,'test_id':sessionStorage.getItem('test_id')});
 			if(this.isLiu) return false;
			var argument = this.wskt.wstoctld('games_audio_toggle',{'volume':num});
			console.log(argument)
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