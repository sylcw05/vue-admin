import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // withCredentials: true,
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.method.toLowerCase() === 'get') {
    if (!config.params) {
      config.params = {
        'trackId': getToken()
      }
    } else {
      config.params = {
        ...config.params,
        'trackId': getToken()
      }
    }
  } else if (config.method.toLowerCase() === 'post') {
    if (config.data instanceof FormData) {
      config.data.append('trackId', getToken())
    } else {
      if (!config.data) {
        config.data = `?trackId=${getToken()}`
      } else {
        config.data += `&trackId=${getToken()}`
      }
    }
  }
  return config
}, error => {
  console.log('请求拦截器', error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
    // 请求超时
    if (res.result === 'TIMEOUT') {
      MessageBox.confirm('检测到您已10分钟无动作，为保护您的隐私，已退出登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      })
      return Promise.reject(res)
    } else if (res.result !== 'SUCCESS') {
      // 请求返回错误
      if (!(res.flag && res.flag.length)) {
        Message({
          message: res.message,
          type: 'error',
          duration: 2 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      // 请求成功
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
