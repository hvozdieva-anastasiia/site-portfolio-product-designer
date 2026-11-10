import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ideas,fullPrompt} from '../src/ideas.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const content=`# Библиотека анимаций персонажа\n\n18 идей для видео. Готовы ${ideas.filter(i=>i.ready).length} таймлайнов. В этой итерации добавлен только Coffee_Sip (7 с): захват кружки, глоток, возврат на стол.\n\nБазовые таймлайны: Idle_Work (8 с), Typing_Loop (2 с), Blink (1 с), Look_At_Viewer (3 с). Остальные ${ideas.filter(i=>!i.ready).length} сцен — задания для следующих итераций.\n\nРаботаем по одной новой анимации за итерацию.\n\nНиже — самостоятельные промпты: общие ограничения уже включены в каждый.\n\n`+ideas.map(i=>`## ${String(i.priority).padStart(2,'0')}. ${i.title}\n\n- Статус: ${i.ready?'реализован таймлайн '+i.clip:'идея для следующей итерации'}.\n- Длительность: ${i.duration} с.\n- Режим: ${i.loop?'цикл':'однократное действие'}.\n- Для видео: ${i.use}\n\n### Промпт\n\n${fullPrompt(i)}\n`).join('\n');
fs.mkdirSync(path.join(root,'public/docs'),{recursive:true});
fs.writeFileSync(path.join(root,'ANIMATION-IDEAS.md'),content);
fs.writeFileSync(path.join(root,'public/docs/ANIMATION-IDEAS.md'),content);
fs.copyFileSync(path.join(root,'rive/scene.rml'),path.join(root,'public/docs/scene.rml'));
if(fs.existsSync(path.join(root,'README.md')))fs.copyFileSync(path.join(root,'README.md'),path.join(root,'public/docs/README.md'));
console.log(`Exported ${ideas.length} prompts.`);

