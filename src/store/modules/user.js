import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setLocalStorageUser } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login({ accountName: username, passWord: password, msg: '1234' }).then(response => {
          const data = response.data
          const user = data.LOGIN_CURRENT_USER
          const roles = data.LONG_FUNCTION_USER_SYSTEM
          setToken(data.trackId)
          setLocalStorageUser(user)
          commit('SET_NAME', user.userName)
          commit('SET_DEPARTMENT', user.department)
          commit('SET_TOKEN', data.trackId)
          commit('SET_ROLES', roles)
          const person = {
            department: response.data.LOGIN_CURRENT_USER.department,
            LOGIN_CURRENT_USER_ROLE: response.data.LOGIN_CURRENT_USER_ROLE
          }
          getInfo({ user: JSON.stringify(person) }).then(response => {
            resolve()
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      const token = state.token
      return new Promise((resolve, reject) => {
        getInfo({ token: token }).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
