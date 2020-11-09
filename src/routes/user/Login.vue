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
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <router-link to="/regist">没有账号，立即注册</router-link>
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
      password: ''
    }
  },
  methods: {
    onSubmit(data) {
      console.log(data)
      this.$axios.fetchLogin(data).then(res=>{
        console.log('登录成功', res)
        // 登录成功时，把token存储到localStorage中去，用于路由守卫中条件判断
        localStorage.setItem('token', res.token)
        // 登录成功，跳转至首页
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
