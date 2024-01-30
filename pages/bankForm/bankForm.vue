<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="NavBar_box"><uni-nav-bar :border="false" :title="$t('back.submit')" color="#fff"
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
			<uni-forms-item label="户名" required name="bankAccount">
				<uni-easyinput v-model="baseFormData.bankAccount" placeholder="请输入户名" />
			</uni-forms-item>
			<uni-forms-item label="银行名" required name="bankName">
				<uni-easyinput v-model="baseFormData.bankName" placeholder="请输入银行名" />
			</uni-forms-item>
			<uni-forms-item label="银行卡号" required name="bankNumber">
				<uni-easyinput v-model="baseFormData.bankNumber" placeholder="请输入银行卡号" />
			</uni-forms-item>
			<uni-forms-item label="提现金额" required name="money">
				<uni-easyinput v-model="baseFormData.money" placeholder="请输入提现金额" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="onSubmit">提交</button>
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
				errorMessage: '户名不能为空',
			}]
		},
		bankName: {
			rules: [{
				required: true,
				errorMessage: '银行名不能为空',
			}]
		},
		bankNumber: {
			rules: [{
				required: true,
				errorMessage: '银行卡号不能为空',
			}, {
				pattern: /^\d+$/,
				errorMessage: '银行卡号必须是数字',
			}]
		},
		money: {
			rules: [{
				required: true,
				errorMessage: '提现金额不能为空',
			}, {
				pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
				errorMessage: '提现金额必须是有效的数字',
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