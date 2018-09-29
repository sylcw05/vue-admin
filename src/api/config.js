import request from '@/utils/request'
import Qs from 'qs'

export const fetchConfig = async({ key, page, limit } = {}) => {
  return await request.get('/configuration/find', {
    params: {
      key, page, limit
    }
  })
}

export const saveConfig = async({ Configuration }) => {
  return await request.post('/configuration/saveOrUpdate', Qs.stringify({ Configuration }))
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
