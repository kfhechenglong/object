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
// index.html?apihost=localhost:80&wshost=localhost:9002
// var base = ""
// if(window.location.port == 8080){
// 	base = '/api';
// 	// base = 'http://172.16.1.65/ghdev/index.php';
// }else{
// 	base = '/ghdev/index.php';
// }
// var base = 'http://172.16.2.165/gh/public/index.php';
// 账户登录
var base1 = 'http://'+apihost+':'+apiport+'/aamis/be/Public/info/baogao.php'
var codeUrl = 'http://'+apihost+':'+apiport+'/aamis/be/Public/info/qrcode.php'
export default {
	post :function(url,params) { 
		return axios.post(`${base}`+ url, qs.stringify(params),config).then(res => res.data)
	},
	post1 :function(url,params) { 
		return axios.post(`${base1}`+ url, qs.stringify(params),config).then(res => res.data); 
	},
	codePost :function(url,params) { 
		return axios.post(`${codeUrl}`+ url, qs.stringify(params),config).then(res => res.data); 
	}
}