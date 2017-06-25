import eztl from 'eztl';
import readlineSync from 'readline-sync';

const UNDEFINED_ERROR = /(.+) variable "(.+)" is undefined\./;

export default function getVars (input, vars) {
  while (true) {
    try {
      eztl(input, vars);
      return vars;
    } catch (e) {
      const match = UNDEFINED_ERROR.exec(e.message);
      if (match) Object.assign(vars, prompt(match[1], match[2]));
      else throw e;
    }
  }
}

function prompt (type, name) {
  if (type === 'String') return promptString(name);
  else return promptBoolean(name);
}

function promptString (name) {
  const value = readlineSync.question(`${name}: `);
  return { [name]: value };
}

function promptBoolean (name) {
  const response = readlineSync.question(`${name} (Y/n): `);
  const value = response !== 'n';
  return { [name]: value };
}
