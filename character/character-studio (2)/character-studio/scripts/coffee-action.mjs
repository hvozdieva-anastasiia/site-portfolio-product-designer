// Coffee iteration 3. The rest pose reuses the traced reference arm (sleeve, forearm
// with watch, typing hand) inside a nested rig, so frame 0 matches the approved image.
// Poses are authored as elbow / wrist / mug positions and baked to bone keys.
import {positioned,mugParts,gripParts,openParts,GRIP_WRIST,ink,skin,cream} from './coffee-art.mjs';

const S=[1162,700], E=[1150,1078], W=[782,1068];
const A=Math.hypot(E[0]-S[0],E[1]-S[1]), B=Math.hypot(W[0]-E[0],W[1]-E[1]);
const a0=Math.atan2(E[1]-S[1],E[0]-S[0]), b0=Math.atan2(W[1]-E[1],W[0]-E[0]);
// Mug foot on the wide table, in front of the resting wrist.
const DESK=[800,1141];
const duration=420;

const rot=(p,a)=>[p[0]*Math.cos(a)-p[1]*Math.sin(a),p[0]*Math.sin(a)+p[1]*Math.cos(a)];
// While the mug is held, the wrist is derived from the mug pose so the grip never slides.
const held=(m,tilt)=>{const g=rot(GRIP_WRIST,tilt);return {wrist:[m[0]+g[0],m[1]+g[1]],hand:tilt};};
const free=(wrist,hand)=>({wrist,hand});
const GRIP_ELBOW=[1244,1072];
// hold: zero velocity at this key (contact, sip, release); other keys are passed through.
const poses=[
 {f:0,  elbow:E,            ...free(W,0),hold:true},
 {f:18, elbow:[1158,1080],  ...free([792,1048],-.04)},
 {f:34, elbow:[1192,1078],  ...free([850,985],.08)},
 {f:52, elbow:[1228,1076],  ...free([948,968],-.06)},
 {f:66, elbow:[1242,1073],  ...free([976,1066],-.02)},
 {f:72, elbow:GRIP_ELBOW,   ...held(DESK,0),hold:true},
 {f:92, elbow:GRIP_ELBOW,   ...held(DESK,0),hold:true},
 {f:110,elbow:[1200,1010],  ...held([808,1060],-.03)},
 {f:140,elbow:[1120,900],   ...held([830,720],-.08)},
 {f:162,elbow:[1100,875],   ...held([862,612],-.12),hold:true},
 {f:184,elbow:[1095,862],   ...held([866,603],-.22)},
 {f:214,elbow:[1095,860],   ...held([866,603],-.25),hold:true},
 {f:236,elbow:[1105,880],   ...held([858,625],-.06)},
 {f:268,elbow:[1175,985],   ...held([812,950],-.02)},
 {f:300,elbow:GRIP_ELBOW,   ...held(DESK,0),hold:true},
 {f:312,elbow:GRIP_ELBOW,   ...held(DESK,0),hold:true},
 {f:330,elbow:[1228,1076],  ...free([958,985],-.04)},
 {f:352,elbow:[1188,1078],  ...free([850,995],.06)},
 {f:372,elbow:[1158,1080],  ...free([794,1050],-.03)},
 {f:390,elbow:E,            ...free(W,0),hold:true},
 {f:420,elbow:E,            ...free(W,0),hold:true},
];

