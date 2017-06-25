import eztl from 'eztl';
import fs from 'fs-extra';
import path from 'path';

import getVars from './input.js';

export default function walk (dir, vars) {
  const files = [];

  const dirEntries = fs.readdirSync(dir);

  for (let entry of dirEntries) {
    let entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    getVars(entry, vars);
    const ezEntryName = eztl(entry, vars);

    // move interpolated files and dirs
    if (ezEntryName !== entry) {
      const ezEntryPath = path.join(dir, ezEntryName);
      fs.moveSync(entryPath, ezEntryPath);
      entryPath = ezEntryPath;
    }

    if (stat.isDirectory()) files.push(...walk(entryPath, vars));
    else files.push(entryPath);
  }

  return files;
}
