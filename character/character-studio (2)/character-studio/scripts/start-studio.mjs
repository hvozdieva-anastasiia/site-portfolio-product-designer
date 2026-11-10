import http from 'node:http';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const url='http://localhost:5173/';
const responds=()=>new Promise(resolve=>{const req=http.get('http://127.0.0.1:5173/',res=>{res.resume();resolve(res.statusCode===200);});req.on('error',()=>resolve(false));req.setTimeout(800,()=>{req.destroy();resolve(false);});});
if(!await responds()){
 const child=spawn(process.execPath,[path.join(root,'node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','5173','--strictPort'],{cwd:root,detached:true,windowsHide:true,stdio:'ignore'});
 child.unref();
 let loaded=false;
 for(let i=0;i<20;i++){await new Promise(resolve=>setTimeout(resolve,500));if(await responds()){loaded=true;break;}}
 if(!loaded){console.error('Не удалось запустить студию. Проверьте установку зависимостей и доступность порта 5173.');process.exit(1);}
}
const opener=process.platform==='win32'?['cmd.exe',['/d','/c','start','',url]]:process.platform==='darwin'?['open',[url]]:['xdg-open',[url]];
spawn(...opener,{windowsHide:true,stdio:'ignore',detached:true}).on('error',()=>{}).unref();
console.log(`Студия открыта: ${url}`);
