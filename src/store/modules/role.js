import { getAllPermissions } from '@/api/role'

const role = {
  state: {
    role: {},
    allPermissions: []
  },

  mutations: {
    SET_ALLPERMISSION: (state, allPermissions) => {
      state.allPermissions = allPermissions
    },
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },

  actions: {
    GetAllPermissions({ commit }) {
      return new Promise((resolve, reject) => {
        getAllPermissions().then(response => {
          const data = response.result.items

          commit('SET_ALLPERMISSION', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role
