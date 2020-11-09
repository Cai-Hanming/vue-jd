<template>
<div class="cart">
  <!-- 自定义顶部navbar -->
  <NavBar title='购物车' />

  <!-- 购物车列表 -->
  <div v-for='item in list' :key='item._id' class="row">
    <!-- swipe-cell实现，向左滑动、删除功能 -->
    <van-swipe-cell>
      <!-- 一行，type='flex' align='center' 实现上下居中 -->
      <van-row type='flex' align='center'>
        <!-- 第一列，放checkbox -->
        <van-col span="4">
          <van-checkbox v-model="item.checked" @change='rowChange'></van-checkbox>
        </van-col>
        <!-- 第二列，放card -->
        <van-col span="20">
          <van-card
            :num="item.num"
            :price="item.good.price"
            :desc="item.good.desc"
            :title="item.good.name"
            :thumb="img.imgBaseUrl+item.good.img"
          >
            <template #footer>
              <van-button size="mini" @click='changeNum(item, "sub")'>-</van-button>
              <van-button size="mini" @click='changeNum(item)'>+</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>

      <!-- 这是swipe-cell的插槽 -->
      <template #right>
        <van-button
          @click='delGood(item)'
          square text="删除"
          type="danger"
          class="delete-button"
        />
      </template>
    </van-swipe-cell>
  </div>

  <!-- 底部提交按钮 -->
  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
    <van-checkbox :value='full' @click='change'>全选</van-checkbox>
  </van-submit-bar>

</div>
</template>

<script>
import {
  Card,
  Tag,
  Button,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Col,
  Row,
  Toast,
  Dialog
} from 'vant'

import { NavBar } from '@/components'
import img from '@/utils/img'
export default {
  name: 'Cart',
  // 局部路由守卫，写到哪个组件中，就拦截哪个组件
  // 在局部守卫函数中，是没有this的，因为组件还没有实例化
  // beforeRouteEnter(to, from, next) {
  //   let isLogin = false
  //   if(isLogin) {
  //     next()
  //   }else {
  //     next('/login')
  //   }
  // },
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [SwipeCell.name]: SwipeCell,
    [Col.name]: Col,
    [Row.name]: Row,
    NavBar
  },
  data: function() {
    return {
      img,
      list: [],
      full: false
    }
  },
  computed: {
    // 计算属性有两种写法，k:fn  k:{set:fn, get:fn}
    // full: {
    //   get() {
    //     let arr = this.list.filter(ele=>ele.checked)
    //     return arr.length === this.list.length
    //   },
    //   set(v) {
    //     console.log('v', v)
    //     this.list.map((ele,idx,arr)=>{
    //       arr[idx].checked = v
    //     })
    //   }
    // },
    // 总价计算
    total() {
      let t = 0
      this.list.map(ele=>{
        if(ele.checked) {
          t += ele.num*ele.good.price*100
        }
      })
      return t
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化页面
    init() {
      this.$axios.fetchCartList({}).then(arr=>{
        console.log('商品列表', arr)
        this.list = arr
      })
    },
    // 修改数量
    changeNum(item, flag) {
      let data = {
        id: item._id,
        num: flag ? item.num-1 : item.num+1
      }
      if(data.num <= 0) return Toast('商品数据不能小于1')
      this.$axios.fetchUpdateNum(data).then(()=>{
        console.log('数据修改成功')
        // this.init()
        // 为了刷新页面，并且保证勾选状态不变化，前端手动修改数据
        this.list.map((ele,idx,arr)=>{
          if(ele._id === item._id) {
            arr[idx].num = data.num
          }
        })
      })
    },
    // 删除商品
    delGood(item) {
      Dialog.confirm({
        title: '警告',
        message: '你确定要删除当前商品吗？',
      }).then(() => {
        this.$axios.fetchDelGood({id: item._id}).then(()=>{
          // this.init()
          // 为了刷新页面，并且保证勾选状态不变化，前端手动修改数据
          this.list = this.list.filter(ele=>ele._id!==item._id)
        })
      })
    },
    // 每一个行checkbox
    rowChange() {
      let arr = this.list.filter(ele=>ele.checked)
      if(arr.length>0) {
        this.full = (arr.length===this.list.length)
      }
    },
    // 全选的checkbox
    change() {
      this.full = !this.full
      this.list.map((ele,idx)=>{
        this.list[idx].checked = this.full
      })
    },
    // 提交购物车
    onSubmit() {
      let goods = '' // 购物车列表项id拼接成的字符串
      this.list.map(ele=>{
        if(ele.checked) {
          goods += (';'+ele._id)
        }
      })
      this.$axios.fetchCartSubmit({goods}).then(()=>{
        Toast('下单成功')
        // 后端会返回一些加密的支付字符串，用于支付
        this.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  background-color: white;
  padding-bottom: 1.47rem;
  padding-top: 1.25rem;
  .row {
    margin-top: .13rem;
    border-top: 1px solid #eee;
  }
  .van-card {
    background-color: white;
    border-bottom: .03rem solid white;
    padding-left: 0;
  }
  .delete-button {
    height: 100%;
  }
  .van-button {
    padding: 0 .27rem;
  }
}



</style>
