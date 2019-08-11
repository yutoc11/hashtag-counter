<template lang="pug">
  v-app

    v-toolbar.white--text(color="pink darken-2")
      //v-toolbar-side-icon.white--text
      v-toolbar-title.pt-1.px-0
        nuxt-link.white--text.font-weight-bold(to="/") #カウンター
      v-spacer
      v-toolbar-items(v-if="isAuthenticated")
        v-btn(flat)
          nuxt-link.white--text.font-weight-bold(:to="mypageUrl") マイページ
      v-toolbar-items(v-else)
        v-btn(flat)
          nuxt-link.white--text.font-weight-bold(to="/login") ログイン
        v-btn
          nuxt-link.black--text.font-weight-bold(to="/signup") 新規登録

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="pink darken-2")
      v-flex.font-weight-bold(
        color="pink darken-2"
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
        )  &copy;2019 — #カウンター
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },

  asyncData () {
    return {
      user: [],
    }
  },

  computed: {

    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),

    ...mapState({
      mypageUrl: (state) => `/user/${state.user.uid}`
    }),
  },

  methods: {
    ...mapActions(['setUser']),
  }


}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
