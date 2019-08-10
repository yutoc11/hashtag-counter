<template lang="pug">
  section.section
    v-layout.text-xs-center(justify-center row)
        v-container.text-xs-center.white
          v-card(flat)
            v-card-title(primary-title)
              h4 プロフィールを変更する
            v-form
              v-text-field(prepend-icon="person" name="email" label="メールアドレス" type="text" :value="email")
              v-text-field(prepend-icon="lock" name="password" label="現在のパスワード" type="password" :value="password")
              v-text-field(prepend-icon="lock" name="password_confirm" label="パスワード確認用" type="password" :value="password_confirm")
              v-card-actions
                v-btn(primary block round @click="changeProfile") 変更する（まだできない）
    v-layout.mb-5.text-xs-center(justify-end)
      v-btn.my-3.white--text.font-weight-bold(outline color='red' primary round @click="logOut")  ログアウト
    v-layout.mt-5.text-xs-center(justify-stard)
      v-btn.my-3.white--text.font-weight-bold(outline color='grey' round @click="deleteUser")  退会する

</template>

<script>

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  data () {
    return {
      email: '',
      password: '',
      password_confirm: '',
    };
  },

  asyncData () {
    return {
      user: [],
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
      var user = firebase.auth().currentUser;
        if (user) {
          this.setUser(user)
          this.user = user
        }
    })
  },

  mounted: function () {
  },

  methods: {
    ...mapActions(['setUser']),

    //ログアウト
    logOut(){
      firebase.auth().signOut()
      this.setUser(null)
      this.$router.push('/?flash=logout')
    },

    //退会（ユーザーデータの削除）
    deleteUser(){
      var user = firebase.auth().currentUser;
      user.delete().then(
        function() {
        // User deleted.
        }
      ).catch(
        function(error) {
        // An error happened.
        }
      );
      this.$router.push('/?flash=delete')
      },
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
