# semver-operators [![Build Status](https://travis-ci.org/bendrucker/semver-operators.svg?branch=master)](https://travis-ci.org/bendrucker/semver-operators) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/semver-operators.svg)](https://greenkeeper.io/)

> Get the semver operators for a package with the corresponding dependencies


## Install

```
$ npm install --save semver-operators
```

## Usage

##### API

```js
var semverOperators = require('semver-operators')

semverOperators('exposify', {version: '0.4.3'}, callback)
//=> callback(null, '~': ['globo', 'has-require', ...], '^': [], '': []})

semverOperators('.', callback)
//=> get operators for current package

semverOperators('./node_modules/exposify', callback)
//=> get operators for a package you installed locally
```

##### CLI

```sh
$ semver-operators exposify --version=0.4.3
```

## API

#### `semverOperators(package, [options], callback)` -> `undefined`

##### package

*Required*  
Type: `string`

The name of the package (npm is queried) or the path to the package (lookup is performed locally). 

##### options

###### version

Type: `string`  
Default: `''`

The version to parse. If you specify a version alongside a local path and there is a conflict, semver-operators will query npm for the version you requested.

###### type

Type: `string`  
Default: `'dependencies'`

The type of dependencies (e.g. devDependencies or peerDependencies).

##### callback

*Required*  
Type: `function`  
Arguments: `err, operators`

A callback to be called with an operators object with keys (`'~'`, `'^'`, `''`, `'other'`) representing operators and values representing the dependencies that have that operator. See [semver-range-types](https://github.com/bendrucker/semver-range-types) for more details on how ranges are parsed.

## License

MIT © [Ben Drucker](http://bendrucker.me)
