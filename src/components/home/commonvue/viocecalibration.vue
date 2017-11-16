<template>
  <div class="v-x">
    <el-dialog
      :close-on-click-modal="closeModeal"
      :close-on-press-escape="closeModeal"
      :show-close="closeModeal"
      title="声场校准"
      custom-class="dialogClass"
      :visible.sync="tips_voice"
      top="25%"
      @close="close"
      :before-close="cancel">
        <div v-show="hiddenEchart" class="v-chart" id="myVioceChart"></div>
        <div class="v-content">
          <span v-if="firstTips">请先校准声音！</span>
          <span v-else-if="secondTips && !showProgress">
            <p style="margin-bottom: 10px;font-weight:700;">您校准的声音强度不符合要求,请选择校准！</p>
            <p style="margin-bottom: 10px;color:red">若不校准声音，您将无法进行相关测试！</p>
            <p>在校准时，请将设备放到正确位置,然后点击&nbsp;<strong style="font-weight:700;font-size:16px;">开始校准</strong>！</p>
          </span>
          <span v-else-if="headerStart">
            <p>在校准时，请将设备放到正确位置,然后点击&nbsp;<strong style="font-weight:700;font-size:16px;">开始校准</strong>！</p>
          </span>
          <span v-else-if="!hasCal_data && percentProgress == 100">声音校准完成！</span>
          <span v-else-if="showProgress"> 
            <p style="margin-bottom: 10px;">当前声音校准进度！</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="percentProgress" status="success"></el-progress>
          </span>
        </div>
        <span slot="footer" class="dialog-footer">
        <!-- 强度未校准 按钮-->
          <el-button type="primary" @click="nextStepone" v-if="firstTips">确 定</el-button> 
        <!-- 强度校准完成按钮，且校准符合要求 -->
          <el-button type="primary" @click="cancel" v-if="!hasCal_data && percentProgress == 100">确 定</el-button>
          <!-- 强度校准完成,不符合要求时按钮 -->
          <el-button  @click="cancel" v-if="secondTips && !showProgress">取 消</el-button>
          <el-button type="primary" @click="nextStepthree" v-if="secondTips && !showProgress">开始校准</el-button>
          <!-- 正常开始校准按钮 -->
          <el-button type="primary" @click="_headertostart" v-if="headerStart">开始校准</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
