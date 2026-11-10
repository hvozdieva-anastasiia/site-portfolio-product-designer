// Coffee sip from the user's key drawings (assets/coffee-ref, traced by trace-coffee-poses.py,
// regions from coffee-pose-regions.py).
// The body is one drawing (pose-2-lift) and never changes. Only the arm with the mug moves:
// a piece cut along skin, watch and mug of a key drawing, skinned to two bones (elbow → wrist,
// wrist → mug) so the forearm turns and foreshortens. Halfway through a move the piece of the
// next key drawing takes over in the same bone pose. Behind the lift arm the same place is shown
// from drawings where it is free (see "behind" regions).
export const KEYS=['pose-0-base','pose-1-grip','pose-2-lift','pose-3-sip'];
export const duration=420;
const POSE={desk:'pose-1-grip',chest:'pose-2-lift',mouth:'pose-3-sip'};
const NAME={desk:'Desk',chest:'Chest',mouth:'Mouth'};
// [frame, pose]: holds where the pose repeats, moves in between.
const TIMING=[[0,'desk'],[40,'desk'],[82,'chest'],[106,'chest'],[138,'mouth'],[240,'mouth'],[272,'chest'],[296,'chest'],[338,'desk'],[420,'desk']];
const ease=t=>t*t*(3-2*t);

const nums=d=>d.match(/-?\d*\.?\d+/g).map(Number);
const bboxOf=d=>{const n=nums(d),xs=n.filter((_,i)=>i%2===0),ys=n.filter((_,i)=>i%2);return [Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];};
const overlaps=(a,b)=>a[0]<=b[2]&&b[0]<=a[2]&&a[1]<=b[3]&&b[1]<=a[3];
const ang=(p,q)=>Math.atan2(q[1]-p[1],q[0]-p[0]),len=(p,q)=>Math.hypot(q[0]-p[0],q[1]-p[1]);
const chain=r=>({E:r.E,F:ang(r.E,r.W),LF:len(r.E,r.W),H:ang(r.W,r.M),LH:len(r.W,r.M)});

// Along the forearm the weight slides from the elbow bone to the hand bone; hand and mug
// follow the hand bone.
function armWeight(r){
 const seg=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy),c=Math.max(0,Math.min(1,t));return {t:c,d:Math.hypot(p[0]-a[0]-c*dx,p[1]-a[1]-c*dy)};};
 return (x,y)=>{
  const f=seg([x,y],r.E,r.W),h=seg([x,y],r.W,r.M);
  const hand=Math.max(0,Math.min(1,(f.d-h.d)/30+.5)),wH=hand+(1-hand)*ease(f.t);
  return [[0,1-wH],[1,wH]];
 };
}

export function coffeeKeysArt({shape,group,poses}){
 const R=poses.regions,bboxes=Object.fromEntries(KEYS.map(k=>[k,poses[k].map(p=>bboxOf(p.d))]));
 const cut=(prefix,key,box,clip,extra={})=>poses[key].flatMap((p,i)=>overlaps(bboxes[key][i],box)?[{...shape(`${prefix}_${i}`,p.d,p.fill,null,0),evenOdd:true,clip,...extra}]:[]);
 const mask=(name,d,extra={})=>({kind:'mask',name,paths:[{d,x:0,y:0}],fill:null,...extra});
 const out=[group('CoffeeBody',[0,0],poses[POSE.chest].map((p,i)=>({...shape(`CoffeeBody_${i}`,p.d,p.fill,null,0),evenOdd:true})))];
 const behind=Object.entries(R.behind).flatMap(([key,reg])=>[mask('CoffeeBehindClip_'+key,reg.d),...cut('CoffeeBehind_'+key,key,reg.bbox,'CoffeeBehindClip_'+key)]);
 // The emptied sleeve opening is closed with sleeve blue.
 behind.push(shape('CoffeeCuffFill',R.cuff.d,'#4F6CA3',null,0));
 out.push({...group('CoffeeBehindArm',[0,0],behind),opacity:0});
 for(const [k,key] of Object.entries(POSE)){
  const r=R[key],c=chain(r),n=NAME[k];
  out.push({kind:'bones',at:c.E,chain:[{name:`CoffeeFore${n}`,length:c.LF,angle:c.F},{name:`CoffeeHand${n}`,length:c.LH,angle:c.H}]});
  const skin={tendons:[{bone:`CoffeeFore${n}`,x:c.E[0],y:c.E[1],angle:c.F},{bone:`CoffeeHand${n}`,x:r.W[0],y:r.W[1],angle:c.H}],weight:armWeight(r)};
  out.push({...group(`CoffeeArm${n}`,[0,0],[mask(`CoffeeArmClip${n}`,r.piece.d,{skin}),...cut(`CoffeeArm${n}`,key,r.piece.bbox,`CoffeeArmClip${n}`,{skin})]),opacity:k==='desk'?1:0});
 }
 return out;
}

