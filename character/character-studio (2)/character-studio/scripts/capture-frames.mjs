// Renders frames of a timeline from the built .riv in the real browser runtime.
// Usage: node scripts/capture-frames.mjs [--animation Coffee_Sip] [--artboard CoffeeCharacter]
//        [--frames 0,72,192] [--fps 60] [--out captures] [--draft]
// --draft captures rive/build/office-character.riv (fresh build) instead of the published public/ copy.
// Needs Chrome/Chromium; set CHROME_PATH if it is not at a standard location.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer} from 'vite';
import {chromium} from 'playwright-core';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const arg=(name,fallback)=>{const i=process.argv.indexOf('--'+name);return i<0?fallback:process.argv[i+1];};
const animation=arg('animation','Coffee_Sip'),artboard=arg('artboard','CoffeeCharacter'),fps=+arg('fps',60);
const sizes={CoffeeCharacter:[1440,1280],OfficeCharacter:[1280,1280]};
const [w,h]=sizes[artboard]??[1280,1280];
const frames=arg('frames','0,36,72,120,162,200,236,268,300,330,372,420').split(',').map(Number);
const out=path.resolve(root,arg('out','captures'));
const src=process.argv.includes('--draft')?'/rive/build/office-character.riv':'/rive/office-character.riv';
fs.mkdirSync(out,{recursive:true});

const candidates=[process.env.CHROME_PATH,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser','/snap/bin/chromium','C:/Program Files/Google/Chrome/Application/chrome.exe'];
const executablePath=candidates.find(p=>p&&fs.existsSync(p));
if(!executablePath)throw Error('Chrome not found; set CHROME_PATH');

const server=await createServer({root,logLevel:'error',server:{port:0,host:'127.0.0.1'}});
await server.listen();
const url=server.resolvedUrls.local[0];
const browser=await chromium.launch({executablePath,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:w,height:h}});
 await page.goto(`${url}scripts/capture.html?artboard=${artboard}&animation=${animation}&w=${w}&h=${h}&src=${src}`);
 await page.waitForFunction(()=>window.captureReady||window.captureError,null,{timeout:30000});
 const error=await page.evaluate(()=>window.captureError);
 if(error)throw Error('Rive load failed: '+error);
 const files=[];
 for(const f of frames){
  await page.evaluate(s=>window.scrubTo(s),f/fps);
  const file=path.join(out,`${animation}-${String(f).padStart(3,'0')}.png`);
  await page.locator('#stage').screenshot({path:file});files.push(file);
 }
 console.log(`Captured ${files.length} frames of ${artboard}/${animation} into ${path.relative(root,out)}/`);
}finally{await browser.close();await server.close();}
