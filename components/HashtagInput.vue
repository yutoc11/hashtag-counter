<!-- うまくいかないから一旦index.vueに直接入れてる -->
<template lang="pug">
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
          @input="updateValue"
          maxlength="500"
          auto-grow
          solo
          )

        v-layout(align-center justify-space-between row fill-height)
          v-btn.caption(
            round
            @click="clearHashtag(content)"
            ) クリア
            v-icon.pl-1 clear
          v-btn.caption.copy-button(
            round
            @click="copyHashtag(content)"
            ) コピー
            v-icon.pl-1 file_copy

        v-layout.my-2(justify-center)
          .circle #
          p.hashtag_count.text-xs-center.font-weight-bold.ml-2 {{ now_hashtag_count }}

        v-layout(align-center justify-center row fill-height)
          v-btn.my-3.white--text.font-weight-bold(
            outline
            round
            color="pink darken-2"
            @click="saveHashtag(title,content)"
            )  保存
            v-icon.pl-2 add_circle_outline
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  data () {
    return {
      now_hashtag_count:0,
      title:'',
      content:'',
    };
  },

  computed: {

    content(){
      console.log('computedメッセージが変更されました')
    },
  },

  methods: {

    updateValue(){
      var input_text = this.content
      var hashtag_count = input_text.match(/#\S/g)
      if(hashtag_count){
        var now_hashtag_count = hashtag_count.length
        return this.now_hashtag_count = now_hashtag_count;
      }else{
        var now_hashtag_count = 0
        return this.now_hashtag_count = now_hashtag_count;
      }
    },

    clearHashtag(content) {
      console.log('コンポーネントのクリアをしようとしています')
      this.content = '';
      return this.$parent.flash_message = "入力内容をクリアしました"
    },

    saveHashtag(title,content) {
      if(this.$parent.user.uid){
        if( title && content){
          // 新しいテキストのためのキーを取得
          var newHashtagKey = firebase.database().ref().child('hashtagsets').push().key;
          firebase
            .database()
            .ref('hashtagsets/' + this.$parent.user.uid　+ '/' + newHashtagKey)
            .set(
              {
                title: title,
                content: content
              }
            )
            return this.$parent.flash_message = "保存しました。"
          }else{
            return this.$parent.flash_message = "タイトルとコンテンツはどちらも入力してください"
          }
      }else{
        //とりあえずフラッシュ
        return this.$parent.flash_message = "保存はログインユーザー限定の機能です。"
      }

      },

    copyHashtag(content) {
      this.$copyText(content)
      return this.$parent.flash_message = "コピーしました"
    },
  },
}
</script>
