<template lang="pug">
  section.section
    v-layout.text-xs-center(justify-center row)
        v-container.text-xs-center.white
          v-card(flat)
            v-card-title(primary-title)
              h4 プロフィールを変更する
            v-form
              v-text-field(prepend-icon="person" name="email" label="メールアドレス" type="text" :value="user.email")
              v-text-field(prepend-icon="lock" name="password" label="現在のパスワード" type="password" :value="password")
              v-text-field(prepend-icon="lock" name="password_confirm" label="パスワード確認用" type="password")
              v-card-actions
                v-btn(primary block round @click="changeProfile") 変更する（まだできない）

    v-btn.my-3(primary round @click="deleteUser")  退会する

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

  beforeCreate: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      var user = firebase.auth().currentUser;
        if (user) {

          this.user = user

          this.isLogin = true
          console.log(this)
          console.log(user)
          this.userData = user
          this.$store.commit('login', this.userData)

          firebase
          .database()
          .ref('hashtagsets/' + this.user.uid)
          .once('value')
          .then(result => {
            if (result.val()) {
              this.hashtagsets = result.val();
            }
          })
        } else {
          this.isLogin = false
          this.userData = null
        };
    })
  },

  created: function(){

  },

  mounted: function () {
  },

  methods: {
    ...mapActions(['setUser']),

    deleteUser(){
      var user = firebase.auth().currentUser;
      user.delete().then(function() {
        // User deleted.
        }).catch(function(error) {
          // An error happened.
          });
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
