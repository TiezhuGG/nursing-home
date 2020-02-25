<template>
	<view class="login">
		<text class="txt">登录账号</text>
		<view class="input">
			<view class="account">
				<input 
				class="account-input" 
				type="text" 
				maxlength="11"
				placeholder-class="account-placeholder" 
				placeholder="请输入您的手机号"
				v-model="user_phone">
				<img 
				class="off" 
				src="../../static/images/off.png" 
				v-show="user_phone !== null"  
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
				v-show="user_pwd !== null && change_type === 'password'" 
				@click="changeStatus">
				<img 
				class="change-status" 
				src="../../static/images/show.png" 
				v-show="user_pwd !== null && change_type === 'text'" 
				@click="changeStatus">
			</view>
		</view>
		<button class="btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">登 录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_phone: null,
				user_pwd: null,
				change_type: 'password'
			};
		},
		methods: {
			clearAccount() {
				this.user_phone = null
			},
			changeStatus() {
				this.change_type = this.change_type === 'password' ? 'text' : 'password'
			},
			bindGetUserInfo(e) {
				console.log(e)
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
