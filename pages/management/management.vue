<template>
	<view>
		<view class="input">
			<img src="../../static/images/search.png" @click="onFocus">
			<input placeholder="搜索客户姓名" v-model="inputName" @input="search" @blur="bindBlur" :focus="focus" />
		</view>

		<scroll-view class="container-inner">
			<view class="searchLetter touchClass">
				<view v-for="(item, idx) in searchLetter" :key="idx" style="color:#24C789;font-size:28upx;" :data-letter="item.name"
				 @click="clickLetter">
					{{ item.name }}
				</view>
			</view>

			<view class="container">
				<scroll-view scroll-y="true" v-bind:style="{height: winHeight + 'px'}" :scroll-into-view="scrollTopId">
					<block v-for="(item, idx) in list" :key="idx">
						<view class="item_letter" :id="item.letter">{{ item.letter }}</view>
						<block v-for="(user, index) in item.data" :key="index">
							<view class="selection">
								<img class="item_avatar" :src="user.avatar" @click="toPatientDetail(user.id)"/>
								<view>
									<text class="item_name">{{ user.name }}</text>
									<text class="item_age">年龄: {{ user.age }}</text>
								</view>
								<view class="watch-data" @click="toBloodStatus(user.id)">查看数据</view>
								<view class="collect-data" @click="toCollectData(user.id)">采集数据</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		initial
	} from "@/common/js/chineseConversion.js"
	export default {
		data() {
			return {
				url: 'https://ciai.le-cx.com/index.php/api/patient/info?id=',
				searchLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X',
					'Y', 'Z'
				],
				inputName: '',
				focus: false,
				list: [],
				dataSource: [],
				scrollTopId: '',
				completeList: [],
				winHeight: 0,
				showLetter: '',
				isShowLetter: false,
				toastShowLetter: '',
			};
		},
		onLoad() {
			this.fetchPatientList()
			const searchLetter = this.searchLetter;
			const sysInfo = uni.getSystemInfoSync();
			// console.log(sysInfo);
			const winHeight = sysInfo.windowHeight;
			const itemH = winHeight / searchLetter.length;
			let tempArr = [];

			searchLetter.map(
				(item, index) => {
					let temp = {};
					temp.name = item;
					temp.tHeight = index * itemH;
					temp.bHeight = (index + 1) * itemH;
					tempArr.push(temp);
				}
			);

			this.winHeight = winHeight;
			this.itemH = itemH;
			this.searchLetter = tempArr;
		},
		methods: {
			toCollectData(pid){
				uni.navigateTo({
					url: `../collect-data/collect-data?pid=${pid}`
				})
			},
			toBloodStatus(pid) {
				uni.navigateTo({
					url: `../blood-status/blood-status?pid=${pid}`
				})
			},
			// 监听input事件
			search(e) {
				let val = e.detail.value
				for (let i = 0; i < this.dataSource.length; i++) {
					if (this.dataSource[i].name.indexOf(val) !== -1) {
						let letter = initial(val)
						this.scrollTopId = letter;
					}
				}
			},
			// 点击搜索图标获取input焦点
			onFocus() {
				this.focus = !this.focus
			},
			// 获取患者列表
			fetchPatientList() {
				uni.request({
					url: 'https://ciai.le-cx.com/index.php/api/patient/patientList',
					success: res => {
						let letterList = []
						for (let item of res.data.data) {
							// 获取姓名首字母大写形式
							let letter = initial(item.name)
							// console.log(letter)
							let index = letterList.indexOf(letter)
							if (index === -1) {
								letterList.push(letter)
								let obj = {
									letter: '',
									data: []
								}
								obj.letter = letter
								obj.data.push(item)
								this.list.push(obj)
								this.dataSource.push(item)
							} else {
								this.list[index].data.push(item)
							}
						}
						this.sortLetter(this.list)
					}
				})
			},
			// 跳转个人详情页
			toPatientDetail(id) {
				uni.navigateTo({
					url: `../personal/personal?id=${id}`
				})
			},
			// 按字母a-z排序
			sortLetter(arr) {
				arr.sort((s, t) => {
					let a = s.letter.toLowerCase();
					let b = t.letter.toLowerCase();
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				})
			},
			// 点击右侧索引字母
			clickLetter(e) {
				// console.log(e)
				const showLetter = e.currentTarget.dataset.letter;
				this.toastShowLetter = showLetter;
				this.isShowLetter = true;
				this.scrollTopId = showLetter;

				const self = this;
				setTimeout(() => {
					self.isShowLetter = false;
				}, 500);
			},
			// 失去焦点 输入框内容清空
			bindBlur(e) {
				this.inputName = '';
			},
		},
	};
</script>

<style lang="scss">
	.container-inner {
		display: flex;
		flex-direction: row-reverse;
		position: relative;
	}

	.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.input {
		display: flex;
		align-items: center;
		height: 104upx;

		input {
			width: 628upx;
			height: 64upx;
			font-size: 28upx;
			background-color: #F4F4F4;
			border-radius: 2upx;
		}

		img {
			width: 32upx;
			height: 32upx;
			padding: 17upx;
			margin-left: 30upx;
			background-color: #F4F4F4;
			z-index: 1;
		}
	}

	.searchLetter {
		flex-shrink: 0;
		width: 50upx;
		text-align: center;
		margin-top: 94upx;
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 1upx;
		z-index: 1111;
	}

	.searchLetter view {
		margin-top: 5upx;
	}

	.touchClass {
		background-color: #fff;
		color: #fff;
		padding-top: 16upx;
		padding-bottom: 16upx;
	}

	.selection {
		display: flex;
		width: 100%;
		height: 144upx;
		align-items: center;

		.item_avatar {
			width: 84upx;
			height: 84upx;
			margin-left: 30upx;
			border-radius: 50%;
		}

		view {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 84upx;
			margin-left: 20upx;

			.item_name {
				color: #333;
				font-size: 30upx;
			}

			.item_age {
				color: #B4B4B4;
				font-size: 26upx;
			}
		}

		.watch-data {
			position: absolute;
			left: 415upx;
		}
		
		.collect-data {
			position: absolute;
			left: 550upx;
		}
		
		.watch-data,
		.collect-data {
			width: 120upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			font-size: 26upx;
			color: #24C789;
			border: 1upx solid #24C789;
			border-radius: 10upx;
		}
	}

	.selection:not(:nth-last-child(1)) {
		border-bottom: 1upx solid #DDD;
		border-bottom-width: 100%;
	}

	.item_letter {
		background-color: #F7F7F7;
		height: 88upx;
		line-height: 88upx;
		padding-left: 30upx;
		font-size: 32upx;
		color: #BEBEBE;
		margin-right: 52upx;

		&:nth-child(1) {
			width: 100%;
		}
	}
</style>
