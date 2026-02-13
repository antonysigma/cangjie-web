import process from 'process';
import esbuild from 'esbuild';
import vuePlugin from 'esbuild-plugin-vue3';

const settings = {
	entryPoints: ['src/main.ts'],
	bundle: true,
	minify: true,
	sourcemap: true,
	outdir: 'dist/',
    publicPath: './',
	plugins: [vuePlugin()],
	target: ['chrome143'],
	logLevel: 'info',
	loader: {
		'.svg': 'dataurl',
		'.jpg': 'file',
		'.woff2': 'file',
		'.woff': 'empty',
		'.ttf': 'empty',
	},
};

const is_watch = process.argv.includes('--watch');

if(!is_watch) {
	esbuild.build(settings);
} else {
	const ctx = await esbuild.context(settings);
	ctx.watch();

	ctx.serve({
		servedir: settings.outdir,
	});
}