<template>
	<!-- 背景图片 -->
	<view class="background_image_box"></view>
	
	<uni-nav-bar :border="false" color="#fff" background-color="#0134e190">
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
			<text class="text_4">登陆</text>
			<view class="text-wrapper_2">
				<input class="text_5" v-model="account" placeholder="请输入账号">
			</view>
			<view class="text-wrapper_3" v-if="passwordtype">
				<input class="text_6" v-model="password" placeholder="请输入密码">
				<view class="ico_box">
					<image src="../../static/image/login/ok.png" mode="" @tap="passwordtype = false"></image>
				</view>
			</view>
			<view class="text-wrapper_3" v-else>
				<input class="text_6" v-model="password" placeholder="请输入密码" type="password">
				<view class="ico_box">
					<image src="../../static/image/login/no.png" mode="" @tap="passwordtype = true"></image>
				</view>
			</view>
			<view class="text-wrapper_4">
				<view class="text_7" @click="onLogin">登陆</view>
			</view>
			
		</view>
		<view class="title_box" v-if="Show" :class="ClassShow"> 
			{{TextShow}}
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
		ref,watch
	} from 'vue'
	import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
	const languageRef = ref(null)
	
	const account = ref("")
	const password = ref("")
	const passwordtype = ref(true)
	const Show = ref(false)
	const TextShow = ref('')
	const ClassShow = ref('title_warn')
	// 登录
	const onLogin = () => {
		// 判断是否输入完全信息
		if(account.value && password.value){
			https('/Common/memberLogin', 'post', {
				password: password.value,
				account: account.value
			}).then(res => {
				TextShow.value = '登录成功!'
				ClassShow.value = 'title_success'
				Show.value = true
				
				// 登录成功
				if (res.data.resultSet.token) {
					setTimeout(() => {
						// 存储token
						uni.setStorageSync('token', res.data.resultSet.token)
						// 跳转页面
						uni.switchTab({
							url: '/pages/index/index'
						})
					},2000)
					
				}
			}).catch(err => {
				TextShow.value = '登录失败!'
				ClassShow.value = 'title_warn'
				Show.value = true
				console.log(err)
			})
		}else{
			TextShow.value = '请输入完整信息'
			ClassShow.value = 'title_warn'
			Show.value = true
		}
	}
	watch(Show, (newValue, oldValue) => {
	    if(Show){
			setTimeout(() => {
				Show.value = false
			},3000)
		}
	})
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
	// 背景图片
	.background_image_box{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0rpx;
		background-image: url('../../static/image/login/login_image.png');
		background-size: cover;}
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
		.title_box{
			padding: 20rpx;
			position: fixed;
			line-height: 40rpx;
			height: 40rpx;
			
			border-radius: 18rpx;
			font-size: 26rpx;
			top: 20rpx;
			
		}
		.title_warn{
			background-color: #faecd8;
			color: #e6a240;
		}
		.title_success{
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