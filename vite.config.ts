import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import compileTime from 'vite-plugin-compile-time';

export default defineConfig({
	plugins: [
		compileTime(),
		{ ...threeMinifier(), enforce: "pre" },
		sveltekit()
	],
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	},
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
});
