<template>
  <div class="gameType">
    <dl class="games clearfix">
        <dt>
          选择游戏:
        </dt>
        <dd v-for="(item,index) in currentgame">
          <div v-bind:class="[item['typegame'] == Active?'activeImg':'','img']" @click="addActive(item['typegame'],index)">
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
    <dl class="clearfix">
        <dt>
          游戏等级：
        </dt>
        <dd>
          <el-radio-group v-model="level" @change="change">
            <el-radio-button size="large" :disabled="jd" label="2">简单</el-radio-button>
            <el-radio-button size="large" :disabled="zd" label="3">中等</el-radio-button>
            <el-radio-button size="large" :disabled="kn" label="4">困难</el-radio-button>
          </el-radio-group>
        </dd>
      </dl>
  </div>
</template>
<script>
// const cat = require('../../../../static/images/cat.png');
// const eggFrenzy = require('../../../../static/images/eggFrenzy.png');
// const dog = require('../../../../static/images/dog.png');
// const diglett = require('../../../../static/images/diglett.png');
// const fish = require('../../../../static/images/fish.png');
// const pokemon = require('../../../../static/images/pokemon.png');
// const eggFrenzylead = require('../../../../static/images/eggFrenzylead.png');
// const crow = require('../../../../static/images/crow.png');
// const children = require('../../../../static/images/children.png');
// const train = require('../../../../static/images/train.png');
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
      jd:true,
      zd:true,
      kn:true,
    }
	},
	created (){
    this.test_id = sessionStorage.getItem('test_id');//获取功能模块
    this.$ajax.post('/game/showlist',{'id':this.test_id}).then((response) =>{
      console.log(response)
      if(response.code ===200){
        var add_data = response.data;
        add_data.forEach((item)=>{
          let obj = item.level;
          let sortArray = new Array;
          for(var key in obj){
            sortArray.push(obj[key])
          }
          sortArray.sort();
          for(var key in obj){
            if(obj[key] == sortArray[0]){
              item.min= key;
            }
          }
        });
        this.currentgame = add_data;
        // 获取点击返回按钮的参数
        if(this.$route.query && this.$route.query['isEar']){
          this.Active = this.$route.query['crtgame'];
          this.level = this.$route.query['level'];
          let data = this.currentgame;
          for (var i = 0; i < data.length; i++) {
            if(data[i].typegame === this.Active){
              this.addActive (this.Active,i);
              break;
            }
          }
        }else{//首次加载时的默认选项
          this.Active = this.currentgame[0]['typegame']
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
    addActive (name,index){
      this.jd = true;
      this.zd = true;
      this.kn = true;
      var cur_level = this.currentgame[index].level;
      for(var key in cur_level){
        if("简单" === key){
          this.jd = false;
        }else if("中等" === key){
          this.zd = false;
        }else{
          this.kn = false;
        } 
      }
      if(!this.level){this.level = this.currentgame[index].min === "简单" ? "2" : "3";};
      if(!cur_level){//如果游戏没有难度等级，则清空选项！
        this.level = ""
      }
      this.currentChecked = index;
      this.Active = name;
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
        /*&:hover{
          p{  
            display:block;
            background-color: rgba(0,0,0,0.3);
          }
        }*/
      }
      span{
        margin-left: 20px;
      }
      /*.select-w{
        width: 80px;
        .el-input__inner{
          height: 28px;
        }
        .resize-triggers{
          display: none;
        }
      }*/
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
        /*&:hover{
          p {
            background-color: rgba(0,0,0,0.3);
          }
        }*/
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