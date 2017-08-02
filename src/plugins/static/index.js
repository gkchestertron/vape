import { staticDirective } from './directives'
import { staticMixin } from './mixins'
import { ListControl } from './components'

export default {
  install(Vue, options) {
    Vue.directive('static', staticDirective)
    Vue.mixin(staticMixin)
    Vue.component('list-control', ListControl)
  }
}
