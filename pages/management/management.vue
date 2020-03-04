<template>
	<view>
		<view class="input">
			<img src="../../static/images/search.png" @click="onFocus">
			<input placeholder="搜索客户姓名" :value="inputName" @input="bindKeyInput" @blur="bindBlur" :focus="focus" />
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
							<view class="selection" @click="toPatientDetail(user.id)">
								<img class="item_avatar" :src="user.avatar" />
								<view>
									<text class="item_name">{{ user.name }}</text>
									<text class="item_age">年龄: {{ user.age }}</text>
								</view>
							</view>
						</block>
					</block>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import city from '../../common/city.js';
	import {
		initial
	} from "@/common/chineseConversion.js"
	export default {
		data() {
			return {
				url: 'https://ciai.le-cx.com/api/patient/info?id=',
				searchLetter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X',
					'Y', 'Z'
				],
				focus: false,
				list: [],
				scrollTopId: '',
				inputName: '',
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
			console.log(this.searchLetter)
		},
		methods: {
			// 点击搜索图标获取input焦点
			onFocus() {
				this.focus = !this.focus
			},
			// 获取患者列表
			fetchPatientList() {
				uni.request({
					url: 'https://ciai.le-cx.com/api/patient/patientList',
					success: res => {
						let letterList = []
						for (let item of res.data.data) {
							let letter = initial(item.name)
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
							} else {
								this.list[index].data.push(item)
							}
						}
						this.sortLetter(this.list)
						console.log(this.list)
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
				console.log(e)
				const showLetter = e.currentTarget.dataset.letter;
				this.toastShowLetter = showLetter;
				this.isShowLetter = true;
				this.scrollTopId = showLetter;

				const self = this;
				setTimeout(() => {
					self.isShowLetter = false;
				}, 500);
			},
			bindScroll(e) {
				console.log(e.detail);
			},
			bindBlur(e) {
				this.inputName = '';
			},
			bindKeyInput(e) {
				console.log(e)
				this.inputName = e.mp.detail.value;
				// 空搜索框时 取消匹配显示
				if (this.inputName.length < 1) {
					this.completeList = [];
				}
				this.scrollTopId = 'completelist';
				this.auto();
			},
			auto() {
				let inputSd = this.inputName.trim();
				let sd = inputSd.toLowerCase();
				let num = sd.length;
				const cityList = city.cityObjs;
				let finalCityList = [];

				let temp = cityList.filter(
					item => {
						let text = item.short.slice(0, num).toLowerCase();
						// eslint-disable-next-line
						return (text && text == sd);
					}
				);

				// 在城市数据中，添加简拼到“shorter”属性，就可以实现简拼搜索
				let tempShorter = cityList.filter(
					itemShorter => {
						if (itemShorter.shorter) {
							let textShorter = itemShorter.shorter.slice(0, num).toLowerCase();
							// eslint-disable-next-line
							return (textShorter && textShorter == sd);
						}
					}
				);

				let tempChinese = cityList.filter(
					itemChinese => {
						let textChinese = itemChinese.city.slice(0, num);
						// eslint-disable-next-line
						return (textChinese && textChinese == sd);
					}
				);

				if (temp[0]) {
					temp.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				} else if (tempShorter[0]) {
					tempShorter.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				} else if (tempChinese[0]) {
					tempChinese.map(
						item => {
							let testObj = {};
							testObj.city = item.city;
							testObj.code = item.code;
							finalCityList.push(testObj);
						}
					);
					this.completeList = finalCityList;
				}
			}
		}
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
