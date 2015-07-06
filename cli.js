#!/usr/bin/env node

'use strict'

var semverOperators = require('./')
var meow = require('meow')
var fail = require('cli-fail')
var chalk = require('chalk')

var cli = meow({
  help: [
    'Usage',
    '  semver-operators <package> --version=<version> --type=<type>'
  ]
})

var pkgName = cli.input[0]

if (!pkgName) fail('Package name is required')

semverOperators(pkgName, cli.flags, function (err, operators) {
  if (err) return fail(err)
  for (var operator in operators) {
    if (operators.hasOwnProperty(operator)) {
      var dependencies = operators[operator]
      var count = dependencies.length
      var list = count ? chalk.gray('(' + dependencies.join(', ') + ')') : ''
      console.log(chalk.red(operator || 'exact') + ':', count, list)
    }
  }
})
