<template>
	<div class="title clearfix">
		<h3 class="fl">参数设置-{{name}}</h3>	
		<span class="fr"><i class="fa fa-question-circle"></i></span>
	</div>
</template>
<script>
export default{
	data(){
		return{
			aaa:false
		}
	},
	props:{
		name:{
 			type:String,
 			default:"这是默认值"
 		}
	},
	created(){
	},
	methods:{

	}
}
</script>
<style lang ="less" scoped>
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
</style>