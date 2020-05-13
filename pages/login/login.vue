<template>
	<view class="login">
		<text class="txt">登录账号</text>
		<view class="input">
			<view class="account">
				<input 
				class="account-input" 
				type="text" 
				placeholder-class="account-placeholder" 
				placeholder="请输入您的手机号"
				v-model="user_phone">
				<img 
				class="off" 
				src="../../static/images/off.png" 
				v-show="user_phone !== ''"  
				@click="clearAccount">
			</view>
			<view class="password">
				<input 
				class="password-input" 
				:type="change_type" 
				placeholder-class="password-placeholder" 
				placeholder="请输入您的密码"
				v-model="user_pwd"
				>
				<img 
				class="change-status" 
				src="../../static/images/hidden.png" 
				v-show="user_pwd !== '' && change_type === 'password'" 
				@click="changeStatus">
				<img 
				class="change-status" 
				src="../../static/images/show.png" 
				v-show="user_pwd !== '' && change_type === 'text'" 
				@click="changeStatus">
			</view>
		</view>
		<button class="btn" @click="sign_in">登 录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_phone: '',
				user_pwd: '',
				change_type: 'password'
			};
		},
		// onShow() {
		// 	uni.hideHomeButton()
		// },
		methods: {
			clearAccount() {
				this.user_phone = ''
			},
			changeStatus() {
				this.change_type = this.change_type === 'password' ? 'text' : 'password'
			},
			sign_in() {
				if(this.user_phone.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入账号'
					})
					return
				}
				if(this.user_pwd.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					}) 
					return
				}
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/nurse/login',
					data: {
						account: this.user_phone,
						password: this.user_pwd
					},
					success: res => {
						// console.log(res.data)
						if(res.data.code !== 1) {
							uni.showToast({
								icon: 'none',
								title: '登录失败，账号或者密码错误'
							})
						} else {
							uni.showToast({
								icon: 'success',
								title: res.data.msg,
								duration: 2000
							})
							// 保存userInfo到本地并进行登录跳转
							uni.setStorage({
								key: 'userInfo',
								data: res.data.data
							})
							uni.switchTab({
								url: '../workbench/workbench'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 750upx;
		height: 680upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.txt {
			margin-top: 40upx;
			margin-left: 40upx;
			font-size: 44upx;
			color: #333;
			line-height: 44upx;
		}
		.input {
			.account {
				display: flex;
				justify-content: space-between;
				.account-input {
					position: relative;
					width: 670upx;
					margin-left: 40upx;
					padding-bottom: 40upx;
					font-size: 32upx;
					color: #333;
					border-bottom: 1upx solid #E6E6E6;
				}
				.account-placeholder {
					font-size: 30upx;
					color: #B4B4B4;
				}
				.off {
					position: absolute;
					margin-top: 10upx;
					right: 40upx;
					width: 34upx;
					height: 34upx;
					z-index: 10;
				}
			}
			.password {
				display: flex;
				justify-content: space-between;
				.password-input {
					position: relative;
					width: 670upx;
					margin-top: 62upx;
					margin-left: 40upx;
					padding-bottom: 40upx;
					font-size: 32upx;
					color: #333;
					border-bottom: 1upx solid #E6E6E6;
				}
				.password-placeholder {
					font-size: 30upx;
					color: #B4B4B4;
				}
				.change-status {
					position: absolute;
					margin-top: 72upx;
					right: 40upx;
					width: 34upx;
					height: 34upx;
					z-index: 10;
				}
			}
		}
		.btn {
			width: 670upx;
			height: 88upx;
			text-align: center;
			line-height: 88upx;
			margin-left: 40upx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			font-size: 32upx;
			color: #fff;
			background: #24C789;
			border-radius: 6px;
		}
	}
</style>
