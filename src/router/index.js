import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

const _url = process.env.TOURL
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

const dashboard = {
  name: 'sy',
  path: '/sy',
  component: _import('dashboard/index'),
  type: 'item',
  meta: {
    title: '首页',
    icon: 'sy',
    noCache: true,
    hiddenRoute: true
  }
}

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    name: 'decision',
    path: '/decision',
    type: 'submenu',
    component: _import('decision/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/sy',
    children: [
      dashboard
    ]
  }
]

export const asyncConstantRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]

export const allMenus = [
  dashboard,
  {
    name: 'xtgl',
    path: '/xtgl',
    redirect: 'noredirect',
    component: Layout,
    type: 'submenu',
    meta: {
      hidden: false,
      title: '系统管理',
      icon: 'xtgl'
    },
    children: [
      {
        name: 'yhgl',
        path: 'yhgl',
        component: _import('userManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '用户管理'
        }
      },
      {
        name: 'jsgl',
        path: 'jsgl',
        component: _import('roleManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '角色管理'
        }
      },
      {
        name: 'qxgl',
        path: 'qxgl',
        component: _import('sysfuncManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '权限管理'
        }
      }
    ]
  },
  {
    name: 'sjgzbpgl',
    path: '/sjgzbpgl',
    redirect: 'noredirect',
    component: Layout,
    type: 'submenu',
    meta: {
      hidden: false,
      title: '编排管理',
      icon: 'bpgl'
    },
    children: [
      {
        name: 'sjgzksjh',
        path: 'sjgzksjh',
        component: _import('examPlan/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '考试计划'
        }
      },
      {
        name: 'sjgzryclbp',
        path: 'sjgzryclbp',
        component: _import('personCarManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '人员车辆编排'
        }
      },
      {
        hidden: true,
        name: 'sjgzyyxcgh',
        path: 'sjgzyyxcgh',
        component: _import('routeManager/index'),
        type: 'item',
        meta: {
          hidden: true,
          title: '押运行程规划'
        }
      }
    ]
  },
  {
    name: 'sjgzsjgz',
    path: '/sjgzsjgz',
    redirect: 'noredirect',
    component: Layout,
    type: 'submenu',
    meta: {
      hidden: false,
      title: '试卷跟踪',
      icon: 'sjyy'
    },
    children: [
      {
        name: 'sjgzgjjp',
        path: 'sjgzgjjp',
        component: _import('examPlan/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '轨迹纠偏'
        }
      },
      {
        name: 'sjgzsqsjsx',
        path: 'sjgzsqsjsx',
        component: _import('personCarManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '上墙数据筛选'
        }
      },
      {
        name: 'sjgzjczh',
        path: 'sjgzjczh',
        component: _import('routeManager/index'),
        type: 'item',
        meta: {
          hidden: false,
          title: '决策指挥',
          url: _url + '#/decision'
          // url: 'http://localhost:8081#/decision'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

