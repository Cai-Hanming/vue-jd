<template>
<div class="good-item" @click='skipToDetail'>
  <img :src="img.imgBaseUrl+good.img" alt="">
  <div class="gi-desc" v-text='good.desc'></div>
  <div class="gi-bot">
    <span>￥</span>
    <span v-text='good.price'></span>
    <span>看相似</span>
  </div>
</div>
</template>

<script>
import img from '@/utils/img'
export default {
  props: {
    good: { type: Object, required: true }
  },
  data: function() {
    return {
      img
    }
  },
  methods: {
    skipToDetail() {
      this.$router.push('/detail/'+this.good._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.good-item {
  flex: 1;
  background: white;
  border: 1px solid #eee;
  img {
    display: block;
    width: 5rem;
    height: 5rem;
  }
  .gi-desc {
    margin: .2rem 0;
    font-size: .35rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: .53rem;
    // padding: .2rem 0;
  }
  .gi-bot {
    height: .8rem;
    line-height: .8rem;
    overflow: hidden;
    &>span:nth-child(1) {
      float: left;
      color: red;
      font-size: .29rem;
    }
    &>span:nth-child(2) {
      float: left;
      color: red;
      font-size: .4rem;
    }
    &>span:nth-child(3) {
      float: right;
      font-size: .29rem;
      height: .4rem;
      line-height: .4rem;
      border: 1px solid #ccc;
      padding: 0 .07rem;
      margin-top: .2rem;
    }
  }
}
</style>
