import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button,ConfigProvider,Segmented,Tag,Input,Tooltip,message,Alert,Switch} from 'antd';
import {PlayCircleOutlined,PauseOutlined,ReloadOutlined,DownloadOutlined,CopyOutlined,AppstoreOutlined,FileTextOutlined,FolderOpenOutlined,CheckCircleFilled,ArrowUpOutlined,SearchOutlined} from '@ant-design/icons';
import {useRive,Layout,Fit,Alignment,RuntimeLoader} from '@rive-app/react-canvas';
import {ideas,fullPrompt} from './ideas';
import './style.css';

// Local WASM, local .riv, no account or remote runtime request.
RuntimeLoader.setWasmUrl('/rive/rive.wasm');
RuntimeLoader.setWasmFallbackUrl('/rive/rive_fallback.wasm');

// One-shot clips that have a looping *Preview state machine in the .riv.
const repeatable=new Set(['Coffee_Sip','Notification','Think','Doubt','Idea','Win','Nod','Tired']);

function Player({clip,background,reference,onReady,repeat}){
 const [failed,setFailed]=useState(false);
 // Older clips have hand-named machines; newer ones follow <Clip>Demo / <Clip>Preview.
 const named={Idle_Work:'Character',Blink:'BlinkDemo',Look_At_Viewer:'LookDemo',Typing_Loop:'TypingDemo',Coffee_Sip:repeat?'CoffeePreview':'CoffeeDemo'};
 const draft=new URLSearchParams(window.location.search).has('draft');
 // Coffee: the arm with the mug from the user's key drawings (CoffeeKeys artboard).
 const keys=clip==='Coffee_Sip';
 const machine=keys?(repeat?'CoffeeKeysPreview':'CoffeeKeysDemo'):named[clip]??(repeat&&repeatable.has(clip)?clip+'Preview':clip+'Demo');
 // ?draft=1 previews the fresh build (rive/build) without publishing it to public/.
 const src=draft?`/rive/build/office-character.riv?t=${Date.now()}`:'/rive/office-character.riv?v=keyboard-hands';
 const {rive,RiveComponent}=useRive({src,artboard:keys?'CoffeeKeys':clip==='Coffee_Sip'?'CoffeeCharacter':'OfficeCharacter',stateMachine:machine,autoplay:true,layout:new Layout({fit:Fit.Contain,alignment:Alignment.Center}),onLoadError:()=>setFailed(true)});
 useEffect(()=>{if(rive)onReady(rive);return()=>onReady(null);},[rive]);
 return <div className={`stage ${background}`}>
  <span className="stage-caption">{reference?'УТВЕРЖДЁННЫЙ РЕФЕРЕНС':'ЖИВАЯ АНИМАЦИЯ · RIVE'}</span>
  {failed?<Alert type="error" message="Не удалось загрузить анимацию" description="Проверьте локальный файл .riv и обновите страницу."/>:null}
  <div className="artboard" style={{visibility:reference?'hidden':'visible'}}><RiveComponent aria-label="Анимированная девушка за ноутбуком"/></div>
  {reference&&<img className="reference" src="/assets/reference-approved.png" alt="Утверждённая упрощённая основа персонажа"/>}
  <span className="stage-foot">1280 × 1280 <span>•</span> прозрачный фон</span>
 </div>;
}

