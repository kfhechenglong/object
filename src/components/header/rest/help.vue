<template>
  	<div class="help">
	  	<el-dialog title="系统操作说明" v-model="dialogHelpVisible">
		<div class="help-content clearfix">
			<div class="fl list">
				<h3><a href="JavaScript:;">目录</a></h3>
				<dl id="h-list">
					<dt @click="active">
						<a href="#001">系统登录</a>
					</dt>
					<dt @click="active">
						<a href="#002">声场校准</a>
					</dt>
					<dt @click="active($event,'show1')">
						<a href="#004">设置</a><i class="el-icon-caret-bottom"></i>
					</dt>
					<el-collapse-transition>
					<div v-show="show1 === current_active">
						<dd @click="dd_active">
							<a href="#004-1">用户管理</a>
						</dd>
						<dd @click="dd_active">
							<a href="#004-2">机构设置</a>
						</dd>
						<dd @click="dd_active">
							<a href="JavaScript:;">班级设置</a>
						</dd>
						<dd @click="dd_active">
							<a href="JavaScript:;">班主任管理</a>
						</dd>
					</div>
					</el-collapse-transition>
					<dt @click="active">
						<a href="#003">关闭系统</a>
					</dt>
					<dt @click="active($event,'show2')">
						<a href="#004">设置</a><i class="el-icon-caret-bottom"></i>
					</dt>
					<el-collapse-transition>
					<div v-show="show2 === current_active">
						<dd @click="dd_active">
							<a href="#004-1">用户管理</a>
						</dd>
						<dd @click="dd_active">
							<a href="#004-2">机构设置</a>
						</dd>
						<dd @click="dd_active">
							<a href="JavaScript:;">班级设置</a>
						</dd>
						<dd @click="dd_active">
							<a href="JavaScript:;">班主任管理</a>
						</dd>
					</div>
					</el-collapse-transition>
				</dl>
			</div>
			<section class="fl">
				<p>这是系统登录</p>
				<article>
					<a name="001">登录系统</a>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					<a name="004">设置</a><br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					<a name="004-1">用户管理</a><br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					<a name="004-2">机构设置</a><br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					<a name="002">声场校准</a><br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					<a name="003">关闭系统</a>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
					这是说明文档内容<br>
				</article>
			</section>
		</div>
	</el-dialog>
  	</div>
</template>
<script>
export default {
  	data(){
  		return {
  			dialogHelpVisible:false,
  			show1:"show1",
  			show2:"show2",
  			current_active:""
  		}
  	},
  	methods:{
  		show(){
  			this.dialogHelpVisible = true;
  		},
  		active(e,id) {
  		 	const dts = jq('#h-list').getElementsByTagName('dt');
  		 	for (let i = 0; i < dts.length; i++) {
  		 		dts[i].className = "";
  		 	}
  		 	const dds = jq('#h-list').getElementsByTagName('dd');
  		 	for (let i = 0; i < dds.length; i++) {
  		 		dds[i].className = "";
  		 	}
  		 	const cur_dt = e.currentTarget;
  		 	cur_dt.className = "on";
  		 	// 判断该节点是否有子节点，若有子节点，则点击该节点显示或关闭子节点
  		 	if(this.current_active === id){//如果该节点已经展开，则点击关闭
  		 		this.current_active = "";
  		 	}else{
  		 		this.current_active = id;
  		 	}
  		 	// 获取当前的图标
  		 	const ele_i = cur_dt.getElementsByTagName('i')[0];
  		 	if(ele_i){//当前节点有子节点
  		 		const i_className = ele_i.className;
  		 		if(i_className.indexOf('ion') < 0){
  		 			ele_i.className = "el-icon-caret-bottom ion";
  		 		}else{
  		 			ele_i.className = "el-icon-caret-bottom no-i"
  		 		}
  		 	}else{//当前节点无子节点
  		 		const on_i = jq('#h-list').getElementsByClassName('ion')[0];
	  		 	if(on_i){
	  		 		on_i.className = "el-icon-caret-bottom no-i";
	  		 	}
  		 	}
  		 	
	     },
	     dd_active(e){
	     	const dds = jq('#h-list').getElementsByTagName('dd');
  		 	for (let i = 0; i < dds.length; i++) {
  		 		dds[i].className = "";
  		 	}
  		 	const dts = jq('#h-list').getElementsByTagName('dt');
  		 	for (let i = 0; i < dts.length; i++) {
  		 		dts[i].className = "";
  		 	}
  		 	const cur_dt = e.currentTarget;
  		 	cur_dt.className = "on"
	     },
  	}
}
</script>

<style scoped lang ="less">
	.help{
		h3 a{
			font-size: 22px;
			letter-spacing: 3px;
			color:#000;
			padding-left: 1em;
		}
		.help-content{width: 100%;color:#000;}
		.list{
			width: 25%;
			font-size: 18px;
			margin-right:20px;
			dl{
				max-height: 400px;
				overflow: auto;
			}
			dt,dd{
				margin:5px 0;
				line-height: 40px;
				padding: 0;
				padding-left: 1em;
				/*cursor: pointer;*/
				a{
					display: block;
					text-decoration: none;
					color:#000;
				}
			}
			dt{position: relative;}
			dt i{
				position: absolute;
				left: 130px;
				top:10px;
			}
			/*图标旋转*/
			.ion{
				animation: i-rotate 0.3s;
				transform: rotate(180deg);
			}
			@keyframes i-rotate {
			  0% {
			    transform: rotate(0deg);
			  }
			  60% {
			    transform: rotate(90deg);
			  }
			  100% {
			    transform: rotate(180deg);
			  }
			}
			.no-i{
				animation: i-no-rotate 0.3s;
				transform: rotate(0deg);
			}
			@keyframes i-no-rotate {
			  0% {
			    transform: rotate(180deg);
			  }
			  60% {
			    transform: rotate(90deg);
			  }
			  100% {
			    transform: rotate(0deg);
			  }
			}
			dd{
				font-size: 16px;
				margin-left: 1em;
			}
			.on{background-color: #ccc;}
		}
		section{
			width: 70%;
			p{
				font-size: 20px;
				margin:10px 0;
			}
			article{
				max-height: 400px;
				overflow: auto;
				font-size: 16px;
			}
		}
	}
</style>
