<template>
  <div class="check-toggle" id="ch-product">
    <el-dialog v-model="dialogProductVisible" @open="open" @close = "close" :show-close="false" top="25%">
      <div class="toggle-content clearfix">
        <h3>{{title}}</h3>
        <div class="clearfix haded-checked">
          <p class="fl" v-if="checkedArray.length >0">已选择：</p>
          <ul class="fl clearfix"  id="title-product-li"> 
            <li v-for="(item,index) in checkedArray" @click="cancelNode(item)">{{item.label}}
              <i v-if="index < checkedArray.length -1" class="el-icon-arrow-right"></i>
            </li>
          </ul>
        </div>
        <div class="clearfix lis">
          <p class="fl">待选项：</p>
          <ul v-if = "isProduct"  class="clearfix fl" id="o-product-li">
            <li :class="lastArr.label === item.label ? 'li-active' : '' " v-for="(item,index) in readerdata" @click="nextNode($event,item)">{{item.label}} <i class="iconfont icon-xuanze2"></i></li>
          </ul>
          <ul v-else  class="clearfix fl" id="o-product-li">
            <li :class="lastArr.label === item.label ? 'li-active' : '' " v-for="(item,index) in readerdata" @click="nextNode($event,item)">{{item.label}} <i class="iconfont icon-xuanze2"></i></li>
          </ul>
        </div>
        <div>
          <el-button :disabled="isChecked" type="info" class="btn" @click="submit">确定选择</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const area = require('../../../../static/js/cityData.min.json');
import util from './../../../common/util.js'
import {mapState,mapGetters} from 'vuex'
export default{
	data(){
		return{
      dialogProductVisible:false,
      title:'请选择助听设备',
      isChecked:false,
      readerdata:[],
      checkedArray:[],
      lastArr:{},
      areaData:area,
      lastNode:null,
		}
	},
  props:{
    initProductData:{
      type:Object,
      default:function(){
        return {}
      }
    },
    isProduct:{
      type:Boolean,
      default:true
    }
  },
	watch:{
    initProductData:function(initial,next){
      let initProductData = this.initProductData.array;
      let renderTitleData = []; 
      if(Object.prototype.toString.call(initProductData) !== "[object Array]" || initProductData.length === 0) return;
      try{
        function getRenderData(key,init_arr,options_arr){
          for(let i = 0; i < init_arr.length; i++){
            for(let j = 0; j < options_arr.length; j++){
              if(init_arr[i][key] == options_arr[j]){
                renderTitleData.push(init_arr[i]);
                init_arr[i].children ? getRenderData(key,init_arr[i].children,options_arr) : '' ;
                break;
              }
            }
          }
        }
        if(this.isProduct){
          getRenderData('value',this.product,initProductData);
        }else{
          getRenderData('label',this.areaData,initProductData);
        }
        // 获取最后一个元素
        const last_arr = renderTitleData[renderTitleData.length-1];
        // 如果最后一个元素有子节点，则直接返回，否则删除最后一个；
        last_arr.children ? renderTitleData : renderTitleData.splice(renderTitleData.length-1,1);
        this.checkedArray = renderTitleData;
        // 获取最后一个元素，用于渲染数据列表
        const laset_render_arr = renderTitleData[renderTitleData.length-1];
        this.readerdata = last_arr.children ? last_arr.children :laset_render_arr.children;
        this.lastArr = last_arr;
      } catch(err){
        console.log(err)
      }
    },
    isProduct:function(){
      if(!this.isProduct && !this.lastArr.label){
        this.isChecked = true;
        this.readerdata = this.areaData.map((item)=>{ return item})
      }
    },
    lastNode:function(){
      if(!this.isProduct && this.lastNode){
        this.isChecked = false;
      }else if(!this.isProduct && !this.lastNode){
        this.isChecked = true;
      }
    }
	},
  computed:{
    ...mapState(['product']),
  },
  destroyed(){
  },
	methods:{
    open(){
      if(this.readerdata.length === 0){
        this.readerdata = this.product.map((item)=>{return item});
      }
    },
    close(){//关闭模态
      const lis = jq('#o-product-li').getElementsByTagName('li');
      const lis_title = jq('#title-product-li').getElementsByTagName('li');
      this.for_li(lis);
      this.for_li(lis_title);
      if(!this.isProduct){
        this.$emit('closeCheckArea',true)
      }
      this.checkedArray = [];
      this.readerdata = [];
      this.lastArr = {};
    },
    for_li(ele){
      for (let i = 0; i < ele.length; i++) {
        ele[i].className = "";
      }
    },
    nextNode(e,item){
      const lis = jq('#o-product-li').getElementsByTagName('li');
      const clname = e.currentTarget.className;
      this.lastArr = {};
      const addClass = ()=>{
        this.for_li(lis);
        e.currentTarget.className = "li-active";
      };
      if(item.children){
          this.lastNode = null;
          this.readerdata = item.children;
          this.checkedArray.push(item);
      }else{
        if(clname){
          this.lastNode = null;
          this.for_li(lis);
        }else{
          this.lastNode = item;
          addClass();
        }
      }
    },
    // 点击已选择项，进行取消
    cancelNode(item){
      const arr = this.checkedArray;
      this.lastArr = {};
      this.lastNode = null;
      const getParentNode = (key,data)=>{
        const new_arr = [];
        for (let i = 0; i < arr.length; i++) {
          // debugger
          if((arr[i][key]&&item[key]) &&(arr[i][key] === item[key])){
            // 获取父节点
            break;
          }
          new_arr.push(arr[i])
        }
        let readerdata = new_arr.length >0 ? new_arr[new_arr.length-1].children : data.map((item)=>{return item});
        return {"arr":new_arr,"readerData":readerdata};
      };
      let getResult = {};
      if(this.isProduct){
        getResult = getParentNode('value',this.product);
      }else{
        getResult = getParentNode('label',this.areaData);
      }
      this.checkedArray = getResult.arr;
      this.readerdata = getResult.readerData;
      const lis = jq('#o-product-li').getElementsByTagName('li');
      this.for_li(lis);
    },
    submit(){//确认调换
      this.lastNode ? this.checkedArray.push(this.lastNode) : this.checkedArray;
      this.$emit('productData',this.checkedArray);
      this.dialogProductVisible = false;
    }
	}
}
</script>
<style lang ="less">
  #ch-product{
    .el-dialog{
      width: 650px;
    }
  }
</style>
<style lang ="less" scoped>
/*样式详见toggle.vue*/
.check-toggle .toggle-content{
  .haded-checked{
    ul{
      margin:0;
    }
    li{
      position: relative;
      margin:10px 12px;
      background-color: #13ce66;
      i{ 
        position: absolute;
        right: -30px;
        top:10px;
        font-size: 26px;
        color:#169bd5;
        display: inline-block !important;
      }
    }
  }
  .haded-checked p,.lis p{
    line-height: 60px;
      font-size: 18px;
  }
  .lis{
    margin:20px 0;
  }
  #o-product-li{
    max-height: 300px;
    overflow-y: auto;
    width: 460px;
    margin:0;
  }
}

</style>