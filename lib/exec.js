'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exec;

var _child_process = require('child_process');

function exec(cmd) {
  return String((0, _child_process.execSync)(cmd));
}
//# sourceMappingURL=exec.js.map