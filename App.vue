<script>
	export default {
		methods: {
			hasLogin() {
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo) {
					uni.switchTab({
						url: 'pages/workbench/workbench'
					})
				} else {
					uni.reLaunch({
						url: 'pages/login/login'
					})
					uni.hideHomeButton()
				}
			},
		},
		onLaunch: function() {
		},
		onShow: function() {
			this.hasLogin()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/css/reset.css'

	body {
		font-family: PingFangSC-Regular, PingFang SC;
	}
</style>
