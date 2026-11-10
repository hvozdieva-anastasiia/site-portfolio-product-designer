// Full rebuild: generator -> verify -> summary -> .riv -> public copy -> docs.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {rive} from './rive.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const node=script=>{if(spawnSync(process.execPath,[path.join(root,script)],{cwd:root,stdio:'inherit'}).status)process.exit(1);};
node('scripts/build-character.mjs');
for(const args of [['rive','--verify'],['inspect','rive','--summary'],['rive','--once']])if(rive(args))process.exit(1);
fs.copyFileSync(path.join(root,'rive/build/office-character.riv'),path.join(root,'public/rive/office-character.riv'));
node('scripts/export-docs.mjs');
console.log('Rebuilt public/rive/office-character.riv');
