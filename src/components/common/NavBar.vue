<template>
<div class="nav-bar">
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    fixed
  />
</div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
