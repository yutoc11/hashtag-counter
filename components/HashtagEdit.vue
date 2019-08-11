<!-- 2019/8/10現在は未使用 -->
<template lang="pug">
  v-layout.mt-5(justify-center)
    v-flex(xs10 md8)
      v-form
        v-text-field.mb-0(
          label="編集後のタイトル"
          v-model="titleEdit"
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
            @click="addHashtagEdit(contentEdit)"
            )  #
          v-btn.add_hashtag.mb-2.mr-1.caption.grey--text(
            text
            fab
            depressed
            small
            @click="addSpaceEdit(contentEdit)"
            )  ␣

        v-textarea(
          id="hashtag_edit"
          ref="r"
          label="ハッシュタグまとめの編集"
          v-model="contentEdit"
          @input="updateValueEdit"
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
            @click="clearHashtagEdit(contentEdit)"
            ) すべてクリア
            v-icon.pl-1 clear
          //コピーなぜか効かないので一旦消去
          //-v-btn.caption.copy-button(
            small
            fab
            outline
            round
            color="grey darken-1"
            @click="copyHashtagEdit(contentEdit)"
            )
            v-icon file_copy

        v-layout.my-2(justify-center)
          .circle #
          p.hashtag_count.text-xs-center.font-weight-bold.ml-2 {{ now_hashtag_count_edit }}
</template>

<script>
import firebase from '@/plugins/firebase'
import store from '~/store/index.js'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  props: ['titleEdit','contentEdit'],

  data () {
    return {
      now_hashtag_count_edit:0,
      titleEdit:'',
      contentEdit:'',
      input_text_edit:'',
    };
  },

  computed: {

    contentEdit(){
      console.log('computedメッセージが変更されました')
    },
  },

  methods: {

    updateValueEdit(){
      var input_text_edit = this.contentEdit
      var hashtag_count_edit = input_text_edit.match(/#\S/g)
      if(hashtag_count_edit){
        var now_hashtag_count_edit = hashtag_count_edit.length
        return this.now_hashtag_count_edit = now_hashtag_count_edit;
      }else{
        var now_hashtag_count_edit = 0
        return this.now_hashtag_count_edit = now_hashtag_count_edit;
      }
    },

    addHashtagEdit(contentEdit) {

      console.log('#を追加したいボタンたっぷ')

      var text_val = this.contentEdit
      console.log(text_val)

      var all_len = text_val.length
      console.log(all_len)

      var select_len  = hashtag_edit.selectionStart
      console.log(select_len)

      var first   = text_val.substr(0, select_len)
      var insert     = '#'
      console.log(insert)

      var latter    = text_val.substr(select_len, all_len)
      text_val = first + insert + latter
      console.log(text_val)

      this.contentEdit = text_val

      this.$nextTick(() =>
        this.$refs.r.focus(),
        console.log('フォーカスなう'),
        // セレクションレンジが効かない
        // this.$refs.r.setSelectionRange(5, 10),
        // console.log('セレクションレンジ'),
      )

    },

    addSpaceEdit(contentEdit) {

      console.log('#を追加したいボタンたっぷ')

      var text_val = this.contentEdit
      console.log(text_val)

      var all_len = text_val.length
      console.log(all_len)

      var select_len  = hashtag_edit.selectionStart
      console.log(select_len)

      var first   = text_val.substr(0, select_len)
      var insert     = ' '
      console.log(insert)

      var latter    = text_val.substr(select_len, all_len)
      text_val = first + insert + latter
      console.log(text_val)

      this.contentEdit = text_val

      this.$nextTick(() =>
        this.$refs.r.focus(),
        console.log('フォーカスなう'),
        // セレクションレンジが効かない
        // this.$refs.r.setSelectionRange(5, 10),
        // console.log('セレクションレンジ'),
      )

    },

    clearMessageEdit(){
      this.$parent.flash_message = ""
    },

    clearHashtagEdit(contentEdit) {
      console.log('コンポーネントのクリアをしようとしています'),
      this.contentEdit = ''
      this.$refs.r.focus()
      this.$parent.flash_message = "入力内容をクリアしました"
      setTimeout(this.clearMessage,3000)
    },

    redirectToHome(){
      this.$router.push("/");
    },

    saveHashtagEdit(titleEdit,contentEdit) {
      if(this.$parent.user.uid){
        if( titleEdit && contentEdit){
          // 新しいテキストのためのキーを取得
          var newHashtagKey = firebase.database().ref().child('hashtagsets').push().key;
          firebase
            .database()
            .ref('hashtagsets/' + this.$parent.user.uid　+ '/' + newHashtagKey)
            .set(
              {
                titleEdit: titleEdit,
                contentEdit: contentEdit
              }
            )
          this.$parent.flash_message = "保存しました。"
          this.contentEdit = ''
          this.titleEdit = ''
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

    //コピーなぜか効かないので一旦むし
    copyHashtagEdit(contentEdit) {
      //this.$copyText(this.contentEdit)
      this.$copyText("Hello World")
      console.log(this.contentEdit)
      console.log('コピーしようとしています')
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
