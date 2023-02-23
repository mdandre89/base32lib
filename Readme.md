# Base 32 encoding/decoding for JavaScript

![License](https://img.shields.io/github/license/elephantcastle/base32lib)
![npm version](https://img.shields.io/github/package-json/v/elephantcastle/base32lib)
<!-- ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MishaKav/5e90d640f8c212ab7bbac38f72323f80/raw/jest-coverage-comment__main.json) -->

Base 32 is between hexadecimal notation and Base 64 encoding. It's intended to be a **human-friendly** -- you don't have to worry about punctuation, capitalization, or letters/numbers that are easy to confuse, making it easier to transmit in handwriting or over the phone.

Base 32 will work the same with upper- or lowercase, you can mistake a number for a similar-looking letter, and it will *still* decode to the same data.

## Getting started

In your shell, install with npm:

```sh
npm install base32lib
```

In your code:

```javascript
const base32lib = require('base32lib')

// encodings available: crockford, rfc4648, z-32, geohash, 32hex
// The default one is RFC4648
const encoded = base32lib.encode('some data to encode 123', 'rfc4648') //onxw2zjamrqxiyjaorxsazlomnxwizjagezdg===
const encoded2 = base32lib.encode('Some data to encOde 123') //onxw2zjamrqxiyjaorxsazlomnxwizjagezdg===
console.log(encoded === encoded2) // true
const decoded = base32lib.decode(encoded) // some data to encode 123
```

The main specifications of something called "Base 32" are present in this library: RFC4648, Crockford, z-32, geohash, 32hex - see [Wikipedia](http://en.wikipedia.org/wiki/Base_32) for some of them.

## Minispec

- When *decoding*, capital letters are converted to lowercase and the depending on the spec "ambiguous" letters mentioned might be converted to their numeric counterparts.
- Each character corresponds to 5 bits of input.
- Lexicographic order of strings is preserved through Base 32 encoding.

## Formalia

Under MIT License.
