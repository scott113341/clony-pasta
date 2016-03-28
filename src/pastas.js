const PASTAS = {
  beautiful: '(◕‿◕✿)',
  eyes: 'ಠ_ಠ',
  gimme: '༼ つ ◕_◕ ༽つ',
  original: '( ͡° ͜ʖ ͡°)',
  riot: '୧༼ಠ益ಠ༽୨',
  shrug: '¯\\_(ツ)_/¯',
  strong: 'ᕙ༼ ◉_◉༽ᕗ',
  tableFlip: '(╯°□°）╯︵ ┻━┻',
};


export const pastas = PASTAS;


export function getRandomPasta() {
  const pastas = objectValues(PASTAS);
  const index = Math.floor(Math.random() * pastas.length);
  return pastas[index];
}


function objectValues(object) {
  var values = [];
  for (var key in object) {
    values.push(object[key]);
  }
  return values;
}
