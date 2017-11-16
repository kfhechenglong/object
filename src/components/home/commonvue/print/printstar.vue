<template>
  <div class="estimate">
    <h3 class="fl">
      综合评价：
    </h3>
    <ul class="fl">
      <li v-for="(item,valindex) in distance" class="clearfix">
        <span class="fl span">{{item}}米</span>
        <div class="fl clearfix">
          <div class="fl" :id="'imgs' + valindex">
            <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
            <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
            <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
            <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
            <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
          </div>
          <div class="fl" :id="'pin' + valindex">
          </div>
        </div>
        <p class="fl">
          <em>听力干预建议：</em>
          <i></i>
        </p>
      </li>
    </ul>
  </div>  
</template>
<script>
const rank_1 = require('../../../../../static/images/rank_1.gif');
const rank_2 = require('../../../../../static/images/rank_2.gif');
const rank_3 = require('../../../../../static/images/rank_3.gif');
const rank_4 = require('../../../../../static/images/rank_4.gif');
import util from './../../../../common/util.js'
export default{
	data(){
		return{
      // val:[3,2,3,4],
      rank_1:rank_1,
      rank_2:rank_2,
      rank_3:rank_3,
      rank_4:rank_4,
		}
	},
  props:{
    distance:Array,
    resultEstimateArry:Array
  },
	mounted(){
	},
  computed:{

  },
	methods:{
    _star(id,index){
      let imgs = jq('#imgs' + id).getElementsByTagName('img');
      let div = jq('#pin' + id);
      if(index >=9 ){
        div.className = " fl pin-div y-x"
      }else if( 8> index >=5){
        div.className = " fl pin-div l-h"
      }else{
        div.className = " fl pin-div h-g"
      }
      // console.log(id,index);
      for (var i = 0; i < index; i++) {
        var str = imgs[i].src;//先把每一个img元素的src取出来
        if(i % 2 === 0){
          str = rank_1;
        }else{
          str = rank_2;
        }
        imgs[i].src = str;//把替换后的字符赋值给src
      }
      for (var j = index; j < imgs.length; j++) {
        var str = imgs[j].src;//先把每一个img元素的src取出来
        if(j % 2 === 0){
          str = rank_3;
        }else{
          str = rank_4;
        }
        imgs[j].src = str;//把替换后的字符赋值给src
      }
    },

	}
}
</script>
<style lang ="less" scoped>
  /*林氏六音的样式*/
  .liu-table-print{
    margin-top: 70px;
  }
  /*综合评价*/
  .estimate{
    margin: 20px 0px 0px 37px;
    h3{
      font-size: 20px;
      margin-top: 10px;
    }
    ul{margin-top: 30px;}
    li{
      line-height: 70px;
      margin-top: 10px;
      .span{
        margin-right: 20px;
      }
      .star{
        margin-top: 13px;
      }
      .pin-div{
        width: 70px;
        height: 70px;
        
        border-radius: 5px;
        /*margin-top: 10px;*/
        margin-left: 10px;
        box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
        color:#fff;
        text-align: center;
        font-size: 22px;
        
      }
      /*优秀时的样式*/
      .y-x{
        background-color: #1bb394;
        &::before{
          content:'优秀';
          font-weight: 700;
        }
      }
      /*良好时的样式*/
      .l-h{
        background-color: #f8ab59;
        &::before{
          content:'良好';
          font-weight: 700;
        }
      }
      /*合格时的样式*/
      .h-g{
        background-color: #ccc;
        &::before{
          content:'欠佳';
          font-weight: 700;
        }
      }
      p{
        width: 300px;
        margin-left: 25px;
          background: #eee;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          margin-top: 20px;
          padding-left: 10px;
      }
    }
    
  }
</style>