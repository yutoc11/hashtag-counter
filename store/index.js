import Vue from 'vue'
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
