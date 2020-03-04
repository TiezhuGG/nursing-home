<template>
	<view class="personal">
		 <view class="top">
			 <view class="user-pic"><image :src="user_pic"></image></view>
			 <view class="user-box">
				 <view class="user-top">
					 <text class="user-name">{{user_name}}</text>
					 <text class="user-year">/{{user_year}}</text>
				 </view>
				 <view class="user-down">
				 	<text class="nurse">专属护士： {{nurse_name}}</text>
				 </view>
			 </view>
		 </view>
	     <view class="space"></view>
		 <view class="user-detail">
			 <view class="id-number">身份证号码：{{id_number}}</view>
			 <view class="sex">性别：{{sex}}</view>
			 <view class="marital-status">婚姻状况：{{marital_status}}</view>
			 <view class="nation">民族：{{nation}}</view>
			 <view class="tel">手机号码：{{tel}}</view>
			 <view class="home-address">家庭住址：{{home_address}}</view>
		 </view>
	     <view class="space"></view>
		 <view class="family-info">
			 <view class="family-info-title">
				 亲属信息
			 </view>
			 <view class="family-name">姓名：{{family_name}}</view>
			 <view class="family-sex">性别：{{family_sex}}</view>
			 <view class="relationship">关系：{{relationship}}</view>
			 <view class="family-tel">联系电话： {{family_tel}}</view>
			 <view class="family-address">联系地址：{{family_address}}</view>
		 </view>
	     <view class="space"></view>
		 <view class="health-info">
			 <view class="health-title">基本健康信息</view>
			 <view class="health-box">
				 体温：{{temperature}}
			 </view>
			 <view class="health-box">
			 				 脉搏：{{pulse}}次/每分钟
			 </view>
			 <view class="health-box">
			 				 呼吸频率：{{respiratory_frequency}}次/每分钟
			 </view>
			 <view class="health-box">
			 				 左侧血压：{{left_blood_pressure}}/mmHg
			 </view>
			 <view class="health-box">
			 				 右侧血压：{{right_blood_pressure}}/mmHg
			 </view>
			 <view class="health-box">
			 				 身高：{{height}}cm
			 </view>
			 <view class="health-box">
			 				 体重：{{weight}}kg
			 </view>
			 <view class="health-box">
			 				 腰围：{{waist}}cm
			 </view>
			 <view class="health-box">
			 				 体质指数：{{body_mass_index}}kg/m^2
			 </view>
			 <view class="health-box">
			 				 健康评价：<span class="color-blue">{{health_assessment}}</span>
			 </view>
			 <view class="health-box1">
			 				 自理能力评价：<span class="color-blue">{{self_assessment}}</span>
			 </view>
			 <view class="health-box">
			 				 饮食习惯：{{eating_habits}}
			 </view>
			 <view class="health-box">
			 				 锻炼频率：{{exercise_frequency}}
			 </view>
			 <view class="health-box">
			 				 坚持锻炼时间：{{still_time}}
			 </view>
			 <view class="health-box">
			 				 每次锻炼时间：{{each_time}}
			 </view>
			 <view class="health-box">
			 				 锻炼方法：{{method_train}}
			 </view>
			 <view class="health-box2">
			 				 吸烟状况：{{smoking_status}}
			 </view>
			 <view class="health-box">
			 				 开始吸烟年龄：{{smoking_year}}
			 </view>
			 <view class="health-box">
			 				 日吸烟量：{{smoking_volume}}
			 </view>
			 <view class="health-box">
			 				 戒烟年龄：{{smoking_quit_year}}
			 </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient_id: '', 
				user_pic:"../../static/images/user.jpg",
				user_name:"王健林",
				user_year:"74岁",
				nurse_name:"范冰冰",
				id_number:"350583199923225486",
				sex:"男",
				marital_status:"已婚",
				nation:"汉",
				tel:"15860422555",
				home_address:"福建省泉州市丰泽区泉州软件园8号研发楼301",
				family_name:"王思聪",
				family_sex:"男",
				relationship:"父子",
				family_tel:"15860455666",
				family_address:"福建省泉州市丰泽区泉州软件园8号研发楼301",
				temperature:"36°",
				pulse:"56",
				respiratory_frequency:"60",
				left_blood_pressure:"120",
				right_blood_pressure:"125",
				height:"172",
				weight:"65",
				waist:"50",
				body_mass_index:"180",
				health_assessment:"满意",
				self_assessment:"可自理",
				eating_habits:"荤素均衡",
				exercise_frequency:"每周一次以上",
				still_time:"1年",
				each_time:"120分钟",
				method_train:"跑步,跳绳",
				smoking_status:"过去吸,已戒烟",
				smoking_year:"18岁",
				smoking_volume:"平均6支",
				smoking_quit_year:"45岁",
			}
		},
		onLoad(option) {
			this.patient_id = option.id
			this.fetchPatientInfo(this.patient_id)
		},
		methods: {
			fetchPatientInfo(id) {
				uni.request({
					url: `https://ciai.le-cx.com/api/patient/info?id=${this.patient_id}`,
					success: res => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
  .personal{
	  width: 100%;
	  box-sizing: border-box;
	  padding-left: 30upx;
	  padding-right: 30upx;
  }
  .top{
	  width: 100%;
	  height: 240upx;
	  display: flex;
	  align-items: center;
  }
  .user-pic{
	  width: 120upx;
	  height: 120upx;
	  float: left;
	  border-radius: 50%;
	  overflow: hidden;
	  margin-right: 30upx;
  }
  .user-pic image{
	  width: 100%;
	  height: 100%;
  }
  .user-box{
	  float: left;
  }
  .user-top{
	  
  }
  .user-name{
	  font-size: 44upx;
	  vertical-align: text-bottom;
  }
  .user-year{
	  font-size: 24upx;
	  color: #999999;
	  padding-left: 15upx;
	}  
   .nurse{
	   font-size: 28upx;
	   }
	   .space{
		   width: 750upx;
		   height: 20upx;
		   background-color: #F7F7F7;
		   margin-left: -30upx;
	   }
	   .user-detail{
		   width: 100%;
		   font-size: 28upx;
		   padding-bottom: 42upx;
	   }
	   .id-number{
		   padding-top: 44upx;
		   padding-bottom: 52upx;
	   }
	   .sex{
		   display: inline-block;
	   }
	  .marital-status{
		  display: inline-block;
		  margin-left: 80upx;
		  margin-right: 80upx;
	  }
	  .nation{
		  display: inline-block;
	  }
	  .tel{
		  padding-top: 52upx;
		  padding-bottom: 52upx;
	  }
	  .home-address{
		  line-height: 1.3;
	  }
	  .family-info{
		  width: 100%;
		  font-size: 28upx;
	  }
	  .family-info-title{
		padding-top: 44upx;
		  padding-bottom: 52upx;
		  font-size: 36upx;
		  font-weight: 500;
	  }
	  .family-name{
	   padding-bottom: 52upx;
	}
	 .family-sex{
	   padding-bottom: 52upx;
	}	
	 .relationship{
	  padding-bottom: 52upx;
    }
	.family-tel{
		padding-bottom: 52upx;
	}
	.family-address{
		padding-bottom: 52upx;
	}
	.health-info{
		width: 100%;
		font-size: 28upx;
	}
	.health-title{
		padding-top: 44upx;
		  padding-bottom: 52upx;
		  font-size: 36upx;
		  font-weight: 500;
	}
	.health-box{
		width: 50%;
		display: inline-block;
		padding-bottom: 52upx;
	}
	.color-blue{
		color: #24C789;
	}
	.health-box1{
		width: 100%;
		padding-bottom: 72upx;
	}
	.health-box2{
		width: 100%;
		padding-bottom: 52upx;
	}
		
</style>
