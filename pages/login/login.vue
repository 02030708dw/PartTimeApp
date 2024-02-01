<template>
	<!-- 背景图片 -->
	<view class="background_image_box"></view>

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
		<view class="form">
			<text class="text_4">{{$t('login.tit')}}</text>
			<view class="text-wrapper_2">
				<input class="text_5" v-model="account" :placeholder="$t('login.hint')">
			</view>
			<view class="text-wrapper_3">
				<input :type="passwordtype ? 'text' : 'password'" class="text_6" v-model="password" :placeholder="$t('login.hint2')">
				<view class="ico_box" @tap="togglePasswordVisibility">
					<image :src="passwordtype ? '../../static/image/login/ok.png' : '../../static/image/login/no.png'"
						mode=""></image>
				</view>
			</view>
			<view class="text-wrapper_4" @click="onLogin">
				<view class="text_7" >{{$t('login.btn')}}</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		https
	} from '../../utils/https.js'
	import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	import {
		ref,
		watch
	} from 'vue'
	import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
	const languageRef = ref(null)

	const account = ref("")
	const password = ref("")
	const passwordtype = ref(false)
	const isLoading = ref(false) // 控制加载状态
	// 登录
	const onLogin = () => {
		if (isLoading.value) {
			return; // 如果已经在加载中，不再处理点击
		}
		if (account.value && password.value) {
			isLoading.value = true  // 开始加载，禁用登录按钮
			uni.showLoading({
				title: 'Loading'
			});

			https('/Common/memberLogin', 'post', {
				password: password.value,
				account: account.value
			}).then(res => {
				isLoading.value = false
				uni.hideLoading(); // 关闭加载框
				
				// 登录成功
				if (res.data.resultSet.token) {
					uni.showToast({
						title: 'Success!',
						icon: 'success',
						duration: 1000
					});

					setTimeout(() => {
						uni.setStorageSync('token', res.data.resultSet.token); // 存储token
						uni.switchTab({
							url: '/pages/index/index' // 跳转页面
						});
					}, 1000);
				}
			}).catch(err => {
				isLoading.value = false
				uni.hideLoading(); // 关闭加载框
				uni.showToast({
					title: 'Error!',
					icon: 'none',
					duration: 2000
				});
				console.log(err);
			});
		} else {
			uni.showToast({
				title: 'Please enter complete information',
				icon: 'none',
				duration: 2000
			});
		}
	};


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
	const togglePasswordVisibility = () => {
		passwordtype.value = !passwordtype.value
	}
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

	// 背景图片
	.background_image_box {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0rpx;
		background-image: url('../../static/image/login/login_image.png');
		background-size: cover;
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

		.title_box {
			padding: 20rpx;
			position: fixed;
			line-height: 40rpx;
			height: 40rpx;

			border-radius: 18rpx;
			font-size: 26rpx;
			top: 20rpx;

		}

		.title_warn {
			background-color: #faecd8;
			color: #e6a240;
		}

		.title_success {
			background-color: #e1f3d8;
			color: #7fd85e;
		}

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
				padding: 36rpx 30rpx ;
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
				padding: 36rpx 30rpx ;
				position: relative;

				.ico_box {
					width: 40rpx;
					height: 35rpx;
					position: absolute;
					right: 15rpx;
					top: 45rpx;

					image {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
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