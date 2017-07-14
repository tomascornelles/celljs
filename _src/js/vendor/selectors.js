function $ (selector, context) {
  return (context || document).querySelector(selector)
}

$.all = function (selector, context) {
  return Array.prototype.slice.call(
    (context || document).querySelectorAll(selector)
  )
}