function App(){
 const [tab,setTab]=useState('studio'),[selected,setSelected]=useState(()=>{const id=new URLSearchParams(window.location.search).get('clip');return ideas.some(i=>i.id===id)?id:'idle';}),[background,setBackground]=useState('paper'),[reference,setReference]=useState(false),[playing,setPlaying]=useState(true),[revision,setRevision]=useState(0),[filter,setFilter]=useState('Все'),[query,setQuery]=useState('');
 const [ready,setReady]=useState(false),[msg,holder]=message.useMessage();
 const [repeat,setRepeat]=useState(new URLSearchParams(window.location.search).get('repeat')==='1');
 const instance=useRef(null);
 const current=ideas.find(x=>x.id===selected), clip=current.clip??'Idle_Work';
 const readyHandler=r=>{instance.current=r;setReady(Boolean(r));};
 useEffect(()=>{setPlaying(true);setRevision(v=>v+1);},[selected]);
 const toggle=()=>{const r=instance.current;if(!r)return; if(playing)r.pause();else r.play();setPlaying(!playing);};
 const restart=()=>{setRevision(x=>x+1);setPlaying(true);};
 const copy=async()=>{try{await navigator.clipboard.writeText(fullPrompt(current));msg.success('Промпт скопирован');}catch{msg.error('Не удалось скопировать. Выделите текст промпта вручную.');}};
 const visible=ideas.filter(i=>(filter==='Все'||i.category===filter)&&(i.title+' '+i.use).toLowerCase().includes(query.toLowerCase()));
 return <ConfigProvider theme={{token:{colorPrimary:'#7559c9',colorText:'#272335',fontFamily:'Segoe UI, sans-serif',borderRadius:10,controlHeight:40}}}>{holder}
 <div className="shell">
  <aside className="sidebar">
   <a className="brand" href="#" onClick={e=>{e.preventDefault();setTab('studio');}}><span className="brand-mark">c<span>•</span></span><span>character<br/><b>studio</b></span></a>
   <div className="workspace-label">ВАША МАСТЕРСКАЯ</div>
   <nav>{[['studio',<AppstoreOutlined/>,'Анимации'],['prompts',<FileTextOutlined/>,'Библиотека идей'],['files',<FolderOpenOutlined/>,'Файлы проекта']].map(([key,icon,label])=><button key={key} className={tab===key?'active':''} onClick={()=>setTab(key)}>{icon}{label}{key==='prompts'&&<em>{ideas.length}</em>}</button>)}</nav>
   <div className="character-card"><div className="avatar"><img src="/assets/reference-approved.png" alt=""/></div><b>Наша героиня</b><span>Офис · ракурс 45°</span><Tag color="success" variant="filled">Основа утверждена</Tag></div>
   <div className="local-note"><i/> Всё на компьютере<p>Проект и анимация работают<br/>без аккаунта Rive.</p></div>
  </aside>
  <main>
   <header className="topbar"><span>Мастерская <span className="slash">/</span> Наша героиня <span className="slash">/</span> <b>{tab==='studio'?'Анимации':tab==='prompts'?'Идеи и промпты':'Файлы'}</b></span><span className="saved"><CheckCircleFilled/> Локальный проект</span></header>
   <div className="content">
    <div className="page-heading"><div><span className="eyebrow">CHARACTER / 001</span><h1>{tab==='studio'?'Мастерская анимации персонажа':tab==='prompts'?'Движения для наших историй':'Всё для следующего шага'}</h1><p>{tab==='studio'?'Проверяем движения и по одной собираем сцены для будущих видео.':tab==='prompts'?`${ideas.length} готовых заданий: от рабочего состояния до выразительных реакций.`:'Исходник Rive, векторные части и утверждённый референс.'}</p></div><a className="download-link" href="/rive/office-character.riv" download><DownloadOutlined/> Скачать .riv</a></div>
    {tab==='files'?<div className="files-grid">{[
     ['Rive-анимация','office-character.riv',`${ideas.filter(i=>i.ready).length} таймлайнов · 9 костей`,'/rive/office-character.riv'],
     ['Векторный персонаж','character-layered.svg','Отдельные именованные группы','/assets/character-layered.svg'],
     ['Утверждённая картинка','reference-approved.png','Исходный внешний вид · прозрачный PNG','/assets/reference-approved.png'],
     ['Идеи и промпты','ANIMATION-IDEAS.md',`${ideas.length} сцен, приоритеты и подробные задания`,'/docs/ANIMATION-IDEAS.md'],
     ['Исходник Rive','scene.rml','Редактируемые формы, кости и ключевые кадры','/docs/scene.rml'],
     ['Как продолжить','README.md','Запуск, структура проекта и следующие задачи','/docs/README.md']
    ].map(([title,name,desc,url])=><a className="file-card" key={name} href={url} download><FolderOpenOutlined/><h3>{title}</h3><b>{name}</b><p>{desc}</p><span>Скачать <DownloadOutlined/></span></a>)}</div>:<>
    {tab==='studio'&&<div className="studio-grid">
     <section className="preview-card"><div className="preview-top"><span><i className="live-dot"/> {current.ready?current.title:'Базовый цикл · предпросмотр'}</span><Segmented size="small" options={[{label:'Анимация',value:false},{label:'Референс',value:true}]} value={reference} onChange={setReference}/></div>
      <Player key={clip+revision+repeat} repeat={repeat} clip={clip} background={background} reference={reference} onReady={readyHandler}/>
      <div className="player-controls"><Tooltip title={playing?'Пауза':'Продолжить'}><Button shape="circle" type="primary" icon={playing?<PauseOutlined/>:<PlayCircleOutlined/>} onClick={toggle} disabled={!ready||reference} aria-label={playing?'Пауза':'Продолжить'}/></Tooltip><Tooltip title="С начала"><Button type="text" icon={<ReloadOutlined/>} onClick={restart} disabled={reference} aria-label="С начала"/></Tooltip><span className="clip-length">{current.ready?current.duration:8} с <span>·</span> {!current.ready||current.loop?'цикл':'действие'}</span><div className="control-spacer"/><span className="bg-label">Фон</span>{[['paper','#f0ede8'],['white','#fff'],['dark','#2e293b'],['transparent','linear-gradient(45deg,#ddd 25%,white 25%,white 75%,#ddd 75%)']].map(([name,color])=><button key={name} className={`swatch ${background===name?'chosen':''}`} style={{background:color}} onClick={()=>setBackground(name)} aria-label={`Фон ${name}`}/>)}</div>
      {current.ready&&!current.loop&&repeatable.has(clip)&&<div className="repeat-preview"><span>Повторять для просмотра</span><Switch size="small" checked={repeat} onChange={value=>{setRepeat(value);setPlaying(true);}} aria-label="Повторять анимацию"/></div>}{!current.ready&&<div className="planned-note">Эта сцена пока описана промптом. Выше проигрывается готовая базовая анимация.</div>}
     </section>
     <aside className="details-card"><div className="details-heading"><span className="eyebrow">{current.ready?'ГОТОВО К ПРОСМОТРУ':'ИДЕЯ ДЛЯ СЛЕДУЮЩЕЙ СЦЕНЫ'}</span><Tag color={current.ready?'success':'default'} variant="filled">{current.ready?'Готово':'Запланировано'}</Tag></div><h2>{current.title}</h2><p className="scene-use">{current.use}</p><div className="stats"><div><span>ДЛИТЕЛЬНОСТЬ</span><b>{current.duration} сек</b></div><div><span>ВОСПРОИЗВЕДЕНИЕ</span><b>{current.loop?'По кругу':'Один раз'}</b></div></div><h4>Что происходит</h4><p className="action-text">{current.action}</p><div className="prompt-snippet"><span>ЗАДАНИЕ ДЛЯ АНИМАЦИИ</span><p>{current.prompt}</p></div><Button block icon={<CopyOutlined/>} onClick={copy}>Скопировать полный промпт</Button><button className="text-link" onClick={()=>setTab('prompts')}>Открыть все идеи <ArrowUpOutlined style={{transform:'rotate(45deg)'}}/></button></aside>
    </div>}
    <section className="library"><div className="library-heading"><div><h2>{tab==='studio'?'Библиотека движений':`${ideas.length} сцен для видео`} <span>{ideas.length}</span></h2><p>Начинаем с базы, затем добавляем действия и реакции.</p></div><Input prefix={<SearchOutlined/>} placeholder="Найти анимацию" value={query} onChange={e=>setQuery(e.target.value)} allowClear/></div><div className="filters"><Segmented value={filter} onChange={setFilter} options={['Все','База','Офис','Реакции','Объяснения']}/><span>{ideas.filter(i=>i.ready).length} готово · {ideas.filter(i=>!i.ready).length} идей</span></div>
     <div className="ideas-grid">{visible.map((idea,index)=><button key={idea.id} onClick={()=>{setSelected(idea.id);if(tab==='prompts')setTab('studio');window.scrollTo({top:0,behavior:'smooth'});}} className={`idea-card ${selected===idea.id?'selected':''}`}><div className="idea-top"><span className="idea-number">{String(idea.priority).padStart(2,'0')}</span><Tag variant="filled" color={idea.ready?'success':'default'}>{idea.ready?'Готово':'Идея'}</Tag></div><h3>{idea.title}</h3><p>{idea.action}</p><div className="idea-bottom"><span>{idea.category} <span>·</span> {idea.duration} с</span><span>{idea.loop?'↻':'↗'}</span></div></button>)}</div>{!visible.length&&<p className="empty">По этому запросу ничего не найдено.</p>}
    </section></>}
    <footer><span>CHARACTER STUDIO <span> / </span> Изучает материал</span><span>React + Ant Design + Rive · локально</span></footer>
   </div>
  </main>
 </div></ConfigProvider>;
}
createRoot(document.getElementById('root')).render(<App/>);







