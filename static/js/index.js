"use strict";
function UrlSearch() {
    let name,value; 
    let str=location.href; //取得整个地址栏
    let num=str.indexOf("?") 
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
      if(num>0){ 
        name=arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        if(value.indexOf("#") > -1){
          num=value.indexOf("#");
          value=value.substr(0,num);
        }
        this[name]=value;
      } 
    } 
};
let initDbValue = 60;//初始的轻度值
let dbAddValue = 10;//频率跳转的强度增加值
let Request = new UrlSearch(); //实例化
let apihost = Request.apihost || '172.16.1.65';
let apiport = Request.apiport || '80';
let wshost = Request.wshost || '172.16.1.65';
let wsport = Request.wsport || '9002';
let base = "",
    web_url="",
    port= window.location.port;
if(port == 8080){
    base = '/api';
    apihost = '172.16.1.65'
    apiport = '808'
}else{
    base = 'http://'+apihost+':'+apiport+'/aamis/be/Public/index.php';
};
let  url = '';
if(port == 8080){
    url = '172.16.1.65'+':9002';
}else if(wshost){
    url = wshost+':'+wsport;
}
web_url = 'http://'+apihost+':'+apiport;
window.onload = function(){
    // 点击header以外的地方，隐藏下拉框
    const body = jq('body')[0];
    body.addEventListener('click', handleClick);
    function handleClick(e){
        const uls = jq('.dropdown-child');
        if(uls){
            for (let i = 0; i < uls.length; i++) {
                uls[i].style.display = "none";
            }
        }
    };
}