// Cubic Hermite through the poses; tangents follow neighbours unless the key holds.
function track(get){
 const n=poses.length,v=poses.map(get),dims=v[0].length;
 const m=poses.map((p,i)=>p.hold||i===0||i===n-1?Array(dims).fill(0):v[i].map((_,d)=>(v[i+1][d]-v[i-1][d])/(poses[i+1].f-poses[i-1].f)));
 return f=>{
  let i=poses.findIndex((p,k)=>k<n-1&&f<=poses[k+1].f);if(i<0)return v.at(-1);
  const p=poses[i],q=poses[i+1],h=q.f-p.f,t=(f-p.f)/h,t2=t*t,t3=t2*t;
  return v[i].map((a,d)=>(2*t3-3*t2+1)*a+(t3-2*t2+t)*h*m[i][d]+(-2*t3+3*t2)*v[i+1][d]+(t3-t2)*h*m[i+1][d]);
 };
}
const elbowAt=track(p=>p.elbow),wristAt=track(p=>p.wrist),handAt=track(p=>[p.hand]);
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
function solve(f){
 const elbow=elbowAt(f),wrist=wristAt(f),handWorld=handAt(f)[0];
 const upperLen=Math.hypot(elbow[0]-S[0],elbow[1]-S[1]),foreLen=Math.hypot(wrist[0]-elbow[0],wrist[1]-elbow[1]);
 const upper=wrap(Math.atan2(elbow[1]-S[1],elbow[0]-S[0])-a0),sleeve=upperLen/A;
 const fore=wrap(Math.atan2(wrist[1]-elbow[1],wrist[0]-elbow[0])-b0-upper),projection=foreLen/B;
 return {elbow,wrist,upper,sleeve,fore,projection,
  localElbow:[S[0]+(E[0]-S[0])*sleeve,S[1]+(E[1]-S[1])*sleeve],
  localWrist:[E[0]+(W[0]-E[0])*projection,E[1]+(W[1]-E[1])*projection],
  hand:wrap(handWorld-upper-fore)};
}
const frames=Array.from({length:duration/2+1},(_,i)=>i*2);
export const coffeeInfo={duration:duration/60,fps:60,shoulder:S,restElbow:E,restWrist:W,mugFoot:DESK,upperLength:A,forearmLength:B,
 method:'Authored elbow, wrist and mug poses; Hermite interpolation; baked per two frames. Sleeve and forearm foreshorten along their axes.',
 poseSnapshots:[0,52,72,140,200,268,330,420],
 poses:poses.map(p=>({frame:p.f,elbow:p.elbow,wrist:p.wrist,hand:p.hand,hold:!!p.hold})),
 frames:frames.map(frame=>({frame,...solve(frame)}))};

