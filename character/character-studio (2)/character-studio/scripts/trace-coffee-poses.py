"""Trace the coffee key drawings (assets/coffee-ref/pose-*.png) into vector paths.

Each pose is traced whole, the same way as the approved reference (vtracer, stacked splines),
so the animation can swap complete drawings without seams. Output: assets/coffee-poses.json
{pose: [{d, fill}]} in 1280x1280 artboard coordinates, back to front.
Run with the tracing venv: .venv-tracing/bin/python scripts/trace-coffee-poses.py
"""
from pathlib import Path
import json, re, tempfile
import numpy as np
from PIL import Image
import vtracer

ROOT = Path(__file__).resolve().parents[1]
SIZE = 1280
POSES = ['pose-0-base', 'pose-1-grip', 'pose-2-lift', 'pose-3-sip']

def trace(name, work):
    src = Image.open(ROOT / f'assets/coffee-ref/{name}.png').convert('RGBA').resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    px = np.array(src)
    px[:, :, 3] = np.where(px[:, :, 3] > 127, 255, 0)
    px[px[:, :, 3] == 0, :3] = 0
    clean = work / f'{name}.png'; out = work / f'{name}.svg'
    Image.fromarray(px).save(clean)
    vtracer.convert_image_to_svg_py(str(clean), str(out), colormode='color', hierarchical='stacked', mode='spline',
        filter_speckle=8, color_precision=6, layer_difference=12, corner_threshold=75, length_threshold=5,
        splice_threshold=45, path_precision=2)
    svg = out.read_text()
    paths = []
    for m in re.finditer(r'<path d="([^"]+)" fill="([^"]+)" transform="translate\(([-\d.]+),([-\d.]+)\)"', svg):
        d, fill, tx, ty = m.group(1), m.group(2), float(m.group(3)), float(m.group(4))
        # Bake the translate into absolute coordinates (M/C/L pairs only).
        d = re.sub(r'(-?\d*\.?\d+)\s*,?\s*(-?\d*\.?\d+)', lambda q: f'{float(q.group(1))+tx:.2f} {float(q.group(2))+ty:.2f}', d)
        paths.append(dict(d=d.strip(), fill=fill.upper()))
    return paths

with tempfile.TemporaryDirectory() as tmp:
    poses = {name: trace(name, Path(tmp)) for name in POSES}
(ROOT / 'assets/coffee-poses.json').write_text(json.dumps(poses))
print({k: len(v) for k, v in poses.items()})
