import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// 引入组件
import Base from '@/components/home/danganlist/base/base'
// import Gametest from '@/components/home/danganlist/gametest/gametest'
// import Ystest from '@/components/home/danganlist/ystest/ystest'
// import Noise from '@/components/home/danganlist/noise/noise'
// import Eight from '@/components/home/danganlist/eight/eight'
// import Tone from '@/components/home/danganlist/tone/tone'
// import Personality from '@/components/home/danganlist/personality/personality'
import Login from'@/components/login/login'
import danganlist from '@/components/home/danganlist/danganlist'
import Home from '@/components/home'
import bingli from '@/components/home/danganlist/bingli/bingli'
import pinggu from '@/components/home/danganlist/pinggu/pinggu'
import tingli from '@/components/home/danganlist/tingli/tingli'
// 档案管理
import Archives from '@/components/home/danganlist/archives'
// 更多功能
import More from '@/components/more'
import zuTing from '@/components/home/zuting/header-info'
import zuTest from '@/components/home/zuting/params'
import zuGameTest from '@/components/home/zuting/gamesTest'
import audiometry from '@/components/home/zuting/audiometry'
// 林氏刘音
import liuTest from'@/components/home/linsly/params'
import liuGameTest from'@/components/home/linsly/gamesTest'
import liuAudiometry from'@/components/home/linsly/audiometry'
// 音素测试
import ToneTest from'@/components/home/tone/params'
import ToneGameTest from'@/components/home/tone/gamesTest'
import ToneAudiometry from'@/components/home/tone/audiometry'
// 个性化
import Especial from'@/components/home/especial/setterParams'
import EspecialTest from'@/components/home/especial/params'
import EspecialAudiometry from'@/components/home/especial/audiometry'
import EspecialGameTest from'@/components/home/especial/gamesTest'
// 高级功能
import MoreHigh from'@/components/home/morehigh/morehight'
// 统计分析
import Statistic from'@/components/home/statistic/statistic'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
  // 登录页路由
    {
      path: '*',
      redirect:'/home'
    },
    {
      path: '/login',
      component : Login
    },
    {
      path: '/home',
      component : Home,
      name:'主页',
     },
     {
      path: '/more',
      component : More,
      name:'更多功能',
     },
     {
      path: '/home/Archives',
      // component : danganlist,
      component : Archives,
      // redirect:'/home/Archives/danganlist/base',
      name:'档案',
      children:[
        {
          path:'/home/Archives/dalist',
          component:danganlist,
          // redirect:'/home/Archives/danganlist/base',
          name:'档案列表',
          children:[
          {path:'/home/Archives/dalist/base',component:Base,name:'基本信息'},
          {path:'/home/Archives/dalist/bingli',component:bingli,name:'病历档案'},
          {path:'/home/Archives/dalist/tingli',component:tingli,name:'听力档案'},
          {path:'/home/Archives/dalist/pinggu',component:pinggu,name:'评估档案'},
          ]
        },{
          path:'/home/Archives/mh',
          component:MoreHigh,
          name:'高级功能'
        },{
          path:'/home/Archives/fx',
          component:Statistic,
          name:'统计分析'
        }
      ],
      // children:[
      //   {path:'/home/Archives/danganlist/base',component:Base,name:'基本信息'},
      //   {path:'/home/Archives/danganlist/bingli',component:bingli,name:'病历档案'},
      //   {path:'/home/Archives/danganlist/tingli',component:tingli,name:'听力档案'},
      //   {path:'/home/Archives/danganlist/pinggu',component:pinggu,name:'评估档案'},
      // ]
    },
    {
      path: '/home/zhuting',
      component : zuTing,
      redirect:'/home/zhuting/base',
      name:'助听听阈',
      children:[
        {path:'/home/zhuting/base',component:zuTest,name:'助听参数'},
        {path:'/home/zhuting/audiometry',component:audiometry,name:'助听测试'},
        {path:'/home/zhuting/train',component:zuGameTest,name:'助听训练'},
      ]
    },
    {
      path: '/home/linsix',
      component : zuTing,
      redirect:'/home/linsix/base',
      name:'林氏六音',
      children:[
        {path:'/home/linsix/base',component:liuTest,name:'六音参数'},
        {path:'/home/linsix/audiometry',component:liuAudiometry,name:'六音测试'},
        {path:'/home/linsix/train',component:liuGameTest,name:'六音训练'},
      ]
    },
    {
      path: '/home/hseight',
      component : zuTing,
      redirect:'/home/hseight/base',
      name:'胡氏七词',
      children:[
        {path:'/home/hseight/base',component:ToneTest,name:'七词参数'},
        {path:'/home/hseight/audiometry',component:ToneAudiometry,name:'七词测试'},
        {path:'/home/hseight/train',component:ToneGameTest,name:'七词训练'},
      ]
    },
    {
      path: '/home/especial',
      component : zuTing,
      redirect:'/home/especial/baseA',
      name:'个性化听辨',
      children:[
        {path:'/home/especial/baseA',component:Especial,name:'个性参数'},
        {path:'/home/especial/base',component:EspecialTest,name:'参数'},
        {path:'/home/especial/audiometry',component:EspecialAudiometry,name:'个性测试'},
        {path:'/home/especial/train',component:EspecialGameTest,name:'个性训练'},
      ]
    },
    {
      path: '/home/tone',
      component : zuTing,
      redirect:'/home/tone/base',
      name:'声调识别',
      children:[
        {path:'/home/tone/base',component:ToneTest,name:'声调参数'},
        {path:'/home/tone/audiometry',component:ToneAudiometry,name:'声调测试'},
        {path:'/home/tone/train',component:ToneGameTest,name:'声调训练'},
      ]
    },
    {
      path: '/home/syllable',
      component : zuTing,
      redirect:'/home/syllable/base',
      name:'声母识别',
      children:[
        {path:'/home/syllable/base',component:ToneTest,name:'声母参数'},
        {path:'/home/syllable/audiometry',component:ToneAudiometry,name:'声母测试'},
        {path:'/home/syllable/train',component:ToneGameTest,name:'声母训练'},
      ]
    },
  ]

})
