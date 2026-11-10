import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/site-portfolio-product-designer/' : '/',
  // character/ is the Rive character-studio project (with its own node_modules
  // and builds). It is not part of the site, so Vite must not watch or scan it.
  // The dev server always lives at http://127.0.0.1:3000 (never moves to
  // another port: strictPort makes it fail loudly instead).
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    watch: { ignored: ['**/character/**'] },
  },
  optimizeDeps: { entries: ['index.html'] },
});
