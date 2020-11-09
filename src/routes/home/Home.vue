<template>
<div class="home">

  <!-- 用下拉刷新把整个页面都包起来 -->
  <!-- van-pull-refresh提供了下拉刷新功能 -->
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh">

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      mode='closeable'
      background='#C82519'
      color='#ffffff'
      text="京东双11就要到了，最低1折。为了更好体验，请下载app。"
    />

    <!-- 搜索框 -->
    <van-search
      shape="round"
      disabled
      show-action
      background="#C82519"
      :placeholder="searchText"
    >
      <template #action>
        <div class="search-btn" @click='skipToLogin'>登录</div>
      </template>
    </van-search>

    <!-- 轮播图 -->
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="item in images" :key="item._id">
        <img v-lazy="img.imgBaseUrl+item.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表提示条 -->
    <div class="good-list-title">
      <img src="//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png" alt="">
    </div>

    <!-- 商品列表 -->
    <div class="good-list">
      <!-- van-list提供了触底加载功能 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset='50'
        :immediate-check='false'
      >
        <div class="good-list-row" v-for='i in row' :key='i'>
          <GoodItem :good='list[2*i-2]' />
          <GoodItem :good='list[2*i-1]' />
        </div>
      </van-list>
    </div>

  </van-pull-refresh>

  <!-- 底部Tabbar -->
  <Tabbar />
</div>
</template>


<script>
import Vue from 'vue'
import {
  Button,
  Search,
  NoticeBar,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  PullRefresh
} from 'vant'
Vue.use(Lazyload)  // 不注册，v-lazy指令可能用不了

import {
  Tabbar,
  GoodItem
} from '@/components'
import img from '@/utils/img'

export default {
  name: 'Home',
  components: {
    [Button.name]: Button,
    [Search.name]: Search,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    Tabbar,
    GoodItem
  },
  data: function() {
    return {
      img,
      searchArr: [
        { id: 1, text: '微波炉' },
        { id: 2, text: '手机' },
        { id: 3, text: '电脑' },
        { id: 4, text: '消毒液' }
      ],
      images: [],
      list: [],
      page: 1,
      // 控制“下拉刷新”，当它为true表示正在下拉
      refreshing: false,
      // 控制"触底加载"，当它为true表示正在触底
      loading: false,
      finished: false
    }
  },
  computed: {
    searchText: function() {
      let idx = Math.floor(Math.random()*this.searchArr.length)
      return this.searchArr[idx].text
    },
    row: function() {
      return Math.floor(this.list.length / 2)
    }
  },
  mounted() {
    this.getList()
    this.$axios.fetchAdList({}).then(res=>{
      this.images = res.list
    })
  },
  methods: {
    getList() {
      // 获取商品列表
      let params = {
        page: this.page,
        size: 6
      }
      this.$axios.fetchHotGoodList(params).then(res=>{
        console.log('商品列表', res)
        if (this.refreshing) {
          // 下拉刷新，重置数组
          this.list = res.list
          this.refreshing = false
          // 恢复 触底加载功能
          this.finished = false
        } else {
          // 触底加载时，合并数组
          this.list = [...this.list, ...res.list]
          this.loading = false
        }
        // 表示数据库中的数据已经没有了
        if(this.list.length >= res.total) {
          // 当finished=true时，触底加载暂时关闭了
          this.finished = true
        }
      })
    },
    skipToLogin() {
      console.log('跳转至登录页')
    },
    // 下拉刷新时触发
    onRefresh() {
      console.log('正在下拉刷新')
      this.page = 1
      this.getList()
    },
    // 列表触底时触发
    onLoad() {
      console.log('列表到底了', this.finished, this.loading)
      // 触底时，page加1，调接口获取下一页的数据
      this.page++
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.home {
  padding-bottom: 1.6rem;
  .search-btn {
    color: white;
  }
  .van-swipe {
    width: 100%;
    height: 4.67rem;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .good-list-title {
    margin-top: .13rem;
    img {
      display: block;
      width: 100%;
      height: .93rem;
    }
  }
  .good-list-row {
    display: flex;
  }
}
</style>
