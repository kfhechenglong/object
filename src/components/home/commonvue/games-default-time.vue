<template>
	<div class="voice-num clearfix">
		<p class="fl">有效时长：</p>
		<div class="fl">
			<el-input-number class="num" v-model="defaultvoice" :step="1" @change="change_default_playtime" :min="0" :max="5"></el-input-number>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
 			defaultvoice:0,
		}
	},
	props:{
		
	},
	created(){
		//  获取默认的播放有效时长
		const getsession = sessionStorage.getItem('defaultplaytime')
		this.defaultvoice = getsession ? getsession : 3;
		this.change_default_playtime(this.defaultvoice);
	},
	destroyed(){
		
	},
	methods:{
		//  改变默认有效时长
		change_default_playtime(e){
			sessionStorage.setItem('defaultplaytime',e);
			this.$emit('changedefault',e);
			const argument = this.wskt.wstoctld('games_playtime_toggle',{'defaultplaytime':e});
	    	websocket.send(JSON.stringify(argument));
		},
	}
}
</script>
<style lang ="less" scoped>

</style>