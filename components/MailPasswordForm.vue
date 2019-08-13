<template lang="pug">
  v-container
    v-layout.text-xs-center(justify-center row)
        v-container.text-xs-center.white
          v-card(flat)
            v-card-title(primary-title)
              h4 E-Mailで{{ login_or_signup }}
            v-form(v-if="this.$route.name == 'signup'")
              v-text-field(prepend-icon="person" name="email" label="メールアドレス" type="text" v-model="email")
              v-text-field(prepend-icon="lock" name="password" label="パスワード" type="password" v-model="password")
              v-layout(justify-center)
                div.pt-4
                  a.body-2(href='../terms' target="_blank") 利用規約
                  v-checkbox(
                    v-model="termConsentMail"
                    label="利用規約に同意"
                    required)
              v-card-actions
                v-btn(:disabled="!termConsentMail" primary block round @click="emailpassClick(email,password)") {{ login_or_signup }}
            v-form(v-else)
              v-text-field(prepend-icon="person" name="email" label="メールアドレス" type="text" v-model="email")
              v-text-field(prepend-icon="lock" name="password" label="パスワード" type="password" v-model="password")
              v-card-actions
                v-btn(primary block round @click="emailpassClick(email,password)") {{ login_or_signup }}
</template>

<script>
export default {

  props: ['login_or_signup'],

  data () {
    return {
      email: '',
      password: '',
      termConsentMail: '',
    };
  },

  asyncData () {
    return {
      login_or_signup: '',
    }
  },

  methods: {

    emailpassClick(email,password){
      this.$parent.email = this.email;
      this.$parent.password = this.password;

      if(this.$route.name == 'login'){
        //ログイン処理
        this.$emit('emailpass-click-login');

      }else if(this.$route.name == 'signup'){
        //新規登録処理
        this.$emit('emailpass-click-signup');
      }

    }

  }
}
</script>
