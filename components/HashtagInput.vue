<!-- うまくいかないから一旦index.vueに直接入れてる -->
<template lang="pug">
  v-layout(justify-center)
    v-flex(xs12 md8)
      v-form
        v-text-field.mb-0(
          label="タイトル"
          v-model="title"
          solo
          )

        v-layout(align-center justify-end row)
          v-btn.add_hashtag.mb-2.mr-1.caption.grey--text(
            text
            fab
            depressed
            small
            @click="addHashtag(content)"
            )  #
          v-btn.add_hashtag.mb-2.mr-1.caption.grey--text(
            text
            fab
            depressed
            small
            @click="addSpace(content)"
            )  ␣

        v-textarea(
          id="hashtag_input"
          ref="r"
          placeholder="Instagramに載せたいハッシュタグまとめをご入力ください。"
          v-model="content"
          @input="updateValue"
          maxlength="500"
          auto-grow
          solo
          )

        v-layout(align-center justify-space-between row fill-height)
          v-btn.caption(
            small
            outline
            round
            color="grey lighten-1"
            @click="clearHashtag(content)"
            ) すべて消す
            v-icon.pl-1 clear
          v-btn.caption.copy-button(
            small
            fab
            outline
            round
            color="grey darken-1"
            @click="copyHashtag(content)"
            )
            v-icon file_copy

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
      input_text:'',
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

    addHashtag(content) {

      console.log('#を追加したいボタンたっぷ')

      var text_val = this.content
      console.log(text_val)

      var all_len = text_val.length
      console.log(all_len)

      var select_len  = hashtag_input.selectionStart
      console.log(select_len)

      var first   = text_val.substr(0, select_len)
      var insert     = '#'
      console.log(insert)

      var latter    = text_val.substr(select_len, all_len)
      text_val = first + insert + latter
      console.log(text_val)

      this.content = text_val

      this.$nextTick(() =>
        this.$refs.r.focus(),
        console.log('フォーカスなう'),
        // セレクションレンジが効かない
        // this.$refs.r.setSelectionRange(5, 10),
        // console.log('セレクションレンジ'),
      )

    },

    clearHashtag(content) {
      console.log('コンポーネントのクリアをしようとしています'),
      this.content = ''
      this.$refs.r.focus()
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
<style>

.add_hashtag{

}

.v-text-field.v-text-field--enclosed .v-text-field__details{
  margin-bottom:0;
}

.v-text-field__details{
  display: none;
}

</style>