var timer ;
// 引入 ECharts 主模块
const echarts = require('echarts');
// 引入饼状图
// require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
let myChart = "";
import {mapState,mapGetters,mapMutations} from 'vuex'
export default{
	data(){
		return{
      tips_voice:false,
      firstTips:false,
      secondTips:false,
      closeModeal:true,
      showProgress:false,
      header:false,
      percentage : 0,
      oneFn:true,
      headerStart:false,
      barData:[],
      timerInterval:null,
      hiddenEchart:false,
      // percentProgress:0
		}
	},
	mounted (){
  },
  watch:{
    initial_value(){
      clearTimeout(timer);
      timer = setTimeout(() =>{
        if(this.oneFn){
          this.oneFn = false
          this.flaga();
        }else if(this.percentage === 100){
          this.flaga();
        }
      },100);
    }
  },
  computed:{
    ...mapState(['initial_value','progress']),
    ...mapGetters(['hasCal_data']),
    // 校准进度百分比
    percentProgress:{
      get:function(){
        this.percentage = +((this.progress.length/13)*100).toFixed(0);
          if(this.percentage > 100){
            this.percentage = 100;
          }
        return isNaN(this.percentage) ? 0 : this.percentage;
      },
      set:function(value){
        this.progress.length = value;
      }
    }
  },
  methods : {
    setEchart(){
      this.$nextTick(() =>{
        myChart = echarts.init(document.getElementById('myVioceChart'));
        this.barData = [];
        for (var i = 0; i < 13; i++) {
            this.barData.push({"value":null,"itemStyle":{'normal':{'color':"#ccc",'borderColor':'#ccc'}}})
        }
        this.myEchart();
      });
    },
    setRandomValue(){
      const fn = ()=>{
        this.barData = [];
        const len = this.progress.length;
        const data = this.progress;
        const itemStyle = {'normal':{
          'color':"#13ce66"
        }};
        const itemStyleError = {'normal':{
          'color':"red",
          'borderColor':'red'
        }};
        for (let i = 0; i < len; i++) {
          let num = data[i].db;
          num -= num  % 5;
          (0 < num-5 && num-5 < 120) ? this.barData.push({"value":num,"itemStyle":itemStyle}) : 
          this.barData.push({"value":120,"itemStyle":itemStyle});
        }
        for (let i = len; i < 13; i++) {
            i === len ? this.barData.push(parseInt(Math.random() * 120)) : this.barData.push(null);
        }
        this.myEchart();
      };
      this.timerInterval = true;
      const time = ()=>{
        if(!this.timerInterval)return;
        fn();
        setTimeout(()=>{
          time();
        },100);
      };
      time();
    },
    myEchart(){
      const xHZ = ['125','250','500','750','1000','1500','2000','3000','4000','5000','6000','8000','9000'];
      var lineData = [];
      for (var i = 0; i < 13; i++) {
          lineData.push(120);
      }
      var option = {
          backgroundColor: '#0f375f',
          xAxis: {
            name:"Hz",
            nameLocation:'end',
            data: xHZ,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            }
          },
          yAxis: {
            name:'Db',
            nameLocation:'end',
            show:true,
            splitLine: {show: false},
            axisLine: {
              lineStyle: {
                  color: '#ccc',
                  width:2
              }
            },
            axisLabel:{
              show:true,
              interval:0
            }
          },
          series: [
           {
              name: 'bar',
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                  normal: {
                      barBorderRadius: 5,
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#14c8d4'},
                              {offset: 1, color: '#43eec6'}
                          ]
                      ),
                      borderColor:'#43eec6'
                  }
              },
              data: this.barData,
              label:{//设置标签
                normal:{
                  show:true,
                  position:'top'
                }
              },
          },
          {
              name: 'line',
              type: 'bar',
              barGap: '-100%',
              barWidth: 10,
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: 'rgba(20,200,212,0.5)'},
                              {offset: 0.2, color: 'rgba(20,200,212,0.3)'},
                              {offset: 1, color: 'rgba(20,200,212,0)'}
                          ]
                      )
                  }
              },
              z: -12,
              data: lineData
          },
          {
              name: 'dotted',
              type: 'pictorialBar',
              symbol: 'rect',
              itemStyle: {
                  normal: {
                      color: '#0f375f'
                  }
              },
              symbolRepeat: true,
              symbolSize: [12, 4],
              symbolMargin: 1,
              z: -10,
              data: lineData
          }
        ]
      };
      myChart.setOption(option)
    },
    flaga:function () {
      this.showProgress = false;
      if(this.hasCal_data === "null"){//开机没有校准数据时,要求进行校准
        this.tips_voice = true;
        this.firstTips = true;
      } else if(this.hasCal_data === "error"){
        // 校准的结果不符合要求时
        this.tips_voice = true;
        this.firstTips = false;
        this.secondTips = true;
        this.headerStart = false;
        this.hiddenEchart = true;
        this.setEchart();
      } else if(this.hasCal_data == "false"){
        // this.tips_voice = false;
      }
    },
    nextStepone(){//第一步，请先校准声音
      this.firstTips = false;
      this.closeModeal = true;
      // 打开第二步，开始校准
      this.headerStart = true;
      this.hiddenEchart = true;
      this.setEchart();
    },
    nextSteptwo(){
      this.secondTips = false;
      this.closeModeal = true;
    },
    cancel(){//关闭弹框时
      this.tips_voice = false;
      this.secondTips = false;
      this.percentage = 0;
      this.showProgress = false;
      this.headerStart = false;

      this.timerInterval = null;
      this.hiddenEchart = false;
      console.log('cancel')
    },
    nextStepthree(){//校准不符合要求时的，开始校准
      this.percentage = 0;
      this.toStart();
    },
    toCalibration(){//点击声场校准时的函数
      this.percentage = 0;
      this.$store.commit('progress_Clear');
      this.firstTips = false;
      this.secondTips = false;
      this.showProgress = false;
      this.closeModeal = true;
      this.tips_voice = true;
      this.headerStart = true;
      this.hiddenEchart = true;
      this.setEchart();
    },
    _headertostart(){//点击人工校准时的函数
      this.headerStart = false;//切换进度条界面
      this.toStart();
    },
    toStart(){
        this.$store.commit('progress_Clear');
        this.showProgress = true;
        this.closeModeal = false;//校准时，禁止关闭窗口
        this.setRandomValue();
        console.log('开始校准');
        // return;
        var argument = this.wskt.wstosper('cal','');
        websocket.send(JSON.stringify(argument));
    },
    close(){
      this.cancel();
      console.log('close')
    }
  }
}
</script>
<style lang ="less">
div .dialogClass{
    width: 700px;
    background: #0f375f;
    .el-dialog__body{
      color: #fff;
    }
  }
.v-x{
  .v-chart{
    width: 650px;
    height: 300px;
  }
  .v-content{
    span{display:block;}
    span,p{
      font-size: 16px;
      text-align: center;
    }
    strong{color:red;}
  }
}
</style>