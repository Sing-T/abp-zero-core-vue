import { getAllPermissions } from '@/api/role'

const role = {
  state: {
    allPermissions: []
  },

  mutations: {
    SET_ALLPERMISSION: (state, allPermissions) => {
      state.allPermissions = allPermissions
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
