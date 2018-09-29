import request from '@/utils/request'
import sha from '@/utils/sha1'
import Qs from 'qs'

const _url = process.env.CEMSYS_API

export function login({ accountName, passWord, msg }) {
  return request({
    url: _url + '/login/',
    method: 'post',
    data: Qs.stringify({
      accountName, passWord: sha.hex_sha1(passWord), msg
    })
  })
}

export function getInfo({ user }) {
  return request({
    url: '/userlogin/login',
    method: 'post',
    data: Qs.stringify({
      user
    })
  })
}

export function logout() {
  return request({
    url: _url + '/user/logout',
    method: 'post'
  })
}

export function getFuncs() {
  return request.get(_url + '/systemfunction/getSystemfunctionByUser')
}
