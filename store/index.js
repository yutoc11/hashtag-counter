import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      uid: '', // 初期値
      name: ''
    },
    mutations: {
      login (state, user) {
        state.user = user
        state.uid = state.user.uid
        state.name = state.user.displayName
      },
      logout (state) {
        state.user = null
      }
    }
  })
}
//
// export default store
//
// export const strict = false
//
// export const state = () => ({
//   user: null,
// })
//
// export const mutations = {
//   setUser (state, payload) {
//     state.user = payload
//   }
// }
//
// export const actions = {
//   setUser ({ commit }, payload) {
//     commit('setUser', payload)
//   }
// }
//
// export const getters = {
//   isAuthenticated (state) {
//     return !!state.user
//   }
// }
