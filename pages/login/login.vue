<script setup>
import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {ref} from 'vue'
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
const languageRef=ref(null)
const onLogin = () => {
  uni.switchTab({
    url:'/pages/index/index'
  })
}
const lanControl = () => languageRef.value.open()
const langs=[{
  text: 'english',
  code: 'en'
},
  {
    text: '中文',
    code: 'zh-Hans'
  },]
</script>
<script>
export default {
  name: "login",
  data(){
    return{
      localL:''
    }
},
  onLoad(){
    this.localL=uni.getLocale()
    uni.onLocaleChange((e) => {
      this.localL = e.locale;
    })
  },
  methods:{
    selectLang(v) {
      uni.setLocale(v)
      this.$i18n.locale = v;
      this.$refs.languageRef.close()
    }
  },
}
</script>

<template>
<uni-nav-bar :border="false" color="#fff" background-color="#0134e1">
  <template #right>
    <div @click="lanControl" class="lan">{{$t('login.top')}} <uni-icons type="bottom" color="#fff"/></div>
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
    <div class="form">
      <text class="text_4">登陆</text>
      <view class="text-wrapper_2">
        <input class="text_5" placeholder="请输入账号">
      </view>
      <view class="text-wrapper_3">
        <input class="text_6" placeholder="请输入密码">
      </view>
      <view class="text-wrapper_4">
        <view class="text_7" @click="onLogin">登陆</view>
      </view>
    </div>
  </view>
</template>

<style scoped lang="scss">
.lan{
  width: 100px !important;
}
@mixin flex {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
}
.login{
  height: calc(95vh);
  width: 100%;
  background: #0134e1;
  display: flex;
  justify-content: center;
  align-items: center;
.form{
  transform: translateY(-50%);
  .text_4 {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: right;
    white-space: nowrap;
    line-height: 22px;
    margin: 137px 278px 0 19px;
  }
  .text-wrapper_2 {
    background-color: rgba(255, 255, 255, 0.1);
    margin: 57px 27px 0 19px;
    padding: 18px 181px 18px 24px;
  }

  .text_5 {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 18px;
  }

  .text-wrapper_3 {
    background-color: rgba(255, 255, 255, 0.1);
    margin: 24px 27px 0 19px;
    padding: 18px 181px 18px 24px;
  }

  .text_6 {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 18px;
  }

  .text-wrapper_4 {
    box-shadow: 0px 4px 10px 0px rgba(0, 85, 255, 0.29);
    background-color: rgba(2, 86, 255, 1);
    border-radius: 8px;
    margin: 32px 27px 0 19px;
    padding: 18px 129px 18px 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text_7 {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    font-weight: normal;
    text-align: right;
    white-space: nowrap;
    line-height: 18px;
  }
}
}
.popup-content {
  @include flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: 50px;
  color: #000;
  background-color: #fff;
  .text{
    &:hover{
      color: #0256FF;
    }
    margin-top: 10rpx;
  }
}
</style>