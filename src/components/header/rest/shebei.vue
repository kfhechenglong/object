<template>
  	<div class="s-b-g">
		<el-dialog title="听力设备管理" v-model="dialogShebeiVisible" @close = "close">
			<div class="inner">
				<div class="dele">
					<el-button  icon="delete" @click="deleEle">删除</el-button>
					<el-button v-show="!dele"  @click="cancel">取消</el-button>
				</div>
				<ul class="clearfix">
					<li>
						<dl>
							<dt>
								产品
							</dt>
							<div>
								<dd :class="[productIndex === index ? 'active' :'']" v-for="(item,index) in product" @click="setChanPin(item,index)">{{item.key}}</dd>
							</div>
						</dl>
					</li>
					<li>
						<dl>
							<dt class="title" @click="open_1">
							<i class="el-icon-plus"></i>
								添加品牌
							</dt>
							<div>
								<dd :class="[setPinPaiIndex === index ? 'active' :'']" v-for="(item,index) in pinData" @click="setPinPai(item,index)">{{item.key}} <i :class="{showDele:dele}" class="el-icon-close" @click.stop="deletePinPai(item,index)"></i></dd>
							</div>
						</dl>
					</li>
					<li>
						<dl>
							<dt class="title" @click="open_2">
								<i class="el-icon-plus"></i>
								添加一级子类
							</dt>
							<div>
								<dd :class="[setXiLIndex === index ? 'active' :'']" v-for ="(item,index) in xiData" @click="setXiL(item,index)">{{item.key}}<i :class="{showDele:dele}" class="el-icon-close"  @click.stop="deleteXiL(item,index)"></i></dd>
							</div>
						</dl>
					</li>
					<li>
						<dl>
							<dt class="title" @click="open_3">
								<i class="el-icon-plus"></i>
								添加二级子类
							</dt>
							<div>
								<dd :class="[setXingIndex === index ? 'active' :'']" v-for ="(item,index) in xingData" @click="setXing(item,index)">{{item.key}}<i :class="{showDele:dele}" class="el-icon-close" @click.stop="deleteXingHao(item,index)"></i></dd>
							</div>
						</dl>
					</li>
				</ul>
			</div>
		</el-dialog>
  	</div>
