import request from '@/utils/request'

const _url = process.env.CEMSYS_API

export const getAddressTree = async params => {
  return await request({
    url: _url + '/address/doDynchronTreeJson',
    method: 'get',
    params
  })
}

export const getAsyncAddress = async params => {
  console.log(params)
  return await request({
    url: _url + '/address/getSSXTree',
    method: 'get',
    params
  })
}
