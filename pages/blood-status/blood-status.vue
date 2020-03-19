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
				<picker mode="selector" :range="patientList" @change="bindPickerChange" range-key="name" >
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
					<img src="../../static/images/back-green.png">
					<text class="txt">上一周</text>
				</view>
				<view class="this-week">
					本周{{this_week}}
				</view>
				<view class="next-week">
					<text class="txt">下一周</text>
					<img src="../../static/images/go-green.png">
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
			</view>
		</view>


		<!-- 血氧 -->
		<view class="infos" v-show="currentIndex === 1">
			<!-- 日期 -->
			<view class="date">
				<view class="last-week">
					<img src="../../static/images/back-green.png">
					<text class="txt">上一周</text>
				</view>
				<view class="this-week">
					本周{{this_week}}
				</view>
				<view class="next-week">
					<text class="txt">下一周</text>
					<img src="../../static/images/go-green.png">
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
					<img src="../../static/images/back-green.png">
					<text class="txt">上一周</text>
				</view>
				<view class="this-week">
					本周{{this_week}}
				</view>
				<view class="next-week">
					<text class="txt">下一周</text>
					<img src="../../static/images/go-green.png">
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

				this_week: '6月7日-6月13日',
				avg_val_blood: '135/80',
				avg_val_time: 65,
			};
		},
		onLoad() {
			_self = this;
			_self.fetchPatientList()
			// 加载页面渲染血压的图表信息
			this.getServerData(1);
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		methods: {
			bindPickerChange(e){
				// console.log(e)
				for(let item of this.patientList) {
					if (item.id === Number(e.detail.value) + 1) {
						this.fetchPatientInfo(item.id)
					}
				}
			},
			// 获取患者列表(ID)
			async fetchPatientList() {
				await uni.request({
					url: 'https://ciai.le-cx.com/api/patient/patientList',
					success: res => {
						this.patientList = res.data.data
					}
				})
			},
			// 获取患者信息
			async fetchPatientInfo(id) {
				await uni.request({
					url: `https://ciai.le-cx.com/api/patient/info?id=${id}`,
					success: res => {
						this.patient = res.data.data
					},
				})
			},
			// 切换导航tab
			switchTab(index) {
				this.currentIndex = index
				this.getServerData(this.currentIndex + 1)
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
			showLineA(canvasId, chartData) {
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
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
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
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	@import '../../common/css/blood-status'
</style>
