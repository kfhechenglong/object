<template>
  <div class="result">
		<el-dialog title="测评结果"  v-model="dialogTableVisible" :close-on-press-escape = "false" :close-on-click-modal="false" class="res-dialog">
			<div class="table clearfix">
			<!-- 查看报告 -->
				<div class="tabletest" v-show="'test' == tabs" style="height:649px;">
					<div v-show = "!test">
						<div v-if="!hasData" class="tips">
								暂无数据！
						</div>
						<div v-for="( val,num) in testData">
							<div :id="('main-table-'+val.ear)" :class="[testData.length === 2?'':'marginleft','fl']">
								<h3>{{val.ear=="A" ? "双耳":(val.ear == "L" ?'左耳':'右耳')}}</h3>
								<ul>
									<li v-for="(item,index) in trueLine">{{item}}</li>
								</ul>
								<div class="warp lf">
									<table :id="(val.ear+'header')">
										<tr>
											<th v-for="(item1,index) in hz">{{item1}}</th>
										</tr>
									</table>
									<table :id="val.ear">
										<tr>
											<th  v-for="(item,index) in hz.length*2">{{item % 2 != 0?"(√":"×)"}}</th>
										</tr>
										<tr v-for="( tit,indexTr) in trueLine">
											<td v-for="(item,indexTd) in hz.length*2">
												<span v-if="val.dataDetail[hz[Math.floor(indexTd/2)]]&& val.dataDetail[hz[Math.floor(indexTd/2)]].data[tit]">
													<span v-if="indexTd%2==0"  :class="[ (val.dataDetail[hz[Math.floor(indexTd/2)]].data[tit]['true']) == '3'? 'bgcspan' :'','spanborder']">
														{{val.dataDetail[hz[Math.floor(indexTd/2)]].data[tit]["true"]}}
													</span>
													<span v-if=" indexTd%2==1" :class="[ (val.dataDetail[hz[Math.floor(indexTd/2)]].data[tit]['true']) == '3'? 'bgcspan' :'']">
														{{val.dataDetail[hz[Math.floor(indexTd/2)]].data[tit]["false"]}}
													</span>
													
												</span>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div v-show = "test" style="">
						<div style="width: 90%;margin:0 auto;">
							<ele-addAudio :hz="checkhz" :resultData="stringData" ref="addAudio" v-on:plivate = "plivateData" :tonetype="tonetype" @hidden="_bigSvg">
							</ele-addAudio>
						</div>
					</div>
				</div>
			</div>
			<div class="result-btn" v-if="showBtn">
				<!-- <div v-if="showBtn" class="fl"> -->
					<el-button type="primary" size="large" @click="tabShow('ting')"><i class="iconfont icon-tubiaozhexiantu"></i>听力图</el-button>
					<el-button type="primary" size="large" @click="tabShow('test')"><i class="iconfont icon-jilu"></i>测试记录</el-button>
					<el-button type="primary" size="large" @click="printReport()"><i class="iconfont icon-iconfontdayinji"></i>打印报告</el-button>
					<el-button type="primary" size="large" @click="uploadReport()"><i class="iconfont icon-download-copy"></i>下载报告</el-button>
					<el-button type="primary" size="large" @click="save()">
						<i class="iconfont icon-baocun"></i>存档
					</el-button>
				<!-- </div> -->
				<div class="go-back fr">
					<ele-backbtn :flag="flag"></ele-backbtn>
				</div>
			</div>
			<div class="print" v-if="showPrint" >
		        <div id="print-tone" :class="{'visibility':hidden}">
		            <div id="print-warp">
		                <div class="fiexd-w">
		                    <div class="print-warp">
		                        <div class="print-tone clearfix" id="toimg">
		                            <print ref="print" ></print>
		                        </div>
		                    </div> 
		                    <!-- 打印及关闭按钮 -->
		                    <printButton :show="false" @close="closePrint"></printButton>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div v-if="showQQVisible">
		        <codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
		    </div>
		</el-dialog>
  </div>
