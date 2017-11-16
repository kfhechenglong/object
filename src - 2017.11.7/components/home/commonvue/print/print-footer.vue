<template>
  <footer  class="print-footer">
    <div class="clearfix">
      <span class="fl">测试者：</span>
      <div class="f-p fl">{{name}}</div>
    </div>
    <div class="clearfix" style="text-align:center;padding-left: 50px;">
      <p>{{infoJigou.full_name}}</p>
      <!-- <div class="f-p fl"></div> -->
    </div>
  </footer>
</template>
<script>
import util from './../../../../common/util.js'
import {jgshow} from '../../../../api/api'
export default{
	data(){
		return{
      infoJigou:''
		}
	},
  props:{
    // info:null
  },
	mounted(){
   this.jigouInfo()
	},
  computed:{
    name:() =>{
      return JSON.parse(sessionStorage.getItem('user'));
    },
  },
	methods:{
    jigouInfo(){
      var that = this,
        institution = {institution:sessionStorage.getItem('user')}
      this.$ajax.post(`/operator/jgshow`,institution).then(function(response){
        // console.log(response)
        if(response.code === 200) {
          that.infoJigou = response.data;
        } else{
          that.msgTipsSuccess(this,'信息获取出现错误！')
        }
      }).catch((err)=>{
        alert(err)
      })
    },
	}
}
</script>
<style lang ="less" scoped>
</style>