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

    //-フラッシュメッセージ
    v-layout(justify-center v-if="flash_message" )
      .flash_message_area(v-bind:style="styleObject")
        v-alert.caption.px-3.py-2.mt-2(
          outline
          :value="true"
          v-model="alert"
          type="success"
          @invalid_access="invalidAccess"
          ) {{ flash_message }}

    hashtag-input

    v-divider

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | My hashtag set

    //-保存されたハッシュタグセットもゆくゆくはコンポーネント化
    v-layout(justify-center v-if="isAuthenticated")
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
                v-icon(small @click="copyHashtagset(hashtagset.content)") file_copy

    v-container.text-xs-center(justify-center v-else)
      h3.head 登録してログインをすると、ハッシュタグが保存できるようになります。
      nuxt-link(to="/signup")
        v-btn.my-3.white--text.font-weight-bold(
          outline
          round
          color="pink darken-2"
          )  登録して保存してみる

    //-デバッグ用
      p(v-if="isAuthenticated")
       | $store.state.user.uid： {{ $store.state.user.uid }}
       br
       | $store.state.user.displayName： {{ $store.state.user.displayName }}
       br
       | $store.state.user.email： {{ $store.state.user.email }}
       br
       | isAuthenticated： {{ isAuthenticated }}
      p(v-else) ユーザーデータなし

</template>

<script>
import HashtagInput from '~/components/HashtagInput'
import HashtagEdit from '~/components/HashtagEdit'

import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {

  head() {
    return {
      title:'#ハッシュタグカウンター',
      titleTemplate: ''
    }
  },

  data () {
    return {
      now_hashtag_count:'',
      flash_message: '',

      //ハッシュタグ編集系で使うはずのデータ
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
      title: 'トップ'
    };
  },

  asyncData(context) {
    return {
      flash: context.query['flash'],
      hashtagsets: [],
    }
  },

  components: {
    HashtagInput,
    HashtagEdit,
  },

  computed: {

    ...mapState(['user']),
    ...mapState(['loginType']),
    ...mapGetters(['isAuthenticated']),

    ...mapState({
      mypageUrl: (state) => `/user/${state.user.uid}`
    }),

  },

  created: function(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setUser(user)
        this.$router.push("/")

        //保存されているハッシュタグセットを読み込む
        firebase
        .database()
        .ref('hashtagsets/' + this.user.uid)
        .once('value')
        .then(result => {
          if (result.val()) {

            this.hashtagsets = result.val();

          }
        })
      }
    })

  },

  mounted: function () {

    //ログインやログアウト時など、ユーザーの状態が変わった時のフラッシュメッセージ
    var flash = this.flash
    switch( flash ){

      case 'login':
        this.flash_message = "ログインしました！"
        this.gaPageView()
        setTimeout(this.clearMessage,3000),
        this.flash = false
        break;

      case 'signup':
        this.flash_message = "ご登録ありがとうございます！"
        this.gaPageView()
        setTimeout(this.clearMessage,3000),
        this.flash = false
        break;

      case 'logout':
        this.flash_message = "ログアウトしました！"
        this.gaPageView()
        setTimeout(this.clearMessage,3000),
        this.flash = false
        break;
    }

  },

  methods: {
    ...mapActions(['setUser']),
    ...mapActions(['setloginType']),

    //フラッシュメッセージを消す
    clearMessage(){
      this.flash_message = ""
    },

    //ハッシュタグセットの削除
    deleteHashtagset(key){
      firebase.database().ref('hashtagsets/' + this.user.uid + '/' + key).remove();

      this.flash_message = "このハッシュタグセットを削除しました。"
      setTimeout(this.clearMessage,3000),

      //ハッシュタグセットを削除した上で、改めて保存されているハッシュタグセット読み込み直す
      firebase
      .database()
      .ref('hashtagsets/' + this.user.uid)
      .once('value')
      .then(result => {
        if (result.val()) {
          this.hashtagsets = result.val();
        }else{
          this.hashtagsets = ""
        }
      })
    },

    //保存されているセットを編集したいが、今の所できていない
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

    //保存されているハッシュタグセットをコピー
    copyHashtagset(content) {
      this.$copyText(content)
      this.flash_message = "コピーしました"
      setTimeout(this.clearMessage,3000)
    },

    //不正なアクセスがあった時のメッセージ
    invalidAccess(){
      this.flash_message = "ログインしてください"
      setTimeout(this.clearMessage,3000)
    },

    //jsで遷移してきた時のGA
    gaPageView() {
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
      const fullPath = baseUrl + this.$route.path
      const title = this.title
      console.log('gaPageViewが呼ばれたよ！')
      console.log(title)
      console.log(fullPath)
      this.$gtm.pushEvent({
      event: 'nuxtRoute',
      pageType: 'PageView',
      pageUrl: fullPath,
      routeName: title
      });
    }
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

//フラッシュメッセージ
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

//ハッシュタグカウント
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
