import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

import path from 'path';
import type { Plugin } from 'vite';
import MagicString from 'magic-string';
import { bundleRequire } from 'bundle-require';
import { uneval } from 'devalue';

export type MaybePromise<T> = T | Promise<T>

export type CompileTimeFunctionArgs = {
  /** Root directory of the Vite project */
  root: string
}

export type CompileTimeFunctionResult = MaybePromise<{
  /** Get data at compile time */
  data?: any
  /** Generate code at compile time */
  code?: string
  /** Trigger rebuild when watched files change */
  watchFiles?: string[]
}>

export type CompileTimeFunction = (
  args: CompileTimeFunctionArgs,
) => CompileTimeFunctionResult

const compileTimePlugin = (): Plugin => {
  let useSourceMap = false;
  const loadCache: Map<string, { data?: any; code?: string; watchFiles?: string[] }> = new Map();
  let root = process.cwd();

  return {
      name: "compile-time",
      enforce: "pre",

      configResolved(config) {
		console.log(config.build);
        useSourceMap = !!config.build.sourcemap
        root = config.root
      },

      configureServer(server) {
        server.watcher.on("all", (_, id) => {
          for (const [k, cache] of loadCache) {
            if (cache.watchFiles?.includes(id)) {
              loadCache.delete(k)
            }
          }
        })
      },

      async transform(code, id) {
        if (id.includes("node_modules") || !/\.(js|ts|jsx|tsx|mjs|vue|svelte)$/.test(id))
          return

        const m = [
          ...code.matchAll(/import\.meta\.compileTime\(['"`]([^'"`]+)['"`]\)/g),
        ]

        if (m.length === 0) return

        const s = new MagicString(code)
        const dir = path.dirname(id)
        for (const item of m) {
          const start = item.index!
          const end = item.index! + item[0].length
          const filepath = path.resolve(dir, item[1])

          const cacheKey = filepath
          let cache = loadCache.get(cacheKey)
          if (!cache) {
            const { mod, dependencies } = await bundleRequire({ filepath })
            const defaultExport: CompileTimeFunction | undefined =
              mod.default || mod
            cache = (defaultExport && (await defaultExport({ root }))) || {}
            cache.watchFiles = [
              filepath,
              ...(cache.watchFiles || []),
              ...dependencies.map((p) => path.resolve(p)),
            ]
            if (cache.data) {
              cache.data = uneval(cache.data)
            }
            loadCache.set(cacheKey, cache)
          }

          let replacement = "null"
          if (cache.watchFiles) {
            cache.watchFiles.forEach((filepath) => {
              this.addWatchFile(filepath)
            })
          }
          if (cache.data !== undefined) {
            replacement = cache.data
          } else if (cache.code !== undefined) {
            replacement = cache.code
          }

          s.overwrite(start, end, replacement)
        }
        return {
          code: s.toString(),
          map: useSourceMap ? s.generateMap({ source: id }) : null,
        }
      },
    }
}




export default defineConfig({
	plugins: [
		// { ...threeMinifier(), enforce: "pre" },
		sveltekit()
	],
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	},
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	server: {
		fs: {
			allow: ['.']
		}
	}
});
