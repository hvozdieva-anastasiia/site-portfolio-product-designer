import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Atomic layers. A component may import only from layers below its own, and
 * never site data: data arrives through props. Shared types are the exception
 * (content/types), and stories may use the data to build examples.
 *
 *   atoms -> molecules -> organisms -> blocks -> pages
 *   illustrations sit beside molecules and use atoms only
 */
const forbid = (...layers) => [
  ...layers.map((layer) => ({
    group: [`**/${layer}`, `**/${layer}/**`],
    message: `This layer must not import from ${layer}. Lower layers cannot know higher ones.`,
  })),
  {
    // Anything under content/ except content/types.
    regex: '(?:^|/)content(?:/(?!types$).*)?$',
    message:
      'Components take data through props. Import types from content/types only.',
  },
];

const layer = (folder, restricted) => ({
  files: [`src/components/${folder}/**/*.{ts,tsx}`],
  ignores: ['**/*.stories.tsx'],
  rules: { 'no-restricted-imports': ['error', { patterns: restricted }] },
});

export default defineConfig(
  globalIgnores([
    '.agents/**',
    'character/**',
    'public/rive/**',
    '.local/**',
    'dist/**',
    'storybook-static/**',
    'test-results/**',
    'playwright-report/**',
    'coverage/**',
  ]),
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: { globals: globals.browser },
  },
  layer(
    'atoms',
    forbid('molecules', 'organisms', 'blocks', 'illustrations', 'pages'),
  ),
  layer('molecules', forbid('organisms', 'blocks', 'illustrations', 'pages')),
  layer('illustrations', forbid('molecules', 'organisms', 'blocks', 'pages')),
  layer('organisms', forbid('blocks', 'pages')),
  layer('blocks', [
    ...forbid('pages'),
    {
      // A block must stand alone: no importing a sibling block (../Other/Other).
      regex: '^\\.\\./[A-Z][A-Za-z]*/',
      message: 'Blocks are independent. Do not import one block from another.',
    },
  ]),
  ...storybook.configs['flat/recommended'],
);
