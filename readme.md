# semver-operators [![Build Status](https://travis-ci.org/bendrucker/semver-operators.svg?branch=master)](https://travis-ci.org/bendrucker/semver-operators)

> Get the semver operators for a package with the corresponding dependencies


## Install

```
$ npm install --save semver-operators
```


## Usage

##### API

```js
var semverOperators = require('semver-operators')

semverOperators('exposify', {version: '0.4.3'}, callback);
//=> callback(null, '~': ['globo', 'has-require', ...], '^': [], '': []})
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

The name of the package.

##### options

Type: `object`  
Default: `{}`

###### version

Type: `string`  
Default: `'latest'`

The version to parse.

###### type

Type: `string`  
Default: `''`

The type of dependencies (dev or peer), defaulting to regular.

##### callback

*Required*  
Type: `function`  
Arguments: `err, operators`

A callback to be called with an operators object with keys representing operators (`''` means an exact version) and values representing the dependencies that have that operator.

## License

MIT © [Ben Drucker](http://bendrucker.me)
