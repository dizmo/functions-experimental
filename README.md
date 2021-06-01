[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-experimental.svg)](https://npmjs.org/package/@dizmo/functions-experimental)
[![Build Status](https://travis-ci.com/dizmo/functions-experimental.svg?branch=master)](https://travis-ci.com/dizmo/functions-experimental)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-experimental/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-experimental?branch=master)

# @dizmo/functions-experimental

A decorator to designate class methods (and properties) as experimental: It takes an optional message (or function) and returns the original method, where an `[EXPERIMENTAL] Class.method: message` text is printed at most *once* upon invoking the experimental method (using `console.warn`).

## Usage

### Installation

```sh
npm install @dizmo/functions-experimental --save
```

### Require

```javascript
import { experimental } from '@dizmo/functions-experimental';
import { original } from '@dizmo/functions-experimental';
```

### Example(s)

```javascript
class MyClass {
    @experimental
    method1() { ... }

    @experimental('message')
    method2() { ... }

    @experimental((self, key) => 'message')
    method3() { ... }
}
```

..where `self instanceof MyClass` and `key === 'method3'`.

```javascript
const instance = new MyClass();
original(instance.method).bind(instance)();
```

..where `bind(instance)` is required!

```javascript
class MyClass {
    @experimental
    static method1() { ... }

    @experimental('message')
    static method2() { ... }

    @experimental((self, key) => 'message')
    static method3() { ... }
}
```

..where `self === MyClass` and `key === 'method3'`.

```javascript
original(MyClass.method).bind(MyClass)();
```

..where `bind(MyClass)` is required!

## Development

### Clean

```sh
npm run clean
```

### Build

```sh
npm run build
```

#### without linting and cleaning:

```sh
npm run -- build --no-lint --no-clean
```

#### with UMD bundling (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD bundling (excl. minimization):

```sh
npm run -- build --prepack --no-minify
```

### Lint

```sh
npm run lint
```

#### with auto-fixing:

```sh
npm run -- lint --fix
```

### Test

```sh
npm run test
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- test --no-lint --no-clean --no-build
```

### Cover

```sh
npm run cover
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- cover --no-lint --no-clean --no-build
```

## Documentation

```sh
npm run docs
```

## Publication

```sh
npm publish
```

#### initially (if public):

```sh
npm publish --access=public
```

## Copyright

 © 2021 [dizmo AG](https://dizmo.com/), Switzerland
