// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Api from './api/Api (2).js'
import ws from './common/websoket.js'
import Element from 'element-ui'
import Animate from 'animate.css'
import JQ from './common/util.js'
import Utils from './common/util.js'
import QRCode from 'qrcodejs2'
// import VDistpicker from 'v-distpicker'
//引入store对象
import store from './store'
import 'element-ui/lib/theme-default/index.css'
import 'common/style/css/tips.css'
import 'common/style/css/style.css'
import 'common/style/css/print- 1.css'
import 'common/style/css/dialog.css'
import 'common/style/css/tingli.css'
import 'common/style/css/icon.css'
import 'common/style/css/gameTest.css'
import { Message} from 'element-ui'
import Slider from 'element-ui/packages/slider'
// import Table from 'element-ui/lib/table'
// console.log($);
// console.log(router);
// 引入自定义jq
window.jq = JQ.jq;
window.Utils = Utils;
window.msgTipsErr = Utils.msgTipsErr;//错误信息的提示
window.msgTipsSuccess = Utils.msgTipsSuccess;//正确信息的提示
// 全局注册websocket参数
Vue.prototype.wskt = ws;
Vue.prototype.QRCode = QRCode;
Vue.config.productionTip = false
Vue.use(Element);
Vue.use(Slider);
// Vue.use(Table);
// Vue.component('v-distpicker', VDistpicker)
// 全局使用axios
Vue.prototype.$ajax = Api;
Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [item.name])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });
//判断登录是否过期
axios.interceptors.response.use((response) =>{
    	// console.log(response.data);
    try{
      if(response.data.msg === "登录失效"){
        console.log("登录过期");
        sessionStorage.removeItem('user');
        router.push('/login');
          return;
      }
    } catch(err){
      // alert(err)
    }
    
     return response;
   },function(error){
     //请求错误时做些事
     return Promise.reject(error);
});
// 判断是否登录
router.beforeEach((to, from, next) => { 
	// console.log(to.path);
	// console.log(from);
	if(false){
		next();
	}else{
		if (to.path == '/login') {
		  sessionStorage.removeItem('user');
		}
		let user = JSON.parse(sessionStorage.getItem('user'));
		if (!user && to.path != '/login') {
		  next({ path: '/login' })
		} else {
		  next()
		}
	}
})
window.Vm = new Vue();

new Vue({
  el: '#app',
  router,
  store, //注入到vue实例中
  template: '<App/>',
  components: { App }
})
