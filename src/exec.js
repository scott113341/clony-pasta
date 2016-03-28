import { execSync } from 'child_process';


export default function exec(cmd) {
  return String(execSync(cmd));
}
