import { resolve } from 'path'

import {
    addPresets,
    Env,
    loadPresets,
    merge,
    PresetFn,
    Configuration,
} from '@barnabasj/build'
import { HotModuleReplacementPlugin } from 'webpack'

export default function (env: Env) {
    return [clientConfig(env), merge({}, serverConfig(env))]
}

function clientConfig(env: Env): ReturnType<PresetFn> {
    return merge<Configuration>(
        {
            entry: {
                main: [
                    'webpack-hot-middleware/client?name=client',
                    './src/client/index',
                ],
            },
            devServer: {},
            devtool: 'source-map',
            output: {
                path: resolve(__dirname, './dist/client'),
                filename: 'bundle.js',
                publicPath: '/',
            },
            plugins: [new HotModuleReplacementPlugin()],
        },
        loadPresets(addPresets(env, ['html-plugin', 'babel']))
    )
}

function serverConfig(env: Env) {
    return merge<ReturnType<PresetFn>>(
        {
            entry: {
                main: './src/server/index',
            },
            output: {
                path: resolve(__dirname, './dist/server'),
                filename: 'bundle.js',
                publicPath: '/',
            },
        },
        loadPresets(addPresets(env, ['babel']))
    )
}
