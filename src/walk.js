import fs from 'fs';
import path from 'path';


export default function walk(dir) {
  const folders = [];
  const files = [];

  const dirEntries = fs.readdirSync(dir);
  dirEntries.forEach(entry => {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      folders.push(entryPath);
      const walkResults = walk(entryPath);
      walkResults.folders.forEach(f => folders.push(f));
      walkResults.files.forEach(f => files.push(f));
    }
    else if (stat.isFile()) files.push(entryPath);
  });

  return { folders, files };
}
