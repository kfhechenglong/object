<template>
    <content class="print-content clearfix">
      <div class="clearfix">
      <div :class="[{'mormTable':hasMormTable(tableHeader)},'tone-table']" v-for="(tableHeader,valindex) in rederTable">
        <table>
          <tr>
            <td v-for="item,index in tableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td">{{item}}</td>
          </tr>
          <tr v-for="val,index1 in tableTr">
          <!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
          <!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
            <td v-for="item,index2 in tableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
              {{ index2 == 0 ? val :''}}
              <!-- 首先判断测试结果是否为空,空则不显示；结果为0不显示 -->
              <!-- 当行的值和列的值相等，且不为空时，显示当前词组正确的个数 -->
              <!-- 当行的值和列的值不相等，且不为空时，显示当前词组错误的个数 -->
              <span v-if=" (index1 === 0) && jieguo[item]">
                {{jieguo[item]['statistics']}}
              </span>
              <span v-if=" (index1 === 1) && jieguo[item]">
                <i v-for="ele in jieguo[item]['hasFalse']"><em v-if="ele != '—'">{{item}}/</em>{{ele}}<br></i>
              </span>
            </td>
          </tr>
        </table>
        <div class="star"  v-if="starValue[groupId[valindex]]">
          <div class="clearfix">
            <em class="fl">综合评价：</em>
            <div class="fl" :id="'imgs' + valindex">
              <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
              <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
              <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
              <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
              <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
            </div>
            <i v-if="starValue[groupId[valindex]].star_value">{{starValue[groupId[valindex]].star_value}}</i>
          </div>
          <div class="jianyi clearfix" v-if="starValue[groupId[valindex]].advise">
            <em class="fl">听力建议：</em>
            <i>{{starValue[groupId[valindex]].advise}}</i>
          </div>
        </div>
      </div>
      </div>
      <div class="last-l-t clearfix">
        <span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
        <em class="fl">{{userInfo}}</em>
      </div>
    </content>
</template>
<script>
import util from './../../../../common/util.js'
export default{
	data(){
		return{
      tableTr : ['识别率','混淆'],
      val:[3,2,3,4],
      rank_1:Options.rank_1,
      rank_2:Options.rank_2,
      rank_3:Options.rank_3,
      rank_4:Options.rank_4,
      groupId:[],
      rederTable:[]
		}
	},
  props:{
    jieguo:null,
    rederData:null,
    starValue:Object
  },
	mounted(){
	},
  computed:{
    userInfo:()=>{// 获取数据
      return sessionStorage.getItem('textarea');
    },
  },
	methods:{
    hasMormTable(str){
        return (str.length < 5 && (this.rederTable.length != 1))? true : false;
     },
    _ToShowStar(){
      // 处理表格数据
      this._toRederTableData()
      // 显示小星星评价
      this.$nextTick(function(){
        let length = this.rederTable.length;
        for (var i = 0; i < length; i++) {
          // 获取词组的类型id
          if(!this.starValue[this.groupId[i]]){continue;}
          let star = +this.starValue[this.groupId[i]].star;
          this._star(i,star*2);
        }
      })
    },
    _star(id,index){
      let imgs = jq('#imgs' + id).getElementsByTagName('img');
      // console.log(imgs);
      Common.printStar(index,imgs);
    },
    _toRederTableData(){
      let data = this.rederData;
      let rederTable = new Array;
      let groupId = new Array;
      for(let key in data){
        groupId.push(key);
        let keyItem = data[key];
        let empty = new Array;
        for(let val in keyItem){
          empty.push(val);
        }
        empty.unshift('');
        rederTable.push(empty);
      };
      this.groupId = groupId;
      this.rederTable = rederTable;
    },
	}
}
</script>
<style lang ="less" scoped>
	/****打印预览样式****/ 
    .print-content{margin-top: 20px;}
    .tone-table{
        float: left;
        margin:0px auto;
        margin-top: 10px;
        width: 100%;
        min-height: 180px;
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
        td,th{
          box-sizing: border-box;
          text-align: center;
          padding:0px;
          border: 1px solid #ccc;
          width: 50px;
        }
        tr{
          height: 35px;
        }
        /*评价*/
        .star{
          margin-top: 5px;font-size: 14px;
          margin-left: 0;
          .jianyi{
            margin-top: 5px;
          }
          i{margin-left: 10px;}
          /*em{text-align: right;}*/
        }
      }
      .last-l-t{
        /*margin-left:70px;*/
        margin-top:10px;
        }
    /*表格的排列样式*/
    .mormTable{
      width: 49%;
      float: left;
      &:nth-child(2n){
        margin-left: 10px;
      }
    }
</style>