<template>
	<view class="target">

  </view>
</template>

<script>
var wv;
	export default {
		data() {
			return {
        wvSrc:""
			}
		},
    onLoad(option){
      const e=this.getOpenerEventChannel()
      e.on('scriptTarget',d=>{
        const channel = new WebViewJavascriptChannel(bridge);
        function bridge(msg) {
          channel.postMessage(JSON.stringify({'type':'target', 'content': d}));
        }
      })
    },
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.target{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
