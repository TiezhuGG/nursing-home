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
				<picker mode="selector" :range="patientList" @change="bindPickerChange" range-key="name">
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
				heart_rate_list: [],
				categories: []
			};
		},
		onLoad(options) {
			console.log('pid',options.pid)
			// 进页面有患者id就执行
			if(options.pid) {
				this.test(options.pid)
			}
			
			_self = this;
			this.fetchPatientList()
			// _self.getServerData();
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		watch: {
			patient(newVal, oldVal) {
				console.log(newVal)
				console.log(oldVal)
				// 切换病人时清空图表数据（重新渲染图表）
				this.heart_rate_list = []
				this.categories = []
				if (oldVal != null) {
					canvaLineA.updateData({
						categories: this.categories,
						series: [{
							name: '实时心率',
							data: this.heart_rate_list
						}],
					})
				}
			},
			deep: true
		},
		
		methods: {
			test(pid) {
				this.fetchPatientInfo(pid)
				setInterval(() => {
					let randomData = Math.random() * 300
					let timer = Math.random() * 300
					this.heart_rate_list.push(randomData)
					this.categories.push(timer)
					// console.log(this.heart_rate_list)
					if (this.heart_rate_list.length > 8) {
						this.heart_rate_list.shift()
						this.categories.shift()
					}

					// 初始化图表实例
					_self.showLineA("myChart")
					// updateData更新图表
					canvaLineA.updateData({
						categories: this.categories,
						series: [{
							name: '实时心率',
							data: _self.heart_rate_list
						}],
					})
				}, 1500)

			},
			// picker @change事件
			bindPickerChange(e) {
				// console.log(e)
				for (let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						// this.fetchPatientInfo(item.id)
						// this.getSocket()
						
						// 把患者id缓存到本地
						uni.setStorage({
							key: 'pid',
							data: item.id
						})
						this.test(item.id)
					}
				}
			},
			// 获取患者列表(ID)
			async fetchPatientList() {
				await uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/patient/patientList',
					success: res => {
						this.patientList = res.data.data
					}
				})
			},
			// 获取患者信息
			async fetchPatientInfo(id) {
				await uni.request({
					url: `https://ciai.le-cx.com/index.php/api/patient/info?id=${id}`,
					success: res => {
						this.patient = res.data.data
					},
				})
			},
			// 获取socket数据
			async getSocket() {
				let client = await mqtt.connect('wxs://59.60.183.104:8888/mqtt', {
					clientId: 'adfas',
					username: 'admin',
					password: 'admin'
				})
				client.on('connect', () => {
					console.log('mqtt连接成功')
					client.subscribe('/statues', (err) => {
						if (!err) {
							console.log('订阅成功')
						} else {
							console.log('订阅失败')
						}
					})
				})
				// 客户端连接错误事件
				client.on('error', error => {
					console.log(error)
				})
				// 监听接收消息事件
				client.on('message', (topic, message) => {
					// console.log('收到消息：' + message.toString())
					let data = message.toString()
					// console.log(data)
					let dataArr = JSON.parse(data)
					if (dataArr.length > 1) {
						for (let item of dataArr) {
							if (this.patient && item.mac == this.patient.mac) {
								console.log(item)
								// 心率
								let heart_rate = parseInt(item.rawData.slice(14, 15), 16)
								// 步数
								let steps = parseInt(item.rawData.slice(15, 17), 16)
								// 电池电量
								let power = parseInt(item.rawData.slice(17, 18), 16)
								// x轴时间
								let timer = item.timestamp.slice(12, 19)
								this.heart_rate_list.push(heart_rate)
								// let randomData = Math.random() * 300
								// this.heart_rate_list.push(randomData)
								this.categories.push(timer)
								// console.log(this.heart_rate_list)
								if (this.heart_rate_list.length > 8) {
									this.heart_rate_list.shift()
									this.categories.shift()
								}
								// 初始化图表实例
								_self.showLineA("myChart")
								// updateData更新图表
								canvaLineA.updateData({
									categories: this.categories,
									series: [{
										name: '实时心率',
										data: _self.heart_rate_list
									}],
								})
							}
						}
					}
				})
			},

			showLineA(canvasId) {
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
					categories: '',
					series: [{
						name: '实时心率',
						data: ''
					}],
					animation: false,
					xAxis: {
						gridColor: '#FFF',
						gridType: 'dash',
						disableGrid: true,
						axisLine: false,
						fontColor: '#FFF',
						// boundaryGap: 'justify'
					},
					yAxis: {
						data: [{
							position: 'right',
							fontColor: '#FFF',
							axisLineColor: '#24C789',
							min: 0,
							max: 300,
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
			},

			// 获取当前时间
			// getNowTime() {
			// 	let now = new Date()
			// 	let hour = now.getHours()
			// 	let minute = now.getMinutes()
			// 	let second = now.getSeconds()
			// 	hour = hour < 10 ? '0' + hour : hour
			// 	minute = minute < 10 ? '0' + minute : minute
			// 	second = second < 10 ? '0' + second : second
			// 	let now_time = `${hour}:${minute}:${second}`
			// 	return now_time
			// },

			async getServerData() {
				await uni.request({
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
