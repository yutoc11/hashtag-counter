<template lang="pug">
  v-app

    v-toolbar.white--text(color="pink darken-2")
      app
      v-toolbar-side-icon.white--text
      v-toolbar-title.font-weight-bold
        nuxt-link.white--text.font-weight-bold(to="/") #カウンター
      v-spacer
      v-toolbar-items(v-if="this.user.uid")
        v-btn(flat)
          //nuxt-link.white--text.font-weight-bold(:to="mypageUrl") マイページ
          nuxt-link.white--text.font-weight-bold(to="/login") マイページにしたいけどうまくいかない
      v-toolbar-items(v-else)
        v-btn(flat)
          nuxt-link.white--text.font-weight-bold(to="/login") ログイン
        v-btn
          nuxt-link.black--text.font-weight-bold(to="/signup") 新規登録

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="pink darken-2")
      app
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
      user: [],
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },

  asyncData () {
    return {
      user: [],
    }
  },

  computed: {
    ...mapState(['user']),

    ...mapState({
      mypageUrl: (state) => `/user/${state.user.uid}`
    }),
  },

  beforeCreate: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      var user = firebase.auth().currentUser; // eslint-disable-line
        if (user) {

          this.user = user

          this.isLogin = true
          console.log(this)
          console.log(user)
          this.userData = user
          this.$store.commit('login', this.userData)

        } else {
          this.isLogin = false
          this.userData = null
        };
    })
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
