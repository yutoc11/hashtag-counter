const webpack = require('webpack')

// path
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = '#ハッシュタグカウンター'
const siteDesc = 'Instagramの投稿に載せるハッシュタグのまとめを、投稿の傾向ごとにセットにして保存やコピーができるサービスです。'
//const siteKeywords = '１つ目,２つ目,３つ目,４つ目'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImages = basePath + 'img/ogp/'

// pwa
const shortName = '#カウンター'
const manifestIcon = 'img/icons/icon-1024.png'
const splashscreens = baseDir + 'img/splashscreens/'

// etc
// const apiUrl = process.env.API_URL || 'https://example.com'
// const colorPrimary = '#0A428C'
// const colorSecondary = '#FA4988'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */

  router: {
    base: baseDir,　// ←これも忘れずに入れる！
  },

  head: {
    //title: process.env.npm_package_name || '',
    titleTemplate: `%s | ${siteName}`,

    htmlAttrs: {
      //prefix: 'og: http://ogp.me/ns#',
      lang: lang
    },

    meta: [
      // 設定関連
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },

      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },
      //{ hid: 'keywords', name: 'keywords', content: siteKeywords },

      // ogp関連
      // { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      // { hid: 'og:type', property: 'og:type', content: 'website' },
      // { hid: 'og:url', property: 'og:url', content: basePath },
      // { hid: 'og:title', property: 'og:title', content: siteName },
      // { hid: 'og:description', property: 'og:description', content: siteDesc },
      // { hid: 'og:image', property: 'og:image', content: `${ogpImages}home.jpg` },
      // { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:site', content: '@Twitter' },
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: 'FacebookAppID' },

    ],

    script: [
      // polifills
      // { src: '//polyfill.io/v2/polyfill.min.js?features=IntersectionObserver' },
      // { src: '//cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // fonts
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/css/yakuhanmp.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,700&amp;subset=japanese' },

      // icons
      // { rel: 'icon', sizes: '16x16', type: 'image/png', href: iconImages + 'favicon-16.png' },
      // { rel: 'icon', sizes: '32x32', type: 'image/png', href: iconImages + 'favicon-32.png' },
      // { rel: 'icon', sizes: '48x48', type: 'image/png', href: iconImages + 'favicon-48.png' },
      // { rel: 'icon', sizes: '62x62', type: 'image/png', href: iconImages + 'favicon-62.png' },
      // apple touch icon
      //{ rel: 'apple-touch-icon', sizes: '180x180', href: iconImages + 'apple-touch-icon.png' },
    ]
  },

  manifest: {
    lang: lang,
    name: siteName,
    short_name: shortName,
    description: siteDesc,
    //background_color: '#ffffff',
    //theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait'
  },

  workbox: {
    //dev: true, //開発環境でもPWA
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~plugins/persistedstate.js", ssr: false },
    { src: "~plugins/auth.js", ssr: false }

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/vuetify',
    'nuxt-fontawesome',
    'nuxt-clipboard2',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-PL679P7',
      pageTracking: true,
    }],
    '@nuxtjs/sitemap',
  ],

  fontawesome: {
     imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
     ]
   },

 sitemap: {
   path: '/sitemap.xml',
   hostname: '#ハッシュタグカウンター',
   // generate: true,
 },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
