<template lang="pug">
  section.section
    .columns.is-mobile ああ
    nuxt-link(to="/") Home page
      br
    nuxt-link(to="inspire") Inspire
    v-flex.xs6.md6
      v-card
        v-card-title.font-weight-bold 新規会員登録フォーム(3分で完了)
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
