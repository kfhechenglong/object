<template>
  <div class="assessment">
    <div class="assessment-content clearfix">
      <div class="assessment-title fl">
        <ul class="clearfix">
          <li v-if="key != 0" v-for="(val,key) in listType" @click="currentType(val['key'],key)" :class="[key === currentTypeIndex ?'typeclass':'']">{{val['name']}}</li>
        </ul>
      </div>
      <div  class="assessment_warp fl clearfix" style="overflow:hidden;" v-loading.body="loading" element-loading-text="拼命加载中">
        <div class="assessment-test fl">
          <h3>测试记录</h3>
          <div class="test-date">
            <el-tree :data="_handleData" ref="tree" node-key="id" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true" :default-expanded-keys="[1]" :default-checked-keys="defaultChecked" @check-change="checkNode"></el-tree>
          </div>
        </div>
        <div class="assessment-details fl">
        <!-- 如果有数据则显示，否则提示暂无数据 -->
          <div v-if="hasData">
            <div class="content-title clearfix">
              <h3 class="fl">详情</h3>
              <ul class="fr">
                <li title="删除选中的数据" @click="_deleData"><i class="el-icon-delete2"></i>删除</li>
                <li title="扫码下载" @click="_download" v-if="currentTypeId != 0"><i class="fa fa-cloud-download"></i>下载</li>
                <li title="在线打印" @click="print"  v-if="currentTypeId != 0"><i class="fa fa-print"></i>打印</li>
              </ul>
            </div>
            <div class="content-info clearfix" >
              <ul class="clearfix">
                <li><span>测试时间：</span><em>{{testTime}}</em></li>
                <li><span>测试人：</span><em>{{checkedListData['teacher']}}</em></li>
                <li v-if="currentTypeId == 0"><span>平均识别率：</span><em style="color:red;">{{itemAccuracy}}</em></li>
              </ul>
            </div>
            <div class="content-talbe">
                <div class="group clearfix">
                  <span class="fl">记录表：</span>
                  <ul  class="clearfix fl">
                    <li v-for="index in tableHeader.length"  class="fl" @click= "showTable(index)" :class=" currentIndex == index-1 ? 'currentGroup' : '' " >第{{index}}组</li>
                  </ul>
                </div>
                <div class="table">
                  <div class="liu-table" id="tableinit">
                    <table v-if= "currentTypeId === 1">
                      <tr>
                        <td v-for="item,index in groupTableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td"><span>{{item}}</span></td>
                      </tr>
                      <tr v-for="val,index1 in distance">
                      <!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
                      <!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
                        <td v-for="item,index2 in groupTableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
                          {{ index2 == 0 ? val :''}}
                          <span v-if="currentRenderData[item] && currentRenderData[item][val]">
                            <span v-if="currentRenderData[item][val]['success'] >= 2 ">{{'√'}}</span>
                            <span v-else-if="currentRenderData[item][val]['false'] >= 2 ">{{'×'}}</span>
                            <span v-else>{{"—"}}</span>
                          </span>
                        </td>
                      </tr>
                    </table>
                    <table v-else-if= " currentTypeId === 7">
                      <tr>
                        <td v-for="item,index in groupTableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td"><span v-if="index !=0">{{item}}</span></td>
                      </tr>
                      <tr v-for="val,index1 in tableTr">
                      <!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
                      <!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
                        <td v-for="item,index2 in groupTableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
                          {{ index2 == 0 ? val :''}}
                          <span v-if="currentRenderData[val] && currentRenderData[val][item] !=0 ">
                            {{(item == val)&&(item) ? currentRenderData[val][item] :''}}
                            {{(item != val) && (val && item) ? currentRenderData[val][item] :''}}
                          </span>
                        </td>
                      </tr>
                    </table>
                    <table v-else>
                      <tr>
                        <td v-for="item,index in groupTableHeader" :class="['headerbg', item == '' ?'gray' :'']" ref="td"><span v-if="index !=0">{{item}}</span></td>
                      </tr>
                      <tr v-for="val,index1 in tableTr">
                      <!-- 对表行和列分别循环，其中行和列的值为空时背景颜色为gray -->
                      <!-- 每行的第一个td显示词组的词，tableTr的第一个元素为空 -->
                        <td v-for="item,index2 in groupTableHeader" :class="[(!item || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
                          {{ index2 == 0 ? val :''}}
                          <span v-if=" (index1 === 0) && tonePIN[item]">
                            {{tonePIN[item]['statistics']}}
                          </span>
                          <span v-if=" (index1 === 1) && tonePIN[item]">
                            <i v-for="ele in tonePIN[item]['hasFalse']"><em v-if="ele != '—'">{{item}}/</em><em></em>{{ele}}<br></i>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <!-- 音素测听的评价 -->
                <div  v-if= "currentTypeId != 1 && currentTypeId != 7">
                  <toneStar :starValue="starValue" :groupId="groupId"></toneStar>
                </div>
                <!-- 林氏六音的评价 -->
                <div v-if= "currentTypeId == 1">
                </div>
                <div class="last-l-t clearfix">
                  <span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <em class="fl">{{checkedListData.textarea}}</em>
                </div>
            </div>
          </div>
          <div v-else class="noData"> <img :src="nodata" alt="" width="300px"></div>
        </div>
      </div>
    </div>
    <Printliu ref="print" :showQQCode="false" :distance="distance" :tableHeader="groupTableHeader" :info="info" :resultData="resultData" :resultEstimateArry="resultEstimateArry"></Printliu>
    <Printtone  ref="printtone"  :starValue="starValue" :showQQCode="false" :info="info" :jieguo="tonePIN" :rederData="resultData"></Printtone>

  </div>
