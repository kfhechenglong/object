
<template>

<div class="reportAllClass" id="pageall">
    <div class='page' v-for="(item,index) in userInfo">
        <div id="print-tone">
            <div id="print-warp-out">
                <div class="fiexd-w">
                    <div class="print-warp">
                        <div class="print-tone clearfix" id="toimg">
                            <header class="print-title">
                                <h2>{{current_gameName}}测试报告</h2>
                                  <ul class="clearfix">
                                    <li  class="li-name">
                                      <span>姓名：</span>
                                      <div>{{user_Info(index)['name']}}</div>
                                    </li>
                                    <li class="li-in">
                                      <span>性别：</span>
                                      <div>{{user_Info(index)['gender']}}</div>
                                    </li>
                                    <li>
                                      <span>生日：</span>
                                      <div>{{user_Info(index)['birth']}}</div>
                                    </li>
                                    <li>
                                      <span>日期：</span>
                                      <div >{{getTime(index)}}</div>
                                    </li>
                                  </ul>
                                  <div class="sb clearfix">
                                    <p class="fl">测听社保佩戴：</p>
                                    <span class="fl">左耳：{{userText[index].cochlear_left}}<i v-if="userText[index].deaf_aid_left && userText[index].cochlear_left">&nbsp;、&nbsp;</i>{{userText[index].deaf_aid_left}}</span>
                                    <span class="fl sb-r">右耳：{{userText[index].cochlear_right}}<i v-if="userText[index].deaf_aid_right && userText[index].cochlear_right">&nbsp;、&nbsp;</i>{{userText[index].deaf_aid_right}}</span>
                                  </div>
                                  <div class="ear zu clearfix">
                                    <p class="fl">测试方法：<span>{{userText[index].testmodel}}</span></p>
                                    <p class="fl">给声方法：<span>{{userText[index].getmodel}}</span></p>
                                    <p class="fl">配合度：<span>{{userText[index]['degree']}}</span></p>
                                    <p class="fl">测试音：<span>{{userText[index].tonetype}}</span></p>
                                  </div>
                            </header>
                                <!-- 听力图 -->
                                <div>
                                    <div class="youtu"  id="youImg">
                                        <span style="margin-left: 140px">右耳</span>
                                        <img :src="allPrintImgs[index*2+1]" height="350px" width="350px" style="margin-top: 20px"/>
                                        <table class="youTable" width="300px" style="margin-top: 20px;border:0; "  border="1" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <th  style="border:0">右</th>
                                                <th style="border:0">平均听阈</th>
                                                <th style="border:0">助听听阈</th>
                                                <th style="border:0">助听器效果</th>
                                            </tr>
                                            <tr class="tr" >
                                                <td style="border-left:0;">AC</td>
                                                <td style="border-right:0;">{{userText[index].ACR}}</td>
                                                <td style="border-right:0;border-left:0;">{{userText[index].RHTL}}</td>
                                                <td style="border-right:0;border-left:0;">{{userText[index].REffect}}</td>
                                            </tr>
                                            <tr class="tr" >
                                                <td style="border-left:0;">BC</td>
                                                <td style="border-right:0;">{{userText[index].BCR}}</td>
                                                <td style="border-right:0;border-left:0;"></td>
                                                <td style="border-right:0;border-left:0;"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="zuotu"  id="zuoImg">
                                        <span style="margin-left: 140px">左耳</span>
                                        <img :src="allPrintImgs[index*2]" height="350px" width="350px" style="margin-top: 20px"/>     
                                        <table class="zuoTable" width="300px" style="margin-top: 20px;border:0;" border="1" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <th style="border:0">左</th>
                                                <th style="border:0">平均听阈</th>
                                                <th style="border:0">助听听阈</th>
                                                <th style="border:0">助听器效果</th>
                                            </tr>
                                            <tr class="tr">
                                                <td style="border-left:0;">AC</td>
                                                <td style="border-right:0;">{{userText[index].ACL}}</td>
                                                <td style="border-right:0;border-left:0;">{{userText[index].LHTL}}</td>
                                                <td style="border-right:0;border-left:0;">{{userText[index].LEffect}}</td>
                                            </tr>
                                            <tr class="tr">
                                                <td style="border-left:0;">BC</td>
                                                <td style="border-right:0;">{{userText[index].BCL}}</td>
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
                                        <div  class="form-control">{{userText[index].remark}}                        
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
                            <footer  class="print-footer">
                                <div class="clearfix">
                                    <span class="fl">测试者：</span>
                                    <div class="f-p fl">{{name}}</div>
                                </div>
                                <div class="clearfix" style="text-align:center;">
                                    <p>{{infoJigou.full_name}}</p>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
