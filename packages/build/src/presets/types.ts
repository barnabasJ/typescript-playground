import { Env } from '..'
import { Configuration } from '../types'

import { BabelPreset } from './webpack.babel'
import { BasePreset } from './webpack.base'
import { HTMLPluginPreset } from './webpack.html-plugin'

/**
 * A Preset can either be just the name of the preset or
 * a tuple containing the name and options for the preset
 */
export type Preset = string | [string, Record<string, unknown>]

export type PresetFn<S = void> = (env: Env, options: S) => Configuration

/**
 * Allows Typescript to check both the preset and its options
 */
export type Presets = 'pnp' | BasePreset | HTMLPluginPreset | BabelPreset
