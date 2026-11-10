// Typing on the traced hands: the drawing is kept, its fingertips bend.
// Every vertex of a hand contour moves by Σ w·amount(f)·lift, where w is a Gaussian of the
// distance to a fingertip (σ = 20 px), so the tip lifts and the knuckle stays in place.
// Outline and skin contours get the same field, so creases and edges stay together.
export const tips={
 NearIndex: {hand:'near',center:[529,1097],lift:[3,-9]},
 NearMiddle:{hand:'near',center:[553,1102],lift:[3,-9]},
 NearRing:  {hand:'near',center:[590,1106],lift:[3,-8]},
 FarIndex:  {hand:'far', center:[501,1077],lift:[3,-8]},
};
const SIGMA=15;
// One tap: lift in 3 frames, strike slightly past rest, settle — 9 frames.
const tapKeys=t=>[[t,0],[t+3,1],[t+5,-.25],[t+9,0]];
const amountAt=(keys,f)=>{for(let i=1;i<keys.length;i++){const [f0,a]=keys[i-1],[f1,b]=keys[i];if(f<=f1)return f<f0?a:a+(b-a)*(f-f0)/(f1-f0);}return keys.at(-1)[1];};

// hands: {near:[{name,contours}], far:[...]}, contours = vertex lists as emitted to Rive.
// schedule: {NearIndex:[starts], ...}; taps must end before `duration`.
export function fingerBend(key,duration,schedule,hands,vname){
 const curves=Object.fromEntries(Object.entries(schedule).map(([tip,starts])=>[tip,[[0,0],...starts.flatMap(tapKeys),[duration,0]]]));
 const frames=[...new Set(Object.values(curves).flatMap(c=>c.map(([f])=>f)))].sort((a,b)=>a-b);
 const keys=[];
 for(const side of ['near','far'])for(const shape of hands[side])shape.contours.forEach((contour,ci)=>contour.forEach((p,i)=>{
  const pulls=Object.entries(curves).filter(([tip])=>tips[tip].hand===side).map(([tip,curve])=>{
   const {center,lift}=tips[tip],d2=(p.x-center[0])**2+(p.y-center[1])**2;return {w:Math.exp(-d2/(2*SIGMA*SIGMA)),lift,curve};
  }).filter(q=>q.w>.03);
  if(!pulls.length)return;
  for(const [axis,k] of [['x',0],['y',1]])keys.push(key(vname(shape.name,ci,i),axis,frames.map(f=>[f,p[axis]+pulls.reduce((s,q)=>s+q.w*amountAt(q.curve,f)*q.lift[k],0)])));
 }));
 return keys;
}
