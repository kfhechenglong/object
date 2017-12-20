<template>
    <div class="level-two my-d-h" v-if="levelTwoPie">
        <el-dialog  v-model="levelTwoPie" :close-on-click-modal="false">
            <h3 class="l-t-p-t">{{TwoPieTitle}}&nbsp;&nbsp;—&nbsp;&nbsp;二级统计</h3>
            <ul class="clearfix">
                <li class="fl" v-for="(item,index) in levelTwoPieList">
                    <div :id="'levelTwoPie'+index" class="l-t"></div>
                    <span class="no-data"><i class="iconfont icon-zanwushuju1"></i>暂无数据！</span>
                    <p>{{item.value}}</p>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>
    
<script>
var echarts = require('echarts');
// 引入饼状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// 引入删除数组的方法
let myChart0 = "";
let myChart1 = "";
let myChart2 = "";
let myChart3 = "";
let myChart4 = "";
import util from '../../../common/util'
import {mapMutations,mapState} from 'vuex'
export default {
    // 注册组件
    components:{
        
    },
    data (){
        return {
            seriesData:{},
            levelTwoPie:false,
        }
    },
    props:{
        levelTwoPieList:{
            type:Array
        },
        levelTwoData:{
            type:Object
        },
        TwoPieTitle:null
    },
    watch :{
        levelTwoData:function(){
            const levelTwoData = this.levelTwoData;
            const object = {};
            // 生成渲染的数据格式
            try{
                for( let key in levelTwoData){
                    let inData = levelTwoData[key];
                    let data = []
                    for(let obj in inData){
                        if(obj === "data"){
                            let objData = inData[obj];
                            // 判断数据是否为空
                            if(Array.isArray(objData)) {continue;}
                            for(let val in objData){
                                // 如果统计的人数为空，则跳出
                                if(objData[val].num === 0) {continue;}
                                data.push({value:objData[val].num,name:val,user_id:objData[val].user_id});
                            }
                        }
                    }
                    object[key] = data;
                };
            } catch (err){
                alert(err);
            }
            this.seriesData = object;
        }
    },
    destroyed(){

    },
    methods : {
        _initEcharts(){
            this.levelTwoPie = true;
            this.$nextTick(() =>{
                myChart0 = echarts.init(document.getElementById('levelTwoPie0'));
                myChart1 = echarts.init(document.getElementById('levelTwoPie1'));
                myChart2 = echarts.init(document.getElementById('levelTwoPie2'));
                myChart3 = echarts.init(document.getElementById('levelTwoPie3'));
            });
            setTimeout(() =>{
                this._echarts(myChart0,0);
                this._echarts(myChart1,1);
                this._echarts(myChart2,2);
                this._echarts(myChart3,3);
            },50);

        },
        _echarts(myChart,index){
            let currentData = this.seriesData[this.levelTwoPieList[index].key];
            if(currentData.length === 0){//提示暂无数据
                const ele = jq(".no-data")[index];
                ele.className = "no-data show";
            }
            let that =this;
            let option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: '数据明细',
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        data:currentData,
                        label:{
                            normal:{//隐藏标签
                                // show:false,
                                formatter: '{b}\n{c}人次\n占比{d}%',
                                fontSize:'30',
                            }
                        },
                        labelLine:{
                            normal:{
                                length:10,
                                length2:10,
                            }
                        },
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
            myChart.on('click',function(params){
                console.log(params.data.user_id)
            });
        }
    }

}
</script>
<style  lang="less">
.level-two{
    .el-dialog{
        width:1150px;
        height: 800px;
        margin-bottom: 0;
        top:7% !important;}
    h3{
        font-size: 20px;
        font-weight: 600;
        margin-left:30px;
    }
    ul{
        margin-top:20px;
        li{
            position: relative;
            .l-t{display: inline-block;
                width: 550px;
                height: 330px;
            }
            .no-data{
                display:none;
                position: absolute;
                left:50%;
                top:50%;
                transform:translate(-50%,-50%);
                font-size: 20px;
                color:red;
                letter-spacing: 3px;
                i{
                    font-size: 30px;
                }
            }
            .show{
                display:block;
            }
            p{
                text-align: center;
                font-size: 18px;
                font-weight: 600;
            }
        }
    }
}
@media(max-width:1490px){
    .level-two .el-dialog{width:700px;height: 630px;}
   .level-two ul li .l-t{width:305px;height: 240px;}
    .level-two ul{ margin-top:5px;}
}
</style>
