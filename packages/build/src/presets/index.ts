/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path'
import webpackMerge from 'webpack-merge'
import { map, uniqBy, takeAll, merge, concat } from 'gendash'
import { Configuration } from '../types'
import { Env } from '..'
import { Presets } from './types'

/**
 * Loads the presets from the file system
 *
 * Presets must have the following file naming convention:
 * `webpack.<preset-name>.ts`
 *
 * @param env - the environment containing the wanted presets
 * @returns - the merged config from all presets
 */
export function loadPresets(env: Env): Configuration {
    const presets = takeAll(
        uniqBy(env.presets, (preset) => {
            if (typeof preset === 'string') {
                return preset
            }
            return preset[0]
        })
    )
    return webpackMerge(
        takeAll(
            map(presets, (preset) => {
                if (typeof preset === 'string') {
                    return require(resolve(
                        __dirname,
                        `./webpack.${preset}`
                    )).default(env)
                }
                return require(resolve(
                    __dirname,
                    `./webpack.${preset[0]}`
                )).default(env, preset[1])
            })
        )
    )
}

export function addPresets(env: Readonly<Env>, presets: Presets[]): Env {
    return merge({}, env, {
        presets: takeAll(concat(env.presets, presets)),
    })
}

export default loadPresets
