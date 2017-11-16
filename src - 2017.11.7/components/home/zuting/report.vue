
<template>
<div class="reportClass">
    <div id="print-tone">
        <div id="print-warp">
            <div class="fiexd-w">
                <div class="print-warp">
                    <div class="print-tone clearfix" id="toimg">
                        <printheader :info="day"></printheader>
                            <!-- 听力图 -->
                            <div>
                                <div class="youtu clearfix"  id="youImg">
                                    <span style="margin-left: 140px">右耳</span>
                                    <img :src="youUrl" height="350px" width="350px" style="margin-top: 20px"/>
                                    <table class="youTable" width="300px" style="margin-top: 20px;border:0; "  border="1" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th  style="border:0">右</th>
                                            <th style="border:0">平均听阈</th>
                                            <th style="border:0">助听听阈</th>
                                            <th style="border:0">助听器效果</th>
                                        </tr>
                                        <tr class="tr" >
                                            <td style="border-left:0;">AC</td>
                                            <td style="border-right:0;">{{canvasMarks.ACR}}</td>
                                            <td style="border-right:0;border-left:0;">{{canvasMarks.RHTL}}</td>
                                            <td style="border-right:0;border-left:0;">{{canvasMarks.REffect}}</td>
                                        </tr>
                                        <tr class="tr" >
                                            <td style="border-left:0;">BC</td>
                                            <td style="border-right:0;">{{canvasMarks.BCR}}</td>
                                            <td style="border-right:0;border-left:0;"></td>
                                            <td style="border-right:0;border-left:0;"></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="zuotu clearfix"  id="zuoImg">
                                    <span style="margin-left: 140px">左耳</span>
                                    <img :src="zuoUrl" height="350px" width="350px" style="margin-top: 20px"/>     
                                    <table class="zuoTable" width="300px" style="margin-top: 20px;border:0;" border="1" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th style="border:0">左</th>
                                            <th style="border:0">平均听阈</th>
                                            <th style="border:0">助听听阈</th>
                                            <th style="border:0">助听器效果</th>
                                        </tr>
                                        <tr class="tr">
                                            <td style="border-left:0;">AC</td>
                                            <td style="border-right:0;">{{canvasMarks.ACL}}</td>
                                            <td style="border-right:0;border-left:0;">{{canvasMarks.LHTL}}</td>
                                            <td style="border-right:0;border-left:0;">{{canvasMarks.LEffect}}</td>
                                        </tr>
                                        <tr class="tr">
                                            <td style="border-left:0;">BC</td>
                                            <td style="border-right:0;">{{canvasMarks.BCL}}</td>
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
                                    <div  class="form-control">{{canvasMarks.remark}}                        
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
                        <printfooter></printfooter>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

</body> 
<script>
import html2canvas from '../../../api/html2canvas.js'
import {mapState} from'vuex'
import printheader from '../commonvue/print/print-header.vue'
import printfooter from '../commonvue/print/print-footer.vue'
import util from '../../../common/util.js'
export default {
    components:{
        printheader,
        printfooter
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
           formJigou: {
            },
           // 测试结果信息
           testResults:{
            },
           // user: JSON.parse(sessionStorage.getItem('user')),
           // info: JSON.parse(sessionStorage.getItem('user_text')),
           youUrl: null,
           zuoUrl: null
        }
    },
    // 接收父组件传过来的数据
    props:{
       time:null
    },
    created(){        
        // this.study_id = sessionStorage.getItem('user_id');
        // console.log(sessionStorage.getItem('youimgData').length,"report-created")
        // 获取当前id学生的信息
        // console.log(this.info)
        // this.getStInfo()
        // this.jigouInfo()
    },
    mounted(){
        var myDate = new Date()
        this.day = myDate.toLocaleDateString()    //获取当前日期
        var that = this;
        // 创建的钩子中监听事件addAudio
    },
    computed:{
        ...mapState(['canvasMarks']),
    },
    watch:{
    },
    methods:{
        delay() {
            setTimeout(()=>{
                this.ond()
            },100);
        },
        // 发送图片编码
        ond: function () {
            var element = document.getElementById("page")
            var that = this
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var scale = 2;//this.getPixelRatio(context);
            var w = element.offsetWidth + 150;
            var h = element.offsetHeight + 360;
            canvas.width = w * scale;
            canvas.height = h * scale;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            context.scale(scale, scale);
            var opts = {
                scale:scale, // 添加的scale 参数
                canvas:canvas, //自定义 canvas
                logging: false, //日志开关
                width:w, //dom 原始宽度
                height:h //dom 原始高度
            };
            html2canvas(element, opts).then(function (canvas) {
                // var newImg = document.createElement("img");
               var dataUrl = canvas.toDataURL();
               //发数据到后台
               var obj ={
                 'base64':dataUrl,
                 time:that.time
               };
               that.$ajax.post1(``,obj).then(function(response){
                    console.log(response)
               }).catch((error) =>{
                    alert(error +"报告保存")
               })
            });
        },
        createdPng: function (){
            this.youUrl= sessionStorage.getItem('youimgData'),
            this.zuoUrl= sessionStorage.getItem('zuoimgData')
        },
        // 档案报告单打印查看
        _lookPng(){
            setTimeout(()=>{
                const time = parseInt(new Date().getTime());
                util.canvas2html('toimg',this,time);
            },100);
        },
        // 返回innerHTML
        returnHTML() {
            return document.getElementById('page').innerHTML
        },

    }
}
</script>
<style lang ="less">
@import"../../../../static/css/testicon.css";
.reportClass{
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
            height: 212px; 
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

</style>
