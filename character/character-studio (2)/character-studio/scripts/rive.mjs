// Runs the Rive CLI on any platform: RIVE_BIN, then `rive` on PATH, then ~/.rive/bin/rive,
// then the bundled Windows build (through wine on Linux/macOS).
// Usage: node scripts/rive.mjs <rive args...>   e.g. node scripts/rive.mjs rive --verify
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const onPath=name=>spawnSync(process.platform==='win32'?'where':'which',[name],{stdio:'ignore'}).status===0;
export function riveCommand(){
 if(process.env.RIVE_BIN)return [process.env.RIVE_BIN,[]];
 if(onPath('rive'))return ['rive',[]];
 const home=path.join(os.homedir(),'.rive/bin/rive');
 if(fs.existsSync(home))return [home,[]];
 const exe=path.join(root,'tools/rive.exe');
 if(process.platform==='win32')return [exe,[]];
 if(fs.existsSync(exe)&&onPath('wine'))return ['wine',[exe]];
 throw Error('Rive CLI not found. Install it: curl -fsSL https://releases.rive.app/cli/install.sh | sh');
}
export function rive(args){
 const [cmd,pre]=riveCommand();
 const result=spawnSync(cmd,[...pre,...args],{cwd:root,stdio:'inherit',env:{WINEDEBUG:'-all',...process.env}});
 return result.status??1;
}
if(process.argv[1]===fileURLToPath(import.meta.url))process.exit(rive(process.argv.slice(2)));
