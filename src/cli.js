#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';

import eztl from 'eztl';
import minimist from 'minimist';

import exec from './exec.js';
import getVars from './input.js';
import { getRandomPasta } from './pastas.js';
import walk from './walk.js';

const options = {};
const args = minimist(process.argv.slice(2), options);
if (!args._[0]) throw new Error('Repository is required.');
if (!args._[1]) throw new Error('Directory is required.');
const repository = args._[0];
const directory = path.resolve(args._[1]);
console.log(`\n${getRandomPasta()}\n`);

exec(`
  git clone --quiet ${repository} ${directory} && \
  rm -rf ${directory}/.git
`);

var vars = {};
const entries = walk(directory, vars);
entries.files.forEach(file => {
  const input = fs.readFileSync(file, 'utf-8');
  Object.assign(vars, getVars(input, vars));
  const output = eztl(input, vars);
  fs.writeFileSync(file, output);
});
