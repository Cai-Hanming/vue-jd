import axios from 'axios'
// 当接口异常时，弹出提示框
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

// 上线时，要把本地这个baseUrl改成线上的后端访问地址
const baseURL = 'http://localhost:8001'

const version = '/api/v1'

const instance = axios.create({
  baseURL: baseURL+version,
  timeout: 7000,
  headers: {}
})

instance.interceptors.request.use(function (config) {
  // 加token鉴权（识别你是谁）
  // 在发送请求之前，在headers中加上token，发送给后端
  // 后端使用这个token来验证你的身份
  config.headers.Authorization = localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
  let res = null
  // 对后端数据进行过滤
  if (response.status === 200) {
    if (response.data && response.data.err === 0) {
      res = response.data.data
    } else {
      Toast(response.data.msg)
    }
  } else {
    Toast('网络异常，请稍后再试')
  }
  return res
}, function (error) {
  return Promise.reject(error);
})

export default instance
