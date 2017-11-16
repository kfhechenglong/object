<template>
  <div class="printer-progress">
    <el-dialog v-model="dialogPrinterPropressVisible" top="25%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div class="content clearfix">
        <h3>打印进度</h3>
        <p>
          当前打印进度：<span>{{hadPrint}}</span>/<em>{{doPrintCount}}</em>
        </p>
        <el-button :type="color" class="btn" @click="submit">{{msg}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from './../../../common/util.js'
import {mapState,mapGetters} from 'vuex'
export default{
	data(){
		return{
      dialogPrinterPropressVisible:false,
      msg:"取消打印",
      color:'danger'
		}
	},
  props:{
    doPrintCount:Number,
    hadPrint:Number
  },
	watch:{
    hadPrint:function(){
      if(this.doPrintCount === this.hadPrint){
        this.msg = "完成打印";
        this.color = 'info';
      }
    }
	},
  computed:{
    
  },
	methods:{
    show(){
      this.dialogPrinterPropressVisible = true;
      this.msg = "取消打印";
      this.color = 'danger';
    },
    close(){//关闭模态
    },
    submit(){//确认调换
      this.$emit('stopTask',false);
      this.dialogPrinterPropressVisible = false;
    }
	}
}
</script>
<style lang ="less">
@color:#20a0ff;
  .printer-progress{
    .el-dialog{
      margin-bottom: 0;
      border: 0 none;
      border-radius: 10px;
      width: 600px;
      .el-dialog__header{
        border: 0 none;
      }
      .el-dialog__body{
        border-radius: 10px;
        border:3px solid @color;
        max-height:450px;
      }
    }
    /*主要内容*/
    .content{
      h3{
        font-size: 24px;
        color:@color;
        text-align:center;
      }
      p{
        font-size: 20px;
        padding-left: 30px;
        margin: 15px 0;
        span{color:red;}
        em{color:blue;}
      }
      /*按钮*/
      .btn{
        float: right;
      }
      .select-warp{
        margin:0 auto;
        width: 230px;
      }
    }
  }
</style>