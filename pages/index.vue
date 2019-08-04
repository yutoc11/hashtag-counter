<template lang="pug">
  section.section

    v-layout(justify-center v-if="flash_message")
      .flash_message_area
        v-alert.caption.px-3.py-2.my-3(
          outline
          :value="true"
          v-model="alert"
          type="success"
          ) {{ flash_message }}

    nuxt-link(v-if="this.user.uid" :to="mypageUrl") マイページ

    hashtag-input

    v-divider

    p {{ user.uid }}

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | My hashtag set

    //保存されたハッシュタグセットもゆくゆくはコンポーネント化
    v-layout(justify-center v-if="this.user.uid")
      v-flex(xs12 md8)
        v-expansion-panel
          v-expansion-panel-content(v-for="(hashtagset, key) in hashtagsets" :key="key")
            template(v-slot:header)
              div {{ hashtagset.title }}
            v-card
              v-card-text {{ hashtagset.content }}
            v-layout(align-center justify-space-between row fill-height)
              v-btn(small round @click="deleteHashtagset(key)")
                v-icon(
                  small,
                  ) delete
              v-btn(small round)
                v-icon(small) edit
              v-btn(small round)
                v-icon(small) file_copy

    v-container.text-xs-center(justify-center v-else)
      h3.head ログインをすると、ハッシュタグが保存できるようになります。
      nuxt-link(to="/signup")
        v-btn.my-3.white--text.font-weight-bold(
          outline
          round
          color="pink darken-2"
          )  登録して保存してみる


</template>

<script>
import HashtagInput from '~/components/HashtagInput'
//import MyHashtag from '~/components/MyHashtagSet'

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {
  name: 'HomePage',

  data () {
    return {
      now_hashtag_count:'',
      flash_message: '',
      alert: true,
    };
  },

  asyncData () {
    return {
      user: [],
      hashtagsets: []
    }
  },

  components: {
    HashtagInput,
    //MyHashtagSet
  },

  computed: {

    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),

    ...mapState({
      mypageUrl: (state) => `/user/${state.user.uid}`
    }),

  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      var user = firebase.auth().currentUser; // eslint-disable-line
        if (user) {

          this.user = user

          this.isLogin = true
          console.log('親コンポーネントのbeforeCreateの処理を開始しました')
          console.log(this)
          console.log(user)
          this.userData = user
          this.$store.commit('login', this.userData)

          //var hashtagSetCountRef = firebase.database().ref('hashtagsets/' + this.user.uid);
          //hashtagSetCountRef.on('value', function(snapshot) {
          //  this.hashtagsets = snapshot.val();
          //  console.log('なんか動いている？')
          //});

          firebase
          .database()
          .ref('hashtagsets/' + this.user.uid)
          .once('value')
          .then(result => {
            if (result.val()) {
              this.hashtagsets = result.val();
              console.log(this.hashtagsets)
              console.log('こっちは動いているよね？')
            }
          })
        } else {
          this.isLogin = false
          this.userData = null
        };
    })
  },

  mounted: function () {

  },

  methods: {
    ...mapActions(['setUser']),




    deleteHashtagset(key){
      firebase.database().ref('hashtagsets/' + this.user.uid + '/' + key).remove();
    }
  }
}
</script>

<style lang="scss">

.flash_message_area{
  position: absolute;
  top:0px;
  margin:0 auto;
  z-index: 1000;
  max-width: 250px;
}

.section{
  margin: 0 auto;
  padding: 36px 24px;
}

.v-alert{
  border-radius: 15px;
}

.circle{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.5rem;
  text-align: center;
  background-color: #C33C5B;
  color: #fff;
  font-weight: bold;
  opacity: 0.5;
}

.hashtag_count{
  line-height: 50px;
  color: #757575;
  font-size: 1.5rem;
}

</style>
