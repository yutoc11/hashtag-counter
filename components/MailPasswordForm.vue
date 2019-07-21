<template lang="pug">
  v-container
    v-layout.text-xs-center(justify-center row)
        v-container.text-xs-center.white
          v-card(flat)
            v-card-title(primary-title)
              h4 メールアドレスで{{ login_or_signup }}
            v-form
              v-text-field(prepend-icon="person" name="Username" label="メールアドレス")
              v-text-field(prepend-icon="lock" name="Password" label="パスワード" type="password")
              v-card-actions
                v-btn(primary block round) {{ login_or_signup }}
</template>

<script>
export default {
  props: ['login_or_signup']
}
</script>
