<template>
	<view class="blood-status">
		<!-- 用户信息 -->
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
		</view>

		<!-- 导航 -->
		<view class="nav">
			<block v-for="(item, index) in navTitles" :key="index">
				<view class="nav-item" :class="currentIndex===index ? 'active':''" @click="switchTab(index)">
					<text class="txt">{{item}}</text>
				</view>
			</block>
		</view>

		<!-- 血压 -->
		<view class="infos" v-show="currentIndex === 0">
			<!-- 日期 -->
			<view class="date">
				<view class="last-week">
					<!-- 					<img src="../../static/images/back-green.png">
					<text class="txt">上一周</text> -->
				</view>
				<!-- 				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="this-week">
						选择时间: {{date.substr(5) + " 至 "}}
					</view>
				</picker> -->

				<view class="this-week">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange1">
						<text class="space">
							选择时间: {{date.substr(5) + " 至"}}
						</text>
					</picker>
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
						<text>
							{{date2.substr(5)}}
						</text>
					</picker>
				</view>

				<view class="next-week">
					<!-- 					<text class="txt">下一周</text>
					<img src="../../static/images/go-green.png"> -->
				</view>
			</view>
			<!-- 平均值 -->
			<view class="wrap">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">平均血压值</text>
						<text class="val">{{avg_val_blood}}</text>
						<text class="txt-bottom">mmHg</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val">{{avg_val_time}}</text>
						<text class="txt-bottom">次/分钟</text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<view class="qiun-columns">
				<view class="qiun-charts" v-show="showCharts">
					<canvas canvas-id="1" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getData(1)">获取血压信息</button>
				<!-- <button class="get-msg" @click="bp_openBluetoothAdapter">获取血压信息</button> -->
			</view>
		</view>


		<!-- 血氧 -->
		<view class="infos" v-show="currentIndex === 1">
			<!-- 日期 -->
			<view class="date">
				<view class="last-week">
					<!-- <img src="../../static/images/back-green.png"> -->
					<!-- <text class="txt">上一周</text> -->
				</view>
				<view class="this-week">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange1">
						<text class="space">
							选择时间: {{date.substr(5) + " 至"}}
						</text>
					</picker>
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
						<text>
							{{date2.substr(5)}}
						</text>
					</picker>
				</view>
				<view class="next-week">
					<!-- <text class="txt">下一周</text> -->
					<!-- <img src="../../static/images/go-green.png"> -->
				</view>
			</view>
			<!-- 平均值 -->
			<view class="wrap">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">平均血氧值</text>
						<text class="val">{{avg_val_blood}}</text>
						<text class="txt-bottom">mmHg</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val">{{avg_val_time}}</text>
						<text class="txt-bottom">次/分钟</text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<view class="qiun-columns">
				<view class="qiun-charts" v-show="showCharts">
					<canvas canvas-id="2" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getData(2)">获取血氧信息</button>
			</view>
		</view>


		<!-- 血糖 -->
		<view class="infos" v-show="currentIndex === 2">
			<!-- 日期 -->
			<view class="date">
				<view class="last-week">
					<!-- <img src="../../static/images/back-green.png"> -->
					<!-- <text class="txt">上一周</text> -->
				</view>
				<view class="this-week">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange1">
						<text class="space">
							选择时间: {{date.substr(5) + " 至"}}
						</text>
					</picker>
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
						<text>
							{{date2.substr(5)}}
						</text>
					</picker>
				</view>
				<view class="next-week">
					<!-- <text class="txt">下一周</text> -->
					<!-- <img src="../../static/images/go-green.png"> -->
				</view>
			</view>
			<!-- 平均值 -->
			<view class="wrap">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">平均血糖值</text>
						<text class="val">{{avg_val_blood}}</text>
						<text class="txt-bottom">mmHg</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val">{{avg_val_time}}</text>
						<text class="txt-bottom">次/分钟</text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<view class="qiun-columns">
				<view class="qiun-charts" v-show="showCharts">
					<canvas canvas-id="3" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getData(3)">获取血糖信息</button>
			</view>
		</view>

	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				navTitles: ['血压', '血氧', '血糖'],
				currentIndex: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				patientList: [],
				patient: null,
				chart: 1,
				// 当前患者id
				pid: '',
				showCharts: false,
				date: currentDate,
				date2: currentDate,
				start_time: null,
				end_time: null,
				data_list: [],
				// 血压
				bp_devices: [],
				bp_connected: false,
				bp_chs: [],
				bp_discoveryStarted: false,
				bp_canWrite: false,
				bp_deviceId: '',
				bp_serviceId: '',
				bp_characteristicId: '',
				bp_list: [],
				bp_categories: [],
				// 血氧
				bo_devices: [],
				bo_connected: false,
				bo_chs: [],
				bo_discoveryStarted: false,
				bo_canWrite: false,
				bo_deviceId: '',
				bo_serviceId: '',
				bo_characteristicId: '',
				bo_list: [],
				bo_categories: [],

				this_week: '6月7日-6月13日',
				avg_val_blood: '135/80',
				avg_val_time: 65,
			};
		},

		onLoad(options) {
			// 进页面默认日期时间戳和后一天日期时间戳
			this.start_time = this.dateToTimestamp(this.date)
			this.end_time = this.start_time + 24 * 60 * 60 * 1000
			// console.log('bpid',options.bpid)
			// 从工作台进页面有患者id就执行
			if (options.bpid) {
				console.log('从工作台进来', options.bpid)
				this.fetchPatientInfo(options.bpid)
				this.pid = options.bpid
				// this.test(options.bpid)
			}
			// 从客户管理界面进来会传入patient_id
			if (options.patient_id) {
				console.log('从客户管理界面进来', options.patient_id)
				this.fetchPatientInfo(options.patient_id)
				this.pid = options.patient_id
				// this.test(options.patient_id)
			}
			_self = this;
			_self.fetchPatientList()
			// 加载页面渲染血压的图表信息
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},

		onHide() {
			this.showCharts = false
			this.bp_list = []
			this.bp_categories = []
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		watch: {
			patient(newVal, oldVal) {
				// 切换病人时清空图表数据（重新渲染图表）
				console.log(newVal)
				console.log(oldVal)
				if(newVal.id != oldVal.id) {
					this.showCharts = false
				}
				this.bp_list = []
				this.bp_categories = []
				this.bo_list = []
				this.bo_categories = []
				_self.showLineA(this.chart)
				// updateData更新图表
				canvaLineA.updateData({
					categories: this.bo_categories,
					series: [{
						name: '血氧',
						data: this.bo_list
					}],
				})
				console.log('watch', this.showCharts)
			},
			deep: true
		},

		methods: {
			test(bpid, list) {
				this.showCharts = true
				if (bpid) {
					this.fetchPatientInfo(bpid)
					for (let i = 0; i < list.length; i++) {
						setTimeout(() => {
							let randomData = Math.random() * 300
							let timer = Math.random() * 300
							this.bp_list.push(randomData)
							this.bp_categories.push(timer)
							// console.log(this.bp_list)
							if (this.bp_list.length > 8) {
								this.bp_list.shift()
								this.bp_categories.shift()
							}
							
							// 初始化图表实例
							_self.showLineA(this.chart)
							// updateData更新图表
							canvaLineA.updateData({
								categories: _self.bp_categories,
								series: [{
									name: '血压',
									data: _self.bp_list
								}],
							})
						}, 1000 * i)
					}
				}
			},

			drawChart(pid, list) {
				this.showCharts = true
				console.log('drawChart',this.showCharts)
				if (pid) {
					this.fetchPatientInfo(pid)
					for (let i = 0; i < list.length; i++) {
						setTimeout(() => {
							this.bo_list.push(list[i].value)
							// console.log('this.bo_list', this.bo_list)
							let timer = list[i].time.substr(10, 1)
							// console.log(timer)
							this.bo_categories.push(timer)
							// console.log(this.bo_list.length)
							if (this.bo_list.length > 8) {
								this.bo_list.shift()
								this.bo_categories.shift()
							}
							// 初始化图表实例
							_self.showLineA(this.chart)
							// updateData更新图表
							canvaLineA.updateData({
								categories: this.bo_categories,
								series: [{
									name: '血氧',
									data: this.bo_list
								}],
							})
						}, 1000 * i)
					}
				}
			},
			// 图表配置
			showLineA(canvasId) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					colors: ['#24C789'],
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: '',
					series: [{
						name: '血压 血氧 血糖',
						data: ''
					}],
					animation: false,
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							axisLine: false,
						}],
						gridType: 'dash',
						gridColor: '#CCC',
						dashLength: 2,
						min: 0,
						max: 120,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'curve'
						}
					}
				});
			},
			// 获取血压、血氧、血糖数据
			async getData(type) {
				await uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/alarm/getHealthRow',
					data: {
						'type': type,
						'patient_id': this.pid,
						'start_time': this.start_time,
						'end_time': this.end_time
					},
					success: (res) => {
						if (res.data.code == 1) {
							console.log('开始获取血氧数据', res.data.data)
							this.data_list = res.data.data
							this.drawChart(this.pid, this.data_list)
							// this.test(this.pid, list)
						} else {
							uni.showToast({
								title: '请先选择患者',
								icon: 'none',
								duration: 2000
							})
						}
					}
				})
			},
			// 选择患者
			bindPickerChange(e) {
				// console.log(e)
				for (let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						this.pid = item.id
						this.fetchPatientInfo(item.id)
						// 把患者id缓存到本地
						uni.setStorage({
							key: 'bpid',
							data: item.id
						})

						// this.test(item.id)
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
			// 切换导航tab
			switchTab(index) {
				this.currentIndex = index
				// 切换导航改变对应的图表canvas-id
				this.chart = index + 1
				// 切换导航隐藏图表
				this.showCharts = false
				this.bp_list = []
				this.bp_categories = []
			},

			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},

			// 日期格式转时间戳
			dateToTimestamp(date) {
				let timestamp = new Date(date).getTime()
				return timestamp
			},

			// 时间戳转普通日期时间格式
			timestampToTime(timestamp) {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				return Y + M + D + h + m + s;
			},

			// 日期选择器1
			bindDateChange1(e) {
				this.date = e.target.value
				this.start_time = this.dateToTimestamp(this.date)
			},
			// 日期选择器2
			bindDateChange2(e) {
				this.date2 = e.target.value
				this.end_time = this.dateToTimestamp(this.date2)
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
		},
	}
</script>

<style lang="scss">
	@import '../../common/css/blood-status'
</style>
