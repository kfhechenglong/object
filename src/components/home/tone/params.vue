<template>
  <div class="tone-params">
		<div class="title clearfix">
			<h3 class="fl">参数设置-{{testname}}</h3>	
			<span class="fr"><i class="fa fa-question-circle"></i></span>
		</div>
		<div class="params-main">
			<dl class="clearfix">
				<dt style="line-height:40px;">
					&nbsp;&nbsp;&nbsp;测试耳：
				</dt>
				<dd class="checkradio">
				    <el-radio-group v-model="radioEar" size="large">
				    	<el-radio-button label="A">双</el-radio-button>
					    <el-radio-button label="R">右</el-radio-button>
					    <el-radio-button label="L">左</el-radio-button>
					</el-radio-group>
				</dd>
			</dl>
			<dl class="clearfix">
				<dt>
					选择词组：
				</dt>
				<dd style="min-height:100px;">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
					<el-checkbox :disabled="!checkAll && !isIndeterminate" v-model="checked" @change="handleCheckNoChange">取消</el-checkbox>
					<div style="margin-top:10px">
						<el-checkbox-group v-model="check" @change="handleCheckedChange">
							<ul class="clearfix">
								<li v-for="(item,index) in group" class="fl height-35 b-radius5">
									<el-checkbox @change.native="checkedList(index)" :label="JSON.stringify(item)" :key="index" v-if="item"></el-checkbox>
									<div class="check-main clearfix" @click="chengedLabel(index,item,$event)">
										<span class="fl fz16">
											<i v-if="item">{{item["group"]}}</i>
										</span>
										<div class="clearfix fl" v-if="item">
											<p class="fl fz16" v-for = "(val,index) in item['children'].split(',')">
												<em >{{val}}</em>
											</p>
										</div>
									</div>
								</li>
							</ul>
						</el-checkbox-group>
					</div>
				</dd>
				
			</dl>
			<!-- 游戏选择组件 -->
			<gameType :ActiveContent = "currentGameType" v-on:active = "currentActive"></gameType>
		</div>
		<div>
			<buttongroup :paramData= "checkdata"></buttongroup>
		</div>
  </div>
