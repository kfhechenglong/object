<template>
  <div id="main">
    <!-- 头部信息 -->
    <ele-header></ele-header>
    <!-- 个人档案 -->
    <div class="main clearfix">
        <el-col :span="24" class="clearfix main-right">
          <div class="right-main clearfix">
            <ul class="clearfix">
              <li class="first-li" @click="infoTable('gx')"><a><i class="fa fa-user"></i>个性化听辨</a></li>
              <li @click="infoTable('hs',2)"><a><i class="fa fa-hand-o-down"></i> 胡氏七组</a></li>
              <li @click="infoTable('ym')"><a><i class="fa fa-cubes"></i>韵母识别</a></li>
              <li @click="infoTable('sd')"><a><i class="fa fa-language"></i>声调识别</a></li>
              <li @click="infoTable('sm')"><a><i class="fa fa-language"></i>声母识别</a></li>
            </ul>
            <div class="back" @click="$router.go(-1);">
              <i class="fa fa-reply"></i>返回
            </div>
          </div>
        </el-col>
        <!-- <router-view></router-view> -->
        <ele-infotable ref="table" :flag="flag"></ele-infotable><!-- 学生列表组件 -->
    </div>
    <footervue>
    </footervue>
  </div>
</template>

<script>
// 引入头部组件
import Header from './header/header'
import infoTable from './home/linsly/infotable'
import util from'../../src/common/util'
import Footervue from './home/commonvue/footer.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'main',
  // 注册组件
  components : {
    'ele-header' : Header,
    'ele-infotable' : infoTable,
    Footervue
  },
  data() {
    return {
      show : true,
      isActive : 'base',
      // 页面跳转的标记
      flag:'a'
    }
  },
 computed:{
    ...mapGetters(['hasCal_data']),
  },
  methods : {
    // 动态绑定导航切换样式
    addActive:function(name){
        this.isActive = name;
    },
    infoTable (e,str){
      if(!window.adIsOnline){
        // util.isOnline(this);
        // return;
      }
      if(this.hasCal_data !==false){
        return;
      };
      this.flag = e;
      sessionStorage.setItem('test_id', JSON.stringify(str));
      this.$refs.table.showTable();
    }
  }
}
</script>

<style scoped lang="less">
#app{
  background-color: #f3f3f4;
  min-width: 1360px;
  height:100%;
}
#main{
  height:100%;
}
.main{
  padding:15px 10px;
  height:calc(~"100% - 140px");
  background-color: #1fa1b7;
 .main-right{
    height:100%;
  }
  ul,li{
    list-style:none;
  }
  a{
    text-decoration: none;
    display:inline-block;
  }
}
.right-main{
    width:1290px;
    height:700px;
    margin:3% auto 0;
    background-color: #ff9900;
    position: relative;
    .back{
      position: absolute;
      left:40px;
      top:40px;
      width:100px;
      height:50px;
      background-color: #bce2ff;
      border-radius:5px;
      cursor:pointer;
      line-height: 50px;
      text-align:center;
      &:hover{
        color:#fff;
      }
    }
  }
.right-main ul{
  width:930px;
  margin:0 auto;
  padding:150px 0px 0px 40px;
  li{
    width:240px;
    border-radius:10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
    text-align:center;
    cursor:pointer;
    background-color: #ffcc00;
    height:220px;
    line-height: 220px;
    margin:10px 55px 55px 0px;
    float: left;
    &.first-li{
      width:540px;
    }
    &:hover{
          a{
            color:#000;
          }
          background-color: #ffff00;
        }
    a{
      font-size: 34px;
      font-weight: 500;
      color:#fff;
    }
  }

}
// 媒体查询
@media screen and(max-width:1480px){
  // .right-main ul li{
  //   margin:10px 10px 10px 10px;
  // }
}
</style>
