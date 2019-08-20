import Vue from 'vue'
import Vuex from 'vuex'

export const strict = false

export const state = () => ({
  user: null,
  loginType: null,
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setLoginType(state, payload){
    state.loginType = payload
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setLoginType ({ commit }, payload) {
    commit('setLoginType', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}
