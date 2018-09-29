import request from '@/utils/request'
import Qs from 'qs'

const _url = process.env.CEMSYS_API

export const getWorkList = async(search, page, limit) => {
  return await request.get(_url + '/worker/list', {
    params: { search, page, limit }
  })
}

export const getRoleTable = async(page, rows, likeName) => {
  return await request.get(_url + '/role/findRole/', {
    params: {
      page,
      rows,
      likeName
    }
  })
}

export const getRole = async() => {
  return await request.get(_url + '/role/queryAll')
}

export const getPower = async() => {
  return await request.get(_url + '/systemfunction/doDynchronTreeJson/')
}

export const deleteRole = async(id) => {
  return await request.get(_url + '/role/deleteById/', {
    params: {
      id
    }
  })
}

export const saveRole = async({ roleName, typeNum, description, id, functionList_id }) => {
  return await request.post(_url + '/role/save/', Qs.stringify({
    roleName,
    typeNum,
    description,
    id,
    functionList_id
  }))
}

export const getRoleDetail = async(id) => {
  return await request.get(_url + '/role/getEntity', {
    params: {
      id
    }
  })
}

export const getAllPower = async() => {
  return await request.get(_url + '/systemfunction/querySystemfunction')
}

