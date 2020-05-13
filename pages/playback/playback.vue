<template>
	<view class="playback">
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
				<!-- 				<view class="no-info" v-if="!patient">请选择患者</view>
				<picker mode="selector" :range="patientList" @change="bindPickerChange" range-key="name">
					<view><img class="more" src="../../static/images/more.png"></view>
				</picker> -->
				<view class="no-info" v-if="!patient" @click="toChoice">请选择患者</view>
				<view><img class="more" src="../../static/images/more.png" @click="toChoice"></view>
			</view>

			<view class="date-module">
				<view class="date">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="txt">
							选择时间: {{date}}
						</view>
					</picker>
					<picker mode="selector" :range="typeList" @change="bindTypeChange" range-key="time">
						<view class="txt">
							选择类型: {{ timeType }}
						</view>
					</picker>
				</view>

			</view>
			<!-- 图表 -->
			<view class="qiun-columns">
				<view class="qiun-charts" v-show="showCharts">
					<canvas canvas-id="myChart" id="myChart" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
		</view>

		<view class="middle">
			<view class="beat">
				<view class="beat-item">
					<text class="txt">最高(BPM)</text>
					<text class="val">{{ highest_bpm === 0||highest_bpm === null ? '' : highest_bpm }}</text>
				</view>
				<view class="beat-item">
					<text class="txt">平均(BPM)</text>
					<text class="val">{{ avg_bpm === 0|| avg_bpm === null ? '' : avg_bpm }}</text>
				</view>
				<view class="beat-item">
					<text class="txt">最低(BPM)</text>
					<text class="val">{{ lowest_bpm === 0||lowest_bpm === null ? '' : lowest_bpm }}</text>
				</view>
			</view>
		</view>

		<!-- 		<view class="bottom">
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
		</view> -->
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js'
	var _self;
	var canvaLineA = null;
	var mqtt = require('../../common/js/mqtt.min.js')
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				showCharts: false,
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
				categories: [],
				date: currentDate,
				mac: '',
				typeList: [{
						time: '5分钟',
						type: "1"
					},
					{
						time: '10分钟',
						type: "2"
					},
					{
						time: '30分钟',
						type: "3"
					},
					{
						time: '60分钟',
						type: "4"
					},
				],
				timeType: '5分钟',
				type: '1',
				dataList: [],
				highest_bpm: 0,
				lowest_bpm: 0,
				avg_bpm: 0
			};
		},
		onLoad(options) {
			_self = this;
			// 进页面有患者id就执行
			if (options.pid) {
				this.fetchPatientInfo(options.pid)
			}
			this.fetchPatientList()
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		onHide() {
			this.showCharts = false
			this.heart_rate_list = []
			this.categories = []
		},
		computed: {
			startDate() {
				return this.getDate('start')
			},
			endDate() {
				return this.getDate('end')
			}
		},
		watch: {
			patient(newVal, oldVal) {
				this.drawChart()
			},
			type(newVal, oldVal) {
				if (this.patient) {
					this.drawChart()
				}
			},
			date(newVal, oldVal) {
				if (this.patient) {
					this.drawChart()
				}
			},
		},

		methods: {
			toChoice() {
				uni.redirectTo({
					url: `../choicePatient/choicePatient?id=2`,
				})
			},
			drawChart() {
				this.heart_rate_list = []
				this.categories = []
				this.getData()
			},
			// 选择患者picker
			// bindPickerChange(e) {
			// 	for (let item of this.patientList) {
			// 		if (item.id === Number(e.detail.value) + 1) {
			// 			this.fetchPatientInfo(item.id)
			// 		}
			// 	}
			// },
			// 选择时间段picker
			bindTypeChange(e) {
				for (let item of this.typeList) {
					if (this.typeList.indexOf(item) == e.detail.value) {
						this.timeType = item.time
						this.type = item.type
						return
					}
				}
			},

			async getData() {
				this.showCharts = true
				await uni.request({
					url: 'https://ciaiky.le-cx.com/php/chaxun.php',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						shangchuan_date: this.date,
						data_mingzi: this.patient.mac,
						data_sj: this.type
						// shangchuan_date: "2020-01-01",
						// data_mingzi: this.patient.mac,
						// data_sj: "1"
					},
					success: res => {
						this.dataList = res.data
						for (let item of this.dataList) {
							this.heart_rate_list.push(item.data_xl)
							this.categories.push(item.data_time)
						}
						this.highest_bpm = Math.max(...this.heart_rate_list)
						this.lowest_bpm = Math.min(...this.heart_rate_list)
						this.avg_bpm = this.getAverage(this.heart_rate_list)
						_self.showLineA("myChart", this.categories, this.heart_rate_list)
					}
				})
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

			showLineA(canvasId, categories, heart_rate) {
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
					categories: categories,
					series: [{
						name: '实时心率',
						data: heart_rate
					}],
					animation: false,
					xAxis: {
						gridColor: '#FFF',
						gridType: 'dash',
						disableGrid: true,
						axisLine: false,
						fontColor: '#FFF',
						disabled: true,
						// boundaryGap: 'justify'
					},
					yAxis: {
						data: [{
							position: 'right',
							fontColor: '#FFF',
							axisLineColor: '#24C789',
							min: 0,
							max: 180,
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
			// 日期选择器
			bindDateChange(e) {
				this.date = e.target.value
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 求数组平均值
			getAverage(arr) {
				var sum = 0
				for (let i = 0; i < arr.length; i++) {
					sum += parseInt(arr[i])
				}
				return Math.ceil(sum / arr.length)
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

	.playback {
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
				width: 100%;
				// display: flex;
				// flex-direction: column;
				margin-top: 40upx;
				display: flex;
				justify-content: space-around;

				.date {
					display: flex;
					// justify-content: center;
					align-items: center;

					.back {
						width: 10upx;
						height: 16upx;
					}

					.txt {
						font-size: 28upx;
						color: #fff;
						margin-right: 10upx;
					}
				}

				.total {
					font-size: 24upx;
					color: #fff;
					margin-top: 8upx;
					margin-left: 52upx;
				}
			}
		}

		.middle {
			width: 750upx;
			height: 236upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
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
				margin-top: 50upx;

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
						display: inline-block;
						color: #999;
						margin-bottom: 28upx;
						margin-right: 10upx;
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
