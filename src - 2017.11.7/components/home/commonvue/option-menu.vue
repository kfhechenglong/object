<template>
  <div class="check-toggle">
    <el-dialog v-model="dialogToggleVisible" @open="open" @close = "close" :show-close="false" top="25%">
      <div class="toggle-content clearfix">
        <h3>{{title}}</h3>
        <ul class="clearfix" id="print-type">
          <li :class="getItem(item) ? 'li-active' : '' " v-for="(item,index) in data" @click="_toggle($event,item)">{{item.name}} <i class="iconfont icon-xuanze2"></i></li>
          <li v-if="!isAllPrint && curtStatus === 0" @click="printBaseInfo($event)">个人信息 <i class="iconfont icon-xuanze2"></i></li>
        </ul>
        <div v-if="curtStatus === 0 || isAllPrint">
          <el-button :disabled="isChecked" type="info" class="btn" @click="submit">{{btn}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from './../../../common/util.js'
import {mapState,mapGetters} from 'vuex'
// 耳聋程度
var deaf_degree = [{name: '正常',label: '正常'}, {name: '轻度',label: '轻度'}, {name: '中度',label: '中度'}, {name: '重中度',label: '重中度'}, {name: '严重',label: '严重'}, {name: '极严重',label: '极严重'}];
// 耳聋性质
var deaf_nature = [{name: '传导性',label: '传导性'}, {name: '感音神经性',label: '感音神经性'}, {name: '混合性',label: '混合性'}];
// 测试类型
// var testType = [{name:'助听听阈',key:6},{name:'林氏六音',key:1},{name:'音素识别',key:2},{name:'声调识别',key:3},{name:'声母识别',key:4}];
// 助听听阈参数
var optionsEffect = [{name: '最适',label: '最适'}, {name: '较适',label: '较适'}, {name: '适',label: '适'}, {name: '看话能力',label: '看话能力'}];
var optionsDegree = [{name: '很配合',label: '很配合'}, {name: '一般',label: '一般'}, {name: '不配合',label: '不配合'}];
var optionsTestModel = [{name:'BOA',label:'BOA'},{name:'VAR',label:'VAR'},{name:'PA',label:'PA'},{name:'PTA',label:'PTA'}];
var optionsTone = [{name:'啭音',label:'啭音'},{name:'纯音',label:'纯音'}];
export default{
	data(){
		return{
      dialogToggleVisible:false,
      isChecked:true,
      value:'',
      title:'请选择要打印的类型',
      btn:'确定打印',
      data:testType,
      set:new Set(),
      baseinfo:false,
      checkData:{},
      flag:true
		}
	},
  props:{
    isAllPrint:{
      type:Boolean,
      default:true
    },
    // 选择check选择
    curtStatus:{
      type:Number,
      default:0
    },
    // input 框中为单选时的value
    htmlValue:{
      type:String,
      default:''
    },
    // input框为多选时的value array
    form:{
      type:Object,
      default:function(){
        return {};
      }
    },
    teachers:{
      type:Array,
      default:function(){
        return [];
      }
    },
    classNameList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
	watch:{
    value:function(){
      if(this.value){
        this.isChecked = false;
      }else{
        this.isChecked = true;
      }
    },
    curtStatus:function(){
      switch(this.curtStatus){
        case 0 :
        this.data = testType;
        this.title = "请选择要打印的类型";
        this.btn = '确定打印';
        break;
        case 1 :
        this.isChecked = false;
        this.data = this.teachers;
        this.title = "请选择班主任";
        this.btn = '确定选择';
        break;
        case 2 :
        this.isChecked = false;
        this.data = deaf_degree;
        this.title = "请选择耳聋程度";
        break;
        case 3 :
        this.isChecked = false;
        this.data = deaf_nature;
        this.title = "请选择耳聋性质";
        break;
        case 4 :
        this.isChecked = false;
        this.data = this.classNameList.map((item)=>{
          return {
            'name':item.class_name,
            'class_id':item.class_id
          }
        });
        this.title = "请选择班级";
        this.btn = '确定选择';
        break;
        case 5 :
        this.isChecked = false;
        this.data = optionsTestModel;
        this.title = "请选择测试方法";
        this.btn = '确定选择';
        break;
        case 6 :
        this.isChecked = false;
        this.data = optionsTone;
        this.title = "请选择测试音";
        this.btn = '确定选择';
        break;
        case 7 :
        this.isChecked = false;
        this.data = optionsDegree;
        this.title = "请选择配合度";
        this.btn = '确定选择';
        break;
        case 8: case 9:
        this.isChecked = false;
        this.data = optionsEffect;
        this.title = "请选择助听效果";
        this.btn = '确定选择';
        break;
      }
    }
	},
  destroyed(){
    // 在档案列表中打开后，关闭组件时，销毁个人信息打印
    this.$store.commit('printInfoBase',false);
  },
	methods:{
    getItem(item){//选中当前input框中已经有的选项
      if(!this.isAllPrint){
        if(item.name === this.htmlValue){
          this.checkData = item;
          return true
        }else{
          return false
        }
      } else if(this.isAllPrint && this.curtStatus === 1){
        const arr = this.form.teacher;
        for (let i = 0; i < arr.length; i++) {
          if(arr[i] === item.name){
            return true;
          }
        }
      }else if(this.isAllPrint && this.curtStatus === 4){
        const id = this.form.class_id;
        for (let i = 0; i < id.length; i++) {
          if(id[i] === item.class_id){
            return true;
          }
        }
      }
    },
    open(){
      const data = this.data;
      if(this.isAllPrint){
        for (let j = 0; j < data.length; j++) {
          if(this.curtStatus === 1){
            const arr = this.form.teacher;
            for (let i = 0; i < arr.length; i++) {
              if(arr[i] === data[j].name){
                this.set.add(data[j]);
              }
            }
          }else if(this.curtStatus === 4){
            const id = this.form.class_id;
            for (let i = 0; i < id.length; i++) {
              if(id[i] === data[j].class_id){
                this.set.add(data[j]);
              }
            }
          }
        }
      }
    },
    close(){//关闭模态
      const lis = jq('#print-type').getElementsByTagName('li');
      for (let i = 0; i < lis.length; i++) {
        lis[i].className = "";
      }
      this.isChecked = true;
      this.baseinfo = false;
      this.value = '';
      this.set.clear();
      //选择输入信息时，关闭Dialog 时，还原父组件的值
      if(!this.isAllPrint || this.curtStatus !== 0){
        setTimeout(()=>{
          if(!this.curtStatus !== 0){
            this.$emit('toggleNum',0);
          }
        },300)
      }
    },
    // 打印个人信息
    printBaseInfo(e){
      const clname = e.currentTarget.className;
      if(clname){
        this.baseinfo = false;
        e.currentTarget.className = '';
      }else{
        this.baseinfo = true;
        e.currentTarget.className = 'li-active';
      }
      this.flagBtn();
    },
    _toggle(e,item){
      const lis = jq('#print-type').getElementsByTagName('li');
      const clname = e.currentTarget.className;
      const addClass = ()=>{
        for (var i = 0; i < lis.length; i++) {
          lis[i].className = "";
        }
        e.currentTarget.className = "li-active";
      };
      if(this.isAllPrint && this.curtStatus === 0){
        //批量功能得打印选择
        if(clname){
          e.currentTarget.className = "";
          this.value = "";
        }else{
          e.currentTarget.className = "li-active";
          this.value = item;
        }
        return;
      }else if(!this.isAllPrint && this.curtStatus !== 0){
        if(clname){
          this.checkData = {};
          e.currentTarget.className = "";
        }else{
          this.checkData = item;
          addClass();
        }
        this.submit()
        return;
      }else{
        // 档案信息页的打印类型的选择
        if(clname){
          e.currentTarget.className = "";
          this.set.delete(item);
        }else{
          this.set.add(item);
          e.currentTarget.className = "li-active";
        }
        if(!this.isAllPrint){
          this.flagBtn();
        }
      }
    },
    // 控制按钮
    flagBtn(){
      if(this.baseinfo || Array.from(this.set).length > 0){
        this.isChecked = false;
      }else{
        this.isChecked = true;
      }
    },
    submit(){//确认调换
      if(this.isAllPrint && this.curtStatus === 0){
        this.$emit('testType',this.value);
      }else if(!this.isAllPrint && this.curtStatus !== 0){
        this.$emit('testType',this.checkData);
      }else{// 打印基本信息
        this.$emit('testType',Array.from(this.set));
        if(this.baseinfo){
          this.$store.commit('printInfoBase',true);
        }else{
          this.$store.commit('printInfoBase',false);
        }
      }
      this.dialogToggleVisible = false;
    }
	}
}
</script>
<style lang ="less">
/*样式详见toggle.vue*/
</style>