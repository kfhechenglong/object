<template>
  <div id="main">
    <!-- 头部信息 -->
    <ele-header></ele-header>
    <!-- 个人档案 -->
    <div class="main clearfix">
        <el-col :span="24" class="clearfix main-home">
          <div class="home-r-m clearfix">
            <ul class="nav-left clearfix fl">
              <div class="titleIMG"></div>
              <li v-bind:class="['danganlist' == isActive?'active':'']"><router-link :to="{name:'档案列表'}" @click="addActive('danganlist')">档案列表</router-link><i @click.prevent="tips($event,0)" class="fa fa-question-circle"></i></li>
              <li v-bind:class="['ystest' == isActive?'active':'']"><router-link :to="{name:'统计分析'}"  @click="addActive('ystest')" >统计分析</router-link><i @click.prevent="tips($event,5)" class="fa fa-question-circle"></i></li>
              <li v-bind:class="['gametest' == isActive?'active':'']"><router-link :to="{name:'高级功能'}" name="gametest" @click="addActive('gametest')"> 批量功能</router-link><i @click.prevent="tips($event,8)" class="fa fa-question-circle"></i></li>
            </ul>
            <ul class="nav-right clearfix fl">
              <div class="titleIMG"></div>
              <li><a @click="infoTable('liu',1)">林氏六音</a><i @click="tips($event,1)" class="fa fa-question-circle"></i></li>
              <!-- 助听听阈评估 -->
              <li><a @click="infoTable('zhu',6)">助听听阈评估</a><i @click="tips($event,6)" class="fa fa-question-circle"></i></li>
              <!-- 自定义测试 -->
              <li><a @click="infoTable('ge',7)">混淆音区分</a><i @click="tips($event,7)" class="fa fa-question-circle"></i></li>
            </ul>
            <ul class="nav-last clearfix fr">
              <div class="titleIMG"></div>
              <li><a @click="infoTable('hs',2)">音素区分</a><i @click="tips($event,2)" class="fa fa-question-circle"></i></li>
              <li><a@click="infoTable('sd',3)">声调区分</a><i @click="tips($event,3)" class="fa fa-question-circle"></i></li> 
              <li><a@click="infoTable('sm',4)">声母区分</a><i @click="tips($event,4)" class="fa fa-question-circle"></i></li>
            </ul>
          </div>
        </el-col>
    </div>
    <footervue>
    </footervue>
    <ele-infotable ref="table" :flag="flag"></ele-infotable><!-- 学生列表组件 -->
    <div>
      <viocecalibration></viocecalibration>
      <TabTips ref="tabTips" :flag="flag" :tabText="tabText"></TabTips>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import Header from './header/header'
import infoTable from './home/linsly/infotable'
import util from'../../src/common/util'
import Footervue from './home/commonvue/footer.vue'
import Viocecalibration from './home/commonvue/viocecalibration.vue'
import TabTips from './tips'
import {mapGetters} from 'vuex'
export default {
  name: 'main',
  // 注册组件
  components : {
    'ele-header' : Header,
    'ele-infotable' : infoTable,
    Footervue,
    Viocecalibration,
    TabTips
  },
  // props:{
  //   socket:null,
  // },
  data() {
    return {
      show : true,
      isActive : 'base',
      // 页面跳转的标记
      flag:null,
      tabText:''
    }
  },
  watch:{
    '$route':'hah'
  },
  computed:{
    ...mapGetters(['hasCal_data']),
  },
  methods : {
    hah(){
        window.location.reload()
    },
    tips(event,e){
      this.flag = e;
      // 获取tab标签的内容
      this.tabText = event.currentTarget.parentNode.firstChild.text;
      this.$refs.tabTips.showTabTips();
    },
    // 动态绑定导航切换样式
    addActive (name){
        this.isActive = name;
    },
    infoTable (e,str){
      // 检测主控端是是否已经被注册
      if(!window.adIsOnline){
        // util.isOnline(this);
        // return;
      };
      if(this.hasCal_data !==false){
        alert('声场校准值不符合要求！您不能使用该功能！')
        return;
      };
      this.flag = str;
      // console.log(e)
      // 将选择的测试类型存到本地session
      sessionStorage.setItem('test_id', JSON.stringify(str));
      this.$refs.table.showTable();
    }
  }
}
</script>

<style scoped lang="less">
  .home-r-m ul{
    padding:50px 20px 20px 20px;
    border:1px solid #797979;
    width:270px;
    height:240px;
    border-radius:20px;
    position: relative;
    .titleIMG{
      position: absolute;
      width:280px;
      height:60px;
      left:20px;
      top:-30px;
      background: url(../../static/images/dangan1.png) no-repeat 0 0 ;
      background-size:280px 60px;
    }
    li{
      height:50px;
          font-size: 16px;
      line-height: 50px;
      margin: 20px auto;
      border-radius:10px;
      box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
      text-align:center;
      cursor:pointer;
      position: relative;
      a,i{
        font-size: 24px;
        font-weight: 500;
        color:#fff;
      }
      i{
        position: absolute;
        right: 0px;
        top:0px;
        width:40px;
        line-height:50px;
        display:inline-block;
      }
     // &:hover  i{
     //    display:inline-block;
     //  }
    }
  }
  .main{
    padding:15px 10px;
    height:calc(~"100% - 170px");
    background-color: #1fa1b7;
   .main-home{
      height:100%;
    }
    ul,li{
      list-style:none;
    }
    a{
      text-decoration: none;
      display:inline-block;
      width:100%;
    }
  }
  .home-r-m{
    width:1150px;
      margin:220px auto;
      .nav-right{
        background-color: #ff9900;
        margin-left: 110px;
        li{
          background-color: #ffcc00;
        }
         .titleIMG{
          background: url(../../static/images/tese.png) no-repeat 0 0 ;
          background-size:280px 60px;
        }
      }
      .nav-last{
        background-color: #e53d78;
        li{
          background-color: #ff689d;
        }
        .titleIMG{
          background: url(../../static/images/jingxi.png) no-repeat 0 0 ;
          background-size:280px 60px;
        }
      }
      .nav-left{
        background-color: #66cc66;
        li{
          background-color: #00cc00;
        }
      }
    }
</style>
