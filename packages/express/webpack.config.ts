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

export default function (env: Env): Configuration[] {
    return [clientConfig(env), merge({}, serverConfig(env))]
}

function clientConfig(env: Env): ReturnType<PresetFn> {
    return merge<Configuration>(
        loadPresets(addPresets(env, ['html-plugin', 'babel'])),
        {
            name: 'client',
            entry: {
                main: [
                    'webpack-hot-middleware/client?name=client&reload=false',
                    './src/client/index',
                ],
            },
            devServer: {},
            devtool: 'eval',
            output: {
                path: resolve(__dirname, './dist/client'),
                filename: 'bundle.js',
                publicPath: '/',
            },
            mode: 'development',
            plugins: [new HotModuleReplacementPlugin()],
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    filename: 'chunk.[hash].js',
                },
            },
        }
    )
}

function serverConfig(env: Env) {
    return merge<ReturnType<PresetFn>>(
        {
            name: 'server',
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
