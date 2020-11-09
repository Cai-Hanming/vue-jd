<template>
<div class="good-detail">

  <NavBar :title="info.name" />

  <!-- 商品详情信息 -->
  <div>
    <img :src="img.imgBaseUrl+info.img" alt="">
    <div>
      <span>￥</span>
      <span v-text='info.price'></span>
      <span>元</span>
    </div>
  </div>

  <!-- 购买按钮 -->
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
    <van-goods-action-button type="warning" text="加入购物车" />
    <van-goods-action-button type="danger" text="立即购买" @click='buy' />
  </van-goods-action>
</div>
</template>

<script>
import { NavBar } from '@/components'
import img from '@/utils/img'
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant'
export default {
  data: function() {
    return {
      info: {},
      img
    }
  },
  components: {
    NavBar,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  mounted() {
    this.$axios.fetchGoodDetail({good_id: this.$route.params.id}).then(res=>{
      console.log('商品详情', res)
      this.info = res
    })
  },
  methods: {
    buy() {
      console.log('buy')
      const data = {
        num: 1,
        good_id: this.info._id
      }
      this.$axios.fetchBuy(data).then((res)=>{
        console.log('res', res)
        if(res) {
          // 添加购物车成功后，跳转至购物车页面
          this.$router.replace('/cart')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
