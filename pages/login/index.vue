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

  mounted: function () {
    console.log( this.$route.path )
    console.log( this.$route.name )

    firebase.auth().onAuthStateChanged((user)=> {
      var user = firebase.auth().currentUser;
        if (user) {

          this.user = user

          this.isLogin = true
          console.log(this)
          console.log(user)
          this.userData = user
          this.$store.commit('login', this.userData)

          this.$router.push("/")

        } else {
          this.isLogin = false
          this.userData = null
        };
    })
  },

  methods: {
    ...mapActions(['setUser']),

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
