"""Clip the approved plaid colours to a complete, softly curved sleeve.
The illustration's arm was occluded by a hand and desk; those cut edges are
not an elbow silhouette and must not become visible when the arm is raised.
"""
import json,re
from pathlib import Path
from shapely.geometry import Polygon,GeometryCollection
from shapely import make_valid

ROOT=Path(__file__).resolve().parents[1]
trace=json.loads((ROOT/'assets/character-trace.json').read_text())
outline='M 1110 666 Q 1178 619 1210 694 C 1241 791 1269 942 1256 1021 Q 1240 1097 1215 1120 Q 1184 1136 1145 1118 C 1141 1090 1119 1045 1094 1019 Q 1075 997 1059 997 C 1043 994 1038 976 1043 953 C 1050 899 1042 839 1056 789 C 1066 745 1081 697 1110 666 Z'

def geom(d,x=0,y=0):
    ts=re.findall(r'[MLCQZ]|-?\d*\.?\d+(?:e[-+]?\d+)?',d,re.I)
    i=0; cmd=None; p=(0,0); points=[]; shapes=[]
    def pt():
        nonlocal i
        q=(float(ts[i])+x,float(ts[i+1])+y);i+=2;return q
    while i<len(ts):
        if ts[i].isalpha():cmd=ts[i].upper();i+=1
        if cmd=='M':
            if len(points)>2:shapes.append(make_valid(Polygon(points)))
            p=pt();points=[p];cmd='L'
        elif cmd=='L':p=pt();points.append(p)
        elif cmd in ('C','Q'):
            start=p; a=pt();b=pt();end=pt() if cmd=='C' else b
            for k in range(1,25):
                t=k/24;u=1-t
                if cmd=='C':q=tuple(u**3*start[j]+3*u*u*t*a[j]+3*u*t*t*b[j]+t**3*end[j] for j in (0,1))
                else:q=tuple(u*u*start[j]+2*u*t*a[j]+t*t*end[j] for j in (0,1))
                points.append(q)
            p=end
        elif cmd=='Z':
            if len(points)>2:shapes.append(make_valid(Polygon(points)))
            points=[];cmd=None
    if len(points)>2:shapes.append(make_valid(Polygon(points)))
    result=GeometryCollection()
    for poly in shapes:result=result.symmetric_difference(poly)
    return make_valid(result)

def path(poly):
    if poly.is_empty:return ''
    if poly.geom_type=='Polygon':
        if poly.area<2:return ''
        return ' '.join('M '+' L '.join(f'{x:.3f} {y:.3f}' for x,y in list(r.coords)[:-1])+' Z' for r in [poly.exterior,*poly.interiors])
    if hasattr(poly,'geoms'):return ' '.join(filter(None,(path(p) for p in poly.geoms)))
    return ''

clip=geom(outline)
indices={p['index'] for p in trace['native_parts']['UpperArmMask']} - {0,59}
parts=[]
for p in trace['paths']:
    if p['index'] in indices:
        d=path(geom(p['d'],p['x'],p['y']).intersection(clip).simplify(.18,preserve_topology=True))
        if d:parts.append(dict(index=p['index'],fill=p['fill'],d=d))
(ROOT/'assets/coffee-sleeve.json').write_text(json.dumps(dict(outline=outline,parts=parts)))
print(f'Prepared {len(parts)} approved plaid contours inside a complete sleeve.')