</template>
<script>
import util from '../../../common/util.js'
export default {
	data(){
		return{
			dialogShebeiVisible:false,
			options:{},
			product:[],
			pinData:[],
			xiData:[],
			xingData:[],
			setXingIndex:0,
			setXiLIndex:0,
			setPinPaiIndex:0,
			productIndex:0,
			dele:true,
			add:true,
			// 父级的id
			productId:0,
			PinPaiId:0,
			XiLieId:0,
			XingHaoId:0,

		}
	},
	created(){
		this.getData(true,true,true);
	},
	mounted(){
	},
	methods:{
		close(){
			this.setXingIndex = 0;
			this.setXiLIndex = 0;
			this.setPinPaiIndex = 0;
			this.productIndex = 0;
			this.dele = true;
			this.add = true;
		},
		// 取消按钮
		cancel(){
			this.dele = true;
			this.add = true;
		},
		// 点击添加按钮
		addEle(){
			this.dele = true;
			this.add = false;
		},
		//添加品牌输入框
		open_1(){
	        this.opent_m("添加品牌",this.addPinPai);
		},
		opent_m(str,callback){
			this.dele = true;
			 this.$prompt('请输入您要添加的品牌！', str, {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          customClass:'add-name'
	        }).then(({ value }) => {
	        	callback(value);
	        }).catch(() => {
	            
	        });
		},
		addPinPai(val){//添加品牌
			if(val){
				let params = {"parent_id":this.productId,"name":val};
				this.addApp(params,success);
				function success(pointer){
					pointer.setPinPaiIndex = pointer.pinData.length;
					pointer.next(undefined,undefined,undefined);
					// 新添加的品牌，其系列、型号为空值；
					pointer.xingData = [];
					pointer.xiData = [];
					// 获取当前品牌的id值
					let pinData = pointer.pinData;
					pointer.PinPaiId = pinData[pinData.length-1]['id'];
				}
			}else{
				msgTipsErr(this,'请输入品牌名！');
			}
		},
		open_2(){
			this.opent_m("添加一级子类",this.addXiLie);
		},
		addXiLie(val){//添加一级子类
			if(val){
				// let currentData = this.options[this.productIndex][this.setPinPaiIndex];
				let currenPin = this.pinData[this.setPinPaiIndex];
				// 判断品牌是否为空？
				if(currenPin){
					let params = {"parent_id":currenPin.id,"name":val};
					this.addApp(params,success);
					function success(pointer){
						// 选中当前新添加的系列
						pointer.setXiLIndex = pointer.xiData.length;
						pointer.next(true,undefined,undefined);	
						// 新添加的系列，其品牌为空值；
						pointer.xingData = [];
						// 获取添加型号时要发送的父Id
						let xiData = pointer.xiData;
						pointer.XiLieId = xiData[xiData.length-1]['id'];
					}
				}else{
					msgTipsErr(this,'请先新增品牌！')
				}
			}else{
				msgTipsErr(this,'请输入系列名！');

			}
		},
		open_3(){
			this.opent_m("添加二级子类",this.addXingHao);
		},
		addXingHao(val){//添加二级子类
			if(val){
				// 获取当前型号的系列名
				let currentXiLie = this.xiData[this.setXiLIndex];
				if(currentXiLie){
					let params = {"parent_id":currentXiLie.id,"name":val};
					this.addApp(params,success);
					function success(pointer){
						pointer.setXingIndex = pointer.xingData.length;	
						pointer.next(true,true,undefined);		
					}
				}else{
					msgTipsErr(this,'请先二级子类！');
				}
			}else{
				msgTipsErr(this,'请输入型号名！');
			}
		},
		// 添加接口
		addApp(params,fn){
			this.$ajax.post('/app/add',params).then((res)=>{
				if(res.code === 200){
					this.options = res.data;
					this.$store.commit('setProduct',this.options);
	                fn(this);
				}else{
					msgTipsErr(this,'添加失败！')
				}
			})
		},
		// 点击删除按钮，显示删除标识
		deleEle(){
			this.dele = false;
			this.add = true;
		},
		// 删除品牌
		deletePinPai(item,index){
			this.deleApp({id:item.id},showCurrnet);
			function showCurrnet(pointer){
				// 系列删除成功，先清空当前系列下的系列、品牌样式；
				pointer.pinData = [];
				pointer.xiData = [];
				pointer.xingData = [];
				pointer.setXingIndex = 0;
				pointer.setXiLIndex = 0;
				if(index >0){//如果当前点击删除的不是第一个元素，则删除后显示前一个元素
					pointer.setPinPaiIndex = index-1;
				}else{//如果当前删除的是第一个元素，则删除后显示后一个元素
					pointer.setPinPaiIndex = index;
				};
				pointer.next();
			};
		},
		//删除一级子类
		deleteXiL(item,index){
			this.deleApp({id:item.id},showCurrnet);
			function showCurrnet(pointer){
				// 系列删除成功，先清空当前系列下的品牌样式；
				pointer.xiData = [];//先清空所有系列
				pointer.xingData = [];
				pointer.setXingIndex = 0;
				if(index >0){//如果当前点击删除的不是第一个元素，则删除后显示前一个元素
					pointer.setXiLIndex = index-1;
				}else{//如果当前删除的是第一个元素，则删除后显示后一个元素
					pointer.setXiLIndex = index;
				};
				pointer.next();
			};
		},
		// 删除二级子类
		deleteXingHao(item,index){
			console.log(item,index);
			// 删除点击的型号
			this.deleApp({id:item.id},showCurrnet);
			function showCurrnet(pointer){
				pointer.next();
				if(index >0){//如果当前点击删除的不是第一个元素，则删除后显示前一个元素
					pointer.setXingIndex = index-1;
				}else{//如果当前删除的是第一个元素，则删除后显示后一个元素
					pointer.setXingIndex = index;
				};
			};

		},
		// 删除接口
		deleApp(params,fn){
			this.$ajax.post('/app/del',params).then((res)=>{
				if(res.code === 200){
					this.options = res.data;
					msgTipsSuccess(this,'删除成功！');
					this.$store.commit('setProduct',this.options);
					fn(this);
				}
			}).catch((err) =>{
				alert(err +'删除数据出错！')
			})
		},
		show(){
			this.dialogShebeiVisible = true;
		},
		setXing(item,index){//点击型号
			this.setXingIndex = index;
			this.XingHaoId = item.id;
		},
		setXiL(item,index){//点击系列
			this.setXiLIndex = index;
			this.XiLieId = item.id;
			//重置数据
			this.xingData = [];
			this.setXingIndex = 0;
			this.next(true,true,undefined);
		},
		setPinPai(item,index){//点击品牌
			this.setPinPaiIndex = index;
			this.PinPaiId = item.id;
			//重置数据
			this.xiData = [];
			this.xingData = [];
			this.setXingIndex = 0;
			this.setXiLIndex = 0;
			this.next(true,undefined,undefined);
		},
		setChanPin(item,index){//点击产品
			// debugger
			this.productIndex = index;
			this.productId = item.id;
			//重置数据
			this.pinData = [];
			this.xiData = [];
			this.xingData = [];
			this.setXingIndex = 0;
			this.setXiLIndex = 0;
			this.setPinPaiIndex = 0;
			// id清空
			this.PinPaiId = 0;
			this.XiLieId = 0;
			this.XingHaoId = 0;
			this.next();
		},
		getData(one,two){//当前的品牌
			this.$ajax.post('/app/showlist',null).then((res) =>{
	            // console.log(res.data)
	            if(res.code === 200){
	                this.options = res.data;
	                this.$store.commit('setProduct',this.options);
	                this.next();
					this.productId = this.product[0]['id'];
	            }else{
	                msgTipsErr(this,'获取产品出错！')
	            }
	        }).catch((err) =>{
	            alert(err +"获取产品出错！")
	        })
		},
		next(pin,xi,xing){
			let pinLeiData = this.options;
			let data = [];
			// 获取产品名
			for (let i = 0; i < pinLeiData.length; i++) {
				data.push({key:pinLeiData[i]['label'],id:pinLeiData[i]['value'],parent_id:pinLeiData[i]['parent_id']});
			}
			this.product = data;
			// 获取品牌名
			let pinData = pinLeiData[this.productIndex];
			let PinName = [];
			if(pinData['children']){
				let children = pinData['children'];
				for (let i = 0; i < children.length; i++) {
					PinName.push({key:children[i]['label'],id:children[i]['value'],parent_id:children[i]['parent_id']});
					// 获取系列名
					if(i === this.setPinPaiIndex && children[i]['children']){
						let xiData = children[i]['children'];
						let xiName = [];
						// debugger;
						for(let j = 0;j < xiData.length; j++){
							xiName.push({key:xiData[j]['label'],id:xiData[j]['value'],parent_id:xiData[j]['parent_id']});
							// 获取型号名
							if(j === this.setXiLIndex){
								if(xiData[j]['children']){
									let xinHaoData = xiData[j]['children'];
									let xinHaoName = [];
									for(let k = 0;k < xinHaoData.length; k++){
										xinHaoName.push({key:xinHaoData[k]['label'],id:xinHaoData[k]['value'],parent_id:xinHaoData[k]['parent_id']});
									}
									// 如果点击型号，则不执行
									if(typeof xing === 'undefined'){
										this.xingData = xinHaoName;
										this.XingHaoId = xinHaoData[0]['value'];
									}
								}else{
									this.xingData = [];
								}
							}
						}
						// 如果点击系列、型号则不执行
						if(typeof xi === 'undefined'){
							this.xiData = xiName;
							this.XiLieId = xiData[0]['value'];
						}
					}
				}
				// 如果点击品牌、系列、型号则不执行
				if(typeof pin === 'undefined'){
					this.pinData = PinName;
					this.PinPaiId = children[0]['value'];
				}
			}
		}
	}
}
</script>

