<template lang="pug">
  section.section

    //コンポーネントでうまくできないので一旦こちらに
    v-layout(justify-center)
      v-flex(xs12 md8)
        v-form
          v-text-field(
            label="タイトル"
            solo
            )
          v-textarea(
            placeholder="Instagramに載せたいハッシュタグの羅列をご入力ください。"
            v-model="message"
            solo
            )
          v-container
            p.headline.text-xs-center.pink--text.font-weight-bold #の数：{{ now_hashtag_count }}

          v-layout(align-center justify-space-between row fill-height)
            v-btn(round) クリア
              v-icon clear
            v-btn(round)
              v-icon add_circle_outline
            v-btn(round)
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

export default {
  name: 'HomePage',

  data () {

    return {
      message:'',
    };
  },

  components: {
    //HashtagInput
    MyHashtag
  },

  computed: {
    now_hashtag_count() {
      var input_text = this.message
      var hashtag_count = input_text.match(/#\S/g)
      if(hashtag_count){
        return hashtag_count.length;
      }else{
        return 0;
      }

    }
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
