#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import eztl from 'eztl';
import minimist from 'minimist';
import readlineSync from 'readline-sync';

import exec from './exec.js';
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

const entries = walk(directory);
var vars = {};
entries.files.forEach(file => {
  const input = fs.readFileSync(file, 'utf-8');
  Object.assign(vars, getVars(input, vars));
  const output = eztl(input, vars);
  fs.writeFileSync(file, output);
});


function getVars(input, vars) {
  const UNDEFINED_ERROR = /(.+) variable "(.+)" is undefined\./;
  var error = true;
  vars = Object.assign({}, vars);

  while (error) {
    try {
      eztl(input, vars);
      return vars;
    }
    catch (e) {
      const match = UNDEFINED_ERROR.exec(e.message);
      if (match) Object.assign(vars, prompt(match[1], match[2]));
      else throw e;
    }
  }
}


function prompt(type, name) {
  if (type === 'String') return promptString(name);
  else return promptBoolean(name);
}


function promptString(name) {
  const value = readlineSync.question(`${name}: `);
  return { [name]: value };
}


function promptBoolean(name) {
  const response = readlineSync.question(`${name} (Y/n): `);
  const value = response !== 'n';
  return { [name]: value };
}