// Bone pose between two key drawings: elbow position, angles and lengths interpolate.
function between(a,b,u){
 const turn=(x,y)=>{let d=y-x;d=Math.atan2(Math.sin(d),Math.cos(d));return x+d*u;};
 return {E:[a.E[0]+(b.E[0]-a.E[0])*u,a.E[1]+(b.E[1]-a.E[1])*u],F:turn(a.F,b.F),LF:a.LF+(b.LF-a.LF)*u,H:turn(a.H,b.H),LH:a.LH+(b.LH-a.LH)*u};
}
// Step keys from per-sample values: switch between two samples, never fade.
function steps(samples){
 const out=[];samples.forEach(([f,v],i)=>{if(!i||v!==out.at(-1)[1]){if(i)out.push([f-1,out.at(-1)[1]]);out.push([f,v]);}});
 out.push([duration,out.at(-1)[1]]);
 return out;
}

export function coffeeKeysTimeline(key,poses){
 const R=poses.regions,C=Object.fromEntries(Object.entries(POSE).map(([k,key])=>[k,chain(R[key])]));
 const shown=[],pose=[];
 for(let f=0;f<=duration;f+=2){
  let i=TIMING.findIndex((t,j)=>j<TIMING.length-1&&f<=TIMING[j+1][0]);if(i<0)i=TIMING.length-2;
  const [s,a]=TIMING[i],[e,b]=TIMING[i+1],u=a===b?0:ease((f-s)/(e-s));
  const p=between(C[a],C[b],u);
  // A slow extra tilt of the mug while sipping.
  if(a==='mouth'&&b==='mouth')p.H-=.07*Math.sin(Math.PI*(f-s)/(e-s));
  pose.push([f,p]);shown.push([f,u<.5?a:b]);
 }
 const keys=[];
 for(const k of Object.keys(POSE)){
  const n=NAME[k];
  keys.push(key(`CoffeeFore${n}`,'x',pose.map(([f,p])=>[f,p.E[0]])),key(`CoffeeFore${n}`,'y',pose.map(([f,p])=>[f,p.E[1]])));
  keys.push(key(`CoffeeFore${n}`,'rotation',pose.map(([f,p])=>[f,p.F])),key(`CoffeeFore${n}`,'length',pose.map(([f,p])=>[f,p.LF])));
  keys.push(key(`CoffeeHand${n}`,'rotation',pose.map(([f,p])=>[f,p.H-p.F])));
  keys.push(key(`CoffeeArm${n}`,'opacity',steps(shown.map(([f,s])=>[f,s===k?1:0]))));
 }
 // The lift arm is part of the body drawing: cover it whenever the arm is not exactly there.
 const away=([f,p])=>[f,Math.hypot(p.E[0]-C.chest.E[0],p.E[1]-C.chest.E[1])+Math.abs(p.F-C.chest.F)*100+Math.abs(p.H-C.chest.H)*100<.5?0:1];
 keys.push(key('CoffeeBehindArm','opacity',steps(pose.map(away))));
 return keys;
}
