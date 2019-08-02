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
        :login_or_signup="login_or_signup")

    v-divider
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'

export default {
  email: '',
  password: '',

  components: {
    MailPasswordForm
  },

  asyncData () {
    return {
      login_or_signup: '新規登録',
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },

  mounted: function () {
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
        this.$router.push("/member-page")
      }).catch((error) => {
        alert(error)
      });
    },

    // コンポーネントの方にかく？うまくいっていない
    emailLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        this.$router.push("/member-page")
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
