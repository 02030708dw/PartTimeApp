<template>
	<view class="container_box">
		<view class="NavBar_box">
			<!-- 导航栏 -->
			<uni-nav-bar :border="false" :title="$t('index.top')" color="#fff" background-color="#0134e1">
				<template #right>
					<view class="icons">
						<uni-icons color="#fff" type="headphones" />
						<uni-icons color="#fff" type="chat" />
					</view>
				</template>
			</uni-nav-bar>
		</view>

		<view class="loader" v-if="isLoading"></view>

		<!-- 列表 -->
		<view v-else class="list_box">
			<!-- 选项 -->
			<view class="item_box" v-for="(item,index) in ListData" :key="index">
				<!-- top -->
				<view class="item_top_box">
					<!-- left -->
					<view class="left_box">
						<image src="../../static/image/index/Facebook_f_logo_(2021).svg" mode=""></image>
					</view>
					<!-- right -->
					<view class="right_box">
						<view class="right_top_box">
							<!-- 标题 -->
							<view class="title_box">
								{{item.title[2]}}
							</view>
							<!-- 图标 -->
							<view class="right_ico_box">
								<image v-if="item.hot" src="../../static/image/index/index_ico.png" mode=""></image>
							</view>
						</view>
						<view class="right_bottom_box">
							<!-- 价格 -->
							<view class="price_box">
								${{item.amount}}
							</view>
							<!-- 按钮 -->
							<view class="btn_box">
								<button type="primary" @click="onExecutive(item)">{{$t('index.btn')}}</button>
							</view>
						</view>
					</view>
				</view>
				<view class="item_bottom_box">
					<uni-collapse :show-animation="true">
						<uni-collapse-item :border="false">
							<template v-slot:title>
								<view class="item_bottom_title">说明{{item.rule[2]}}</view>
							</template>
							<view class="content">
								<p><text class="text">中文:{{item.rule[0]}}</text></p>
								<p><text class="text">英文:{{item.rule[1]}}</text></p>
								<p><text class="text">泰文:{{item.rule[2]}}</text></p>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</view>


			<uni-load-more :showIcon="true" :status="status"></uni-load-more>

		</view>
	</view>
</template>

<script setup>
	import {
		https
	} from '../../utils/https.js'
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	var ListData = ref([])
	// 总条数
	const total = ref()
	// 页码
	const pageNo = ref(1)
	const isLoading = ref(false)
	// 请求数据
	const GetData = () => {
		isLoading.value = true
		https('/materialTask', 'get', {
			pageNo: pageNo.value,
			pageSize: 10
		}).then(res => {
			isLoading.value = false
			console.log(res.data.resultSet)
			// 总条数
			total.value = res.data.resultSet.total
			ListData.value = res.data.resultSet.data
			status.value = 'more'
			console.log(ListData)
		}).catch(err => {
			console.log(err)
		})
	}
	// 请求初始化数据
	onMounted(() => {
		GetData()
	})
	import {
		onReachBottom
	} from '@dcloudio/uni-app'
	const onExecutive = (d) => {
		const data = {
			msg: 'script',
			payload: {
				id: d.id,
				script: d.script
			}
		}
		console.log(d.id)
		window.ReactNativeWebView.postMessage(JSON.stringify(data))
		/*uni.navigateTo({
		  url:'/pages/target/target',
		  success:res=>{
		    res.eventChannel.emit('scriptTarget',{id:d.id,script:d.script})
		  }
		})*/
	}

	const status = ref('more')

	// 触底刷新
	onReachBottom(() => {
		status.value = 'loading'
		if (ListData.value.length >= total.value) {
			status.value = 'no-more'
			return
		} else {
			pageNo.value++
			https('/materialTask', 'get', {
				pageNo: pageNo.value,
				pageSize: 10
			}).then(res => {
				for (let i = 0; i < res.data.resultSet.data.length; i++) {
					ListData.value.push(res.data.resultSet.data[i])
				}
				if (ListData.value.length >= total.value) {
					status.value = 'no-more'

				} else {
					status.value = 'more'
				}
			}).catch(err => {
				console.log(err)

			})
		}
	})
</script>

<style lang="scss" scoped>
	.container_box {
    //position: relative;
		.NavBar_box {
			width: 100vw;
			position: fixed;
			//top: 40rpx;
			left: 0rpx;
			z-index: 9999;
		}

		min-height: 100vh;
		background-color: #F5F8FF;
		//padding-top: 40rpx;
		//padding-bottom: 40rpx;

		.icons {
			display: flex;
			width: 100%;
			justify-content: space-around;
			font-size: 80rpx;
		}

		// 列表
		.list_box {
      //transform: translateY(100rpx);
      //margin-bottom: 100rpx;
			width: 100vw;
			display: flex;
			align-items: center;
			flex-direction: column;

			.item_box {
        margin-top: 100rpx;
				width: 686rpx;
				margin-top: 100rpx;
				padding: 32rpx 0rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.item_top_box {
					border-bottom: 2rpx solid #DEDEDE;
					width: 622rpx;
					padding-bottom: 32rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left_box {
						width: 108rpx;
						height: 108rpx;

						image {
							width: 108rpx;
							height: 108rpx;
						}
					}

					.right_box {

						.right_top_box {
							display: flex;
							align-items: center;
							justify-content: space-between;

							// 标题
							.title_box {
								width: 362rpx;
								max-height: 62rpx;
								font-size: 32rpx;
								font-weight: 600;
								color: #333330;
								line-height: 32rpx;

								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
							}

							.right_ico_box {
								margin-left: 52rpx;
								width: 80rpx;
								height: 36rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}

						.right_bottom_box {
							margin-top: 24rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.price_box {
								font-size: 48rpx;
								font-weight: 600;
								color: #FF4343;
							}

							.btn_box {
								height: 56rpx;
								box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(2, 86, 255, 0.29);

								button {
									height: 56rpx;
									font-size: 24rpx;
								}
							}
						}

					}
				}

				.item_bottom_box {
					margin-top: 32rpx;

					.item_bottom_title {
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					::v-deep(.uni-collapse-item) {
						width: 622rpx;

					}


				}

			}

			.item_box:nth-child(n+2) {
				margin-top: 20rpx;
			}
		}

		//加载
		.loader {
			width: 48px;
			height: 48px;
			display: block;
			position: fixed;
			top: 45%;
			left: 45%;
			color: #0256ff;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
		}

		.loader::after,
		.loader::before {
			content: '';
			box-sizing: border-box;
			position: absolute;
			width: 24px;
			height: 24px;
			top: 50%;
			left: 50%;
			transform: scale(0.5) translate(0, 0);
			background-color: #0256ff;
			border-radius: 50%;
			animation: animloader 1s infinite ease-in-out;
		}

		.loader::before {
			background-color: #FF3D00;
			transform: scale(0.5) translate(-48px, -48px);
		}

		@keyframes rotation {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

		@keyframes animloader {
			50% {
				transform: scale(1) translate(-50%, -50%);
			}
		}

	}
</style>