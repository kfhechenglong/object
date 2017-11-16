var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
// 频繁点击事件的变量
var timer = null;
var previous = null;
import code from './code.js'
import html2canvas from'../api/html2canvas.js'
export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    // 转换年龄日期格式
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    // 删除数组的方法
    arrayRemove : function(){
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
            this.splice(index, 1);
            }

        };
        // 数组去重
        Array.prototype.unique = function(){
            var res = [];
            var json = {};
            for(var i = 0; i < this.length; i++){
                if(!json[this[i]]){
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }
        // 数组删除重复的元素
        Array.prototype.removeunique = function(){
            for (var i = 0; i < this.length; i++) {
                for (var j = i+1; j < this.length; j++) {
                    if(this[i] == this[j]){
                        this.splice(j,1)
                        this.splice(i,1)
                    }
                }
            }
            return this
        }
    },
    // 避免频繁点击事件
    throttle :function (fn, delay, atleast) {
        // debugger;
        return function () {
            var now = +new Date();
            if ( !previous ){previous = now;} 
            // console.log(now - previous)
            if ( atleast && now - previous > atleast ) {
                fn();
                console.log(1)
                // 重置上一次开始时间为本次结束时间
                previous = now;
                clearTimeout(timer);
            } else {
                
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    fn();console.log(2)
                    previous = null;
                }, delay);
            }
        }
    },
    // 绘制表格
    initTable :function(table,td,top,list ){
        var table,height,width,cells,cellHeight,cellWidth;
        table = jq(table);
        // 获取表格的宽和高
        height = table.offsetHeight -70;
        width = table.offsetWidth -70;
        // 将宽和高赋值给单元格
        cells = table.getElementsByTagName(td);
        // var toplength = top.length;
        // var listlength = list.length;
        cellHeight = Math.round(height/top);
        cellWidth = Math.round(width/list);
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.height = cellHeight+'px';
                cells[i].style.width = cellWidth+'px';
            }
        return {'cellHeight':cellHeight,'cellWidth':cellWidth,'height':height,'width':width}
    },
    // 判断主控端是否被注册
    isOnline: function(str){
        // console.log(1)
        str.$alert('主控端已经被注册，请关闭一个！否则您只能查询档案！', '提示', {
            confirmButtonText: '确定',
            }).then(() => {
            str.$router.push({ path: '/home' });
            });
    },
    // 正式测听被控端掉线的提示
    ctld_isOnline:function(that,res,str,fn){
        that.isOnline = res;
        if(!res && str){
            that.$confirm('被控端断开连接，请选择!', '提示', {
                closeOnClickModal:false,
                closeOnPressEscape:false,
                cancelButtonText: '保存数据',
                confirmButtonText: '返回主页',
            }).then(() => {
                that.$router.push({ path: '/home' });
            }).catch(() => {
                fn(that)
            });
        }
    },
    // 游戏训练被控端掉线的提示
    ctld_tran_isOnline:function(that,res,str){
        that.isOnline = res;
        if(!res && str){
            that.$confirm('被控端断开连接，请选择!', '提示', {
                closeOnClickModal:false,
                showCancelButton:false,
                closeOnPressEscape:false
            }).then(() => {
                that.$router.push({ path: '/home' });
            }).catch(() => {
            });
        }
    },
    // 游戏训练函数
    angin(pointer){
        var argument = pointer.wskt.wstoctld('games_train_start',{restart:"true"});
        websocket.send(JSON.stringify(argument));
        window.isToggle = false;
        pointer.isfinish = 'params';
        pointer.step = 1;
        pointer.isPause = !pointer.isPause;
    },
    //游戏训练暂停
    toPause:function(str,pointer){
        var argument = null;
        // this.toSendParams()
        // 点击暂停时，被控端游戏训练暂停，同时可以进行完成操作，进入正式测听环节
        if( str == "finish"){//表示点击的暂停按钮
            argument = pointer.wskt.wstoctld('games_train_pause','');
            // 禁用暂停按钮
            // this.topause = false;
            // 增加暂停提示功能
            pointer.isPause = !pointer.isPause;
            pointer.isfinish = 'finish';
            pointer.topause = false;
        } else{
        // 如果是点击的继续按钮，被控端继续进行游戏训练，同时禁用进入正式测听环节，和重新开发按钮
            argument = pointer.wskt.wstoctld('games_train_continue','');
            // 显示暂停按钮
            pointer.isPause = !pointer.isPause;
            // 禁用重头按钮
            pointer.isfinish = str;
        }
        // pointer.toSendParams()
        websocket.send(JSON.stringify(argument));
    },
    stops:function(pointer){
        if(pointer.wsData.params['lastLap']){
            pointer.step = 2;
        };
    },
    successNum:function(pointer){
        if(pointer.step === 2){
            if(pointer.wsData.params['success'] == 'true'){
                pointer.successTimesNum++;
                if(pointer.successTimesNum === 3){//如果连续对三次则结束训练
                    pointer._trainOverTips();
                }
                return;
            }else{
                pointer.successTimesNum = 0;
            }
        }
    },
    // 训练完成提示
    _trainOverTips(_this){
        var argument = _this.wskt.wstoctld('games_train_pause','');
        websocket.send(JSON.stringify(argument));
         //如果连续对三次则进行提示训练结束
        // 弹出提醒，选择是否进入下一界面
        _this.$confirm('太赞了！宝宝已经顺利完成培训，可以进入正式测听了!', '提示', {
        }).then(() => {
            _this.goNext();
            websocket.send(JSON.stringify(_this.wskt.goaudioplan('yinsu','official','eggFrenzy')));
        }).catch(() => {
            window.isToggle = false;
            argument = _this.wskt.wstoctld('games_train_again_start','');
            websocket.send(JSON.stringify(argument));
            _this.start = false;
            _this.step = 0;
            _this.topause = true;
        });
    },
    // 对测试的元素进行组合
    groupArray:function(str){
        let newArr = []
        for (var i = 0; i < str.length; i++) {
            for (var j = i+1; j < str.length; j++) {
                newArr.push([str[i],str[j]])
            }
        }
        return newArr;
    },
    // 对林氏六音的词组进行组合
    toArrayLin:function(str){
        let newArr = []
        for (var i = 0; i < str.length; i++) {
            newArr.push([str[i],'null']);
        }
        return newArr;
    },
    // 将接受的参数转换为数组
    toArray:function(arr,str1,str2){
        let newArr = [],
            newTitle = [],
            newpath = [],
            vpath = [];
        // 判断是否为数组
        if(Object.prototype.toString.call(arr) === '[object String]'){
            arr = [arr];
        }       
        for (var i = 0; i < arr.length; i++) {
            // console.log(this.groupArray(arr[i]['path'].split(',')))
                vpath.push(arr[i]['vpath'])
                newpath.push(arr[i]['path'].split(','));
                newTitle.push([arr[i]['group'].split('').reverse().join(''),arr[i]['id']]);
                newArr.push(arr[i]['children'].split(','));
            }
        str1 = newArr;
        str2 = newTitle;
        return {newArr,newTitle,newpath,vpath}
    },
    // 日期格式转换
    dateToggle:function(year,month,day,data1){
        let date = null;
        if(data1 === undefined){date = new Date()}else{date = new Date(data1);}
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return  y + year + m + month + d +day;
    },
    // 避免频繁点击
    _click:function(str,fn){
        clearTimeout(timer);
        timer = setTimeout(() =>{
            fn(str);
        },800);
    },
    // jq简版选择器
    jq: function(strSelector){   
        var reId=/#/g;   
            var reClass=/\./g;  
        
            /* 通过 class 获取元素 */   
            function getByClass(sClass){       
                var arrE=[];       
                var allE=document.getElementsByTagName("*");       
                var re=new RegExp("\\b" + sClass + "\\b","g");               
                for(var i=0;i<allE.length;i++)
                {
                        if(allE[i].className.toString().search(re)!=-1){               
                         arrE.push(allE[i]);           
                        }      
                 }       
            return arrE;   
        }        
     
        /* 包含 # 情况--- id 选择器 */  
        if(reId.test(strSelector)){      
             var eId=strSelector.split("#");  
             if(eId[0]!=""){          
                  var isTag=document.getElementsByTagName(eId[0]);          
                  var isId= document.getElementById(eId[1]);                      
                  for(var i=0;i<isTag.length;i++){               
                         if(isId.id == isTag[i].id){                   
                               return isId;              
                         }          
                  }       
              }       
            else{          
                 return document.getElementById(eId[1]);       
            }   
        }    
        /* 包含 . 情况--- class 选择器 */  
        else if(reClass.test(strSelector)){       
          var eClass=strSelector.split(".");               
          if(eClass[0]!=""){           
                var isTag=document.getElementsByTagName(eClass[0]);          
                var isClass= getByClass(eClass[1]);          
                var arr=[];                       
                for(var i=0;i<isTag.length;i++){               
                      for(s=0;s<isClass.length;s++){                  
                              if(isClass[s].className == isTag[i].className){                                                arr.push(isClass[s]);                  
                              }               
                       }          
                 }                      
             return arr;       
           }       
         else{          
                return getByClass(eClass[1]);       
          }   
        }  
         /* 获取 tag 符合的元素 */   
        else{      
            return document.getElementsByTagName(strSelector);  
        }
    },
    // 拼音+汉字检索姓名
    searchName:function(search,array,login){
        // console.log(111)
        if(search != ""){
            let res = [],
            searchPinYin = code.toPinYin(search)[0].toLocaleUpperCase(),
            arr = array;
            let length = searchPinYin.length;
           // debugger
            for (let i = 0,arrLen = arr.length; i < arrLen; i++) {
                let isChese = /^[A-Za-z]*$/;
                if(isChese.test(search) && !login){
                    // 拼音检索
                    let itemPinYin = arr[i].pinyin;
                    for(let j = 0, pinlength = itemPinYin.length; j < pinlength ; j++){
                        // console.log(searchPinYin.length)
                        // 精确匹配拼音
                        if((itemPinYin[j].slice(0,length)).toLocaleUpperCase() == searchPinYin){
                            res.push(arr[i]);
                        }
                    }
                }else{
                    // 汉字检索
                    if(arr[i].name.indexOf(search) >=0){
                        res.push(arr[i])
                    };
                }
            }
            if (login) {return res}
            // 数组对象去重
            let resInfo = [];
            let json = {};
            for (let i = 0; i < res.length; i++) {
                if(!json[res[i]["id"]]){
                    resInfo.push(res[i]);
                    json[res[i]["id"]] = 1;
                }
            }
            return resInfo; 
        } else {
            // this.getList();
            return array;
        }
    },
    // 消息提示框
    msgTipsErr:function(e,msg){
        e.$message({
            message: msg,
            duration:"1000",
            iconClass:"fa fa-frown-o msgTipsErr",
        });
    },
    msgTipsSuccess:function(e,msg){
        e.$message({
            message: msg,
            duration:"1000",
            iconClass:"fa fa-smile-o msgTipsSuccess",
        });
    },
    // 打印功能样式
    print:function(id,inner,pointer){
        // debugger
        // var bd = window.document.body.innerHTML;
        var bdhtml;
        if(inner){
            bdhtml = inner;
        }else{
            bdhtml=jq(id).innerHTML;
        }
        // window.document.body.innerHTML = bdhtml;
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.id = "ifr";
        // iframe.setAttribute('hidden','hidden');
        iframe.style.height = "100%";
        document.body.appendChild(iframe);
        let iframesContent = iframe.contentWindow.document;
        iframesContent.open();
        if(window.location.port == 8080){
            var newContent = '<html><head><title>打印报告</title><link type="text/css" rel="stylesheet" href="../../../../static/css/testicon.css"/><link type="text/css" rel="stylesheet" href="/../../static/css/print.css" media="print"/></head>'
            newContent += '<body onload="loaded1()">' + bdhtml + '</body><script src="../../../../static/print.js"><\/script></html>'
        } else{
            var newContent = '<html><head><title>打印报告</title><link type="text/css" rel="stylesheet" href="./static/css/testicon.css"/><link type="text/css" rel="stylesheet" href="./static/css/print.css" media="print"/></head>'
            newContent += '<body onload="loaded1()">' + bdhtml + '</body><script src="./static/print.js"><\/script></html>'
        }
        // console.log(newContent)
        iframesContent.write(newContent);
        iframesContent.close();
        setTimeout(() =>{
            iframe.parentNode.removeChild(iframe);
            if(pointer){//清除高级查询中的听力图编码缓存
                pointer.$store.commit('clearAllPrintImgs');
            }
        },100);
    },
    // 将打印的部分保存为图片
    toImg: function (id,pointer,time,distance) {
        // console.log('存成图片');
        var wh,ht;
        if(distance){
            wh = distance.width;
            ht = distance.height;
        }else{
            wh = 150;
            ht = 460;
        }
        var element = document.getElementById(id);
        var that = pointer
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var scale = 2;//this.getPixelRatio(context);
        var w = element.offsetWidth + wh;
        var h = element.offsetHeight + ht;
        canvas.width = w * scale;
        canvas.height = h * scale;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        context.scale(scale, scale);
        // console.log(canvas.height,h)
        var opts = {
            scale:scale, // 添加的scale 参数
            canvas:canvas, //自定义 canvas
            logging: false, //日志开关
            width:w, //dom 原始宽度
            height:h //dom 原始高度
        };
        // var imgs = document.createElement("img");
        html2canvas(element, opts).then(function (canvas) {
            var newImg = document.createElement("img");
            var dataUrl = canvas.toDataURL();
            //发数据到后台
            var obj ={
             'base64':dataUrl,
             'time':time       
            }
           // console.log(dataUrl)
           that.$ajax.post1(``,obj).then(function(response){
                console.log(response)
           }).catch((error) =>{
                alert(error + "报告保存出错")
           })
        });
        // document.body.appendChild(imgs);
    },
    // html canvas base64转码
    canvas2html:function(id,pointer,time,pages){
        // 要截取的图片个数
        var a = 1;
        if(typeof(pages) === 'number'){
            a = pages;
        }
        return new Promise((resolve,reject) =>{
            let element = document.getElementById(id);
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            let scale = 2;//图片缩放;
            let w = element.offsetWidth + 150;
            let h = element.offsetHeight + 460;
            canvas.width = w * scale;
            canvas.height = h * scale *a;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            context.scale(scale, scale);
            let opts = {
                scale:scale, // 添加的scale 参数
                canvas:canvas, //自定义 canvas
                logging: false, //日志开关
                width:w, //dom 原始宽度
                height:h //dom 原始高度
            };
            html2canvas(element, opts).then( (canvas)=>{
                let dataUrl = canvas.toDataURL();
                //发数据到后台
                let obj ={
                 'base64':dataUrl,
                 'time':time       
                }
                // pointer.imgurl.push(dataUrl)
                let inner_fn = ()=>{
                    return new Promise((resolve,reject) =>{
                        if(time){
                            pointer.$ajax.post1(``,obj).then((str)=>{resolve(str)})
                        }else{
                            pointer.$ajax.post('/info/printbg',obj).then((str)=>{resolve(str)})
                        }
                    })
                };
                inner_fn().then((response) =>{
                        if (response.code === 200) {
                            console.log('print to send server success！')
                            resolve()
                        }
                   }).catch((error) =>{
                        alert(error + "报告保存出错")
                   })
            });
        })
    },
    // base64转码
    toBase64:function(data){
        var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var base64Pad = '=';
        var result = '';                                                                              
        (function toBase64(data) {
            var length = data.length;                          
            var i; 
            // Convert every three bytes to 4 ascii characters.                                                                                       
            for (i = 0; i < (length - 2); i += 3) {                                                       
                result += toBase64Table[data.charCodeAt(i) >> 2];                             
                result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i+1) >> 4)];   
                result += toBase64Table[((data.charCodeAt(i+1) & 0x0f) << 2) + (data.charCodeAt(i+2) >> 6)];                                                 
                result += toBase64Table[data.charCodeAt(i+2) & 0x3f];                                                              
            }                                                                                            
            // Convert the remaining 1 or 2 bytes, pad out to 4 characters.                                                                        
            if (length%3) {                                                                          
                i = length - (length%3);                                                                   
                result += toBase64Table[data.charCodeAt(i) >> 2];                                                                 
                if ((length%3) == 2) {                                                                      
                    result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i+1) >> 4)];                                                          
                    result += toBase64Table[(data.charCodeAt(i+1) & 0x0f) << 2];                                    
                    result += base64Pad;                                                            
                } else {                                                                                         
                    result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];                                                                                        
                    result += base64Pad + base64Pad;                                                             
                }              
            }
        })(data);
        return result; 
    },
    // 获取音量衰减值
    _getVolumNum(pointer){
        pointer.$ajax.post('/info/getvolume',{'test_id':sessionStorage.getItem('test_id')}).then((response)=>{
            if(response.code === 200){
                pointer.getVolumNum = response.data.decibel;
                if(response.data.decibel == 0){return}
                pointer.value = 6 - (+response.data.decibel/10);
            }
        }).catch((err)=>{
            alert(err)
        });
    },
    _setVolumNum(pointer,data,fn){//设置音量衰减值
        pointer.$ajax.post('/info/updatevolume',data).then((response)=>{
                // fn();
            }).catch((err)=>{
                alert(err)
            });
    },
    //获取测试类型
    getType(test_id){
        // console.log(test_id)
        switch(test_id){
            case 1 :
            return "林氏六音";
            case 6 :
            return "助听听阈";
            case 2 :
            return "音素区分";
            case 3 :
            return "声调区分";
            case 4 :
            return "声母区分";
            case 7 :
            return "混淆音区分";
            default:
            return "未知错误！";
        }
    },
    //获取ip
    getterIp(pointer){
        pointer.$ajax.post('/info/getIp').then((response) =>{
            if(response.code === 200){
                pointer.$store.commit('getterIp',response.data);//储存ip，二维码使用 
            }
        }).catch((err) =>{
            alert(err +"获取ip出错")
        });
    },
    getterIpCode(pointer,fn){//使用二维码前，先检查网络
        pointer.$ajax.post('/info/getIp').then((response) =>{
            if(response.code === 200){
                pointer.$store.commit('getterIp',response.data);//储存ip，二维码使用 
                if(response.data){
                    if(adIsOnline){//websocket在线
                        fn(pointer); 
                    }else{
                        msgTipsErr(pointer,"主控端未连接websocket！")
                    }
                }else{
                    msgTipsErr(pointer,"ip地址"+response.data+"不符合要求！")
                }
            }else{
                msgTipsErr(pointer,"暂时无法连接服务！")
            }
        }).catch((err) =>{
            alert(err +"获取ip出错")
        });
    },
    getClass(pointer,fn){
        pointer.$ajax.post('/class/showlist',null).then((res) =>{
            if(res.code === 200){
                pointer.class_name_list = res.data;
                if(fn){
                    fn(pointer,res.data)
                }
            }else{
                msgTipsErr(pointer,'获取班级列表失败！')
            }
        }).catch((err) =>{
            alert(err+"获取班级错误！");
        })
    },
    getSheBei(pointer){
        pointer.$ajax.post('/app/showlist',null).then((res) =>{
            // console.log(res.data)
            if(res.code === 200){
                pointer.options = res.data;
            }else{
                msgTipsErr(pointer,'获取产品出错！')
            }
        }).catch((err) =>{
            alert(err +"获取产品出错！")
        })
    },
    // 获取班主任
    getTeacher(pointer,fn){
        pointer.$ajax.post('/teacher/showlist',null).then((res)=> {
            if(res.code === 200){
                pointer.teacher_list = res.data;
                if(fn){
                    fn(pointer,res.data)
                }
            }
        }).catch((err) =>{
            alert(err +'获取老师数据出错！')
        })
    },
    getLocalStorage(user_id,type_id){
        let getLocalStorage = JSON.parse(localStorage.getItem("noTestNames"));
        // 先查看本地有没有待测名单
        if(!getLocalStorage){
        }else{
            // 获取当前用户的id
            for (let i = 0; i < getLocalStorage.length; i++) {
                if(getLocalStorage[i].testType == type_id){
                    //查看当前测试者是否在未测名单中，如果在，则移除，否则忽略
                    const nameLists = getLocalStorage[i].nameList;
                    // debugger
                    for (let j = 0; j < nameLists.length; j++) {
                        if(nameLists[j].user_id == user_id){
                            nameLists.splice(j,1)
                        }
                    }
                }
            }
            localStorage.setItem("noTestNames",JSON.stringify(getLocalStorage))
        }
    },
    // 获取打印机
    getPrint(pointer,flag,params){
        let agr = {printer:1};
        // 删除打印任务
        if(typeof(params) === 'object'){
            agr = params;
        }
        pointer.$ajax.post('/index/printer',agr).then((res)=> {
            console.log(res); 
            pointer.$store.commit('getterPrint',res.code);//储存打印机信息，打印使用
            if(res.code === 200){
                if( typeof(flag) === 'function' && flag){
                    // 打印前的检查
                    flag();
                }
                if(res.data){
                    pointer.printData = res.data;
                    return;
                }
            }else if(res.code === 0){
                if( typeof(flag) === 'function' && flag){  
                    msgTipsErr(pointer,'打印机未连接！')
                }
            }
            pointer.printData = {};
            if(typeof(params) === 'object' && res.code !== 200){
                msgTipsErr(pointer,'删除任务失败！')
            }
        }).catch((err) =>{
            alert(err +'获取打印机出错！')
        })
    },
    clearPrintData:(pointer,fn)=>{
        pointer.$ajax.post('/info/clearprint',null).then((res)=> {
            if(res.code === 200){
                if(typeof fn === 'function'){
                    fn()
                }else{
                    console.log('传入的类型不正确！')
                }
            }else{
                msgTipsErr('上次打印数据删除失败！')
            }
        }).catch((err) =>{
            alert(err +'删除打印数据出错！')
        })
    },
    // 林氏六音数据处理
    todoliudata(params){
        let renderData = [];
        // 所有表格的表头
        let tableHeader = [];
        let allDistance = [];
        for (let i = 0; i < params.length; i++) {
            let data = params[i].data;
            if(Object.prototype.toString.call(data) === '[object String]'){
                data = JSON.parse(data);
            }
            let title = [];//获取单个的表头
            const distance = [];
            for(var key in data){
              for(var val in data[key]){
                title.push(val);
                if(val === 'm'){
                  for(var l in data[key][val]){
                    distance.push(l)//获得距离
                  }
                };
              }
              title.unshift('距离（米）');
            }
            allDistance.push(distance);
            tableHeader.push(title);
            renderData.push(data);
        }
        const obj = {
          'distance' : allDistance[0],
          'tableHeader' : tableHeader[0],
          'resultData' : renderData[0]
        };
        return obj;
    },
    // 处理音素测试的打印渲染数据
    todotonedata(params){
        let renderData = [];
        // 星级评价
        let advise = [];
        for (let i = 0; i < params.length; i++) {
            let data = params[i].data;
            if(Object.prototype.toString.call(data) === '[object String]'){
                data = JSON.parse(data)
            }
            renderData.push(data);
            if(params[i].advise){
              advise.push(JSON.parse(params[i].advise))
            }
        }
        const rederTableData = new Array;
        const groupId = new Array;
        function _toRederTableData(data){
          for (let i = 0; i < data.length; i++) {
            let rederTable = new Array;
            for(let key in data[i]){
                // 获取词组的id
                groupId.push(key);
                let keyItem = data[i][key];
                let empty = new Array;
                for(let val in keyItem){
                  empty.push(val);
                }
                empty.unshift('');
                rederTable.push(empty);
            };
            rederTableData.push(rederTable)
          }
        }
        _toRederTableData(renderData);
        const obj = {
          'starValue' : advise[0],
          'rederTableData':rederTableData[0],
          'groupId':groupId,
        };
        return obj;
    }
};