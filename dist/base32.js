/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 568:
/***/ ((module) => {

// eslint-disable-next-line no-extra-semi
;(function(){
var encodingType = {
  'crockford': {
      // Crockford
    'alphabet': '0123456789abcdefghjkmnpqrstvwxyz',
    'alias':{ 'o': 0, 'i': 1, 'l': 1}
  },
  'rfc4648': {
    // RFC4648
    'alphabet': 'abcdefghijklmnopqrstuvwxyz234567',
    'alias': {'8': 'b', '0': 'o', '1': 'l'}
  },
  'z-32': {
    //z-32
    'alphabet': 'ybndrfg8ejkmcpqxot1uwisza345h769',
    'alias': {'l': '1', 'v': 'u', '2': 'z'}
  },
  'geohash': {
    //geohash
    'alphabet': '0123456789bcdefghjkmnpqrstuvwxyz',
    'alias': {}
  },
  '32hex': {
    //32hex
    'alphabet': '0123456789abcdefghijklmnopqrstuv',
    'alias': {}
  },
}
var base32Chars = ''
var alias = ''
var BASE32_ALPHABET = { }
var setAlphabet = function(type){
  base32Chars = encodingType[type]['alphabet']
  alias = encodingType[type]['alias']
  
  for (var i = 0; i < base32Chars.length; i++) {
      BASE32_ALPHABET[base32Chars[i]] = i
  }
  for (var key in alias) {
      if (!Object.prototype.hasOwnProperty.call(alias, key)) continue
      BASE32_ALPHABET[key] = BASE32_ALPHABET['' + alias[key]]
  }
  if (['32hex', 'rfc4648'].includes(type)) {
    BASE32_ALPHABET['='] = ' '
  }
}

function encode(text, type = 'rfc4648') {
  if (type && Object.prototype.hasOwnProperty.call(encodingType, type)) {
    setAlphabet(type)
  }else{
    return 'These are the only encodings available: crockford, rfc4648, z-32, geohash, 32hex'
  }
  var bits = 0;
  var value = 0;
  var encoded = "";
  for (var i = 0; i < text.length; i++) {
    value = (value << 8) | text.charCodeAt(i);
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      encoded += base32Chars.charAt(value >>> bits);
      value &= (1 << bits) - 1;
    }
  }
  if (bits > 0) {
    value <<= (5 - bits);
    encoded += base32Chars.charAt(value);
  }
  // Add padding
  var paddingLength = ['32hex', 'rfc4648'].includes(type) ? (8 - (encoded.length % 8)) % 8 : 0;
  return encoded + "=".repeat(paddingLength);
}
function decode(encoded, type = 'rfc4648') {
  if (type && Object.prototype.hasOwnProperty.call(encodingType, type)) {
    setAlphabet(type)
  }else{
    return 'These are the only encodings available: crockford, rfc4648, z-32, geohash'
  }
  encoded = encoded.toLowerCase()
  var bits = 0;
  var value = 0;
  var decoded = "";
  for (var i = 0; i < encoded.length; i++) {
    var char = encoded.charAt(i);
    if (!(char in BASE32_ALPHABET)) {
      throw new Error("Invalid character found: " + char);
    }
    value = (value << 5) | BASE32_ALPHABET[char];
    bits += 5;
    while (bits >= 8) {
      bits -= 8;
      decoded += String.fromCharCode((value >>> bits) & 0xFF);
    }
  }
  return decoded.replace(/\0/g, '');
}


var base32lib = {
  encode: encode,
  decode: decode,
}

if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-undef
  window.base32lib = base32lib
}

if ( true && module.exports) {
  module.exports = base32lib
}
})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(568);
/******/ 	
/******/ })()
;