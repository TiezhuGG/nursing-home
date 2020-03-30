<template>
	<view class="workbench">
		<!-- 用户信息 -->
		<view class="userinfos">
			<img class="avatar" :src="nurseInfo.avatar">
			<view class="infos">
				<text class="name">{{nurseInfo.name}}</text>
				<view class="job">
					<img class="medal" src="../../static/images/medal.png">
					<text class="job-title">护士</text>
				</view>
			</view>
		</view>

		<!-- 通知 -->
		<!-- 		<view class="notice">
			<block v-for="(item, index) in noticeList" :key="item.id">
				<view>
					<img class="notice-img" src="../../static/images/notice.png">
					<text class="notice-txt" @click="toNotice(item.id)">{{item.title}}</text>
				</view>
			</block>
		</view> -->
		<block v-for="(item, index) in noticeList" :key="item.id">
			<view class="notice">
				<img class="notice-img" src="../../static/images/notice.png">
				<text class="notice-txt" @click="toNotice(item.id)">{{item.title}}</text>
			</view>
		</block>

		<!-- 内容 -->
		<view class="main">
			<navigator class="item" url="../heart-rate/heart-rate">
				<img class="item-img" src="../../static/images/item-img1.png">
				<text class="item-txt">实时心率</text>
			</navigator>
			<navigator class="item" url="../heart-rate/heart-rate">
				<img class="item-img" src="../../static/images/item-img2.png">
				<text class="item-txt">心率回放</text>
			</navigator>
			<navigator class="item" url="../electrocardiogram/electrocardiogram">
				<img class="item-img" src="../../static/images/heart.png">
				<text class="item-txt">心电图</text>
			</navigator>
			<navigator class="item" url="../blood-status/blood-status">
				<img class="item-img" src="../../static/images/item-img4.png">
				<text class="item-txt">血压 血氧 血糖</text>
			</navigator>
			<navigator class="item" url="../video/video">
				<img class="item-img" src="../../static/images/item-img5.png">
				<text class="item-txt">视频监控</text>
			</navigator>
			<navigator class="item">
				<img class="item-img" src="../../static/images/item-img6.png">
				<text class="item-txt">起夜/摔倒警报</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nurseInfo: {},
				noticeList: [],
				isOpenBle: false,
				devicesList: [],
				deviceId: "67:95:69:F9:B3:C5",
				serviceId: '',
				primaryUUID: '',
				characteristicId: {
					writeId: '',
					notifyId: ''
				}
			}
		},
		onLoad() {
			this.nurseInfo = uni.getStorageSync('userInfo')
			this.fetchNoticeList()
			//在页面加载时初始化蓝牙适配器
			// this.initBluetoothAdapter()
		},

		methods: {
			// 初始化蓝牙适配器
			initBluetoothAdapter() {
				uni.openBluetoothAdapter({
					success: e => {
						console.log('初始化蓝牙成功', e.errMsg)
						this.isOpenBle = true;
						// 初始化完毕后搜索附近蓝牙设备
						this.searchBluetoothDevice()
					},
					fail: e => {
						console.log(`初始化蓝牙失败，错误码: (${e.errCode} || ${e.errMsg})`);
					},
				})
				// 同时监听蓝牙连接状态
				this.onBLEConnectionStateChange()
			},

			// 搜索附近蓝牙设备
			searchBluetoothDevice() {
				// 在页面显示的时候判断是否已经初始化完成蓝牙适配器，若成功，则开始查找设备
				setTimeout(() => {
					if (this.isOpenBle) {
						console.log("开始搜索附近蓝牙智能设备");
						uni.startBluetoothDevicesDiscovery({
							success: res => {
								this.findBluetoothDevice();
							},
							fail: res => {
								console.log("查找设备失败!");
								uni.showToast({
									icon: "none",
									title: "查找设备失败！",
									duration: 3000
								})
							}
						});
					} else {
						console.log(`未初始化蓝牙适配器, isOpenBle:${this.isOpenBle}`);
					}
				}, 1000);
			},

			// 发现蓝牙设备
			findBluetoothDevice() {
				console.log("监听寻找新设备");
				uni.onBluetoothDeviceFound(devices => {
					console.log('开始监听寻找到新设备的事件');
					this.getBleDevices();
				});
			},

			// 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
			getBleDevices() {
				console.log("获取蓝牙设备");
				uni.getBluetoothDevices({
					success: res => {
						console.log(res)
						console.log(`获取蓝牙设备成功: ${res.errMsg}`);
						this.devicesList = res.devices
						for (let item of this.devicesList) {
							// this.deviceId = item.deviceId
							// console.log('item.deviceId == this.deviceId',item.deviceId == this.deviceId)
							console.log(item.deviceId)
							if (item.deviceId == this.deviceId) {
								console.log(`找到蓝牙设备${item.deviceId}，开始连接~~~~~`)
								// 进行蓝牙连接
								setTimeout(() => {
									this.getConnectBlue()
								}, 1000)
								break
							}
							// console.log({
							// 	'index': this.devicesList.indexOf(item), 
							// 	'bluetooth': item,
							// 	'deviceId': this.deviceId
							// })
						}
					},
					fail: res => {
						console.log(`获取蓝牙设备失败: ${res.errMsg}`)
					}
				});
			},

			// 进行蓝牙连接
			getConnectBlue() {
				console.log(`${this.deviceId}蓝牙设备连接中`)
				uni.createBLEConnection({
					deviceId: this.deviceId,
					success: res => {
						console.log(`${this.deviceId}蓝牙设备连接成功`)
						// 成功连接蓝牙设备后获取该设备服务ID
						this.getBLEDeviceServices()
						// 成功连接蓝牙设备后停止搜索
						this.stopDiscovery()
					},
					fail: res => {
						console.log(`蓝牙设备连接失败`, res)
						uni.closeBLEConnection({
							deviceId: this.deviceId,
							success: res => {
								console.log('蓝牙设备连接断开, 正在重新连接')
								this.getConnectBlue()
							}
						})
					}
				})
			},

			// 获取蓝牙设备所有服务
			getBLEDeviceServices() {
				console.log(`正在获取蓝牙设备所有服务`)
				let serviceList = []
				uni.getBLEDeviceServices({
					deviceId: this.deviceId,
					success: res => {
						serviceList = res.services
						console.log(`获取蓝牙设备服务成功${JSON.stringify(res.services)}`)
						for (let service of serviceList) {
							console.log(`service--${service}---serviceId-${service.uuid}`)
							if (service.uuid.indexOf(this.primaryUUID) != -1) {
								this.serviceId = service.uuid
								console.log(`设备的serviceId${this.serviceId}`)
								// 开始获取指定服务的特征值
								this.getBLEDeviceCharacteristics()
								break
							}
						}
						this.getBLEDeviceCharacteristics()
					},
					fail: res => {
						console.log('device services:', res.services)
					}
				})
			},

			// 获取指定服务的特征值
			getBLEDeviceCharacteristics() {
				console.log(`开始获取服务特征值`)
				let characteristicsList = []
				uni.getBLEDeviceCharacteristics({
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					success: res => {
						console.log(`获取的${this.serviceId}服务的特征值${JSON.stringify(res.characteristics)}`)
						characteristicsList = res.characteristics
						for (let characteristic of characteristicsList) {
							console.log(`特征值${JSON.stringify(characteristic)}`)
							if (characteristic.properties.notify) {
								this.characteristicId.notifyId = characteristic.uuid
								console.log(`notifyId值为：${this.characteristicId.notifyId}`)
							}
							if (characteristic.properties.write) {
								this.characteristicId.writeId = characteristic.uuid
								console.log(`writeId值为：${this.characteristicId.writeId}`)
							}
						}
						// 订阅特征值
						// this.notify()
					}
				})
			},

			// 开始订阅特征值
			notify() {
				uni.notifyBLECharacteristicValueChange({
					state: true,
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					characteristicId: this.characteristicId.notifyId,
					success: res => {
						console.log(`订阅特征值${JSON.stringify(res)}`)
						uni.onBLECharacteristicValueChange(res => {
							console.log(`监听低功耗蓝牙设备的特征值变化事件${JSON.stringify(res)}`)
							console.log(`${res.characteristicId}变化, 现在是{$JSON.stringify(res.value)}`)
							let value = this.ab2hex(res.value)
							console.log(`value ---> ${value}`)
							
						})
					}
				})
			},

			// 停止搜索蓝牙设备(连接设备后调用)
			stopDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success: e => {
						console.log(`停止搜索蓝牙设备: ${e.errMsg}`);
					},
					fail: e => {
						console.log(`停止搜索蓝牙设备失败，错误码: ${e.errCode}`);
					}
				});
			},

			// 监听低功耗蓝牙连接状态的改变事件
			onBLEConnectionStateChange() {
				uni.onBLEConnectionStateChange(res => {
					console.log(`蓝牙连接状态${JSON.stringify(res)}`)
					if (!res.connected) {
						console.log('断开低功耗蓝牙成功~~')
						// 关闭蓝牙连接
						uni.closeBLEConnection({
							deviceId: this.deviceId,
							success: res => {
								console.log('关闭蓝牙模块')
							}
						})
					}
				})
			},

			// ArrayBuffer转16进度字符串
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			},


			// 跳转公告信息页
			toNotice(notice_id) {
				uni.navigateTo({
					url: `../notice/notice?id=${notice_id}`
				})
			},

			// 获取公告列表
			fetchNoticeList() {
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/notice/noticeList',
					success: res => {
						// console.log(res)
						this.noticeList = res.data.data
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.workbench {
		background-color: #F7F7F7;

		.userinfos {
			display: flex;
			width: 750upx;
			height: 322upx;
			background-color: #24C789;

			.avatar {
				width: 116upx;
				height: 116upx;
				margin: 60upx 30upx 0 44upx;
				border-radius: 50%;
				border: 7upx solid #fff;
			}

			.infos {
				display: flex;
				flex-direction: column;
				margin: 64upx 0;

				.name {
					margin-bottom: 26upx;
					font-size: 40upx;
					font-weight: 500;
					color: #fff;
				}

				.job {
					width: 116upx;
					height: 36upx;
					display: flex;
					align-items: center;
					background-color: #fff;
					border-radius: 200upx 200upx 200upx 200upx;

					.medal {
						width: 40upx;
						height: 40upx;
						margin-right: 10upx;
					}

					.job-title {
						font-size: 24upx;
						color: #333;
					}
				}
			}
		}

		.notice {
			width: 690upx;
			height: 88upx;
			display: flex;
			// flex-direction: column;
			align-items: center;
			margin-left: 30upx;
			padding: 10upx 0;
			position: absolute;
			top: 270upx;
			background-color: #fff;
			border-radius: 10upx;

			view {
				display: flex;
				align-items: center;
				margin: 5upx 0;
			}

			.notice-img {
				width: 30upx;
				height: 36upx;
				margin-left: 30upx;
			}

			.notice-txt {
				width: 560upx;
				margin-left: 32upx;
				font-size: 28upx;
				color: #666;
				font-family: PingFangSC-Regular, PingFang SC;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.main {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20upx;

			.item {
				width: 330upx;
				height: 360upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 30upx;
				margin-left: 30upx;
				background-color: #fff;
				box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
				border-radius: 10px;

				.item-img {
					width: 90upx;
					height: 90upx;
					margin-top: 80upx;
				}

				.item-txt {
					margin-top: 76upx;
					font-size: 34upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #564C5E;
					line-height: 34upx;
				}
			}

			.item:nth-child(1),
			.item:nth-child(2) {
				margin-top: 74upx;
			}

			.item:nth-child(5),
			.item:nth-child(6) {
				margin-bottom: 30upx;
			}
		}
	}
</style>
