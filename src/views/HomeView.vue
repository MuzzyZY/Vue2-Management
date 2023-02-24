<template>
  <div class="home">
    <MainLayOut></MainLayOut>
  </div>
</template>

<script>
import MainLayOut from '@/views/layout/mainLayout.vue'
export default {
  name: 'home',
  components: {
    MainLayOut
  }
}
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>