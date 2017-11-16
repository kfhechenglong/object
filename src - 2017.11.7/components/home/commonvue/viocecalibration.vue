<template>
  <div class="v-x">
    <el-dialog
      :close-on-click-modal="closeModeal"
      :close-on-press-escape="closeModeal"
      :show-close="closeModeal"
      title="提示"
      custom-class="dialogClass"
      :visible.sync="tips_voice"
      top="35%"
      @close="close"
      :before-close="cancel">
        <span v-if="firstTips">请先校准声音！</span>
        <!-- <span v-if="secondTips">您校准的声音强度不符合要求，请重新校准！</span> -->
        <span v-else-if="secondTips && !showProgress">
          <p style="margin-bottom: 10px;font-weight:700;">您校准的声音强度不符合要求,请选择校准！</p>
          <p style="margin-bottom: 10px;color:red">若不校准声音，您将无法进行相关测试！</p>
          <p>在校准时，请将设备放到正确位置,然后点击&nbsp;<strong style="font-weight:700;font-size:16px;">开始校准</strong>！</p>
        </span>
        <span v-else-if="headerStart">
          <p>在校准时，请将设备放到正确位置,然后点击&nbsp;<strong style="font-weight:700;font-size:16px;">开始校准</strong>！</p>
        </span>
        <span v-else-if="!hasCal_data && percentProgress == 100">恭喜您，声音校准完成！</span>
        <span v-else-if="showProgress"> 
          <p style="margin-bottom: 10px;">当前声音校准进度！</p>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="percentProgress" status="success"></el-progress>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="nextStepone" v-if="firstTips">确 定</el-button> 
          <el-button type="primary" @click="cancel" v-if="!hasCal_data && percentProgress == 100">确 定</el-button>
          <!-- <el-button type="primary" @click="nextSteptwo" v-if="secondTips">确 定</el-button> -->
          <el-button  @click="cancel" v-if="secondTips && !showProgress">取 消</el-button>
          <el-button type="primary" @click="nextStepthree" v-if="secondTips && !showProgress">开始校准</el-button>
          <el-button type="primary" @click="_headertostart" v-if="headerStart">开始校准</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
var timer ;
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
      headerStart:false
		}
	},
	mounted (){
    // this.flaga();
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
    flaga:function () {
      // this.closeModeal = false;
      this.showProgress = false;
      if(this.hasCal_data === "null"){
        this.tips_voice = true;
        this.firstTips = true;
      } else if(this.hasCal_data === "error"){
        this.tips_voice = true;
        this.firstTips = false;
        this.secondTips = true;
        // this.thirdTips = true;//直接提示信息
      } else if(this.hasCal_data == "false"){
        // this.tips_voice = false;
      }
    },
    nextStepone(){
      this.firstTips = false;
      this.closeModeal = true;
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
    },
    nextStepthree(){
      this.percentage = 0;
      this.closeModeal = false;//校准时，禁止关闭窗口
      this.$store.commit('progress_Clear');
      this.showProgress = true;
      var argument = this.wskt.wstosper('cal','');
        websocket.send(JSON.stringify(argument));
    },
    toCalibration(){//点击人工校准时的函数
      this.percentage = 0;
      this.$store.commit('progress_Clear');
      this.firstTips = false;
      this.secondTips = false;
      this.showProgress = false;
      this.closeModeal = true;
      this.tips_voice = true;
      this.headerStart = true;
    },
    _headertostart(){//点击人工校准时的函数
      this.headerStart = false;//切换进度条界面
      this.$store.commit('progress_Clear');
      this.showProgress = true;
      this.closeModeal = false;//校准时，禁止关闭窗口
      var argument = this.wskt.wstosper('cal','');
        websocket.send(JSON.stringify(argument));
    },
    close(){

    }
  }
}
</script>
<style lang ="less">
div .dialogClass{
    width: 450px;
  }
	
</style>