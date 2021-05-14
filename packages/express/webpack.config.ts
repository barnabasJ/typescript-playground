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
            name: 'client',
            entry: {
                main: [
                    'webpack-hot-middleware/client?name=client&reload=false',
                    './src/client/index',
                ],
            },
            devServer: {},
            devtool: 'eval-cheap-source-map',
            output: {
                path: resolve(__dirname, './dist/client'),
                filename: 'bundle.js',
                publicPath: '/',
            },
            plugins: [new HotModuleReplacementPlugin()],
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        enforce: 'pre',
                        use: ['source-map-loader'],
                    },
                ],
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    filename: 'chunk.[hash].js',
                },
            },
        },
        loadPresets(addPresets(env, ['html-plugin', 'babel']))
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
