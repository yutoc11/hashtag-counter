<template lang="pug">
  section.section

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | メールアドレスでログイン

    v-divider
</template>

<script>
import HashtagInput from '~/components/HashtagInput'
import MyHashtag from '~/components/MyHashtag'

export default {
  name: 'HomePage',

  components: {
    HashtagInput,
    MyHashtag
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
