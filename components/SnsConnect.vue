<template lang="pug">
  v-container.my-0
    v-container
      h2.headline.text-xs-center.font-weight-thin
        | SNSアカウントで
        br
        | {{ login_or_signup }}

    v-container(v-if="this.$route.name == 'signup'")
      v-layout(justify-center)
        a.body-2.texe-xs-center(href='../terms' target="_blank") 利用規約
      v-layout(justify-center)
        div
          v-checkbox(
            v-model="termConsentSNS"
            label="利用規約に同意"
            required)

      v-layout.my-0.py-2(justify-center)
        v-btn.my-0.font-weight-bold(
          :disabled="!termConsentSNS"
          outline
          round
          color="#dd4b39"
          @click="googleLogin") Googleで{{ login_or_signup }}
      v-layout.my-0.py-2(justify-center)
        v-btn.my-0.font-weight-bold(
          :disabled="!termConsentSNS"
          outline
          round
          color="#55acee"
          @click="twitterLogin") Twitterで{{ login_or_signup }}


    v-container(v-else)

      v-layout.my-0.py-2(justify-center)
        v-btn.my-0.font-weight-bold(
          outline
          round
          color="#dd4b39"
          @click="googleLogin") Googleで{{ login_or_signup }}
      v-layout.my-0.py-2(justify-center)
        v-btn.my-0.font-weight-bold(
          outline
          round
          color="#55acee"
          @click="twitterLogin") Twitterで{{ login_or_signup }}
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  props: ['login_or_signup'],

  data(){
    return{
      termConsentSNS: false,
    }
  },

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
