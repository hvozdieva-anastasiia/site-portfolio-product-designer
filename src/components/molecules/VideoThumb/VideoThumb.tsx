import { useState } from 'react';
import { PlayIcon } from '../../atoms/Icon/Icon';
import './VideoThumb.css';

// Largest size first (1280x720, 16:9, no black bars). A smaller size is used
// only for videos where YouTube has no maxres image.
const THUMB_SIZES = ['maxresdefault', 'sddefault', 'hqdefault'];

function YouTubeImage({ id }: { id: string }) {
  const [size, setSize] = useState(0);
  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/${THUMB_SIZES[size]}.jpg`}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setSize((current) => Math.min(current + 1, 2))}
      onLoad={(event) => {
        // YouTube answers 404 for a missing maxres, but guard against its
        // small grey placeholder as well.
        if (event.currentTarget.naturalWidth <= 120) {
          setSize((current) => Math.min(current + 1, 2));
        }
      }}
    />
  );
}

type VideoThumbProps = {
  /** When set, the real YouTube thumbnail is used. */
  youtubeId?: string;
  /** Without a YouTube id, a drawn slide shows this kicker and the title. */
  kicker: string;
  title: string;
  duration: string;
};

/** A 16:9 video preview with a play button and the running time. */
export function VideoThumb({
  youtubeId,
  kicker,
  title,
  duration,
}: VideoThumbProps) {
  return (
    <span className="thumb" aria-hidden="true">
      {youtubeId ? (
        <YouTubeImage id={youtubeId} />
      ) : (
        <span className="thumb-slide">
          <span className="thumb-kicker">{kicker}</span>
          <span className="thumb-title">{title}</span>
        </span>
      )}
      <span className="play">
        <PlayIcon />
      </span>
      <span className="duration">{duration}</span>
    </span>
  );
}
