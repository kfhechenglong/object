<template>
    <header class="print-title">
      <h2>{{current_gameName}}测试报告</h2>
      <ul class="clearfix">
        <li  class="li-name">
          <span>姓名：</span>
          <div>{{user_Info['name']}}</div>
        </li>
        <li class="li-in">
          <span>性别：</span>
          <div>{{user_Info['gender']}}</div>
        </li>
        <li>
          <span>生日：</span>
          <div>{{user_Info['birth']}}</div>
        </li>
        <li>
          <span>日期：</span>
          <div v-if="current_gameName == '助听听阈'">{{getTime}}</div>
          <div v-else>{{info['time']}}</div>
        </li>
      </ul>
      <div class="sb clearfix">
        <p class="fl">测听设备佩戴：</p>
        <span class="fl">左耳：{{userInfo.eq_left}}</span>
        <span class="fl sb-r">右耳：{{userInfo.eq_right}}</span>
      </div>
      <div v-if="current_gameName == '助听听阈'" class="ear zu clearfix">
        <p class="fl">测试方法：<span>{{canvasMarks.testmodel}}</span></p>
        <p class="fl">给声方法：<span>{{canvasMarks.getmodel}}</span></p>
        <p class="fl">配合度：<span>{{canvasMarks.degree}}</span></p>
        <p class="fl">测试耳：<span>{{canvasMarks.radioEar}}</span></p>
        <p class="fl">测试音：<span>{{tonetype}}</span></p>
      </div>
      <div v-else class="ear clearfix">
        <p class="fl">测试耳：{{info['ear']}}</p>
        <p class="fl">测试环境：{{info['environment']}}</p>
      </div>
    </header>
</template>
<script>
import util from './../../../../common/util.js'
import {mapState,mapGetters} from 'vuex'
export default{
	data(){
		return{
      testResults:{},
      time:''
		}
	},
  props:{
    info:null
  },
	mounted(){
	},
  computed:{
    ...mapState(['canvasMarks']),
    ...mapGetters(['getTime','tonetype']),
    userInfo:()=>{// 获取数据
      const productName = JSON.parse(sessionStorage.getItem('user_text'));
      try{
        if(productName.eq_left.string){
            return {
              eq_right:productName.eq_right.string,
              eq_left:productName.eq_left.string
            }
        }else{
          return {
              eq_right:'无',
              eq_left:'无'
            }
        }
      } catch(err){
        alert('助听设备格式不正确！')
      }
    },
    user_Info:()=>{// 获取数据
      let user = JSON.parse(sessionStorage.getItem('user_info'))
      let birth = user['birth'];
      birth = util.dateToggle('年','月','日',birth);
      return {'birth':birth,'name':user['user_name'],'gender':user['gender']};
    },
    // 获取当前的测试名称
    current_gameName:()=>{
      let test_id = JSON.parse(sessionStorage.getItem('test_id'));
      return util.getType(test_id);
    },
  },
	methods:{

	}
}
</script>
<style lang ="less" scoped>
	/****打印预览样式****/ 
</style>