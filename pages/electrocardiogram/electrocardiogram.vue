<template>
	<view class="heart-rate">
		<view class="top">
			<view class="patient_infos">
				<img class="avatar" src="../../static/images/heart.png">
				<view class="info">
					<text class="name">王浩洋</text>
					<view class="other">
						<text class="age">年龄: 74</text>
						<text class="gender">性别: 男</text>
					</view>
				</view>
				<img class="more" src="../../static/images/more.png">
			</view>
			<view class="date-module">
				<view class="date">
					<img class="back" src="../../static/images/back2.png">
					<text class='txt'>2020年2月15日</text>
				</view>
				<text class="total">最后30次测量</text>
			</view>
			<view class="chart" style="margin-top: 200upx;">图表,找插件。</view>
		</view>
		
		<view class="bottom">
			<view class="bottom-top">
				最近五次测量结果
			</view>
			<view class="bottom-item" v-for="(item,index) in dateList" :key="index">
				<text class="date">{{item.date}}</text>
				<view class="time" v-for="(item, index) in item.time" :key="index">
					<text class="txt">{{item}}</text>
					<text class="bpm">{{bpm}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time_range: ['08:25', '09:45', '10:22', '12:12', '13:25', '16:25', '18:25'],
				dateList: [
					{date: '2020年2月19日', time: ['09:55:16', '10:25:26', '09:55:16']},
					{date: '2020年2月20日', time: ['09:55:16', '10:25:26', '09:55:16','09:55:16']},
				],
				bpm: '86BPM'
			};
		}
	}
</script>

<style lang="scss">
.heart-rate {
	background-color: #F7F7F7;
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750upx;
		height: 740upx;
		background-color: #24C789;
		.patient_infos {
			display: flex;
			align-items: center;
			width: 690upx;
			height: 140upx;
			margin-top: 30upx;
			background-color: #fff;
			border-radius:77px;
			.avatar {
				width: 92upx;
				height: 92upx;
				margin-left: 24upx;
			}
			.info {
				height: 92upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 24upx;
				.name {
					font-size: 32upx;
					font-weight:500;
					color: #333;
				}
				.other {
					font-size: 24upx;
					color: #999;
					.gender {
						margin-left: 28upx;
						margin-bottom: 10upx;
					}
				}
			}
			.more {
				width: 24upx;
				height: 16upx;
				margin-left: 242upx;
			}
		}
		.date-module {
			width: 224upx;
			display: flex;
			flex-direction: column;
			margin-top: 40upx;
			.date {
				display: flex;
				justify-content: space-between;
				align-items: center; 
				.back {
					width: 10upx;
					height: 16upx;
				}
				.txt {
					font-size: 28upx;
					color: #fff;
				}
			}
			.total {
				font-size: 24upx;
				color: #fff;
				margin-top: 8upx;
				margin-left: 42upx;
			}
		}
	}
	
	.bottom {
		width: 750upx;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.bottom-top {
			height: 100upx;
			line-height: 100upx;
			padding-left: 30upx;
			font-size: 28upx;
			font-weight:500;
			color: #333;
			border-bottom: 1upx solid #DCDCDC;
		}
		.bottom-item {
			width: 690upx;
			display: flex;
			flex-direction: column;
			margin-left: 30upx;
			padding-bottom: 8upx;
			border-bottom: 1upx solid #DCDCDC;
			.date {
				height: 88upx;
				line-height: 88upx;
				font-size: 28upx;
				color: #666;
			}
			.time {
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				.txt {
					color: #999;
					margin-bottom: 28upx;
				}
				.bpm {
					color: #333;
				}
			}
		}
		.bottom-item:last-child {
			border-bottom: none;
		}
	}
}
</style>
