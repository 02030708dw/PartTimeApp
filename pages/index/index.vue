<template>
	<view class="container_box">
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
		<!-- 列表 -->
		<view class="list_box">
			<!-- 选项 -->
			<view class="item_box" v-for="i in 10" :key="i">
				<!-- top -->
				<view class="item_top_box">
					<!-- left -->
					<view class="left_box">
						图片
					</view>
					<!-- right -->
					<view class="right_box">
						<view class="right_top_box">
							<!-- 标题 -->
							<view class="title_box">
								标题******************
							</view>
							<!-- 图标 -->
							<view class="right_ico_box">
								<image src="../../static/image/index/index_ico.png" mode=""></image>
							</view>
						</view>
						<view class="right_bottom_box">
							<!-- 价格 -->
							<view class="price_box">
								$100.00
							</view>
							<!-- 按钮 -->
							<view class="btn_box">
								<button type="primary">领取任务</button>
							</view>
						</view>
					</view>
				</view>
				<view class="item_bottom_box">
					<uni-collapse :show-animation="true" >
						<uni-collapse-item  :title-border="none" :border="false">
							<template v-slot:title>
								说明******************
							</template>
							<view class="content">
								<text class="text">123</text>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
	import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
</script>

<style lang="scss" scoped>
	.container_box {
		min-height: 100vh;
		background-color: #F5F8FF;
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
						border: 2rpx solid red;
					}

					.right_box {

						.right_top_box {
							display: flex;
							align-items: center;
							justify-content: space-between;

							// 标题
							.title_box {
								width: 362rpx;
								height: 32rpx;
								font-size: 32rpx;
								font-weight: 600;
								color: #333330;
								line-height: 32rpx;
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
					::v-deep(.uni-collapse-item) {
						width: 622rpx;
						
					}

					
				}

			}
			.item_box:nth-child(n+2){
				margin-top: 20rpx;
			}
		}
	}
</style>