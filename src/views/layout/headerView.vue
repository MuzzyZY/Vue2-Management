<template>
  <div class="headerView">
    <div class="content">
      <div class="top">
        <div class="fl">
          <el-button icon="el-icon-s-fold" v-if='isFold' @click="changeIsFold(false)"></el-button>
          <el-button icon="el-icon-s-unfold" v-if='!isFold' @click="changeIsFold(true)"></el-button>
        </div>
        <div class="fl">
          <Crumb></Crumb>
        </div>
        <div class="fr">
          <a href="/login" @click="removeToken">退出登录</a>
        </div>
      </div>
      <div class="bottom">
        <Tags></Tags>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Crumb from '@/components/crumb.vue'
import Tags from '@/components/tags.vue'
export default {
  data() {
    return {
      isFold: true
    }
  },
  methods: {
    ...mapMutations(['updateIsCollapse']),
    changeIsFold(boolean) {
      this.isFold = boolean
      if (this.isFold == true) {
        this.updateIsCollapse(false)
      } else {
        this.updateIsCollapse(true)
      }
    },
    removeToken() {
      console.log(1)
      localStorage.removeItem('edb-authorization-token')
    }
  },
  components: {
    Crumb,
    Tags
  }
}
</script>

<style lang='less' scoped>
.headerView {
  width: 100%;
  height: 84px;
  box-shadow: 0px 5px 5px #ddd;
  .content {
    float: left;
    width: 100%;
    button {
      width: 60px;
      height: 50px;
      border: 0;
    }
    .top {
      height: 50px;
      width: 100%;
      box-shadow: 0px -5px 10px -5px #eee;
      .fl {
        float: left;
      }
      .fr {
        float: right;
        a {
          padding: 12px 20px;
          text-decoration: none;
          line-height: 50px;
          color: #606266;
          font-size: 14px;
        }
      }
    }
    .bottom {
      float: left;
      padding-left: 20px;
    }
  }
}
</style>