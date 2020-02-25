<template>
	<view class="notice">
		<!--头部标题-->
		<view class="main">
			<view class="title">
				重磅！我国养老服务领域第一项强
				制性国家标准发布
			</view>
			<view class="time">
				<view class="time-pic"><image src="../../static/images/time.png"></image></view>
				<view class="timer">{{timer}}</view>
				<view class="clear">
					
				</view>
			</view>
			<view class="content">
				<p class="p1">2019年12月27日，国家市场监督管理总局、国家标
准化管理委员会发布公告，正式批准gb38600-2019
《养老机构服务安全基本规范》强制性国家标准并予
以公布。这是我国养老服务领域第一项强制性国家
标准，明确了养老机构服务安全“红线”，将有利于
防范、排查和整治养老机构服务中的安全隐患，推
进养老服务高质量发展。。</p>
<p class="p2">《养老机构服务安全基本规范》基本要求有哪些？
如何进行安全风险评估和服务防护?具体管理要求又
是什么?这些群众高度关切、社会普遍关注的问题，
小编带您一图看懂!</p>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:"2018-10-25  18:44:21"
			};
		}
	}
</script>

<style lang="scss">
       .main{
		   width: 100%;
		   box-sizing: border-box;
		   padding-left: 30upx;
		   padding-right: 30upx;
	   }
	   .title{
		   width: 100%;
		   line-height: 1.3;
		   font-size: 44upx;
		   font-weight: 500;
		   padding-top: 50upx;
	   }
	   .time{
		   width: 100%;
		   color: #999999;
		   font-size: 28upx;
		   margin-top: 25upx;
	   }
	   .time-pic{
		   width: 28upx;
		   height: 28upx;
		   float: left;
		   margin-top: 5upx;
	   }
	   .time-pic image{
		   width: 100%;
		   height: 100%;
	   }
	   .timer{
		   float: left;
		   margin-left: 20upx;
	   }
	   .clear{
		   clear: both;
	   }
	   .content{
		   font-size: 30upx;
		   line-height: 2;
		   margin-top: 50upx;
	   }
	  .p2{
		  margin-top: 30upx;
	  }
</style>
