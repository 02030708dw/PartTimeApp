const baseUrl = 'http://192.168.124.3:7110'

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
				resolve(res)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
	return promise
}