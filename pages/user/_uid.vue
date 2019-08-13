<template lang="pug">
  section.section
    v-tabs(
      background-color="transparent"
      centered
      )
      v-tab メールアドレス
      v-tab パスワード
      //タブ：メールアドレス
      v-tab-item
        v-layout.text-xs-center(justify-center row)
          v-container.text-xs-center.white
            v-card(flat)
              v-card-title(primary-title)
                h4 メールアドレス変更
              v-form
                v-text-field(prepend-icon="person" name="new_email" label="新しいメールアドレス" type="text" v-model="newEmail")
                v-text-field(prepend-icon="lock" name="current_password_foremail" label="現在のパスワード" type="password" v-model="currentPasswordforEmail")
                v-btn.my-3.white--text.font-weight-bold(outline color='grey' round @click="updateEmail(newEmail)") メールアドレスを変更する
      //タブ：パスワード
      v-tab-item
        v-layout.text-xs-center(justify-center row)
          v-container.text-xs-center.white
            v-card(flat)
              v-card-title(primary-title)
                h4 パスワード変更
              v-form
                v-text-field(prepend-icon="lock" name="current_password" label="現在のパスワード" type="password" v-model="currentPassword")
                v-text-field(prepend-icon="lock" name="new_password" label="新しいパスワード" type="password" v-model="newPassword")
                v-text-field(prepend-icon="lock" name="new_password_confirm" label="新しいパスワード(確認用)" type="password" v-model="newPasswordConfirm")
                v-btn.my-3.white--text.font-weight-bold(outline color='grey' round @click="updatePassword(currentPassword,newPassword)") パスワードを変更する
              v-btn.grey--text(small outline color='grey lighten-1' round to="../reset" nuxt) パスワードを忘れた方はこちら

    v-layout.mb-5.text-xs-center(justify-end)
      v-btn.my-3.white--text.font-weight-bold(outline color='red' primary round @click="logOut")  ログアウト
    v-layout.mt-5.text-xs-center(justify-stard)
      v-btn.my-3.white--text.font-weight-bold(outline color='grey' round to="../unsubscribe" nuxt)  退会はこちら

    p(v-if="isAuthenticated")
     | $store.state.user.uid： {{ $store.state.user.uid }}
     br
     | $store.state.user.displayName： {{ $store.state.user.displayName }}
     br
     | $store.state.user.email： {{ $store.state.user.email }}
     br
     | $store.state.user.password： {{ $store.state.user.password }}
     br
     | isAuthenticated： {{ isAuthenticated }}
    p(v-else) ユーザーデータなし

</template>

<script>

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  head() {
    return {
      title:'マイページ'
    }
  },

  data () {
    return {
      tabs: null,
      newEmail: '',
      currentPassword: '',
      currentPasswordforEmail: '',
      newPassword: '',
      newPasswordConfirm: '',
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


    //パスワード変更
    updatePassword(currentPassword,newPassword){

      const cUser = firebase.auth().currentUser
      // 再認証のcredentialを取得する
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.user.email,
        this.currentPassword
      )

      cUser
        .reauthenticateAndRetrieveDataWithCredential(credential)
        // 再認証に成功したらパスワードを変更する
        .then(() => {
          cUser
            .updatePassword(this.newPassword)
            .then(() => {
              alert('パスワードを再設定しました。再度ログインしてください。')
              this.logOut()
            })
            .catch(err => {
                alert('パスワードは6文字以上入力してください。')
            })
        })
        // 再認証に失敗したケース
        .catch(err => {
          alert('認証に失敗しました。\n現在のパスワードを確認してください。')
        })
    },

    //メールアドレス変更
    updateEmail(){

      const cUser = firebase.auth().currentUser
      // 再認証のcredentialを取得する
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.user.email,
        this.currentPasswordforEmail
      )

      // 再認証に成功したらメールアドレスを変更する
      cUser
      .updateEmail(this.newEmail).then(function() {
        // Update successful.
        alert('メールアドレスが変更されました。')
      }).catch(function(error) {
        // An error happened.
        alert('メールアドレスの変更に失敗しました。')
      })
        // 再認証に失敗したケース
        .catch(err => {
          alert('認証に失敗しました。\n現在のパスワードを確認してください。')
        })

    },

    //ログアウト
    logOut(){
      firebase.auth().signOut()
      this.setUser(null)
      this.$router.push('/?flash=logout')
    },

    //ユーザーデータの更新
    changeProfile(){

    },
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
