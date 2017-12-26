<template>
	<div  v-show="isToggleGame" class="games-toggle post-fixed" @click="_click_div_warp_close">
		<div :class="[checkgame ? 'toggle-warp1' :'toggle-warp2']" class="post-abs b-radius5 b-show20"  @click.stop="aaa =>{}">
			<div v-show="checkgame">
				<GameType  :ActiveContent = "1" v-on:active = "currentActive"></GameType>
				<Buttons :show="false" :paramData= "checkdata" @hadSend="nextWait">
					<span slot="btn-text">
						确定选择
					</span>
				</Buttons>
			</div>
			<div v-show="!checkgame">
				<p class="height-30 t-c fz22 m-t-20">游戏正在切换！请耐心等待！</p>
				<p class="height-30 t-c "><span class="fz16">提示：</span> <span class="fz16" style="color:red;">若点击下方按钮，您将离开此界面！</span></p>
				<Loading></Loading>
				<button class="back-btn fz22 b-radius5 button button-inline button-large button-warning" @click="gohome">退出测听</button>
				<button class="str-btn fz22 b-radius5 button button-inline button-large button-success"  @click="toSave">暂存数据</button>
			</div>
		</div>
	</div>
</template>
<script>
import GameType from "./gameType.vue";
import Buttons from "./butotn.vue";
import Loading from "./loading.vue";
import {mapState,mapMutations} from 'vuex'
export default{
	components:{
		GameType,
		Buttons,
		Loading
	},
	data(){
		return{
			isToggleGame:false,
			checkgame:true,
			gamesPath:"",
			leixing:"",
			level:"",
			Active:"",
			wsData:{}
		}
	},
	props:{
		value:{
 			type:Number,
 			default:0
 		},
	},
	mounted(){
		const that = this;
		// 接收被控端消息websocket连接
		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
	},
	created(){
		
	},
	watch:{
		wsData:function(){
 			if(this.wsData.params && this.wsData.params.prepare){
				//  跳转成功发送给父组件参数
				this.emit();
				 // 被控端页面准备好后，可进行操作
				this.checkgame = true;
				// 发送最大强度数据;
	 			const argument = this.wskt.wstoctld('games_audio_maxDbList',this.zhutingData);
				websocket.send(JSON.stringify(argument));
				
				this._click_div_warp_close();
			};
 		},
	},
	computed:{
		checkdata:function(){
 			return{
				'crtgame':this.Active,
				'crtsign':this.leixing,
				'level':this.level,
				'gamesPath':this.gamesPath,
			}
		 },
		 ...mapState(['zhutingData']),
	},
	methods:{
		// 
		emit(){
			this.$emit('parenttogglegame',this.checkdata)
		},
		// 返回主页
		gohome(){
			window.isToggle = false;
			this.$router.push({path:"/home"});
			// 返回游戏主页
            var argument = this.wskt.gohome();
            websocket.send(JSON.stringify(argument));
		},
		// 暂存数据
		toSave(){
			this.$emit('toSave',true)
		},
		currentActive(str){
	 		this.Active = str.active;
			this.level = str.level;
			this.gamesPath = str.gamesPath;
		 },
		nextWait(e){
			this.checkgame = false;
		},
		_click_div_warp_close(){//关闭
			// 在等待游戏过程中不允许关闭
			if(!this.checkgame){return false}
			this.isToggleGame = false;
		}
	}
}
</script>
<style lang ="less" scoped>
.toggle-warp1{
	background-color: #fff;
	height: 300px;
	width: 900px;
	padding: 20px;
}
.toggle-warp2{
	background-color: #fff;
	height: 350px;
	width: 700px;
	padding: 20px;
	button{
		width: 150px;
		height: 50px;
		display: inline-block;
		color: #fff;
		text-transform: uppercase;
		text-align: center;
		padding-top: 6px;
		margin-right: 10px;
		position: relative;
		cursor: pointer;
		font-weight: 500;
		border: 1px solid transparent;
		line-height: 1em;
	}
	.str-btn,.back-btn{
		position: absolute;
		left: 0%;
		bottom:20px;
	}
	.str-btn{left:60%;}
	.back-btn{left:23%;}
}
</style>