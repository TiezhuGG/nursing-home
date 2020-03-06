<template>
	<view class="heart-rate">
		<view class="top">
			<view class="patient_infos">
				<img class="avatar" src="../../static/images/test.jpg">
				<view class="info">
					<text class="name">你好</text>
					<view class="other">
						<text class="age">年龄: 101</text>
						<text class="gender">性别: 女</text>
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
			<!-- <canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"> -->
			<!-- <view class="chart" style="margin-top: 200upx;">图表,找插件。</view> -->
			<!-- 图表 -->
			<view class="qiun-columns">
				<!-- 				<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
					<view class="qiun-title-dot-light">基本折线图</view>
				</view> -->
				<view class="qiun-charts">
					<canvas canvas-id="myChart" id="myChart" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
		</view>

		<view class="middle">
			<view class="time-range">
				<block v-for="(item, index) in time_range" :key="index">
					<text class="time">{{item}}</text>
				</block>
			</view>
			<view class="beat">
				<view class="beat-item">
					<text class="txt">最高(BPM)</text>
					<text class="val">107</text>
				</view>
				<view class="beat-item">
					<text class="txt">平均(BPM)</text>
					<text class="val">82</text>
				</view>
				<view class="beat-item">
					<text class="txt">最低(BPM)</text>
					<text class="val">45</text>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="bottom-top">
				最近三十次测量结果
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
	import uCharts from '../../components/u-charts/u-charts.js'
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				time_range: ['08:25', '09:45', '10:22', '12:12', '13:25', '16:25', '18:25'],
				dateList: [{
						date: '2020年2月19日',
						time: ['09:55:16', '10:25:26', '09:55:16']
					},
					{
						date: '2020年2月20日',
						time: ['09:55:16', '10:25:26', '09:55:16', '09:55:16']
					},
				],
				bpm: '86BPM',

				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
			};
		},
		onLoad() {
			_self = this;
			_self.cWidth = uni.upx2px(750);
			console.log(_self.cWidth)
			_self.cHeight = uni.upx2px(500);
			_self.getServerData();
		},
		methods: {
			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let LineA = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = res.data.data.LineA.categories;
						// LineA.series = res.data.data.LineA.series;
						LineA.series = res.data.data.LineA.series;
						LineA.series = [LineA.series.pop()];
						_self.showLineA("myChart", LineA);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#FFFFFF'],
					type: 'line',
					fontSize: 12,
					dataLabel: false,
					dataPointShape: true,
					background: '#24C789',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						gridColor: '#FFF',
						gridType: 'dash',
						disableGrid: true,
						axisLine: false,
						fontColor: '#FFF',
					},
					yAxis: {
						data: [{
							position: 'right',
							fontColor: '#FFF',
							axisLineColor: '#24C789',
							min: 0,
							max: 300,
							format: (val) => {
								return val.toFixed(0)
							}
						}],
						gridType: 'dash',
						gridColor: '#FFF',
						splitNumber: 6,
						dashLength: 2,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		// height: 500upx;
		// background-color: #24C789;
	}

	.charts {
		width: 750upx;
		height: 430upx;
		// background-color: #24C789;
	}

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
				border-radius: 77px;

				.avatar {
					width: 92upx;
					height: 92upx;
					margin-left: 24upx;
					border-radius: 50%;
				}

				.info {
					height: 92upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 24upx;

					.name {
						font-size: 32upx;
						font-weight: 500;
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

		.middle {
			width: 750upx;
			height: 236upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: #fff;

			.time-range {
				display: flex;
				justify-content: space-between;

				.time {
					margin: 20upx 24upx 0;
					font-size: 20upx;
					color: #999;
				}
			}

			.beat {
				display: flex;
				justify-content: space-between;

				.beat-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 30upx 40upx;

					.txt {
						font-size: 24upx;
						color: #999;
					}

					.val {
						margin-top: 20upx;
						font-size: 48upx;
						color: #333;
					}
				}
			}
		}

		.bottom {
			width: 750upx;
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
			background-color: #fff;

			.bottom-top {
				height: 100upx;
				line-height: 100upx;
				padding-left: 30upx;
				font-size: 28upx;
				font-weight: 500;
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
