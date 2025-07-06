import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
	entries: ['src/index', 'src/adapter/index', 'src/schema/index'],
	declaration: true, // Generate .d.ts files
	clean: true,
	failOnWarn: false, // Don't fail on warnings
	externals: [
		'@notnotjake/sveltekit-auth', // Don't bundle dependencies
		'drizzle-orm'
	],
	rollup: {
		emitCJS: true,
		dts: {
			respectExternal: true
		}
	}
})
