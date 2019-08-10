<template lang="pug">
  section.section

    sns-connect(:login_or_signup="login_or_signup")

    mail-password-form(
      :login_or_signup="login_or_signup"
      @emailpass-click-login="emailLogin")
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
          this.$router.push('/?flash=login')
        }
    })
  },

  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),

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
