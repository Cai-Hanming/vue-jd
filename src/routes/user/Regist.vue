<template>
<div class="login">
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="password2"
      type="password"
      name="password2"
      label="确认密码"
      placeholder="确认密码"
      :rules="[{ required: true, message: '请确认密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
  <router-link to="/login">已有账号，立即登录</router-link>
</div>
</template>

<script>
import { Form, Field, Button } from 'vant'
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data: function() {
    return {
      username: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    onSubmit(data) {
      this.$axios.fetchRegist(data).then(()=>{
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
