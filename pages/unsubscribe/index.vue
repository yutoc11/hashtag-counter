<template lang="pug">
  section.section
    v-layout.text-xs-center(justify-center row)
      v-container.text-xs-center.white
        v-card(flat)
          v-card-title(primary-title)
            h4 退会はこちら
          v-form(v-if="cUser")
            v-btn.my-3.white--text.font-weight-bold(outline color='grey' round @click="deleteUser") 本当に退会する
          v-card-text(v-else)
            | 退会完了しました。
            br
            | 今までご利用いただきまして、誠にありがとうございます。
</template>

<script>

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  head() {
    return {
      title:'退会はこちら'
    }
  },

  data () {
    return {
      cUser:true
    };
  },

  asyncData () {
    return {
    }
  },

  components: {
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),

  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
      }
    })
  },

  mounted: function () {

  },

  methods: {
    ...mapActions(['setUser']),

    //ユーザー削除
    deleteUser(){
      this.cUser = null
      this.setUser(null)
      var user = firebase.auth().currentUser;
      user.delete().then(function() {
        console.log('User deleted.')
      }).catch(function(error) {
        // An error happened.
        alert('ユーザーデータを削除できませんでした。再度お試しください。')
      });
    }
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
