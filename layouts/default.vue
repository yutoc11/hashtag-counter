<template lang="pug">
  v-app

    v-toolbar.white--text(color="pink darken-2" dense)
      //v-toolbar-side-icon.white--text
      v-toolbar-title.pt-1.px-0
        nuxt-link.white--text.font-weight-bold(to="/") #カウンター
      v-spacer
      v-toolbar-items(v-if="isAuthenticated")
        v-btn.white--text.font-weight-bold(flat :to="mypageUrl" nuxt) マイページ
      v-toolbar-items(v-else)
        v-btn.white--text.font-weight-bold(flat to="/login" nuxt) ログイン
        v-btn.black--text.font-weight-bold(to="/signup" nuxt) 新規登録

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="pink lighten-3")
      v-layout(justify-center)
        nuxt-link.caption.px-4.white--text.font-weight-bold(to="../terms") 利用規約
        nuxt-link.caption.px-4.white--text.font-weight-bold(to="../privacy") プライバシーポリシー
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

body{
  max-width: 700px;
  margin: 0 auto;
}
.section{
  margin: 0 auto;
}
.v-toolbar__content{
  height: 40px;
}
</style>
