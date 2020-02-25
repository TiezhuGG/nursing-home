<template>
	<view class="warning">
		<!-- 头部导航 -->
		<view class="top-nav">
			<block v-for="(item, index) in navTitles" :key="index">
				<view class="nav-item" :class="currentIndex===index ? 'active':''" @click="switchTab(index)">
					<text>{{item}}</text>
				</view>
			</block>
		</view>
		
		<!-- 报警模块 -->
		<view class="main" v-show="currentIndex===1">
			<block v-for="(item, index) in warningList" :key="index">
				<view class="main-item">
					<view class="item-top">
						<view class="item-top-title">
							<img class="glu" src="../../static/images/glu.png">
							<text class="title">{{item}}</text>
						</view>
						<view class="item-top-time">{{time}}</view>
					</view>
					
					<view class="item-middle">
						<view class="name">老人姓名：{{patient_name}}</view>
						<view class="area">区域：{{patient_area}}</view>
						<view class="number">编号：{{patient_number}}</view>
					</view>
					
					<view class="item-bottom">
						<text class="handled">已处理</text>
					</view>
				</view>
			</block>
		</view>
		
		<view class="main" v-show="currentIndex===0">
			<block v-for="(item, index) in warningList" :key="index">
				<view class="main-item">
					<view class="item-top">
						<view class="item-top-title">
							<img class="glu" src="../../static/images/glu.png">
							<text class="title">{{item}}</text>
						</view>
						<view class="item-top-time">{{time}}</view>
					</view>
					
					<view class="item-middle">
						<view class="name">老人姓名：{{patient_name}}</view>
						<view class="area">区域：{{patient_area}}</view>
						<view class="number">编号：{{patient_number}}</view>
					</view>
					
					<view class="item-bottom">
						<text class="unhandled">立即处理</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 1,
				navTitles: ['未处理', '已处理'],
				warningList: ['血糖报警', '血氧报警', '血压报警', '心率报警', '起夜报警', '出门报警'],
				time: '18:13:28',
				patient_name: '王健林',
				patient_area: '9号楼10层1001号',
				patient_number: '202002071444370136507700'
			}
		},
		methods: {
			switchTab(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.warning {
		height: 100%;
		background-color: #F7F7F7;
		// 头部导航
		.top-nav {
			height: 96upx;
			display: flex;
			align-items: center;
			margin-bottom: 30upx;
			background-color: #fff;
			box-shadow: 0upx 1upx 0upx 0upx #DDDDDD;
			.nav-item {
				padding: 28upx 0;
				font-size: 28upx;
				color: #999;
			}
			.nav-item:nth-child(1) {
				margin-left: 146upx;
			}
			.nav-item:nth-child(2) {
				margin-left: 290upx;
			}
			.active {
				color: #333;
				border-bottom: 6upx solid #24C789;
			}
		}
		//报警模块
		.main {
			.main-item {
				display: flex;
				flex-direction: column;
				width: 690upx;
				height: 386upx;
				margin: 0 0 30upx 30upx;
				background-color: #fff;
				border-radius:10px;
				.item-top {
					height: 110upx;
					display: flex;
					align-items: center;
					.item-top-title {
						display: flex;
						.glu {
							width: 48upx;
							height: 48upx;
							margin: 0 20upx 0 30upx;
						}
						.title {
							font-size: 32upx;
							font-weight:500;
							color: #333;
						}
					}
					.item-top-time {
						margin-left: 328upx;
						font-size: 28upx;
						color: #999;
					}
				}
				.item-middle {
					height: 136upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30upx;
					font-size: 28upx;
					color: #999;
				}
				.item-bottom {
					width: 630upx;
					height: 88upx;
					line-height: 88upx;
					text-align: center;
					margin-left: 30upx;
					margin-top: 38upx;
					border-top: 2upx solid #ddd;
					.handled {
						font-size: 28upx;
						color: #24C789
					}
					.unhandled {
						width: 112upx;
						height: 28upx;
						padding: 10upx 34upx;
						font-size: 28upx;
						color: #FF5A5A;
						border: 2upx solid #FF5A5A;
						border-radius: 50upx;
					}
				}
			}

		}
	}
</style>
