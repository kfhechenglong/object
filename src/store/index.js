//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//引入相应的getters、mutations、actions
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
//定义state
const state = {
	// 初始校准数据
	initial_value:{},
    zhutingData : {},
    voiceData : {},
    hz:[],
    // maxDbList:[],
    // 声音校准值
    progress:[],
    // 个性听辨词组
    voicesGroup :{},
    // 基本信息学生的id
    studyID:'',
    baseActive:'',
    wepAppTime:'',//手机上传码时的信息
    canvasMarks:'',
    CMDisOnline:{},
    time:'',//二维码的时间戳
    test_spl:'',//测试用数据
    currenttonetype:'',//当前声音类型,
    codeApi:'',
    IP:null,
    printMsg:null,
    allPrintImgs:[],
    hadDeleStudy:[],
    product:[],//设备产品
    gamesTimesObj:{},
    btn_tips:false//游戏测听退出按钮提示
}
// console.log(state)
// console.log(Vuex)
//实例化一个store对象并导出
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
