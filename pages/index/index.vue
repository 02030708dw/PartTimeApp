<template>
  <uni-nav-bar :border="false" :title="$t('index.top')" color="#fff" background-color="#0134e1">
    <template #right>
<!--      <div @click="lanControl" class="lan">{{$t('index.top')}} <uni-icons type="bottom" color="#fff"/></div>-->
      <div class="icons">
        <uni-icons color="#fff" type="headphones"/>
        <uni-icons color="#fff" type="chat"/></div>
    </template>
  </uni-nav-bar>
</template>

<script setup>
import UniNavBar from "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
</script>

<style lang="scss" scoped>
.icons{
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 20px;
}
</style>