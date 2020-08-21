const apiList = []
function registerApi(router) {
  router.keys().forEach(key => {
    apiList.push(router(key).default)
  })
}

registerApi(require.context('./interface', false, /\.js$/))

const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return Object.assign({}, ...apiList)
      }
    }
  })
}

export default install
