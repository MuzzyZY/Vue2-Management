<template>
  <div class="crumbBox">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in titles" :key="item.id">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // titles的值与当前路由相关
      // 路由一发生变化titles的值就变化
      titles: []
    }
  },
  watch: {
    $route: {
      // 刷新页面立即监听
      immediate: true,
      handler(val, oldval) {
        // 当前路由就是this.$route里面有元信息meta(存放路由相关的数据)
        this.titles = this.$route.meta.titles
      }
    }
  }
}
</script>

<style lang='less' scoped>
.el-breadcrumb {
  line-height: 50px;
}
</style>