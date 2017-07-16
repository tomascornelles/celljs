/* global fetch */
F1App = {
  $cell: true,
  _items: [],
  id: 'f1app',
  $type: 'table',
  $init: function () {
    this._stats()
  },
  $update: function () {
    if (this._items.length > 0) this.$components = this._items.map(this._template)
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
  _actual: function (points) {
    return points / (20 * 25) * 100
  },
  _posible: function () {
    return (20 - this._race) / 20 * 100
  },
  _clase: function (points) {
    return (this._actual(points) + this._posible() > this._actual(this._items[0].points)) ? 'posible' : 'imposible'
  },
  _template: function (item) {
    return {
      $type: 'tr',
      $components: [{
        $type: 'th',
        $text: item.position,
        class: this._clase(item.points)
      }, {
        $type: 'td',
        $text: item.Driver.givenName + ' ' + item.Driver.familyName
      }, {
        $type: 'td',
        $text: item.points
      }, {
        $type: 'td',
        $components: barra._template(this._actual(item.points), this._posible(), this._clase(item.points))
      }]
    }
  }
}