</template>
<script>
import {mapState,mapMutations} from'vuex'
import addAudio from'./addAudio'
import util from 'common/util.js'
import report from'./report'
import Backbtn from'../commonvue/go-backBtn.vue'
import codeQQ from'../commonvue/codeQQ/codeQQ.vue'
import Print from'../zuting/report.vue'
import printButton from'../commonvue/print/print-button.vue'
export default {
	components:{
		'ele-addAudio':addAudio,
		'ele-report': report,
		'ele-backbtn' : Backbtn,
		 codeQQ,
        Print,
        printButton
	},
 	data(){
 		return {
	        dialogTableVisible: false,
	        tabs:'test',
	        userid:'',
	        exquisite :'',
	        test:true,
	        report: true,
	        stringData:'',
	        testData:{},
	        timer:null,
	        plivate:'',
	        showBtn:true,
	        time:null,
	        hidden:false,
	        showQQVisible:false,
	        showPrint:false,//打印
	        flag:true
 		}
 	},
 	// 接收父组件传过来的数据
 	props:{
 		checkhz:Array,
 		trueLine:Array,
 		line:Array,
 		statisticsInfo:null,
 		getServer:Array,
 		tonetype:String,
 		ear:String,
 		checkDataArray:{
 			type:Array,
 			default:function(){
 				return [];
 			}
 		}
 	},
 	mounted(){
 		this.$nextTick(() =>{
 			// 保存测试耳信息
			const radioEar = ((str)=>{
	 			switch(str){
	 				case 'A':
	 				return '双耳同时';
	 				case 'RL':
	 				return '先右后左';
	 				case 'LR':
	 				return '先左后右';
	 				case 'R':
	 				return '仅测右耳';
	 				case 'L':
	 				return '仅测左耳';
	 				default:'-'
	 			}
	 		})(this.ear);
	 		const obj = {
	 			'testmodel':'游戏训练',
	    		'getmodel':'自由给声',
	    		'radioEar':radioEar,
	 		}
	 		this.$store.commit('hasCanvasData',{});
	 		this.$store.commit('hasTestCanvasData',obj);
 		})
 	},
 	computed:{
	    codeInfo:function(){//生成二维码的信息
            return {'time':this.time,'type':null,'user_id':+JSON.parse(sessionStorage.getItem('user_id')),'file':'ceshi','id':null}
        },
 		// 判断测试记录是否有数据
 		hasData:function(){
 			// let test_Data = this.statisticsInfo;
 			let test_Data = this.checkDataArray;
 			let isTrue = false;
 			try{
	 			test_Data.forEach(ele =>{
	 				const detail = ele.dataDetail;
	 				for(let i in detail){
	 					if(detail[i].isfinish == 1){
	 						isTrue = true;
	 						break;
	 					}
	 				}
	 			})
	 		} catch(err){
	 			throw err;
	 		}
 			return isTrue;
 		},
 		...mapState(['canvasMarks','IP','hz'])
 	},
 	destroyed(){//组件销毁时，清空时间
 		this.time = null;
 		this.$store.commit('getter_code_time',null);
 	},
 	methods:{
 		_bigSvg(e){//编辑数据时，隐藏按钮
 			this.showBtn = e;
 		},
 		_closeCodeQQ(e){//下载按钮，二维码关闭时的函数
          this.showPrint = e;
          this.showQQVisible = false;
          this.hidden = e;
          // this.$store.commit('getter_code_time','');
        },
        closePrint(e){//接收关闭信息
          this.showPrint = e;
          
        },
        printReport(){
        	this.showPrint = true;
        	setTimeout(()=>{//将听力图保存成图片格式
                this.$refs.print.createdPng();
            });
        },
        uploadReport(){
        	this.showPrint = true;
        	this.hidden = true;
        	setTimeout(()=>{
        		this.$refs.print.createdPng();
 				this.$refs.print._lookPng();
 				setTimeout(()=>{
	 				this.showQQVisible = true;
	 				this.$nextTick(()=>{
	 					this.useqrcode();
	 				})
	 			},100)
        	})
        },
 		useqrcode(){
 			const ip = sessionStorage.getItem('IP');
		    const data = 'time='+this.time+'&user_id='+JSON.parse(sessionStorage.getItem('user_id'))+'&file=ceshi&type='+null+'&id='+null;
	      	const base64 = util.toBase64(data);
		    const code = 'http://'+this.IP+':'+apiport+'/aamis/be/Public/'+'bg';
		    this.$refs.code.useqrcode(base64,code);
	    },
 		// 给addAudio 听力图添加点击事件
 		addClick(){
 			this.$refs.addAudio.addClick();
 		},
 		//打印
 		dayin(){
 			var message = this.$refs.report.returnHTML();
 			util.print('#print-warp',message);
 			return;
		},
 		show(){
 			// 将对象保存成字符串传递给子组件
 			this.stringData = JSON.stringify(this.getServer);
 			this.dialogTableVisible = true;
 			// 生成时间戳
 			this.time = parseInt(new Date().getTime());
 			this.$store.commit('getter_code_time',this.time);
 		},
 		plivateData(str){
 			this.plivate = str.addData;
 			console.log(str)
 		},
 		// 保存跳转功能
 		save(){
 			// 调用
 			this.$refs.addAudio.toParent();
			if((this.plivate[0] && this.plivate[0].data.length == 0)&&(this.plivate[1].data.length == 0)){
 				msgTipsErr(this,'请测试一组完整的数据用于保存！');
 				return;
 			}
			 	// 获取id
 			this.userid = sessionStorage.getItem('user_id');
 			const info = JSON.parse(sessionStorage.getItem('user_text'));
			const type_id = sessionStorage.getItem('test_id');
			const svgMarks = this.canvasMarks;
 			// 将数据保存到数据库
 			const originalData = {
 				"audio":{
 					"tonetype":this.tonetype === "zhuan" ?"啭音" :"纯音",
 					"user_id":JSON.parse(this.userid),
 					...info,
 					...svgMarks,
 				},
 				"headr":JSON.stringify(this.getServer),
 				"plivate":JSON.stringify(this.plivate),
 				"original":JSON.stringify(this.statisticsInfo)
 			};
 			console.log(originalData)
 			let that = this;
 			this.$ajax.post(`/audiogram/add`,originalData).then(function(response){
                // console.log(response)
                if(response.code == "200"){
                	// 关闭退出提醒
                	that.flag = false;
					msgTipsSuccess(that,'提交成功!');
					// 查询未测名单,将被测试的学生从未测名单中移除
					util.getLocalStorage(JSON.parse(that.userid),type_id);
                }else{
                	msgTipsErr(that,'提交失败!');
                }
            }).catch(function(error){
 				alert(error +'提交失败！');
            })
            // 返回游戏主页
            window.isToggle = false;
            const argument = this.wskt.gohome();
            websocket.send(JSON.stringify(argument));	
 		},
 		tabShow(res){
 			if(res == 'test'){
 				this.tabs = "test";
 				this.test = false;
 			}else{
 				this.tabs = "test";
 				this.test = true;
 			}
 			this.setStyle()
 		},
 		// 计算表格的宽和高
 		getStyle(params,str){
 			var table = null,
 				width = null,
 				cell = null,
 				cellHeight = null,
 				cellWidth =null,
 				tableHeader = null,
 				cellHeader = null,
 				height = null;
 				//获取表格的整体宽高
 			table = document.getElementById(params);
 			tableHeader = document.getElementById(str);
 			height = table.offsetHeight -70;
			width = table.offsetWidth -70;
			cellHeight = height/this.trueLine.length;
			cellWidth = width/(this.hz.length*2);
			// console.log(cellHeight,cellWidth);
			cell = table.getElementsByTagName('td');
			cellHeader = tableHeader.getElementsByTagName('th');
			for (var i = 0; i < cell.length; i++) {
				cell[i].style.height = cellHeight+'px';
				cell[i].style.width = cellWidth+'px';
			};
			for (var i = 0; i < cellHeader.length; i++) {
				// cellHeader[i].style.height = cellHeight*2+'px';
				cellHeader[i].style.width = cellWidth*2 -3+'px';
			}
 		},
 		setStyle(){
 			// this.testData = this.statisticsInfo;
 			this.testData = this.checkDataArray;
 			console.log(this.checkDataArray);
 			const testData = this.checkDataArray;
 			setTimeout(()=>{
 				testData.forEach(item =>{
	 				switch(item.ear){
	 					case 'A':
	 					this.getStyle('main-table-A','Aheader');
	 					break;
	 					case 'R':
	 					this.getStyle('main-table-R','Rheader');
	 					break;
	 					case 'L':
	 					this.getStyle('main-table-L','Lheader');
	 					break;

	 				}
	 			})
 			},0);
 			

 			// setTimeout(()=>{
 			// 	if(this.testData['left']){
 			// 		this.getStyle('main-table-left','leftheader');
 			// 	}
 			// 	if(this.testData['right']){
 			// 		this.getStyle('main-table-right','rightheader');
 			// 	}
 			// 	if(this.testData['all']){
 			// 		this.getStyle('main-table-all','allheader');
 			// 	}
 			// },0);
 		}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="less" >
@import "../../../common/style/css/icon.css";
	.result{
		#QR{
			float: right;
			width: 150px;
			margin: 20px 50px 0 0; 
		}
		.res-dialog >.el-dialog{
			width: 1200px;
			height: 708px;
			margin-bottom: 0;
		}
		.res-dialog >.el-dialog>.el-dialog__title{
			font-size:18;
			font-weight:600 ;
			margin-left: 30px;
		}
		.res-dialog >.el-dialog>.el-dialog__body{
			padding:5px 20px 14px 20px;
			overflow: auto;
			font-size: 12px;
			background: #fff;
		}
		.tips{
			color:#666;
			font-size: 30px;
			text-align: center;
			position: absolute;
		    left: 50%;
		    top: 50%;
		    transform: translate(-50%,-50%);
		}
		.table{
			#main-table-A,#main-table-R,#main-table-L{
				/*单个测听结果的样式*/
				&.marginleft{
					margin-left:25%;
					}
				h3{
					margin: 0px;
    				text-align: center;
    				/*color:red;*/
				}
				width: 46%;
				/*border:1px solid red;*/
				margin:10px;
				padding:10px;
				height: 512px;
				ul{	margin:0px;
					padding: 0px;
					float: left;
					width: 30px;
					text-align: center;
					margin-top:37px; 
					li{
						list-style: none;
    					line-height: 17px;
    					font-size: 15px;
    					font-weight: 400;
					}
				}
				#A,#L,#R{
					width: 94%;
					border-collapse: collapse;
					tr{
						th,td{
							box-sizing: border-box;
							padding:0px;
							border: 1px solid #ccc;
						}
						th{
							height: 15px;
						}
						td:nth-of-type(2n-1){
							border-right: 1px solid transparent;
						}
						td:nth-of-type(2n){
							border-left: 1px solid transparent;
						}
						span{
							text-align: center;
							width: 100%;
							display: block;
							
						}
						.spanborder{
							border-right: 1px solid #666;
						}
						.bgcspan{
							background-color: #66cc66;
							
						}
					}
				}
			}
			#main-table-A{
				h3{
					color:#000;
				}
				border:1px solid #000;
			}
			#main-table-L{
				h3{
					color:blue;
				}
				border:1px solid blue;
			}
			#main-table-R{
				h3{
					color:red;
				}
				border:1px solid red;
			}
		}
		.result-btn{
			text-align: center;
			margin-top:30px;
			margin-left:0;
			position: fixed;
		    bottom: 20px;
		    /*left: 50%;*/
		    /*transform: translate(25%);*/
			button{
				width: 130px;
				margin-left: 50px;
				letter-spacing: 2px;
			}
			.el-button--large{
				padding:10px 0px;
				font-size: 18px;
				i{font-size: 20px;margin-right: 5px;}
			}
			.el-button--primary{
				background-color: #25c6ca;
    			border-color: #25c6ca;}
			#back-btn .button-large{   
				height: 45px; 
				padding: 0 10px;
    			border-radius: 6px;
    			font-size: 20px;
    			line-height: 42px
    		}
			#back-btn .back{margin:0 0 0 70px;}
		}
		/********打印样式*********/ 
	    .print{
	    	.print-warp{
			    width:230mm;
			    height:190mm;
			    margin-left:150px;
			    background-color: #ccc;
			    overflow-y: auto;
			    position: fixed;
			    padding: 10px 0px;
			    top:0;
			    left:0;
			    bottom: 0;
			    right:0;
			    margin:auto;
			 }
	        .close{top:0;}
	        .affirm{top:45px;}
	        .visibility .print-warp{height: 150mm;}
	    }

	}
</style>
