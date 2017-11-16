<template>
<div class="star" v-if="starValue[groupId]">
    <div class="clearfix">
      <em class="fl">综合评价：</em>
      <div class="fl" id="imgs">
        <el-rate
          v-model="value"
          disabled
          show-text
          text-color="#ff9900"
          text-template="{value}">
        </el-rate>
      </div>
      <i v-if="starValue[groupId].star_value">{{starValue[groupId].star_value}}</i>
    </div>
    <div class="jianyi clearfix" v-if="starValue[groupId].advise">
      <em class="fl">听力建议：</em>
      <i>{{starValue[groupId].advise}}</i>
    </div>
</div>
</template>
<script>

export default {
	props:{
    groupId:null,
    starValue:Object
	},
 	data(){
 		return {
 			value:null
 		}
 	},
 	watch: {
    groupId:function(){
      if(this.starValue[this.groupId]){
        this.value = +this.starValue[this.groupId].star;
      }
    },
    starValue:function(){
      if(this.starValue[this.groupId]){
        this.value = +this.starValue[this.groupId].star;
      }
    }
  },
 	computed:{
 	},
 	methods:{
 		
 	}
}
</script>

<style lang ="less" scoped>
	/*综合评价*/
  .star{
    margin-left: 40px;
    margin-top: 10px;
    #imgs{
      margin:0px 10px;
    }
    .jianyi{
      margin-top: 10px;
      i{
        display:inline-block;
        width:370px;
        line-height: 25px;
      }
    }
  }
</style>
