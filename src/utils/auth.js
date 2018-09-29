import Cookies from 'js-cookie'

const TokenKey = 'trackId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLocalStorageUser() {
  const user = window.localStorage.getItem('user')
  if (user !== 'undefined') {
    return JSON.parse(user)
  } else {
    return null
  }
}

export function setLocalStorageUser(userInfo) {
  window.localStorage.setItem('user', JSON.stringify(userInfo))
}

export function removeLocalStorageUser() {
  window.localStorage.removeItem('user')
}

export const mixins = {
  methods: {
    checkAuth: function(auth) {
      return this.$route.meta.perms ? this.$route.meta.perms.includes(auth) : false
    },
    checkAuthsSome: function(auths) {
      return Boolean(this.checkAuthsLength(auths))
    },
    checkAuthsEvery: function(auths) {
      return this.checkAuthsLength(auths) === auths.length
    },
    checkAuthsLength: function(auths) {
      if (this.$route.meta.perms) {
        let flag = 0
        auths.forEach((item) => {
          if (this.$route.meta.perms.includes(item)) {
            flag++
          }
        })
        return flag
      } else {
        return 0
      }
    }
  }
}

export const getDepartment = () => {
  return new Promise((resolve, reject) => {
    const department = JSON.parse(localStorage.getItem('user')).LOGIN_CURRENT_USER.department
    if (department) {
      resolve(department)
    } else {
      reject(department)
    }
  })
}
