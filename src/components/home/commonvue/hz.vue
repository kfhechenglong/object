<template>
  <div class="hz">
		<dl>
			<div class="clearfix">
				<dt>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;频率：
				</dt>
				<dd>
					<el-button-group>
						<el-button size="large" ref="aa" :class="{active : 'standard'== isActive}" @click="toggleClass('standard')">标准</el-button>
						<el-button size="large" :class="{active : 'expand'== isActive}" @click="toggleClass('expand')">拓展</el-button>
						<el-button size="large" :class="{active : 'exquisite'== isActive}" @click="toggleClass('exquisite')">精细</el-button>
					</el-button-group>
				</dd>
			</div>
			<dt style="marginTop:25px">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HZ：
			</dt>
			<dd style="float:none" class="check">
				<el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
				    	<el-checkbox v-for="(item,val) in hzlist" :label="val" :key="item"></el-checkbox>
				</el-checkbox-group>
			</dd>
		</dl>
  </div>
</template>
<script>
// 标准频率
const standard = ['500','1000','2000','4000'];
// 拓展频率
const expand = ['3000','5000','6000','9000'];
// 精细频率
const exquisite = ['125','250','500','750','1000','1500','2000','3000','4000','5000','6000','8000','9000'];
// var maxDb = ['70','80','85','85','90','90','90','90','90','90','85','80','75'];
import {mapState} from 'vuex'
export default {
 	data(){
 		return {
        	isActive : "standard",
        	hertz:exquisite,
        	checkList: standard
 		}
 	},
 	// 接收父组件传过来的数据
 	props:{
 	},
 	created(){
 		// 获取点击返回按钮的参数
 		if(this.$route.query && this.$route.query['isEar']){
 			// this.checkList = this.$route.query['data'];
 			const data_obj = this.$route.query['data'];
 			this.checkList = Utils.getCheckHz(JSON.parse(data_obj));
 			this.isCheck(this.checkList);
 		}
 		this.$nextTick(function(){
 			this.toRotuer();
 		});
 	},
 	computed:{
 		...mapState(['hz','zhutingData']),
 		hzlist(){
 			// debugger obj = {'isfinish':0,'isneed':0,'order':13,'data':{},'result':{'systemvalue':{},'user_defined':{}},'db':0},
 			const hz = this.hz && Object.keys(this.hz).length !== 0 ? this.hz : this.hertz,
 				len = hz.length,
 				setobj = {};
 			hz.forEach((item,index) =>{
 				const data_obj = new Utils.earDataDetailClass();
 				if(item == 125 ){//指定优先级
 					data_obj.order = 2;
 				}else if(item == 250 ){
 					data_obj.order = 1;
 				}else{data_obj.order = len - index + 2;}
 				data_obj.db = this.zhutingData ? this.zhutingData[item] : null;
 				setobj[item] = data_obj;
 			});
 			return setobj;
 		},
 	},
 	watch:{
 		
 	},
 	methods:{
 		
 		handleCheckedCitiesChange(value) {
	        let checkedCount = value.length;
	        this.isCheck(value);
	        this.toRotuer();
	    },
	    toggleClass(res){
	    	this.isActive = res;
	    	switch (res){
                case 'standard':
                this.checkList = standard;
                break;
                case 'expand':
                this.checkList = expand;
                break;
                case 'exquisite':
                this.checkList = exquisite;
                break;
            }
            this.isCheck(this.checkList);
            this.toRotuer();
	    },
	    // 广播消息
	    toRotuer(){
	    	// this.$emit('checkedHz',this.checkList,this.cIndex(this.checkList,this.zhutingData,exquisite));
	    	this.$emit('checkedHz',Utils.getObj(this.hzlist,this.checkList));
	    },
	    // 获取强度
	    cIndex(arr1,arr2,str){
	    	console.log(arr2)
	    	var newArr = [];
	    	var arr = [];
	    	for (var i = 0; i < arr1.length; i++) {
	    		arr1[i]
	    		for (var j = 0; j < str.length; j++) {
	    			if(str[j] == arr1[i]){
	    				newArr.push(arr2[str[j]]);
	    			}
	    		}
	    	}
	    	return newArr;
	    },
	    //判断频率的选择内容
	    isCheck(array){
	    	// 定义数组排序
	    	function sumSort(a,b){
	    		return a-b;
	    	};
	    	array.sort(sumSort);
	    	// 数据过滤筛选赫兹小于500的后测试
	    	let lessarray = array.filter((item) =>{
	    		return item < 500
	    	});
	    	let greaterarray = array.filter((item) =>{
	    		return item >= 500
	    	});
	    	// console.log(lessarray,greaterarray)
	    	// 判断两个数组是否完全一样
	    	if(array.toString() == standard.toString()){
	    		this.isActive = 'standard';
	    	} else if(array.toString() == expand.toString()){
	    		this.isActive = 'expand';
	    	} else if(array.toString() == exquisite.toString()){
	    		this.isActive = 'exquisite';
	    	} else{
	    		this.isActive = 'hah';
	    	}
	    	// 将分好的数据重新连接
	    	this.checkList = greaterarray.concat(lessarray.reverse());
	    	// console.log(this.checkList)
	    	return greaterarray.concat(lessarray)
	    },
 	}
}
</script>
<style lang ="less" >
	.hz{
		dl{
				margin-top:35px;
			}
			dt,dd{
				float: left;
			}
			dt{
				font-size: 18px;
				color:#3377b8;
			}
			dd{
				.active{
					background-color: #13ce66;
					color:#fff;
				}
			}
			.check{
				margin-left: 115px;
				margin-top: 20px;
			}
	}
</style>
