'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walk;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _eztl = require('eztl');

var _eztl2 = _interopRequireDefault(_eztl);

var _input = require('./input.js');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(dir, vars) {
  var folders = [];
  var files = [];

  var dirEntries = _fsExtra2.default.readdirSync(dir);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = dirEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;

      var entryPath = _path2.default.join(dir, entry);
      var stat = _fsExtra2.default.statSync(entryPath);

      Object.assign(vars, (0, _input2.default)(entry, vars));
      var fName = (0, _eztl2.default)(entry, vars);
      if (fName === '') {
        _fsExtra2.default.removeSync(entryPath);
        continue;
      } else if (fName !== entry) {
        var newEntryPath = _path2.default.join(dir, fName);
        _fsExtra2.default.moveSync(entryPath, newEntryPath);
        entryPath = newEntryPath;
      }

      if (stat.isDirectory()) {
        folders.push(entryPath);
        var walkResults = walk(entryPath, vars);
        walkResults.folders.forEach(function (f) {
          return folders.push(f);
        });
        walkResults.files.forEach(function (f) {
          return files.push(f);
        });
      } else if (stat.isFile()) {
        files.push(entryPath);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return { folders: folders, files: files };
}
//# sourceMappingURL=walk.js.map