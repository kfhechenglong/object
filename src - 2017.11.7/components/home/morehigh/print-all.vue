<template>
<div class="reportAllClass" id="pageall">
    <div id="print-tone">
        <div id="print-warp-out">
            <div class="fiexd-w">
                <div class="print-warp" id="img-out">
                    <div v-if="isToPrintBase">
                        <baseInfoPrint :imgSrc="imgSrc" :errorImgBody="errorImgBody" :errorImgGirl="errorImgGirl" :data="studydata" :organization ="infoJigou"></baseInfoPrint>
                    </div>
                    <div class="print-tone clearfix" :id="'toimg' + index" v-for="(item,index) in data">
                        <header class="print-title">
                            <h2>{{readerType[index].name}}测试报告</h2>
                              <ul class="clearfix">
                                <li  class="li-name">
                                  <span>姓名：</span>
                                  <div>{{user_Info(item)['name']}}</div>
                                </li>
                                <li class="li-in">
                                  <span>性别：</span>
                                  <div>{{user_Info(item)['gender']}}</div>
                                </li>
                                <li>
                                  <span>生日：</span>
                                  <div>{{user_Info(item)['birth']}}</div>
                                </li>
                                <li>
                                  <span>日期：</span>
                                  <div >{{getTime(item)}}</div>
                                </li>
                              </ul>
                              <div class="sb clearfix">
                                <p class="fl">测听设备佩戴：</p>
                                <span class="fl">左耳：{{item.userText.eq_left.string}}</span>
                                <span class="fl sb-r">右耳：{{item.userText.eq_right.string}}</span>
                              </div>
                              <div class="ear zu clearfix"  v-if="readerType[index].key == 6">
                                <p class="fl">测试方法：<span>{{item.userText.testmodel}}</span></p>
                                <p class="fl">给声方法：<span>{{item.userText.getmodel}}</span></p>
                                <p class="fl">配合度：<span>{{item.userText['degree']}}</span></p>
                                <p class="fl">测试耳：<span>{{item.userText.radioEar}}</span></p>
                                <p class="fl">测试音：<span>{{item.userText.tonetype}}</span></p>
                              </div>
                              <div v-else class="ear clearfix">
                                <p class="fl">测试耳：{{getEar(item)}}</p>
                                <p class="fl">测试环境：{{item.userText['environment']}}</p>
                              </div>
                        </header>
                        <div v-if="readerType[index].key == 6" class="clearfix">
                            <!-- 听力图 -->
                            <div class="clearfix">
                                <div class="youtu"  id="youImg">
                                    <span style="margin-left: 140px">右耳</span>
                                    <img :src="allPrintImgs[index*2+1]" height="350px" width="350px" style="margin-top: 20px"/>
                                    <!-- <img :src="youImg" height="350px" width="350px" style="margin-top: 20px"/> -->
                                    <table class="youTable" width="300px" style="margin-top: 20px;border:0; "  border="1" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th  style="border:0">右</th>
                                            <th style="border:0">平均听阈</th>
                                            <th style="border:0">助听听阈</th>
                                            <th style="border:0">助听器效果</th>
                                        </tr>
                                        <tr class="tr" >
                                            <td style="border-left:0;">AC</td>
                                            <td style="border-right:0;">{{item.userText.ACR}}</td>
                                            <td style="border-right:0;border-left:0;">{{item.userText.RHTL}}</td>
                                            <td style="border-right:0;border-left:0;">{{item.userText.REffect}}</td>
                                        </tr>
                                        <tr class="tr" >
                                            <td style="border-left:0;">BC</td>
                                            <td style="border-right:0;">{{item.userText.BCR}}</td>
                                            <td style="border-right:0;border-left:0;"></td>
                                            <td style="border-right:0;border-left:0;"></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="zuotu"  id="zuoImg">
                                    <span style="margin-left: 140px">左耳</span>
                                    <img :src="allPrintImgs[index*2]" height="350px" width="350px" style="margin-top: 20px"/>
                                    <!-- <img :src="zuoImg" height="350px" width="350px" style="margin-top: 20px"/>      -->
                                    <table class="zuoTable" width="300px" style="margin-top: 20px;border:0;" border="1" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th style="border:0">左</th>
                                            <th style="border:0">平均听阈</th>
                                            <th style="border:0">助听听阈</th>
                                            <th style="border:0">助听器效果</th>
                                        </tr>
                                        <tr class="tr">
                                            <td style="border-left:0;">AC</td>
                                            <td style="border-right:0;">{{item.userText.ACL}}</td>
                                            <td style="border-right:0;border-left:0;">{{item.userText.LHTL}}</td>
                                            <td style="border-right:0;border-left:0;">{{item.userText.LEffect}}</td>
                                        </tr>
                                        <tr class="tr">
                                            <td style="border-left:0;">BC</td>
                                            <td style="border-right:0;">{{item.userText.BCL}}</td>
                                            <td style="border-right:0;border-left:0;"></td>
                                            <td style="border-right:0;border-left:0;"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <!-- 听力图完 -->
                            <!-- 备注 -->
                            <div class="remarks" id="remarksDIV">
                                <div id="remarks">
                                    <div  class="form-control">{{item.userText.remark}}                        
                                    </div>
                                </div>          
                                <div id="tuli">
                                  <table  class="tuli" frame="border" >
                                    <tr style="background: #d9d9d9">
                                        <th colspan="6">图例</th>
                                    </tr>
                                    <tr>
                                        <th>左</th>
                                        <th>双</th>
                                        <th>右</th>
                                        <th>  </th>
                                        <th  colspan="2">已掩蔽</th>
                                    </tr>
                                    <tr>
                                        <td><i id="qidao-L" class="testicon testicon-AC-L font-color-blue" ></i></td>
                                        <td></td>
                                        <td><i id="qidao-R" class="testicon testicon-AC-R font-color-red" ></i></td>
                                        <td>气导</td>
                                        <td><i id="qidao-L" class="testicon testicon-AC-L-M font-color-blue" ></i></td>
                                        <td><i id="qidao-R" class="testicon testicon-AC-R-M font-color-red" ></i></td>  
                                    </tr>
                                    <tr>
                                        <td><i id="gudao-L" class="testicon testicon-BC-L font-color-blue"></i></td>
                                        <td></td>
                                        <td><i id="gudao-R" class="testicon testicon-BC-R font-color-red"></i></td>
                                        <td>骨导</td>     
                                        <td><i id="gudao-L" class="testicon testicon-BC-L-M font-color-blue"></i></td>
                                        <td><i id="gudao-R" class="testicon testicon-BC-R-M font-color-red"></i></td>      
                                    </tr>
                                    <tr>
                                        <td><i id="shengchang-L" class="testicon testicon-SF font-color-blue"></i></td>
                                        <td></td>
                                        <td><i id="shengchang-R" class="testicon testicon-SF font-color-red"></i></td>
                                        <td>声场</td>
                                        <td><i id="shengchang-L" class="testicon testicon-SF-L-M font-color-blue"></i></td>
                                        <td><i id="shengchang-R" class="testicon testicon-SF-R-M font-color-red"></i></td>
                                    </tr>
                                    <tr>
                                        <td><i id="shushiyu-L" class="testicon testicon-MCL font-color-blue"></i></td>
                                        <td></td>
                                        <td><i id="shushiyu-R" class="testicon testicon-MCL font-color-red"></i></td>
                                        <td>舒适阈</td>
                                    </tr>
                                    <tr>
                                        <td><i id="bushiyu-L" class="testicon testicon-UCL font-color-blue"></i></td>
                                        <td></td>
                                        <td><i id="bushiyu-R" class="testicon testicon-UCL font-color-red"></i></td>
                                        <td>不舒适阈</td>
                                    </tr>               
                                    <tr>
                                        <td><i id="tingyu-L" class="testicon testicon-FF-L font-color-blue"></i></td>
                                        <td><i id="tingyu-S" class="testicon testicon-FF-S font-color-blue"></i></td>
                                        <td><i id="tingyu-R" class="testicon testicon-FF-R font-color-red"></i></td>
                                        <td>助听听阈</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>B</td>
                                        <td></td>
                                        <td>裸耳</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>&darr;</td>
                                        <td></td>
                                        <td>&darr;</td>
                                        <td>无反应</td>
                                        
                                    </tr>
                                  </table>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="readerType[index].key === 1" class="liu">
                            <content class="print-content clearfix">
                              <div class="tone-table">
                                <table class="liu-table-print">
                                  <tr>
                                    <td v-for="item1,index3 in item.tableHeader" :class="['headerbg', item1 == '' ?'gray' :'']" ref="td"><span>{{item1}}</span></td>
                                  </tr>
                                  <tr v-for="val,index1 in item.distance">
                                    <td v-for="item2,index2 in item.tableHeader" :class="[(!item2 || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
                                      <span v-if="index2 == 0">{{val}}</span>
                                      <span v-if="item.resultData[1][item2] && item.resultData[1][item2][val]">
                                        <span v-if="item.resultData[1][item2][val]['success'] >= 2 ">{{'√'}}</span>
                                        <span v-else-if="item.resultData[1][item2][val]['false'] >= 2 ">{{'×'}}</span>
                                        <span v-else>{{"—"}}</span>
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                                <div class="last-l-t clearfix">
                                  <span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                  <em class="fl">{{item.userText['textarea']}}</em>
                              </div>
                              </div>
                            </content>
                        </div>
                        <div v-else class="tone">
                            <content class="print-content clearfix">
                              <div class="clearfix">
                                  <div :class="[{'mormTable':hasMormTable(tableHeader,item)},'tone-table']" v-for="(tableHeader,valindex) in item.rederTableData">
                                    <table>
                                      <tr>
                                        <td v-for="item0,index0 in tableHeader" :class="['headerbg', item0 == '' ?'gray' :'']" ref="td">{{item0}}</td>
                                      </tr>
                                      <tr v-for="val,index1 in tableTr">
                                        <td v-for="item2,index2 in tableHeader" :class="[(!item2 || !val) ?'gray':'',index2 == 0 ? 'headerbg' :'']">
                                          {{ index2 == 0 ? val :''}}
                                          <span v-if=" (index1 === 0) && item.jieguo[item2]">
                                            {{item.jieguo[item2]['statistics']}}
                                          </span>
                                          <span v-if=" (index1 === 1) && item.jieguo[item2]">
                                            <i v-for="ele in item.jieguo[item2]['hasFalse']"><em v-if="ele != '—'">{{item2}}/</em>{{ele}}&nbsp;</i>
                                          </span>
                                        </td>
                                      </tr>
                                    </table>
                                    <div class="star" v-if=" item.starValue && item.starValue[item.groupId[valindex]]">{{_ToShowStar(valindex, index,item)}}
                                        <div class="clearfix">
                                            <em class="fl">综合评价：</em>
                                            <div class="fl" :id="'imgs' + valindex + index">
                                                <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
                                                <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
                                                <img :src="rank_1" alt="" /><img :src="rank_2" alt="" />
                                                <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
                                                <img :src="rank_3" alt="" /><img :src="rank_4" alt="" />
                                            </div>
                                            <i v-if="item.starValue[item.groupId[valindex]].star_value">{{item.starValue[item.groupId[valindex]].star_value}}</i>
                                        </div>
                                        <div class="jianyi clearfix" v-if="item.starValue[item.groupId[valindex]].advise">
                                            <em class="fl">听力建议：</em>
                                            <i>{{item.starValue[item.groupId[valindex]].advise}}</i>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="last-l-t clearfix">
                                <span class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                <em class="fl">{{item.userText['textarea']}}</em>
                              </div>
                            </content>
                        </div>
                        <footer  class="print-footer">
                            <div class="clearfix">
                                <span class="fl">测试者：</span>
                                <div class="f-p fl">{{name}}</div>
                            </div>
                            <div class="clearfix" style="text-align:center;padding-left: 50px;">
                                <p>{{infoJigou.full_name}}</p>
                            </div>
                        </footer>
                    </div>
                </div>
                <!-- 打印及关闭按钮 -->
                <printButton :prints="false" :ptintArray="ptintArray" :show="false" @close="closePrint"></printButton>
            </div>
        </div>
    </div>
