<template>
  <members-only>
    <h1>ログインしていないと見れないページ</h1>
    <a href="/login/login_test">アカウントページへ</a>
  </members-only>
</template>

<script>
import MembersOnly from '~/components/MembersOnly.vue'

export default {
  components: {
    MembersOnly
  }
}
