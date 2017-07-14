/* global fetch */
F1App = {
  $cell: true,
  _items: [],
  id: 'f1app',
  $type: 'table',
  $init: function () {
    this._stats()
  },
  _stats: function () {
    fetch('http://ergast.com/api/f1/current/driverStandings.json').then(function (res) {
      return res.json()
    }).then(function (res) {
      this._refresh(res.MRData.StandingsTable.StandingsLists[0])
    }.bind(this))
  },
  _refresh: function (result) {
    this._items = result.DriverStandings
    this._race = result.round
  },
  _actual: function (elem) {
    return elem.points / (20 * 25) * 100
  },
  _posible: function (elem) {
    return (20 - this._race) / 20 * 100
  },
  _clase: function (elem) {
    return (this._actual(elem) + this._posible(elem) > this._actual(this._items[0])) ? 'posible' : 'imposible'
  },
  _template: function (item) {
    return {
      $type: 'tr',
      $components: [{
        $type: 'th',
        $text: item.position,
        class: this._clase(item)
      }, {
        $type: 'td',
        $text: item.Driver.givenName + ' ' + item.Driver.familyName
      }, {
        $type: 'td',
        $text: item.points ? item.points : ''
      }, {
        $type: 'td',
        class: 'barra',
        $components: [{
          style: 'width:' + this._actual(item) + '%',
          class: this._clase(item)
        }, {
          style: 'width:' + this._posible(item) + '%',
          class: 'extra'
        }]
      }]
    }
  },
  $update: function () {
    this.$components = this._items.map(this._template)
  }
}
