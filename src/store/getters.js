const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  department: state => state.user.department,
  roles: state => state.user.roles,
  funcs: function(state) {
    return state.permissions.funcs
  },
  allMenus: function(state) {
    return state.permissions.allMenus
  },
  addRouters: function(state) {
    return state.permissions.addRouters
  }
}
export default getters
