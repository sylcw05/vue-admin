import request from '@/utils/request'
import Qs from 'qs'

const _url = process.env.CEMSYS_API

export function getSysList(likeName, page, rows) {
  return request.get(_url + '/systemfunction/querySystemfunction', {
    params: {
      likeName, page, rows
    }
  })
}

export function getDictSys(parentCode) {
  return request.get(_url + '/systemfunction/doDynchronTreeJson', {
    params: {
      parentCode
    }
  })
}

export const editWorker = async(worker) => {
  return await request.post(_url + '/worker/update', Qs.stringify({
    worker
  }))
}

export const updateWorkerState = async(id, state) => {
  return await request.post(_url + '/worker/updateState', Qs.stringify({
    id, state
  }))
}

export function deleteSys(ids) {
  return request.get(_url + '/systemfunction/deleteByIds', {
    params: {
      ids
    }
  })
}

export const saveSys = async(Systemfunction) => {
  return await request.post(_url + '/systemfunction/saveOrUpdate', Qs.stringify({
    Systemfunction
  }))
}
