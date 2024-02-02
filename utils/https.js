const baseUrl = 'https://ww1.44dog.cc'

export function https(url, method, data = null) {
	// 设置请求头
	var header = {
		'content-type': 'application/json',
	};
	var token = uni.getStorageSync('token');
	// if (token != '') {
	header = {
		'content-type': 'application/json',
		'Authorization': token ? 'Bearer_' + token : ''
	};
	// }
	let promise = new Promise(function(resolve, reject) {
		uni.request({
			header: header,
			url: baseUrl + url, //请求地址
			method: method, //请求方式
			data: data, // 参数
			success: (res) => {
				if (res.data.resCode==='000000') return resolve(res)
				else if (res.data.resCode==='000104'){
					uni.removeStorageSync('token')
					uni.showToast({
						title: 'login jwt is expired,please login again',
						icon: 'error',
						duration: 2000
					});
					uni.navigateTo({url:'/'})
				}
				reject(res)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
	return promise
}