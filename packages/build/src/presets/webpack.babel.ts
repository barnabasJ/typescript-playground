import { resolve } from 'path'

import { PresetFn } from './types'

type Options = {
    configFile?: string
}

export type BabelPreset = 'babel' | ['babel', Options]

/**
 * Genereric base config that should work for most projects
 */
const config: PresetFn<Options | void> = (
    _e,
    { configFile = resolve(__dirname, '../../babel.config.js') } = {}
) => {
    return {
        resolve: {
            extensions: ['.ts', '.tsx', 'js', 'jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: [
                        {
                            // https://webpack.js.org/loaders/babel-loader
                            loader: 'babel-loader',
                            options: {
                                configFile,
                                cacheDirectory: true,
                            },
                        },
                    ],
                },
            ],
        },
    }
}

export default config
