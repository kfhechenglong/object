<template>
  <div id="main">
    <!-- 头部信息 -->
    <ele-header></ele-header>
    <!-- 个人档案 -->
    <div class="main clearfix">
      <mainTitle></mainTitle>
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
    <footervue>
    </footervue>
  </div>
</template>

<script>
// 引入头部组件 
import Header from '../../header/header'
import Footervue from './../commonvue/footer.vue'
import MainTitle from './../commonvue/main-title.vue'
export default {
  name: 'main',
  // 注册组件
  components : {
    'ele-header' : Header,
    Footervue,
    MainTitle
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less">
#main{
  height:100%;
}
.main{
  padding:15px 10px;
  height:calc(~"100% - 170px");
  margin:0 auto;
}
</style>
