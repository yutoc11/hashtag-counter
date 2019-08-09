<template lang="pug">
  section.section

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | SNSアカウントで{{ login_or_signup }}

    v-container.my-0.py-2(text-xs-center fluid)
      v-btn.mx-3.my-0.font-weight-bold(
        outline
        round
        color="#dd4b39"
        @click="googleLogin") Googleアカウントでログイン
    v-container.my-0.py-2(text-xs-center fluid)
      v-btn.mx-3.my-0.font-weight-bold(
        outline
        round
        color="#55acee"
        @click="twitterLogin") Twitterアカウントでログイン

    v-container
      mail-password-form(
        :login_or_signup="login_or_signup"
        @emailpass-click-login="emailLogin")

    v-divider
</template>

<script>

import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  components: {
    MailPasswordForm
  },

  asyncData () {
    return {
      login_or_signup: 'ログイン',
      isWaiting: true,
      isLogin: false,
      user: [],
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
      var user = firebase.auth().currentUser;
        if (user) {
          this.setUser(user)
          this.user = user
          console.log(user)
          this.$router.push("/")
        }
    })
  },

  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),

    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      .then(user => {
        // ログインしたら飛ぶページを指定　したいけど動いてない
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      });
    },

    // コンポーネントの方にかく？うまくいっていない
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
