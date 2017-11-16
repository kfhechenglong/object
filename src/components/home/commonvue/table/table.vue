<template>
  <div class="estimate clearfix">
      <h3 class="fl">
        综合评价：
      </h3>
      <ul class="fl">
        <li v-if="hasDistance['0.5']" class="clearfix">
          <span class="fl span">0.5米</span>
          <div class="star fl">
            <el-rate
              v-model="value5"
              disabled
              show-text
              text-color="#ff9900"
              text-template="{value}">
            </el-rate>
          </div>
          <p class="fl">
            <em>听力干预建议：</em>
            <i></i>
          </p>
        </li>
        <li v-if="hasDistance['1.0']" class="clearfix">
          <span class="fl span">1.0米</span>
          <div class="star fl">
            <el-rate
              v-model="value1"
              disabled
              show-text
              text-color="#ff9900"
              text-template="{value}">
            </el-rate>
          </div>
          <p class="fl">
            <em>听力干预建议：</em>
            <i></i>
          </p>
        </li>
        <li v-if="hasDistance['2.0']" class="clearfix">
          <span class="fl span">2.0米</span>
          <div class="star fl">
            <el-rate
              v-model="value2"
              disabled
              show-text
              text-color="#ff9900"
              text-template="{value}">
            </el-rate>
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

export default {
  props:{
    hasDistance:Array
  },
  data(){
    return {
      value2:2,
      value1:2,
      value3:2
    }
  },
  mounted(){
    
  },
  watch:{
    
  },
  computed:{
    
  },

  methods:{
    
  }
}
</script>

<style lang ="less" >
  /*综合评价*/
  .estimate{
    margin: 20px 0px 0px 37px;
    h3{
      font-size: 20px;
      margin-top: 10px;
    }
    li{
      line-height: 45px;
      .span{
        margin-right: 20px;
      }
      .star{
        margin-top: 13px;
      }
      p{
        width: 300px;
        margin-left: 25px;
          background: #eee;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          margin-top: 9px;
          padding-left: 10px;
      }
    }
    
  }
</style>