</template>
<script>
function sumSort(a,b){
	return a-b;
};
import util from '../../../common/util.js'
import Buttongroup from '../commonvue/butotn'
import GameType from '../commonvue/gameType.vue'
export default {
	name:'liu',
	components:{
		Buttongroup,
		GameType
	},
 	data(){
 		return {
 			currentGameType:0,
 			// 游戏测试名称
 			testname:'',
 			// 测试的数据
 			testgroup:'',
 			Active : "eggFrenzy",
 			wsData : 'a',
 			leixing :'zhuan',
 			radioEar:'A',
			doubleEar:'',
			checked:false,
			group:[],
			groupAll:[],
			check:[],
			checkAll: true,
			isIndeterminate: false,
			// 当前被选中的词组序号,默认选中全部
			current:[],
			// 排序后的词组
			groupSort:[],
			level:0
 		}
 	},
 	created(){
 		// 获取点击返回按钮的参数
 		if(this.$route.query && this.$route.query['isEar']){
 			this.radioEar = this.$route.query['isEar'];
 		}
 		// 获取测试类型
 		var gametest = {'id':sessionStorage.getItem('test_id')};
 		// var gametest = {'id':2};
 		// let that = this;
 		this.$ajax.post(`/assess/getGroups`,gametest).then((response)=>{
 			if(response.code == 200){
				this.testname = response.data['name'];
	 			this.testgroup = response.data.data;
	 			// 生成排序列表
	 			// console.log(response.data)
	 			this.testgroup.forEach((val,index) =>{
	 				this.current.push(index);
	 			});
	 			this.arr();
	 			// 获取点击返回按钮的参数
		 		if(this.$route.query && this.$route.query['isEar']){
		 			this.check = this.$route.query['data'];
		 			this.groupSort = this.$route.query['data'];
		 		}
 			}else{
 				msgTipsErr(that,'请求出现异常！')
 			}
 		}).catch(function(error){
 			console.log(error)
 		});
 	},
  	mounted(){
 		var that = this;
 		Vm.$on('wsmsg',(msg)=>{
 			that.wsData = msg;
 		});
 	},
 	watch:{
		wsData:function(){
			// console.log(this.wsData);
			// console.log(this.wsData.params);
		}
 	},
 	computed:{
		 setDataModel:function(){
			 let arr = this.groupSort;
			 let arrtemp = [];
			arr.forEach(item =>{
				arrtemp.push({
					isneed:1,
					isfinsih:0,
					result:{},
					data:item
				})
			})
			return arrtemp;
		},
 		checkdata:function(){
 			return{
				'data':this.groupSort,
				'isEar':this.radioEar,
				'crtgame':this.Active,
				'level':this.level,
				'gamesPath' : this.gamesPath,
			}
		 },
		
 	},
 	methods:{
 		// 操作数组
 		arr(){
 			var abs = this.testgroup;
 			
 			var arrlist = [];
 			var str = [];
 			abs.forEach(function(value,index){
 				arrlist.push(value);
 				str.push(JSON.stringify(value))
 				// // 组合字符串进行选择使用
 				// str.push(value['id']+','+ value['vpath']+','+ value['children']);
 			});
 			this.groupAll = str;
 			// if(abs.length < 8){
 			// 	var dval = 8-abs.length;
				// for (var i = 0; i < dval; i++) {
				//  		abs.push('');
				// }
 			// }
 			// 默认全选
 			this.check = str.concat();
 			// 默认全选
 			this.groupSort  = str;
 			this.group = abs;
 		},
 		// 单选按钮
 		handleCheckedChange(value) {
	        let checkedCount = value.length;
	        // console.log(this.check)
	        // 控制取消按钮
	        checkedCount.length > 0 ? this.checked = true: this.checked = false;
	        // 控制全选按钮
	        this.checkAll = checkedCount === this.groupAll.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.groupAll.length;
	    },
	    chengedLabel(index,item,e){
	    	this._sort_index(index);
	    	if(!e.currentTarget.parentNode.childNodes[0].hasChildNodes())return;
	    	let input = e.currentTarget.parentNode.childNodes[0].childNodes[0].childNodes[1];
	    	let checked = this.check;
	    	util.arrayRemove();
	    	if(checked.indexOf(input.value) >=0){
	    		checked.remove(input.value)
	    	}else{
	    		checked.push(input.value)
	    	};
	    	// 控制全选按钮
	    	this.checkAll = checked.length === this.groupAll.length;
	        this.isIndeterminate = checked.length > 0 && checked.length < this.groupAll.length;
	        // 选择排序
	    	let item_id= []
	    	checked.forEach((item,index) =>{
	    		let id = JSON.parse(item).id;
	    		item_id.push(id);
	    	});
	    	item_id.sort(sumSort);
	    	let last_check = [];
    		item_id.forEach((val) =>{
    			(this.groupAll).forEach((item,index) =>{
	    			if(JSON.parse(item).id === val){
		    			last_check.push(item);
		    		}
	    		});
	    	});
	    	this.groupSort = last_check;
	    },
	    _sort_index(str){
	    	this.current.push(str)
	    	// 如果数组的元素重复的则删除该元素,调用数组去重的方法
	    	util.arrayRemove();
			this.current.removeunique();
			// 对数组进行排序   
	    	this.current.sort(sumSort);
	    },
	    // 当前选中的项
	    checkedList(str){
	    	this._sort_index(str);
	    	// 获取对应的词组列表
	    	var groupSort = [];
	    	for (var i = 0; i < this.current.length; i++) {
	    		groupSort.push(this.groupAll[this.current[i]])
	    	}
	    	this.groupSort = groupSort;
	    },
	    // 全选按钮
	    handleCheckAllChange(event) {
	        this.check = event.target.checked ? this.groupAll.concat() : [];
	        this.isIndeterminate = false;
	        this.checked = false;
	        // 当为全不选时，清空选择序列表
	        if(!event.target.checked){
	        	this.current.length = 0;
	        }
	        // 全选时的传参
	        this.groupSort = this.check;
	    }, 
	    // 取消按钮
	    handleCheckNoChange(){
	    	// 清空选项
	    	this.groupSort = [];
	    	this.check = [];
	    	this.current.length = 0;
	    	this.checkAll = false;
	    	this.isIndeterminate = false;
	    },
 		// 接收子组件的游戏选择类型
	 	currentActive(str){
	 		// console.log(str)
	 		this.Active = str.active;
			 this.level = str.level;
			 this.gamesPath = str.gamesPath;
	 	}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less">
@bgc:#13ce66;
	.tone-params{
		width: 1150px;
		height: 700px;
		margin:0px auto ;margin-top: 60px;
		background-color: #fff;
		border:8px solid #5f9970;
		.title{
			border-bottom:3px solid #5b9b69;
			margin:0px 20px;
			h3{
				font-weight: 500;
				margin:0px;
				line-height: 50px;
				font-size: 25px;
			}
			span{
				line-height: 50px;
    			font-size: 28px;
    			color:#5f9770;
    			i{
    				cursor: pointer;
    			}
			}
		}
		.el-checkbox{
			width: 45px;
    		text-align: center;
    		.el-checkbox__label{
				display: block;
    		}
		}
		.params-main {
			padding-left: 50px;
			/*单选按钮开始*/
			.checkradio{
				.el-radio-button__orig-radio:checked+.el-radio-button__inner{
					background-color:@bgc;
					border:1px solid @bgc;
					box-shadow: -1px 0 0 0 @bgc;
				}
			}
			ul{
				width: 850px;
			}
			ul li{
				width: 400px;
				position: relative;
				border:1px solid #ccc;
				margin:5px 0px 5px 0px;
				&:nth-child(2n-1){
					margin:5px 30px 5px 0px;
				}
				.check-main{
					position: absolute;
					left:0px;
					top:0px;
					width: 100%;
					span{
						border-radius:5px 0 0 5px;
						background-color: @bgc;
						width: 80px;
						color: #fff;
						font-weight: 600;
						text-indent: 40px;
						height: 35px;
					}
					p{
						em{
							float: left;
							margin-left: 10px;
						}
					}
				}
				.el-checkbox__label{
					visibility: hidden;
				}
			}
			/*单选按钮结束*/
			dt,dd{
				float: left;
			}
			dt{
				font-size: 18px;
				color:#3377b8;
			}
			.check{
				margin-left: 115px;
				margin-top: 20px;
			}
		}
	}
</style>
