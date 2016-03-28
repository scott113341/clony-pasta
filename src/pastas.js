const PASTAS = {
  original: '( ͡° ͜ʖ ͡°)',
  shrug: '¯\\_(ツ)_/¯',
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
