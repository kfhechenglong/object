<template>
<div class="login">
  
  <div class="t_logo"></div>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <div class="clearfix l_in">
      <div class="b_img">
      </div>
      <!-- <h3 class="title">欢迎使用中聋听语<br>
      《智能评测听能管理互动系统》</h3> -->
      <el-form-item prop="account">
        <div class="clearfix">
          <p class="fl">账号</p>
          <div class="fl input">
            <el-input id="n_m" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号" @focus="focus" @blur = "blur" @keyup.native="chang"></el-input>
            <transition name="el-zoom-in-top">
              <ul v-show="isAuto" id="ulname">
                <li v-for="(item,index) in checkUserName" @click="getCurrentUserName(item.name)">{{item.name}}<i class="el-icon-close fr" @click.prevent.stop="deleUserName(item.name)"></i></li>
              </ul>
            </transition>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="checkPass">
        <div class="clearfix">
          <p class="fl">密码</p>
          <el-input id="p_s" class="fl input" type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码" min="6" v-on:keyup.enter.native="handleSubmit"></el-input>
        </div>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item class="fr" style="width:310px;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </div>
    <div class="g_btn">
      <ul class="clearfix">
        <li class="z_z"><i class="fa fa-user-plus"></i><p>已注册</p></li>
        <li class="c_q" @click="powerOff"><i class="fa fa-power-off"></i><p>关闭系统</p></li>
        <!-- <li class="fr g_b" @click="reboot"><i class="fa fa-refresh"></i><p>重启系统</p></li> -->
      </ul>
    </div>
  </el-form>
  </div>
