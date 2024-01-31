<template>
	<view class="NavBar_box"><uni-nav-bar :border="false" :title="$t('my.my')" color="#fff" background-color="#0134e1">
			<template #right>
				<!--      <div @click="lanControl" class="lan">{{$t('index.top')}} <uni-icons type="bottom" color="#fff"/></div>-->
				<div class="icons">
					<uni-icons color="#fff" type="headphones" />
					<uni-icons color="#fff" type="chat" />
				</div>
			</template>
		</uni-nav-bar></view>

	<view class="conent_box">
		<view class="hander_box">
			<view class="out" @click="onLogout">
				<image src="../../static/image/index/out.png" mode=""></image>
			</view>
			<!-- 头像 -->
			<view class="Avatar_box">
				<image src="../../static/image/my/01.webp" mode=""></image>
			</view>
			<!-- 昵称 -->
			<view class="Name_box">
				<span v-if="UserInfo">{{UserInfo.username}}</span>
			</view>
			<!-- ID -->
			<view class="ID_box">
				ID:<span v-if="UserInfo">{{UserInfo.aiaUserid}}</span>
			</view>
		</view>
		<!-- 收益 -->
		<view class="income_box">
			<!-- left -->
			<view class="left_box">
				<view class="title_box">
					金币收益
				</view>
				<view class="Number_box">
					<span v-if="UserInfo">{{UserInfo.money}}</span>
					
				</view>
			</view>
			<!-- right -->
			<view class="right_box" @click="toBack">
				兑换提醒
			</view>
		</view>
	</view>

</template>
<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		https
	} from '../../utils/https.js'
	import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	onMounted(() => {
		GetUserInfo()
	})
	const UserInfo = ref()
	const GetUserInfo = () => {
		https('/materialMember/info', 'get').then(res => {
			console.log(res.data.resultSet.money)
			UserInfo.value = res.data.resultSet
		}).catch(err => {
			console.log(err)
		})
	}
	//登出
	const onLogout = () => {
		// 清除本地存储的用户信息，例如token
		uni.removeStorageSync('token');
		uni.redirectTo({
			url: '/pages/login/login'
		});
	}
	
	const toBack = () =>{
		uni.navigateTo({
			url:'/pages/bankForm/bankForm'
		})
	}
</script>



<style scoped lang="scss">
	.NavBar_box {
		width: 100vw;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 9999;
	}

	.conent_box {
		padding-top: 78rpx;
		width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #F5F8FF;
		
		
		.hander_box {
			width: 750rpx;
			height: 496rpx;
			background: #0256FF;
			border-bottom-right-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			
			//退出
			.out{
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				right: 50rpx;
				top: 100rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}

			// 头像
			.Avatar_box {
				width: 172rpx;
				height: 172rpx;
				box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(0, 68, 204, 0.5);
				border: 2rpx solid #578FFF;
				border-radius: 50%;

				image {
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}

			.Name_box {
				margin-top: 32rpx;
				height: 32rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 32rpx;
			}

			.ID_box {
				margin-top: 20rpx;
				height: 24rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF50;
				line-height: 24rpx;
			}
		}

		.income_box {
			width: 686rpx;
			height: 196rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			position: relative;
			top: -60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left_box {
				margin-left: 48rpx;

				.title_box {

					height: 24rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					line-height: 24rpx;
				}

				.Number_box {
					margin-top: 32rpx;
					height: 44rpx;
					font-size: 44rpx;
					font-weight: 600;
					color: #0256FF;
					line-height: 44rpx;
				}
			}

			.right_box {
				margin-right: 32rpx;
				width: 208rpx;
				height: 72rpx;
				background: #0256FF;
				box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(2, 86, 255, 0.29);
				border-radius: 36rpx;
				text-align: center;
				line-height: 72rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}

	.icons {
		display: flex;
		width: 100%;
		justify-content: space-around;
		font-size: 40rpx;
	}
</style>