</body> 
<script>
import Html2canvas from '../../../api/html2canvas.js'
import {mapState,mapGetters} from'vuex'
import util from '../../../common/util.js'
export default {
    data(){
        return {
           web_url:web_url,
           day: null,
           // 获取学生的id
           study_id:'',
           // 学生的信息
           study_info:{},
           //机构
           formJigou: {
            },
           // 测试结果信息
           testResults:{
            },
           youUrl: null,
           zuoUrl: null
        }
    },
    // 接收父组件传过来的数据
    props:{
        time:null,
        userInfo:{
            type:Array,
            default:function(){
                return [];
            }
        },
        userText:{
            type:Array,
            default:function(){
                return [];
            }
        },

    },
    created(){        
    },
    mounted(){
        var myDate = new Date()
        this.day = myDate.toLocaleDateString()    //获取当前日期
        this.jigouInfo()
    },
    computed:{
        ...mapState(['allPrintImgs']),
        name:() =>{
            return JSON.parse(sessionStorage.getItem('user'));
        },
        // 获取当前的测试名称
        current_gameName:()=>{
            let test_id = JSON.parse(sessionStorage.getItem('test_id'));
            console.log(test_id)
            switch(test_id){
                case 1 :
                return "林氏六音";
                case 6 :
                return "助听听阈";
                case 2 :
                return "胡氏音素";
                case 3 :
                return "声调识别";
                case 4 :
                return "声母识别";
                case 7 :
                return "自定义测试";
                default:
                return "未知错误！";
            }
        },
    },
    watch:{
    },
    methods:{
        getTime(index){
            return util.dateToggle('年','月','日',this.userText[index].updatetime);
        },
        user_Info(index){// 获取数据
            let user = this.userInfo[index];
            let birth = user['birth'];
            birth = util.dateToggle('年','月','日',birth);
            return {'birth':birth,'name':user['user_name'],'gender':user['gender']};
        },
        user_text(index){
            this.userText(index)
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
    width:220mm;
    height:150mm;
    margin-left:150px;
    overflow-y: auto;
    color:#000;
    font-size: 14px;
    background: #ccc;
    .page {
        /*border:1px solid black;*/
        width:212mm;
        height:297mm;
        /*padding: 10px;*/
        background: #FFFFFF;
        position: relative;
    }
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
    .print-tone{
    header{
      h2{
        font-size: 25px;text-align: center;
        line-height: 50px;margin-top: 30px;
      }
      ul li{float: left;}
      ul li div{
        float: right;
        width: 140px;
        border: 0px none;
        border-bottom: 1px solid #000;
        margin-left: 10px;
        height: 24px;
        margin-right: 20px;
        text-align: center;
      }
      .li-in div{
        width: 60px;
      }
      .li-name div{width: 80px;}
      .ear,.sb{margin-top: 20px;}
      .sb{border-bottom: 2px solid #000;padding-bottom: 7px;}
      .sb span{width: 300px; margin-left:10px;}
      .ear p{width: 40%;}
      .zu{
        p{width: 25%;
          span{
            display: inline-block;
            width: 80px;
            border-bottom: 1px solid #000;
            text-align: center;
          }
        }
      }
    }
    footer{
      position:absolute;
      bottom: 50px;right: 50px;
      &>div{margin-top: 20px;line-height: 35px;
        .f-p{
          width: 150px;
          text-align: center;
          height: 35px;
          border:0px none;
          border-bottom: 1px solid #000;
        }
      }
    }
  }
}
</style>
