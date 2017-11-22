<template>
	<div class="main-title clearfix">
        <div class="main-t-l fl">
          <h2>档案管理</h2>
          <div></div>
        </div>
        <div class="main-t-r fr">
          <a href="#nada" class="button button-inline button-large button-warning"><i class="el-icon-close"></i><span> &nbsp;返回主页</span></a>
        </div>
    </div>
</template>
<script>
export default{
	data(){
		return{
		}
	},
	created(){
	},
	methods:{

	}
}
</script>
<style lang ="less">
	/****内容顶部样式****/ 
  .main-title{
    .main-t-l{
      width:305px;
      height:50px;
      position: relative;
      h2{
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        z-index: 100;
        color:#fff;
      }
      div{
        width:196px;
        position: absolute;
        height:0px;
        left:0px;
        top:0px;
        border-left: 50px solid transparent;
        border-bottom:50px solid #2e9872;
        border-right:50px solid transparent;
      }
    }
    /*****返回主页按钮******/ 
    .main-t-r{
    	a{
    		text-decoration: none;
    	}
      /*margin-right: 24px;*/
      .button {
        display: block;
        text-align: center;
        cursor: pointer;
        border: none;
        transition-property: background-color;
        transition-duration: 0.2s;
        transition-timing-function: linear;
        background: #2e9872;
        color: #222;
      }
      .button-large {
        height: 45px;
        padding: 0 18px;
        border-radius: 6px;
        box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.15);
        font-size: 22px;
        line-height: 40px;
      }
      .button-large i {
        line-height: 40px;
      }
      .button-large:active,
      .button-large:active i {
        line-height: 50px;
      }
      .button.button-warning {
        background: #2e9872;
        color: #fafafa;
      }
      .button.button-warning:hover,
      .button.button-warning:focus {
        background: #f9960a;
        color: #fafafa;
      }
      .button-large.button-warning{
        box-shadow: inset 0 -4px 0 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>