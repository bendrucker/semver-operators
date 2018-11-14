'use strict'

var test = require('tape')
var path = require('path')
var operators = require('./')

test('from npm', function (t) {
  t.plan(1)
  var options = { version: '0.4.3' }
  operators('exposify', options, function (err, operators) {
    if (err) return t.end(err)
    t.deepEqual(operators, {
      '~': ['globo', 'has-require', 'map-obj', 'replace-requires', 'through2', 'transformify'],
      '^': [],
      '': [],
      other: []
    })
  })
})

test('local', function (t) {
  t.plan(1)
  var options = { version: '0.2.0', cwd: path.resolve(__dirname, 'fixtures/local') }
  operators('.', options, function (err, operators) {
    if (err) return t.end(err)
    t.deepEqual(operators, {
      '~': ['transformify', 'through2', 'detective'],
      '^': [],
      '': [],
      other: []
    })
  })
})

test('local with version mismatch', function (t) {
  t.plan(1)
  var options = { version: '0.4.3', cwd: path.resolve(__dirname, 'fixtures/local') }
  operators('.', options, function (err, operators) {
    if (err) return t.end(err)
    t.deepEqual(operators, {
      '~': ['globo', 'has-require', 'map-obj', 'replace-requires', 'through2', 'transformify'],
      '^': [],
      '': [],
      other: []
    })
  })
})
