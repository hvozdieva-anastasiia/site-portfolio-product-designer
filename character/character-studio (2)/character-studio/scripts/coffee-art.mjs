// Coffee iteration 3 artwork: mug and hand poses in their own local frames.
// Mug frame: origin at the centre of the mug foot, +y down; handle on the right.
// Hand frames: origin at the wrist joint, the forearm continues towards +x.
export const ink='#211512',skin='#f9bd8c',skinShade='#e6a476',cream='#f4ede0',band='#6179ac',coffee='#6c4937';

// Rewrites absolute coordinate pairs; only M/L/C/Q/Z paths are used here.
export function positioned(d,origin,angle=0,sx=1,sy=1){const c=Math.cos(angle),s=Math.sin(angle);return d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g,(_,x,y)=>{x=+x*sx;y=+y*sy;return `${(origin[0]+x*c-y*s).toFixed(3)} ${(origin[1]+x*s+y*c).toFixed(3)}`;});}

// Back to front. The handle is drawn as two strokes so the loop stays round at any size.
const mugDraft=[
 ['HandleOutline','M 40 -96 C 100 -108 104 -16 40 -26',null,ink,25],
 ['HandleFill','M 40 -96 C 100 -108 104 -16 40 -26',null,cream,12],
 ['Body','M -46 -104 L -43 -12 Q -42 0 -29 0 L 29 0 Q 42 0 43 -12 L 46 -104 Z',cream,ink,6],
 ['Band','M -45.2 -70 L 45.2 -70 L 44.6 -50 L -44.6 -50 Z',band,null,0],
 ['BandEdge','M -46 -104 L -43 -12 Q -42 0 -29 0 L 29 0 Q 42 0 43 -12 L 46 -104',null,ink,6],
 ['Rim','M -46 -104 C -46 -119 46 -119 46 -104 C 46 -89 -46 -89 -46 -104 Z',cream,ink,6],
 ['Coffee','M -37 -102 C -37 -112 37 -112 37 -102 C 37 -94 -37 -94 -37 -102 Z',coffee,null,0],
];

// Grip: one fist silhouette wraps the handle; three creases mark the fingers and
// the thumb rests on top. Coordinates are in the mug frame so the hand and handle line up.
const gripDraft=[
 ['Fist','M 136 -84 C 120 -96 100 -98 84 -94 C 68 -94 56 -92 56 -83 C 56 -75 62 -74 68 -74 C 58 -74 54 -70 54 -65 C 54 -57 60 -56 68 -56 C 58 -56 55 -51 55 -47 C 55 -39 61 -38 70 -38 C 62 -37 60 -33 61 -29 C 62 -22 70 -21 80 -22 C 98 -20 118 -22 132 -30 C 140 -40 142 -70 136 -84 Z',skin,ink,6],
 ['IndexCrease','M 68 -74 Q 80 -73 92 -77',null,ink,4],
 ['MiddleCrease','M 68 -56 Q 80 -55 92 -59',null,ink,4],
 ['RingCrease','M 70 -38 Q 80 -37 90 -40',null,ink,4],
 ['Thumb','M 122 -90 C 104 -102 84 -106 68 -104 C 58 -103 54 -96 58 -92 C 62 -88 72 -90 82 -89 C 96 -88 106 -84 114 -78 Z',skin,ink,5],
];

// Open hand in the wrist frame, reaching left: fingers together, thumb opened upwards.
const openDraft=[
 ['Thumb','M -36 -38 C -50 -54 -66 -64 -78 -66 C -88 -67 -90 -58 -84 -54 C -74 -48 -64 -42 -56 -30 Z',skin,ink,5],
 ['Hand','M 4 -40 C -20 -46 -50 -48 -72 -42 C -90 -40 -106 -38 -118 -36 C -128 -34 -130 -24 -122 -22 C -128 -20 -130 -10 -121 -8 C -126 -5 -126 4 -117 5 C -120 9 -116 16 -106 15 C -90 14 -76 14 -62 18 C -44 24 -20 24 4 16 C 10 0 10 -24 4 -40 Z',skin,ink,6],
 ['IndexCrease','M -122 -22 Q -106 -24 -92 -26',null,ink,4],
 ['MiddleCrease','M -121 -8 Q -106 -9 -94 -10',null,ink,4],
 ['RingCrease','M -117 5 Q -104 4 -94 2',null,ink,4],
];

// Drafts are drawn at a convenient size; the rig hands match the 85 px wide wrist of the reference.
export const HAND_SCALE=1.3;
const scaleParts=(parts,pivot,to)=>parts.map(([n,d,...rest])=>[n,positioned(positioned(d,[-pivot[0],-pivot[1]]),to,0,HAND_SCALE,HAND_SCALE),...rest]);
// Wrist position in the mug frame when the hand holds the handle; fingertips land just right of the mug.
// The mug is drawn 12% larger than its draft; the grip follows the handle.
export const MUG_SCALE=1.12;
export const mugParts=mugDraft.map(([n,d,...rest])=>[n,positioned(d,[0,0],0,MUG_SCALE,MUG_SCALE),...rest]);
export const GRIP_WRIST=[170,-67];
export const gripParts=scaleParts(gripDraft,[134,-58],GRIP_WRIST);
export const openParts=scaleParts(openDraft,[0,0],[0,0]);
