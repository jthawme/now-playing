// TODO: (Ramdane) read this from a custom config file, with environment configuration
const PROJECT_TITLE = "TEMPLATE";
const PROJECT_SHORT_TITLE = "TEMPLATE";
const PROJECT_DESCRIPTION = "DESC";
const PROJECT_KEYWORDS = "MSCHF, "; // add more
const PROJECT_DOMAIN = "https://[URL]";
const FB_PIXEL_ID = "[FB_PIXEL]";
const GA_ID = "[GA_ID]";

export default {
  mode: "universal",

  server: {
    port: 3000,
    host: process.env.MOBILE ? "0.0.0.0" : "localhost"
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en"
    },
    title: PROJECT_TITLE,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"
      },
      { name: "referrer", content: "no-referrer" },
      {
        name: "title",
        content: PROJECT_TITLE
      },
      {
        hid: "description",
        name: "description",
        content: PROJECT_DESCRIPTION
      },
      {
        name: "keywords",
        content: PROJECT_KEYWORDS
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      { name: "twitter:site", content: "@mschfxyz" },
      {
        name: "twitter:title",
        content: PROJECT_TITLE
      },
      {
        name: "twitter:description",
        content: PROJECT_DESCRIPTION
      },
      {
        name: "twitter:image:src",
        content: `${PROJECT_DOMAIN}/social/sharecard-twitter.png`
      },
      {
        name: "og:title",
        property: "og:title",
        content: PROJECT_TITLE
      },
      { name: "og:type", property: "og:type", content: "website" },
      {
        name: "og:url",
        property: "og:url",
        content: `${PROJECT_DOMAIN}`
      },
      {
        name: "og:image",
        property: "og:image",
        content: `${PROJECT_DOMAIN}/social/sharecard-facebook.png`
      },
      {
        name: "og:description",
        property: "og:description",
        content: PROJECT_DESCRIPTION
      },
      {
        name: "og:site_name",
        property: "og:site_name",
        content: PROJECT_TITLE
      },
      { name: "author", content: "MSCHF" },
      { meta: "msapplication-TileColor", content: "#ffffff" },
      { meta: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { meta: "theme-color", content: "#ffffff" }
    ],
    script: [
      // {
      //   src:
      //     "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"
      // },
      // {
      //   src:
      //     "https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"
      // },
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      },
      { src: "/js/snap.js" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["normalize.css/normalize.css"],
  /*
   ** Plugins to load before mounting the App
   */
  env: {
    GA_ID,
    endpoint: process.env.LOCAL
      ? "http://localhost:3001/dev"
      : "https://amazonaws.com/dev",
    PROJECT_DOMAIN: process.env.LOCAL ? "http://localhost:3000" : PROJECT_DOMAIN
  },

  components: [{ path: "~/components/common", extensions: ["vue"] }],

  plugins: [
    { src: "~plugins/vue-awesome-countdown", ssr: false },
    "~/plugins/vue-analytics.js",
    { src: "~plugins/vue-scroll-lock.js", ssr: false },
    // { src: "~plugins/vue-carousel.js", ssr: false },
    { src: "~plugins/vue-resize.js", ssr: false }
  ],
  facebook: {
    /* module options */
    track: "PageView",
    pixelId: FB_PIXEL_ID,
    disabled: false
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/pwa"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/svg",
    "@nuxtjs/device",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "nuxt-facebook-pixel-module",
    "cookie-universal-nuxt",
    "@nuxtjs/markdownit"
  ],

  markdownit: {
    injected: true,
    html: true
  },

  styleResources: {
    scss: ["~/assets/scss/common.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  pwa: {
    manifest: {
      name: PROJECT_TITLE,
      short_name: PROJECT_SHORT_TITLE
    }
  }
};
