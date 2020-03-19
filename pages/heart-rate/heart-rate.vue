<template>
	<view class="heart-rate">
		<view class="top">
			<view class="patient_infos">
				<img class="avatar" :src="patient.avatar">
				<view class="info" v-if="patient">
					<text class="name">{{patient.name}}</text>
					<view class="other">
						<text class="age">年龄: {{patient.age}}</text>
						<text class="gender">性别: {{patient.gender === 1 ? '男' : '女'}}</text>
					</view>
				</view>
				<view class="no-info" v-if="!patient">请选择患者</view>
				<picker mode="selector" :range="patientList" @change="bindPickerChange" range-key="name" >
					<view><img class="more" src="../../static/images/more.png"></view>
				</picker>
			</view>
			
			<view class="date-module">
				<view class="date">
					<img class="back" src="../../static/images/back2.png">
					<text class='txt'>2020年2月15日</text>
				</view>
				<text class="total">最后30次测量</text>
			</view>
			<!-- 图表 -->
			<view class="qiun-columns">
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
				client: null,
				patientList: [],
				patient: null,
				heart_rate_list: []
			};
		},
		onLoad() {
			_self = this;
			_self.fetchPatientList()
			// _self.getServerData();
			_self.cWidth = uni.upx2px(750);
			_self.cHeight = uni.upx2px(500);
			
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
			// 获取socket数据
			getSocket() {
				this.client.on('connect', () => {
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
					// console.log('收到消息：' + message.toString())
					var data = message.toString()
					var dataArr = JSON.parse(data)
					if (dataArr.length > 1) {
						// console.log(dataArr.length)
						// console.log('收到消息' + dataArr)
						for(let item of dataArr) {
							// console.log(item)
							if(this.patient && item.mac == this.patient.mac) {
								let heart_rate = parseInt(item.rawData.slice(14, 15), 16)
								console.log(heart_rate)
								this.heart_rate_list.push(heart_rate)
								if (this.heart_rate_list.length > 7) {
									this.heart_rate_list.shift()
								}
								console.log(this.heart_rate_list)
								let LineA = {
									categories: [],
									series: []
								};
								LineA.categories = ['1', '2','3','4','5','6']
								// LineA.series = [{name:'xixi',data:[35, 8, 25, 37, 4, 20]}]
								LineA.series = this.heart_rate_list
								_self.showLineA("myChart", LineA);
							}
						}
					}
				})
			},
			
			bindPickerChange(e){
				// console.log(e)
				for(let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						this.fetchPatientInfo(item.id)
					}
				}
			},
			// 获取患者列表(ID)
			async fetchPatientList() {
				await uni.request({
					url: 'https://ciai.le-cx.com/api/patient/patientList',
					success: res => {
						this.patientList = res.data.data
					}
				})
			},
			// 获取患者信息
			async fetchPatientInfo(id) {
				await uni.request({
					url: `https://ciai.le-cx.com/api/patient/info?id=${id}`,
					success: res => {
						this.patient = res.data.data
					},
				})
			},

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
						//这里后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = res.data.data.LineA.categories;
						// LineA.series = res.data.data.LineA.series;
						// 只筛选了最后一条数据进行可视化
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
				canvaLineA.updateData({
					series: _self.heart_rate_list
				})
				// 图表实例和配置
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
					// series: chartData.series,
					series: [
						{
						name: '实时心率',
						data: ''
						}
					],
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
			}
		},
	}
</script>

<style lang="scss">
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
	}

	.charts {
		width: 750upx;
		height: 430upx;
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
					width: 36upx;
					height: 24upx;
					position: absolute;
					margin-top: -5upx;
					right: 100upx;
				}
				
				.no-info {
					color: #999;
					margin-left: 300upx;
					margin-top: 5upx;
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
