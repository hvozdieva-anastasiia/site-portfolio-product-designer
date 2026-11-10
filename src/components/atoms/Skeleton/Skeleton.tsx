import './Skeleton.css';

export type SkeletonTone = 'blue' | 'green' | 'tomato' | 'ink' | 'wash';

type SkeletonProps = {
  w?: string | number;
  h?: number;
  tone?: SkeletonTone;
};

/** A greyed bar. The illustrations are built from these. */
export function Skeleton({ w = '100%', h = 6, tone }: SkeletonProps) {
  return (
    <i
      className={tone ? `sk sk--${tone}` : 'sk'}
      style={{ width: w, height: h }}
    />
  );
}
