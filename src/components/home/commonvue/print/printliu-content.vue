<template>
    <content class="print-content clearfix">
      <div class="tone-table">
        <table class="liu-table-print">
          <tr>
            <td v-for="item,index in tableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td"><span>{{item}}</span></td>
          </tr>
          <tr v-for="val,index1 in distance">
          <!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
          <!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
            <td v-for="item,index2 in tableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
              <span v-if="index2 == 0">{{val}}</span>
              <span v-if="resultData[1][item] && resultData[1][item][val]">
                <span v-if="resultData[1][item][val]['success'] >= 2 ">{{'√'}}</span>
                <span v-else-if="resultData[1][item][val]['false'] >= 2 ">{{'×'}}</span>
                <span v-else>{{"—"}}</span>
              </span>
            </td>
          </tr>
        </table>
        <!-- <imgs ref="imgs" :distance="distance" :resultEstimateArry="resultEstimateArry"></imgs> -->
        <div class="last-l-t clearfix">
          <span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
          <em class="fl">{{userInfo}}</em>
      </div>
      </div>
    </content>
</template>
<script>
import util from './../../../../common/util.js'
import Imgs from './printstar.vue'
export default{
  components:{
    Imgs
  },
	data(){
		return{
		}
	},
  props:{
    tableHeader:null,
    resultData:null,
    info:null,
    distance:Array,
    resultEstimateArry:Array,
    time:null
  },
	mounted(){
	},
  computed:{
     userInfo:()=>{// 获取数据
      return sessionStorage.getItem('textarea');
    },
  },
	methods:{
    _ToShowStar(){
      // 显示小星星评价
      // this.$nextTick(function(){
        // let length = this.distance.length;
        // for (var i = 0; i < length; i++) {
        //   let star = this.resultEstimateArry[i];
        //   this.$refs.imgs._star(i,star);
        // }
      // })
      // console.log(this.time)
      // setTimeout(() =>{
      //   util.toImg('toimg',this,this.time);      
      // },100)
    }
	}
}
</script>
<style lang ="less" scoped>
	/****打印预览样式****/ 
  .print-tone{
    .print-content{margin-top: 20px;}
    .tone-table{
        margin:0px auto;
        margin-top: 20px;
        width: 100%;
        height: 170px;
        table{
          width: 100%;
          border-collapse: collapse; 
        }
        /*表头背景色*/
        .headerbg{
          background-color: #eef1f6;
        }
        .gray{
          background-color: #eee;
        }
        .last-l-t{
        /*margin-left:70px;*/
        margin-top:30px;
          em{
            width:375px;
            max-width:500px;
          }
        }
        td,th{
          box-sizing: border-box;
          text-align: center;
          padding:0px;
          border: 1px solid #ccc;
          width: 50px;
        }
        tr{
          height: 45px;
        }
        /*评价*/
        .star{
          margin-top: 5px;
          .jianyi{
            margin-top: 5px;
          }
          i{margin-left: 10px;}
          em{width: 112px;/*text-align: right;*/}
        }
      }
    /*表格的排列样式*/
    .mormTable{
      width: 45%;
      float: left;
      &:nth-child(2n){
        margin-left: 50px;
      }
    }
  }
</style>