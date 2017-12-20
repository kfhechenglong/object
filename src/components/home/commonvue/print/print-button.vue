<template>
  <div>
    <div class="affirm"  @click="print">
      本地打印
    </div>
    <div v-if="show" v-show="IP" @click.stop="upload" class="upload">
      扫码下载
    </div>
    <div @click.stop="closePrint" class="close">
      关闭
    </div>
    <!-- <ul>
      <li v-for="ele in imgurl">
        <img :src="ele" alt="">
      </li>
    </ul> -->
  </div>
</template>
<script>
import util from './../../../../common/util.js'
import {mapState} from 'vuex'
export default{
	data(){
		return{
      imgurl:[]
		}
	},
  props:{
    show: {
        type: Boolean,
        default: true
      },
      // base pages print
    prints:{
      type:Boolean,
      default:true
    },
    ptintArray:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
	created(){
	},
  computed:{
    ...mapState(['IP','isToPrintBase'])
  },
	methods:{
    print(){
      const next = ()=>{
        // 调用系统打印
        // util.print('#print-warp');
        // 生成base64编码，发送至服务器
        const toImg = ()=>{
          let a = ()=>{
            return new Promise((resolve,reject) =>{
              if(this.prints !== true){//档案管理界面中的打印
                const length = this.ptintArray.length;
                const base = this.isToPrintBase;
                if(length > 0 && base){
                //当前学生有测试报告可以打印，同时可以打印基本学生信息
                  util.canvas2html('info_print',this,null,1).then(()=>{
                    for (let i = 0; i < length; i++) {
                      util.canvas2html('toimg'+i,this,null,length+1).then(()=>{
                        if(i === length-1){resolve()}
                      })
                    }
                  })
                }else if(base && length === 0){
                //当前学生没有测试报告可以打印，或者不选择测试报告，则可以打印基本学生信息
                  util.canvas2html('info_print',this,null,1).then(()=>{resolve()});
                }else if(length > 0 && !base){
                  // 只选择测试报告，不选择个人信息打印
                  for (let i = 0; i < length; i++) {
                    util.canvas2html('toimg'+i,this,null,length).then(()=>{
                      if(i === length-1){resolve()}
                    })
                  };
                }
              }else{//单个报告单的打印
                util.canvas2html('toimg',this,null).then(()=>{resolve()})
              }
            })
          };
          a().then((res)=> {
                  msgTipsSuccess(this,"打印信息已发送完毕！");
                }).catch((err) =>{
                  msgTipsErr(this,"打印信息发送失败！");
                });
        }
        util.clearPrintData(this,toImg);
      }
      // 打印前先判断打印机是否在线
      util.getPrint(this,next);
      return;
    },
    closePrint(){
      this.$emit('close',false);
      this.showPrint = false;
    },
    upload(){
      this.$emit('code',true)
    }
	}
}
</script>
<style lang ="less" scoped>
	/****打印预览样式****/ 
.affirm,.close,.upload{
    position: absolute;
    right: -33px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
  }
  .affirm{
    background-color: #13ce66;
    top:140px;margin-top: 20px;
    &:hover{
      background-color:#22c6c6;
    }
  }
  .upload{
    background-color: #24c5c9;
    top:220px;
    &:hover{
      background-color: #1bb394;
    }
  }
  .close{
    background-color: #f7ba2a;
    top:100px;
    &:hover{
      background-color:red;
    }
  }
</style>