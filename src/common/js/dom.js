export function addClass(el, className) {
  if (!hadClass(el, className)) {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

export function hadClass(el, className) {
  if (el.className.indexOf(className) > 0) {
    return true
  }
  return false
  // let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // return reg.test(el.className)
}

export function getData(el, name, val) {
  let data = 'data-' + name
  if (val) {
    return el.setAttribute(data, val)
  } else {
    return el.getAttribute(data)
  }
}
