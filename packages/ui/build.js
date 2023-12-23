import { postcssModules, sassPlugin } from 'esbuild-sass-plugin'

import { build } from 'esbuild'
import packageJSON from './package.json' assert { type: 'json' }

build({
  plugins: [
    sassPlugin({
      transform: postcssModules({})
    })
  ],
  bundle: true,
  entryPoints: [packageJSON.source],
  outfile: packageJSON.main,
  target: 'chrome58',
  external: Object.keys(packageJSON.peerDependencies)
})
