<template>
  <div class="codeQQ">
    <el-dialog title="扫一扫" top="30%" v-model="dialogQQVisible"  :close-on-click-modal="false" @close="close">
      <div class="content">
        <!-- <img :src="code" height="200" width="200" alt="二维码"> -->
        <div id="qrcode" style="width:210px; height:210px; margin-top:15px;"></div>
        <p  style="font-size: 13px;">地址：{{code}}</p>
        <p style="color:#6ec356;font-size: 16px;">使用说明：</p>
        <p style="color:#6ec356;font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机与测听系统须在同一网络中</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from './../../../../common/util.js'
import {mapState,mapMutations} from'vuex'
export default{
  components:{
    
  },
	data(){
		return{
      dialogQQVisible:true,
      ip:'',
      showQQCodeFalg:false,
      api:''
		}
	},
  props:{
    info:null
  },
	mounted(){
	},
  computed:{
    ...mapState(['IP']),
    code:function(){
      // return 'http://'+this.ip+':'+apiport+'/aamis/be/Public/'+this.$store.state.codeApi;
      if(apiport == '80'){
         return 'http://'+this.IP+'/'+this.$store.state.codeApi+'/';
      }
      return 'http://'+this.IP+':'+apiport+'/'+this.$store.state.codeApi+'/';
    },
    codeData:function(){
      let imgs_id = this.info.imgs_id > 0 ?this.info.imgs_id :null;//听力图片上传下载
      let data = 'time='+this.info['time']+'&user_id='+this.info['user_id']+'&file='+this.info['file']+'&type='+this.info['type']+'&id='+this.info['id']+'&imgs_id='+imgs_id;
      console.log(data)
      let base64 = util.toBase64(data)
      return base64;
    },
  },
	methods:{
    close(){
      this.$emit('close',false);
    },
    useqrcode(a,b){
      let data1 = this.codeData;
      let code = this.code
      if(a && b){
        data1 = a;
        code = b;
      }
      // debugger
      this.$ajax.codePost(``,{'q':data1}).then((response) =>{
      }).catch((err) =>{
        console.log(err)
      });
      let qr = jq('#qrcode');
      // if(qr.hasChildNodes()){//判断是否有已经生产的二维码，如果有则删除
      //   let childs = qr.childNodes
      //   for (var i = childs.length-1; i >=0 ; i--) {
      //    qr.removeChild(childs[i]) 
      //   }
      // }
      let qrcode = new this.QRCode(qr, {
        width : 210,
        height : 210,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : this.QRCode.CorrectLevel.H
      });
      console.log(code)
      qrcode.makeCode(code);
    }
	}
}
</script>
<style lang ="less">
	/****二维码****/ 
  .codeQQ{
    .el-dialog{
      width: 400px !important;
      height: auto!important;
    }
    .content{
      margin:0px auto;
      width: 210px !important;
    }
  }
</style>