<template>
  <div class="login"> 
    <div class="t_logo"></div>
    <div class="demo-ruleForm login-container">
      <div class="b_img">
        </div>
          <!-- 登录板块 -->
          <login></login>
          <!-- 重启板块 -->
          <div class="g_btn">
            <ul class="clearfix">
              <li class="z_z"><i class="fa fa-user-plus"></i><p>已注册</p></li>
              <li class="c_q" @click="powerOff"><i class="fa fa-power-off"></i><p>关闭系统</p></li>
              <!-- <li class="fr g_b" @click="reboot"><i class="fa fa-refresh"></i><p>重启系统</p></li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { requestLogin } from '../../api/api';
  import util from'../../../src/common/util'
  import login from'./login-input.vue'
  export default {
    components : {
      login
    },
    data() {
      return {
        
      };
    },
    created(){
      
    },
    mounted(){
      
     },
    methods: {
       // 关闭系统
      powerOff(){
        if(adIsOnline){//websocket在线
          var argument = this.wskt.wstoserver('sys_poweroff','');
          this.wbsInfo(argument,"您是否要确定关闭系统？")
        }else{
            msgTipsErr(this,"主控端未连接websocket！")
        }
        return;
      },
      // 系统重启
      reboot(){
        if(adIsOnline){//websocket在线
          var argument = this.wskt.wstoserver('sys_reboot','');
          this.wbsInfo(argument,"您是否要确定重新启动系统？")
        }else{
            msgTipsErr(this,"主控端未连接websocket！")
        }
        return;
      },
       wbsInfo(argument,info){
        this.$confirm(info, '提示', {
            closeOnClickModal:false,
            closeOnPressEscape:false,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
        }).then(() => {
            console.log(argument)
            websocket.send(JSON.stringify(argument));
        }).catch(() => {

        });
      },
    }
  }

</script>

<style lang="less" >
  .login-container {
    background-clip: padding-box;
    // width: 450px;
    padding: 35px 35px 15px 35px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .login{
    background-color: #1c84c6;
    background: url(../../../static/images/bg.jpg) no-repeat 0 0 ;
    background-size:100% 100%;
    height: 100%;
    position: relative;
    /*******login*********/ 
    .t_logo{
      width: 530px;
      height: 60px;
      position: absolute;
      left:7%;
      top:8%;
      background: url(../../../static/images/login-logo.png) no-repeat 0 0 ;
    }
    .b_img{
      width:115px;
      height:49px;
      margin-left:275px;
      margin-bottom:10px;
      background: url(../../../static/images/bg2.png) no-repeat 0 0 ;
    }
    /****重启板块样式*******/ 
    .g_btn{
      ul{position: relative;}
      li{
        position: relative;
        width:65px;
        height:70px;
        // margin:0 20px;
        background-color: #1ab297;
        border-radius: 5px;
        cursor: pointer;
        text-align:center;
        box-shadow:inset -1px -5px 4px -1px
      }
      li i{
        font-size: 28px;
        color: #fff;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        margin:0;
        display: block;
      }
      li:hover i {
        color:#1c84c6;
      }
      .z_z{
        position: absolute;
        top: 0;
        left: 40%;
        transform: translate(-50%);
      }
      .c_q{
        position: absolute;
        top: 0;
        right: 0%;
        transform: translate(-50%);
        background-color: #ee5567;
      }
      .g_b{
        background-color: #f7ad58;
      }
      p{
        margin-top:80px;
        text-align:center;
        font-size: 16px;
        font-weight: 600;
        color:#666;
      }
    }
    .title{
      color:#fff;
      margin:10px;
    }
  }
</style>