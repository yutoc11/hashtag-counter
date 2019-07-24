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
      mail-password-form(:login_or_signup="login_or_signup")

    v-divider
</template>

<script>
import HashtagInput from '~/components/HashtagInput'
import MyHashtag from '~/components/MyHashtag'
import MailPasswordForm from '~/components/MailPasswordForm'

import firebase from '@/plugins/firebase'

export default {
  name: 'HomePage',

  components: {
    HashtagInput,
    MyHashtag,
    MailPasswordForm
  },

  asyncData () {
    return {
      login_or_signup: 'ログイン',
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },

  mounted: function () {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  
  methods: {
    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
