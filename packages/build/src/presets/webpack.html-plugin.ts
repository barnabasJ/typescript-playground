import HtmlWebpackPlugin from 'html-webpack-plugin'

import { PresetFn } from './types'

export type HTMLPluginPreset =
    | 'html-plugin'
    | ['html-plugin', HtmlWebpackPlugin.Options]

/**
 * Genereric base config that should work for most projects
 */
const config: PresetFn<HtmlWebpackPlugin.Options | undefined> = (
    _e,
    config
) => {
    return {
        plugins: [new HtmlWebpackPlugin(config)],
    }
}

export default config
