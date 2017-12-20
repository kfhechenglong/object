<template>
<div class="tinglituclass">
  <div class="ibox-content">
    <div style="height:calc(100% - 80px)">
      <showSvg ref="svg" :svgData="objZong"  :onlyDraw="true" :ear="ear"></showSvg>
    </div>
  <!-- 听力检测结果 -->
    <div class="row clearfix">
      <div  class="markData">
        <dl>
          <dt>测听设备：<span>{{canvasMarks.apparatus}}</span></dt>
          <dt>测听日期：<span>{{getTime}}</span></dt>
          <dt>配&nbsp;合&nbsp;度&nbsp;：<span>{{canvasMarks.degree}}</span></dt>
        </dl>
      </div>
        <div class="markData" style="width:30%;">
          <textarea class="form-control" rows="3" placeholder="备注：" readonly="readonly">{{canvasMarks.remark}}</textarea>
        </div>
        <div class="markData">
          <table>
              <thead>
                <tr>
                  <th>侧别</th>
                  <th>AC</th>
                  <th>BC</th>
                  <th>助听听阈</th>
                  <th>助听效果</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>左耳</td>
                  <td><span id="HTL_zuo" style="width:30px;" v-text:text="canvasMarks.ACL"></span></td>
                  <td><span id="BCL_zuo" style="width:30px;" v-text:text="canvasMarks.BCL"></span></td>
                  <td><span id="BCL_zuo" style="width:60px;" v-text:text="canvasMarks.LHTL"></span></td>
                  <td><span id="BCL_zuo" style="width:60px;" v-text:text="canvasMarks.LEffect"></span></td>
                </tr>
                <tr>
                  <td>右耳</td>
                  <td><span id="HTL_you" style="width:30px;" v-text:text="canvasMarks.ACR"></span></td>
                  <td><span id="BCL_you" style="width:30px;" v-text="canvasMarks.BCR"></span></td>
                  <td><span id="BCL_you" style="width:60px;" v-text="canvasMarks.RHTL"></span></td>
                  <td><span id="BCL_you" style="width:60px;" v-text="canvasMarks.REffect"></span></td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
        <!-- 听力检测结果 -->
    </div>
  </div>
</div>
</template>
<script>
import showSvg from'../../commonvue/svg.vue'
import {mapState,mapMutations,mapGetters} from'vuex'
export default{
  name: 'tingli',
  components: {
    showSvg
  },
  data () {
    return {
      ear:"RL"
    }
  },
  destroyed(){
  },
  computed:{
    ...mapGetters(['getTime']),
    ...mapState(['canvasMarks']),
  },
  props:{
      objZong:null,
  },
  mounted () {
    
  },
  methods: {
    drawyuan(flag){
      this.ear = this.objZong[0][0].order;
      this.$refs.svg.contrast(flag);
    }
  }
}
</script>

<style  lang="less" scoped>
.tinglituclass{
  width:100%;
  height: 100%;
  .text-center {
    display:inline
  }
 #youtu , #zuotu{
    float: left;
    height: calc(~"100% - 30px");
    height:100%;
  }
  #youer,#zuoEr{
    height:100%;
  }
  .form-control{
    width:90%;
    height: 75px;
    // border-radius:10px;
    padding-left:10px;
    padding-top:5px;
  }
  /*****备注样式******/ 
  .row{
    height:90px;
    margin-top:10px;
    .markData{
      float: left;
      margin-right: 20px;
      dl{margin:0px;}
      dl dt{line-height: 30px;}
      table{border-collapse: collapse;}
      th,td{
        text-align:center;
        border:0px none;
        border-left:1px solid #ccc;
        padding:3px 5px;
      }
      tr{
        border:1px solid #ccc;
      }
    }

  } 
  /**************/ 
  .ibox,.ibox-content{
    width:100%;
    height: 100%;
  }
}
</style>
