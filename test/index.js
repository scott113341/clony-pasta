import test from 'tape';

import clonyPasta from '../lib';


test('yee', t => {
  t.equal(clonyPasta(), 'yee');
  t.end();
});
