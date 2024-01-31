<template>
	<view class="container_box">
		<view class="NavBar_box">
			<!-- 导航栏 -->
			<uni-nav-bar :border="false" :title="$t('index.top')" color="#fff" background-color="#0134e1">
				<template #right>
					<!--      <div @click="lanControl" class="lan">{{$t('index.top')}} <uni-icons type="bottom" color="#fff"/></div>-->
					<div class="icons">
						<uni-icons color="#fff" type="headphones" />
						<uni-icons color="#fff" type="chat" />
					</div>
				</template>
			</uni-nav-bar>
		</view>

		<!-- 列表 -->
		<view class="list_box">
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
								<image src="../../static/image/index/index_ico.png" mode=""></image>
							</view>
						</view>
						<view class="right_bottom_box">
							<!-- 价格 -->
							<view class="price_box">
								${{item.amount}}
							</view>
							<!-- 按钮 -->
							<view class="btn_box">
								<button type="primary">领取任务</button>
							</view>
						</view>
					</view>
				</view>
				<view class="item_bottom_box">
					<uni-collapse :show-animation="true">
						<uni-collapse-item  :border="false">
							<template v-slot:title>
								<div class="item_bottom_title">说明{{item.rule[2]}}</div>
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
	import { https } from '../../utils/https.js'
	// import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	// import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	import { ref,onMounted,reactive } from 'vue'
	var ListData = ref([])
	// 总条数
	const total = ref()
	// 页码
	const pageNo = ref(1)
	// 请求数据
	const GetData = () => {
		https('/materialTask','get',{pageNo:pageNo.value,pageSize:10}).then(res=>{
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
	import { onReachBottom } from '@dcloudio/uni-app'
	
	const status = ref('loading')
	
	// 触底刷新
	onReachBottom(() => {
		status.value = 'loading'
		if(ListData.value.length >= total.value){
			status.value = 'no-more'
			return
		}else{
			pageNo.value ++
			https('/materialTask','get',{pageNo:pageNo.value,pageSize:10}).then(res=>{
				for(let i = 0 ; i < res.data.resultSet.data.length ; i++){
					ListData.value.push(res.data.resultSet.data[i])
				}
				if(ListData.value.length >= total.value){
					status.value = 'no-more'
					
				}else{
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
		.NavBar_box {
			width: 100vw;
			position: fixed;
			top: 0rpx;
			left: 0rpx;
			z-index: 9999;
		}

		min-height: 100vh;
		background-color: #F5F8FF;
		padding-top: 88rpx;
		padding-bottom: 40rpx;

		.icons {
			display: flex;
			width: 100%;
			justify-content: space-around;
			font-size: 80rpx;
		}

		// 列表
		.list_box {
			width: 100vw;
			margin-top: 32rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.item_box {
				width: 686rpx;
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
						image{
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
								width: 168rpx;
								height: 56rpx;
								box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(2, 86, 255, 0.29);

								button {
									width: 168rpx;
									height: 56rpx;
									font-size: 24rpx;
								}
							}
						}

					}
				}

				.item_bottom_box {
					margin-top: 32rpx;
					.item_bottom_title{
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
	}
</style>