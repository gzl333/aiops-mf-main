/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

/*
* @mimas
* this file is last edited on 2023/06/08
* adapted to the latest client-entry.js file
* added single-spa-css support
*  */

import { createApp } from 'vue'
// @mimas: !all css files MUST be included in root-config!

import '@quasar/extras/mdi-v5/mdi-v5.css'

import '@quasar/extras/line-awesome/line-awesome.css'

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'

// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass' // @mimas: MUST include a cdn version in root-config

import 'src/css/app.scss' // @mimas: contains customized css variables, does not need to be included in root-config

// @mimas: /.quasar files
import createQuasarApp from './app.js'
import quasarUserOptions from './quasar-user-options.js'

// @mimas: single-spa needs
import singleSpaVue from 'single-spa-vue'
import singleSpaCss from 'single-spa-css'
import { h } from 'vue'
import App from 'src/App'
import { Quasar } from 'quasar'
import packageInfo from 'app/package.json'

console.info(packageInfo.name + ':Starting Single-Spa Application')

const publicPath = `/`

async function start ({
  app,
  router,
  store
}, bootFiles) {

  let hasRedirected = false
  const getRedirectUrl = url => {
    try {
      return router.resolve(url).href
    } catch (err) {
    }

    return Object(url) === url ? null : url
  }
  const redirect = url => {
    hasRedirected = true

    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      window.location.href = url
      return
    }

    const href = getRedirectUrl(url)

    // continue if we didn't fail to resolve the url
    if (href !== null) {
      window.location.href = href

    }
  }

  const urlPath = window.location.href.replace(window.location.origin, '')

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    try {
      await bootFiles[i]({
        app,
        router,
        store,
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    } catch (err) {
      if (err && err.url) {
        redirect(err.url)
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) {
    return
  }

  // @mimas: will inject router,store in single-spa-vue
  // app.use(router)

  // app.mount('#q-app')

}

// @mimas: grab the router instance during quasar initiation
let router

// @mimas: original
createQuasarApp(createApp, quasarUserOptions)

  .then(app => {
    router = app.router

    // eventually remove this when Cordova/Capacitor/Electron support becomes old
    const [method, mapFn] = Promise.allSettled !== void 0 ? ['allSettled', bootFiles => bootFiles.map(result => {
      if (result.status === 'rejected') {
        console.error('[Quasar] boot error:', result.reason)
        return
      }
      return result.value.default
    })] : ['all', bootFiles => bootFiles.map(entry => entry.default)]

    return Promise[method]([

      import(/* webpackMode: "eager" */ 'boot/i18n'),

      import(/* webpackMode: "eager" */ 'boot/axios'),

      import(/* webpackMode: "eager" */ 'boot/reload')

    ]).then(bootFiles => {
      const boot = mapFn(bootFiles).filter(entry => typeof entry === 'function')
      start(app, boot)
    })
  })

// @mimas: single-spa-vue
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render () {
      return h(App)
    }
  },
  handleInstance (app) {
    // @mimas: inject quasar UI, router
    app.use(Quasar, quasarUserOptions)
    app.use(router)
    // @mimas: set application name as a global property
    app.config.globalProperties.$appName = packageInfo.name
  }
})

// export const {
//   bootstrap,
//   mount,
//   unmount,
//   update
// } = vueLifecycles

// @mimas: single-spa-css
const cssLifecycles = singleSpaCss({
  // 需要加载的 css 列表
  // cssUrls: ['https://example.com/main.css'],

  // 是否是 webpack 导出的 css，如果是要做额外处理（webpack 导出的文件名通常会有 hash）
  // @mimas: not working :(
  webpackExtractedCss: false,

  // 当子应用 unmount 的时候，css 是否需要一并删除
  shouldUnmount: true,
})

// @mimas: export lifecycle functions

// Export an array of lifecycles to integrate with a framework's
// single-spa lifecycles. The order matters.
export const bootstrap = [cssLifecycles.bootstrap, vueLifecycles.bootstrap]

// The CSS lifecycles should be before your framework's mount lifecycle,
// to avoid a Flash of Unstyled Content (FOUC)
export const mount = [cssLifecycles.mount, vueLifecycles.mount]

// The CSS lifecycles should be after your framework's unmount lifecycle,
// to avoid a Flash of Unstyled Content (FOUC)
export const unmount = [vueLifecycles.unmount, cssLifecycles.unmount]

export const update = vueLifecycles.update

// @mimas: single-spa application public interface
// share with other apps. Communications between apps happen here.
export { useStore as useStoreMain } from 'stores/store'
