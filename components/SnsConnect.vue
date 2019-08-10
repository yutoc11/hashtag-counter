<template lang="pug">
  v-container.my-0
    v-container
      h2.headline.text-xs-center.font-weight-thin
        | SNSアカウントで{{ login_or_signup }}

    v-container.my-0.py-2(text-xs-center fluid)
      v-btn.mx-3.my-0.font-weight-bold(
        outline
        round
        color="#dd4b39"
        @click="googleLogin") Googleアカウントで{{ login_or_signup }}
    v-container.my-0.py-2(text-xs-center fluid)
      v-btn.mx-3.my-0.font-weight-bold(
        outline
        round
        color="#55acee"
        @click="twitterLogin") Twitterアカウントで{{ login_or_signup }}
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  props: ['login_or_signup'],

  asyncData () {
    return {
      login_or_signup: '',
    }
  },

  computed: {
  },

  methods: {

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

    twitterLogin () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      .then(user => {
        // ログインしたら飛ぶページを指定　したいけど動いてない
        this.$router.push("/")
      }).catch((error) => {
        alert(error)
      });
    },
  }
}
</script>

<style>

</style>
