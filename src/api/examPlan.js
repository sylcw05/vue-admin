import request from '@/utils/request'
import Qs from 'qs'

const _url = process.env.CEMSYS_API

export function getExamPlan({ pageNo, pageSize }) {
  return request({
    url: '/ksjh/pageQuery',
    method: 'POST',
    data: Qs.stringify({
      pageNo, pageSize
    })
  })
}

export function addOne({ ksdq, ksdqdz, ksgzsj, kslb, ksnf, kssj }) {
  return request({
    url: '/ksjh/addOne',
    method: 'POST',
    data: Qs.stringify({
      ksdq: ksdq, ksdqdz: ksdqdz, sjgjkssj: ksgzsj[0], sjgjjssj: ksgzsj[1], kslb: kslb, ksnf: ksnf, kskssj: kssj[0], ksjssj: kssj[1]
    })
  })
}

export function getAddressListByParentCode() {
  return request({
    url: _url + '/address/getAddressListByParentCode?addressCode=440000',
    method: 'get'
  })
}

export function updateOne({ id, ksdq, ksdqdz, ksgzsj, kslb, ksnf, kssj }) {
  return request({
    url: '/ksjh/updateOne',
    method: 'POST',
    data: Qs.stringify({
      id: id, ksdq: ksdq, ksdqdz: ksdqdz, sjgjkssj: ksgzsj[0], sjgjjssj: ksgzsj[1], kslb: kslb, ksnf: ksnf, kskssj: kssj[0], ksjssj: kssj[1]
    })
  })
}

export function deleteOneOrAll({ ids }) {
  return request({
    url: '/ksjh/deleteOneOrAll',
    method: 'POST',
    data: Qs.stringify({
      ids: ids
    })
  })
}

export function getPersonInfo({ pageNo, pageSize }) {
  return request({
    url: '/sjysrwxx/pageQuery',
    method: 'POST',
    data: Qs.stringify({
      pageNo, pageSize
    })
  })
}

export function getExamList() {
  return request({
    url: '/ksjh/getAll',
    method: 'get'
  })
}

export function addRoute({ routePogrammeEntity }) {
  return request({
    url: '/routepogramme/addOne',
    method: 'post',
    data: Qs.stringify({
      routePogrammeEntity
    })
  })
}

export function getRouteInfo({ id }) {
  return request({
    url: '/routepogramme/getBysjysrwxxId',
    method: 'post',
    data: Qs.stringify({
      sjysrwxxId: id
    })
  })
}

export function delectPersonCar({ ids }) {
  return request({
    url: '/sjysrwxx/deleteOneOrAll',
    method: 'post',
    data: Qs.stringify({
      ids: ids
    })
  })
}

export function delCenter({ ids }) {
  return request({
    url: '/routepogramme/deleteOneOrAll',
    method: 'post',
    data: Qs.stringify({
      ids
    })
  })
}

export function updateRoute({ routePogrammeEntity }) {
  return request({
    url: '/routepogramme/updateOne',
    method: 'post',
    data: Qs.stringify({
      routePogrammeEntity
    })
  })
}
