<template>
  <div class="contentView">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.contentView {
  padding: 20px;
  height: calc(100% - 124px);
}
// 进场的效果
.fade-transform-enter,
.fade-transform-leave-to {
  opacity: 0;
}
// 指定要过渡的属性
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}
// 结束的效果 和 离场的开始效果
.fade-transform-enter-to,
.fade-transform-leave {
  opacity: 1;
}
</style>