</template>
<script>
  import { requestLogin } from '../../api/api';
  import util from'../../../src/common/util'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符'},
            { pattern:/^[\w\u4E00-\u9FA5\uF900-\uFA2D\a-zA-Z0-9_\.]*$/, message: '用户名只能由汉字、字母、数字和下划线'}
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30 个字符'},
            { pattern:/^[a-zA-Z0-9_\.]+$/, message: '密码只能由字母、数字和下划线'}
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        userArray:[],
        checkUserName:[],
        isAuto:false,
        // restaurants: [],
        currentLi:-1
      };
    },
    created(){
      this.getUserName()
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
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      focus(event){
        this.keyCode();//获取焦点时，先清空用户名列表的选择样式
        setTimeout(() =>{
          this.isAuto = true;
        },200)
      },
      blur(event){
        setTimeout(()=>{
          this.isAuto = false;
        },300)
      },
      chang(event){//检索
        // console.log(event)
        this.keyCode(event.keyCode)
        this.checkUserName = util.searchName(this.ruleForm2.account,this.searchUserName,true)
      },
      keyCode(keyCode){
        let ul = jq('#ulname');
        let lis= ul.getElementsByTagName('li')
        if(keyCode === 40 || keyCode === 38 || keyCode === 13){
          if(keyCode === 40){//按键盘上键
            if(this.currentLi >= lis.length-1){this.currentLi = -1;};
            this.currentLi++;
          }else if(keyCode === 38){//按键盘下键
            if(this.currentLi <= 0){this.currentLi = lis.length;};
            this.currentLi--;
          };
          // console.log(this.currentLi)
          for (var i = 0; i < lis.length; i++) {//添加类
            lis[i].className = ""
            if(this.currentLi === i){
              lis[i].className = "active-li"
            }
          }
          if(keyCode === 13){//按下enter键时获取值
            for (var i = 0; i < lis.length; i++) {
              if(this.currentLi === i){
                this.ruleForm2.account = lis[i].innerText;
                this.currentLi = -1;//还原计算器
              }
            };
            this.isAuto = false;//关闭下拉选项
          }
        }else{
          this.currentLi = -1;//还原计算器
          for (var i = 0; i < lis.length; i++) {//添加类
            lis[i].className = ""
          }
        }
      },
      getCurrentUserName(name){//选择用户名
        this.ruleForm2.account = name;
        //隐藏下拉选择框
        this.isAuto = false;
      },
      deleUserName(deletname){//删除选中的用户名
        let text = this.checkUserName;
        for (var i = text.length-1; i >= 0; i--) {
          if(text[i].name === deletname){
            text.splice(i,1);
          }
        };
        localStorage.setItem("user_name",JSON.stringify(this.checkUserName));
      },
      getUserName(){//获取用户名
        try{
          // debugger
          // 获取本地储存
          let text = JSON.parse(localStorage.getItem('user_name'));
          let nearSt = this.checkUserName;
          // 将本地储存的最近五人取出
          if(text){
            this.userArray = text;
            let currentTime = (new Date()).getTime();
            // 首先判断是否过期,如果用户名过期则删除
            for (var i = text.length-1; i >= 0; i--) {
              if(text[i].time - currentTime <= 0){//用户名过期
                text.splice(i,1);
              }else{
                nearSt.unshift(text[i]);
              }
            }
            this.searchUserName = nearSt.concat();//用于收索的用户名
          }
        } catch(err){
          alert(err)
        }
        // this.restaurants = this.checkUserName;
      },
      setUserName(value,time){
        let val = {'name':value,'time':time.getTime() + 14 * (24 * 60 * 60 * 1000)};
        // 判断该对象是否添加过
        let valueIndex = -1;
        for (let i = 0; i < this.userArray.length; i++) {
            if(this.userArray[i].name == value){
                valueIndex = i;
                break;
            }
        };
        if(valueIndex==-1){//新用户，则直接添加
            this.userArray.unshift(val);
        }else if(valueIndex>0){//如果登录过该用户名，则更新时间戳
             this.userArray.splice(valueIndex,1)
             this.userArray.unshift(val);
        }
        if(this.userArray.length > 6){//最多保存五个用户名
            this.userArray.length = 5;
        }
        localStorage.setItem("user_name",JSON.stringify(this.userArray))
      },
      handleSubmit(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            //对密码进行加密处理
            let date = new Date();
            let loginParams = { 
              name: this.ruleForm2.account, 
              passwd: hex_md5(hex_md5(this.ruleForm2.checkPass) + parseInt((date.getTime()/1000))),
              datestr:parseInt((date.getTime()/1000))
            };
            console.log(loginParams)
            // 登录验证
            requestLogin(loginParams).then(data => {
              // console.log(data)
              this.logining = false;
              let { msg, code, user } = data;
              if (data.code === 0) {
                msgTipsErr(this,data.msg);
                if(data.msg === "用户不存在"){
                  var input = jq("#n_m").getElementsByTagName('input')[0];
                  this.ruleForm2.checkPass = "";
                  this.ruleForm2.account = "";
                  input.focus()
                  return;
                }
                var input = jq("#p_s").getElementsByTagName('input')[0];
                this.ruleForm2.checkPass = "";
                input.focus()
              } else {
                sessionStorage.setItem('user', JSON.stringify(this.ruleForm2.account));
                this.setUserName(this.ruleForm2.account,date)
                // 检测主控端是是否已经被注册
                // if(!window.adIsOnline){
                //   util.isOnline(this);
                //   return;
                // } else{
                  this.$router.push({ path: '/home' });
                // };
              }
            });
          } else {
            // alert('用户名或密码不合法');
            return false;
          }
        });
      }
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
    // 修改按钮样式
    .el-button--primary{
      background-color: #e3771d;
      border-color:#e3771d;
      letter-spacing:20px;
    }
    .el-form-item__content{
      position: relative;
      ul{
        width:100%;
        position:absolute;
        left:0px;
        top:36px;
        z-index:100;
        background-color: #fff;
        border-radius:5px;
        max-height:144px;
        overflow-y: auto;
        li{
          margin:3px 0;
          height:36px;
          line-height: 36px;
          position: relative;
          text-indent:1em;
          i{
            position:absolute;
            top:10px;
            right:10px;
             &:hover{
              color: red;
            }
          }
          &:hover{
            background-color: #20a0ff;
          }
        }
        .active-li{
          color:#333;
          background-color: #20a0ff;
        }
      }
    }
    .l_in p{
      font-size: 26px;
      width: 80px;
      letter-spacing: 10px;
      color:#555;
    }
    .input{width:310px;position: relative;}
    // 修改input样式
    .el-input .el-input__inner{
      background-color:#f9ffbd ;
      background-color:#fff ;
      border-color:#a94442;
      border-color:#ccc;
      height:40px;
      font-size: 14px;
    }
    .el-form-item{margin-bottom: 40px;}
    .el-input .el-input__inner:focus{
      background-color: yellow;
    }
    .el-autocomplete{
      width:100%;
    }
    .el-form-item__error{left:80px;font-size:16px;}
    .my-autocomplete {
      li {
        line-height: normal;
        padding: 7px;
        position: relative;
        .name {
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
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