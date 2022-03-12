/**
 * plugins/app.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/components/` folder.
 * if component doesn't have name, the component can't be registered
 */

// Imports
import Vue from 'vue'

const requireComponent = require.context('@/components', true, /\.vue$/)

for (const file of requireComponent.keys()) {
  const componentConfig = requireComponent(file)

  if (componentConfig.default.name !== undefined) {
    Vue.component(componentConfig.default.name, componentConfig.default)
  }
}
