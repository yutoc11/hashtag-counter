<template lang="pug">
  section.section.privacy
    v-layout
      v-container.white
        h1.pb-2.headline.font-weight-bold プライバシーポリシー
        p この利用規約（以下，「本規約」といいます。）は，osao3's accessory（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。

        h2 個人情報保護方針
        ol
          li 個人情報の取り扱いに関する法令、国が定める指針およびその他の規範を遵守してまいります。
          li 個人情報は、利用目的・提供の有無等を明確に、適法かつ公正な手段をもって取得し、目的外利用はいたしません。　また、そのための措置を講じます。
          li 当社が取り扱う個人情報の紛失、滅失、毀損や漏洩、あるいは個人情報への不正アクセス、破壊、改竄などの行為に対して、適切な予防措置、セキュリティ対策を講じ、予防ならびに是正に取り組んでまいります。

        h2 当ウェブサイト内でのアクセス情報の取り扱いについて
        p
         | 当ウェブサイトでは、「Google アナリティクス」など、クッキー（cookie）やウェブビーコンの使用によるアクセス情報の収集をおこなっています。
        p
         | これらの解析ツールにより収集した情報は、本サイトのサービス向上およびアクセス解析のために使用します。解析ツールによって収集するデータは、閲覧者様の利用する環境（パソコンやスマートフォンなどの端末、OS、ウェブブラウザ等）になり、閲覧者様個人を識別するものではありません。
        p
         | 情報収集を拒否する場合は、お使いのウェブブラウザにて、「クッキー（cookie）」を無効にするなどの設定をおこなってください。
        p
         | クッキー（cookie）を無効にする設定方法は、各ウェブブラウザによって異なりますので、お使いのウェブブラウザのヘルプ等をご確認ください。

        p.text-xs-right 以上

</template>

<script>

export default {

  head() {
    return {
      title:'利用規約'
    }
  },

  data () {
    return {
    };
  },

  asyncData () {
    return {
    }
  },

  components: {
  },

  computed: {
  },

  created: function(){
  },

  mounted: function () {
  },

  methods: {
  },
}
</script>

<style lang="scss">
.section{
  margin: 0 auto;
}

.privacy{
  h2{
    font-weight: bold;
    padding: 10px 0;
  }

  p,li{
    font-size: 0.8rem;
    line-height: 1.2rem;
    letter-spacing: 2px;
    padding-bottom: 5px;
  }

  ol{
    padding: 10px 0 10px 1.5rem;
  }
}

</style>
