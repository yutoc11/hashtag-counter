<template lang="pug">
  section.section

    //-編集機能レイアウト作ったけどうまく行かないので一旦廃止
      v-layout.edit_modal(justify-center)
        v-dialog(v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition")
          template(v-slot:activator="{ on }")
            v-btn(small round fab depressed @click="editHashtagset(key)" v-on="on")
              v-icon(small) edit
          v-card.hashtag_edit_modal(v-bind:class="{ active: isActive}")
            v-toolbar(dark color="white")
              v-btn(color="pink darken-2" icon dark @click="dialog = false")
                v-icon close
              v-toolbar-title.grey--text Hashtagsetの編集
              v-spacer
              v-toolbar-items
                v-btn.white--text.font-weight-bold(color="pink darken-2" text @click="dialog = false") 更新する

            hashtag-edit

            v-divider


    v-layout(justify-center v-if="flash_message")
      .flash_message_area(v-bind:style="styleObject")
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
      v-container.text-xs-center(justify-center v-if='hashtagsets == ""')
        h3.head ハッシュタグを保存すると、コピーや編集ができるようになります。

      v-flex(xs12 md8 v-else)
        v-expansion-panel
          v-expansion-panel-content(v-for="(hashtagset, key) in hashtagsets" :key="key")
            template(v-slot:header)
              div {{ hashtagset.title }}
            v-card
              v-card-text {{ hashtagset.content }}
            v-layout(align-center justify-space-between row fill-height)
              v-btn(small round fab depressed @click="deleteHashtagset(key)")
                v-icon(
                  small
                  ) delete
              //-編集機能はうまく行かないので一旦廃止
                v-btn(small round fab depressed @click="editHashtagset(key)")
                  v-icon(small) edit
              v-btn(small round fab depressed)
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
import HashtagEdit from '~/components/HashtagEdit'
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
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      styleObject: {
        overflow: 'initial',
      },
      titleEdit: '',
      contentEdit: '',
      isActive: false,
      editNow: 'none',
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
    HashtagEdit,
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


    clearMessage(){
      this.flash_message = ""
    },

    deleteHashtagset(key){
      firebase.database().ref('hashtagsets/' + this.user.uid + '/' + key).remove();

      this.flash_message = "このハッシュタグセットを削除しました。"
      setTimeout(this.clearMessage,3000),

      firebase
      .database()
      .ref('hashtagsets/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.hashtagsets = result.val();
        }
      })
    },

    editHashtagset(key){
      var edithashtag
      var database = firebase.database();
      database
      .ref('hashtagsets/' + this.user.uid + '/' + key)
      .once('value')
      .then(result => {
        this.edithashtag = result.val();
        this.titleEdit = this.edithashtag.title
        this.contentEdit = this.edithashtag.content
        console.log(this.edithashtag)
        console.log(this.titleEdit)
        console.log(this.contentEdit)

      })
      console.log(firebase.database().ref('hashtagsets/' + this.user.uid + '/' + key))
      console.log(this.titleEdit)
      console.log(this.contentEdit)
      this.editNow = 'flex';
    },
  }
}
</script>

<style lang="scss">

.active{
  display: block;
}

.hashtag_edit_modal{
  display:none;
}

.flash_message_area{
  position: absolute;
  top:0px;
  margin:0 auto;
  z-index: 1000;
  max-width: 250px;
  overflow: initial;
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

.edit_modal{
  background-color: #grey;
}

</style>
