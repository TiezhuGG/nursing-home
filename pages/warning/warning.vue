<template>
	<view class="warning">
		<!-- 头部导航 -->
		<view class="top-nav">
			<block v-for="(item, index) in navTitles" :key="index">
				<view class="nav-item" :class="currentIndex === index ? 'active':''" @click="switchTab(index)">
					<text>{{item}}</text>
				</view>
			</block>
		</view>

		<!-- 报警模块 -->
		<!-- 已处理 -->
		<view class="main" v-show="currentIndex===1">
			<block v-for="(item, index) in handledList" :key="index">
				<view class="main-item">
					<view class="item-top">
						<view class="item-top-title">
							<img class="glu" src="../../static/images/glu.png">
							<text class="title">{{item.type_name}}</text>
						</view>
						<view class="item-top-time">{{time_format(item.updatetime)}}</view>
					</view>

					<view class="item-middle">
						<view class="name">老人姓名：{{item.patient_name}}</view>
						<view class="area">区域：{{item.address}}</view>
						<view class="number">编号：{{item.no}}</view>
					</view>

					<view class="item-bottom">
						<text class="handled">已处理</text>
					</view>
				</view>
			</block>
		</view>
		<!-- 未处理 -->
		<view class="main" v-show="currentIndex===0">
			<block v-for="(item, index) in unhandledList" :key="index">
				<view class="main-item">
					<view class="item-top">
						<view class="item-top-title">
							<img class="glu" src="../../static/images/glu.png">
							<text class="title">{{item.type_name}}</text>
						</view>
						<view class="item-top-time">{{time_format(item.updatetime)}}</view>
					</view>

					<view class="item-middle">
						<view class="name">老人姓名：{{item.patient_name}}</view>
						<view class="area">区域：{{item.address}}</view>
						<view class="number">编号：{{item.no}}</view>
					</view>

					<view class="item-bottom">
						<text class="unhandled" @click="handWaring(item.id)">立即处理</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				navTitles: ['未处理', '已处理'],
				handledList: [],
				unhandledList: [],
				hackReset: true
			}
		},

		onLoad() {
			this.fetchHandledList()
			this.fetchUnhandledList()
		},

		methods: {
			switchTab(index) {
				this.currentIndex = index
			},

			// 获取已处理列表
			fetchHandledList() {
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/Alarm/recordList',
					data: {
						status: 1
					},
					success: res => {
						this.handledList = res.data.data
						// console.log(this.handledList)
					}
				})
			},

			// 获取未处理列表
			fetchUnhandledList() {
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/Alarm/recordList',
					data: {
						status: -1
					},
					success: res => {
						this.unhandledList = res.data.data
						// console.log(this.unhandledList)
					}
				})
			},

			// 立即处理报警
			handWaring(id) {
				uni.request({
					url: `https://ciai.le-cx.com/index.php/api/Alarm/handleAlarm?id=${id}`,
					success: res => {
						uni.showToast({
							icon: 'success',
							title: res.data.msg,
							duration: 2000
						})
						// 重新获取数据
						this.fetchHandledList()
						this.fetchUnhandledList()
					},
				})
			},

			// 时间戳转时间格式
			time_format(timestamp) {
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let date = new Date(timestamp * 1000);
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				return h + ':' + m + ':' + s;
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}

	.warning {

		// 头部导航
		.top-nav {
			height: 96upx;
			display: flex;
			align-items: center;
			margin-bottom: 30upx;
			background-color: #fff;
			box-shadow: 0upx 1upx 0upx 0upx #DDDDDD;

			.nav-item {
				padding: 28upx 0;
				font-size: 28upx;
				color: #999;
			}

			.nav-item:nth-child(1) {
				margin-left: 146upx;
			}

			.nav-item:nth-child(2) {
				margin-left: 290upx;
			}

			.active {
				color: #333;
				border-bottom: 6upx solid #24C789;
			}
		}

		//报警模块
		.main {
			.main-item {
				display: flex;
				flex-direction: column;
				width: 690upx;
				height: 386upx;
				margin: 0 0 30upx 30upx;
				background-color: #fff;
				border-radius: 10px;

				.item-top {
					height: 110upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item-top-title {
						display: flex;

						.glu {
							width: 48upx;
							height: 48upx;
							margin-left: 30upx;
							margin-right: 20upx;
						}

						.title {
							font-size: 32upx;
							font-weight: 500;
							color: #333;
						}
					}

					.item-top-time {
						margin-right: 30upx;
						font-size: 28upx;
						color: #999;
					}
				}

				.item-middle {
					height: 136upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30upx;
					font-size: 28upx;
					color: #999;
				}

				.item-bottom {
					width: 630upx;
					height: 88upx;
					line-height: 100upx;
					text-align: center;
					margin-left: 30upx;
					margin-top: 38upx;
					border-top: 2upx solid #ddd;

					.handled {
						font-size: 28upx;
						color: #24C789
					}

					.unhandled {
						width: 112upx;
						height: 28upx;
						padding: 10upx 34upx;
						font-size: 28upx;
						color: #FF5A5A;
						border: 2upx solid #FF5A5A;
						border-radius: 50upx;
					}
				}
			}
		}
	}
</style>
