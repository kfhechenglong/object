<template>
	<el-dialog class="tab-dialog" title="切换用户"  v-model="tabUserShow" :close-on-click-modal="false">
	<div class="tab-user">
		<div class="demo-ruleForm login-container">
			<login @closeTab="close"></login>
			<el-button type="danger" style="width: 310px;float: right;margin-top:-20px;"@click="powerOff"><!-- <i class="fa fa-power-off fl"></i> -->关机</el-button>
		</div>
	</div>
	</el-dialog>
</template>
<script>
import login from'./../../login/login-input.vue'
export default {
  	components : {
      login
    },
    data(){
    	return {
    		tabUserShow:false,
    	}
    },
    methods:{
    	close(e){
    		this.tabUserShow = !e;
    	},
    	powerOff(){
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
	        return;
	        if(adIsOnline){//websocket在线
	          var argument = this.wskt.wstoserver('sys_poweroff','');
	          this.wbsInfo(argument,"您是否要确定关闭系统？")
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
	    }
    }
}
</script>

<style lang ="less">
.tab-dialog{
	.el-dialog{
		width: 500px;
	}
	.el-dialog__body{
		padding: 0;
	}
}
.tab-user{
    height: 100%;
    position: relative;
    background: url(../../../../static/images/bg.jpg) no-repeat 0 0 ;
    background-size:100% 100%;
    height: 350px;
    .login-container{
    	width: 400px;
    }
    .el-button--danger{
      letter-spacing:20px;
    }
}
</style>
