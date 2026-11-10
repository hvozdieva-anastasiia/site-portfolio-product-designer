import { tools } from './tools';
import type { Case } from './types';

// Facts below come from the Behance project pages: titles, descriptions,
// tools, fields, tags and publish dates. No metrics are invented.
export const cases: Case[] = [
  {
    slug: 'yezzz',
    title: 'Yezzz! Retail Telecom Brand',
    kind: 'Brand & product',
    summary:
      'Yezzz is a mobile operator (MVNO) launched by Silpo, Ukraine’s largest supermarket chain. Shoppers get free mobile service by buying at Silpo, with no separate payment.',
    domains: [
      {
        label: 'Design',
        tags: ['UI/UX', 'Interaction design', 'Web design'],
      },
      { label: 'Product', tags: ['Mobile app', 'Landing page'] },
      { label: 'Analytics', tags: ['Metrics'] },
    ],
    tools: [
      tools.figma,
      tools.maze,
      tools.useberry,
      tools.notion,
      tools.googleDocs,
      tools.slack,
    ],
    outcome: { value: 'MVNO', label: 'launched by Silpo' },
    behance:
      'https://www.behance.net/gallery/250021861/Yezzz-Retail-Telecom-Brand',
    published: 'May 2026',
    team: 'Team project',
    cover:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d453e5250021861.6a15dad9ba2e0.png',
    coverAlt: 'Cover of the Yezzz! retail telecom brand case study',
    art: 'booking',
  },
  {
    slug: 'yo-esim',
    title: 'YO eSIM',
    kind: 'New feature',
    summary:
      'A cross-platform eSIM feature for Global YO, so travellers can buy, install and manage mobile data plans. The experience spans iOS, Android and web.',
    domains: [
      { label: 'Design', tags: ['UI/UX', 'App design', 'Web design'] },
      {
        label: 'Flows',
        tags: ['Plan selection', 'Activation', 'Data tracking'],
      },
      { label: 'Topic', tags: ['eSIM', 'Travel', 'Connectivity'] },
    ],
    tools: [tools.figma, tools.notion, tools.googleDocs, tools.slack],
    outcome: { value: 'iOS · Android · Web', label: 'one eSIM experience' },
    behance: 'https://www.behance.net/gallery/226044267/YO-eSIM-Case-Study',
    published: 'May 2025',
    team: 'Team project',
    cover:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d0be6f226044267.6827752c78ce3.png',
    coverAlt: 'Cover of the YO eSIM case study',
    art: 'onboarding',
  },
  {
    slug: 'ad-management-app',
    title: 'Mobile App for Managing Advertisement',
    kind: 'Mobile app',
    summary:
      'A mobile app for managing advertising campaigns on the go, from the campaign list to the details of each one. A solo project.',
    domains: [
      {
        label: 'Design',
        tags: ['App design', 'Mobile design', 'UI/UX', 'Interaction design'],
      },
      { label: 'Business domain', tags: ['Advertising'] },
    ],
    tools: [
      tools.figma,
      tools.miro,
      tools.invision,
      tools.notion,
      tools.googleDocs,
      tools.slack,
    ],
    outcome: { value: '30+ screens', label: 'UI kit and prototype' },
    behance:
      'https://www.behance.net/gallery/162342221/Mobile-App-for-managing-advertisement',
    team: 'Solo project',
    cover:
      'https://mir-s3-cdn-cf.behance.net/projects/max_808/2d988f162342221.Y3JvcCwxNDAwLDEwOTUsMCww.png',
    coverAlt: 'Cover of the mobile app for managing advertisement',
    art: 'dashboard',
  },
];
