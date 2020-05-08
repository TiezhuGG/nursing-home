<template>
	<view class="index">
		<view class="header">
			<image src="../../static/images/header-img.png"></image>
		</view>
		<view class="main">
			<view class="main-header">
				<view class="txt">
					<text>{{ patientNum ? patientNum : 0}}</text>
					<text>用户数(人)</text>
				</view>
				<image src="../../static/images/split.png"></image>
				<view class="txt">
					<text>{{ watch_amount ? watch_amount : 0}}</text>
					<text>实时佩戴人数(人)</text>
				</view>
			</view>
			<view class="main-content" style="background: url(../../static/images/index-back.png) right;background-size: 448upx 666upx; background-repeat: no-repeat;">
				<text>
					1.智能可穿戴系统（智能腕表）

					2.生命体征监测（心率、血氧监测，个性化阈值设定，动态数据实时采集）

					3.电子防走失围栏（室内定位、GPS定位

					4.防跌倒报警系统（动作捕捉，配合监控报警系统，第一时间发现长者跌倒的位置）

					5.视频监护系统（覆盖机构内所有公共区域及每位长者的房间）

					6.床头呼叫器（即时呼叫）

					7.起夜监测系统（动作捕捉、双重传感融合）

					8.大数据处理（整合、分析）
				</text>

			</view>
			<view class="main-bottom">
				<button @click="toWorkbench">进入</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				patientNum: 0, // 用户数
				watch_amount: 0, // 实时佩戴人数
				reqeustTask: null,
				interval: null
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
			this.fetchPatients()
			// 三秒刷新一次数据
			this.interval = setInterval(() => {
				this.fetchWatchCount()
			}, 3000)
		},
		onUnload() {
			console.log('stop request')
			clearInterval(this.interval)
		},
		methods: {
			toWorkbench() {
				if (this.userInfo) {
					uni.switchTab({
						url: '../workbench/workbench'
					})
				} else {
					uni.reLaunch({
						url: '../login/login'
					})
				}
			},
			fetchPatients() {
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/patient/patientList',
					success: res => {
						const patientList = res.data.data
						this.patientNum = patientList.length
					}
				})
			},
			fetchWatchCount() {
				var req = uni.request({
					url: 'https://ciaiky.le-cx.com/php/watch_on.php',
					success: res => {
						this.watch_amount = res.data[0].watch_amount
						console.log(res)
					}
				})
				this.reqeustTask = req
			},
		}
	}
</script>

<style lang="scss">
	.index {
		background-color: #F2FFFA;

		.header {
			image {
				width: 100%;
			}
		}

		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 18upx 0 32upx 0;

			.main-header {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 670upx;
				height: 200upx;
				background-color: #24C789;
				border-radius: 8px;
				margin-bottom: 104upx;

				.txt {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #fff;
					font-size: 24upx;

					text:first-child {
						font-size: 56upx;
						margin-bottom: 14upx;
					}
				}

				image {
					width: 2upx;
					height: 120upx;
				}
			}

			.main-content {
				width: 100%;
				margin-bottom: 100upx;

				text {
					display: inline-block;
					font-size: 28upx;
					color: #333;
					margin: 0 40upx;
				}
			}

			.main-bottom {
				button {
					width: 670upx;
					height: 88upx;
					background-color: #24C789;
					color: #fff;
					border-radius: 44px;
				}
			}
		}
	}
</style>
