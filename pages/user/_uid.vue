<template lang="pug">
  section.section
    p {{ user.displayName }}
    p {{ user.email }}

</template>

<script>

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  data () {
    return {

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
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

</style>
