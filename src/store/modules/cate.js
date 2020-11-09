
// 状态管理工具，实际上在Vue应用中是可选的，是可以不要的。
// 它的作用：组件之间数据共享，缓存数据。

export default {
  namespaced: true,
  state: {
    cateObj: {}
  },
  getters: {},
  mutations: {
    updateCateObj(state, payload) {
      state.cateObj[payload.idx] = payload.arr
    }
  },
  actions: {}
}
