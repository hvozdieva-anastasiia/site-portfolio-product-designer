"""Regions for the coffee sip from the user's key drawings (see scripts/coffee-keys.mjs).

The body is one drawing (pose-2-lift) and never changes. Only the arm with the mug moves:
for each key drawing, a piece cut strictly along the colours of skin, watch and mug plus their
own outline — no shirt, no sleeve. Joints per drawing: elbow E, wrist W, mug M.
Behind the lift arm (when it moves away) the same place is shown from drawings where it is
free: the chest from the base drawing, the sleeve opening from the sip drawing.
Writes assets/coffee-poses.json → "regions".
Run with the tracing venv: .venv-tracing/bin/python scripts/coffee-pose-regions.py
"""
from pathlib import Path
import json
import numpy as np
import cv2
from PIL import Image
from shapely.geometry import Polygon, box
from shapely.geometry.polygon import orient
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]

# Rough outlines around mug + hand + forearm in each drawing (the cut follows colours inside).
POSES = {
 'pose-1-grip': dict(area=[(748,945),(925,945),(1020,960),(1052,1005),(1106,1000),(1145,995),(1185,1000),(1205,1040),(1205,1095),(1182,1132),(1105,1140),(940,1148),(750,1148)],
  E=(1165,1066), W=(1080,1072), M=(837,1045)),
 'pose-2-lift': dict(area=[(758,744),(772,729),(915,727),(942,754),(1003,776),(1040,818),(1080,872),(1104,912),(1150,965),(1192,1020),(1204,1075),(1180,1110),(1120,1104),(1078,1045),(1040,985),(1014,956),(985,952),(930,925),(895,928),(764,924)],
  E=(1168,1075), W=(1062,935), M=(842,826)),
 'pose-3-sip': dict(area=[(686,505),(700,490),(762,486),(852,494),(868,522),(952,530),(988,584),(1012,645),(1056,688),(1062,712),(1112,756),(1150,820),(1162,900),(1150,930),(1105,942),(1050,918),(1012,850),(978,742),(948,722),(894,694),(858,660),(786,668),(692,636),(686,550)],
  E=(1125,905), W=(1005,715), M=(775,570)),
}

def load(name):
    img = Image.open(ROOT / f'assets/coffee-ref/{name}.png').convert('RGB').resize((1280, 1280), Image.Resampling.LANCZOS)
    return np.array(img).astype(int)

def piece(name, area, mug_center):
    """Skin, watch and mug inside `area`, with the dark outline that touches them."""
    img = load(name); r, g, b = img[..., 0], img[..., 1], img[..., 2]
    skin = (r > 200) & (g > 140) & (g < 215) & (b > 90) & (b < 175) & (r - b > 60)
    watch = (abs(r - g) < 14) & (abs(g - b) < 18) & (r > 30) & (r < 90)
    cream = (r > 215) & (g > 205) & (b > 185)
    brew = (r > 70) & (r < 150) & (g > 35) & (g < 100) & (b < 80) & (r > g + 15)
    band = (b > r + 20) & (r > 80) & (b > 150) & (g > 120)
    dark = (r < 70) & (g < 50) & (b < 50)
    core = cv2.morphologyEx(((skin | watch) * 255).astype(np.uint8), cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    # coffee only in the upper half of the mug (the desk shadow has a similar brown)
    rows = np.arange(img.shape[0])[:, None] < mug_center[1]
    core |= ((cream | (brew & rows) | band) * 255).astype(np.uint8)
    inside = np.zeros_like(core); cv2.fillPoly(inside, [np.array(area, np.int32)], 255)
    core = cv2.bitwise_and(core, inside)
    # the outline: dark pixels within 7 px of the core
    near = cv2.dilate(core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))) > 0
    keep = cv2.bitwise_and(((core > 0) | (dark & near)).astype(np.uint8) * 255, inside)
    keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(keep)
    big = max(range(1, n), key=lambda k: stats[k, cv2.CC_STAT_AREA])
    keep = ((labels == big) * 255).astype(np.uint8)
    contours, _ = cv2.findContours(keep, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(contours, key=cv2.contourArea)
    return Polygon(cv2.approxPolyDP(c, .8, True)[:, 0, :]).buffer(0).buffer(1)

def path(geom):
    """Rive clip path: exteriors counter-clockwise, holes clockwise (non-zero rule)."""
    out = []
    for g in getattr(geom, 'geoms', [geom]):
        g = orient(g, 1.0)
        for ring in [g.exterior, *g.interiors]:
            out.append('M ' + ' L '.join(f'{x:.1f} {y:.1f}' for x, y in list(ring.coords)[:-1]) + ' Z')
    return ' '.join(out)
def bbox(geom): return [round(v, 1) for v in geom.bounds]

regions = {}
for name, p in POSES.items():
    g = piece(name, p['area'], p['M'])
    regions[name] = dict(E=p['E'], W=p['W'], M=p['M'], piece=dict(d=path(g), bbox=bbox(g)))
# Behind the lift arm: chest from the base drawing; around the elbow (where the base drawing
# has its own forearm on the desk) from the sip drawing.
hole = piece('pose-2-lift', POSES['pose-2-lift']['area'], POSES['pose-2-lift']['M']).buffer(5)
lower = box(1035, 975, 1280, 1200)
regions['behind'] = {'pose-0-base': dict(d=path(hole.difference(lower)), bbox=bbox(hole.difference(lower)))}
# Where the forearm came out of the sleeve, the sleeve is closed with a plain fill
# (the drawings disagree on the plaid there).
cuff = unary_union([hole.intersection(lower), Polygon([(1078,1040),(1098,975),(1150,950),(1198,980),(1214,1040),(1208,1082),(1188,1112),(1110,1112),(1088,1088)])])
regions['cuff'] = dict(d=path(cuff), bbox=bbox(cuff))
data = json.loads((ROOT / 'assets/coffee-poses.json').read_text())
data['regions'] = regions
(ROOT / 'assets/coffee-poses.json').write_text(json.dumps(data))
print({k: v['piece']['bbox'] for k, v in regions.items() if 'piece' in v})
