import type { ReactNode } from 'react';
import './CharacterScene.css';

export function CharacterScene({ children }: { children?: ReactNode }) {
  return (
    <div className="char">
      <img
        src="/rive/mascot-poster.png"
        width={1254}
        height={1254}
        alt="Illustrated designer at a laptop"
      />
      {children}
    </div>
  );
}
