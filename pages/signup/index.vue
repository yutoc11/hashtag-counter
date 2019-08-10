<template lang="pug">
  section.section

    sns-connect(:login_or_signup="login_or_signup")

    v-container
      mail-password-form(
        :login_or_signup="login_or_signup"
        @emailpass-click-signup="emailSignup")

    v-divider
</template>

<script>
import SnsConnect from '~/components/SnsConnect'
import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
import store from '~/store/index.js'

export default {
  email: '',
  password: '',

  components: {
    SnsConnect,
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

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      var user = firebase.auth().currentUser;
        if (user) {
          this.setUser(user)
          this.user = user
          console.log(user)
          this.$router.push('/?flash=signup')
        }
    })
  },

  mounted: function () {
  },

  methods: {
    ...mapActions(['setUser']),
    ...mapGetters(['isAuthenticated']),

    // コンポーネントの方にかく？うまくいっていない
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
