<template lang="pug">
  section.section

    sns-connect(:login_or_signup="login_or_signup")

    mail-password-form(
      :login_or_signup="login_or_signup"
      @emailpass-click-login="emailLogin")

    v-layout.text-xs-center(justify-center)
      v-btn(small outline color='grey lighten-1' round)
        nuxt-link.grey--text(to="reset") パスワードを忘れた方はこちら
</template>

<script>
import SnsConnect from '~/components/SnsConnect'
import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  components: {
    MailPasswordForm,
    SnsConnect
  },

  asyncData () {
    return {
      login_or_signup: 'ログイン',
      isWaiting: true,
      isLogin: false,
      email: '',
      password: '',
      login_data: [],
    }
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
          this.setUser(user)
          this.$router.push('/?flash=login')
        }
    })
  },

  methods: {

    ...mapActions(['setUser']),

    emailLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      });
    },

    logOut () {
      firebase.auth().signOut()
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
