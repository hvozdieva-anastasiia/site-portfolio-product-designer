import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleArt } from '../../illustrations/ArticleArt/ArticleArt';
import { MediaCard } from '../MediaCard/MediaCard';
import { MediaGrid } from './MediaGrid';

const meta = {
  component: MediaGrid,
  title: 'Molecules/MediaGrid',
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MediaGrid>;

export default meta;

const kinds = ['questions', 'crowded', 'hiring'] as const;

export const Default: StoryObj<typeof meta> = {
  args: { children: null },
  render: () => (
    <div style={{ padding: 24 }}>
      <MediaGrid>
        {kinds.map((kind) => (
          <li key={kind}>
            <MediaCard
              href="#"
              media={<ArticleArt kind={kind} />}
              meta="DOU · in Ukrainian"
              title={`Article about ${kind}`}
              text="A short summary of the article."
              linkLabel="Read on DOU"
            />
          </li>
        ))}
      </MediaGrid>
    </div>
  ),
};
