#!/usr/bin/env node

import cp from 'child_process';
import fs from 'fs-extra';
import path from 'path';

import eztl from 'eztl';
import minimist from 'minimist';

import getVars from './input.js';
import { getRandomPasta } from './pastas.js';
import getFiles from './walk.js';

const options = {};
const args = minimist(process.argv.slice(2), options);
if (!args._[0]) throw new Error('Repository is required.');
if (!args._[1]) throw new Error('Directory is required.');
const repository = args._[0];
const directory = path.resolve(args._[1]);
console.log(`\n${getRandomPasta()}\n`);

cp.spawnSync('git', [ 'clone', '--quiet', repository, directory ]);
fs.removeSync(path.join(directory, '.git'));

const vars = {};
const files = getFiles(directory, vars);

files.forEach(file => {
  const input = fs.readFileSync(file, 'utf-8');
  getVars(input, vars);
  const output = eztl(input, vars);
  fs.writeFileSync(file, output);
});
