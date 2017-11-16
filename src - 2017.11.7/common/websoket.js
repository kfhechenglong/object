
export default {
    // 给被控端发送指令
   wstoctld :function (str1,str2){
         return {
                mesid:parseInt(new Date().getTime()),
                mestype:"cmd",
                mesfrom:"ad",
                mesto:"ctld",
                mescon:str1,
                params:str2
            }
    },
    // 给服务器发送指令
    wstoserver :function (str1,str2){
         return {
                mesid:parseInt(new Date().getTime()),
                mestype:"cmd",
                mesfrom:"ad",
                mesto:"server",
                mescon:str1,
                params:str2
            }
    },
    // 给播放器发送指令
    wstosper :function (str1,str2){
         return {
                mesid:parseInt(new Date().getTime()),
                mestype:"cmd",
                mesfrom:"ad",
                mesto:"sper",
                mescon:str1,
                params:str2
            }
    },
    // wepapp发送指令
    wstoApp :function (str1,str2){
         return {
                mesid:parseInt(new Date().getTime()),
                mestype:"cmd",
                mesfrom:"ad",
                mesto:"uploader",
                mescon:str1,
                params:str2
            }
    },
    gohome:function(){
        var params = {
                'url':"index"//跳转页面
            }
        return this.wstoctld('games_home',params);
    },
    // 进入测听界面
    goaudioplan:function(testType,gameType,url){
         var params = {
                testType:testType,
                gameType:gameType,
                url:url
            }
        return this.wstoctld('games_home',params);
    },
    //图片上传时的信息传递
    up_loder:function(pointer){
       if(pointer.wepAppTime.mescon === 'success'){
            if(pointer.wepAppTime.params.success){//如果上传成功，则刷新图片
                console.log(11)
                return 'redact'
            }
        }
    },
    // 判断是否在当前页面
    hasCurrentPage:function(pointer,time,data){
        console.log(data)
        if(data.mescon === 'up'){
            if(data.params.time == time){
                let argument = pointer.wskt.wstoApp('page',{'isCurrentPage':true});
                websocket.send(JSON.stringify(argument));
                console.log(argument);
            }else{
                let argument = pointer.wskt.wstoApp('page',{'isCurrentPage':false});
                websocket.send(JSON.stringify(argument));
                console.log(argument);
            }
            return 'up'
        }
    }
}
