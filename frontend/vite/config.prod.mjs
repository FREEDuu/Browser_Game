/**  
 * Utilizza questo adapter se vuoi vedere un anteprima localmente della build. Dopodichè npm run build -> npm run preview 
 * import adapter from '@sveltejs/adapter-static';
 * 
 * per la build di produzione è necessario usare l'adapter per vercel:
 * import adapter from '@sveltejs/adapter-vercel';
 * 
 * */

import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  kit: {
    adapter: adapter(),
  },
});