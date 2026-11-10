"""Build keyboard-hands.json from the traced base drawing of the coffee scene."""

import json
import re
from pathlib import Path

from shapely import make_valid
from shapely.geometry import GeometryCollection, Polygon, box

assets = Path(__file__).resolve().parents[1] / "assets"
poses = json.loads((assets / "coffee-poses.json").read_text())["pose-0-base"]
original = json.loads((assets / "character-trace.json").read_text())["native_parts"]


def geometry(data):
    tokens = iter(re.findall(r"[MCLZ]|-?\d+(?:\.\d+)?", data))
    result = GeometryCollection()
    for token in tokens:
        if token == "M":
            points = [(float(next(tokens)), float(next(tokens)))]
        elif token == "L":
            points.append((float(next(tokens)), float(next(tokens))))
        elif token == "C":
            a = points[-1]
            b, c, d = ((float(next(tokens)), float(next(tokens))) for _ in range(3))
            for step in range(1, 9):
                t = step / 8
                points.append(tuple((1 - t)**3 * p + 3*t*(1-t)**2*q + 3*t*t*(1-t)*r + t**3*s
                                    for p, q, r, s in zip(a, b, c, d)))
        elif token == "Z":
            if len(points) >= 3:
                result = result.symmetric_difference(make_valid(Polygon(points)))
        else:
            raise ValueError(token)
    return result


def to_path(geom):
    if geom.geom_type == "Polygon" and geom.area > 0.4:
        return " ".join(
            "M " + " L ".join(f"{x:.2f} {y:.2f}" for x, y in list(ring.coords)[:-1]) + " Z"
            for ring in [geom.exterior, *geom.interiors]
        )
    return " ".join(filter(None, (to_path(part) for part in getattr(geom, "geoms", []))))


def part(index, geom, fill):
    return dict(index=index, d=to_path(geom.simplify(0.24, preserve_topology=True)), fill=fill, x=0, y=0)


def hand(main, details, sleeve=None):
    skin = geometry(poses[main]["d"])
    outline = skin.buffer(6, quad_segs=6)
    if sleeve is not None:
        outline = outline.union(sleeve)
    return [
        part(0, outline, "#211411"),
        part(10 if main == 12 else 21, skin, "#F9BD8D" if main == 12 else "#F8BC8D"),
        *(part(index, geometry(poses[index]["d"]), poses[index]["fill"]) for index in details),
    ]


far_parts = original["ArmFarMask"]
far_sleeve = geometry(next(p["d"] for p in far_parts if p["index"] == 0)).intersection(box(0, 0, 1280, 989))
near = hand(12, [65, 85, 93])
far = hand(27, [70, 79, 80, 89], far_sleeve)
far[1:1] = [p for p in far_parts if p["index"] not in {0, 21}]

fixed = []
cut = Polygon([(469, 970), (490, 970), (504, 1051), (769, 1048),
               (775, 1117), (505, 1117), (490, 1090)])
for p in original["FixedMask"]:
    if p["index"] in (0, 18):
        fixed.append(part(p["index"], geometry(p["d"]).difference(cut), p["fill"]))
    else:
        fixed.append(p)

payload = {"source": "coffee-ref/pose-0-base.png", "HandNearMask": near, "ArmFarMask": far, "FixedMask": fixed}
(assets / "keyboard-hands.json").write_text(json.dumps(payload, indent=2) + "\n")
