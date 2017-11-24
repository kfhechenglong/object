<template>
  <div class="check-toggle">
    <el-dialog v-model="dialogToggleVisible" @close = "close" :show-close="false" top="25%">
      <div class="toggle-content clearfix">
        <h3>请选择要调换的{{data.keyType}}</h3>
        <ul class="clearfix" id="ul-li" v-if="data.keyType === '班级'">
          <li v-for="(item,index) in data.data" @click="_toggle($event,item.class_id)">{{item.class_name}}<i class="iconfont icon-xuanze2"></i></li>
        </ul>
        <ul class="clearfix" id="ul-li" v-else-if="data.keyType === '老师'">
          <li v-for="(item,index) in data.data" @click="_toggle($event,item.name)">{{item.name}}<i class="iconfont icon-xuanze2"></i></li>
        </ul>
        <ul v-else>
          <div class="select-warp" v-if="status === '0'">
            <el-select v-model="currentstatus" placeholder="请选择">
              <el-option key="在校" label="在校" value="1">
              </el-option>
            </el-select>
          </div>
          <div v-else>
            <span style="font-size:18px;">请选择离校时间：</span>
            <el-date-picker
                v-model="leave_time"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                @change="time"
                >
              </el-date-picker>
          </div>
        </ul>
        <el-button :disabled="isChecked" type="info" class="btn" @click="submit">确定选择</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from './../../../common/util.js'
import {mapState,mapGetters} from 'vuex'
export default{
	data(){
		return{
      dialogToggleVisible:false,
      isChecked:true,
      value:'',
      currentstatus:'0',
      leave_time:null
		}
	},
  props:{
    data:null,
    checkedId:null,
    allId:null,
    status:null
  },
	watch:{
    data:function(){
      if(this.data.keyType === "在校状态"){
        this.isChecked = false;
      }else{
        this.isChecked = true;
      }
    },
    status:function(){
      if(this.status === '0'){
        this.currentstatus = '1';
        return;
      }else{
        this.currentstatus = '0';
      }
    }
	},
  computed:{
    
  },
	methods:{
    time(e){
      this.leave_time = e;
    },
    close(){//关闭模态
      if(this.data.keyType !== "在校状态"){
        const lis = jq('#ul-li').getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
          lis[i].className = "";
        }
      }
      this.leave_time = null;
      this.isChecked = true;
      this.value = "";
    },
    _toggle(e,item){
      const lis = jq('#ul-li').getElementsByTagName('li');
      for (var i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      // debugger
      if(this.value !== item){
        e.currentTarget.className = "li-active";
        this.isChecked = false;
        this.value = item;
      }else{
        this.isChecked = true;
        this.value = ""
      }
    },
    submit(){//确认调换
      let id = {
        user_id:this.checkedId,
        allId:this.allId
      }
      let data={};
      let url = ""
      if(this.data.keyType === "班级"){
        data = {
          class_id:this.value,
          ...id
        };
        url = "/user/updateclass";
      }else if(this.data.keyType === "老师"){
        data = {
          teacher:this.value,
          ...id
        };
        url = "/user/updateteacher";
      }else{
        data = {
          "sc_status":this.currentstatus,
          ...id,
          "leave_time":this.leave_time
        };
        url = "/user/updatestatus";
      }
      this.$confirm('您是否要调换选中学员的'+this.data.keyType+'？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.api(url,data);
      }).catch(() => {       
      });
    },
    api(url,data){
      // console.log(url,data);
      this.$ajax.post(url,data).then((res)=> {
        // console.log(res);
        if(res.code === 200){
          this.$emit('updata',res.data);
          this.dialogToggleVisible = false;
        }
      }).catch((err) =>{
        alert(err +'获取数据出错！')
      })
    }
	}
}
</script>
<style lang ="less">
/*样式详见check-dialog.css*/
</style>