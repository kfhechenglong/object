// import utils from './util.js'
import { assess } from '../api/api'
export default {
    /**
     * *点击开始时不同耳旁的提示信息
     * @param  {[type]}   th       [this vue]
     * @param  {[String]}   ear      [current ear]
     * @param  {Function} callback [function]
     * @return {[type]}            [description]
     */
    earTips(th,ear,callback) {
        console.log(ear)
        const getFirstEar = ear,
            oneear = getFirstEar == 'L'?'左':'右',
            twoear = getFirstEar == 'R'?'左':'右';
        const h = th.$createElement;
        th.$msgbox({
            title:'重要提示',
            message: h('p', {style:'font-size:18px'}, [
                h('div', { class: 'seconddiv' }, [
                    h('span',null,'请'),
                    h('strong',{style:'font-weight:700'},'打开'+oneear+'耳'),
                    h('span',null,'助听设备，同时'),
                    h('strong',{style:'font-weight:700'},'关闭'+twoear+'耳'),
                    h('span',null,'设备或'),
                    h('strong',{style:'font-weight:700'},'掩蔽'+twoear+'耳'),
                    h('span',null,'耳道')
                    ])
              ]),
            customClass:'msgboxClass',
            confirmButtonText: '继续',
            closeOnClickModal:false,
            closeOnPressEscape:false,
            showCancelButton:true,
            cancelButtonText: '取消',
        }).then((btn) => {
            if(btn === "confirm"){
                callback();
            }
        }).catch((err) => {
            console.log(err)
        });
    },
    // 音素测听开始
    toStart(th){
        const send_instructions = ()=>{
            let flag = th.$route.query.flag;
            th.$store.commit('gamesGoBackTips',true);
            // 测试的组数
            if(!flag){//非暂存状态下
                th.currentIndex = 0 ;
                th.showTable(0);
            }
            // 禁止列表切换
            th.toggle = false;
            // 禁用开始按钮
            th.start = !th.start;
            th.pauseFalse = false;
            // 向被控端发送参数
            th.toSendParams(flag);
        }
        if(th.currentear !== "A"){
            this.earTips(th,th.currentear,send_instructions);
        }else{
            send_instructions();
        }
    },
    // 音素测听暂停
    isPause(th, str, flag){
        return new Promise((resolve,reject)=>{
            if (str === "continue") {
                th.pause = true;
                th.isSave = false;
                th.clearClass(false);
                // 发送暂停指令
                websocket.send(JSON.stringify(th.wskt.wstoctld('games_audio_continue', '')));
                resolve('continue');
            } else {
                th.pause = false;
                th.isSave = true;
                flag ? "" : th.clearClass(true);
                // 发送继续指令
                websocket.send(JSON.stringify(th.wskt.wstoctld('games_audio_pause', '')));
                resolve('pause');
            }
        })
        
    },
    // 控制表头的class类
    clearClass(th,str,td,text1,text2){
        for (let i = 0; i < td.length; i++) {
            let span = td[i].getElementsByTagName('span')[0];
            // 获取元素的类
            let classVal = td[i].getAttribute("class");
            // 移除里面的类
            classVal = classVal.replace(" highlight", '');
            classVal = classVal.replace(" pasehighlight", '');
            td[i].setAttribute("class", classVal);
            let ele = span ? span : td[i];
            setTimeout(() => {
                if (ele.innerHTML == text1 || ele.innerHTML == text2) {
                    if (str !== 'clear'){
                        if (!str) {
                            classVal = classVal.concat(" highlight");
                            td[i].setAttribute("class", classVal)
                        };
                        if (!th.pause && !th.pauseFalse) {
                            classVal = classVal.concat(" pasehighlight");
                            td[i].setAttribute("class", classVal)
                        }
                    }
                };
            }, 50);
        }
    },
    // 音素测听保存
    // 
    toSave(th,obj,url = '/assess/add'){
        if (!th.pauseFalse) {
            // 清除高亮提示色
            th.clearClass('clear');
            // 禁用暂停，继续按钮
            th.pauseFalse = true;
            th.isPrinter = true;// 启用打印按钮
            // 开启切换列表
            th.toggle = true;
        };
        if (th.isSaveSuccess) {
            msgTipsSuccess(th, '您已提交过数据!');
            return
        };
        let info = JSON.parse(sessionStorage.getItem('user_text')),
            user_id = JSON.parse(sessionStorage.getItem('user_id')),
            type_id = sessionStorage.getItem('test_id'),
            sendObj = {};
        if (url === "/assess/add"){
            sendObj = {
                user_id: user_id,
                type_id: type_id,
            }
        }else{
            sendObj = {user_id: user_id}
        }
        this.resultSavePost(th, url, {...sendObj,...obj,...info }, user_id, type_id);
    },
    // 数据保存
    /**
     * 
     * @param {*} th 
     * @param {*} url 
     * @param {存档的数据} resultSave 
     * @param {被测试者的} user_id 
     * @param {*} type_id 
     */
    resultSavePost(th, url, resultSave, user_id, type_id){
        th.$ajax.post(url, resultSave).then((response) => {
            console.log(response);
            if (response.code == "200") {
                th.$store.commit('gamesGoBackTips', false);
                th.isSaveSuccess = true;
                // 查询未测名单
                Utils.removeLocalStorage(user_id, type_id);
                if (th.$route.query['flag']){
                    Utils.removeLocalStorage(user_id, type_id,'memoryStorageTestData');
                }
                msgTipsSuccess(th, '提交成功!');
            } else {
                msgTipsErr(th, '提交失败!');
            }
        }).catch((error) => {
            console.log(error);
        })
    },
    sperErr(code,th){
        var str = ""
        if(code == 101){
            str = "播放声音错误！";
        }else if(code == 102){
            str = "当前声场测试不符合要求，请检查设备连接！";
        }
        return th.$confirm(str, '提示', {
                closeOnClickModal:false,
                closeOnPressEscape:false,
                showCancelButton:false,
            })
    },
    toSetFeedTime(th,msg,game,time = 0){
        if(msg === 'message_success'){
            const type_id = sessionStorage.getItem('test_id');
            const gettime = +th.wsData.params.feedbackTime.toFixed(2);
            let playTimer = time;
            if (type_id == 6 && game != "zteggFrenzy"){
                /*
                *助听听阈下判断游戏是否为砸金蛋，
                *若不是，则播放时长就是反应时长的较小值；
                */
                playTimer = gettime && gettime < time ? gettime : time;
            }
            let data = {
                'feedbackTime': gettime,
                'playTimer': playTimer,
                'games':game
            };
            return Utils.setFeedTime(th,'/game/formalLog',data)
        }
        // return Promise.reject('err')
    },
    // 音素测试进行监听
    gamesWatch(th, data,callback){
        let testparams = data.params;
        if(testparams['testType'] === 'yinsu'){
            th.groupNum++;
            // 统计测试结果
            if(testparams['group']){
                callback(testparams['group']);
            };
        };
        if(testparams && testparams.prepare){// 被控端页面准备好后，可进行操作
            th.dialogVisibleTips = false;
            th.prepare = true;
        };
        this.toSetFeedTime(th, data.mescon,th.currentgame)
    },
    // 学生的头像信息
    isBodyOrGirl(item){
        if (!item.picture) {
            if (item.gender == "男" || item.sex == "男") {
                return Options.boy;
            } else {
                return Options.girl;
            }
        } else {
            return web_url + item.picture + '?=' + Math.random();
        }
    },
    // 打印样式，星级评价
    printStar(index,imgs){
        for (var i = 0; i < index; i++) {
            var str = imgs[i].src;//先把每一个img元素的src取出来
            if (i % 2 === 0) {
                str = Options.rank_1;
            } else {
                str = Options.rank_2;
            }
            imgs[i].src = str;//把替换后的字符赋值给src
        }
        for (var j = index; j < imgs.length; j++) {
            var str = imgs[j].src;//先把每一个img元素的src取出来
            if (j % 2 === 0) {
                str = Options.rank_3;
            } else {
                str = Options.rank_4;
            }
            imgs[j].src = str;//把替换后的字符赋值给src
        }
    },
    /**
     * 
     */
    storageTips(th,obj,callback){
        th.$confirm('是否暂存数据并退回到主页？', '提示', {
            //type: 'warning'
        }).then(() => {
            this.storage_content(th, obj, callback);
        })
    },
    storage_content(th, obj, callback){
        return new Promise((resolve, reject) => {
                callback ? callback() : "";
                resolve()
            })
            .then(() => {
                // 保存数据
                const typeObject = Options.testType,
                    sendObj = {
                        ...obj,
                        'user_id': JSON.parse(sessionStorage.getItem('user_id')),
                        'time': parseInt(new Date().getTime())
                    };
                console.log(sendObj);
                return Utils.setLocalStorage("memoryStorageTestData", typeObject, { "key": JSON.parse(sessionStorage.getItem('test_id')) }, sendObj)
            })
            .then(() => {
                th.$router.push({ path: '/home' });
                window.isToggle = false;
                // 返回游戏主页
                var argument = th.wskt.gohome();
                websocket.send(JSON.stringify(argument));
            })
            .catch((e) => {
                if (e === 'err') {
                    msgTipsErr(th, '保存失败！')
                }
            });
    }
};
