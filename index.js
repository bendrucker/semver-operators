'use strict'

var packageJson = require('package-json')
var exactVersion = require('exact-version')

exports = module.exports = function semverOperators (pkgName, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var version = options.version || 'latest'
  var type = options.type || ''

  packageJson(pkgName, version, function (err, json) {
    if (err) return callback(err)
    var dependencies = json[type ? type + 'Dependencies' : 'dependencies']
    callback(null, parse(dependencies))
  })
}

exports.parse = parse
function parse (dependencies) {
  var operators = {
    '^': [],
    '~': [],
    '': []
  }

  return Object.keys(dependencies).reduce(function (operators, name) {
    var semver = dependencies[name]
    var firstChar = semver.charAt(0)

    if (firstChar in operators) {
      operators[firstChar].push(name)
    } else if (exactVersion(semver)) {
      operators[''].push(name)
    }

    return operators
  }, operators)
}