</div>
</template>
</body> 
<script>
import Html2canvas from '../../../api/html2canvas.js'
import printButton from '../commonvue/print/print-button.vue'
import baseInfoPrint from '../danganlist/base/info-print.vue'
import {mapState,mapGetters} from'vuex'
import util from '../../../common/util.js'
const rank_1 = require('../../../../static/images/rank_1.gif');
const rank_2 = require('../../../../static/images/rank_2.gif');
const rank_3 = require('../../../../static/images/rank_3.gif');
const rank_4 = require('../../../../static/images/rank_4.gif');
export default {
    components : {
        printButton,
        baseInfoPrint
    },
    data(){
        return {
            web_url:web_url,
            day: null,
            // 获取学生的id
            study_id:'',
            // 学生的信息
            study_info:{},
            //机构
            formJigou: {},
            // 测试结果信息
            testResults:{},
            infoJigou:{'full_name':''},
            tableTr : ['识别率','混淆'],
            rank_1:rank_1,
            rank_2:rank_2,
            rank_3:rank_3,
            rank_4:rank_4,
            rederTableData:[],
            // 词组的id值
            groupId:[]
        }
    },
    // 接收父组件传过来的数据
    props:{
        data:{
            type:Array,
            default:function(){
                return [];
            }
        },
        ptintArray:{
            type:Array,
            default:function(){
                return []
            }
        },
        type:null,
        // 个人信息打印的内容
        studydata:{
            type:Object,
            default:function(){
                return {}
            }
        },
        errorImgGirl:null,
        errorImgBody:null,
        imgSrc:null
    },
    created(){        
    },
    mounted(){
        var myDate = new Date()
        this.day = myDate.toLocaleDateString()    //获取当前日期
        this.jigouInfo()
    },
    computed:{
        ...mapState(['allPrintImgs','isToPrintBase']),
        name:() =>{
            return JSON.parse(sessionStorage.getItem('user'));
        },
        // 获取当前的测试名称
        current_gameName:()=>{
            let test_id = JSON.parse(sessionStorage.getItem('test_id'));
            return util.getType(test_id);
        },
        readerType:function(){
            if(Array.isArray(this.type)){
                return this.type
            }else{
                return new Array(this.type)
            }
        }
    },
    watch:{
    },
    methods:{
        closePrint(e){
            this.$emit('close',false)
        },
        // 音素测听结果
        hasMormTable(str,item){
            return (str.length < 5 && (item.rederTableData.length != 1))? true : false;
        },
        _ToShowStar(valindex,index,item){
          // 显示小星星评价
          this.$nextTick(function(){
            let star = +item.starValue[item.groupId[valindex]].star;
            this._star(valindex,index,star*2);
          })
        },
        _star(id2,id1,index){
          let imgs = jq('#imgs' + id2 +id1).getElementsByTagName('img');
          for (var i = 0; i < index; i++) {
            var str = imgs[i].src;//先把每一个img元素的src取出来
            if(i % 2 === 0){
              str = rank_1;
            }else{
              str = rank_2;
            }
            imgs[i].src = str;//把替换后的字符赋值给src
          }
          for (var j = index; j < imgs.length; j++) {
            var str = imgs[j].src;//先把每一个img元素的src取出来
            if(j % 2 === 0){
              str = rank_3;
            }else{
              str = rank_4;
            }
            imgs[j].src = str;//把替换后的字符赋值给src
          }
        },
        // 获取测试耳
        getEar(str){
            let getear = str.userText.ear;
            // console.log()
            if(getear === "A"){
                return '双耳';
            }else if(getear ==="L"){
                return '左耳';
            }else{
                return "右耳";
            }
        },
        getTime(index){
            // console.log(index.userText)
            return util.dateToggle('年','月','日',index.userText.time);
        },
        user_Info(index){// 获取数据
            let user = index.userInfo;
            let birth = user['birth'];
            birth = util.dateToggle('年','月','日',birth);
            return {'birth':birth,'name':user['user_name'],'gender':user['gender']};
        },
        jigouInfo(){
            var that = this,
            institution = {institution:sessionStorage.getItem('user')}
            this.$ajax.post(`/operator/jgshow`,institution).then(function(response){
            // console.log(response)
            if(response.code === 200) {
                that.infoJigou = response.data;
            } else{
                that.msgTipsSuccess(this,'信息获取出现错误！')
            }
            }).catch((err)=>{
                alert(err)
            })
        },
        // 返回innerHTML
        returnHTML() {
            return document.getElementById('pageall').innerHTML
        },

    }
}
</script>
<style lang ="less">
@import"../../../../static/css/testicon.css";
.reportAllClass{
    color:#000;
    font-size: 14px;
    #youImg, #remarksDIV{
        margin-left:30px;
    }
    #youImg{       
        padding-top:10px;
        height:450px;
        width:300px;
        float: left;        
    }
    #zuoImg{   
        margin-left:60px;   
        padding-top:10px;
        height:450px;
        width:300px;
        float: left;
    }
    #remarksDIV{
        margin-top:50px; 
        float: left;
    }
    #remarks{      
        float: left;
        div{
            border:1px solid #ccc; 
            padding: 10px; 
            height: 200px; 
            width: 385px;
            line-height: 23px;
            font-size: 14px;
            word-spacing: 8px;
            letter-spacing: 1px;
        }
    }
    #tuli{
        float: left;
        margin-left:60px; 
    }    
    td {
       text-align:center;
    }
}
.print-tone{
    background-color: #fff;
    width: 200mm;
    height: 297mm;
    border: 1px solid #fff;
    margin: auto;
    padding: 27px;
    position: relative;
    .liu{
        .print-content{margin-top: 20px;}
        .tone-table{
            margin:0px auto;
            margin-top: 20px;
            width: 100%;
            table{
              width: 100%;
              border-collapse: collapse; 
            }
            .headerbg{
              background-color: #eef1f6;
            }
            .gray{
              background-color: #eee;
            }
            .last-l-t{
            margin-top:30px;
              em{
                width:375px;
                max-width:500px;
              }
            }
            td,th{
              box-sizing: border-box;
              text-align: center;
              padding:0px;
              border: 1px solid #ccc;
              width: 50px;
            }
            tr{
              height: 45px;
            }
            .star{
              margin-top: 5px;
              .jianyi{
                margin-top: 5px;
              }
              i{margin-left: 10px;}
              em{width: 112px;/*text-align: right;*/}
            }
          }
        /*表格的排列样式*/
        .mormTable{
          width: 45%;
          float: left;
          &:nth-child(2n){
            margin-left: 50px;
          }
        }
    }
}
.tone{
    .print-content{margin-top: 20px;}
    .tone-table{
        float: left;
        margin:0px auto;
        margin-top: 10px;
        width: 100%;
        /*height: 170px;*/
        table{
          width: 100%;
          border-collapse: collapse; 
        }
        /*表头背景色*/
        .headerbg{
          background-color: #eef1f6;
        }
        .gray{
          background-color: #eee;
        }
        td,th{
          box-sizing: border-box;
          text-align: center;
          padding:0px;
          border: 1px solid #ccc;
          width: 50px;
        }
        tr{
          height: 35px;
        }
        /*评价*/
        .star{
          margin-top: 5px;
          margin-left: 0;
          .jianyi{
            margin-top: 5px;
          }
          i{margin-left: 10px;}
        }
      }
      .last-l-t{
        margin-top:10px;
        }
    /*表格的排列样式*/
    .mormTable{
      width: 45%;
      float: left;
      &:nth-child(2n){
        margin-left: 50px;
      }
    }
}
</style>
