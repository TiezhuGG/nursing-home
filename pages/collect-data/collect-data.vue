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
			<!-- 平均值 -->
			<view class="wrap" style="padding-top: 20upx;">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">高压</text>
						<text class="val">{{high_blood_pressure ? high_blood_pressure : ''}}</text>
						<text class="txt-bottom">mmHg</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">低压</text>
						<text class="val">{{low_blood_pressure ? low_blood_pressure : ''}}</text>
						<text class="txt-bottom">mmHg</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val">{{pressure_pulse_rate ? pressure_pulse_rate : ''}}</text>
						<text class="txt-bottom">bpm</text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="1" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth" @click="bp_openBluetoothAdapter">{{connected == 0 ? '连接蓝牙' : (connected == 1 ? '已连接' : '请重新连接')}}</button>
				<button class="collect-data" @click="saveData(1)">采集血压数据</button>
			</view>
		</view>


		<!-- 血氧 -->
		<view class="infos" v-show="currentIndex === 1">
			<!-- 平均值 -->
			<view class="wrap" style="padding-top: 20upx;">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">血氧饱和度</text>
						<text class="val">{{blood_oxygen ? blood_oxygen : ''}}</text>
						<text class="txt-bottom">%</text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val">{{oxygen_pulse_rate ? oxygen_pulse_rate : ''}}</text>
						<text class="txt-bottom">bpm</text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="2" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth" @click="bo_openBluetoothAdapter">{{connected == 0 ? '连接蓝牙' : (connected == 1 ? '已连接' : '请重新连接')}}</button>
				<button class="collect-data" @click="saveData(2)">采集血氧数据</button>
			</view>
		</view>


		<!-- 血糖 -->
		<view class="infos" v-show="currentIndex === 2">
			<!-- 平均值 -->
			<view class="wrap" style="padding-top: 20upx;">
				<view class="avg-info">
					<view class="avg-info-item">
						<text class="txt-top">平均血糖值</text>
						<text class="val"></text>
						<text class="txt-bottom"></text>
					</view>
					<view class="avg-info-item">
						<text class="txt-top">平均心率值</text>
						<text class="val"></text>
						<text class="txt-bottom"></text>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="3" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth">{{connected == 0 ? '连接蓝牙' : (connected == 1 ? '已连接' : '请重新连接')}}</button>
				<button class="collect-data" @click="saveData(3)">采集血糖数据</button>
			</view>
		</view>

	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';

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
				pid: '', // 当前患者id
				connected: 0, // 0: 未连接, 1: 已连接, 2: 重新连接
				// 血压参数
				bp_devices: [],
				bp_connected: false,
				bp_chs: [],
				bp_discoveryStarted: false,
				bp_canWrite: false,
				bp_deviceId: '',
				bp_serviceId: '',
				bp_characteristicId: '',
				blood_pressure: null,
				high_blood_pressure: 0, // 高压
				low_blood_pressure: 0, // 低压
				pressure_pulse_rate: 0, // 血压平均心率
				// 血氧参数
				bo_devices: [],
				bo_chs: [],
				bo_discoveryStarted: false,
				bo_canWrite: false,
				bo_deviceId: '',
				bo_serviceId: '',
				bo_characteristicId: '',
				blood_oxygen: 0, // 血压、血氧、血糖值
				oxygen_pulse_rate: 0, // 血氧平均心率
			};
		},
		onLoad(options) {
			// console.log('options',options)
			// 从客户管理界面进来会传入patient_id
			if (options.patient_id) {
				this.pid = options.patient_id
				this.fetchPatientInfo(options.patient_id)
			}
			this.fetchPatientList()
		},

		onUnload() {
			console.log('bb')
			this.bo_closeBluetoothAdapter()
			this.bp_closeBluetoothAdapter()
			this.connected = 0
		},

		watch: {
			patient(newVal, oldVal) {
				// 每次切换病人时关闭蓝牙模块, 之后再重新连接蓝牙进行采集数据
				if (oldVal != null) {
					console.log('cc')
					this.bo_closeBluetoothAdapter()
					this.bp_closeBluetoothAdapter()
					// 让按钮显示'连接蓝牙'
					this.connected = 0
				}
				// console.log(`newVal ${JSON.stringify(newVal)}, oldVal ${oldVal}`)
			}
		},

		methods: {
			// 选择患者
			bindPickerChange(e) {
				this.connected = 0
				// console.log(e)
				for (let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						this.pid = item.id
						this.fetchPatientInfo(item.id)
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
				// this.connected = 0
				uni.hideLoading()
			},

			// 获取当前时间戳
			getTimestamp() {
				let timestamp = new Date().getTime()
				return timestamp
			},

			// 血状态信息存储
			async saveData(type) {
				console.log('采集数据，connected', this.connected)
				if (this.connected !== 2 && (this.blood_oxygen !== 0 || this.high_blood_pressure !== 0)) {
					// 采集数据后断开蓝牙连接（让connected === 2,只能存储一次数据）
					this.bo_closeBluetoothAdapter()
					// 通过判断type的值存储血压、血氧或血糖的数据
					if (type === 1) {
						await uni.request({
							url: 'https://ciai.le-cx.com/index.php/api/alarm/putHealthRow',
							data: {
								'type': type,
								'value': JSON.stringify(this.blood_pressure),
								'patient_id': this.pid,
								'pulse_rate': this.pressure_pulse_rate,
								'timestamp': this.getTimestamp()
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							success(res) {
								uni.showToast({
									title: '血压数据采集成功',
									icon: 'none',
									duration: 3000
								})
								console.log('血压数据存储成功', res)
							}
						})
					} else if (type === 2) {
						await uni.request({
							url: 'https://ciai.le-cx.com/index.php/api/alarm/putHealthRow',
							data: {
								'type': type,
								'value': this.blood_oxygen,
								'patient_id': this.pid,
								'pulse_rate': this.pulse_rate,
								'timestamp': this.getTimestamp()
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							success(res) {
								uni.showToast({
									title: '血氧数据采集成功',
									icon: 'none',
									duration: 3000
								})
								console.log('血氧数据存储成功', res)
							}
						})
					}
				} else {
					if (type === 1) {
						uni.showToast({
							title: `请先连接血压计蓝牙`,
							icon: 'none',
							duration: 3000
						})
					} else if (type === 2) {
						uni.showToast({
							title: `请先连接血氧仪蓝牙`,
							icon: 'none',
							duration: 3000
						})
					} else {
						uni.showToast({
							title: `请先连接血糖仪蓝牙`,
							icon: 'none',
							duration: 3000
						})
					}
				}
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

			// 血压计
			bp_openBluetoothAdapter() {
				this.bp_discoveryStarted = false
				console.log('初始化血压计蓝牙')
				uni.openBluetoothAdapter({
					success: (res) => {
						console.log('openBluetoothAdapter success', res)
						this.bp_startBluetoothDevicesDiscovery()
					},
					fail: (res) => {
						if (res.errCode === 10001) {
							uni.onBluetoothAdapterStateChange((res) => {
								console.log('onBluetoothAdapterStateChange', res)
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
					uni.showLoading({
						title: '正在连接蓝牙...'
					})
				console.log('开始查找蓝牙设备')
				uni.onBluetoothDeviceFound((res) => {
					this.bp_getBluetoothDevices()
					// var bp_devices = res.devices
					// console.log('devices', bp_devices[0].name)
					// if (bp_devices[0].name == 'FSRKB_BT-001') {
					// 	uni.hideLoading()
					// 	let e = bp_devices[0]
					// 	this.bp_createBLEConnection(e)
					// } else {
					// 	uni.showLoading({
					// 		title: '正在连接蓝牙...'
					// 	})
					// 	if (this.connected === 1) {
					// 		uni.hideLoading()
					// 	} else {
					// 		setTimeout(() => {
					// 			// this.connected = 2
					// 			uni.hideLoading()
					// 		}, 5000)
					// 	}
					// }
				})
			},

			// 获取所有蓝牙设备
			bp_getBluetoothDevices() {
				let that = this
				uni.getBluetoothDevices({
					success(res) {
						console.log('获取蓝牙所有设备', res)
						var bp_devices = res.devices
						for (let item of bp_devices) {
							if (item.name == 'FSRKB_BT-001') {
								uni.hideLoading()
								let e = item
								that.bp_createBLEConnection(e)
							} 
						}
					}
				})
			},

			bp_stopBluetoothDevicesDiscovery() {
				this.bp_discoveryStarted = false
				uni.stopBluetoothDevicesDiscovery()
			},

			bp_createBLEConnection(e) {
				// const ds = e.currentTarget.dataset
				this.bp_stopBluetoothDevicesDiscovery()
				console.log('开始连接蓝牙~~~')
				const deviceId = e.deviceId
				const name = e.name
				uni.createBLEConnection({
					deviceId,
					success: (res) => {
						uni.hideLoading()
						console.log('连接血压计成功')
						this.connected = 1
						this.bp_getBLEDeviceServices(deviceId)
					}
				})
			},
			// bp_closeBLEConnection() {
			// 	uni.closeBLEConnection({
			// 		deviceId: this.bp_deviceId
			// 	})
			// 	this.bp_connected = false
			// 	this.bp_chs: []
			// 	this.bp_canWrite = false
			// },

			bp_getBLEDeviceServices(deviceId) {
				console.log('获取血压计的所有服务')
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
				console.log('获取血压计的特征值')
				uni.getBLEDeviceCharacteristics({
					deviceId,
					serviceId,
					success: (res) => {
						// console.log('getBLEDeviceCharacteristics success', res.characteristics)
						for (let i = 0; i < res.characteristics.length; i++) {
							let item = res.characteristics[i]
							if (item.uuid == '0000FFF6-0000-1000-8000-00805F9B34FB') {
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
					let vale = this.ab2hex(characteristic.value)
					if (vale.substr(6, 2) == 'cc' && this.connected != 2) { //判断是否测量结束，结束则进入
						if (vale.substr(10, 2) == '00') { //判断是否错误，错误则进入
							switch (parseInt(vale.substr(8, 2), 16)) {
								case 1:
									console.log('传感器异常！')
									// 断开蓝牙连接
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '传感器异常！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 2:
									console.log('不足以检测心跳或血压！')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '不足以检测心跳或血压！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 3:
									console.log('异常测量结果！')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '异常测量结果！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 4:
									console.log('袖口太松或泄漏（10秒压力小于30毫米）')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '袖口太松或泄漏（10秒压力小于30毫米）！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 5:
									console.log('气管堵塞')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '气管堵塞！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 6:
									console.log('压力波动过大')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '压力波动过大！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 7:
									console.log('压力超过上限')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '压力超过上限！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
								case 8:
									console.log('请查看标准数据是否异常')
									uni.closeBluetoothAdapter({
										success: () => {
											this.connected = 2
											uni.showToast({
												title: '请查看标准数据是否异常！',
												icon: 'none',
												duration: 3000
											})
										}
									})
									break
							}
						} else { //输出测量结果
							uni.hideLoading()
							if (parseInt(vale.substr(8, 2), 16) && parseInt(vale.substr(10, 2), 16)) {
								// 高压
								this.high_blood_pressure = parseInt(vale.substr(8, 2), 16)
								// 低压
								this.low_blood_pressure = parseInt(vale.substr(10, 2), 16)
								this.blood_pressure = {
									'high_blood_pressure': this.high_blood_pressure,
									'low_blood_pressure': this.low_blood_pressure,
								}

								console.log('最终血压为:', this.blood_pressure, JSON.stringify(this.blood_pressure))
								this.pressure_pulse_rate = parseInt(vale.substr(12, 2), 16)
							}
							console.log('高压：', this.high_blood_pressure,
								'低压：', this.low_blood_pressure,
								'心率', parseInt(vale.substr(12, 2), 16))
							console.log('高压：', parseInt(vale.substr(8, 2), 16),
								'低压：', parseInt(vale.substr(10, 2), 16),
								'心率', parseInt(vale.substr(12, 2), 16))

						}
					} else { //输出当前压力值
						uni.hideLoading()
						console.log('当前压力：', parseInt(vale.substr(10, 2), 16))
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
				this.connected = 2
				this.bp_discoveryStarted = false
				uni.closeBluetoothAdapter({
					success() {
						uni.hideLoading()
						console.log('关闭蓝牙设备')
					}
				})
			},

			// 血氧仪
			// 初始化蓝牙模块
			bo_openBluetoothAdapter() {
				this.bo_discoveryStarted = false
				console.log('初始化蓝牙模块，进行血氧仪连接')
				uni.openBluetoothAdapter({
					success: (res) => {
						console.log('openBluetoothAdapter success', res)
						this.bo_startBluetoothDevicesDiscovery()
					},
					fail: (res) => {
						if (res.errCode === 10001) {
							console.log('用户蓝牙未开启或者手机不支持蓝牙功能')
							// 监听手机蓝牙状态
							uni.onBluetoothAdapterStateChange(function(res) {
								console.log('onBluetoothAdapterStateChange监听手机蓝牙状态', res)
								if (res.available) {
									this.bo_startBluetoothDevicesDiscovery()
								}
							})
						}
					}
				})
			},

			// 开始搜寻附近的蓝牙设备
			bo_startBluetoothDevicesDiscovery() {
				console.log('this.bo_discoveryStarted', this.bo_discoveryStarted)
				// 通过bo_discoveryStarted判断是否开启蓝牙设备搜索
				if (this.bo_discoveryStarted) {
					return
				}
				this.bo_discoveryStarted = true
				uni.startBluetoothDevicesDiscovery({
					// 允许重复上报同一设备
					// allowDuplicatesKey: true,
					success: (res) => {
						console.log('startBluetoothDevicesDiscovery success', res)
						this.bo_onBluetoothDeviceFound()
					},
					fail: () => {
						uni.showModal({
							titile: '提示',
							content: '未搜索到蓝牙设备'
						})
					}
				})
			},

			// 监听寻找到新设备的事件
			bo_onBluetoothDeviceFound() {
				uni.onBluetoothDeviceFound((res) => {
					uni.showLoading({
						title: '正在连接蓝牙...'
					})
					console.log('onBluetoothDeviceFound success', res)
					this.bo_getBluetoothDevices()
					// var bo_devices = res.devices
					// if (bo_devices[0].name == 'Samo4 pulse oximeter') {
					// 	uni.hideLoading()
					// 	let e = bo_devices[0]
					// 	this.bo_createBLEConnection(e)
					// } else {
					// 	// 停止搜索蓝牙设备
					// 	// this.bo_stopBluetoothDevicesDiscovery()
					// 	uni.showLoading({
					// 		title: '正在连接蓝牙...'
					// 	})
					// 	if (this.connected === 1) {
					// 		uni.hideLoading()
					// 	} else {
					// 		setTimeout(() => {
					// 			// this.connected = 2
					// 			uni.hideLoading()
					// 		}, 5000)
					// 	}
					// }
				})
			},

			// 获取所有蓝牙设备
			bo_getBluetoothDevices() {
				let that = this
				uni.getBluetoothDevices({
					success(res) {
						console.log('获取蓝牙所有设备', res)
						var bo_devices = res.devices
						for (let item of bo_devices) {
							if (item.name == 'Samo4 pulse oximeter') {
								let e = item
								that.bo_createBLEConnection(e)
							}
						}
					}
				})
			},

			// 连接低功耗蓝牙设备
			bo_createBLEConnection(e) {
				console.log('开始连接蓝牙~~~')
				const deviceId = e.deviceId
				const name = e.name
				uni.createBLEConnection({
					deviceId,
					success: (res) => {
						uni.hideLoading()
						console.log('连接蓝牙成功')
						this.connected = 1
						this.bo_getBLEDeviceServices(deviceId)
						// 停止搜索蓝牙
						this.bo_stopBluetoothDevicesDiscovery()
					}
				})
			},

			// 停止搜索附近的蓝牙设备
			bo_stopBluetoothDevicesDiscovery() {
				console.log('停止搜索蓝牙设备')
				this.bo_discoveryStarted = false
				uni.stopBluetoothDevicesDiscovery()
			},

			// 获取蓝牙设备所有服务
			bo_getBLEDeviceServices(deviceId) {
				console.log('获取血氧仪的所有服务')
				uni.getBLEDeviceServices({
					deviceId,
					success: (res) => {
						for (let i = 0; i < res.services.length; i++) {
							console.log('血氧仪的所有服务', res.services[i])
							if (res.services[i].uuid == '0000FFF0-0000-1000-8000-00805F9B34FB') {
								this.bo_getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
								return
							}
						}
					}
				})
			},

			// 获取蓝牙设备某个服务中所有特征值
			bo_getBLEDeviceCharacteristics(deviceId, serviceId) {
				console.log('获取血氧仪的特征值')
				uni.getBLEDeviceCharacteristics({
					deviceId,
					serviceId,
					success: (res) => {
						for (let i = 0; i < res.characteristics.length; i++) {
							let item = res.characteristics[i]
							console.log('血氧仪某个服务的特征值', item)
							if (item.uuid == '0000FFF4-0000-1000-8000-00805F9B34FB') {
								this.bo_canWrite = true
								this.bo_deviceId = deviceId
								this.bo_serviceId = serviceId
								this.bo_characteristicId = item.uuid
								this.bo_writeBLECharacteristicValue()
								// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
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

				// 监听低功耗蓝牙设备的特征值变化事件，(操作之前先监听，保证第一时间获取数据)
				uni.onBLECharacteristicValueChange((characteristic) => {
					let vale = this.ab2hex(characteristic.value)
					if (vale.substr(20, 2) == 1 && this.connected != 2) { //判断是否戴好
						console.log('未戴好！')
						// 断开蓝牙连接
						uni.closeBluetoothAdapter({
							success: () => {
								this.connected = 2
								uni.showToast({
									title: '请检查是否佩戴血氧仪',
									icon: 'none',
									duration: 3000
								})
							}
						})
					} else {
						uni.hideLoading()
						this.blood_oxygen = parseInt(vale.substr(16, 2), 16)
						this.oxygen_pulse_rate = parseInt(vale.substr(18, 2), 16)
						console.log(`当前血氧饱和度: ${this.blood_oxygen},  脉率值${this.oxygen_pulse_rate}`)
						// console.log('当前血氧含量为：', parseInt(vale.substr(16, 2), 16), '脉率值:', parseInt(vale.substr(18, 2), 16)) //输出当前血氧饱和度,脉率值
					}
				})
			},

			// 发送二进制数据
			bo_writeBLECharacteristicValue() {
				let buffer = new ArrayBuffer(1)
				let dataView = new DataView(buffer)
				console.log(`buffer是${this.buffer}, dataView是${this.dataView}`)
				dataView.setUint8(0, 0)
				uni.writeBLECharacteristicValue({
					deviceId: this.bo_deviceId,
					serviceId: this.bo_serviceId,
					characteristicId: this.bo_characteristicId,
					value: buffer,
				})
			},

			// 关闭蓝牙模块
			bo_closeBluetoothAdapter() {
				this.connected = 2
				this.bo_discoveryStarted = false
				uni.closeBluetoothAdapter({
					success() {
						uni.hideLoading()
						console.log('关闭蓝牙设备')
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	@import '../../common/css/blood-status';

	.btn-two {
		display: flex;
		margin-top: 100upx;

		.get-bluetooth {
			position: fixed;
			width: 300upx;
			top: 90%;
			left: 50upx;
			color: #24C789;
			background-color: #fff;
			border: 1upx solid #24C789;
		}

		.collect-data {
			position: fixed;
			width: 300upx;
			top: 90%;
			left: 400upx;
			background-color: #24C789;
			color: #fff;
			border: none;
		}
	}
</style>
