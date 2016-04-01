'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomPasta = getRandomPasta;
var PASTAS = {
  beautiful: '(◕‿◕✿)',
  eyes: 'ಠ_ಠ',
  gimme: '༼ つ ◕_◕ ༽つ',
  original: '( ͡° ͜ʖ ͡°)',
  riot: '୧༼ಠ益ಠ༽୨',
  shrug: '¯\\_(ツ)_/¯',
  strong: 'ᕙ༼ ◉_◉༽ᕗ',
  tableFlip: '(╯°□°）╯︵ ┻━┻'
};

var pastas = exports.pastas = PASTAS;

function getRandomPasta() {
  var pastas = objectValues(PASTAS);
  var index = Math.floor(Math.random() * pastas.length);
  return pastas[index];
}

function objectValues(object) {
  var values = [];
  for (var key in object) {
    values.push(object[key]);
  }
  return values;
}