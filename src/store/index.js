import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否折叠
    isCollapse: false,
    // 用户菜单数据
    userMenuData:[]
  },
  getters: {
  },
  mutations: {
    updateIsCollapse(state,value){
      state.isCollapse = value
    },
    setMenuData(state,value){
      state.userMenuData = value
    }
  },
  actions: {
  },
  modules: {
  }
})
