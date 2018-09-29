import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permissions from './modules/permissions'
import beforeExam from './modules/beforeExam'
import escorting from './modules/escorting'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permissions,
    beforeExam,
    escorting
  },
  getters
})

export default store