// A group whose contents scale along the bone axis only (foreshortening).
function axisScaled(group,name,pivot,angle,children){
 const inner={...group(name+'Unrotate',pivot,children),rotation:-angle};
 const shorten={...group(name+'Shorten',pivot,[inner]),scaleX:1};
 return {...group(name+'Axis',pivot,[shorten]),rotation:angle};
}
const plaid={light:'#5670a2',mid:'#6179ac',navy:'#2b4373',cream:'#f4ede0',shirt:'#1f1311'};
export function createCoffeeRig({shape,group,tracedPart,coffeeSleeve}){
 const art=(prefix,parts,origin)=>parts.map(([n,d,fill,stroke,width])=>shape(prefix+n,positioned(d,origin),fill,stroke,width));
 const sleeveArt=prefix=>[
  shape(prefix+'Base',coffeeSleeve.outline,plaid.mid,null,0),
  ...coffeeSleeve.parts.map(p=>({...shape(prefix+'Plaid_'+p.index,p.d,p.fill,null,0),evenOdd:true})),
  shape(prefix+'Outline',coffeeSleeve.outline,null,ink,8),
 ];
 const mugOrigin=[W[0]-GRIP_WRIST[0],W[1]-GRIP_WRIST[1]];
 const typing=group('CoffeeTypingHand',W,tracedPart('CoffeeTypingHand','HandNearMask'));
 const open={...group('CoffeeOpenHand',W,art('CoffeeOpen_',openParts,W)),opacity:0};
 const grip={...group('CoffeeHeldCup',W,[...art('HeldMug_',mugParts,mugOrigin),...art('CoffeeGrip_',gripParts,mugOrigin)]),opacity:0};
 const handBone=group('CoffeeWrist',W,[typing,open,grip],true);
 // The traced forearm has the sleeve edge baked in, which would show once the arm
 // leaves the sleeve. Its skin is redrawn along the traced edges with a rounded elbow;
 // the traced watch stays on top.
 const foreTrace=tracedPart('CoffeeForearm','ArmNearMask').filter(p=>!p.name.endsWith('_10'));
 const foreEdge='M 830 1031 C 880 1030 930 1029 960 1025 C 990 1021 1010 1015 1040 1014 C 1080 1013 1120 1016 1150 1030 C 1188 1046 1200 1086 1186 1110 C 1176 1126 1160 1131 1130 1131 L 1020 1131 C 960 1130 900 1127 830 1124';
 const foreSkin=[shape('CoffeeForearmSkin',foreEdge+' Z',skin,null,0),shape('CoffeeForearmEdge',foreEdge,null,ink,8)];
 const forearm=group('CoffeeForearm',E,[handBone,axisScaled(group,'CoffeeFore',E,b0,[...foreTrace.filter(p=>!/_(47|57)$/.test(p.name)),...foreSkin,...foreTrace.filter(p=>/_(47|57)$/.test(p.name))])],true);
 // Back sleeve, forearm, front sleeve: the front copy hides the forearm root at the
 // desk (as in the reference) and fades out while the forearm rises in front of it.
 const sleeveFront={...axisScaled(group,'CoffeeSleeveFront',S,a0,sleeveArt('CoffeeSleeveFront')),opacity:1};
 const upperBone=group('CoffeeUpper',S,[axisScaled(group,'CoffeeSleeve',S,a0,sleeveArt('CoffeeSleeve')),forearm,sleeveFront],true);
 const rig={...group('CoffeeArmRig',[0,0],[upperBone]),opacity:0};

 // Behind the whole character: the torso that the arm covers in the reference.
 // It only shows through where the moving arm uncovers it.
 const shoulderClip={kind:'mask',name:'CoffeeShoulderClip',paths:[{d:'M 1000 560 L 1320 560 L 1320 842 Q 1180 870 1040 850 Z',x:0,y:0}],fill:null};
 const underlay={...group('CoffeeTorsoFill',[0,0],[
  shape('CoffeeLowShirt','M 560 940 L 912 940 L 912 1150 L 560 1150 Z',plaid.shirt,null,0),
  // One plaid repeat continues the visible panels: light base, a cream row and a navy column.
  shape('CoffeeSidePlaid','M 905 740 L 1150 700 C 1205 760 1236 830 1238 900 C 1240 980 1222 1060 1200 1150 L 905 1150 Z',plaid.light,null,0),
  shape('CoffeeSideCreamRow','M 912 1030 L 1228 1026 L 1214 1081 L 912 1085 Z',plaid.cream,null,0),
  shape('CoffeeSideCreamRowHigh','M 1022 880 L 1238 870 L 1238 930 L 1022 942 Z',plaid.cream,null,0),
  shape('CoffeeSideNavyColumn','M 1092 740 L 1146 740 L 1146 1150 L 1092 1150 Z',plaid.navy,null,0),
  shape('CoffeeSideCrossLow','M 1092 1028 L 1146 1028 L 1146 1083 L 1092 1084 Z',plaid.light,null,0),
  shape('CoffeeSideCrossHigh','M 1092 878 L 1146 875 L 1146 935 L 1092 938 Z',plaid.light,null,0),
  shape('CoffeePlacket','M 986 940 L 1022 940 L 1022 1150 L 986 1150 Z',cream,null,0),
  shape('CoffeePlacketLines','M 986 940 L 986 1150 M 1022 940 L 1022 1150 M 909 940 L 909 1150',null,ink,6),
  shape('CoffeeSideEdge','M 1238 840 C 1242 930 1228 1040 1200 1150',null,ink,8),
  shoulderClip,
  ...sleeveArt('CoffeeShoulderCap').map(p=>({...p,clip:'CoffeeShoulderClip'})),
 ]),opacity:0};
 const table={...group('CoffeeWideTable',[0,0],[shape('CoffeeTableTop','M 89 1121 L 499 1151 Q 510 1153 526 1152 L 1392 1128 Q 1414 1127 1415 1151 Q 1416 1170 1393 1171 L 518 1194 Q 511 1194 497 1192 L 88 1160 Q 67 1158 67 1141 Q 67 1120 89 1121 Z','#d7a77e',ink,8)]),opacity:0};
 const desktop={...group('CoffeeDesktopCup',DESK,art('DeskMug_',mugParts,DESK)),opacity:0};
 // The fixed desk layer carries a sliver of the resting forearm; repaint it with the shirt behind.
 const cleanup={...group('CoffeeBodyCleanup',[0,0],[
  shape('CoveredArmSliverLeft','M 926 1104 L 986 1104 L 986 1123 L 926 1124 Z',plaid.light,null,0),
  shape('CoveredArmSliverPlacket','M 986 1104 L 1022 1104 L 1022 1123 L 986 1123 Z',cream,null,0),
  shape('CoveredArmSliverRight','M 1022 1104 L 1046 1104 L 1046 1122 L 1022 1123 Z',plaid.light,null,0),
  shape('CoveredArmSliverLines','M 986 1104 L 986 1122 M 1022 1104 L 1022 1122',null,ink,6),
 ]),opacity:0};
 return {rig,table,desktop,cleanup,underlay,masks:{CoffeeShoulderClip:shoulderClip.paths}};
}

