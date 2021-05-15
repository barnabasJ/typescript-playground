import { merge, map, takeAll, compact, concat } from 'gendash'

import { Configuration } from './types'
import { Presets } from './presets/types'
import loadPresets from './presets'

/**
 * The environment
 *
 * This object is also passed down to all presets
 */
export type Env = {
    mode: 'production' | 'development'
    presets: Presets[]
    type?: 'client' | 'server'
    target?: 'client' | 'server'
    watch: boolean
}

/**
 * The default environment
 *
 * Presets that are both used on the server and client
 * can be added here
 */
export const defaultEnv: Env = {
    mode: 'production',
    presets: ['base'],
    watch: false,
}

/**
 * Args parsed already parsed by webpack and passed to the config function
 */
type Args = {
    color?: boolean
    watch?: boolean
}

/**
 * Entry point for webpack, parses the passed in environment
 * prepares it for further use and passes it to down to the
 * client and server configs
 */
function config(
    { presets, ...rest }: Record<string, string> = {},
    args: Args = {}
): Configuration | Configuration[] {
    const env: Env = merge(defaultEnv, rest, {
        presets: takeAll(
            compact(
                concat(
                    map(presets?.split(',') || [], (s) => s.trim() as Presets),
                    defaultEnv.presets
                )
            )
        ),
        watch: Boolean(args.watch),
    })

    return loadPresets(env)
}

export default config

export * from './presets'
export * from './presets/types'
export * from './types'
export * from 'webpack-merge'
