"""One-time faithful vector trace and anatomical masks; rebuilding Rive needs only Node.

Requires vtracer, opencv-python-headless, Pillow and numpy. Work files stay in work/tracing.
The approved image is immutable. No generated illustration is substituted for its contours.
"""
from pathlib import Path
import json, re, sys, copy
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image
import cv2
import vtracer
from shapely.geometry import Polygon, GeometryCollection
from shapely import make_valid

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT.parents[1] / 'work' / 'tracing'
WORK.mkdir(parents=True, exist_ok=True)
SIZE = 1280
source = Image.open(ROOT / 'assets/reference-approved.png').convert('RGBA').resize((SIZE,SIZE),Image.Resampling.LANCZOS)
pixels = np.array(source)
pixels[:,:,3] = np.where(pixels[:,:,3]>127,255,0)
pixels[pixels[:,:,3]==0,:3] = 0
Image.fromarray(pixels).save(WORK/'source-clean.png')
vtracer.convert_image_to_svg_py(str(WORK/'source-clean.png'),str(WORK/'trace-clean.svg'),
    colormode='color',hierarchical='stacked',mode='spline',filter_speckle=8,
    color_precision=6,layer_difference=12,corner_threshold=75,length_threshold=5,
    splice_threshold=45,path_precision=2)
svg=ET.parse(WORK/'trace-clean.svg').getroot()
paths=[]
for i,p in enumerate(svg):
    tx,ty=map(float,re.findall(r'-?\d*\.?\d+',p.attrib.get('transform','translate(0,0)')))
    values=list(map(float,re.findall(r'-?\d*\.?\d+',p.attrib['d'])))
    xx=np.array(values[0::2])+tx; yy=np.array(values[1::2])+ty
    paths.append(dict(index=i,d=p.attrib['d'],fill=p.attrib['fill'],x=tx,y=ty,
        bbox=[float(xx.min()),float(yy.min()),float(xx.max()),float(yy.max())]))

# Render the exact traced fills as masks using OpenCV's cubic sampling. These masks
# follow the approved drawing's boundaries, including the existing finger silhouettes.
def raster_path(p,geometry=False):
    tokens=re.findall(r'[MCZ]|-?\d*\.?\d+',p['d']); j=0; command=None; contours=[]; contour=[]; point=None
    while j<len(tokens):
        if tokens[j] in ('M','C','Z'): command=tokens[j];j+=1
        if command=='M':
            point=np.array([float(tokens[j]),float(tokens[j+1])]);j+=2
            if contour: contours.append(np.array(contour))
            contour=[point.copy()]
        elif command=='C':
            q=np.array(list(map(float,tokens[j:j+6]))).reshape(3,2);j+=6
            for t in np.linspace(0,1,16)[1:]:
                contour.append((1-t)**3*point+3*(1-t)**2*t*q[0]+3*(1-t)*t*t*q[1]+t**3*q[2])
            point=q[2]
        elif command=='Z':
            contours.append(np.array(contour));contour=[];command=None
        else: raise RuntimeError(f'Unsupported path token {tokens[j]}')
    if contour:contours.append(np.array(contour))
    contours=[c+np.array([p['x'],p['y']]) for c in contours]
    if geometry:return contours
    mask=np.zeros((SIZE,SIZE),np.uint8)
    cv2.fillPoly(mask,[np.rint(c).astype(np.int32) for c in contours],255)
    return mask

path_masks=[raster_path(p) for p in paths]
def union(indices,padding=0,fill_holes=False):
    m=np.zeros((SIZE,SIZE),np.uint8)
    for i in indices:m=cv2.bitwise_or(m,path_masks[i])
    if padding:m=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*padding+1,2*padding+1)))
    if fill_holes:
        cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
        cv2.drawContours(m,cs,-1,255,-1)
    return m

head=union([2,3,5,12,14,40,46,48,55,58,60,61,63,64,65,76],7,True)
# Fill the dark rear hair mass between its coloured lobes without extending into the hood.
hair_bridge=np.zeros_like(head)
cv2.fillPoly(hair_bridge,[np.array([(574,475),(623,425),(675,500),(840,566),(839,637),(767,669),(659,673),(592,621)])],255)
head=cv2.bitwise_or(head,hair_bridge)

near_arm=union([7,47,57],6,True)
hand=union([10],5,True)
far_arm=union([21],6,True)
fixed=union([1,6,18,66,69,70,72,74,77,78,81],6,True)
# The screen and desktop sit in front of the hands. Assign all overlaps once.
head=cv2.bitwise_and(head,cv2.bitwise_not(fixed))
near_arm=cv2.bitwise_and(near_arm,cv2.bitwise_not(fixed))
hand=cv2.bitwise_and(hand,cv2.bitwise_not(cv2.bitwise_or(fixed,near_arm)))
far_arm=cv2.bitwise_and(far_arm,cv2.bitwise_not(cv2.bitwise_or(fixed,cv2.bitwise_or(near_arm,hand))))
used=cv2.bitwise_or(head,cv2.bitwise_or(fixed,cv2.bitwise_or(near_arm,cv2.bitwise_or(hand,far_arm))))
body=cv2.bitwise_not(used)
upper_arm=np.zeros_like(body)
cv2.fillPoly(upper_arm,[np.array([(1112,650),(1174,646),(1230,732),(1264,920),(1280,1155),(1115,1155),(1122,1090),(1070,1022),(1047,984),(1068,955),(1054,930),(1051,854),(1072,753)])],255)
upper_arm=cv2.bitwise_and(upper_arm,body)
upper_arm=cv2.bitwise_and(upper_arm,cv2.bitwise_not(union([13],4,True)))
body=cv2.bitwise_and(body,cv2.bitwise_not(upper_arm))
masks={'HeadMask':head,'ArmNearMask':near_arm,'HandNearMask':hand,'ArmFarMask':far_arm,'FixedMask':fixed,'UpperArmMask':upper_arm,'BodyMask':body}
# One-pixel shared coverage prevents antialias cracks between independently fitted masks.
masks={name:(cv2.dilate(m,np.ones((3,3),np.uint8)) if name!='BodyMask' else m) for name,m in masks.items()}

