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
            ) すべてクリア
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

    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),

    //入力内容を監視する
    content(){
    },
  },

  methods: {

    ...mapActions(['setUser']),

    // 入力内容が1文字変わる度に、ハッシュタグの数を数える
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

    // #をワンタップで追加する
    addHashtag(content) {

      var text_val = this.content
      var all_len = text_val.length
      var select_len = hashtag_input.selectionStart
      var first = text_val.substr(0, select_len)
      var insert = '#'
      var latter = text_val.substr(select_len, all_len)
      text_val = first + insert + latter

      this.content = text_val

      this.$nextTick(() =>
        this.$refs.r.focus(),
        // セレクションレンジが効かない
        // this.$refs.r.setSelectionRange(5, 10),
        // console.log('セレクションレンジ'),
      )
    },

    // 半角スペースをワンタップで追加する
    addSpace(content) {

      var text_val = this.content
      var all_len = text_val.length
      var select_len  = hashtag_input.selectionStart
      var first   = text_val.substr(0, select_len)
      var insert     = ' '
      var latter    = text_val.substr(select_len, all_len)
      text_val = first + insert + latter

      this.content = text_val

      this.$nextTick(() =>
        this.$refs.r.focus(),
        // セレクションレンジが効かない
        // this.$refs.r.setSelectionRange(5, 10),
        // console.log('セレクションレンジ'),
      )
    },

    // ふらっッシュメッセージの内容をクリアする
    clearMessage(){

      this.$parent.flash_message = ""

    },

    // 入力内容をクリアする
    clearHashtag(content) {

      this.content = ''
      this.$refs.r.focus()
      this.$parent.flash_message = "入力内容をクリアしました"
      setTimeout(this.clearMessage,3000)

    },

    // ホームへ遷移する
    redirectToHome(){

      this.$router.push("/");

    },

    // ハッシュタグセットを保存する
    saveHashtag(title,content) {

      if(this.isAuthenticated){

        if( title && content){

          // 新しいテキストのためのキーを取得
          var newHashtagKey = firebase.database().ref().child('hashtagsets').push().key;
          firebase
            .database()
            .ref('hashtagsets/' + this.user.uid+ '/' + newHashtagKey)
            .set(
              {
                title: title,
                content: content
              }
            )

          this.$parent.flash_message = "保存しました。"

          // 保存したタイミングで入力内容をクリア
          this.content = ''
          this.title = ''

          // 3秒後にフラッシュメッセージは閉じる
          setTimeout(this.clearMessage,3000),

          // 保存した後に改めて１回、保存されているハッシュタグセットを読み込む
          firebase
          .database()
          .ref('hashtagsets/' + this.$parent.user.uid)
          .once('value')
          .then(result => {
            if (result.val()) {

              this.$parent.hashtagsets = result.val();

            }
          })

          }else{

            this.$parent.flash_message = "タイトルとコンテンツはどちらも入力してください"
            setTimeout(this.clearMessage,3000)

          }

      }else{

        this.$parent.flash_message = "保存はログインユーザー限定の機能です。"
        setTimeout(this.clearMessage,3000)

      }
    },

    // 入力内容をコピーする
    copyHashtag(content) {

      this.$copyText(content)
      this.$parent.flash_message = "コピーしました"
      setTimeout(this.clearMessage,3000)

    },
  },
}
</script>
<style>

.v-text-field.v-text-field--enclosed .v-text-field__details{
  margin-bottom:0;
}

.v-text-field__details{
  display: none;
}

</style>
