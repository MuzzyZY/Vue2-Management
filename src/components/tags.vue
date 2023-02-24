<template>
  <div>
    <el-tag size="small" :closable='index>0' class="tag" v-for="item,index in tags" :key="item.path" :effect="item.title==$route.meta.titles[$route.meta.titles.length - 1]?'dark':'plain'" @click="goTo(item.path)" @close='close(index)' :disable-transitions='true'>{{item.title}}</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    }
  },
  methods: {
    goTo(val) {
      this.$router.push(val)
    },
    close(i) {
      // 判断是否为当前项
      // this.tags[i].title为点击的那一项
      // this.$route.meta.titles[this.$route.meta.titles.length - 1]为路由的那一项
      if (this.tags[i].path == this.$route.path && i !== this.tags.length - 1) {
        // 跳转到最后一项
        this.$router.push(this.tags[this.tags.length - 1].path)
      }
      // 判断是否为最后一项
      else if (i == this.tags.length - 1) {
        this.$router.push(this.tags[this.tags.length - 2].path)
      }
      this.tags.splice(i, 1)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, oldval) {
        // 判断当前路径没有在tags里面的路径之中
        if (
          !this.tags.find(item => {
            return val.path == item.path
          })
        ) {
          this.tags.push({
            title: val.meta.titles[val.meta.titles.length - 1],
            path: val.path
          })
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.tag {
  margin-right: 5px;
}
</style>