def trace_mask(name,mask):
    image=WORK/f'{name}.png'; out=WORK/f'{name}.svg'
    Image.fromarray(255-mask).save(image)
    vtracer.convert_image_to_svg_py(str(image),str(out),colormode='binary',mode='spline',
        filter_speckle=6,corner_threshold=70,length_threshold=4,splice_threshold=45,path_precision=2)
    result=[]
    for node in ET.parse(out).getroot():
        tr=list(map(float,re.findall(r'-?\d*\.?\d+',node.attrib.get('transform','translate(0,0)'))))
        result.append(dict(d=node.attrib['d'],x=tr[0],y=tr[1]))
    return result

mask_paths={name:trace_mask(name,m) for name,m in masks.items()}
part_paths={}
for name,mask in masks.items():
    selected=[]
    for p in paths:
        x0,y0,x1,y1=p['bbox'];x0=max(0,int(x0)-2);y0=max(0,int(y0)-2);x1=min(SIZE,int(x1)+3);y1=min(SIZE,int(y1)+3)
        if np.any(mask[y0:y1,x0:x1]):selected.append(p['index'])
    part_paths[name]=selected

# Preserve the original eyeliner and pupil contours. Reconstruct only the sclera
# hidden behind the pupil, interpolating its upper border from visible white pixels.
eyes={}
for name,indices,roi,fit_roi in [
    ('EyeNear',[40,61,65],(810,325,932,391),(847,349,891,382)),
    ('EyeFar',[46,60,76],(651,364,758,421),(700,390,746,415))]:
    white_mask=np.zeros((SIZE,SIZE),np.uint8)
    for i in indices[1:]:white_mask=cv2.bitwise_or(white_mask,path_masks[i])
    x0,y0,x1,y1=fit_roi
    dark=pixels[:,:,:3].max(axis=2)<100
    points=[]
    for y in range(y0,y1):
        row=np.flatnonzero(dark[y,x0:x1])+x0
        if len(row)<4:continue
        runs=np.split(row,np.where(np.diff(row)>1)[0]+1)
        run=max(runs,key=len)
        if len(run)>4:points.extend([(int(run[0]),y),(int(run[-1]),y)])
    center,axes,angle=cv2.fitEllipse(np.array(points,dtype=np.float32))
    ellipse_mask=np.zeros((SIZE,SIZE),np.uint8)
    cv2.ellipse(ellipse_mask,(tuple(center),(axes[0]+2,axes[1]+2),angle),255,-1)
    eye_mask=cv2.bitwise_or(path_masks[indices[0]],white_mask)
    ellipse_mask=cv2.bitwise_and(ellipse_mask,eye_mask)
    full_white=cv2.bitwise_or(white_mask,ellipse_mask)
    pupil_mask=cv2.bitwise_and(path_masks[indices[0]],ellipse_mask)
    eyes[name]=dict(indices=indices,center=list(center),
        sclera=trace_mask(name+'Sclera',full_white),pupil=trace_mask(name+'Pupil',pupil_mask))

payload=dict(version=2,source='reference-approved.png',artboard=[SIZE,SIZE],
    method='Contours traced from the approved raster; alpha cleaned; no illustration regenerated.',
    paths=paths,masks=mask_paths,part_paths=part_paths,eyes=eyes)

# Resolve the anatomical masks into actual geometry for the runtime. Native Rive
# then draws ordinary vector shapes instead of repeatedly stencilling the full scene.
def shape_geometry(entries):
    result=GeometryCollection()
    for entry in entries:
        for contour in raster_path(entry,geometry=True):
            if len(contour)>=3:
                polygon=make_valid(Polygon(contour))
                result=result.symmetric_difference(polygon)
    return make_valid(result)
def polygon_data(geometry):
    if geometry.is_empty:return ''
    if geometry.geom_type=='Polygon':
        if geometry.area<.15:return ''
        return ' '.join('M '+' L '.join(f'{x:.3f} {y:.3f}' for x,y in list(ring.coords)[:-1])+' Z' for ring in [geometry.exterior,*geometry.interiors])
    if hasattr(geometry,'geoms'):return ' '.join(filter(None,(polygon_data(g) for g in geometry.geoms)))
    return ''
geometries=[shape_geometry([p]) for p in paths]
native_parts={}
for name,mask_entries in mask_paths.items():
    gate=shape_geometry(mask_entries)
    native_parts[name]=[]
    for index in part_paths[name]:
        clipped=make_valid(geometries[index].intersection(gate)).simplify(.18,preserve_topology=True)
        data=polygon_data(clipped)
        if data:native_parts[name].append(dict(index=index,d=data,fill=paths[index]['fill'],x=0,y=0))
payload['native_parts']=native_parts
(ROOT/'assets/character-trace.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'paths':len(paths),'parts':{k:len(v) for k,v in part_paths.items()},'eyes':{k:{'center':v['center']} for k,v in eyes.items()}},indent=2))
