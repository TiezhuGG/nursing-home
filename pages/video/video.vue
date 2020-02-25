<template>
	<view class="video">
		<view class="top">
		<view class="search">
			<image src="../../static/images/search.png"></image>
			<input type="text" placeholder="搜索视频内容"/>
		</view>
		</view>
		<view class="space"></view>
		<view class="content">
			
			<view class="view-box" v-for="(item,index) in videoList" :key="index">
				<image :src="item.videoUrl" ></image>
				<view class="video-name">{{item.name}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList:[
					{videoUrl:"../../static/images/user.jpg", name:"庭院正西方位2号摄像头"},
					{videoUrl:"../../static/images/user.jpg", name:"5号楼6层603号房间"},
					{videoUrl:"../../static/images/user.jpg", name:"庭院正西方位2号摄像头"},
					{videoUrl:"../../static/images/user.jpg", name:"5号楼6层603号房间"},
					{videoUrl:"../../static/images/user.jpg", name:"庭院正西方位2号摄像头"},
					{videoUrl:"../../static/images/user.jpg", name:"5号楼6层603号房间"},
					{videoUrl:"../../static/images/user.jpg", name:"庭院正西方位2号摄像头"},
					{videoUrl:"../../static/images/user.jpg", name:"5号楼6层603号房间"},
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
    .video{
		width: 100%;
		font-size: 28upx;
	}
	.top{
		width: 100%;
		padding:20upx 30upx;
		box-sizing: border-box;
		
	}
	.search{
		width: 690upx;
		margin: 0 auto;
		height: 64upx;
		background-color: #f4f4f4;
		display: flex;
		align-items: center;
		border-radius: 2upx;
	}
	.search image{
	   width: 32upx;
	   height: 32upx;
	   margin-left: 20upx;
	   margin-right: 16upx;
	}
	input::-webkit-input-placeholder { /* WebKit browsers */  
	    color:    #B4B4B4;  
	}  
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
	    color:    #B4B4B4;  
	}  
	input::-moz-placeholder { /* Mozilla Firefox 19+ */  
	    color:    #B4B4B4;  
	}  
	input:-ms-input-placeholder { /* Internet Explorer 10+ */  
	    color:    #B4B4B4;   
	}   
	.space{
		width: 100%;
		height: 20upx;
		background-color: #F7F7F7;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding-left: 30upx;
		padding-right: 30upx;
		font-size: 28upx;
		
	}
	.view-box{
		width: 336upx;
		float:left;
		margin-top: 40upx;
	}
	.view-box:nth-child(2n){
		float: right;
	}
	image{
		width: 100%;
		height: 188upx;
	}
	.video-name{
		margin-top: 24upx;
	}
	
</style>
