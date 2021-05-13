import { Configuration } from 'webpack'

import { Env } from '../webpack.config'

import { BasePreset } from './webpack.base'

/**
 * A Preset can either be just the name of the preset or
 * a tuple containing the name and options for the preset
 */
export type Preset = string | [string, Record<string, any>]

export type PresetFn<S = void> = (env: Env, options: S) => Configuration

/**
 * Allows Typescript to check both the preset and its options
 */
export type Presets = BasePreset
