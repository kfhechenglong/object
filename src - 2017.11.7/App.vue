<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
window.isToggle = true;
window.adIsOnline = true;
// 引入头部组件
import {mapMutations,mapState} from 'vuex'
import util from './common/util.js'
export default {
  name: 'app',
  // 注册组件
  // components : {
  //   'ele-header' : Header,
  //   'ele-dang' : Dang
  // },
  data() {
    return {
      
    }
  },
  created (){
    // 连接websocket
    this.connect_websocket();
  },
  computed:{
    ...mapState(['wepAppTime']),
  },
  methods : {
    // 判断声音校准是否有值
    hasCal_data(str){
      try{
        // 接收来自播放器的声音校准信息
        if(str.mesfrom === "sper" && str.mescon === "cal_end"){
          this.$store.commit('progress_fn',str.params['freq']);
        };
        if(str['mescon'] === 'ad_regist_suss' || str['mescon'] === 'cal_finish'){
          let obj = str['params']['cal_data'];
          // this.$store.commit('calibrationData',maxDb);
          this.$store.commit('inint_calibrationData',obj);
        }
      }catch(err){
        alert(err)
      }
    },
    tese_data(str){
      if(str['mescon'] === "rtspl"){
        this.$store.commit('test_spl',str.params['spl']);
      }
    },
    connect_websocket(){
      let that =this;
      (function (){
        if (!window.WebSocket) {
         alert("您的浏览器不支持websocket！");
           return false;
        }
        let wsServer = 'ws://'+url; //服务器地址
        window.websocket = new WebSocket(wsServer); //创建WebSocket对象
        websocket.onopen = function (evt) {
          //已经建立连接
          // console.log(evt);
          var date = new Date();
          var reg={
              mesid:parseInt((date.getTime())),
              mestype:'cmd',
              mesfrom:'ad',
              mesto:'server',
              mescon:'regist'
            }
          websocket.send(JSON.stringify(reg));//向服务器发送消息
          // console.log(websocket.readyState);
        };

        websocket.onclose = function (evt) {
          //已经关闭连接
          console.log(evt);
          // alert("websocket已断开连接！");
        };
        
        websocket.onmessage = function (evt) {
          //收到服务器消息，使用evt.data提取
          const websocketData = JSON.parse(evt.data);
          console.log(websocketData);
          that.hasCal_data(websocketData)
          that.tese_data(websocketData)//测试用的消息
          // 来自被控端的消息
          var isOnline = true;
          if(websocketData.mesfrom === "ctld"){
            Vm.$emit('wsmsg',websocketData);
          }
          let time = that.$store.state.time;
          if(websocketData.mesfrom === "uploader"){//获取微信扫码上传时的信息
            that.$store.commit('getter_time',websocketData);
              that.wskt.hasCurrentPage(that,time,websocketData);//全局处理微信上传业务
          }
          // 来自服务器的消息'主控端已经被注册，只能有一个服务在线！目前您只能对档案信息进行浏览！', '提示',
          if(websocketData.mesfrom === "server"){
            try{
              if(websocketData.mescon === "ctld_regist_suss"){
                isOnline = true;
                window.isToggle = true;
              } else if(websocketData.mescon === "ctld_disconnect"){
                isOnline = false;
              }else if(websocketData.mescon === "ad is not null,you cannot regist"){
                window.adIsOnline = false;
                setTimeout(()=>{
                  alert("服务器连接失败,错误代码：1001");
                },0);
                return;
              } else if(websocketData.mescon === "ad_regist_suss"){
                window.adIsOnline = true;
                // 消息提示
                 // msgTipsSuccess(that,'恭喜你，websocket连接注册成功！');
                 return;
              }
              that.$store.commit('CMD_IS_ONLINE',{'local':isOnline,'global':window.isToggle});
              // console.log(websocketData.mescon)
              Vm.$emit('servermsg',websocketData,isOnline,window.isToggle);
            } catch(err){
              alert(err)
            }
          };
          // console.log(window.isToggle,isOnline)
          // 被控端不在线
          // if(websocketData.params['memo'] == "target is not online" ){
          //   if(window.isToggle && isOnline){return;}
          //   Vm.$emit('target',websocketData);
          //   // alert("被控端不在线！")
          //   that.$alert('被控端不在线，请确保上线后再进入!', '提示', {
          //       confirmButtonText: '确定',
          //       }).then(() => {
          //         that.$router.push({ path: '/home' });
          //       });
          // }

          return;
          // console.log(websocket.readyState);
        };
        websocket.onerror = function (evt) {
          //产生异常
          console.log(evt);
        };

      })();
    }

  }
}
</script>

<style lang="less">
#app{
  background-color: #88d99f;
  margin:0 auto;
  height: 100%;
  /*overflow: auto;*/
  position: relative;
}
/**弹框提示信息*/
div.el-message.msgtip{
    background-color: #999;
  }

</style>
