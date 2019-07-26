<!-- うまくいかないから一旦index.vueに直接入れてる -->
<template lang="pug">
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
</template>

<script>
export default {

  data () {
    return {
      now_hashtag_count:'',
    };
  },

  computed: {
    now_hashtag_count() {
      return this.message.length;
    }
  }
}
</script>
