#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _eztl = require('eztl');

var _eztl2 = _interopRequireDefault(_eztl);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

var _exec = require('./exec.js');

var _exec2 = _interopRequireDefault(_exec);

var _pastas = require('./pastas.js');

var _walk = require('./walk.js');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = {};
var args = (0, _minimist2.default)(process.argv.slice(2), options);
if (!args._[0]) throw new Error('Repository is required.');
if (!args._[1]) throw new Error('Directory is required.');
var repository = args._[0];
var directory = _path2.default.resolve(args._[1]);
console.log('\n' + (0, _pastas.getRandomPasta)() + '\n');

(0, _exec2.default)('\n  git clone --quiet ' + repository + ' ' + directory + ' &&   rm -rf ' + directory + '/.git\n');

var entries = (0, _walk2.default)(directory);
var vars = {};
entries.files.forEach(function (file) {
  var input = _fs2.default.readFileSync(file, 'utf-8');
  Object.assign(vars, getVars(input, vars));
  var output = (0, _eztl2.default)(input, vars);
  _fs2.default.writeFileSync(file, output);
});

function getVars(input, vars) {
  var UNDEFINED_ERROR = /(.+) variable "(.+)" is undefined\./;
  vars = Object.assign({}, vars);

  while (true) {
    try {
      (0, _eztl2.default)(input, vars);
      return vars;
    } catch (e) {
      var match = UNDEFINED_ERROR.exec(e.message);
      if (match) Object.assign(vars, prompt(match[1], match[2]));else throw e;
    }
  }
}

function prompt(type, name) {
  if (type === 'String') return promptString(name);else return promptBoolean(name);
}

function promptString(name) {
  var value = _readlineSync2.default.question(name + ': ');
  return _defineProperty({}, name, value);
}

function promptBoolean(name) {
  var response = _readlineSync2.default.question(name + ' (Y/n): ');
  var value = response !== 'n';
  return _defineProperty({}, name, value);
}
//# sourceMappingURL=cli.js.map