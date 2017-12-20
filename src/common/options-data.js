let testTypeArr = [{name:'助听听阈',key:6},{name:'林氏六音',key:1},{name:'音素区分',key:2},{name:'声调区分',key:3},{name:'声母区分',key:4}];
const boy = require('./images/body.png');
const girl = require('./images/girl.png');
const rank_1 = require('./images/rank_1.gif');
const rank_2 = require('./images/rank_2.gif');
const rank_3 = require('./images/rank_3.gif');
const rank_4 = require('./images/rank_4.gif');
const nodata = require('./images/nodata.png');
export default {
    deaf_degree :[{name: '正常',label: '正常'}, {name: '轻度',label: '轻度'}, {name: '中度',label: '中度'}, {name: '重中度',label: '重中度'}, {name: '严重',label: '严重'}, {name: '极严重',label: '极严重'}],
    // 耳聋性质
    deaf_nature :[{name: '传导性',label: '传导性'}, {name: '感音神经性',label: '感音神经性'}, {name: '混合性',label: '混合性'}],
    // 测试类型
    testType :testTypeArr,
    testType1 :testTypeArr.concat([{name:'混淆音区分',key:7}]),
    // 助听听阈参数
    optionsEffect :[{name: '最适',label: '最适'}, {name: '合适',label: '合适'}, {name: '较适',label: '较适'}, {name: '看话',label: '看话'}],
    optionsDegree :[{name: '很配合',label: '很配合'}, {name: '一般',label: '一般'}, {name: '不配合',label: '不配合'}],
    optionsTestModel :[{name:'BOA',label:'BOA'},{name:'VAR',label:'VAR'},{name:'PA',label:'PA'},{name:'PTA',label:'PTA'}],
    optionsTone :[{name:'啭音',label:'啭音'},{name:'纯音',label:'纯音'}],
    PTA : [{value: '正常',label: '正常'},{value: '轻度聋',label: '轻度聋'},{value: '中度聋',label: '中度聋'},{value: '中重度聋',label: '中重度聋'},{value: '极重度聋',label: '极重度聋'}],
    typeObject:(function(){
        let arr = testTypeArr,
            obj ={progress:0,overCount:0},
            res = [];
        arr.forEach(item =>{
            res.push(Object.assign(item,obj))
        })
        return res;
    })(),
    boy: boy,
    girl: girl,
    rank_1: rank_1,
    rank_2: rank_2,
    rank_3: rank_3,
    rank_4: rank_4,
    nodata: nodata,

}