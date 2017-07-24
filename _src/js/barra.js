barra = {
  _template: function (actual, posible, clase) {
    return [{
      $type: 't-barra',
      $components: [{
        style: 'width:' + actual + '%',
        class: clase
      }, {
        style: 'width:' + posible + '%',
        class: 'extra'
      }],
    }]
  }
}