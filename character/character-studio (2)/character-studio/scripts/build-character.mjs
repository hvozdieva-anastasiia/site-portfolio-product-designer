import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createCoffeeRig,coffeeTimeline,coffeePose,coffeeInfo} from './coffee-action.mjs';
import {reactions} from './reactions.mjs';
import {fingerBend} from './finger-bend.mjs';
import {coffeeKeysArt,coffeeKeysTimeline,duration as coffeeKeysDuration} from './coffee-keys.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ink = '#281b19', skin = '#ffc28f', hair = '#432a24', navy = '#314e7d', blue = '#5878a8', white = '#f5f0e6';
let nextId = 100;
const ids = {};
const id = name => ids[name] ??= `0:${nextId++}`;
const esc = v => String(v).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const shape = (name,d,fill,stroke=ink,width=7) => ({kind:'path', name,d,fill,stroke,width});
const group = (name,pivot,children,bone=false) => ({kind:'group',name,pivot,children,bone});
const ellipse = (name,x,y,rx,ry,fill,stroke=null,width=0) => shape(name, `M ${x-rx} ${y} C ${x-rx} ${y-ry*.5523} ${x-rx*.5523} ${y-ry} ${x} ${y-ry} C ${x+rx*.5523} ${y-ry} ${x+rx} ${y-ry*.5523} ${x+rx} ${y} C ${x+rx} ${y+ry*.5523} ${x+rx*.5523} ${y+ry} ${x} ${y+ry} C ${x-rx*.5523} ${y+ry} ${x-rx} ${y+ry*.5523} ${x-rx} ${y} Z`,fill,stroke,width);

