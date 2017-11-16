<template>
  <div style="height:94%;">
  <!-- <div id="main"> -->
    <!-- 头部信息 -->
    <!-- <ele-header></ele-header> -->
    <!-- 个人档案 -->
    <!-- <div class="main clearfix"> -->
      <!-- <mainTitle></mainTitle> -->
      <el-col :span="6" class="main-left">
        <div class="left-main">
          <ele-dang>档案</ele-dang>
        </div>
      </el-col> 
      <el-col :span="18" class="clearfix main-right">
        <div class="right-main clearfix">
          <ul class="nav clearfix" id="main-nav" style="float:left">
            <!-- 基本信息 -->
            <p class="dn">档案详情</p>
            <li v-bind:class="['base' == baseActive?'active':'']" @click="addActive('base')"><router-link :to="{name:'基本信息',query:{'id':studyID}}"><i class="fa fa-user"></i>基本信息</router-link></li>
            <!-- 病历档案 -->
            <li v-bind:class="['bingli' == baseActive?'active':'']" @click="addActive('bingli')"><router-link :to="{name:'病历档案',query:{'id':studyID}}" name="bingli"><i class="fa fa-hand-o-down"></i> 病历档案</router-link></li>
            <!-- 听力学检查档案 -->
            <li v-bind:class="['tingli' == baseActive?'active':'']" @click="addActive('tingli')"><router-link :to="{name:'听力档案',query:{'id':studyID}}"  name="tingli"><i class="fa fa-cubes"></i>听力学检查档案</router-link></li>
            <!-- 精细化评估档案 -->
            <li v-bind:class="['pinggu' == baseActive?'active':'']" @click="addActive('pinggu')"><router-link :to="{name:'评估档案',query:{'id':studyID}}"  name="pinggu"><i class="fa fa-language"></i>精细化评估档案</router-link></li>
          </ul>
        </div>
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </el-col>
    <!-- </div> -->
    <!-- <footervue> -->
    <!-- </footervue> -->
  <!-- </div> -->
  </div>
</template>

<script>
// 引入头部组件
// import Header from '../../header/header'
import Dang from './dangan/dangan'
// import Footervue from './../commonvue/footer.vue'
// import MainTitle from './../commonvue/main-title.vue'
import {mapState} from 'vuex'
export default {
  name: 'main',
  // 注册组件
  components : {
    // 'ele-header' : Header,
    'ele-dang' : Dang,
    // Footervue,
    // MainTitle
  },
  data() {
    return {
      show : true,
      id:'2'
    }
  },
  computed:{
    ...mapState(['baseActive','studyID']),
  },
  created(){
    // 默认导航样式为基本信息导航
    this.$store.commit('isActive','base');
  },
  methods : {
    // 动态绑定导航切换样式
    addActive:function(name){
      this.$store.commit('isActive',name);
    },
    gohome(){
      this.$router.push({path:'/home'})
    }
  }
}
</script>

<style scoped lang="less">
.main{
  // padding:15px 10px;
  // height:calc(~"100% - 140px");
  // margin:0 auto;
  // max-width:1800px;
  .main-left,.main-right{
    height:100%;
  }
  .main-left{
    max-width:300px;
  }
  .main-right{
    padding-left:5px;
    // width:81.25%;
    width: calc(~"100% - 300px");
  }
  ul,li{
    list-style:none;
  }
  a{
    text-decoration: none;
    display:inline-block;
  }
}
.left-main{
  height:100%;
}
.left-main,.right-main{
    /*margin:20px ;*/
    background-color: #fff;
    border-top: 4px solid #e7eaec;
  }
  .right-main{
  border-bottom:1px solid #e7eaec;
  }
.right-main ul{
  margin:0px;
  height:70px;
  padding-left:20px;
  .dn{
    float:left;margin:20px 20px 10px 10px; font-size:24px;
  }
  li{
    margin:10px 20px 10px 10px;
    float: left;
    background-color: #eee;
    height:45px;
    // border:1px solid #eee;
    box-shadow: 3px 3px 2px #ccc;
    border-radius:7px;
    line-height: 45px;
    text-align:center;
    cursor:pointer;
    a{padding:0px 10px;
      color:#337ab7;
    }
  }
.active{
    background-color: #337ab7;
    a{
      color:#fff;
    }
  }
}
</style>
