import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({ out: './build' }),
		files: {
			lib: 'src/lib'
		},
		alias: {
			shared: '../shared'
		}
	}
};

export default config;