// Version 2 uses measured contours from the approved reference, not the old sketch.
const traced = JSON.parse(fs.readFileSync(path.join(root,'assets/character-trace.json'),'utf8'));
const {source: keyboardHandsSource, ...keyboardHands} = JSON.parse(
 fs.readFileSync(path.join(root,'assets/keyboard-hands.json'),'utf8'),
);
const contourNames={0:'Silhouette',1:'LaptopLid',2:'Face',3:'HairRight',5:'HairLeft',6:'Desktop',7:'ForearmNear',10:'HandNear',12:'Neck',13:'HoodNear',14:'HairBack',18:'Keyboard',21:'ForearmFar',24:'BatmanTop',27:'BatmanBottom',40:'EyeNear',46:'EyeFar',47:'WatchFace',48:'BrowNear',55:'Mouth',57:'WatchStrap',58:'BrowFar',63:'Earring',64:'Nose'};
const eyeIndices = new Set(Object.values(traced.eyes).flatMap(e=>e.indices));
function tracedPart(name,maskName,exclude=new Set()){
 const items=(keyboardHands[maskName] ?? traced.native_parts[maskName]).filter(p=>!exclude.has(p.index)).map(p=>{
  return {...shape(`${name}_${contourNames[p.index]??'Clothing'}_${p.index}`,p.d,p.fill,null,0),x:p.x,y:p.y,evenOdd:true};
 });
 return items;
}
function eye(name){
 const data=traced.eyes[name];
 const parts=[traced.paths[data.indices[0]]].map((p,i)=>({...shape(name+'_Liner',p.d,p.fill,null,0),x:p.x,y:p.y}));
 const scleraName=name+'_Sclera';
 parts.push({kind:'mask',name:scleraName,paths:data.sclera,fill:'#f6f4f4'});
 const pupilName=name==='EyeNear'?'PupilNear':'PupilFar';
 parts.push(group(pupilName,data.center,data.pupil.map((p,i)=>({...shape(pupilName+'_Contour_'+i,p.d,'#251512',null,0),x:p.x,y:p.y,clip:scleraName}))));
 return group(name,data.center,parts);
}
// Closed eyes as arcs, inside Head so they turn with it; used for blinks and the coffee sip.
function closedEyes(){
 const [nx,ny]=traced.eyes.EyeNear.center,[fx,fy]=traced.eyes.EyeFar.center;
 return {...group('ClosedEyes',[0,0],[
  shape('ClosedEyeNear',`M ${nx-50} ${ny+4} Q ${nx-2} ${ny+30} ${nx+48} ${ny+2} L ${nx+60} ${ny-8}`,null,ink,8),
  shape('ClosedEyeFar',`M ${fx+30} ${fy+6} Q ${fx-12} ${fy+26} ${fx-50} ${fy+4} L ${fx-60} ${fy-4}`,null,ink,8),
 ]),opacity:0};
}
// The traced body outline (contour 0) also carries the hair edge and a wedge beside the far
// eye. Split it with a head-shaped clip so those pieces turn with the head.
const headRegion='M 500 700 L 500 380 L 540 200 L 660 60 L 880 40 L 1080 90 L 1170 280 L 1175 535 L 1120 558 L 1080 573 L 1010 640 L 960 640 L 880 560 L 800 560 L 700 640 L 640 690 Z';
// Rive clips with the non-zero rule, so the hole is wound opposite to the outer frame.
const reversedRegion='M '+headRegion.match(/-?\d+ -?\d+/g).reverse().join(' L ')+' Z';
const headSplitMasks={HeadRegion:[{d:headRegion,x:0,y:0}],BodyOutsideHead:[{d:'M -20 -20 L 1500 -20 L 1500 1300 L -20 1300 Z '+reversedRegion,x:0,y:0}]};
const bodyParts=tracedPart('Body','BodyMask').map(p=>p.name==='Body_Silhouette_0'?{...p,clip:'BodyOutsideHead'}:p);
const headOutline={...bodyParts.find(p=>p.name==='Body_Silhouette_0'),name:'Head_BodyOutline_0',clip:'HeadRegion'};
// Brows get their own groups (pivot at the brow centre) so reactions can raise them.
const browCenters={BrowNear:[856,303],BrowFar:[704,332]};
// The mouth is morphable: reactions key its vertices (smile → neutral).
const headParts=()=>tracedPart('Head','HeadMask',eyeIndices).map(p=>p.name==='Head_Mouth_55'?{...p,morph:true}:p).map(p=>{const brow=Object.keys(browCenters).find(b=>p.name==='Head_'+b+'_'+(b==='BrowNear'?48:58));return brow?group(brow,browCenters[brow],[p]):p;});
const nearHandParts=()=>tracedPart('NearHand','HandNearMask').map(p=>({...p,morph:true}));
const farHandParts=()=>tracedPart('FarArm','ArmFarMask').map(p=>/_(0|21|70|79|80|89)$/.test(p.name)?{...p,morph:true}:p);
const previousScene=[
 // Behind everything: when the torso rises a few px, the forearm lifts off the desk line.
 // Keyboard under the fingertips: shows only where a typing finger lifts.
 shape('KeyboardUnderHands','M 486 1060 L 790 1060 L 790 1124 L 500 1124 Z','#676876',null,0),
 shape('DeskLineGapFill','M 800 1110 L 1160 1110 L 1160 1134 L 800 1134 Z','#1f1311',null,0),
 group('Body',[843,1125],[
  {...group('CoffeeTorsoSupport',[0,0],[
   shape('CoffeeShirtUnderHand','M 704 1000 L 1008 1000 L 1012 1118 L 696 1118 Z','#1f1311',null,0),
   shape('CoffeeTorsoOutline','M 1000 702 Q 1070 677 1138 701 Q 1112 857 1124 1120 L 992 1120 Z','#1f1311',null,0),
   shape('CoffeeTorsoBlue','M 1013 719 Q 1081 693 1125 715 L 1109 1113 L 999 1113 Z','#2b4373',null,0),
   shape('CoffeeTorsoCheckTop','M 1006 809 L 1119 795 L 1117 858 L 1002 878 Z','#f4ede0',null,0),
   shape('CoffeeTorsoCheckBottom','M 1001 974 L 1114 961 L 1117 1024 L 998 1038 Z','#f4ede0',null,0),
   shape('CoffeeShoulderBacking','M 1070 701 Q 1137 637 1196 700 L 1193 783 L 1071 783 Z','#6179ac',null,0),
  ]),opacity:0},
  // Behind everything in Body: when the head tilts, the hair lifts off the shoulders; keep that seam dark.
  shape('HairShoulderGapFill','M 662 662 L 670 636 L 860 615 L 860 700 L 690 700 Z','#1f1311',null,0),
  shape('HairHoodGapFill','M 950 650 L 1000 634 L 1104 558 L 1116 564 L 1022 672 L 960 676 Z','#1f1311',null,0),
  {kind:'mask',name:'BodyOutsideHead',paths:headSplitMasks.BodyOutsideHead,fill:null},
  ...bodyParts,
  // Hidden overlap pads remain behind the traced parts and cover subpixel rig seams.
  group('WristOverlapSupport',[0,0],[shape('WristOverlap','M 773 1050 L 855 1050 L 855 1112 L 773 1112 Z','#f9bd8c',null,0)]),
  // Typing bends the traced fingers by keying their vertices (scripts/finger-bend.mjs).
  group('ArmFar',[584,1020],farHandParts(),true),
  group('Head',[879,683],[{kind:'mask',name:'HeadRegion',paths:headSplitMasks.HeadRegion,fill:null},headOutline,...headParts(),eye('EyeFar'),eye('EyeNear'),closedEyes()],true),
  group('ArmUpperNear',[1135,707],[
   // A still dark copy of the forearm silhouette behind everything: when the forearm slides a few
   // px (Scroll), the uncovered strip reads as outline instead of showing the background.
   group('ArmNearBacking',[0,0],tracedPart('ArmBacking','ArmNearMask').filter(p=>p.name.endsWith('_0'))),
   ...tracedPart('UpperSleeve','UpperArmMask'),
   group('ArmNear',[1120,1115],[
    ...tracedPart('NearArm','ArmNearMask'),
    group('HandNear',[794,1081],nearHandParts(),true),
   ],true),
  ],true),
 ],true),
 // Skin slivers of the resting arms that the trace put into the fixed layer: each sits in
 // its own group (same draw order) so torso moves can carry them along.
 ...tracedPart('Fixed','FixedMask').map(p=>{
  const skinIndex=p.name.match(/_(7|10|21)$/)?.[1];
  return skinIndex ? {...group('FixedSkin_'+skinIndex,[0,0],[p]),opacity:skinIndex==='7'?1:0} : p;
 }),
 {...group('CoffeeKeyboardSupport',[0,0],[shape('KeyboardUnderHand','M 498 1038 L 701 1040 L 704 1115 L 512 1125 Z','#676876','#211512',5),...tracedPart('CoffeeFarHand','ArmFarMask')]),opacity:0},
 {...group('CoffeeCupGrip',[794,1081],[
  // Cup rim is 92 px above the wrist; its foot sits on the desktop in the rest pose.
  shape('CoffeeCupHandle','M 770 1013 C 829 1000 830 1081 775 1081 L 770 1063 C 807 1062 808 1024 772 1032 Z','#f4ede0','#211512',7),
  shape('CoffeeCupBody','M 680 989 Q 729 978 778 989 L 773 1073 Q 771 1101 732 1103 Q 690 1103 685 1075 Z','#f4ede0','#211512',7),
  shape('CoffeeCupBand','M 683 1024 Q 729 1035 777 1024 L 775 1048 Q 729 1059 684 1048 Z','#6179ac',null,0),
  ellipse('CoffeeSurface',729,991,47,10,'#6c4937','#211512',5),
  {...group('CoffeeGripHand',[794,1081],[
   shape('CoffeeGripWrist','M 782 1098 L 785 1073 L 813 1070 L 829 1095 L 809 1103 Z','#f9bd8c','#211512',5),
   shape('CoffeeGripPalm','M 813 1058 Q 817 1037 803 1029 Q 794 1025 786 1035 L 773 1051 Q 767 1061 776 1068 Q 769 1078 780 1086 Q 798 1094 815 1080 Z','#f9bd8c','#211512',6),
   shape('CoffeeGripFingers','M 783 1050 Q 791 1056 800 1057 M 779 1066 Q 788 1072 799 1073',null,'#211512',5),
  ]),opacity:0},
 ]),opacity:0},
];

