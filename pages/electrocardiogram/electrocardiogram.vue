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

			<text class="measure">71</text>
			<!-- 图表 -->
			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="myChart" id="myChart" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- <view class="chart" style="margin-top: 200upx;">图表,找插件。</view> -->
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
	import uCharts from '../../components/u-charts/u-charts.js'
	var _self;
	var canvaLineA = null;
	var mqtt = require('../../common/js/mqtt.min.js')
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
				client: null
			};
		},
		
		onLoad() {
			_self = this;
			_self.cWidth = uni.upx2px(750);
			// console.log(_self.cWidth)
			_self.cHeight = uni.upx2px(200);
			_self.getServerData();
			// _self.getSocketData()
			
			// 创建socket连接
			let client = mqtt.connect('wxs://eztbs.oicp.net:8888/mqtt', {
			  clientId: 'adfas',
			  username: 'admin',
			  password: 'admin'
			})
			_self.client = client
			
			_self.getSocket()
		},
		
		methods: {
			getSocket() {
				this.client.on('connect', _ => {
				  console.log('mqtt连接成功')
				  this.client.subscribe('/statues', (err) => {
				    if (!err) {
				      console.log('订阅成功')
				    }
				  })
				})
				// 客户端连接错误事件
				this.client.on('error', error => {
				  console.log(error)
				})
				// 监听接收消息事件
				this.client.on('message', (topic, message) => {
				  console.log('收到消息：' + message.toString())
				})
				// this.client.publish('hello', 'hello EMQ', error=> {
				// 	console.log(error || '消息发布成功')
				// })
			},

			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						// console.log(res.data.data)
						let LineA = {
							categories: [],
							series: []
						};
						//这里后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = res.data.data.LineA.categories;
						LineA.categories.push('2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026')
						// LineA.series = res.data.data.LineA.series;
						// 只筛选了最后一条数据进行可视化测试
						LineA.series = res.data.data.LineA.series;
						LineA.series = [LineA.series.pop()];
						// console.log(LineA.series)
						LineA.series[0].data[0] = 15
						LineA.series[0].data[1] = 15
						LineA.series[0].data[2] = 25
						LineA.series[0].data[3] = 7
						LineA.series[0].data[4] = 15
						LineA.series[0].data[5] = 15
						LineA.series[0].data.push(15, 30, 15, 15, 25, 5, 15, 15, 25, 5, 15)
						_self.showLineA("myChart", LineA);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId, chartData) {
				// 图表实例和配置
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#FFFFFF'],
					type: 'line',
					fontSize: 12,
					dataLabel: false,
					dataPointShape: false,
					background: '#24C789',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					legend: {
						show: false
					},
					xAxis: {
						gridColor: '#CCC',
						disabled: true,
						axisLine: false,
						fontColor: '#FFF',
						splitNumber: 15,
					},
					yAxis: {
						data: [{
							position: 'right',
							fontColor: '#FFF',
							axisLineColor: '#24C789',
							min: 0,
							max: 30,
							disabled: true,
							format: (val) => {
								return val.toFixed(0)
							}
						}],
						gridColor: '#CCC',
						splitNumber: 3,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						},
						tooltip: {
							gridType: 'dash',
							dashLength: 5,
							gridColor: '#24C789'
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
			},
		},
	}
</script>

<style lang="scss">
	.measure {
		font-size: 130upx;
		color: #FFF;
		margin-top: 64upx;
		margin-bottom: 48upx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
	}

	.charts {
		width: 750upx;
		height: 150upx;
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
