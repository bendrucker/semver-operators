'use strict'

var extend = require('xtend')
var ap = require('ap')
var getPackage = require('get-package')
var parseDependencies = require('semver-range-types')

var applyDefaults = ap.partial(extend, {
  version: '',
  type: 'dependencies',
  cwd: process.cwd()
})

module.exports = function semverOperators (pkgName, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = applyDefaults(options)

  getPackage(pkgName, options, function (err, json) {
    if (err) return callback(err)
    var dependencies = json[options.type] || {}
    callback(null, parseDependencies(dependencies))
  })
}
