<template>
 <div id="info_print" class=" print-tone">
    <h3>
    	{{organization.name}}
    </h3>
    <div class="i-p-main">
    	<h2>学生档案</h2>
    	<p class="in-time">时间：{{data.garten_time}}</p>
		<table border='0'cellspacing="0" cellpadding="0" style="border:0;">
			<tr class="table-header">
				<td colspan="6">|&nbsp;基本信息</td>
			</tr>
			<tr>
				<td colspan="2">
					<span>姓名：{{data.user_name}}</span>
				</td>
				<td colspan="2">
					<span>性别：{{data.gender}}</span>
				</td>
				<td class="img" colspan="2"  rowspan="3">
					<img v-if="data.gender == '男' "  :src="imgSrc" :onerror="errorImgBody">
					<img v-else :src="imgSrc" :onerror="errorImgGirl">
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<span>年龄：{{data.age}}{{data.age ? '岁':''}}</span>
				</td>
				<td colspan="2">
					<span>出生年月：{{data.birth}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<span class="fl">籍贯：</span>
					<p class="fl">{{data.native_place}}</p>
				</td>
				<td colspan="2">
					<span class="fl">现居地址：</span>
					<p class="fl">{{data.address}}</p>
				</td>
			</tr>
			<tr class="table-header">
				<td  colspan="6">|&nbsp;监护人信息</td>
			</tr>
			<tr>
				<td colspan="3">
					<span>监护人性别：</span>
				</td>
				<td colspan="3">
					<span>关系：{{data.relation}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<span>手机：{{data.phone}}</span>
				</td>
				<td colspan="3">
					<span>微信：{{data.wx}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<span>QQ：{{data.qq}}</span>
				</td>
				<td colspan="3">
				</td>
			</tr>
			<tr class="table-header">
				<td  colspan="6">|&nbsp;疾病信息</td>
			</tr>
			<tr>
				<td colspan="3">
					<span class="fl">耳聋性质：</span>
					<p class="fl">{{data.deaf_nature}}</p>
				</td>
				<td colspan="3">
					<span class="fl">耳聋程度：</span>
					<p class="fl">{{data.deaf_degree}}</p>
				</td>
			</tr>
			<tr class="table-header">
				<td  colspan="6">|&nbsp;听力设备信息</td>
			</tr>
			<tr>
				<td colspan="3">
					<span class="fl">左耳：</span>
					<p class="fl shebei">{{data.eq_left.string}}</p>
				</td>
				<td colspan="3">
					<span>佩戴时间：{{data.eq_timel}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<span class="fl">右耳：</span>
					<p class="fl shebei">{{data.eq_right.string}}</p>
				</td>
				<td colspan="3">
					<span>佩戴时间：{{data.eq_timer}}</span>
				</td>
			</tr>
			<tr class="table-header">
				<td  colspan="6">|&nbsp;入校信息</td>
			</tr>
			<tr>
				<td colspan="6">
					<span>入校时间：{{data.garten_time}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="6">
					<span>在校状态：{{ data.sc_status === '1' ?'在校':'离校'}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="6">
					<span>班级：{{data.class_name}}</span>
				</td>
			</tr>
			<tr>
				<td colspan="6">
					<span>班主任：{{data.teacher}}</span>
				</td>
			</tr>
			<tr class="table-header">
				<td  colspan="6">|&nbsp;备注信息</td>
			</tr>
			<tr class="text">
				<td colspan="6" style="vertical-align: top;">
					<span >{{data.remark}}</span>
				</td>
			</tr>
		</table>
    </div>
 </div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	props:{
		data:{
			type:Object,
			default:function(){
				return {}
			}
		},
		errorImgGirl:null,
		errorImgBody:null,
		imgSrc:null,
		organization:null
	},
	mounted(){
		
	},
	methods:{
		show(){
		}
	}
}
</script>

<style lang ="less" scoped>
#info_print{
	h3{
		font-size: 14px;
		color:#333;
		border-bottom: 1px solid #666;
	}
	h2{
		text-align: center;
		font-size: 30px;
		margin-top: 10px;
	}
	.in-time{
		text-align: right;
		margin-right:35px;
	}
	.i-p-main{
		table{
			margin:0 auto;
			.img img{
				width: 90px;
				height: 120px;
				margin-left:20px;
				border: 1px solid #333;
			}
		}
		tr{
			height: 40px;
			background: #fff;
		}
		.table-header{
			height: 60px;
			font-weight: 500;
			td{
				font-size: 20px !important;
			}
		}
		td{
			padding-left: 10px;
			box-sizing: border-box;
			width: 250px;
			text-align: left;
			font-size: 16px;
			span{
				height: 40px;
				display: inline-block;
				vertical-align: middle;
			}
			p{
				width: 160px;
			}
			.shebei{width: 270px;}
		}
		.text td{
			height: 100px;
			span{
				height: 100%;
			    max-height: 100px;
			    overflow: hidden;
			    text-indent: 2em;
			    line-height: 1.5em;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 4;
			}
		}
	}
}
</style>
