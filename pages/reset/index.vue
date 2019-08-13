<template lang="pug">
  section.section
    v-layout.text-xs-center(justify-center row)
      v-container.text-xs-center.white
        v-card(flat)
          v-card-title(primary-title)
            h4 パスワードリセット
          v-form
            v-text-field(v-if="!isAuthenticated" prepend-icon="person" name="current_email" label="現在のメールアドレス" type="text" v-model="currentEmail")
            v-btn.my-3.white--text.font-weight-bold(outline color='grey' round @click="resetPassword") パスワード再設定メールを送信する
</template>

<script>

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  head() {
    return {
      title:'リセット'
    }
  },

  data () {
    return {
      currentEmail: '',
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

    //パスワード再設定
    resetPassword(){
      var auth = firebase.auth();
      const user = firebase.auth().currentUser

      //ログインユーザーかどうかで、送信するメールアドレスを決める。
      if(user){
        var emailAddress = this.user.email
      }else{
        var emailAddress = this.currentEmail
      }

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        alert('パスワード再設定用のメールを送信しました。\nパスワード再設定の後、ログインしてください。')
      }).catch(function(error) {
        // An error happened.
        alert('エラーが発生しました。メールアドレスをご確認ください。')
      });
    },
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
