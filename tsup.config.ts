import {defineConfig} from "tsup"

export default defineConfig({
    format: ['esm'],
    entry: ['src/lib/'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    sourcemap: true,
    clean: true,
    treeshake: 'recommended',
})