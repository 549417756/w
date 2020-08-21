export function debounce(func, wait = 1000) {
  let timeout = null
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, arguments)
    }, wait)
  }
}

export function getPageTitle(pageTitle) {
  const title = '云课堂后台管理'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
