let testValue = [];
export default {
    // 获取校准的强度
    inint_calibrationData (state,text){
        state.initial_value = {...text};
    },
    progress_Clear (state){
        state.progress.length = 0;
    },
    progress_fn (state,text){
        state.progress.push(text)
    },
    // 判断cmd是否在线
    CMD_IS_ONLINE(state,obj){
        state.CMDisOnline = obj;
    },
    //保存拼音
    setterVoicesGroup (state,text){
        state.voicesGroup = text;
    },
    // 保存当前学生的ID值，返回base页面
    goToBase (state,obj){
        state.baseActive = obj['base'];
        state.studyID = obj['id'];
    },
    isActive(state,text){
        state.baseActive = text;
    },
    //获取用户ip
    getterIp (state,ip){
        state.IP = ip
    },
    //获取打印机
    getterPrint (state,msg){
        state.printMsg = msg
    },
    //获取扫码时的信息，时间戳
    getter_time(state,text){
        state.wepAppTime = text
    },
    // 获取时间戳
    getter_code_time(state,text){
        state.time = text;
    },
    // 获取数据库中听力图的信息
    hasCanvasData(state,text){
        state.canvasMarks = text;
    },
    //获取测试过程中听力图的信息
    hasTestCanvasData(state,text){
        const a = state.canvasMarks;
        state.canvasMarks = {
            ...a,
            ...text
        };
    },
    hasCurrenttonetype(state,text){
        state.currenttonetype = text;
    },
    test_spl(state,text){//测试用
        state.test_spl = text;
    },
    code_api(state,text){
        state.codeApi = text;
    },
    setAllPrintImgs(state,text){
        state.allPrintImgs.push(text);
    },
    clearAllPrintImgs(state){
        state.allPrintImgs = [];
    },
    setProduct(state,text){
        state.product = text;
    },
    hadStudyInfo(state,text){
        state.hadDeleStudy = text;
    },
    // 打印学生基本信息
    printInfoBase(state,flag){
        state.isToPrintBase = flag;
    }
}
