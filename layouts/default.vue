<template lang="pug">
  v-app

    v-toolbar.white--text(color="pink darken-2")
      app
      v-toolbar-side-icon.white--text
      v-toolbar-title.font-weight-bold #カウンター
      v-spacer
      v-toolbar-items
        v-btn(flat).white--text.font-weight-bold ログイン
        v-btn.font-weight-bold 新規登録

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="pink darken-2")
      app
      v-flex.font-weight-bold(
        color="pink darken-2"
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
        )  &copy;2019 — #カウンター
</template>

<script>

export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
