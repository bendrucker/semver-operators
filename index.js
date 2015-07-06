'use strict'

var extend = require('xtend')
var ap = require('ap')
var packageJson = require('package-json')
var parseDependencies = require('semver-range-types')
var mothership = require('mothership')
var path = require('path')

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

  // if our path does not start w/ a dot, assume it's a package name ask npm
  // for the json
  if (pkgName.charAt(0) !== '.') {
    return packageJson(pkgName, options.version || 'latest', parse)
  }

  // otherwise find a local package.json
  mothership(path.resolve(options.cwd, pkgName), Boolean, function (err, pkg) {
    if (!err && !pkg) err = new Error('package.json not found')
    if (err) return callback(err)
    var json = pkg.pack
    // if we requested a specific version and the local version doesn't match,
    // start over and ask npm
    if (options.version && options.version !== json.version) {
      return semverOperators(json.name, options, callback)
    }
    parse(err, json)
  })

  function parse (err, json) {
    if (err) return callback(err)
    var dependencies = json[options.type] || {}
    callback(null, parseDependencies(dependencies))
  }
}
