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
				<view class="this-week">
					选择时间:{{this_week}}
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
				<view class="qiun-charts">
					<canvas canvas-id="1" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getServerData(currentIndex + 1)">获取血压信息</button>
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
					选择时间:{{this_week}}
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
				<view class="qiun-charts">
					<canvas canvas-id="2" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getServerData(currentIndex + 1)">获取血氧信息</button>
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
					选择时间:{{this_week}}
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
				<view class="qiun-charts">
					<canvas canvas-id="3" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="btn">
				<button class="get-msg" @click="getServerData(currentIndex + 1)">获取血糖信息</button>
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
			return {
				navTitles: ['血压', '血氧', '血糖'],
				currentIndex: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				patientList: [],
				patient: null,
				chart: 1,
				// heart_rate_list: [],
				// categories: [],
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
			// console.log('bpid',options.bpid)
			// 从工作台进页面有患者id就执行
			if(options.bpid) {
				console.log('从工作台进来',options.bpid)
				this.test(options.bpid)
			}
			// 从客户管理界面进来会传入patient_id
			if(options.patient_id) {
				console.log('从客户管理界面进来',options.patient_id)
				this.fetchPatientInfo(options.patient_id)
				this.test(options.patient_id)
			}
			_self = this;
			_self.fetchPatientList()
			// 加载页面渲染血压的图表信息
			// this.getServerData(1);
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},

		watch: {
			patient(newVal, oldVal) {
				// console.log(newVal)
				// console.log(oldVal)
				// 切换病人时清空图表数据（重新渲染图表）
				this.bp_list = []
				this.bp_categories = []
				if (oldVal != null) {
					canvaLineA.updateData({
						categories: this.bp_categories,
						series: [{
							name: '实时心率',
							data: this.bp_list
						}],
					})
				}
			},
			deep: true
		},

		methods: {
			test(bpid) {
				this.fetchPatientInfo(bpid)
				setInterval(() => {
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
						categories: this.bp_categories,
						series: [{
							name: '血压 ',
							data: _self.bp_list
						}],
					})
				}, 1500)

			},
			
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
						name: '实时心率',
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
						min: 0.00,
						max: 150.00,
						format: (val) => {
							return val.toFixed(0.00)
						}
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

			bindPickerChange(e) {
				// console.log(e)
				for (let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						// this.fetchPatientInfo(item.id)
						// 把患者id缓存到本地
						uni.setStorage({
							key: 'bpid',
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
			// 切换导航tab
			switchTab(index) {
				this.currentIndex = index
				// 切换导航改变对应的图表canvas-id
				this.chart = index + 1
				// this.getServerData(this.currentIndex + 1)
			},

			getServerData(canvasId) {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						// console.log(res.data.data)
						let LineA = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories = res.data.data.LineA.categories;
						// LineA.series = res.data.data.LineA.series;
						// LineA.series = res.data.data.LineA.series;
						// LineA.series = [LineA.series.pop()];
						// console.log(LineA.series)
						LineA.series = [{
							data: [0, 100, 70, 20, 100, 50],
							name: 'aa'
						}]
						_self.showLineA(canvasId, LineA);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			
			inArray(arr, key, val) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i][key] === val) {
						return i;
					}
				}
				return -1;
			},

			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
				var hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('');
			},

			bp_openBluetoothAdapter() {
				console.log('获取血压信息')
				uni.openBluetoothAdapter({
					success: (res) => {
						console.log('openBluetoothAdapter success', res)
						this.bp_startBluetoothDevicesDiscovery()
					},
					fail: (res) => {
						if (res.errCode === 10001) {
							uni.onBluetoothAdapterStateChange((res) => {
								// console.log('onBluetoothAdapterStateChange', res)
								if (res.available) {
									this.bp_startBluetoothDevicesDiscovery()
								}
							})
						}
					}
				})
			},
			bp_startBluetoothDevicesDiscovery() {
				if (this.bp_discoveryStarted) {
					return
				}
				this.bp_discoveryStarted = true
				uni.startBluetoothDevicesDiscovery({
					allowDuplicatesKey: true,
					success: (res) => {
						console.log('startBluetoothDevicesDiscovery success', res)
						this.bp_onBluetoothDeviceFound()
					},
				})
			},
			bp_getBluetoothAdapterState() {
				console.log('getBluetoothAdapterState')
				uni.getBluetoothAdapterState({
					success: (res) => {
						console.log('getBluetoothAdapterState', res)
						if (res.discovering) {
							this.bp_onBluetoothDeviceFound()
						} else if (res.available) {
							this.bp_startBluetoothDevicesDiscovery()
						}
					}
				})
			},
			bp_onBluetoothDeviceFound() {
				uni.onBluetoothDeviceFound((res) => {
					var devices = res.devices
					console.log('devices', devices)
					if (devices[0].name == 'FSRKB_BT_001') {
						let e = devices[0]
						this.bp_createBLEConnection(e)
					}
				})
			},
			bp_stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery()
			},

			bp_createBLEConnection(e) {
				// const ds = e.currentTarget.dataset
				const deviceId = e.deviceId
				const name = e.name
				uni.createBLEConnection({
					deviceId,
					success: (res) => {
						this.bp_connected = true
						// this.setData({
						// 	connected: true,
						// 	name,
						// 	deviceId,
						// })
						this.bp_getBLEDeviceServices(deviceId)
					}
				})
				this.bp_stopBluetoothDevicesDiscovery()
			},
			bp_closeBLEConnection() {
				uni.closeBLEConnection({
					deviceId: this.data.deviceId
				})
				this.setData({
					connected: false,
					chs: [],
					canWrite: false,
				})
			},
			bp_getBLEDeviceServices(deviceId) {
				uni.getBLEDeviceServices({
					deviceId,
					success: (res) => {
						for (let i = 0; i < res.services.length; i++) {
							if (res.services[i].uuid == '0000FFF0-0000-1000-8000-00805F9B34FB') {
								this.bp_getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
								return
							}
						}
					}
				})
			},
			bp_getBLEDeviceCharacteristics(deviceId, serviceId) {
				uni.getBLEDeviceCharacteristics({
					deviceId,
					serviceId,
					success: (res) => {
						// console.log('getBLEDeviceCharacteristics success', res.characteristics)
						for (let i = 0; i < res.characteristics.length; i++) {
							let item = res.characteristics[i]
							if (item.uuid == '0000FFF6-0000-1000-8000-00805F9B34FB') {
								// this.setData({
								// 	bp_canWrite: true
								// })
								this.bp_canWrite = true
								this.bp_deviceId = deviceId
								this.bp_serviceId = serviceId
								this.bp_characteristicId = item.uuid
								this.bp_writeBLECharacteristicValue()

								uni.notifyBLECharacteristicValueChange({
									deviceId,
									serviceId,
									characteristicId: item.uuid,
									state: true,
								})
							}
						}
					},
					fail(res) {
						console.error('getBLEDeviceCharacteristics', res)
					}
				})
				// 操作之前先监听，保证第一时间获取数据
				uni.onBLECharacteristicValueChange((characteristic) => {
					let vale = ab2hex(characteristic.value)
					if (vale.substr(6, 2) == 'cc') { //判断是否测量结束，结束则进入
						if (vale.substr(10, 2) == '00') { //判断是否错误，错误则进入
							switch (parseInt(vale.substr(8, 2), 16)) {
								case 1:
									console.log('传感器异常！')
									break

								case 2:
									console.log('不足以检测心跳或血压！')
									break

								case 3:
									console.log('异常测量结果！')
									break

								case 4:
									console.log('袖口太松或泄漏（10秒压力小于30毫米）')
									break

								case 5:
									console.log('气管堵塞')
									break

								case 6:
									console.log('压力波动过大')
									break

								case 7:
									console.log('压力超过上限')
									break

								case 8:
									console.log('请查看标准数据是否异常')
									break
							}
						} else { //输出测量结果
							console.log('高压：', parseInt(vale.substr(8, 2), 16), '低压：', parseInt(vale.substr(10, 2), 16), '心率',
								parseInt(
									vale.substr(12, 2), 16))
						}
					} else { //输出当前压力值
						console.log('当前压力：', parseInt(vale.substr(10, 2), 16))
					// 	let bp_value = parseInt(vale.substr(10, 2), 16)
					// 	let timer = this.getNowTime()
					// 	this.bp_list.push(bp_value)
					// 	this.bp_categories.push(timer)
					// 	if (this.bp_list.length > 8) {
					// 		this.bp_list.shift()
					// 		this.bp_categories.shift()
					// 	}
					// 	_self.showLineA("charts")
					// 	// updateData更新图表
					// 	canvaLineA.updateData({
					// 		categories: this.bp_categories,
					// 		series: [{
					// 			name: '血压/血氧/血糖',
					// 			data: _self.bp_list
					// 		}],
					// 	})
					}
				})
			},
			bp_writeBLECharacteristicValue() {
				let sz = [0xBE, 0xB0, 0x01, 0xc0, 0x36]
				let buffer = new ArrayBuffer(5)
				let dataView = new DataView(buffer)

				for (let i = 0; i < 5; i++) {
					dataView.setUint8(i, sz[i])
				}
				console.log(buffer)
				uni.writeBLECharacteristicValue({
					deviceId: this.bp_deviceId,
					serviceId: this.bp_serviceId,
					characteristicId: this.bp_characteristicId,
					value: buffer,
				})
			},
			bp_closeBluetoothAdapter() {
				uni.closeBluetoothAdapter()
				this.bp_discoveryStarted = false
			},
			// 获取当前时间
			getNowTime() {
				let now = new Date()
				let hour = now.getHours()
				let minute = now.getMinutes()
				let second = now.getSeconds()
				hour = hour < 10 ? '0' + hour : hour
				minute = minute < 10 ? '0' + minute : minute
				second = second < 10 ? '0' + second : second
				let now_time = `${hour}:${minute}:${second}`
				return now_time
			},
		},
	}
</script>

<style lang="scss">
	@import '../../common/css/blood-status'
</style>
