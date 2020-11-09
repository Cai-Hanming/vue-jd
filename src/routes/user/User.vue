<template>
<div class="user">
  <NavBar title="个人中心" />
  <div class="user-info">
    <div class="ui-tip">管理我的账户</div>
    <div class="ui-box">
      <img src="//storage.360buyimg.com/i.imageUpload/78696168616966656e673131313131353636373937323133333639_big.jpg" alt="">
      <div>
        <div>GeekXia</div>
        <div>xiahaifeng1111</div>
      </div>
    </div>
  </div>

  <div>
    <van-cell-group>
      <van-cell title="收货地址管理" value="管理我的收货地址" is-link />
      <van-cell title="账户与安全" value="密码实名认证等管理" is-link />
    </van-cell-group>
  </div>

  <div>
    <van-grid direction="horizontal" :column-num="3">
      <van-grid-item text="意见反馈">
        <template #icon>
          <img class='icon' :src="img.feedIcon" alt="">
        </template>
      </van-grid-item>
      <van-grid-item text="京东客户端">
        <template #icon>
          <img class='icon' :src="img.appIcon" alt="">
        </template>
      </van-grid-item>
      <van-grid-item text="退出登录">
        <template #icon>
          <img class='icon' :src="img.loginIcon" alt="">
        </template>
      </van-grid-item>
    </van-grid>
  </div>
  <div class="test-img">
    <!-- 图片放在assets目录中 -->
    <img :src="img.logo" alt="">
    <div class="logo"></div>

    <!-- 图片放在public目录中 -->
    <img :src="img.logo2" alt="">
    <div class="logo2"></div>

  </div>

  <Tabbar />
</div>
</template>

<script>
import { Tabbar, NavBar } from '@/components'
import img from '@/utils/img'
import {
  Cell,
  CellGroup,
  Grid,
  GridItem
} from 'vant'

export default {
  components: {
    Tabbar,
    NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data: function() {
    return {
      img
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding-top: 1.2rem;
  .user-info{
    .ui-tip {
      line-height: 1.33rem;
      font-size: .53rem;
      padding-left: .33rem;
      box-sizing: border-box;
      background: white;
    }
    .ui-box {
      width: 9.47rem;
      height: 2.4rem;
      overflow: hidden;
      border: .03rem solid red;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: .11rem;
      background: white;
      &>img {
        float: left;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-top: .6rem;
        margin-left: .47rem;
      }
      &>div {
        line-height: .6rem;
        font-size: .43rem;
        float: left;
        margin-top: .6rem;
        margin: .47rem;
      }
    }
  }
  .icon {
    display: inline-block;
    width: .53rem;
    height: .48rem;
  }
  .test-img {
    img {
      display: inline-block;
      width: 2rem;
      height: 2rem;
    }
    .logo {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: url('../../assets/img/logo.png') 100% 100% / 2rem 2rem;
    }
    .logo2 {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: url('/logo.png') 100% 100% / 2rem 2rem;
    }
  }

}
</style>
