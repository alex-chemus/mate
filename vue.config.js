const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/',

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: '/service-worker.js'
    },
    name: 'Mate',
    themeColor: 'black',
    manifestOptions: {
      display: 'standalone',
      /* eslint-disable */
      icons: [
        {
          src: "/img/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/img/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/img/icons/icon-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/img/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/img/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/img/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png"
        }
      ]
      /* eslint-enable */
    }
  }
})
