import { getCity, getCar, getDecisionRoute, getDecisionRouteInfo } from '@/api/escorting'
const Escorting = {
  actions: {
    GetCity({ commit }, info) { // 获取相关下级区域或城市
      return new Promise(resolve => {
        getCity(info).then(response => {
          resolve(response)
        })
      })
    },

    GetCar({ commit }, info) { // 获取相关区域下车辆
      return new Promise(resolve => {
        getCar(info).then(response => {
          resolve(response)
        })
      })
    },

    GetDecisionRoute({ commit }, id) { // 获取轨迹点
      return new Promise(resolve => {
        getDecisionRoute(id).then(response => {
          resolve(response)
        })
      })
    },

    GetDecisionRouteInfo({ commit }, id) { // 获取轨迹车辆人员信息
      return new Promise(resolve => {
        getDecisionRouteInfo(id).then(response => {
          resolve(response)
        })
      })
    }
  }
}

export default Escorting
