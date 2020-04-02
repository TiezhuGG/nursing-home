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
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="1" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth" @click="bp_openBluetoothAdapter">连接蓝牙</button>
				<button class="collect-data">采集血压数据</button>
			</view>
		</view>


		<!-- 血氧 -->
		<view class="infos" v-show="currentIndex === 1">
			<!-- 平均值 -->
			<view class="wrap" style="padding-top: 20upx;">
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
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="2" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth" @click="bp_openBluetoothAdapter">连接蓝牙</button>
				<button class="collect-data">采集血氧数据</button>
			</view>
		</view>


		<!-- 血糖 -->
		<view class="infos" v-show="currentIndex === 2">
			<!-- 平均值 -->
			<view class="wrap" style="padding-top: 20upx;">
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
			<!-- 			<view class="qiun-columns">
				<view class="qiun-charts">
					<canvas canvas-id="3" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				</view>
			</view> -->
			<!-- 按钮 -->
			<view class="btn-two">
				<button class="get-bluetooth" @click="bp_openBluetoothAdapter">连接蓝牙</button>
				<button class="collect-data">采集血糖数据</button>
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
				pid: '',
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

				this_week: '6月7日-6月13日',
				avg_val_blood: '135/80',
				avg_val_time: 65,
			};
		},
		onLoad(options) {
			// console.log('options',options)
			// 从客户管理界面进来会传入pid
			if (options.pid) {
				this.fetchPatientInfo(options.pid)
			}
			this.fetchPatientList()
		},

		methods: {
			// 选择患者
			bindPickerChange(e) {
				// console.log(e)
				for (let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
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
				console.log('初始化蓝牙')
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
