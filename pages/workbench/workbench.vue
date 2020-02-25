<template>
	<view class="workbench">
		<!-- 用户信息 -->
		<view class="userinfos">
			<img class="avatar" src="../../static/images/heart.png">
			<view class="infos">
				<text class="name">{{name}}</text>
				<view class="job">
					<img class="medal" src="../../static/images/medal.png">
					<text class="job-title">护士</text>
				</view>
			</view>
		</view>
		
		<!-- 通知 -->
		<navigator class="notice" url="../notice/notice">
			<img class="notice-img" src="../../static/images/notice.png">
			<text class="notice-txt">重磅！我国养老服务领域第一项强制性国家政策出台，好多护士姐姐啊~</text>
		</navigator>
		
		<!-- 内容 -->
		<view class="main">
			<navigator class="item" url="../heart-rate/heart-rate">
				<img class="item-img" src="../../static/images/item-img1.png">
				<text class="item-txt">实时心率</text>
			</navigator>
			<navigator class="item" url="../heart-rate/heart-rate">
				<img class="item-img" src="../../static/images/item-img2.png">
				<text class="item-txt">心率回放</text>
			</navigator>
			<navigator class="item" url="../electrocardiogram/electrocardiogram">
				<img class="item-img" src="../../static/images/heart.png">
				<text class="item-txt">心电图</text>
			</navigator>
			<navigator class="item" url="../blood-status/blood-status">
				<img class="item-img" src="../../static/images/item-img4.png">
				<text class="item-txt">血压 血氧 血糖</text>
			</navigator>
			<navigator class="item" url="../video/video">
				<img class="item-img" src="../../static/images/item-img5.png">
				<text class="item-txt">视频监控</text>
			</navigator>
			<navigator class="item">
				<img class="item-img" src="../../static/images/item-img6.png">
				<text class="item-txt">起夜/摔倒警报</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "早上好，护士姐姐！"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.workbench {
	position: relative;
	background-color: #F7F7F7;
	.userinfos {
		display: flex;
		width: 750upx;
		height: 322upx;
		background-color: #24C789;
		.avatar {
			width: 116upx;
			height: 116upx;
			margin: 64upx 30upx 0 44upx;
		}
		.infos {
			display: flex;
			flex-direction: column;
			margin: 64upx 0;
			.name {
				margin-bottom: 26upx;
				font-size: 40upx;
				font-weight: 500;
				color: #fff;
			}
			.job {
				width: 116upx;
				height: 36upx;
				display: flex;
				align-items: center;
				background-color: #fff;
				border-radius: 200upx 200upx 200upx 200upx;
				.medal {
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}
				.job-title {
					font-size: 24upx;
					color: #333;
				}
			}
		}
	}
	
	.notice {
		width: 690upx;
		height: 88upx;
		display: flex;
		align-items: center;
		margin-left: 30upx;
		position: absolute;
		top: 276upx;
		background-color: #fff;
		border-radius: 10upx;
		.notice-img {
			width: 30upx;
			height: 36upx;
			margin-left: 30upx;
		}
		.notice-txt {
			width: 560upx;
			margin-left: 32upx;
			font-size: 28upx;
			color: #666;
			font-family: PingFangSC-Regular,PingFang SC;
			white-space: nowrap; 
			overflow: hidden; 
			text-overflow: ellipsis;
		}
	}
	
	.main {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: 330upx;
			height: 360upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 30upx;
			margin-left: 30upx;
			background-color: #fff;
			box-shadow:0px 4px 12px 0px rgba(0,0,0,0.05);
			border-radius:10px;
			.item-img {
				width: 90upx;
				height: 90upx;
				margin-top: 80upx;
			}
			.item-txt {
				margin-top: 76upx;
				font-size: 34upx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color: #564C5E;
				line-height: 34upx;
			}
		}
		.item:nth-child(1),.item:nth-child(2) {
			margin-top: 74upx;
		}
		.item:nth-child(5),.item:nth-child(6) {
			margin-bottom: 30upx;
		}
	}
}
</style>