<style lang ="less">
.add-name{
	border: 3px solid #109bff;
    border-radius: 15px !important;
    .el-message-box__header{
    	display: none;
    }
}
.s-b-g{
	.el-dialog{width: 800px;}
	.inner{
		.dele .el-button{
			font-size: 18px;
		}
		ul{
			li{
				float: left;
				width: 180px;
				margin:0 5px;
				padding:10px;
				color:#000;
				.el-input{
					margin-bottom: 5px;
				}
			}
			li:first-child{
				width: 100px;
				}
			dt{
				font-size: 20px;
				text-align: center;
				/*font-weight: 600;*/
				height: 40px;
				line-height: 40px;
				margin-bottom: 5px;

			}
			.title{
				background-color: #13ce66;
				border-radius: 3px;
				color:#fff;
				cursor: pointer;
				box-shadow: 3px 3px 2px rgba(0,0,0,0.2);
			}
			dl>div{	height: 250px;
					border:2px solid #ccc;
					overflow: auto;
					border-radius: 5px;
					padding-top: 5px;
				}
			dd{
				margin:0;
        		box-sizing:border-box;
				cursor: pointer;
				width: 100%;
				height: 40px;
				padding: 0 5px;
				font-size: 18px;
				line-height: 40px;
				margin:5px 0;
				position: relative;
				overflow: hidden;
    			text-overflow: ellipsis;
    			white-space: nowrap;
				i{
					position: absolute;
					right:0;
					top:0;
					color:red;
					width: 40px;
					height: 40px;
					text-align: center;
					line-height: 40px;
				}
				.showDele{
					display: none;
				}
			}
			.active{
				background-color: #209ffe;
				box-shadow: 2px 2px 1px #ccc;
				color: #fff;
			}
		}
	}
}
</style>
