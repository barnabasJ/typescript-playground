import { Configuration } from 'webpack'
import merge from 'webpack-merge'

import { PresetFn } from './types'

export type BasePreset = 'base'

/**
 * Genereric base config that should work for most projects
 */
const config: PresetFn = e => {
  const baseConfig: Configuration = {
    resolve: {
      extensions: ['.js', '.json'],
    },
  }

  const modeConfig: Configuration =
    e.mode === 'production'
      ? {
          mode: 'production',
          devtool: 'nosources-source-map',
        }
      : {
          mode: 'development',
          devtool: 'source-map',
        }

  return merge(
    baseConfig,
    modeConfig,
    e.type === 'server' ? serverConfig(e) : clientConfig(e),
  )
}

const serverConfig: PresetFn = () => {
  return {
    node: {
      __dirname: false,
    },
    target: 'node',
  }
}

const clientConfig: PresetFn = () => {
  return {
    target: 'web',
  }
}

export default config
