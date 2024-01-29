<template>
	<uni-nav-bar :border="false" color="#fff" background-color="#0134e1">
		<template #right>
			<div @click="lanControl" class="lan">{{$t('login.top')}} <uni-icons type="bottom" color="#fff" /></div>
		</template>
		<uni-popup ref="languageRef" type="top">
			<view class="popup-content popup-height">
				<text class="text" v-for="{text,code} in langs" :style="{
        color:localL===code?'#0256FF':''
      }" :key="code" @click="selectLang(code)">{{text}}</text>
			</view>
		</uni-popup>
	</uni-nav-bar>
	<view class="login">
		<div class="form">
			<text class="text_4">登陆</text>
			<view class="text-wrapper_2">
				<input class="text_5" v-model="account" placeholder="请输入账号">
			</view>
			<view class="text-wrapper_3">
				<input class="text_6" v-model="password" placeholder="请输入密码">
			</view>
			<view class="text-wrapper_4">
				<view class="text_7" @click="onLogin">登陆</view>
			</view>
		</div>
	</view>
</template>
<script setup>
	import {
		https
	} from '../../utils/https.js'
	import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	import {
		ref
	} from 'vue'
	import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
	const languageRef = ref(null)

	const account = ref("")
	const password = ref("")



	// 登录
	const onLogin = () => {
		https('/Common/memberLogin', 'post', {
			password: password.value,
			account: account.value
		}).then(res => {
			// 登录成功
			if (res.data.resultSet.token) {
				// 存储token
				uni.setStorageSync('token', res.data.resultSet.token)
				// 跳转页面
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}).catch(err => {
			console.log(err)
		})
		return

	}
	const lanControl = () => languageRef.value.open()
	const langs = [{
			text: 'english',
			code: 'en'
		},
		{
			text: '中文',
			code: 'zh-Hans'
		},
	]
</script>
<script>
	export default {
		name: "login",
		data() {
			return {
				localL: ''
			}
		},
		onLoad() {
			this.localL = uni.getLocale()
			uni.onLocaleChange((e) => {
				this.localL = e.locale;
			})
		},
		methods: {
			selectLang(v) {
				uni.setLocale(v)
				this.$i18n.locale = v;
				this.$refs.languageRef.close()
			}
		},
	}
</script>
<style scoped lang="scss">
	.lan {
		width: 200rpx !important;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.login {
		height: calc(95vh);
		width: 100%;
		background: #0134e1;
		display: flex;
		justify-content: center;
		align-items: center;

		.form {
			transform: translateY(-50%);

			.text_4 {
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 44rpx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				text-align: right;
				white-space: nowrap;
				line-height: 44rpx;
				margin: 274rpx 556rpx 0 38rpx;
			}

			.text-wrapper_2 {
				background-color: rgba(255, 255, 255, 0.1);
				margin: 114rpx 54rpx 0 38rpx;
				padding: 36rpx 362rpx 36rpx 48rpx;
			}

			.text_5 {
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 36rpx;
				font-weight: normal;
				text-align: left;
				white-space: nowrap;
				line-height: 36rpx;
			}

			.text-wrapper_3 {
				background-color: rgba(255, 255, 255, 0.1);
				margin: 48rpx 54rpx 0 38rpx;
				padding: 36rpx 362rpx 36rpx 48rpx;
			}

			.text_6 {
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 36rpx;
				font-weight: normal;
				text-align: left;
				white-space: nowrap;
				line-height: 36rpx;
			}

			.text-wrapper_4 {
				box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(0, 85, 255, 0.29);
				background-color: rgba(2, 86, 255, 1);
				border-radius: 16rpx;
				margin: 64rpx 54rpx 0 38rpx;
				padding: 36rpx 258rpx 36rpx 260rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.text_7 {
				overflow-wrap: break-word;
				color: rgba(255, 255, 255, 1);
				font-size: 36rpx;
				font-weight: normal;
				text-align: right;
				white-space: nowrap;
				line-height: 36rpx;
			}
		}
	}

	.popup-content {
		@include flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
		height: 100rpx;
		color: #000;
		background-color: #fff;

		.text {
			&:hover {
				color: #0256FF;
			}

			margin-top: 10rpx;
		}
	}
</style>