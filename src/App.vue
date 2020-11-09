<template>
<div class="app">
  <!-- 只有首页、分类页、我的这3个页面不用每次重置与销毁 -->
  <keep-alive>
    <router-view name='alive'></router-view>
  </keep-alive>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
  background-color: rgba(246, 246, 246, 1);
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
/* 购物中，实现checkbox左右居中 */
.van-checkbox__icon {
  margin: 0 auto;
}
</style>
