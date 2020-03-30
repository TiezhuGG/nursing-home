<template>
	<view class="personal">
		<view class="top">
			<view class="user-pic">
				<image :src="patient_info.avatar" />
			</view>
			<view class="user-box">
				<view class="user-top">
					<text class="user-name">{{patient_info.name}}</text>
					<text class="user-age">/{{patient_info.age}}岁</text>
				</view>
				<view class="user-down">
					<text class="nurse">专属护士： {{patient_info.nurse_name}}</text>
				</view>
			</view>
		</view>
		<view class="space"></view>
		<view class="user-detail">
			<view class="id-number">身份证号码：{{patient_info.idcord}}</view>
			<view class="sex">性别：{{patient_info.gender === 0 ? '女' : '男'}}</view>
			<view class="marital-status">婚姻状况：{{patient_info.is_marry === 0 ? '未婚': (patient_info.is_marry === 1 ? '结婚': (patient_info.is_marry === 2 ? '离异' : '丧偶')) }}</view>
			<view class="nation">民族：{{patient_info.nation}}</view>
			<view class="tel">手机号码：{{patient_info.mobile}}</view>
			<view class="home-address">家庭住址：{{patient_info.address}}</view>
		</view>
		<view class="space"></view>
		<view class="family-info">
			<view class="family-info-title">
				亲属信息
			</view>
			<view class="family-name">姓名：{{patient_info.kinsfolk_name}}</view>
			<view class="family-sex">性别：{{patient_info.kinsfolk_gender  === 0 ? '女' : '男'}}</view>
			<view class="relationship">关系：{{patient_info.kinsfolk_relation}}</view>
			<view class="family-tel">联系电话： {{patient_info.kinsfolk_mobile}}</view>
			<view class="family-address">联系地址：{{patient_info.kinsfolk_address}}</view>
		</view>
		<view class="space"></view>
		<view class="health-info">
			<view class="health-title">基本健康信息</view>
			<view class="health-box">
				体温：{{patient_info.animal}}
			</view>
			<view class="health-box">
				脉搏：{{patient_info.pulse}}次/每分钟
			</view>
			<view class="health-box">
				呼吸频率：{{patient_info.respiratory_rate}}次/每分钟
			</view>
			<view class="health-box">
				左侧血压：{{patient_info.left_blood_pressure}}/mmHg
			</view>
			<view class="health-box">
				右侧血压：{{patient_info.right_blood_pressure}}/mmHg
			</view>
			<view class="health-box">
				身高：{{patient_info.height}}cm
			</view>
			<view class="health-box">
				体重：{{patient_info.weight}}kg
			</view>
			<view class="health-box">
				腰围：{{patient_info.waistline}}cm
			</view>
			<view class="health-box">
				体质指数：{{patient_info.physique}}kg/m^2
			</view>
			<view class="health-box">
				健康评价：<span class="color-blue">{{patient_info.health}}</span>
			</view>
			<view class="health-box1">
				自理能力评价：<span class="color-blue">{{patient_info.zili}}</span>
			</view>
			<view class="health-box">
				饮食习惯：{{patient_info.dietary_habit}}
			</view>
			<view class="health-box">
				锻炼频率：{{patient_info.take_exercise}}
			</view>
<!-- 			<view class="health-box">
				坚持锻炼时间：{{still_time}}
			</view>
			<view class="health-box">
				每次锻炼时间：{{each_time}}
			</view> -->
			<view class="health-box">
				锻炼方法：{{patient_info.take_methor}}
			</view>
			<view class="health-box2">
				吸烟状况：{{patient_info.smork}}
			</view>
			<view class="health-box">
				开始吸烟年龄：{{patient_info.start_smork}}岁
			</view>
			<view class="health-box">
				日吸烟量：{{patient_info.day_smork}}支
			</view>
			<view class="health-box">
				戒烟年龄：{{patient_info.smoking_cessation}}岁
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient_id: '',
				patient_info: {},
			}
		},
		onLoad(options) {
			this.patient_id = options.id
			this.fetchPatientInfo(this.patient_id)
		},
		methods: {
			// 获取患者信息
			fetchPatientInfo(id) {
				uni.request({
					url: `https://ciai.le-cx.com/index.php/api/patient/info?id=${this.patient_id}`,
					success: res => {
						this.patient_info = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.personal {
		width: 100%;
		box-sizing: border-box;
		padding-left: 30upx;
		padding-right: 30upx;
	}

	.top {
		width: 100%;
		height: 240upx;
		display: flex;
		align-items: center;
	}

	.user-pic {
		width: 120upx;
		height: 120upx;
		float: left;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 30upx;
	}

	.user-pic image {
		width: 100%;
		height: 100%;
	}

	.user-box {
		float: left;
	}

	.user-top {
		height: 44upx;
		margin-bottom: 32upx;
	}

	.user-name {
		font-size: 44upx;
		vertical-align: text-bottom;
	}

	.user-age {
		font-size: 24upx;
		color: #999999;
		padding-left: 15upx;
	}

	.nurse {
		font-size: 28upx;
	}

	.space {
		width: 750upx;
		height: 20upx;
		background-color: #F7F7F7;
		margin-left: -30upx;
	}

	.user-detail {
		width: 100%;
		font-size: 28upx;
		padding-bottom: 42upx;
	}

	.id-number {
		padding-top: 44upx;
		padding-bottom: 52upx;
	}

	.sex {
		display: inline-block;
	}

	.marital-status {
		display: inline-block;
		margin-left: 80upx;
		margin-right: 80upx;
	}

	.nation {
		display: inline-block;
	}

	.tel {
		padding-top: 52upx;
		padding-bottom: 52upx;
	}

	.home-address {
		line-height: 1.3;
	}

	.family-info {
		width: 100%;
		font-size: 28upx;
	}

	.family-info-title {
		padding-top: 44upx;
		padding-bottom: 52upx;
		font-size: 36upx;
		font-weight: 500;
	}

	.family-name {
		padding-bottom: 52upx;
	}

	.family-sex {
		padding-bottom: 52upx;
	}

	.relationship {
		padding-bottom: 52upx;
	}

	.family-tel {
		padding-bottom: 52upx;
	}

	.family-address {
		padding-bottom: 52upx;
	}

	.health-info {
		width: 100%;
		font-size: 28upx;
	}

	.health-title {
		padding-top: 44upx;
		padding-bottom: 52upx;
		font-size: 36upx;
		font-weight: 500;
	}

	.health-box {
		width: 50%;
		display: inline-block;
		padding-bottom: 52upx;
	}

	.color-blue {
		color: #24C789;
	}

	.health-box1 {
		width: 100%;
		padding-bottom: 72upx;
	}

	.health-box2 {
		width: 100%;
		padding-bottom: 52upx;
	}
</style>