const step=(on,off)=>[[0,0],[on-1,0],[on,1],[off-1,1],[off,0],[duration,0]];
const visible={
 CoffeeTypingHand:[[0,1],[33,1],[34,0],[371,0],[372,1],[duration,1]],
 CoffeeOpenHand:[[0,0],[33,0],[34,1],[71,1],[72,0],[312,0],[313,1],[371,1],[372,0],[duration,0]],
 CoffeeHeldCup:step(72,313),
 CoffeeDesktopCup:[[0,1],[71,1],[72,0],[312,0],[313,1],[duration,1]],
 // The forearm passes in front of the sleeve while the mug is up.
 CoffeeSleeveFrontAxis:[[0,1],[98,1],[104,0],[286,0],[292,1],[duration,1]],
 ClosedEyes:[[0,0],[171,0],[172,1],[211,1],[212,0],[duration,0]],
 EyeNear:[[0,1],[171,1],[172,0],[211,0],[212,1],[duration,1]],
 EyeFar:[[0,1],[171,1],[172,0],[211,0],[212,1],[duration,1]],
};
const eyeSquash=[[0,1],[166,1],[172,.12],[212,.12],[218,1],[duration,1]];
const at=(f,keys)=>{for(let i=1;i<keys.length;i++){const [f0,v0]=keys[i-1],[f1,v1]=keys[i];if(f<=f1)return v0+(v1-v0)*Math.max(0,(f-f0)/(f1-f0));}return keys.at(-1)[1];};
const always=v=>[[0,v],[duration,v]];
export function coffeeTimeline(key){return [
 key('ArmUpperNear','opacity',always(0)),key('WristOverlapSupport','opacity',always(0)),
 key('CoffeeArmRig','opacity',always(1)),key('CoffeeTorsoSupport','opacity',always(0)),
 key('CoffeeTorsoFill','opacity',always(1)),
 key('CoffeeBodyCleanup','opacity',always(1)),key('CoffeeWideTable','opacity',always(1)),
 key('CoffeeKeyboardSupport','opacity',always(1)),
 ...Object.entries(visible).map(([name,keys])=>key(name,'opacity',keys)),
 key('CoffeeUpper','rotation',frames.map(f=>[f,solve(f).upper])),
 ...['CoffeeSleeveShorten','CoffeeSleeveFrontShorten'].map(n=>key(n,'scaleX',frames.map(f=>[f,solve(f).sleeve]))),
 key('CoffeeForearm','x',frames.map(f=>[f,solve(f).localElbow[0]])),key('CoffeeForearm','y',frames.map(f=>[f,solve(f).localElbow[1]])),
 key('CoffeeForearm','rotation',frames.map(f=>[f,solve(f).fore])),
 key('CoffeeForeShorten','scaleX',frames.map(f=>[f,solve(f).projection])),
 key('CoffeeWrist','x',frames.map(f=>[f,solve(f).localWrist[0]])),key('CoffeeWrist','y',frames.map(f=>[f,solve(f).localWrist[1]])),
 key('CoffeeWrist','rotation',frames.map(f=>[f,solve(f).hand])),
 ...['EyeNear','EyeFar'].map(n=>key(n,'scaleY',eyeSquash)),
]}
export function coffeePose(f){const p=solve(f);return {
 ArmUpperNear:{opacity:0},WristOverlapSupport:{opacity:0},CoffeeArmRig:{opacity:1},CoffeeTorsoSupport:{opacity:0},CoffeeTorsoFill:{opacity:1},
 CoffeeWideTable:{opacity:1},CoffeeBodyCleanup:{opacity:1},CoffeeKeyboardSupport:{opacity:1},
 ...Object.fromEntries(Object.entries(visible).map(([name,keys])=>[name,{opacity:at(f,keys)}])),
 CoffeeUpper:{rotation:p.upper},CoffeeSleeveShorten:{scaleX:p.sleeve},CoffeeSleeveFrontShorten:{scaleX:p.sleeve},
 CoffeeForearm:{rotation:p.fore,x:p.localElbow[0],y:p.localElbow[1]},CoffeeForeShorten:{scaleX:p.projection},
 CoffeeWrist:{rotation:p.hand,x:p.localWrist[0],y:p.localWrist[1]},
 EyeNear:{opacity:at(f,visible.EyeNear),scaleY:at(f,eyeSquash)},EyeFar:{opacity:at(f,visible.EyeFar),scaleY:at(f,eyeSquash)},
 };}
