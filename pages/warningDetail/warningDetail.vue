<template>
	<view class="warningDetail">
		<view class="warning">
			<view>
				<text>起夜报警</text>
				<switch :checked="checked1" @change="switch1Change" />
			</view>
			<view>
				<text>摔倒报警</text>
				<switch :checked="checked2" @change="switch2Change" />
			</view>
		</view>
		<!-- 		<view class="heart-warning">
			<view class="picker-wrap">
				<view class="no-info" v-if="!patient">请选择患者</view>
				<view class="no-info" v-if="patient">{{ patient.name }}</view>
				<picker mode="selector" :range="patientList" @change="bindPickerChange" range-key="name">
					<view><img class="more" src="../../static/images/more.png"></view>
				</picker>
			</view>
			<view class='high'>
				<text>最高心率值:</text>
				<input v-model="max_value"></input>
			</view>
			<view class='low'>
				<text>最低心率值:</text>
				<input v-model="min_value"></input>
			</view>
			<button class="btn">提交</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patientList: [],
				patient: null,
				max_value: null,
				min_value: null,
				checked1: null,
				checked2: false,
			}
		},
		created() {
			this.initStatus()
			this.fetchPatientList()
		},
		methods: {
			// 选择患者
			bindPickerChange(e) {
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
						this.max_value = this.patient.alarm_max_value
						this.min_value = this.patient.alarm_min_value
					},
				})
			},
			// 初始化报警状态
			initStatus() {
				uni.request({
					url: 'https://ciaiky.le-cx.com/php/qykg_zt.php',
					method: 'POST',
					success: res => {
						console.log('起夜报警状态', res.data.qykg)
						if(res.data.qykg === 'up') {
							this.checked1 = true
						} else {
							this.checked1 = false
						}
					}
				})
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				if(this.checked1) {
					uni.request({
						url: 'https://ciaiky.le-cx.com/php/bjsz_qy_false.php',
						method: 'POST',
						success: res => {
							this.checked1 = false
							console.log('关闭起夜报警', res)
							console.log(this.checked1)
						}
					})
				} else {
					uni.request({
						url: 'https://ciaiky.le-cx.com/php/bjsz_qy_true.php',
						method: 'POST',
						success: res => {
							this.checked1 = true
							console.log('打开起夜报警', res)
							console.log(this.checked1)
						}
					})
				}
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},

		}
	}
</script>

<style lang="scss">
	.warningDetail {
		height: 100vh;
		background-color: #f7f7f7;

		.warning {
			display: flex;
			flex-direction: column;
			align-items: center;

			view {
				width: 90%;
				height: 120upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20upx;
				margin-bottom: 20upx;
				background-color: #fff;
				padding: 0 20upx;
				font-size: 36rpx;
				border-radius: 30rpx;
			}
		}

		.heart-warning {
			width: 90%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 36rpx;
			margin-top: 20upx;
			padding: 0 20upx;
			margin-left: 18rpx;
			background-color: #fff;
			border-radius: 30upx;

			.picker-wrap {
				display: flex;
				margin-top: 30upx;

				.more {
					width: 36upx;
					height: 24upx;
				}
			}
		}

		.high,
		.low {
			display: flex;
			align-items: center;
			margin-left: 55upx;
			margin-top: 40upx;

			input {
				width: 200upx;
				height: 60upx;
				margin-left: 30upx;
				font-size: 30upx;
				text-align: center;
				background-color: #f7f7f7;
				// border-bottom: 1upx solid #24C789;
				border-radius: 10upx;
			}
		}

		.low {
			margin-bottom: 30upx;
		}

		.btn {
			width: 150upx;
			height: 70upx;
			line-height: 70upx;
			font-size: 30upx;
			margin-bottom: 30upx;
			background-color: #f7f7f7;
		}
	}
</style>
