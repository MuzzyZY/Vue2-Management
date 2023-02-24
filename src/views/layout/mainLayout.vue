<template>
  <div class="mainContainer">
    <NavBar></NavBar>
    <div class="layout-right">
      <HeaderView></HeaderView>
      <ContentView></ContentView>
    </div>
  </div>
</template>

<script>
import NavBar from '@/views/layout/navBar.vue'
import HeaderView from '@/views/layout/headerView.vue'
import ContentView from '@/views/layout/contentView.vue'
export default {
  components: {
    NavBar,
    HeaderView,
    ContentView
  }
}
</script>

<style lang='less' scoped>
.mainContainer {
  width: 100%;
  height: 100%;
  display: flex;
  .layout-right {
    flex: 1;
    padding-left: 220px;
  }
}
</style>