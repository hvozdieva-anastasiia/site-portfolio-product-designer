import type { RiveConfig } from './types';

const typing = 'TypingDemo';

// The animation comes from the character-studio project (character/ folder):
// artboard "OfficeCharacter", one state machine per clip. The runtime and the
// .riv live in public/rive/.
export const rive: RiveConfig = {
  src: `${import.meta.env.BASE_URL}rive/office-character.riv?v=keyboard-hands`,
  artboard: 'OfficeCharacter',
  /** Idle loop, used until a clip is chosen. */
  idle: 'Character',
  /** Toolkit: one looping clip per tool group, in the order of `toolGroups`. */
  toolkit: ['IdeaPreview', typing, 'ScrollDemo', 'NotificationPreview'],
};

export const contactRive = {
  src: rive.src,
  artboard: rive.artboard,
  idle: rive.idle,
  typing,
};
