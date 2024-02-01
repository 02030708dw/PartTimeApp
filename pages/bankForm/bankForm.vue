<template>
	<view class="NavBar_box"><uni-nav-bar :border="false" :title="$t('back.backSubmit')" color="#fff"
			background-color="#0134e1">
			<template #left>
				<div class="icons" @click="fallback">
					<uni-icons color="#fff" type="left" />
				</div>
			</template>
			<template #right>
				<div class="icons">
					<uni-icons color="#fff" type="headphones" />
					<uni-icons color="#fff" type="chat" />
				</div>
			</template>
		</uni-nav-bar></view>

	<!-- 银行卡表单 -->
	<view class="example">
		<uni-forms ref="baseForm" label-position="top" :modelValue="baseFormData" :rules="rules">
			<uni-forms-item :label-width='200' :label="$t('back.account')" required name="bankAccount">
				<uni-easyinput v-model="baseFormData.bankAccount" :placeholder="$t('back.accountTips')" />
			</uni-forms-item>
			<uni-forms-item :label-width='200' :label="$t('back.back')" required name="bankName">
				<uni-easyinput v-model="baseFormData.bankName" :placeholder="$t('back.backTips')" />
			</uni-forms-item>
			<uni-forms-item :label-width='200' :label="$t('back.card')" required name="bankNumber">
				<uni-easyinput v-model="baseFormData.bankNumber" :placeholder="$t('back.cardTips')" />
			</uni-forms-item>
			<uni-forms-item :label-width='200' :label="$t('back.amount')" required name="money">
				<uni-easyinput v-model="baseFormData.money" :placeholder="$t('back.amountTips')" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="onSubmit">{{$t('back.submit')}}</button>
	</view>
</template>


<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		https
	} from '../../utils/https.js'

	const baseFormData = reactive({
		bankAccount: '',
		backName: '',
		bankNumber: '',
		money: '',
	});

	const rules = reactive({
		bankAccount: {
			rules: [{
				required: true,
				errorMessage: 'The username cannot be empty',
			}]
		},
		bankName: {
			rules: [{
				required: true,
				errorMessage: 'The bank cannot be empty',
			}]
		},
		bankNumber: {
			rules: [{
				required: true,
				errorMessage: 'The bank card number cannot be empty',
			}, {
				pattern: /^\d+$/,
				errorMessage: 'The bank card number must be numeric',
			}]
		},
		money: {
			rules: [{
				required: true,
				errorMessage: 'The withdrawal amount cannot be empty',
			}, {
				pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
				errorMessage: 'The withdrawal amount must be a valid figure',
			}]
		},
	})

	const baseForm = ref(null);

	const onSubmit = () => {
		baseForm.value.validate().then(res => {
			let {
				bankAccount,
				bankName,
				bankNumber,
				money
			} = res
			https("/materialTaskWithdraw/add", 'post', {
				bankAccount,
				bankName,
				bankNumber,
				money
			}).then(res => {
				uni.showToast({
					title: '提交成功',
					duration: 2000
				});
				resetForm()
			})
		});
	};
	const resetForm = () => {
		for (let key in baseFormData) {
			baseFormData[key] = ''; // 重置所有表单字段
		}
	}
	
	const fallback = () =>{
		uni.navigateBack({
			delta:1
		})
	}
</script>


<style lang="scss">
	.NavBar_box {
		width: 100vw;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 9999;

		.icons {
			display: flex;
			width: 100%;
			justify-content: space-around;
			font-size: 40rpx;
		}
	}

	.example {
		padding: 15px;
		background-color: #fff;

		.segmented-control {
			margin-bottom: 15px;
		}
	}
</style>