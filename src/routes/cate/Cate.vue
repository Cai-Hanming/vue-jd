<template>
<div class="cate">

  <!-- 左侧侧边栏 -->
  <div class="left">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for='cate in cateArr'
        :key='cate._id'
        :title="cate.cate_zh"
      />
    </van-sidebar>
  </div>

  <!-- 左侧区域 -->
  <div class="right">
    <van-grid :column-num="3">
      <van-grid-item v-for="good in goodList" :key="good._id">
        <van-image :src="img.imgBaseUrl+good.img" />
        <div class="good-name" v-text='good.name'></div>
      </van-grid-item>
    </van-grid>
  </div>

  <Tabbar />
</div>
</template>

<script>
import {
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Image
} from 'vant'

import { Tabbar } from '@/components'
import { mapState, mapMutations } from 'vuex'
import img from '@/utils/img'
export default {
  components: {
    Tabbar,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  data: function() {
    return {
      img,
      activeKey: 0,
      cateArr: [],
      goodList: []
    }
  },
  computed: {
    ...mapState('cate', ['cateObj'])
  },
  watch: {
    activeKey: function() {
      this.getList(this.cateArr[this.activeKey].cate)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations('cate', ['updateCateObj']),
    // 页面初始化
    async init() {
      let { list } = await this.$axios.fetchAllCates({})
      this.cateArr = list
      this.getList(this.cateArr[0].cate)
    },
    // 根据cate品类来筛选商品列表
    getList(cate) {
      // 判断cateObj中，有没有缓存数据
      // 如果有，直接使用 this.goodList = this.cateObj
      // 如果没有，再调接口
      if (this.cateObj[this.activeKey]) {
        this.goodList = this.cateObj[this.activeKey]
      } else {
        this.$axios.fetchGoodListOfCate({cate}).then(res=>{
          console.log('商品列表', res)
          this.goodList = res.list
          // 调接口成功时，要把得到的数据缓存到vuex中去
          this.updateCateObj({idx: this.activeKey, arr: res.list})
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cate {
  position: relative;
  height: 100%;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 1.33rem;
    width: 2.27rem;
    overflow: auto;
  }
  .right {
    position: absolute;
    top: 0;
    bottom: 1.33rem;
    right: 0;
    left: 2.27rem;
    overflow: auto;
    .good-name {
      font-size: .32rem;
      color: #333333;
      line-height: .64rem;
      padding-top: .27rem;
    }
  }
}
</style>
