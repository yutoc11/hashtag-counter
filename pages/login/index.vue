<template lang="pug">
  section.section

    sns-connect(:login_or_signup="login_or_signup")

    mail-password-form(
      :login_or_signup="login_or_signup"
      @emailpass-click-login="emailLogin")

    v-layout.text-xs-center(justify-center)
      v-btn.grey--text(small outline color='grey lighten-1' round to="reset" nuxt) パスワードを忘れた方はこちら
</template>

<script>
import SnsConnect from '~/components/SnsConnect'
import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  head() {
    return {
      title:'ログイン'
    }
  },

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
      title: 'ログイン',
    }
  },

  computed: {
    ...mapState(['user']),
    ...mapState(['loginType']),
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
    ...mapActions(['setLoginType']),

    emailLogin() {
      var loginType='email';
      this.setLoginType(loginType)
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
    },
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
