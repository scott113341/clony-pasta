import fs from 'fs-extra';
import path from 'path';

import eztl from 'eztl';

import getVars from './input.js';

export default function walk (dir, vars) {
  const folders = [];
  const files = [];

  const dirEntries = fs.readdirSync(dir);
  for (let entry of dirEntries) {
    let entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    Object.assign(vars, getVars(entry, vars));
    const fName = eztl(entry, vars);
    if (fName === '') {
      fs.removeSync(entryPath);
      continue;
    } else if (fName !== entry) {
      const newEntryPath = path.join(dir, fName);
      fs.moveSync(entryPath, newEntryPath);
      entryPath = newEntryPath;
    }

    if (stat.isDirectory()) {
      folders.push(entryPath);
      const walkResults = walk(entryPath, vars);
      walkResults.folders.forEach(f => folders.push(f));
      walkResults.files.forEach(f => files.push(f));
    } else if (stat.isFile()) {
      files.push(entryPath);
    }
  }
  return { folders, files };
}
