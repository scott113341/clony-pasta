'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walk;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(dir) {
  var folders = [];
  var files = [];

  var dirEntries = _fs2.default.readdirSync(dir);
  dirEntries.forEach(function (entry) {
    var entryPath = _path2.default.join(dir, entry);
    var stat = _fs2.default.statSync(entryPath);

    if (stat.isDirectory()) {
      folders.push(entryPath);
      var walkResults = walk(entryPath);
      walkResults.folders.forEach(function (f) {
        return folders.push(f);
      });
      walkResults.files.forEach(function (f) {
        return files.push(f);
      });
    } else if (stat.isFile()) files.push(entryPath);
  });

  return { folders: folders, files: files };
}