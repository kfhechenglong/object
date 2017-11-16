<template>
<div>
  <div id="print-tone" v-if="showPrint" :class="{'visibility':hidden}">
    <div id="print-warp">
      <div class="fiexd-w">
        <div class="print-warp">
        	<div class="print-tone clearfix" id="toimg">
            <!-- 打印的头部样式 -->
            <printHeader :info="info"></printHeader>
            <!-- 打印的内容样式 -->
            <printContent ref="print" :tableHeader="tableHeader" :resultData="resultData" :distance="distance" :resultEstimateArry="resultEstimateArry" :time="time"></printContent> 
            <!-- 打印的底部样式 -->
            <printFooter :info="info"></printFooter>
          </div>
        </div> 
        <!-- 打印及关闭按钮 -->
        <printButton :show="showQQCode" @close="closePrint" @code="codeQQ"></printButton>
      </div>
    </div> 
  </div>
  <div v-if="showQQVisible">
    <codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
  </div>
</div>
</template>
<script>
import util from './../../../common/util.js'
// import Imgs from './printstar.vue'
import printHeader from './print/print-header.vue'
import printContent from './print/printliu-content.vue'
import printFooter from './print/print-footer.vue'
import printButton from './print/print-button.vue'
import codeQQ from'./codeQQ/codeQQ.vue'
import {mapState,mapMutations} from 'vuex'
export default{
  components:{
    // Imgs,
    printHeader,
    printContent,
    printFooter,
    printButton,
    codeQQ
  },
	data(){
		return{
      showPrint:false,
      hidden:false,
      showQQVisible:false,
      tableTr : ['识别率','混淆'],
      time:null,//生成二维码时间戳
		}
	},
  props:{
    showQQCode:{
      type:Boolean,
      default:true
    },
    tableHeader:null,
    resultData:null,
    info:null,
    distance:Array,
    resultEstimateArry:Array
  },
	mounted(){
   // console.log(this.info)
	},
  computed:{
    codeInfo:function(){//生成二维码的信息
            return {'time':this.time,'type':null,'user_id':null,'file':'ceshi','id':null}
        }
  },
	methods:{
    _isToPrint(flag){
      this.hidden = false;//默认显示打印界面
      this.showPrint = true;//显示打印预览
      if(flag){
        this.hidden = true;//隐藏打印界面
      }
      this.time = parseInt(new Date().getTime());
      this.$store.commit('getter_code_time',this.time);
      let dowork = ()=>{
        return new Promise((resolve,reject) =>{
          setTimeout(() =>{
            this.$refs.print._ToShowStar();
            if(flag){
              resolve()
            }
          },50);
        })
      };
      dowork().then((res)=> {
        // 生成图片
        return util.canvas2html('toimg',this,this.time);
      }).then((res)=> {
        // 显示二维码
        return new Promise((resolve,reject) =>{
          this.showQQVisible = true;
          setTimeout(()=>{
             this.$refs.code.useqrcode();
           },50);
          resolve()
        })
      }).catch((err) =>{
        console.log(err);
      })
    },
    closePrint(e){//接收关闭信息
      this.showPrint = e;
      this.$store.commit('getter_code_time','');
    },
    codeQQ(e){
      // 显示二维码
      let showCode = ()=>{
        return new Promise((resolve,reject) =>{
          // 显示二维码
          this.showQQVisible = e;
          this.$store.commit('code_api','bg');
          resolve();
        })
      };
      showCode().then(()=>{
        return util.canvas2html('toimg',this,this.time);
          //在dom渲染完成后，延迟拍照
      }).then(() =>{
        return new Promise((resolve,reject) =>{
          setTimeout(()=>{
            this.$refs.code.useqrcode();
          },50);
        })
      }).catch((err) =>{
        console.log(err);
      })
    },
    _closeCodeQQ(e){//下载按钮，二维码关闭时的函数
      this.showQQVisible = false;
      if(!this.showQQCode){//档案中关闭扫码时，清空打印内容和时间戳
        this.showPrint = e;
        this.$store.commit('getter_code_time','');
      }
    },
    // showCode(){//点击下载报告显示二维码
    //   // this.$refs.code.dialogQQVisible = true;
    //   this.showQQVisible = true;
    //   setTimeout(()=>{
    //      this.$refs.code.useqrcode();
    //    },50);
    // },
	}
}
</script>
<style lang ="less" scoped>

  /*林氏六音的样式*/
  .liu-table-print{
    margin-top: 70px;
  }
</style>