<template lang="pug">
  section.section


    //コンポーネントでうまくできないので一旦こちらに なぜかフラッシュメッセージでなくなった
    v-layout(v-if="flash_message")
      v-alert.px-2.py-2.my-3(
        outline
        dismissible
        :value="true"
        type="success"
        ) {{ flash_message }}

    v-layout(justify-center)
      v-flex(xs12 md8)
        v-form
          v-text-field(
            label="タイトル"
            v-model="title"
            solo
            )
          v-textarea(
            placeholder="Instagramに載せたいハッシュタグまとめをご入力ください。"
            v-model="content"
            maxlength="500"
            auto-grow
            solo
            )

          v-layout.mb-3(justify-center)
            .circle #
            p.hashtag_count.text-xs-center.font-weight-bold.ml-2 {{ now_hashtag_count }}

          v-layout(align-center justify-space-between row fill-height)
            v-btn(
              round
              @click="clearHashtag(content)"
              ) クリア
              v-icon clear
            v-btn(
              round
              @click="saveHashtag(title,content)"
              )
              v-icon add_circle_outline
            v-btn.copy-button(
              round
              @click="onCopy(content)"
              )
              v-icon file_copy

    v-divider

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | My hashtag set
    v-layout(justify-center)
      v-flex(xs12 md8)
        v-expansion-panel
            my-hashtag

</template>

<script>
import HashtagInput from '~/components/HashtagInput'
import MyHashtag from '~/components/MyHashtag'

import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'HomePage',

  data () {
    return {
      title:'',
      content:'',
      flash_message: '',
    };
  },

  asyncData () {
    return {
      user: [],
      isLogin: false,
    }
  },

  components: {
    //HashtagInput
    MyHashtag
  },

  computed: {
    now_hashtag_count() {
      var input_text = this.content
      var hashtag_count = input_text.match(/#\S/g)
      if(hashtag_count){
        return hashtag_count.length;
      }else{
        return 0;
      }
    }

  },

  mounted: function () {

    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },

  methods: {

    onCopy(content) {
      this.$copyText(content)
      return this.flash_message = "コピーしました"
    },

    saveHashtag(title,content) {
      if( title && content){
        // 新しいテキストのためのキーを取得
        var newHashtagKey = firebase.database().ref().child('hashtagsets').push().key;
        firebase
          .database()
          .ref('hashtagsets/' + this.user.uid　+ '/' + newHashtagKey)
          .set(
            {
              title: title,
              content: content
            }
          )
        }else{
          return this.flash_message = "タイトルとコンテンツはどちらも入力してください"
        }
      },

    clearHashtag(content) {
      this.content = ''
      return this.flash_message = "入力内容をクリしました"
    },
    }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
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
