#!/usr/bin/env node
'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _eztl = require('eztl');

var _eztl2 = _interopRequireDefault(_eztl);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _exec = require('./exec.js');

var _exec2 = _interopRequireDefault(_exec);

var _input = require('./input.js');

var _input2 = _interopRequireDefault(_input);

var _pastas = require('./pastas.js');

var _walk = require('./walk.js');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {};
var args = (0, _minimist2.default)(process.argv.slice(2), options);
if (!args._[0]) throw new Error('Repository is required.');
if (!args._[1]) throw new Error('Directory is required.');
var repository = args._[0];
var directory = _path2.default.resolve(args._[1]);
console.log('\n' + (0, _pastas.getRandomPasta)() + '\n');

(0, _exec2.default)('\n  git clone --quiet ' + repository + ' ' + directory + ' &&   rm -rf ' + directory + '/.git\n');

var vars = {};
var entries = (0, _walk2.default)(directory, vars);
entries.files.forEach(function (file) {
  var input = _fsExtra2.default.readFileSync(file, 'utf-8');
  Object.assign(vars, (0, _input2.default)(input, vars));
  var output = (0, _eztl2.default)(input, vars);
  _fsExtra2.default.writeFileSync(file, output);
});
//# sourceMappingURL=cli.js.map