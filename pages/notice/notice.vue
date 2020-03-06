<template>
	<view class="notice">
		<!--头部标题-->
		<view class="main">
			<view class="title">
				{{noticeInfo.title}}
			</view>
			<view class="time">
				<view class="time-pic">
					<image src="../../static/images/time.png"></image>
				</view>
				<view class="timer">{{noticeInfo.createtime}}</view>
				<view class="clear"></view>
			</view>
			<view class="content">
				<text class="txt">{{noticeInfo.content}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				noticeInfo: {},
			};
		},
		onLoad(options) {
			this.id = options.id
			this.fetchNoticeDetail()
		},
		methods: {
			fetchNoticeDetail() {
				uni.request({
					url: `https://ciai.le-cx.com/api/notice/info?id=${this.id}`,
					success: res => {
						this.noticeInfo = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		box-sizing: border-box;
		padding-left: 30upx;
		padding-right: 30upx;
	}

	.title {
		width: 100%;
		line-height: 1.3;
		font-size: 44upx;
		font-weight: 500;
		padding-top: 50upx;
	}

	.time {
		width: 100%;
		color: #999999;
		font-size: 28upx;
		margin-top: 25upx;
	}

	.time-pic {
		width: 28upx;
		height: 28upx;
		float: left;
		margin-top: 5upx;
	}

	.time-pic image {
		width: 100%;
		height: 100%;
	}

	.timer {
		float: left;
		margin-left: 20upx;
	}

	.clear {
		clear: both;
	}

	.content {
		font-size: 30upx;
		line-height: 2;
		margin-top: 50upx;
	}
</style>
