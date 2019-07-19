<template lang="pug">
  section.section

    hashtag-input

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

  components: {
    HashtagInput,
    MyHashtag
  }
}
</script>


import MyFooter from '~/components/Footer.vue'
export default {
  name: 'navbar',
  components: {
    MyHeader,
    MyFooter
  }
}


<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
