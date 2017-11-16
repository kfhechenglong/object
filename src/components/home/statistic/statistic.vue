<template>
    <div class="statistic">
        <div class="title">
            <h3>统计分析</h3>
        </div>
        <section class="clearfix">
            <div class="pie">
                <dl class="clearfix" id="cl-na">
                    <dt>班级：</dt>
                    <div class="check-all checked fl" @click="_checkAll"><i class="el-icon-check"></i>全选</div>
                    <div id="warp-dd" class="warp-f-dd">
                        <dd class="checked-obj" v-for="(item,index) in class_name_list" @click="currentBtn(item,$event)">{{item.class_name}}</dd>
                    </div>

                    <a v-if ="showArrow || class_name_list.length >= 6" href="JavaScript:;" @click="showClassList">更多 <i class="el-icon-arrow-down"></i></a>
                    <a v-else href="JavaScript:;" @click="showClassList">更多 <i class="el-icon-arrow-up"></i></a>
                </dl>
                <dl class="clearfix">
                    <dt>状态：</dt>
                    <dd :class="[schoolState === '1' ? 'checked-obj' :'']" @click="isInSchool('1')">在校</dd>
                    <dd :class="[schoolState === '0' ? 'checked-obj' :'']" @click="isInSchool('0')">离校</dd>
                </dl>
            </div>
            <div class="s-xm fl">
                <dl class="clearfix">
                    <dt>统计项目：</dt>
                    <div class="fl" id="ob-dd">
                        <dd :class="[currentObjClass === index ? 'checked-obj' :'']" v-for="(item,index) in list" @click="currentObj(item,index)">{{item.value}}</dd>
                        <em class="clear"></em>
                        <p v-show="schoolState === '1'">
                            <span id="ob-dd-ping" @click="pingguOver">听力评估完成情况</span>
                        </p>
                    </div>
                    
                </dl>
            </div>
            <div v-show="!showPingGuOver && hasData">
                <div class="pie-warp fl" id="myChart"></div>
            </div>
            <div v-show="showPingGuOver  && hasData" class="ping-over fl">
                <p class="clearfix">听力评估完成占比：
                    <span :class="[currentTimeClass === '周' ? 'p-time' :'']" @click="pingGuTime('周')">周</span>
                    <span :class="[currentTimeClass === '月' ? 'p-time' :'']" @click="pingGuTime('月')">月</span>
                    <span :class="[currentTimeClass === '季' ? 'p-time' :'']" @click="pingGuTime('季')">季</span>
                    <span :class="[currentTimeClass === '年' ? 'p-time' :'']" @click="pingGuTime('年')">年</span>
                    <em class="fr">共统计<strong>{{pingGuData.count}}</strong>人</em>
                </p>
                <ul>
                    <li class="clearfix" v-for="(item,index) in typeObject">
                        <span>{{item.key}}：</span>
                        <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="item.progress" status="success"></el-progress>
                        <em class="fl">共<strong>{{item.overCount}}</strong>人完成</em>
                        <a href="JavaScript:;" @click="showNoTestNameList(item.value,item.key)">未完列表</a>
                    </li>
                </ul>
            </div>
            <div v-show="!hasData" class="noData"> <img src="../../../../static/images/nodata.png" alt="" width="300px"></div>
        </section>
        <TwoPie ref="twopie" :TwoPieTitle="TwoPieTitle" :levelTwoPieList="TwoPieList" :levelTwoData = "levelTwoData"></TwoPie>
        <NoTestName ref="noTestName" :typeObject="typeObject" :time="currentTimeClass" :name="noTestNameListsData" :currType="contentType"></NoTestName>
    </div>
</template>
    