const coffeeSleeve=JSON.parse(fs.readFileSync(path.join(root,'assets/coffee-sleeve.json'),'utf8'));
const coffeeAssets=createCoffeeRig({shape,group,tracedPart,coffeeSleeve});
const scene=previousScene.filter(el=>el.name!=='CoffeeCupGrip');
scene.unshift(coffeeAssets.underlay);
scene.splice(scene.findIndex(el=>el.name==='CoffeeKeyboardSupport'),0,coffeeAssets.cleanup,coffeeAssets.table);
scene.push(coffeeAssets.rig);
scene.push(coffeeAssets.desktop);

// Parse an intentionally small absolute SVG command subset and preserve exact cubics.
function contours(d) {
 const t=d.match(/[MLCQZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi); let i=0, cmd, lists=[], list, p;
 const pt=()=>({x:+t[i++],y:+t[i++]});
 while(i<t.length){
  if(/[MLCQZ]/i.test(t[i]))cmd=t[i++].toUpperCase();
  if(cmd==='M'){p=pt();list={v:[{...p}],closed:false};lists.push(list);cmd='L';}
  else if(cmd==='L'){p=pt();list.v.push({...p});}
  else if(cmd==='C'){const c1=pt(),c2=pt(),end=pt();list.v.at(-1).out=c1;list.v.push({...end,in:c2});p=end;}
  else if(cmd==='Q'){const q=pt(),end=pt();list.v.at(-1).out={x:p.x+2/3*(q.x-p.x),y:p.y+2/3*(q.y-p.y)};list.v.push({...end,in:{x:end.x+2/3*(q.x-end.x),y:end.y+2/3*(q.y-end.y)}});p=end;}
  else if(cmd==='Z'){list.closed=true;if(list.v.length>1){const a=list.v[0],b=list.v.at(-1);if(a.x===b.x&&a.y===b.y){a.in=b.in;list.v.pop();}}cmd=null;}
  else throw Error(`Unsupported SVG command at ${i}`);
 }return lists;
}
const num=n=>Math.round(n*100000)/100000;
const clockwise=c=>c.v.reduce((area,v,i)=>{const w=c.v[(i+1)%c.v.length];return area+v.x*w.y-w.x*v.y;},0)>0;
// Some native GPU backends produce wedges on tightly fitted detached cubics.
// Keep the editable SVG cubics; emit equivalent vector polylines within 0.22 px
// for the cross-renderer Rive asset. This remains real vector geometry, not a bitmap.
function flattened(c){
 const points=[{x:c.v[0].x,y:c.v[0].y}];
 const mid=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
 const distance=(p,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y;const len=Math.hypot(dx,dy);return len?Math.abs(dy*p.x-dx*p.y+b.x*a.y-b.y*a.x)/len:Math.hypot(p.x-a.x,p.y-a.y);};
 function curve(a,b,d,e,depth=0){
  if(depth>12||Math.max(distance(b,a,e),distance(d,a,e))<.22){points.push({x:e.x,y:e.y});return;}
  const ab=mid(a,b),bd=mid(b,d),de=mid(d,e),abd=mid(ab,bd),bde=mid(bd,de),center=mid(abd,bde);
  curve(a,ab,abd,center,depth+1);curve(center,bde,de,e,depth+1);
 }
 const count=c.closed?c.v.length:c.v.length-1;
 for(let i=0;i<count;i++){const a=c.v[i],e=c.v[(i+1)%c.v.length];curve(a,a.out??a,e.in??e,e);}
 if(c.closed)points.pop();
 return points;
}
// Morphable vertices are named <shape>_v<i> (first contour) or <shape>_c<k>_v<i>.
const vname=(morph,ci,i)=>`${morph}${ci?'_c'+ci:''}_v${i}`;
// skin: {tendons:[{bone,x,y,angle}], weight:(x,y)=>[[tendon,share],...]} binds vertices to bones
// (Rive skinning; tendon indices are 0-based here, shares sum to 1, identity = tendon -1).
function vertices(c,morph,ci=0,skin){return flattened(c).map((v,i)=>`<StraightVertex ${morph?`name="${vname(morph,ci,i)}" id="${id(vname(morph,ci,i))}" `:''}x="${num(v.x)}" y="${num(v.y)}"${skin?`>${weightXml(skin.weight(v.x,v.y))}</StraightVertex>`:'/>'}`).join('')+(skin?skinXml(skin):'');}
function weightXml(list){
 const top=list.filter(([,w])=>w>.004).sort((a,b)=>b[1]-a[1]).slice(0,4),sum=top.reduce((a,[,w])=>a+w,0);
 const bytes=top.map(([t,w])=>[t+1,Math.round(w/sum*255)]);if(!bytes.length)bytes.push([0,255]);bytes[0][1]+=255-bytes.reduce((a,[,v])=>a+v,0);
 return `<Weight values="${bytes.reduce((a,[,v],i)=>a+v*2**(8*i),0)}" indices="${bytes.reduce((a,[t],i)=>a+t*2**(8*i),0)}"/>`;
}
const skinXml=skin=>`<Skin>${skin.tendons.map(t=>`<Tendon boneId="${id(t.bone)}" xx="${num(Math.cos(t.angle))}" xy="${num(Math.sin(t.angle))}" yx="${num(-Math.sin(t.angle))}" yy="${num(Math.cos(t.angle))}" tx="${num(t.x)}" ty="${num(t.y)}"/>`).join('')}</Skin>`;
// Path-local vertices of a morphable shape (single contour) as emitted to Rive, for keying them.
const morphVertices=el=>contours(el.d).map(c=>flattened(c).map(({x,y})=>({x,y})));
// clip: a mask name or a list of names (all of them apply).
const clips=c=>[c??[]].flat().map(n=>`<ClippingShape sourceId="${id(n)}"/>`).join('');
const paint=(tag,color,extra='')=>`<${tag} ${extra}><SolidColor colorValue="FF${color.slice(1)}"/></${tag}>`;
function rml(el){
 // A bone chain: [{name,length,angle}], the first one a RootBone at `at`; angles are world angles.
 if(el.kind==='bones'){
  const open=el.chain.map((b,i)=>{const rel=i?b.angle-el.chain[i-1].angle:b.angle;return i?`<Bone name="${b.name}" id="${id(b.name)}" length="${num(b.length)}" rotation="${num(rel)}">`:`<RootBone name="${b.name}" id="${id(b.name)}" x="${el.at[0]}" y="${el.at[1]}" length="${num(b.length)}" rotation="${num(rel)}">`;});
  return open.join('')+el.chain.map((_,i)=>i?'</Bone>':'</RootBone>').reverse().join('');
 }
 if(el.kind==='mask'){
  return `<Shape name="${el.name}" id="${id(el.name)}">${el.paths.map(p=>contours(p.d).map(c=>`<PointsPath isClosed="true" isClockwise="${clockwise(c)}" name="MaskPath">${vertices(offsetContour(c,p.x,p.y),null,0,el.skin)}</PointsPath>`).join('')).join('')}<Fill fillRule="evenOdd"><SolidColor colorValue="${el.fill?'FF'+el.fill.slice(1):'00000000'}"/></Fill></Shape>`;
 }
 if(el.kind==='group'){
  const [x,y]=el.pivot,tag=el.bone?'RootBone':'Node';
  return `<${tag} name="${esc(el.name)}" id="${id(el.name)}" x="${x}" y="${y}" ${['opacity','rotation','scaleX','scaleY'].filter(p=>el[p]!==undefined).map(p=>`${p}="${el[p]}"`).join(' ')} ${el.bone?'length="120"':''}><Node x="${-x}" y="${-y}" name="Artwork">${el.children.toReversed().map(rml).join('')}</Node>${clips(el.clip)}</${tag}>`;
 }
 const geometry=contours(el.rive_d??el.d).map(c=>{if(el.rive_d&&!clockwise(c))c.v.reverse();return c;});
 return `<Shape name="${esc(el.name)}" id="${id(el.name)}" x="${el.x??0}" y="${el.y??0}">${geometry.map((c,ci)=>`<PointsPath isClosed="${c.closed}" isClockwise="${clockwise(c)}" name="Path">${vertices(c,el.morph&&el.name,ci,el.skin)}</PointsPath>`).join('')}${el.fill?paint('Fill',el.fill,el.evenOdd&&!el.rive_d?'fillRule="evenOdd"':'fillRule="nonZero"'):''}${el.stroke?paint('Stroke',el.stroke,`thickness="${el.width}" cap="round" join="round"`):''}${clips(el.clip)}</Shape>`;
}
function offsetContour(c,x,y){return {...c,v:c.v.map(v=>({...v,x:v.x+x,y:v.y+y,...(v.in?{in:{x:v.in.x+x,y:v.in.y+y}}:{}),...(v.out?{out:{x:v.out.x+x,y:v.out.y+y}}:{})}))};}
function svg(el){
 if(el.kind==='mask')return el.fill?`<g id="${el.name}">${el.paths.map(p=>`<path d="${p.d}" transform="translate(${p.x},${p.y})" fill="${el.fill}" fill-rule="evenodd"/>`).join('')}</g>`:'';
 if(el.kind==='group')return `<g id="${el.name}" data-pivot="${el.pivot}" opacity="${el.opacity??1}">${el.children.map(svg).join('')}</g>`;
 const p=`<path id="${el.name}" d="${el.d}" transform="translate(${el.x??0},${el.y??0})" fill="${el.fill??'none'}" fill-rule="${el.evenOdd?'evenodd':'nonzero'}" stroke="${el.stroke??'none'}" stroke-width="${el.width}" stroke-linecap="round" stroke-linejoin="round"/>`;
 return el.clip?`<g clip-path="url(#clip-${el.clip})">${p}</g>`:p;
}
const art=scene.toReversed().map(rml).join('\n');
const key=(name,prop,frames)=>`<KeyedObject objectId="${id(name)}"><KeyedProperty property="${prop}">${frames.map(([frame,value])=>`<KeyFrameDouble frame="${frame}" value="${num(value)}" interpolationType="linear"/>`).join('')}</KeyedProperty></KeyedObject>`;
const waves=(base,amp,duration,period)=>Array.from({length:duration/10+1},(_,i)=>[i*10,base+amp*Math.sin(i*10/period*Math.PI*2)]);
const breath=[key('Body','y',waves(1125,.7,480,240)),key('Body','scaleY',waves(1,.0012,480,240)),key('Head','rotation',waves(0,.0025,480,480))];
// Blink closes the complete eye assembly around its visual centre, including pupil and liner.
const blinkFrames=[[0,1],[132,1],[138,.04],[144,1],[310,1],[316,.04],[322,1],[333,1],[339,.04],[345,1],[480,1]];
const blink=['EyeNear','EyeFar'].map(n=>key(n,'scaleY',blinkFrames));
const pupilX=[traced.eyes.EyeNear.center[0],traced.eyes.EyeFar.center[0]];
const gaze=['PupilNear','PupilFar'].map((n,i)=>key(n,'x',[[0,pupilX[i]],[70,pupilX[i]],[92,pupilX[i]-5],[220,pupilX[i]-5],[245,pupilX[i]],[480,pupilX[i]]]));
const typing=['HandNear','ArmFar'].map(n=>key(n,'rotation',[[0,0],[30,0],[36,-.0025],[42,0],[48,-.0015],[54,0],[65,-.002],[71,0],[80,-.0015],[86,0],[115,0],[121,-.0025],[127,0],[138,-.0015],[144,0],[150,-.002],[156,0],[480,0]]));
const mouthShape=tracedPart('Head','HeadMask').find(p=>p.name==='Head_Mouth_55');
// Reaction clips use their own id ranges: animations 0:5000+, machines 0:6000+ (generated names start at 0:100).
const reactionClips=reactions({key,traced,waves,browCenters,mouth:{name:mouthShape.name,vertices:morphVertices(mouthShape)[0]}});
// Typing: the traced fingertips bend in turns (near index/middle, far index).
const handContours={near:nearHandParts().map(p=>({name:p.name,contours:morphVertices(p)})),far:farHandParts().filter(p=>p.morph).map(p=>({name:p.name,contours:morphVertices(p)}))};
const typingLoop=fingerBend(key,120,{NearIndex:[4,40,72,100],NearMiddle:[20,54,86],NearRing:[29,63,94],FarIndex:[12,46,78,109]},handContours,vname);
const coffeeKeys=coffeeTimeline(key);
fs.writeFileSync(path.join(root,'assets/coffee-motion.json'),JSON.stringify(coffeeInfo,null,2));
function animation(name,duration,keys,loop=true,animId){return `<LinearAnimation name="${name}" id="${animId}" fps="60" duration="${duration}" loopValue="${loop?'loop':'oneShot'}">${keys.join('')}</LinearAnimation>`;}
const demoMachine=(name,machineId,layerId,stateId,animationId)=>`<StateMachine name="${name}" id="0:${machineId}"><StateMachineLayer name="Playback" id="0:${layerId}"><AnyState x="200" y="-150"/><ExitState x="400" y="-150"/><EntryState x="0" y="0"><StateTransition stateToId="0:${stateId}"/></EntryState><AnimationState id="0:${stateId}" x="220" y="0" animationId="0:${animationId}"/></StateMachineLayer></StateMachine>`;
// Preview machines play a looping copy of a one-shot clip (<Clip>_Preview): a state that
// transitions to itself does not restart in the runtime.
const rmlText=`<Rive version="1" kind="fragment">
<Artboard name="OfficeCharacter" id="0:1" width="1280" height="1280" styleId="0:2" defaultStateMachineId="0:3">
<LayoutComponentStyle name="Artboard Style" id="0:2"/>
${art}
<StateMachine name="Character" id="0:3"><StateMachineLayer name="Base" id="0:4"><AnyState x="200" y="-150"/><ExitState x="400" y="-150"/><EntryState x="0" y="0"><StateTransition stateToId="0:5"/></EntryState><AnimationState id="0:5" x="220" y="0" animationId="0:10"/></StateMachineLayer></StateMachine>
${demoMachine('BlinkDemo',20,21,22,11)}
${demoMachine('LookDemo',24,25,26,12)}
${demoMachine('TypingDemo',28,29,30,13)}
${demoMachine('CoffeeDemo',34,35,36,14)}
${reactionClips.map((c,i)=>demoMachine(c.name+'Demo',6000+i*8,6001+i*8,6002+i*8,5000+i)+(c.loop?'':demoMachine(c.name+'Preview',6004+i*8,6005+i*8,6006+i*8,5500+i))).join('\n')}
${demoMachine('CoffeePreview',40,41,42,90)}
${animation('Idle_Work',480,[...breath,...blink,...gaze,...typing],true,'0:10')}
${animation('Blink',60,['EyeNear','EyeFar'].map(n=>key(n,'scaleY',[[0,1],[20,1],[26,.04],[32,1],[60,1]])),false,'0:11')}
${animation('Look_At_Viewer',180,['PupilNear','PupilFar'].map((n,i)=>key(n,'x',[[0,pupilX[i]-5],[30,pupilX[i]-5],[55,pupilX[i]],[130,pupilX[i]],[160,pupilX[i]-5],[180,pupilX[i]-5]])),false,'0:12')}
${animation('Typing_Loop',120,typingLoop,true,'0:13')}
${animation('Coffee_Sip',420,coffeeKeys,false,'0:14')}
${animation('Coffee_Sip_Preview',420,coffeeKeys,true,'0:90')}
${reactionClips.map((c,i)=>animation(c.name,c.duration,c.keys,c.loop,'0:'+(5000+i))+(c.loop?'':animation(c.name+'_Preview',c.duration,c.keys,true,'0:'+(5500+i)))).join('\n')}
</Artboard></Rive>`;
for(const dir of ['rive','assets','public/assets','public/rive'])fs.mkdirSync(path.join(root,dir),{recursive:true});
const coffeeArtboard=rmlText.match(/<Artboard[\s\S]*?<\/Artboard>/)[0]
 .replaceAll('0:','1:').replace('name="OfficeCharacter"','x="1400" name="CoffeeCharacter"')
 .replace('width="1280" height="1280"','width="1440" height="1280"')
 .replace('defaultStateMachineId="1:3"','defaultStateMachineId="1:34"');
// CoffeeKeys: the coffee sip built from the user's key drawings (scripts/coffee-keys.mjs).
const coffeePoses=JSON.parse(fs.readFileSync(path.join(root,'assets/coffee-poses.json'),'utf8'));
const keysArt=coffeeKeysArt({shape,group,poses:coffeePoses}).toReversed().map(rml).join('\n');
const keysArtboard=`<Artboard name="CoffeeKeys" id="0:7000" x="3000" width="1280" height="1280" styleId="0:7001" defaultStateMachineId="0:7010">
<LayoutComponentStyle name="Artboard Style" id="0:7001"/>
${keysArt}
${demoMachine('CoffeeKeysDemo',7010,7011,7012,7020)}
${demoMachine('CoffeeKeysPreview',7014,7015,7016,7021)}
${animation('Coffee_Keys',coffeeKeysDuration,coffeeKeysTimeline(key,coffeePoses),false,'0:7020')}
${animation('Coffee_Keys_Preview',coffeeKeysDuration,coffeeKeysTimeline(key,coffeePoses),true,'0:7021')}
</Artboard>`.replaceAll('0:','2:');
fs.writeFileSync(path.join(root,'rive/scene.rml'),rmlText.replace('</Rive>',coffeeArtboard+'\n'+keysArtboard+'\n</Rive>'));
fs.writeFileSync(path.join(root,'rive/rive.yaml'),'name: office-character\nmain: OfficeCharacter\nlogs:\n  file: build/office-character.log\n  problems: build/problems.log\n');
const allMasks={...traced.masks,...coffeeAssets.masks,...headSplitMasks,...Object.fromEntries(Object.entries(traced.eyes).map(([name,e])=>[name+'_Sclera',e.sclera]))};
const definitions=Object.entries(allMasks).map(([name,paths])=>`<clipPath id="clip-${name}" clipPathUnits="userSpaceOnUse">${paths.map(p=>`<path d="${p.d}" transform="translate(${p.x},${p.y})" clip-rule="evenodd"/>`).join('')}</clipPath>`).join('');
fs.writeFileSync(path.join(root,'assets/character-layered.svg'),`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="1280" viewBox="0 0 1280 1280"><title>Office character v2 — traced from approved reference</title><defs>${definitions}</defs>${scene.map(svg).join('')}</svg>`);
fs.copyFileSync(path.join(root,'assets/character-layered.svg'),path.join(root,'public/assets/character-layered.svg'));
function posedSvg(el,pose){
 if(el.kind!=='group')return svg(el);
 const value=pose[el.name]??{},[px,py]=el.pivot;
 return `<g id="${el.name}" opacity="${value.opacity??el.opacity??1}" transform="translate(${value.x??px},${value.y??py}) rotate(${(value.rotation??el.rotation??0)*180/Math.PI}) scale(${value.scaleX??el.scaleX??1},${value.scaleY??el.scaleY??1}) translate(${-px},${-py})">${el.children.map(c=>posedSvg(c,pose)).join('')}</g>`;
}
const posed=frame=>`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1280" viewBox="0 0 1440 1280"><defs>${definitions}</defs>${scene.map(el=>posedSvg(el,coffeePose(frame))).join('')}</svg>`;
for(const frame of coffeeInfo.poseSnapshots)fs.writeFileSync(path.join(root,`assets/coffee-pose-${frame}.svg`),posed(frame));
// COFFEE_DEBUG_DIR=dir COFFEE_DEBUG_FRAMES=0,10,20 writes extra frames for review.
if(process.env.COFFEE_DEBUG_DIR)for(const frame of (process.env.COFFEE_DEBUG_FRAMES??'').split(',').filter(Boolean).map(Number))fs.writeFileSync(path.join(process.env.COFFEE_DEBUG_DIR,`coffee-${String(frame).padStart(3,'0')}.svg`),posed(frame));
fs.writeFileSync(path.join(root,'assets/rig-map.json'),JSON.stringify({version:4,artboards:{OfficeCharacter:[1280,1280],CoffeeCharacter:[1440,1280]},artboard:[1280,1280],source:'reference-approved.png',keyboardHandsSource,method:traced.method,ids,pupilCenters:{near:traced.eyes.EyeNear.center,far:traced.eyes.EyeFar.center},bones:['Body','Head','ArmFar','ArmUpperNear','ArmNear','HandNear','CoffeeUpper','CoffeeForearm','CoffeeWrist'],note:'Reference-traced vector parts. Coffee_Sip uses baked two-link IK for shoulder and elbow; no runtime scripts or mesh deformation.'},null,2));
console.log('Generated layered SVG and Rive source.');



