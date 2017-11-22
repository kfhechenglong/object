<template>
  <div class="gameType">
    <dl class="games clearfix">
        <dt>
          选择游戏:
        </dt>
        <dd v-for="(item,index) in currentgame">
          <div v-bind:class="[item['typegame'] == Active?'activeImg':'','img']" @click="addActive(item,index)">
            <img :src="web_url + item['img']" :onerror="errorImg">
            <p>
              <i class="fa fa-check-circle-o"></i>
            </p>
          </div>
          <span style="display:block;">{{item['name']}}</span>
          <!-- <div class="select-w" v-if="currentgame[index]['level'] && item['typegame'] == Active">
            <el-select v-model="currentgame[index]['min']" @change="change($event,index)">
              <el-option
                v-for="(key,val) in item['level']"
                :key="val"
                :label="val"
                :value="val"
                >
              </el-option>
            </el-select>
          </div> -->
        </dd>
    </dl>
    <dl class="clearfix" v-if="data_arr.length > 0">
        <dt>
          游戏等级：
        </dt>
        <dd>
          <el-radio-group v-model="level" @change="change">
            <el-radio-button v-for="(item,index) in data_arr" :disabled=" level == item[1]" size="large" :label="item[1] " :key="item[1]">{{item[0]}}</el-radio-button>
          </el-radio-group>
        </dd>
    </dl>
    <div v-else style="height:30px;">
        
    </div>
  </div>
</template>
<script>
const nodata = require('../../../../static/images/nodata.png');
export default{
	data(){
		return{
      Active:'',
      test_id:null,
      web_url:web_url,
      currentgame:[],
      value: {},
      errorImg:'this.src="' + nodata + '"' ,
      level:"",
      data_arr:[]
    }
	},
	created (){
    this.test_id = sessionStorage.getItem('test_id');//获取功能模块
    this.$ajax.post('/game/showlist',{'id':this.test_id}).then((response) =>{
      console.log(response)
      if(response.code ===200){
        var add_data = response.data;
        this.currentgame = add_data;
        // 获取点击返回按钮的参数
        if(this.$route.query && this.$route.query['isEar']){
          this.Active = this.$route.query['crtgame'];
          this.level = this.$route.query['level'];
          let data = this.currentgame;
          for (var i = 0; i < data.length; i++) {
            if(data[i].typegame === this.Active){
              this.addActive (data[i],i,true);
              break;
            }
          }
        }else{//首次加载时的默认选项
          this.Active = this.currentgame[0]
          this.addActive (this.Active,0);
        }
      }else{
        alert("游戏获取出错！")
      }
    }).catch((err) =>{
      alert(err + "游戏获取出错！")
    })
  },
  computed:{
    
  },
  props:{
    ActiveContent:null,
    default:function (){
       return 0;
     }
  },
  methods : {
    change(){
      this.$emit('active',{'active':this.Active,'level':this.level});
    },
    addActive (item,index,flag){
      let level = item.level,
        sortArray = [];
        this.data_arr = [];
      if(level){
        for(let key in level){
          sortArray.push(level[key])
        }
        sortArray.sort();
        sortArray.forEach((item) =>{
          for(let key in level){
            if(item === level[key]){
              this.data_arr.push([key,level[key]])
            }
          }
        })
        // this.level = (this.data_arr[0][1] == this.level) || (this.data_arr[1][1] == this.level) ? this.level : this.data_arr[0][1];
        if(!flag){
           this.level = this.data_arr[0][1];
        }
      }else{
        this.level = "";
      }
      this.currentChecked = index;
      this.Active = item['typegame'];
      // 发送给父组件
      this.$emit('active',{'active':this.Active,'level':this.level});
    },
  }
}
</script>
<style lang ="less">
.gameType{
  dl{
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background-color:#13ce66;
        border:1px solid #13ce66;
        box-shadow: -1px 0 0 0 #13ce66;
        color:#fff;
      }
    &.games{
      dd{
        float: left;
        margin-left: 40px;
      }
      dt{
        margin-top: 45px;
      }
      .img{
        position: relative;
        margin-bottom:5px;
        cursor: pointer;
      }
      span{
        margin-left: 20px;
      }
      p{  
        display: none;
        width: 100px;
        height: 100px;
        margin:0px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        i{
          position: absolute;
          left:50%;
          top:50%;
          transform: translate(-50%,-50%);
          font-size: 40px;
          color:#fff;
        }
      }
      .activeImg{
        p{display: block;}
      }
    }
  }
  dd{
    .active{
      background-color: #13ce66;
      color:#fff;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 5px solid #e6f0e5;
      box-shadow: 1px 1px 1px;
      display: block;
    }
  }
}
	
</style>