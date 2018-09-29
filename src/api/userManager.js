import request from '@/utils/request'

const _url = process.env.CEMSYS_API

export function getWorkList(search, page, limit) {
  return request.get(_url + '/worker/list', {
    params: {
      search, page, limit
    }
  })
}

export function findUser({ page, rows, likeName, roleId }) {
  return request.get(_url + '/user/findUser/', {
    params: {
      page, rows, likeName, roleId
    }
  })
}

export const saveUser = async(formData) => {
  return await request.post(_url + '/user/saver', formData)
}

export function getAllDpTree() {
  return request.get(_url + '/department/doDynchronTreeJson/')
}

export function deleteUser(id) {
  return request.get(_url + '/user/deleteById/', {
    params: {
      id
    }
  })
}

export function getuserDetail(id) {
  return request.get(_url + '/user/getEntity', {
    params: {
      id
    }
  })
}

export function delAllUser(userIds) {
  return request.get(_url + '/user/deleteByIds', {
    params: {
      userIds
    }
  })
}

export const getAllRoles = async() => {
  return await request.get(_url + '/role/queryAll')
}
