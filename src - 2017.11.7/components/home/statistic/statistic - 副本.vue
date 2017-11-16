<template>
    <div class="statistic">
        <div class="title">
            <h3>统计分析</h3>
        </div>
        <section class="clearfix">
            <div class="fl">
                <div class="check-date clearfix">
                    <p>请先选择要统计的年份</p>
                    <!-- <div class="block">
                        <el-slider
                          v-model="year"
                          :step="1"
                          :max="2018"
                          :min="2010"
                          range
                          @change="change"
                          show-tooltip
                          show-stops>
                        </el-slider>
                    </div> -->
                    <ul class="clearfix fl">
                        <li class="">
                            <span>开始年份：</span>
                             <el-date-picker v-model="startYear" align="right" type="year" placeholder="选择起始年" :picker-options="pickerOptions"></el-date-picker>
                        </li>
                        <li style="margin-top:20px;">
                            <span>结束年份：</span>
                            <el-date-picker v-model="endYear" align="right" type="year" placeholder="选择终止年" :picker-options="pickerOptions2"></el-date-picker>
                        </li>
                    </ul>
                    <div class="btn fl">
                        <el-button type="warning" @click="getTime">确定</el-button>
                    </div>
                </div>
                <div class="pie clearfix">
                    <div class="pie-radio fl">
                        <ul>
                            <li :class="[current === index ? 'active' :'']" v-for="(item,index) in radio" @click="currentBtn(index)">{{item.key}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pie-warp fl" id="myChart"></div>
        </section>
    </div>
</template>
    
<script>
var echarts = require('echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// 引入删除数组的方法
let radio = [{key:'年龄',value:'age'},{key:'性别',value:'gender'},{key:'耳聋性质',value:'nature'},{key:'耳聋程度',value:'degree'},{key:'助听设备',value:'app'}];
var initYear= new Date();
var stopYear = new Date();
let myChart = ""
import util from '../../../common/util'
import {mapMutations,mapState} from 'vuex'
export default {
    // 注册组件
    components:{
        
    },
    data (){
        return {
            year:{},
            radio:radio,
            current:0,
            endYear:(new Date()).getFullYear().toString(),
            startYear:((new Date()).getFullYear()-1).toString(),
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() >= Date.now() - 8.64e7 || (time.getFullYear() > stopYear.getFullYear());
              }
            },
            pickerOptions2: {
              disabledDate(time) {
                return (time.getTime() >= Date.now() - 8.64e7) || (time.getFullYear() < initYear.getFullYear()-1);
              }
            },
            count:Object,
            legendData:['年龄','性别','耳聋性质','耳聋程度','助听设备'],
            seriesData:[{value:0, name:'年龄'},{value:0, name:'性别'},{value:0, name:'耳聋性质'},{value:0, name:'耳聋程度'},{value:0, name:'助听设备'}],
            allNum:0
        }
    },
    created (){
        
        this.$nextTick(() =>{
            myChart = echarts.init(document.getElementById('myChart'));
            this.getTime();
        })
    },
    watch:{
        startYear:function(){
            initYear = this.startYear;
        },
        endYear:function(){
            stopYear = this.endYear;
        },
    },
    methods : {
        getTime(){
            this.year = {
                startYear:new Date(this.startYear).getFullYear(),
                endYear:new Date(this.endYear).getFullYear(),
            };
            this.currentBtn(this.current)
        },
        currentBtn(index){
            this.current = index;
            let data = {
                data:this.radio[index].value,
                start:this.year['startYear'],
                end:this.year['endYear'],
            }
            console.log(data)
            this.$ajax.post('/info/count',data).then((response) =>{
                console.log(response)
                this.allNum = 0;
                if(response.code === 200){
                    this.count = response.data.data;
                    this.legendData.length = 0;
                    this.seriesData.length = 0;
                    this.allNum = +response.data.count;
                    var data = response.data.data
                    for( var key in data){
                        this.legendData.push(key);
                        this.seriesData.push({value:data[key],name:key});
                    }
                    this._echarts();
                }
            }).catch((err) =>{
                alert(err + "获取统计信息出错！")
            })
        },
        _echarts(){
            let option = {
                title : {
                    text:this.year['startYear']+"—"+this.year['endYear']+"年合计人数" +this.allNum,
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.legendData
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '70%',
                        center: ['50%', '50%'],
                        data:this.seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: ['#3366cc','#990099', '#61a0a8', '#ff9900', '#fe1100','#749f83',  '#52ff27', '#fc585c','#6e7074', '#546570', '#c4ccd3']
            };
            myChart.showLoading();
            myChart.setOption(option);
            myChart.hideLoading();
        }
    }

}
</script>
<style  lang="less">
    .statistic{
         height: 94%;
        width: 100%;
        background: #fff;
        .title{
            height:50px;
            line-height: 50px;
            border-bottom:1px solid #88d99f;
            h3{
                font-size:20px;
                font-weight: 600;
                text-indent: 2em;
            }
        }
        section{
                margin: 35px 50px;
            .check-date{
                margin-left:150px;
                &>p{
                    font-size: 24px;
                    font-weight: 500;
                    color:#000;
                    letter-spacing:2px;
                }
                .btn{
                    margin-top: 86px;
                    // background: cadetblue;
                    width: 100px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    // border-radius: 5px;
                    font-size: 20px;
                    margin-left: 20px;
                    // color: #fff;
                }
                .btn-active{

                }
                ul{
                    margin-top:30px;
                }
                // .block{
                //     width: 500px;
                //     margin-top: 60px;
                //     margin-left:50px;
                //     .el-slider__runway.show-input{
                //         margin-right:90px;
                //         margin-right:120px;
                //     }
                //     .el-input-number{
                //         width: 105px;
                //     }
                //     .el-slider__button-wrapper{
                //         top:-39px;
                //         width: 26px;
                //         .el-slider__button{
                //             width: 25px;
                //             height: 40px;
                //             border-radius:10%;
                //         }
                //         span{
                //             text-indent: -5px;
                //             display:block;
                //             // visibility: hidden;
                //         }
                //         .el-slider__button.dragging, .el-slider__button.hover, .el-slider__button:hover{
                //             transform: scale(1.1);
                //             background: red;
                //         }
                //     }
                // }
            }
            .pie{
                margin-top: 50px;
                margin-left:150px;
                .pie-radio{
                    margin-left:155px;
                    ul{}
                    li{
                        width: 120px;
                        background: #fff;
                        height: 35px;
                        line-height: 35px;
                        margin-bottom: 10px;
                        text-align: center;
                        color: #666;
                        letter-spacing: 2px;
                        border-radius: 5px;
                        cursor:pointer;
                        border:1px solid #666;
                       
                    }
                    li:hover,.active{
                        background:#20a0ff;
                        border:1px solid #20a0ff;
                        color:#fff;
                    }
                }
                
            }
        }
        .pie-warp{
            width:500px;
            height:500px;
            margin-left:150px;
            margin-top:100px;
        }
    }
</style>
