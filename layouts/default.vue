<template lang="pug">
  v-app

    v-toolbar.white--text(color="pink darken-2")
      app
      v-toolbar-side-icon.white--text
      v-toolbar-title.font-weight-bold #カウンター
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(flat).white--text.font-weight-bold ログイン
        v-btn.font-weight-bold 新規登録

    v-content
      v-container
        nuxt/

    v-footer.white--text(color="pink darken-2")
      app

      span #カウンター
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
