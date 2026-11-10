// Face and head reactions: no arm motion, hands stay on the keyboard.
// Each entry is one timeline; the generator turns it into a LinearAnimation and demo machines.
export const ease=t=>t*t*(3-2*t);
const pulse=(f,start,peak,end)=>f<=start||f>=end?0:f<peak?ease((f-start)/(peak-start)):ease((end-f)/(end-peak));
// Smooth (ease in/out) between [frame,value] keys; sampled because Rive keys are linear here.
const curve=points=>f=>{for(let i=1;i<points.length;i++){const [f0,v0]=points[i-1],[f1,v1]=points[i];if(f<=f1)return v0+(v1-v0)*ease(Math.max(0,(f-f0)/(f1-f0)));}return points.at(-1)[1];};
const sampled=(fn,duration,step=2)=>Array.from({length:duration/step+1},(_,i)=>[i*step,fn(i*step)]);

export function reactions({key,traced,waves,browCenters,mouth}){
 const pupil={near:traced.eyes.EyeNear.center,far:traced.eyes.EyeFar.center};
 const pupils=(duration,dx,dy)=>[['PupilNear',pupil.near],['PupilFar',pupil.far]].flatMap(([n,[x,y]])=>[
  key(n,'x',sampled(f=>x+dx(f),duration)),key(n,'y',sampled(f=>y+dy(f),duration))]);
 // Blink: half-close, drawn arcs for four frames, half-open.
 const blink=(at,duration)=>[
  ...['EyeNear','EyeFar'].flatMap(n=>[
   key(n,'scaleY',[[0,1],[at-3,1],[at,.45],[at+5,.45],[at+8,1],[duration,1]]),
   key(n,'opacity',[[0,1],[at,1],[at+1,0],[at+4,0],[at+5,1],[duration,1]])]),
  key('ClosedEyes','opacity',[[0,0],[at,0],[at+1,1],[at+4,1],[at+5,0],[duration,0]])];
 // Short key taps (same amplitude as Idle_Work); outside the taps the hands rest.
 const typing=(taps,duration)=>['HandNear','ArmFar'].map((n,i)=>key(n,'rotation',[[0,0],...taps.flatMap(f=>[[f+i*3,-.0022],[f+i*3+5,0]]),[duration,0]]));
 const brows=(duration,near,far)=>[key('BrowNear','y',sampled(near,duration)),key('BrowFar','y',sampled(far,duration))];
 const browBase={near:browCenters.BrowNear[1],far:browCenters.BrowFar[1]};
 // Torso rise/sink in px (negative = up). The fixed-layer arm slivers follow the body up;
 // when it sinks the arms cover them in place, and moving them down would expose them on the desk.
 const torsoY=(duration,dy)=>[key('Body','y',sampled(f=>1125+dy(f),duration)),...['7','10','21'].map(i=>key('FixedSkin_'+i,'y',sampled(f=>Math.min(0,dy(f)),duration)))];
 // Mouth morph: bend the traced smile towards its chord while keeping the stroke thickness.
 // A parabola fitted to all vertices approximates the centre line; vertices move by
 // (1-keep) of its sag, and x shrinks by `narrow` around the middle.
 const mouthTarget=(keep,narrow,skew=0)=>{
  const v=mouth.vertices,n=v.length,xs=v.map(p=>p.x),xL=Math.min(...xs),xR=Math.max(...xs),xc=(xL+xR)/2;
  const S=[0,0,0,0,0],T=[0,0,0];for(const {x,y} of v){const u=x-xc;S[0]+=1;S[1]+=u;S[2]+=u*u;S[3]+=u*u*u;S[4]+=u*u*u*u;T[0]+=y;T[1]+=u*y;T[2]+=u*u*y;}
  const M=[[S[4],S[3],S[2],T[2]],[S[3],S[2],S[1],T[1]],[S[2],S[1],S[0],T[0]]];
  for(let i=0;i<3;i++)for(let j=i+1;j<3;j++){const r=M[j][i]/M[i][i];for(let k=i;k<4;k++)M[j][k]-=r*M[i][k];}
  const c=Array(3);for(let i=2;i>=0;i--){c[i]=(M[i][3]-M.at(i).slice(i+1,3).reduce((a,m,k)=>a+m*c[i+1+k],0))/M[i][i];}
  const fit=x=>{const u=x-xc;return c[0]*u*u+c[1]*u+c[2];},chord=x=>fit(xL)+(fit(xR)-fit(xL))*(x-xL)/(xR-xL);
  // skew: px the right corner drops (the left one rises as much).
  return v.map(({x,y})=>({x:xc+(x-xc)*narrow,y:y-(1-keep)*(fit(x)-chord(x))+skew*(x-xc)/((xR-xL)/2)}));
 };
 // amount(f): 0 = traced smile, 1 = target. Keys only where the mouth changes.
 const mouthKeys=(duration,amount,target,step=4)=>{
  const frames=[...new Set([0,duration,...Array.from({length:duration/step+1},(_,i)=>i*step).filter(f=>{const a=amount(f),b=amount(Math.max(0,f-step)),c=amount(Math.min(duration,f+step));return a!==b||a!==c;})])].sort((a,b)=>a-b);
  return mouth.vertices.flatMap((p,i)=>['x','y'].map(axis=>key(`${mouth.name}_v${i}`,axis,frames.map(f=>[f,p[axis]+(target[i][axis]-p[axis])*amount(f)]))));
 };

 // Listen: attentive loop. Head tilted 1.5° towards the viewer, slow breathing,
 // one blink and one barely visible nod; gaze stays on the viewer.
 const listen={name:'Listen',duration:360,loop:true,keys:[
  key('Body','y',waves(1125,.8,360,180)),key('Body','scaleY',waves(1,.0015,360,180)),
  key('Head','rotation',sampled(f=>-.026+.004*Math.sin(f/360*Math.PI*2)-.016*pulse(f,198,222,264),360,4)),
  ...blink(129,360),
  ...['PupilNear','PupilFar'].map((n,i)=>key(n,'x',[[0,[pupil.near,pupil.far][i][0]],[360,[pupil.near,pupil.far][i][0]]])),
 ]};

 // Notification: typing stops, the eyes jump to the laptop and the head follows with a
 // lag, brows pop up and settle; a 0.8 s look, a blink, then eyes lead the way back.
 const look=curve([[0,0],[22,0],[27,1],[104,1],[110,0],[180,0]]);
 const head=curve([[0,0],[25,0],[48,-.021],[104,-.024],[134,0],[180,0]]);
 const browLift=curve([[0,0],[24,0],[32,-6.5],[42,-5],[104,-5],[128,0],[180,0]]);
 const notification={name:'Notification',duration:180,loop:false,keys:[
  ...typing([2,11,19,142,151,160],180),
  ...pupils(180,f=>-7*look(f),f=>3*look(f)),
  key('Head','rotation',sampled(head,180)),
  ...brows(180,f=>browBase.near+browLift(f),f=>browBase.far+.8*browLift(f)),
  ...blink(96,180),
 ]};
 // Think: hands stop, gaze goes up and away, one brow rises with a slight tilt, the head
 // tilts 2°, the smile flattens. A 1.5 s hold with a small saccade, a blink, then back.
 const thinkLook=curve([[0,0],[10,0],[22,1],[84,1],[90,.8],[140,.8],[146,0],[240,0]]);
 const thinkFace=curve([[0,0],[9,0],[40,1],[144,1],[196,0],[240,0]]);
 const thinkHead=curve([[0,0],[12,0],[44,-.035],[140,-.039],[198,0],[240,0]]);
 const neutral=mouthTarget(.3,.9);
 const think={name:'Think',duration:240,loop:false,keys:[
  ...pupils(240,f=>5*thinkLook(f),f=>-6*thinkLook(f)),
  key('Head','rotation',sampled(thinkHead,240)),
  ...brows(240,f=>browBase.near-7*thinkFace(f),f=>browBase.far+1.5*thinkFace(f)),
  key('BrowNear','rotation',sampled(f=>-.06*thinkFace(f),240)),
  ...blink(150,240),
  ...mouthKeys(240,thinkFace,neutral),
 ]};
 // Doubt: a sideways glance, the far brow goes up (outer end higher) while the near one
 // knits, head tilts 2°, the mouth becomes a short flat line with one corner down.
 // About 1 s hold, a blink, then the glance comes back first.
 const doubtLook=curve([[0,0],[8,0],[20,1],[100,1],[106,0],[180,0]]);
 const doubtFace=curve([[0,0],[8,0],[30,1],[104,1],[146,0],[180,0]]);
 const doubtHead=curve([[0,0],[10,0],[34,-.034],[100,-.036],[148,0],[180,0]]);
 const doubtful=mouthTarget(.1,.78,3);
 const doubt={name:'Doubt',duration:180,loop:false,keys:[
  ...pupils(180,f=>7*doubtLook(f),f=>1*doubtLook(f)),
  key('Head','rotation',sampled(doubtHead,180)),
  ...brows(180,f=>browBase.near+2.5*doubtFace(f),f=>browBase.far-8*doubtFace(f)),
  key('BrowNear','rotation',sampled(f=>-.04*doubtFace(f),180)),
  key('BrowFar','rotation',sampled(f=>.08*doubtFace(f),180)),
  ...blink(94,180),
  ...mouthKeys(180,doubtFace,doubtful),
 ]};
 // Idea: she straightens up 3 px, both brows pop up, the smile widens and the eyes narrow a
 // little (cheeks up). One short confident nod at 1.2 s, a hold, back to base by 2.7 s.
 const ideaFace=curve([[0,0],[6,0],[24,1.12],[32,1],[130,1],[162,0],[180,0]]);
 const nod=curve([[0,0],[66,0],[76,1],[88,-.15],[96,0],[180,0]]);
 const wide=mouthTarget(1.6,1.08);
 const ideaClip={name:'Idea',duration:180,loop:false,keys:[
  // She straightens up with the whole torso: moving the head alone opens the neckline.
  ...torsoY(180,f=>-3*ideaFace(f)),key('Body','scaleY',sampled(f=>1+.003*ideaFace(f),180)),
  key('Head','rotation',sampled(f=>-.032*nod(f),180)),
  ...brows(180,f=>browBase.near-6*ideaFace(f),f=>browBase.far-5*ideaFace(f)),
  ...['EyeNear','EyeFar'].map(n=>key(n,'scaleY',sampled(f=>1-.07*Math.min(1,ideaFace(f)),180))),
  ...mouthKeys(180,f=>Math.min(1,ideaFace(f)),wide),
 ]};
 // Win: she notices the result on the screen, beams (widest smile, brows up, eyes narrow),
 // shoulders give a happy double bump, the eyes come to the viewer, one nod, back to work.
 const winLook=curve([[0,0],[16,0],[20,1],[46,1],[52,0],[180,0]]);
 const winFace=curve([[0,0],[24,0],[40,1.1],[48,1],[132,1],[164,0],[180,0]]);
 const winShoulders=curve([[0,0],[26,0],[36,1],[44,.4],[52,1],[60,.7],[132,.7],[164,0],[180,0]]);
 const winNod=curve([[0,0],[64,0],[74,1],[86,-.15],[94,0],[180,0]]);
 const beam=mouthTarget(1.8,1.12);
 const win={name:'Win',duration:180,loop:false,keys:[
  ...typing([2,10,17,166],180),
  ...pupils(180,f=>-7*winLook(f),f=>3*winLook(f)),
  ...torsoY(180,f=>-3*winShoulders(f)),key('Body','scaleY',sampled(f=>1+.003*winShoulders(f),180)),
  key('Head','rotation',sampled(f=>-.03*winNod(f),180)),
  ...brows(180,f=>browBase.near-5*winFace(f),f=>browBase.far-4*winFace(f)),
  ...['EyeNear','EyeFar'].map(n=>key(n,'scaleY',sampled(f=>1-.08*Math.min(1,winFace(f)),180))),
  ...mouthKeys(180,f=>Math.min(1,winFace(f)),beam),
 ]};
 // Nod: one agreeing nod at the viewer. A small lift (anticipation), a quick dip (first
 // third), a slower return with a slight settle; a soft blink and a warmer smile at the bottom.
 // Hair has no separate lag: its outline is fused with the face in the trace.
 const nodDip=curve([[0,0],[8,0],[14,-.18],[30,1],[36,.94],[68,-.08],[84,0],[120,0]]);
 const nodFace=curve([[0,0],[10,0],[30,1],[60,1],[96,0],[120,0]]);
 const agree=mouthTarget(1.25,1.03);
 const nodClip={name:'Nod',duration:120,loop:false,keys:[
  key('Head','rotation',sampled(f=>-.05*nodDip(f),120)),
  key('Head','y',sampled(f=>683+4*nodDip(f),120)),
  ...brows(120,f=>browBase.near-2*nodFace(f),f=>browBase.far-2*nodFace(f)),
  ...blink(27,120),
  ...mouthKeys(120,nodFace,agree),
 ]};
 // Tired: she slumps — shoulders 5 px down, head 3 px more and a little forward, heavy lids,
 // inner brow ends up, the smile fades. Eyes close for 0.4 s with one exhale (the torso
 // deflates a touch), then she opens her eyes and straightens with a small lift at the end.
 const slump=curve([[0,0],[12,0],[72,1],[118,1],[176,-.12],[194,0],[240,0]]);
 const exhale=curve([[0,0],[76,0],[90,1],[104,0],[240,0]]);
 const weary=curve([[0,0],[14,0],[66,1],[124,1],[180,0],[240,0]]);
 const tiredClip={name:'Tired',duration:240,loop:false,keys:[
  ...torsoY(240,f=>5*slump(f)+1.5*exhale(f)),key('Body','scaleY',sampled(f=>1-.004*exhale(f),240)),
  key('Head','y',sampled(f=>683+3*Math.max(0,slump(f)),240)),
  key('Head','rotation',sampled(f=>-.016*Math.max(0,slump(f)),240)),
  ...brows(240,f=>browBase.near-1.5*weary(f),f=>browBase.far-1.5*weary(f)),
  key('BrowNear','rotation',sampled(f=>.05*weary(f),240)),key('BrowFar','rotation',sampled(f=>-.05*weary(f),240)),
  // Heavy lids, then closed (drawn arcs) for 0.4 s.
  ...['EyeNear','EyeFar'].flatMap(n=>[
   key(n,'scaleY',[[0,1],[14,1],[66,.84],[76,.84],[79,.45],[100,.45],[103,.84],[124,.84],[176,1],[240,1]]),
   key(n,'opacity',[[0,1],[79,1],[80,0],[99,0],[100,1],[240,1]])]),
  key('ClosedEyes','opacity',[[0,0],[79,0],[80,1],[99,1],[100,0],[240,0]]),
  ...mouthKeys(240,weary,mouthTarget(.45,.95)),
 ]};
 // Scroll: reading loop. The eyes stay on the laptop and step down twice (two lines read),
 // the near forearm slides on the trackpad 5 px and back (drawing unchanged),
 // a blink at 3.2 s, slow breathing. Seamless: everything returns to its frame-0 value.
 const readX=curve([[0,0],[40,0],[48,-1.5],[150,-1.5],[158,0],[250,0],[258,-1.5],[330,-1.5],[340,0],[360,0]]);
 const readY=curve([[0,0],[100,0],[110,2.5],[210,2.5],[220,4.5],[300,4.5],[330,0],[360,0]]);
 const slide=curve([[0,0],[130,0],[160,1],[200,1],[240,0],[360,0]]);
 const scrollClip={name:'Scroll',duration:360,loop:true,keys:[
  key('Body','y',waves(1125,.8,360,180)),key('Body','scaleY',waves(1,.0015,360,180)),
  key('Head','rotation',sampled(f=>-.006-.002*Math.sin(f/360*Math.PI*2),360,4)),
  ...pupils(360,f=>-7+readX(f),f=>3+readY(f)),
  // The whole forearm with the watch slides along the desk; its end stays under the sleeve.
  // The fixed-layer skin slivers of the hand go with it.
  ...[['ArmNear',1120],['FixedSkin_10',0]].map(([n,x])=>key(n,'x',sampled(f=>x-5*slide(f),360))),
  ...blink(192,360),
 ]};
 return [listen,notification,think,doubt,ideaClip,win,nodClip,tiredClip,scrollClip];
}