</template>

<script>
// const listType = [{name:'林氏六音',type:1},{name:'音素识别',type:2},{name:'声调识别',type:3},{name:'声母识别',type:4},{name:'自定义测试',type:0}];
import {mapState,mapMutations} from'vuex'
import util from'../../../../common/util'
import liuStar from'../../commonvue/star/liustar.vue'
import toneStar from'../../commonvue/star/tonestar.vue'
import Printliu from'../../commonvue/printliu.vue'
import Printtone from'../../commonvue/printTone.vue'
export default {
  components:{
    liuStar,
    toneStar,
    Printliu,
    Printtone,
  },
  data() {
    return {
      listType:Options.testType1,
      // 表格数据
      groupTableHeader:[],
      tableTr:{},
      // 当前渲染的列表
      currentIndex:0,
      markData: [],
      nodata:Options.nodata,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 测试记录的列表ID
      listId:null,
      testTime:'暂无记录',
      itemAccuracy: "暂无数据",
      tableHeader:[],
      // 当前的音素类型
      currentTypeIndex:1,
      currentTypeId:0,
      // 渲染的数据
      currentRenderData:'',
      tonePIN:'',//音素测试数据
      // 选中要删除的数据
      checked:[],
      distance:[],
      valuetone:3,
      valueStar:{},
      starLiu:[],//六音星星
      // 打印的信息
      info:null,
      resultData:null,
      resultEstimateArry:null,
      groupId:Number,
      groupIdArray:[],
      starValue:{},//星级综合评价
      loading:true,
      hasData:true
    };
  },
  created(){
  },
  computed:{
    codeInfo:function(){//生成二维码的信息
      return {'time':this.time,'type':null,'user_id':null,'file':'ceshi','id':null}
    },
    // 获取学生的id
    ...mapState(['studyID']),
    // 处理数据
    _handleData:function(){
      let str = this.markData;
      let data = [];
      // 如果数据为空则直接返回
      if(str === null) {
        data = [];
        return data;
      };
      str.forEach((item) =>{
        // 获取日期
        let getTime = new Date(item['time']);
        let currentTime = new Date();
        // console.log(getTime ,currentTime);
        let labelTime = getTime.getFullYear()+'年' + (+getTime.getMonth() + 1) +'月' +getTime.getDate()+'日';
        let parentTime = getTime.getFullYear()+'年';
        // 判断有没有当前元素的年份
        let year = "";
        for (var i = 0; i < data.length; i++) {
          year += data[i]['label'] ;
        };
        if(year.indexOf(parentTime) > -1){
          for (var i = 0; i < data.length; i++) {
            // 若有则在子对象中添加
           if(data[i]['label']  === parentTime) {
            data[i]['children'].push({'label':labelTime,'id':item['id']});
           }
          }
        }else{//如果没有则push一个，
          let obj = {
            "label":parentTime,
            // "id":+data.length + 1,
            'children':[{'label':labelTime,'id':item['id']}]
          }
          data.push(obj)
        }
      });
      return data;
    },
    // 默认选中的节点
    defaultChecked:function(){
      if(this._handleData[0]){
        let defaultCheckedId = +this._handleData[0]['children'][0]['id'];
        // 显示默认选中的学生的测试数据
        this.handleNodeClick(this._handleData[0]['children'][0])
        return [defaultCheckedId];
      }
      return [0];
    } ,
     // 处理选择测试列表的数据
    checkedListData(){
      let markData = this.markData;
      let whoTest = "暂无数据",
          textarea = "暂无数据";
      let renderData = [];
      // 表格的表头
      let tableHeader = [];
      let distance = [];
      // 词组的id值
      let groupId = [];
      if(markData){
        for (let i = 0; i < markData.length; i++) {
          if(markData[i]['id'] === this.listId){
            // console.log(markData[i]['id'],this.listId)
            if (!markData[i].data){break}
              // console.log(markData[i].data)
            let dataToObj = JSON.parse(markData[i].data);
            // 音素测听评价
            if(this.currentTypeId != 1 && this.currentTypeId != 0 && markData[i].accuracy){
              this.tonePIN = JSON.parse(markData[i].accuracy);
            }
            // console.log(this.tonePIN)
            // debugger;
            for (let val in dataToObj) {
              groupId.push(val);
              renderData.push(dataToObj[val]);
              // 获取分组的词组
              let tableItem = [];
              for(let value in dataToObj[val] ){
                // console.log(typeof dataToObj[val][value])
                if(typeof dataToObj[val][value] === 'object'){
                  tableItem.push(value);
                  if(value == 'm'){
                    for(let l in dataToObj[val][value]){
                      distance.push(l)//获得距离
                    }
                  };
                }else{
                  tableItem.unshift(dataToObj[val][value]);
                }
              };
              // 判断该词组的元素是否大于6
                if(tableItem.length < 5){
                  let tableshow = [];
                  tableshow = tableItem.concat();
                  for (let i = 0; i < 5 - tableItem.length; i++) {
                    tableshow.push('')
                  };
                  tableItem = tableshow;
                };
                if(this.currentTypeId === 1){
                  tableItem.unshift('距离（米）')
                }else if((this.currentTypeId === 2) ||(this.currentTypeId === 3)||(this.currentTypeId === 4)){
                  tableItem.unshift('0')
                };
              // 得到要渲染的表格组
              tableHeader.push(tableItem);
              // console.log(dataToObj[val]);
            };
            this.groupIdArray = groupId;
            console.log(tableHeader,renderData);
            whoTest = markData[i]['teacher'];
            textarea = markData[i].textarea;
            this.tableHeader = tableHeader;
            this.distance = distance;
            break;
          }
        };
      };
      return {'textarea':textarea,'teacher':whoTest,'tableHeader':tableHeader,'renderData':renderData};
    },
  },
  watch: {
    checkedListData:function(){
      this.showTable(1);
    }
  },
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      vm.currentType(1,1);
    })
  },
  beforeRouteLeave (to, from, next) {
    this.groupTableHeader =[];
    this.tableHeader = [];
    this.currentRenderData = [];
    this.currentTypeIndex = 1;
    this.currentTypeId = 0;
    this.loading = true;
    this.hasData = true;
    next();
  },
  methods: {
    _download(){//下载报告
      util.getterIpCode(this,next);
      function next(pointer){
        pointer.$store.commit('code_api','bg');
        if(pointer.currentTypeId == 1){
          pointer.$refs.print._isToPrint(true);
          // pointer.$refs.print.showCode();
        }else{
          pointer.$refs.printtone._isToPrint(true);
          // pointer.$refs.printtone.showCode();
        }
      };
    },
    print(){//打印按鈕
      if(this.currentTypeId == 1){
        this.$refs.print._isToPrint();
      }else{
        this.$refs.printtone._isToPrint();
      }
    },
    handleNodeClick(data) {
      if(data.id === undefined){return;}
      this.testTime = data.label;
      // 获取当前的列表ID
      this.listId = data.id;
      this.checked = [data.id];
      // 选中状态
      this.$refs.tree.setCheckedKeys([data.id]);
      this.hasStar(data.id);
    },
    // 获取评价结果
    hasStar(str){
      let data = this.markData;
      for (var i = 0; i < data.length; i++) {
        if(!data[i].accuracy){return}
        if(data[i].id == str){
          this.printInfo(data[i]);
          if(this.currentTypeId === 1){//获得林氏六音的评价结果
            this.valueStar = JSON.parse(data[i].accuracy);
            this.resultEstimateArry = JSON.parse(data[i].accuracy)['all'];
          }
        }
      }
    },
    // 打印要填写的信息
    printInfo(str){
      // 获取评价信息
      if(str.advise){
        this.starValue = JSON.parse(str.advise);
      }
      // 获取左右耳的听力设备
      const par = {
        'eq_right':str.eq_right,
        'eq_left':str.eq_left
      }
      sessionStorage.setItem('user_text', JSON.stringify(par));
      sessionStorage.setItem('textarea', str.textarea);
      let ear = str.ear== 'L' ? '左耳' : (this.currentear == 'R' ? '右耳' : '双耳');
      let info = {
        'teacher':str.teacher,
        'time':util.dateToggle('年','月','日',str.time),
        'ear':ear,
        'environment':str.environment
      };
      this.resultData = JSON.parse(str.data)
      // console.log(str)
      this.info = info;
    },
    // 选择显示的音素类型
    currentType(str,index){
      this.loading = true;
      sessionStorage.setItem('test_id',JSON.stringify(str));
      // 数据请求
      let agruments = {
       'user_id':this.studyID,
       'type_id':str
      };
      this.currentTypeId = str;
      this.currentTypeIndex = index ;
      if(str === 7){
        let agruments = {
         'user_id':this.studyID
        };
        this._api(this,'/voices/showlist',agruments);
        return;
      };
        this._api(this,'/assess/showlist',agruments);
    },
    // 要显示的表格
    showTable(str){
      if (this.checkedListData['tableHeader'].length >0) {
        let index = str-1;
        this.currentIndex = index;
        // 当前的词组id值
        this.groupId = +this.groupIdArray[index];
        // 当前要渲染的数据
        this.currentRenderData = this.checkedListData['renderData'][index];
        // 当前的渲染表头
        this.groupTableHeader = this.checkedListData['tableHeader'][index];
        let groupTableHeader =  this.checkedListData['tableHeader'][index].concat();
        // 林氏六音
        if(this.currentTypeId === 7){
          // 获取正取率
          this.itemAccuracy = groupTableHeader.shift();
          this.tableTr = groupTableHeader.concat().slice(0,2) ;
        }else{
          this.tableTr = ['识别率','混淆']
        }
        // 计算表格
        this.$nextTick(function(){
          util.initTable('#tableinit','td',groupTableHeader.length,groupTableHeader.length);
        });
      }
    },
    // 选中的节点
    checkNode(data,checked, indeterminate){
      // 获取选中测试的数据
      this.checked = this.$refs.tree.getCheckedKeys();
      // console.log(this.checked)
    },
    // 删除选中的数据
    _deleData(){
      console.log(this.checked);
      if(this.checked.length <= 0){msgTipsErr(this,'请选择您要删除的数据');return;}
      // util._click(this,deleData);
      deleData(this);
      function deleData(that){
        // if(that.checked.length>0){
          that.$confirm('您是否要删除选中的数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() =>{
                // 发送删除请求
                let agruments = {
                  'id':that.checked,
                  'user_id':that.studyID,
                  'type_id':that.currentTypeId
                };
                // 删除个性化听辨的数据
                if(that.currentTypeId === 7){
                  that._api(that,'/voices/delete',agruments,true);
                  return;
                };
                // 删除其它测试的数据
                that._api(that,'/assess/delete',agruments,true);
              }).catch(() =>{
                msgTipsSuccess(that,'您已取消删除!');
                return;
              });
        // }else{
        //   msgTipsErr(that,'请选择您要删除的数据');
        // };
      };
    },
    // api接口
    _api(str,api,agruments,dele){
      console.log(agruments)
       str.$ajax.post(api,agruments).then((response) =>{
          console.log(response);
          // return;
          if (response.code ===200){
            // str.markData = response.data;
            str.markData = response.data;
            str.markData.length > 0 ? this.hasData = true : this.hasData = false;
          }else{
            str.markData = [];
            this.hasData = false;
          };
          this.loading = false;
          // 删除时的提示信息
          if(dele){
            str.checked.length = 0;
            msgTipsSuccess(str,'操作完成！');
          }
        }).catch((err) =>{
          msgTipsErr(str,'请求出现异常！');
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
@titleH:50px;
@border:#ccc;
@contitle:40px;
@bcl:#65c0df;
@ml22:22px;
.assessment{
	padding-left:20px;
	.assessment-title{
		// padding-top: 10px;
		ul{
			// margin-top: 10px;
			height: @titleH;
			line-height:@titleH;
			li{
				cursor:pointer;
				 border-radius: 5px 0 0 5px;
				// margin-left:5px;
				background-color: #eee;
				width: 110px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: #337ab7;
        margin-bottom: 10px;
        box-shadow: 0px 2px 2px #ccc;
        // &:hover{
        //    background-color: #88d89f;
        //   color:#fff;
        //  }
			}
      .typeclass{
        background-color: @bcl;
        color:#fff;
      }
		}
  }
  .assessment-content{
    margin-top:30px;
    .assessment-test{
      // padding:15px;
      border:3px solid @bcl;
      background:@bcl;
      border-radius: 0 13px 13px 13px;
      box-shadow:1px 1px 5px @bcl;
      // min-width: 200px;
      // max-width:300px;
      height:500px;
      h3{
        font-size:20px;
        line-height: @contitle;
        // margin:0px auto;
        text-indent: 1em;
       border-radius: 0 10px 0 0;
        background: #fff;
      }
      .test-date{
        // width:90%;
        // margin:0px auto;
        overflow-y: auto;
        height: 460px;
        border-radius: 0 0 10px 10px;
        background-color:#fff;
        .el-tree{
          border:0px none;
        }
      }
    }
    .assessment-details{
      // margin-right:20px;
      // width: 900px;
      /**暂无数据时的提示***/
      .content-title{
        margin-left: 20px;
        padding-left:20px;
        width:calc(~"100% - 20px");
        box-sizing: border-box;
        h3{
          font-size:20px;
        }
      }
      .content-info{
        margin-left:@ml22;
        ul{
          li{
            float: left;
            width: 33.33%;
            line-height: 50px;
            font-size: 18px;
            color:#333;
          }
        }
      }
      .last-l-t{
        margin-left:@ml22;
        margin-top:20px;
        }
      .content-talbe{
        // border:1px solid #ccc;
        height:450px;
        .star{margin-left:@ml22;}
      }
      .group{
          span{
            margin-left: @ml22;
            font-size: 18px;
            letter-spacing: 0.3em;
          }
        }
      .liu-table{
        margin:0 0 0 22px;
        width: 80%;
        max-height: 250px;
        table{
          width: 100%;
          height: 100%;
          border-collapse: collapse;
        }
        /*表头背景色*/
        .headerbg{
          background-color: #eef1f6;
        }
        .gray{
          background-color: #eee;
        }

        /*背景色高亮*/
        .highlight{
          background-color: orange;
          box-shadow: 0 0 5px orange;
          opacity:0.3;
          -webkit-animation-name: light;
          -webkit-animation-duration: 500ms;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-timing-function: ease-in-out;
        }
        .pasehighlight{
          background-color: orange;
          box-shadow: 0 0 5px orange;
        }
        @-webkit-keyframes light{
          0% {
                  opacity:0.1;
              }
          100% {
                  opacity:1;
              }
        }
        td,th{
          box-sizing: border-box;
          text-align: center;
          padding:0px;
          border: 1px solid #ccc;
        }
        td span{
          // display: inline-block;
          // width: 77px;
        }
        tr{
          height: 45px;
        }
      }
    }
  }
}
</style>
