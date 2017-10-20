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

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
