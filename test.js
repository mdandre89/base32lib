var assert = require('assert')
var base32lib = require('./lib/index')

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

var testCases = [
  // RFC 4648 - Test vectors
  ['rfc4648', '', ''],
  ['rfc4648', 'f', 'MY======'],
  ['rfc4648', 'fo', 'MZXQ===='],
  ['rfc4648', 'foo', 'MZXW6==='],
  ['rfc4648', 'foob', 'MZXW6YQ='],
  ['rfc4648', 'fooba', 'MZXW6YTB'],
  ['rfc4648', 'foobar', 'MZXW6YTBOI======'],

  // RFC 4648 - Hex test vectors
  ['32hex', '', ''],
  ['32hex', 'f', 'CO======'],
  ['32hex', 'fo', 'CPNG===='],
  ['32hex', 'foo', 'CPNMU==='],
  ['32hex', 'foob', 'CPNMUOG='],
  ['32hex', 'fooba', 'CPNMUOJ1'],
  ['32hex', 'foobar', 'CPNMUOJ1E8======'],

  // Crockford - Small samples
  ['crockford', '', ''],
  ['crockford', 'a', 'C4'],
  ['crockford', 'a', 'c4'],
  ['crockford', 'test', 'EHJQ6X0'],
  ['crockford', 'test', 'EHJQ6XO', 'false'],
  ['crockford', 'linus', 'DHMPWXBK'],
  ['crockford', 'linus', 'DhmPWXbK', 'false'],
  ['crockford', 'foobar', 'CSQPYRK1E8'],
  ['crockford', 'foobar', 'CSQPYRKLE8', 'false'],
  ['crockford', 'foobar', 'CSQPYRKIE8', 'false']
]

function makeWord(length, characters) {
  let result = '';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

testCases.forEach(function (testCase) {
  const result = base32lib.decode(testCase[2], testCase[0])
  assert( result === testCase[1] )
})

testCases.forEach(function (testCase) {
  const result = base32lib.encode(testCase[1], testCase[0])
  if (testCase[3] === 'false') {
    assert(result !== testCase[2])
  }else{
    assert(result === testCase[2].toLowerCase())
  }
})

var encodings = ['crockford', 'rfc4648', 'z-32', 'geohash', '32hex']

for (let index = 0; index < 10000; index++) {
  var encoding = encodings[Math.floor(Math.random() * 5)]
  var wordLength = Math.floor(Math.random() * (15 - 5 + 1)) + 5
  var alphabet = encodingType[encoding]['alphabet']
  var word = makeWord(wordLength, alphabet)

  assert( base32lib.decode(base32lib.encode(word, encoding), encoding)  === word )
}