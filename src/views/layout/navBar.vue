<template>
  <div class="navBar" :class="{Collapse:isCollapse==true}">
    <h1>
      <div class="logo">
        <img src="@/assets/logo.png" alt="" width="24px" height="24px">
      </div>
      <span v-if="!isCollapse">通用管理后台系统</span>
    </h1>
    <el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b" :unique-opened='true' :router='true' :default-active='$route.path'>
      <div v-for="item,index in userMenuData" :key="index">
        <el-submenu :index="item.path" v-if='item.children'>
          <template slot="title">
            <!-- <svg-icon data_iconName='download' iconClass='download'></svg-icon> -->
            <!-- <svg-icon icon-class="download"></svg-icon> -->
            <i class="el-icon-copy-document"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="item1.path" v-for="item1,idx in item.children" :key="idx">{{item1.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isCollapse', 'userMenuData'])
  },
  data() {
    return {
      //   menuData: [
      //     {
      //       title: '首页',
      //       path: '/home'
      //     },
      //     {
      //       title: '客户管理',
      //       path: '/customer',
      //       children: [
      //         { title: '客户档案', path: '/customer/userInfo' },
      //         { title: '拜访记录', path: '/customer/visit' }
      //       ]
      //     },
      //     {
      //       title: '修养预约',
      //       path: '/appointment',
      //       children: [
      //         { title: '预约信息', path: '/appointment/info' },
      //         { title: '服务项', path: '/appointment/service' },
      //         { title: '结算单', path: '/appointment/statement' }
      //       ]
      //     },
      //     {
      //       title: '流程管理',
      //       path: '/flow',
      //       children: [{ title: '审核流程定义', path: '/flow/definition' }]
      //     }
      //   ]
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.navBar {
  position: fixed;
  width: 220px;
  height: 100%;
  background-color: #304156;
  box-shadow: 6px 0 5px #ccc;
  transition: all 0.3s;
  h1 {
    position: relative;
    padding: 10px;
    height: 20px;
    .logo {
      float: left;
      padding-top: 2px;
      padding-left: 10px;
      img {
        vertical-align: baseline;
      }
    }
    span {
      position: absolute;
      left: 52px;
      top: 16px;
      min-width: 130px;
      display: inline-block;
      font-size: 16px;
      color: #fff;
    }
  }
  .el-menu {
    border: 0;
  }
  // 同时拥有navBar和isCollapse这个类名时触发
  &.Collapse {
    width: 64px;
  }
}
.Collapse .el-submenu__title span,
::v-deep .el-menu .el-submenu__icon-arrow {
  display: none;
}
.Collapse .el-menu-item span {
  display: none;
}
</style>