<template lang="pug">
  section.section

    sns-connect(:login_or_signup="login_or_signup")

    mail-password-form(
      :login_or_signup="login_or_signup"
      @emailpass-click-signup="emailSignup")
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
      title:'新規登録'
    }
  },

  components: {
    SnsConnect,
    MailPasswordForm
  },

  asyncData () {
    return {
      login_or_signup: '新規登録',
      isWaiting: true,
      isLogin: false,
      user: [],
      email: '',
      password: '',
    }
  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
        this.$router.push('/?flash=signup')
      }
    })
  },

  mounted: function () {
  },

  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),

    emailSignup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      });
    },
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
