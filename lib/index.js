
;(function(){
var encodingType = {
  'crockford': {
      // Crockford
    'alphabet': '0123456789abcdefghjkmnpqrstvwxyz',
    'alias':{ 'o': 0, 'i': 1, 'l': 1}
  },
  'rfc': {
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
var BASE32_ALPHABET = { '=': ' ' }
var setAlphabet = function(type){
  base32Chars = encodingType[type]['alphabet']
  alias = encodingType[type]['alias']
  BASE32_ALPHABET = {'=': ' '}
  
  for (var i = 0; i < base32Chars.length; i++) {
      BASE32_ALPHABET[base32Chars[i]] = i
  }
  for (var key in alias) {
      if (!alias.hasOwnProperty(key)) continue
      BASE32_ALPHABET[key] = BASE32_ALPHABET['' + alias[key]]
  }
}

function encode(text, type = 'rfc') {
  if (type && encodingType.hasOwnProperty(type)) {
    setAlphabet(type)
  }else{
    return 'These are the only encodings available: cf, rfc, z32, geo'
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
  var paddingLength = (8 - (encoded.length % 8)) % 8;
  return encoded + "=".repeat(paddingLength);
}
function decode(encoded, type = 'rfc') {
  if (type && encodingType.hasOwnProperty(type)) {
    setAlphabet(type)
  }else{
    return 'These are the only encodings available: cf, rfc, z32, geo'
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
  return decoded;
}


var base32lib = {
  encode: encode,
  decode: decode,
}

if (typeof window !== 'undefined') {
  window.base32lib = base32lib
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = base32lib
}
})();