<template>
  <div class="header container-fluid">
    <div class="header-content clearfix"> 
        <div class="navbar-header">
            <h1>
                <a><img src="../../../static/images/logomin.png">
                 智能测评听能管理互动系统</a>
            </h1>   
        </div>
        <div class="collapse">
            <ul class="nav-list">
                <li @click="calibration">
                    <i class="iconfont icon-yinxiang2xian"></i>
                    <p>声场校准</p>
                </li>
                <li class="dropdown">
                    <span class="el-dropdown-link" @click="showdown">
                        <i class="iconfont icon-shezhi"></i>
                        <p>设置</p>
                    </span>
                    <ul class="dropdown-child">
                        <li @click="dialogUserVisible"><i class="fa fa-group"></i>用户管理</li>
                        <li @click="dialogJigouVisible"><i class="fa fa-home"></i>机构设置</li>
                        <li @click="dialogClassVisible"><i class="iconfont icon-class"></i>班级管理</li>
                        <li @click="dialogTeacherVisible"><i class="iconfont icon-banzhuren"></i>班主任管理</li>
                        <li @click="dialogSheBeiVisible"><i class="fa fa-cubes"></i>助听设备管理</li>
                    </ul>
                </li>
                <li @click="showNetworkOnline"> 
                    <a :class="currentIsOnline">
                    <i class="iconfont icon-wangluo" v-if="currentIsOnline"></i>
                    <i class="iconfont icon-lianwangzhuangtai-duankai" v-else></i>
                    </a>
                    <p v-if="currentIsOnline">网络良好</p>
                    <p v-else>网络断开</p>
                </li>
                <li @click="showPrinterOnline"> 
                    <a :class="[printMsg === 200 ? 'online' :'']">
                        <i class="iconfont icon-iconfontdayinji" v-if="printMsg === 200"></i>
                        <i class="iconfont icon-dayinji_weilianjie" v-else></i>
                    </a>
                    <p v-if="printMsg === 200">打印已连接</p>
                    <p v-else>打印未连接</p>
                </li>
                <li class="dropdown">
                        <span class="el-dropdown-link" @click="showdown">
                            <i class="iconfont icon-help"></i>
                            <p>帮助</p>
                        </span>
                        <ul class="dropdown-child">
                            <li @click="showDialogHelpVisible"><i class="fa fa-question-circle"></i>帮助</li>
                            <li @click="dialogAboutVisible"><i class="el-icon-information"></i>关于</li>
                            <li @click="dialogHistoryVisible"><i class=""></i>历史日志</li>
                            <li @click="testReboot"><i class="fa fa-repeat"></i>测试服务</li>
                        </ul>
                </li>
                <li class="dropdown">
                    <span class="el-dropdown-link" @click="showdown">
                        <i class="iconfont icon-yonghu"></i>
                        <p>{{user_name}}</p>
                    </span>
                    <ul  class="dropdown-child">
                        <li @click="dialogPsVisible"><i class="fa fa-unlock"></i>修改密码</li>
                    </ul>
                </li>
                <li @click="shutdownSystem" ><i class="fa fa-power-off"></i><p>关机</p></li>
                <li @click="logout" ><i class="fa fa-sign-out"></i><p>退出</p></li>
            </ul>
        </div>
    </div>
    <ele-info ref="info" :user_name="user_name"></ele-info>
    <ele-password ref="password" :pwd="user_name"></ele-password>
    <!-- <ele-user></ele-user> -->
    <ele-jigou ref="jigou" :jigou="user_name"></ele-jigou>
    <ele-user ref="user"  :name="user_name"></ele-user>
    <Online ref="online"></Online>
    <ele-class ref="classEle"></ele-class>
    <ele-teacher ref="teacherEle"></ele-teacher>
    <div v-if="hidden">
        <viocecalibration ref="calibration"></viocecalibration>
    </div>
    <history ref="history"></history>
    <SheBei ref="shebei"></SheBei>
    <About ref="about"></About>
    <Help ref="help"></Help>
    <!-- <TabUser ref="tebUser"></TabUser> -->
    <Printer ref="printer"></Printer>
  </div>
