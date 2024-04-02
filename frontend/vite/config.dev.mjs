import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		sveltekit(),
	],
	server: {
		port: 5173
	},
	resolve: {
		alias: {
		  $lib: path.resolve("./src/lib"),
		},
	  },
})
