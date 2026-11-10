# Character Studio — agent notes

Rive character animation of an office girl at a laptop, played in a React/Vite page.
One animation per iteration; do not add other new actions unless asked.
Order and status of animations: `ROADMAP.md` (arm gestures and coffee are blocked on an arm-rig rework).

## Pipeline
- Source of truth: `scripts/build-character.mjs` (scene, base timelines) + `scripts/reactions.mjs`
  (face/head reactions: Listen, Notification, …) + `scripts/coffee-action.mjs` (coffee rig/poses) +
  `scripts/coffee-art.mjs` (mug and hand drawings).
- New one-shot clip: add it to `reactions()`; it gets `<Name>Demo` and `<Name>Preview` machines. Then set
  `ready:true, clip:'<Name>'` in `src/ideas.js` and, for one-shots, add the name to `repeatable` in `src/main.jsx`.
- Mouth morph: the traced mouth's vertices are keyable (`mouthTarget(keep,narrow)` + `mouthKeys` in reactions.mjs). Never edit `rive/scene.rml` by hand.
- Traced reference parts live in `assets/character-trace.json`; `tracedPart(name, mask)` pulls them.
- `pnpm character:rebuild` — generate → `rive --verify` → inspect → `.riv` → `public/rive/` → docs.
- `pnpm dev` — studio at http://127.0.0.1:5173 (`?clip=coffee&repeat=1` loops the coffee clip).
- Rive CLI via `node scripts/rive.mjs …` (native `~/.rive/bin/rive` is installed, else `tools/rive.exe` through wine).
  Docs: `~/.rive/bin/rive docs <topic>` (rigging, transforms, gotchas…), types: `rive schema <Type>`.
  Only `--once`/`--verify` are used: local unsigned build, no login, no paid export.

## Checking motion
- Fast preview: `COFFEE_DEBUG_DIR=<dir> COFFEE_DEBUG_FRAMES=0,72,200 node scripts/build-character.mjs`
  writes posed SVGs (same transforms as Rive); render with headless Chrome.
- Real runtime: `pnpm capture -- --artboard CoffeeCharacter --animation Coffee_Sip --frames 0,72,200,420`
  scrubs the built `.riv` in Chrome and saves PNGs to `captures/`.
- Always look at frames (contact sheet) before reporting; frame 0 and the last frame must match the reference.

## Conventions
- Element names are Rive ids (`id(name)`); every group/shape name must be unique.
- Arrays are back-to-front; groups pivot at world coordinates; bones are `group(...,true)`.
- Generator paths support absolute `M L C Q Z` only.
- Coffee artboard is 1440×1280; OfficeCharacter stays 1280×1280 and must not change.
- After changing the `.riv`, bump the `?v=` cache-buster in `src/main.jsx`.
