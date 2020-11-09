import axios from './axios'

// import { fetchRegist } from '@/utils/api'
export function fetchRegist(data) {
  return axios({
    url: '/user/regist',
    method: 'POST',
    data   // POST请求用data选项作为入参，GET请求用params选项作为入参
  })
}

export function fetchLogin(data) {
  return axios({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 首页获取商品列表
export function fetchHotGoodList(params) {
  return axios({
    url: '/jd/good/list',
    method: 'GET',
    params
  })
}

// 获取全部品类
export function fetchAllCates(params) {
  return axios({
    url: '/jd/cates',
    method: 'GET',
    params
  })
}

// 根据品类进行筛选
export function fetchGoodListOfCate(params) {
  return axios({
    url: '/jd/good/list',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function fetchGoodDetail(params) {
  return axios({
    url: '/jd/good/detail',
    method: 'GET',
    params
  })
}



// 添加购物车
export function fetchBuy(data) {
  return axios({
    url: '/jd/cart/add',
    method: 'POST',
    data
  })
}

// 获取购物车商品列表
export function fetchCartList(params) {
  return axios({
    url: '/jd/cart/list',
    method: 'GET',
    params
  })
}

// 修改购物车中商品的数量
export function fetchUpdateNum(data) {
  return axios({
    url: '/jd/cart/update',
    method: 'POST',
    data
  })
}

// 删除购物车中的商品
export function fetchDelGood(params) {
  return axios({
    url: '/jd/cart/del',
    method: 'GET',
    params
  })
}

// 提交购物车
export function fetchCartSubmit(data) {
  return axios({
    url: '/jd/cart/submit',
    method: 'POST',
    data
  })
}

// 获取轮播图列表
export function fetchAdList(params) {
  return axios({
    url: '/ad/list',
    method: 'GET',
    params
  })
}

// import api from '@/utils/api'
export default {
  fetchRegist,
  fetchLogin,
  fetchHotGoodList,
  fetchAllCates,
  fetchGoodListOfCate,
  fetchGoodDetail,
  fetchBuy,
  fetchCartList,
  fetchUpdateNum,
  fetchDelGood,
  fetchCartSubmit,
  fetchAdList
}
