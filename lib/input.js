'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVars;

var _eztl = require('eztl');

var _eztl2 = _interopRequireDefault(_eztl);

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//# sourceMappingURL=input.js.map