<template>
	<div class="copy">
        <div class="pull-right"><i class="fa fa-copyright"></i> 2014-2015 
        	<a href="#">北京诺信畅听科技有限公司</a>
        </div>
      </div>
</template>
<script>
export default{
	data(){
		return{
		}
	},
	methods:{
		
	}
}
</script>
<style lang ="less" scoped>
@color:#9fa19f;
.copy{
    background: none repeat scroll 0 0 #fff;
      border-top: 1px solid #e7eaec;
      overflow: hidden;color:@color;
      padding: 11px 20px;
     /*margin: 0 -15px;*/
      height: 36px;
      font-size: 14px;
      a{
      	line-height: 36px;
        color:@color;
        text-decoration:none;
      }
  }
	
</style>