</template>
<script>
import info from './zhang/info'
import password from './zhang/password'
import user from './rest/user'
import jigou from './rest/jigou'
import Class from './rest/class'
import Teacher from './rest/teacher'
import SheBei from './rest/shebei.vue'
import History from './history/history'
import Online from './online/status.vue'
import Printer from './online/status-print.vue'
import About from './rest/about.vue'
import Help from './rest/help.vue'
import util from './../../common/util.js'
import Viocecalibration from '../home/commonvue/viocecalibration.vue'
import {getUserInfo,jgshow,operatorList} from '../../api/api'
import {mapState} from 'vuex'
export default {
    components : {
    'ele-info' : info,
    'ele-password' : password,
    'ele-user' : user,
    'ele-jigou' : jigou,
    'ele-class' : Class,
    'ele-teacher' : Teacher,
    Viocecalibration,
    History,
    SheBei,
    Online,
    About,
    Printer,
    Help
  },
  data (){
    return {
        hidden:false,
        infoShow: true,
        user_name : '',
        operatorInfo : '',
        currentIsOnline:'',
        currentIsOnlineTips:'',
        // 获取本机ip
        localhost:null
    }
  },
    created (){
        //获取本机ip
        util.getterIp(this);
        // 获取打印机
        util.getPrint(this);
        // 获取logo及用户信息
        this.getUserInfo();
    },
    computed:{
        ...mapState(['IP','printMsg']),
    },
    watch:{
        IP:function () {
            this.isOnline(); 
        },
    },
    // 离开时清除ip
    destroyed(){
        this.$store.commit('getterIp',null);
        this.$store.commit('getterPrint',null);
    },
  methods: {
    // 校准扬声器
    calibration(){
        // 检查是否连接websocket
        if(!window.adIsOnline){msgTipsErr(this,"主控端未连接websocket！"); return false;}
        this.closeDropDown();
        this.hidden = true;
        setTimeout(() =>{
            this.$refs.calibration.toCalibration();
        },50);
    },
    // 显示帮助模块
    showDialogHelpVisible(){
        this.$refs.help.show();
    },
    // 显示打印信息
    showPrinterOnline(){
        this.closeDropDown();
        this.$refs.printer.show();
    },
    // 显示ip信息
    showNetworkOnline(){
        util.getterIp(this);
        this.closeDropDown();
        this.$refs.online.show()
    },
    // 判断浏览器是否在连网状态
    isOnline(){
        if (this.IP) {
            this.currentIsOnline = "online";
            this.currentIsOnlineTips = "网络连接良好！";
        }else{
            this.currentIsOnline = "";
            this.currentIsOnlineTips = "网络已断开连接！";
        };
    },
    // 获取用户信息
    getUserInfo(){
        var that = this
        getUserInfo().then(function(response){
            // console.log(response)
            that.user_name = response.data.operator_name;
        }).catch(function(error) {
            console.log(error)
        });
    },
    // 关于
    dialogAboutVisible(){
        this.$refs.about.dialogAboutVisible = true;
    },
    showdown (e){
        this.closeDropDown();
        const cu_ul = e.currentTarget.parentNode.getElementsByTagName('ul')[0];
        cu_ul.style.display = "block";
        if(e.currentTarget.className === "el-dropdown-link"){
            e.stopPropagation();
        }
    },
    // 关闭下来框
    closeDropDown(){
        const uls = jq('.dropdown-child');
        for (let i = 0; i < uls.length; i++) {
            uls[i].style.display = "none";
        }
    },
    // 用户管理模态框
    dialogUserVisible (){
        this.$refs.user.showTable();
    },
    // 机构模态框
    dialogJigouVisible (){
        this.closeDropDown();
        this.$refs.jigou.jigouInfo();
        this.$refs.jigou.showTable();
    },
    // 班级管理
    dialogClassVisible(){
        this.$refs.classEle.showClass();
    },
    // 教师管理
    dialogTeacherVisible(){
        this.$refs.teacherEle.showTeacher();
    },
    // 设备管理板块
    dialogSheBeiVisible(){
        this.$refs.shebei.show();
    },
    // 个人信息模态框
    dialogInfoVisible (){
       this.$refs.info.showTable();
    },
    // 修改密码模态框
    dialogPsVisible (){
        this.$refs.password.showTable();
    },
    // 历史版本模态框
    dialogHistoryVisible(){
        console.log('history');
        this.$refs.history.showTable();
    },
    //退出登录
    logout () {
        this.closeDropDown();
        // this.$refs.tebUser.tabUserShow = true;
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
            //type: 'warning'
        }).then(() => {
            this.$ajax.post(`/index/logout`,"logout").then((data) =>{
                console.log(data)
            });
            sessionStorage.removeItem('user');
            _this.$router.push('/login');
        }).catch(() => {
        });
    },
    //关闭系统
    shutdownSystem () {
        this.closeDropDown();
        // this.$refs.tebUser.tabUserShow = true;
        const _this = this;
        if(adIsOnline){//websocket在线
            let argument = this.wskt.wstoserver('sys_poweroff','');
            this.$confirm('确认关机吗?', '提示', {
                // type: 'warning'
            }).then(() => {
                websocket.send(JSON.stringify(argument));
            }).catch(() => {
            });
        }else{
            msgTipsErr(this,"主控端未连接websocket！")
        }
    },
    // 测试状态下的
    testReboot(){
        var argument = this.wskt.wstoserver('sys_remoteAD','');
        console.log(argument);
        websocket.send(JSON.stringify(argument));
    }
  }
}
</script>
<style scoped lang ="less">
    .navbar-header{
        float:left;
        padding-left:20px;
        line-height: 70px;
    }
    .el-icon-information{
        font-size: 14px;
        margin-left:4px;
        margin-right:4px;
    }
    .collapse{
        float: right;
        margin-right: 20px;
        .nav-list>li{
            float:left;
            line-height: 30px;
            padding-left: 20px;
            padding-right:20px;
            margin-top: 7px;
            cursor: pointer;
            text-align: center;
            i{
                font-size: 30px;
                margin:0px;
            }
            .fa-sign-out{color: orange;}
            p{
                font-size: 16px;
                color: #48576a;
            }
            .fa-power-off{color: red;}
        }
        .nav-list .dropdown{
            cursor: pointer;
            position: relative;
            padding-left: 0;
            padding-right:0;
            .el-dropdown-link{
                padding-left: 20px;
                padding-right:20px;
                display: block;
            }
        }
        .dropdown>ul{
            position: absolute;
            left:-20px;
            width: 160px;
            background-color: #fff;
            border:1px solid #ccc;
            box-shadow:0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);
            z-index: 200;
            display: none;
            li{
                line-height: 50px;
                height: 50px;
                text-align: left;
                margin-left: 10px;
                font-size: 18px;
                i{
                    font-size: 20px;
                    margin:0 3px;
                }
            }
        }
    }
    .header{
        background-color: #f8f8f8;
        border-bottom: 10px solid #e7e7e7;
        height: 70px;
        /*判断连网状态*/
        .online{
            color:#1ab297;
        }
        a{
            text-decoration: none;
        }
        .header-content{
            /*overflow: hidden;*/
        }
        .info{
                padding-left:20px;
            }
       .dropdown-menu li{
            line-height: 30px;
            cursor: pointer;           
            a{
                color:#333;
            }
           
       } 
        a{
            color:#777777;
            .fa-sitemap{
                color:#0066ff;
            }
        }
    }
    h1 {
        font-size: 22px;
        line-height: 70px;
        letter-spacing: 3px;
        color:#777;
        img{
            height: 50px;
            float: left;
            margin-top: 10px;
            margin-right: 10px;
        }
        cursor: pointer;  
    }
    ul,li{
        margin:0px;
    }
</style>
