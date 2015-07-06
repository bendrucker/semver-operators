'use strict'

var test = require('tape')
var operators = require('./')

test('from npm', function (t) {
  t.plan(1)
  var options = {version: '0.4.3'}
  operators('exposify', options, function (err, operators) {
    if (err) return t.end(err)
    t.deepEqual(operators, {
      '~': 6,
      '^': 0,
      '': 0
    })
  })
})

test('parser', function (t) {
  var dependencies = {
    'foo': '~1.0.0',
    'bar': '^1.0.0',
    'baz': '1.0.0',
    'qux': '>= 1.0.0'
  }
  t.deepEqual(operators.parse(dependencies), {
    '~': 1,
    '^': 1,
    '': 1
  })
  t.end()
})
