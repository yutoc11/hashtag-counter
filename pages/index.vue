<template lang="pug">
  section.section

    v-layout(justify-center)
      v-flex(xs12 md8)
        v-form
          v-text-field(
            label="タイトル"
            solo
            )
          v-textarea(
            placeholder="Instagramに載せたいハッシュタグの羅列をご入力ください。"
            solo
            )
          v-container
            p.headline.text-xs-center.pink--text.font-weight-bold #の数：30

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
          v-expansion-panel-content(
            v-for="(item,i) in 5"
            :key="i"
            )
            template(v-slot:header)
              div minne用
            v-card
              v-card-text
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            v-layout(align-center justify-space-between row fill-height)
              v-btn(small round)
                v-icon(small) delete
              v-btn(small round)
                v-icon(small) edit
              v-btn(small round)
                v-icon(small) file_copy

</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>
<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
