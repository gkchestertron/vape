import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from '../app'
import ProgressBar from 'components/ProgressBar.vue'
import plugins from 'plugins'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// TODO move to plugins
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    const ComponentData = this.$options.data || (() => ({}))

    if (asyncData) {
      asyncData.call(this)
      .then(asyncResult => {
        for (let i in asyncResult) {
          this[i] = asyncResult[i]
        }
        this.$options.data = function () {
          const data =  ComponentData.call(this)
          return Object.assign(data, asyncResult)
        }
        // add data to to cache
        if (this._Ctor && this._Ctor[0] && this._Ctor[0].options) {
          this._Ctor[0].options.data = this.data
        }
        return null
      })
    }
  }
})

// add plugins
Object.keys(plugins).forEach(name => Vue.use(plugins[name]))

createApp()
.then(({ app, router, store }) => {
  // save currentUser
  const currentUser = store.state.currentUser

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
    router.history.updateRoute(router.resolve(store.state.route.fullPath).resolved)
  }

  // persist currentUser - server doesn't have that piece of state (yet)
  store.state.currentUser = currentUser

  // set initial page
  Vue.set(store.state, 'page', Object.values(store.state.pages).find(page => {
    let re = new RegExp(page.route)
    return re.test(window.location.pathname)
  }))

  // wait until router has resolved all async before hooks
  // and async components...
  router.onReady(() => {
    console.log('app mount');
      app.$mount('#app')
  })

  // add special hook for pages to resolve syncDataHookComponents
  // (async data you want all loaded before page resolves)
  // syncData gets the store and the route
  router.beforeResolve((to, from, next) => {
    bar.start()
    resolveComponents(store, router, to, from)
    .then(() => {
      bar.finish()
      next()
    })
    .catch(next)
  })

  // service worker
  if ('https:' === location.protocol && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
  }
})

function resolveComponents(store, router, to, from) {
  const matched = router.getMatchedComponents(to)

  let activated = matched
  let diffed = false

  if (to && from) {
    const prevMatched = router.getMatchedComponents(from)
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
  }

  const syncDataHookComponents = activated.filter(c => !!c.syncData)
  if (!syncDataHookComponents.length) {
    return Promise.resolve(null)
  }

  return Promise.all(syncDataHookComponents.map(Component => {
    const ComponentData = Component.data || (() => ({}))
    const syncData = Component.syncData

    return syncData({ store, route: to })
    .then(syncResult => {
      Component.data = function () {
        const data =  ComponentData.call(this)
        return Object.assign(data, syncResult)
      }
      if (Component._Ctor && Component._Ctor[0] && Component._Ctor[0].options) {
        Component._Ctor[0].options.data = Component.data
      }
      return null
    })
  }))
}
