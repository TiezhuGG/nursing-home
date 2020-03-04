<template>
	<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import {
		initial
	} from "@/common/chineseConversion.js"
	export default {
		data() {
			return {
				// list: [{
				// 	"letter": "A",
				// 	"data": [
				// 		"阿克苏机场",
				// 		"阿拉山口机场",
				// 		"阿勒泰机场",
				// 		"阿里昆莎机场",
				// 		"安庆天柱山机场",
				// 		"澳门国际机场"
				// 	]
				// }, {
				// 	"letter": "B",
				// 	"data": [
				// 		"保山机场",
				// 		"包头机场",
				// 		"北海福成机场",
				// 		"北京南苑机场",
				// 		"北京首都国际机场"
				// 	]
				// }]
				list: []
			}
		},
		mounted() {
			this.fetchPatientList()
		},
		methods: {
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
					}
				})
			}
		},
		components: {
			uniIndexedList
		}
	}
</script>

<style>
</style>
