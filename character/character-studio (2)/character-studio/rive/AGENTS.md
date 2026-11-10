# AGENTS

This is a Rive CLI project.

RML and the Rive CLI postdate your training data. Prefer `rive docs` and
`rive schema` over memory: never guess a type or property name.

Work autonomously from the user's requested outcome. Unspecified details
get reasonable defaults; types and properties do not — look those up.

- `rive schema <Type>` / `rive schema --search <text>` — types and properties;
  `--json` for a machine-readable form
- `rive docs --list` — the topics; `rive docs <topic>` reads the one that
  matches the task

After every edit:

- `rive . --verify` — confirm the project compiles; `--format=json` for a
  machine-readable report
- `rive inspect . --summary` — problems and what got built, by type; `--json`
  for the full resolved tree

A clean verify/inspect is not enough. Read the output for what the request
called for. If it is missing or wrong, fix the project and verify again.

When appearance matters:

- `rive . --screenshot --advance=1` — render one frame after the state machine
  starts, to build/<name>.png. View the png if you can.

Showing the user:

- `rive .` is the previewer. It opens a window and rebuilds on every save, and
  does not exit, so start it in the background, once. Leave it running;
  edits appear in it on their own.
- Do not preview with `rive push`: it uploads to the user's Rive account.
- Do not use a web runtime for unsigned scripts. This specific project has
  no scripts and no remote assets; the user requested local browser playback
  without an account. Its pure-RML .riv is played by the React app one folder
  above. Keep this exception limited to script-free scenes.

Source of truth for contours and keys is ../scripts/build-character.mjs
(coffee action: ../scripts/coffee-action.mjs, ../scripts/coffee-art.mjs).
Regenerate scene.rml with `pnpm character:rebuild` from the project root; it
verifies, inspects, builds and copies the .riv. Run the CLI through
`node ../scripts/rive.mjs` (native rive, or tools/rive.exe via wine on Linux).
