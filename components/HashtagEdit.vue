<!-- うまくいかないから一旦index.vueに直接入れてる -->
<template lang="pug">
  v-layout.mt-5(justify-center)
    v-flex(xs10 md8)
      v-form
        v-text-field.mb-0(
          label="編集後のタイトル"
          v-model="titleedit"
          filled
          auto-grow
          rows="2"
          row-height="20"
          )

        v-layout(align-center justify-end row)
          v-btn.add_hashtag.mb-2.mr-1.caption.grey--text(
            text
            fab
            depressed
            small
            @click="addHashtag-edit(content)"
            )  #
          v-btn.add_hashtag.mb-2.mr-1.caption.grey--text(
            text
            fab
            depressed
            small
            @click="addSpace-edit(content)"
            )  ␣

        v-textarea(
          id="hashtag_edit"
          ref="r"
          label="ハッシュタグまとめを編集してください。"
          v-model="contentedit"
          @input="updateValueedit"
          maxlength="500"
          auto-grow
          filled
          )

        v-layout(align-center justify-space-between row fill-height)
          v-btn.caption(
            small
            outline
            round
            color="grey lighten-1"
            @click="clearHashtagedit(content)"
            ) すべてクリア
            v-icon.pl-1 clear
          v-btn.caption.copy-button(
            small
            fab
            outline
            round
            color="grey darken-1"
            @click="copyHashtagedit(content)"
            )
            v-icon file_copy

        v-layout.my-2(justify-center)
          .circle #
          p.hashtag_count.text-xs-center.font-weight-bold.ml-2 {{ now_hashtag_count }}
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

    addSpace(content) {

      console.log('#を追加したいボタンたっぷ')

      var text_val = this.content
      console.log(text_val)

      var all_len = text_val.length
      console.log(all_len)

      var select_len  = hashtag_input.selectionStart
      console.log(select_len)

      var first   = text_val.substr(0, select_len)
      var insert     = ' '
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

    clearMessage(){
      this.$parent.flash_message = ""
    },

    clearHashtag(content) {
      console.log('コンポーネントのクリアをしようとしています'),
      this.content = ''
      this.$refs.r.focus()
      this.$parent.flash_message = "入力内容をクリアしました"
      setTimeout(this.clearMessage,3000)
    },

    redirectToHome(){
      this.$router.push("/");
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
          this.$parent.flash_message = "保存しました。"
          this.content = ''
          this.title = ''
          setTimeout(this.clearMessage,3000),

          firebase
          .database()
          .ref('hashtagsets/' + this.$parent.user.uid)
          .once('value')
          .then(result => {
            if (result.val()) {
              this.$parent.hashtagsets = result.val();
              console.log(this.$parent.hashtagsets)
            }
          })
          }else{
            this.$parent.flash_message = "タイトルとコンテンツはどちらも入力してください"
            setTimeout(this.clearMessage,3000)
          }
      }else{
        //とりあえずフラッシュ
        this.$parent.flash_message = "保存はログインユーザー限定の機能です。"
        setTimeout(this.clearMessage,3000)
      }

      },

    copyHashtag(content) {
      this.$copyText(content)
      this.$parent.flash_message = "コピーしました"
      setTimeout(this.clearMessage,3000)
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
