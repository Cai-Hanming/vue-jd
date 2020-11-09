<template>
<div class="tabbar">
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
    <van-tabbar-item icon="search" to='/cate'>分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" :badge="total" to='/cart'>购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to='/user'>我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data: function() {
    return {
      total: 0
    }
  },
  mounted() {
    this.$axios.fetchCartList({}).then(arr=>{
      console.log('arr', arr)
      this.total = arr.length
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
