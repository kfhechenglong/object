import axios from 'axios';
import qs from 'qs';

var config = {
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	responseType :'json',
	method:'post',
	timeout:5000,
	withCredentials:true
}
// axios.defaults.withCredentials = true;
// var base = ""


// if(window.location.port == 8080){
// 	base = '/api';
// 	// base = 'http://172.16.1.65/ghdev/index.php';
// 	// base = 'http://172.16.2.76/gh/public/index.php';
// }else{
// 	base = '/ghdev/index.php';
// }
// var base = 'http://172.16.2.165/gh/public/index.php';
// 账户登录
export const requestLogin = params => { 
	console.log(base)
	return axios.post(`${base}/index/login`, qs.stringify(params),config)
	.then(res => res.data)
	.catch((err) =>{
	    if(err){
	    	// console.log(err)
	     	alert(err);
	    }
    });
};
// 获取用户信息
export const getUserInfo = params => { 
	return axios.post(`${base}/index/info`, qs.stringify(params),config).then(res => res.data); 
};
// 获取个人信息
export const getoPeratorInfo = params => { 
	return axios.post(`${base}/operator/personal`, qs.stringify(params),config).then(res => res.data); 
};
// 修改个人密码
export const uppwd = params => { 
	return axios.post(`${base}/operator/updatepwd`, qs.stringify(params),config).then(res => res.data); 
};
// 获取操作员列表
export const operatorList = params => { 
	return axios.post(`${base}/operator/showlist`, qs.stringify(params),config).then(res => res.data); 
};
// 增加操作员
export const operatorAdd = params => { 
	return axios.post(`${base}/operator/add`, qs.stringify(params),config).then(res => res.data); 
};
// 删除操作员
export const operatorDelete = params => { 
	return axios.post(`${base}/operator/delete`, qs.stringify(params),config).then(res => res.data); 
};
// 获取机构信息
export const jgshow = params => { 
	return axios.post(`${base}/operator/jgshow`, qs.stringify(params),config).then(res => res.data); 
};
// 获取机构信息
export const jgupdate = params => { 
	return axios.post(`${base}/operator/jgupdate`, qs.stringify(params),config).then(res => res.data); 
};
// 获取用户学生信息
export const showList = params => { 
	return axios.post(`${base}/user/showlist`, qs.stringify(params),config).then(res => res.data); 
};
// 增加学生信息
export const addStudentInfo = params =>{
	return axios.post(`${base}/user/add`,qs.stringify(params),config)
};
// 删除学生信息
export const deleStudentInfo = params =>{
	return axios.post(`${base}/user/delete`,qs.stringify(params),config)
};
// // 显示学生基本信息
export const showStudentInfo = params =>{
	return axios.post(`${base}/user/info`,qs.stringify(params),config)
};
// 修改学生基本信息
export const updataStudentInfo = params =>{
	return axios.post(`${base}/user/update`,qs.stringify(params),config)
};
// 获取林氏六音数据
export const assess = params =>{
	return axios.post(`${base}/assess/add`,qs.stringify(params),config).then(res => res.data);
};
// 个性化听辨数据存储
export const personaladd = params =>{
	return axios.post(`${base}/voices/personaladd`,qs.stringify(params),config).then(res => res.data);
};

