import { getExamPlan, addOne, getAddressListByParentCode, updateOne, deleteOneOrAll, getPersonInfo, getExamList, addRoute, getRouteInfo, delectPersonCar, delCenter, updateRoute } from '@/api/examPlan'

const beforeExam = {
  state: {
  },

  mutations: {
  },
  actions: {
    GetExamPlan({ commit }, exam) { // 获取考试计划列表
      return new Promise((resolve, reject) => {
        getExamPlan(exam).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    AddOne({ commit }, exam) { // 添加考试计划场次
      return new Promise((resolve, reject) => {
        addOne(exam).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetAddressListByParentCode({ commit }, addressCode) { // 获取考试地区
      return new Promise((resolve, reject) => {
        getAddressListByParentCode().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    UpdateOne({ commit }, exam) { // 添加考试计划场次
      return new Promise((resolve, reject) => {
        updateOne(exam).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeleteOneOrAll({ commit }, exam) { // 删除考试计划场次
      return new Promise((resolve, reject) => {
        deleteOneOrAll(exam).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetPersonInfo({ commit }, pageInfo) { // 获取考试计划列表
      return new Promise((resolve, reject) => {
        getPersonInfo(pageInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelectPersonCar({ commit }, pageInfo) { // 删除考试计划列表
      return new Promise((resolve, reject) => {
        delectPersonCar(pageInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetExamList() { // 获取考试场次
      return new Promise((resolve, reject) => {
        getExamList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    AddRoute({ commit }, route) { // 添加行程中间点
      return new Promise((resolve, reject) => {
        addRoute(route).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetRouteInfo({ commit }, id) { // 获取行程中间点
      return new Promise((resolve, reject) => {
        getRouteInfo(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelCenter({ commit }, id) { // 删除行程中间点
      return new Promise((resolve, reject) => {
        delCenter(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    UpdateRoute({ commit }, route) { // 修改行程中间点
      return new Promise((resolve, reject) => {
        updateRoute(route).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default beforeExam