<script>
const echarts = require('echarts');
// 引入饼状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
// 引入删除数组的方法
const typeObject =[{key:'助听听阈', value:6,progress:0,overCount:0},{key:'林氏六音', value:1,progress:0,overCount:0},{key:'音素识别', value:2,progress:0,overCount:0},{key:'声调识别', value:3,progress:0,overCount:0},{key:'声母识别', value:4,progress:0,overCount:0}];
let list = [{key:'gender', value:'性别'},{key:'age', value:'年龄'},{key:'app', value:'助听设备'},{key:'lpta', value:'裸耳PTA'},{key:'zpta', value:'助听PTA'}];
let myChart = ""
import util from '../../../common/util'
import TwoPie from './pieleveltwo.vue'
import NoTestName from './listname.vue'
import {mapMutations,mapState} from 'vuex'
export default {
    // 注册组件
    components:{
        TwoPie,
        NoTestName
    },
    data (){
        return {
            list:list,
            typeObject:typeObject,
            class_name_list:[],
            current:[],
            count:Object,
            legendData:['年龄','性别','耳聋性质','耳聋程度','助听设备'],
            seriesData:[{value:10, name:'年龄'},{value:10, name:'性别'},{value:10, name:'耳聋性质'},{value:10, name:'耳聋程度'},{value:10, name:'助听设备'}],
            allNum:0,
            schoolState:'1',
            currentTimeClass:'周',
            tongjiObj:'gender',
            contentType:"",
            currentObjClass:0,
            TwoPieList:[],
            TwoPieTitle:'人数',
            showPingGuOver:false,
            hasData:true,
            showArrow:true,
            levelTwoData:{},
            pingGuData:{count:0},
            noTestNameListsData:{}
        }
    },
    created (){
        let two_list = (this.list).concat();
        two_list.shift()
        this.TwoPieList = two_list;
        this.$nextTick(() =>{
            myChart = echarts.init(document.getElementById('myChart'));
            this.getClass();
        });
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
        showClassList(){//显示更多班级
            let warp = jq('#warp-dd');
            let className = warp.className
            if(className.indexOf('on') > -1){
                warp.className = "warp-f-dd warp-dd"
            }else{
                warp.className = "warp-f-dd warp-dd on"
            };
            this.showArrow = !this.showArrow;
        },
        showNoTestNameList(type,key){
            this.contentType = {'key':key,'value':type};
            this.$refs.noTestName.noTestNameLists = true;
            // 获取未测人员名单
            this.noTestNameListsData = this.pingGuData[key];
        },
        pingGuTime(str){//评估完成情况的周月季年统计
            this.currentTimeClass = str;
            this.$ajax.post('/info/hearing',{class_id:this.current,date:str}).then((res) =>{
                console.log(res)
                if(res.code === 200){
                    this.pingGuData = res.data;
                    this.getProgress(res.data)
                }
            })
        },
        getProgress(str){//计算百分比
            let typeObject = this.typeObject;
            console.log(str)
            console.log(typeObject)
            for(var ky in str){
                if(ky != 'count'){
                    for(var i = 0;i < typeObject.length; i++){
                        if(typeObject[i].key == ky){
                            // debugger
                            // 获取百分比
                            let progress =  +(((str.count-str[ky].count)/+(str.count))*100).toFixed(0);
                            if(isNaN(progress)){
                                typeObject[i].progress = 0;
                            }else{
                                typeObject[i].progress = progress;
                            }
                            typeObject[i].overCount = str.count-str[ky].count;
                        }
                    };
                }
            };
        },
        // 在校状态
        isInSchool(str){
            this.schoolState = str;
            this._getApiData()
        },
        pingguOver(e){//评估完成情况
            let span = jq("#ob-dd-ping");
            if(!span.className && e){
                span.className = "pinggu";
                this.currentObjClass = null;
                this.hasData = true;//去掉暂无数据提示
                // 获取初始的评估完成情况信息
                this.pingGuTime('周')
            }else{
                span.className = "";
                this.currentObjClass = 0;
                this.tongjiObj = list[0].key;
                this.TwoPieList = [];
                for(let i = 0 ;i < this.list.length;i++){
                    if(0 !== i){
                        this.TwoPieList.push((this.list)[i])
                    };
                };
                this._getApiData();
            };
            this.showPingGuOver = !this.showPingGuOver;
        },
        getClass(){//获取班级
            util.getClass(this,next);
            function next(str,data){
                // 获取班级id数组
                for(let i = 0 ;i < data.length ;i++){
                    str.current.push(data[i].class_id);
                }
                str._getApiData(true);//请求默认显示的数据；
            };
            // this._echarts();
        },
        currentObj(item,index){
            this.currentObjClass = index;
            this.TwoPieTitle = item.value;
            this.TwoPieList = [];
            this.tongjiObj = item.key;
            for(let i = 0 ;i < this.list.length;i++){
                if(index !== i){
                    this.TwoPieList.push((this.list)[i])
                };
            };
            // 如果评估完成情况已打开，则关闭;
            if(this.showPingGuOver){
                let span = jq("#ob-dd-ping");
                span.className = "";
                this.showPingGuOver = false;
            }
            // 请求数据
            this._getApiData();
            
        },
        hasClassName(el,item,e){
            // 可多选，至少选择一项
            let dds = jq(el).getElementsByTagName('dd');
            let flag = 0;//当前按钮激活的个数
            for (let i = 0; i < dds.length; i++) {
                if(dds[i].className){flag ++;}
            };
            //当激活按钮的个数大于2时，点击激活按钮则关闭
            if(!e.target.className || flag === 1){
                //当前按钮没有激活时，点击则激活
                e.target.className = "checked-obj"
            }else{
                e.target.className = ""
            };
        },
        _checkAll(){//全选按钮
            const current = this.current;
            const dds = jq("#cl-na").getElementsByTagName('dd');
            const lis = this.class_name_list;
            const check = jq(".check-all")[0];
            if(current.length < this.class_name_list.length){
                for (let i = 0; i < dds.length; i++) {
                    dds[i].className = "checked-obj";
                };
                check.className = "check-all checked fl";
                current.length = 0;
                for(let i = 0 ;i < lis.length ;i++){
                    current.push(lis[i].class_id);
                }
            }else{
                for (let i = 0; i < dds.length; i++) {
                    dds[i].className = "";
                    if(i=== 0){//保证至少选择一个
                        dds[i].className = "checked-obj";
                    }
                };
                check.className = "check-all fl";
                current.length = 0;
                current.push(lis[0].class_id);
            };
            // 点击班级时，在不同条件下的请求
            if(this.showPingGuOver){
                // 当为评估完成情况状态下的模块
                this.pingGuTime(this.currentTimeClass);
            }else{//当为统计项目状态下的模块
                this._getApiData();
            }
        },
        currentBtn(item,e){//点击班级按钮
            const current = this.current;
            const class_id = item.class_id;
            this.hasClassName("#cl-na",item,e);
            // 选择班级的id值，保证id值不能重复
            util.arrayRemove();
            if((current).indexOf(class_id) >=0){
                (current).remove(class_id)
            }else{
                (current).push(class_id)
            };
            // 当id值的数组为空时，则将当前id值添加进去
            if(current.length === 0)(current).push(class_id);
            // 控制全选按钮,如果选择班级的个数小于班级列表的个数，则取消全选按钮，否则开启全选按钮
            if(current.length < this.class_name_list.length){
                jq(".check-all")[0].className = "check-all fl";
            }else{
                jq(".check-all")[0].className = "check-all checked fl";
            };
            // 点击班级时，在不同条件下的请求
            if(this.showPingGuOver){
                // 当为评估完成情况状态下的模块
                this.pingGuTime(this.currentTimeClass);
            }else{//当为统计项目状态下的模块
                this._getApiData();
            }
        },
        //数据请求接口
        _getApiData(isfirst){
            let data = {
                class_id:this.current,
                sc_status:this.schoolState,
                data:this.tongjiObj
            };
            this.$ajax.post('/info/count',data).then((response) =>{
                // console.log(response.data)
                if(response.code === 200){
                    if(!response.data){
                        this.hasData = false;
                        return;
                    }
                    this.legendData.length = 0;
                    this.seriesData.length = 0;
                    this.allNum = +response.data.count;
                    let data = response.data.data;
                    // 判断数据是否为空
                    if(Array.isArray(data)){this.hasData = false; return;}
                    this.hasData = true;
                    for( let key in data){
                        if(data[key].num === 0){continue;}
                        this.legendData.push(key);
                        this.seriesData.push({value:data[key].num,name:key});
                    };
                    // console.log(this.seriesData)
                    this._echarts(isfirst);
                }
            }).catch((err) =>{
                alert(err + "获取统计信息出错！")
            })
        },
        _echarts(isfirst){
            let that =this;
            myChart.showLoading();
            myChart.setOption({
                title : {
                    text:'当前统计人数共'+this.allNum+'人',
                    // text:"16",
                    subtext: '',
                    x:'center',
                    textStyle:{
                        color:'red',
                    }
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
                        name: '数据明细',
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        data:this.seriesData,
                        label:{
                            normal:{//隐藏标签
                                // show:false,
                                formatter: '{b}\n{c}人次,占比{d}%',
                                fontSize:'30',
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
            });
            myChart.hideLoading();
            if(isfirst){//首次加载时
                myChart.on('click',function(params){
                    // 点击饼状图时，进一步获取数据信息
                    let data = {
                        class_id:that.current,
                        sc_status:that.schoolState,
                    };
                    let name = that.tongjiObj;
                    data[name] = params.name;
                    that.getTwoLeveData(data);
                });
            }
        },
        getTwoLeveData(data){
            console.log(data)
            this.$ajax.post('/info/leveltwo',data).then((res) =>{
                console.log(res)
                if(res.code === 200){
                    this.levelTwoData = res.data;
                    this.$refs.twopie._initEcharts();
                }
            }).catch((err)=>{
                alert(err+'获取错误！')
            })
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
            max-width:1600px;
            margin: 0 auto;
            padding-left: 50px;
            dt,dd,.check-all{
                float: left;
                height: 40px;
                line-height: 40px;
            }
            dt{width:110px;text-align: right;}
            dd,.check-all{
                margin:0 5px;
                width: 110px;
                background: #ddd;
                margin-bottom: 10px;
                text-align: center;
                color: #666;
                letter-spacing: 2px;
                border-radius: 5px;
                cursor:pointer;
                font-size: 18px;
                border:1px solid #bbb;
                box-shadow: 3px 3px 2px #ddd;
            }
            .checked-obj{
                background:#20a0ff;
                border:1px solid #20a0ff;
                color:#fff;
                background:#00ca00;
                border:1px solid #00ca00;
                color:#fff;
            }
            .checked{
                background:#20a0ff;
                border:1px solid #20a0ff;
                color:#fff;
            }
            .pie{
                .warp-f-dd{
                    width:800px;
                    height: 50px;
                    overflow:hidden;
                    float: left;
                }
                .warp-dd{
                    height: 50px;
                    animation:myclose 0.5s
                }
                .on{
                   height: 105px; 
                   animation:myopen 0.5s;
                   overflow: auto;
                }
                @keyframes myopen{
                    from {height: 50px;}
                    to {height: 105px;}
                } 
                @keyframes myclose{
                    from {height: 105px;}
                    to {height: 50px;}
                }
                a{
                    float: left;
                    height: 40px;
                    padding-left: 10px;
                    line-height: 40px;
                    background-color: #ccc;
                    text-decoration:none;
                    color:#fff;
                    border-radius:3px;
                    margin-left:30px;
                    i{  
                        height: 40px;
                        padding:0 10px;
                        line-height: 40px;
                        display:inline-block;
                        border-left:1px solid #666;
                    }
                    // &:hover{
                    //     color:red;
                    //     i{
                    //         border-left:1px solid red;
                    //     }
                    // }
                }
            }
            .s-xm{
                margin-top:50px;
                div{
                    width:250px;
                    .clear{
                        display: block;
                        clear:both;
                        height: 0;
                        line-height: 0;
                    }
                }
                dd{
                    margin-bottom:20px;
                }
                dd,p span{
                    float: left;
                    height: 35px;
                    line-height: 35px;
                    font-size: 18px;
                    background-color: #ddd;
                    color:#666;
                    border:1px solid #bbb;
                }
                .checked-obj{
                    background:#00ca00;
                    border:1px solid #00ca00;
                    color:#fff;
                }
                dl{width:420px;}
                p{
                    width:250px;
                    border-top:2px solid #bbb;
                    span{
                        cursor:pointer;
                        display:block;
                        margin:15px 0;
                        border-radius:5px;
                        box-shadow: 3px 3px 2px #ccc;
                        float:none;
                        text-align:center;
                    }
                }
                .pinggu{
                    background:#800080;
                    border:1px solid #800080;
                    color:#fff;
                }
            }
        }
        .ping-over{
            li{
                height: 30px;
                line-height: 30px;
                margin:20px 0;
                .progress{width:320px;}
                .el-progress{margin-top:7px;}
                em{width: 110px;display:inline-block;text-align:center;}
                span,.progress,a{float: left;}
            }
            p>em{
                font-size: 20px;
                margin-right:85px;
                line-height: 35px;
            }
            strong{color:red;font-weight: 600;}
            li a{
                background-color: #f7ba2a;
                letter-spacing:2px;
            }
            p span{background-color: #ccc;cursor:pointer;}
            p span,li a{
                margin:0 10px;
                padding:0 10px;
                display:inline-block;
                border-radius:4px;
                height: 35px;
                line-height: 35px;
                color:#fff;
                text-decoration: none;
                box-shadow: 2px 2px 2px #ccc;
            }
            .p-time{background-color: #f7ba2a;}
        }
        .pie-warp,.ping-over{
            width:630px;
            height:400px;
            margin-left:150px;
            margin-top:35px;
        }
    }
@media(max-width:1490px){
   .statistic .pie-warp{
        width:600px;
        height:300px;
        margin-left:150px;
        margin-top:0;
    }
    .statistic .ping-over{
        margin-top:0;height:300px;
    }
}
</style>
