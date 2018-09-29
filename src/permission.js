import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getLocalStorageUser } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() && getLocalStorageUser()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.getters.funcs) {
        store.dispatch('GetPermissions').then(resp => {
          return store.dispatch('GenerateRoutes', resp)
        }).then(resp => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        }).catch(error => {
          console.error(error)
          store.dispatch('FedLogOut').then(() => {
            Message.error(error.message || '获取用户权限失败,请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
