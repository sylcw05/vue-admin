import { getFuncs } from '@/api/login'
import { constantRouterMap, allMenus } from '@/router'
import { fetchConfig } from '@/api/config'
import { getLocalStorageUser } from '../../utils/auth'

// import { getConfigItem } from '@/utils'

// 处理菜单权限
function filterMenus(menus, funcs) {
  const accessed = menus.filter(menu => {
    if (menu.name) {
      if (menu.name === 'sy') {
        return true
      } else if (funcs.hasOwnProperty(menu.name)) {
        if (menu.children && menu.children.length) {
          menu.children = filterMenus(menu.children, funcs)
        } else {
          const o = funcs[menu.name]
          // 跳转外站处理
          if (o['url']) {
            menu['meta']['url'] = o['url']
          }
          // 权限处理
          if (o['perms']) {
            menu['meta']['perms'] = o['perms']
          }
        }
        return true
      } else if (menu.name.includes('wrapper')) {
        if (menu.children && menu.children.length) {
          menu.children = filterMenus(menu.children, funcs)
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  })
  return accessed
}

// 处理路由
function filterRoutes(menus) {
  const result = []
  menus.forEach((menu) => {
    if (menu.meta.hiddenRoute) {
      if (menu.children) {
        result.push(...menu.children)
      }
    } else {
      result.push(menu)
    }
  })
  return result
}

// 处理从后台获取的功能菜单
// let yjstandardUrl = ''
const flattenFuncs = (funcs) => {
  const map = {}
  const remaining = []
  const handler = (item) => {
    if (map.hasOwnProperty(item.parent.className)) {
      map[item.parent.className]['perms'] = map[item.parent.className]['perms'] ? map[item.parent.className]['perms'] : []
      map[item.parent.className]['perms'].push(item.className)
    } else {
      remaining.push(item)
    }
  }
  funcs.forEach((item) => {
    if (item.menuType === 4) {
      handler(item)
    } else {
      map[item.className] = item
    }
  })
  remaining.forEach(handler)
  return map
}

export default {
  state: {
    funcs: null,
    allMenus: [],
    addRouters: [],
    currentMenu: 'exam',
    config: null
  },
  mutations: {
    SET_FUNCS(state, funcs) {
      state.funcs = funcs
    },
    SET_MENUS: (state, menus) => {
      state.allMenus = menus
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.concat(constantRouterMap)
    },
    SET_CONFIG: (state, config) => {
      state.config = config
    },
    SET_CURRENTMENU: (state, menu) => {
      state.currentMenu = menu
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    }
  },
  actions: {
    GetPermissions({ commit }) {
      return new Promise((resole, reject) => {
        getFuncs().then(resp => {
          const map = flattenFuncs(resp.data)
          const user = getLocalStorageUser()
          commit('SET_FUNCS', map)
          commit('SET_NAME', user.userName)
          commit('SET_DEPARTMENT', user.department)
          resole(map)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GenerateRoutes({ commit }, funcs) {
      return new Promise(resolve => {
        // 权限处理
        const accessableMenus = filterMenus(allMenus, funcs)
        commit('SET_MENUS', accessableMenus)
        // 路由处理
        const accessableRoutes = []
        accessableRoutes.push(...filterRoutes(accessableMenus))
        commit('SET_ROUTERS', accessableRoutes)
        resolve()
      })
    },
    GetConfig({ commit }) {
      return new Promise((resole, reject) => {
        fetchConfig().then(resp => {
          commit('SET_CONFIG', resp.data.rows)
          // yjstandardUrl = getConfigItem(resp.data.rows, 'cemsysurl')
          resole()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetCurrentMenu({ commit }, menu) {
      commit('SET_CURRENTMENU', menu)
    }
  }
}

