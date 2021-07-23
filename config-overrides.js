// const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewirePostCss = require('react-app-rewire-postcss')
const rewireSourceMap = require('react-app-rewire-source-map-loader')

module.exports = function override (config, env) {
  config = rewirePostCss(config, true)

  //rewireSourceMap(config, env)
  
  return config
}
