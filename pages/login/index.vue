<template lang="pug">
  section.section

    v-container
      h2.headline.text-xs-center.font-weight-thin
        | SNSアカウントで{{ login_or_signup }}

    v-layout(justify-center)
      v-btn.mx-3(icon)
        v-icon(large) delete
      v-btn.mx-3(icon)
        v-icon(large) delete

    v-container
      mail-password-form(:login_or_signup="login_or_signup")

    v-divider
</template>

<script>
import HashtagInput from '~/components/HashtagInput'
import MyHashtag from '~/components/MyHashtag'
import MailPasswordForm from '~/components/MailPasswordForm'

export default {
  name: 'HomePage',

  components: {
    HashtagInput,
    MyHashtag,
    MailPasswordForm
  },

  async asyncData(context) {
    return {
      login_or_signup: 'ログイン',
    }
  }
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}
</style>
