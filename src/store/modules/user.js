import { login, logout, getInfo } from '@/api/user'
import { getWorkflowRouters } from '@/api/workflow/routers'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import routerFormat from '@/utils/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routers:[],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROUTERS: (state, routers) => {
      if(routers){
          state.routers = state.routers.concat(routerFormat(routers)) // 菜单显示
      }
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, routers } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)

        //let menuList = res.data.menuList //这是后端的菜单数据
      let  menuList = [
          {id:39,title:"IT中心",path:"/it",parent_id:null},
          {id:150,title:"IT资产",path:"/asset",parent_id:39},
          {id:151,title:"资产管理",path:"/edit",parent_id:150},
          {id:153,title:"时段统计",path:"/time",parent_id:150},
          {id:40,title:"系统设置",path:"/system",parent_id:null},
      ]
      let menuRouters = [] //定义一个空数组，这个是用来装真正路由数据的

        //下面就要根据后端的菜单数据组装树型路由数据
        //先取出根节点，没有父id的就是根节点
          menuList.forEach((m, i) => {
              m.path = m.path.replace(/^(\s|\/)+|(\s|\/)+$/g,'');
              if (m.parent_id == null) {
                  let module = {
                      path: '/'+m.path,
                      component: "Layout",
                      hidden:true,
                      meta: {
                          title: m.title,
                          fullPath: m.path,
                          id: m.id,
                      },
                      children: []
                  }
                  menuRouters.push(module)
              }
          })
        //定义一个递归方法
          function convertTree(routers) {
              routers.forEach(r => {
                  menuList.forEach((m, i) => {
                      if (m.parent_id && m.parent_id === r.meta.id) {
                          if (!r.children) r.children = []
                          m.fullPath = r.meta.fullPath + '/' + m.path
                          let menu = {
                              path: m.path,
                              component: m.fullPath,
                              meta: { id: m.id, title: m.title,fullPath: m.fullPath }
                          }
                          r.children.push(menu)
                      }
                  })
                  if (r.children && r.children.length > 0) {
                      convertTree(r.children)
                      r.redirect = '/'+r.children[0].meta.fullPath
                      //console.log(r.children[0].meta)
                  }
              })
          }
          convertTree(menuRouters) //用递归填充
          //router.addRoutes(routerFormat(menuRouters)) //挂载到router
        commit('SET_ROUTERS', menuRouters)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getWorkflowRouters({commit}) {
      return new Promise((resolve, reject) => {
          getWorkflowRouters().then(response => {
              const {data} = response
              if (!data) {
                  reject('Verification failed, please Login again.')
              }
              const { groups } = data
              let routers = []
              groups.forEach(function(group){
                  let router ={
                      path: '/workflow',
                      component: "Layout",
                      meta: {title: group.name, icon: "dashboard"},
                      children: []
                  };
                  group.children.forEach(function(children){
                      router.children.push({
                          path: '/workflow/' + children.id,
                          name:"workflowApplyList"+children.id,
                          component: "workflow",
                          meta: {
                              title: children.name,
                          }
                      })
                  })
                  routers.push(router)
              })
              //commit('SET_ROUTERS',routers)
              resolve(data)
          }).catch(error => {
              reject(error)
          })
      })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
