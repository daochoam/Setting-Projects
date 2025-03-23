import { defineAsyncComponent } from 'vue'

const components = require.context('@/components/ComponentFolder', true, /\.vue$/)

export default {
  install(app) {
    components.keys().forEach((fileName) => {
      const component = defineAsyncComponent(() =>
        Promise.resolve(components(fileName))
      )

      const componentName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')

      app.component(componentName, component)
    })
  },
}
