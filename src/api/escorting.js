import request from '@/utils/request'
import Qs from 'qs'

const _url = process.env.CEMSYS_API

export function getCity(info) {
  return request({
    url: _url + '/address/getSSXTree?id=' + info.id,
    method: 'GET'
  })
}

export function getCar({ areaNumber, ksjhId }) {
  return request({
    url: '/sjysrwxx/getNowlist',
    method: 'POST',
    data: Qs.stringify({
      areaNumber, ksjhId
    })
  })
}

export function getDecisionRoute(sjysrwxxId) {
  return request({
    url: '/appRealtimeTrajectory/getNowList',
    method: 'POST',
    data: Qs.stringify({
      sjysrwxxId: sjysrwxxId
    })
  })
}

export function getDecisionRouteInfo(id) {
  return request({
    url: '/sjysrwxx/getRelate',
    method: 'POST',
    data: Qs.stringify({
      id: id
    })
  })
}
