<template lang="pug">
  v-layout(justify-center)
    v-btn(small round fab depressed @click.stop="dialog = true")
      v-icon(
        small
        ) delete

    v-dialog.dialog(
      v-model="dialog"
      max-width="290"
      )

      v-card

        v-card-title.subtitle-2 本当に削除しますか？

        v-card-text
          | 一度削除したMyHashtagは復元することはできません。

        v-card-actions

          v-spacer

          v-btn.grey.white--text.font-weight-bold(
            text
            @click="dialog = false"
            ) キャンセル

          v-btn.red.white--text.font-weight-bold(
            text
            @click="deleteClick"
            ) 削除する
</template>

<script>

export default {
  props: {

  },

  data: () => ({
       dialog: false,
    }),

  methods: {
    deleteClick(){
      this.dialog = false
      this.$emit('delete-hashtag-set')
    }
  },
}
</script>
<style lang="scss">
.dialog{
  opacity: 0;
}
</style>
