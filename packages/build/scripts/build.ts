import { resolve } from 'path'
import { Command } from 'commander'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { merge } from 'gendash'
import { Configuration } from '../src/types'
import { Env, defaultEnv } from '../src'

const program = new Command()

program.option('watch', 'starts the build in watch mode', false)
program.option('color', 'render output in color', false)
program.option('--presets [presets...]', 'presets to add to config')
program.parse(process.argv)
const options = program.opts()

console.log(options)

const configModule: {
    default:
        | Configuration
        | (Configuration[] & { parallelism?: number })
        | ((e: Env) => Configuration | Configuration[])
} = require(resolve(process.cwd(), './webpack.config'))

let config: Configuration | (Configuration[] & { parallelism?: number })
if (typeof configModule.default === 'function') {
    config = configModule.default(defaultEnv)
} else {
    config = configModule.default
}
config.parallelism = 2

console.log(config)

const compiler = webpack(config)

const server = express()

const devServerConfig = Array.isArray(config)
    ? config.map((c) => c.devServer).reduce((acc, c) => merge(acc, c))
    : config.devServer

console.log({ devServerConfig })

server.use(
    webpackDevMiddleware(compiler, {
        writeToDisk: true,
    })
)
server.use(
    webpackHotMiddleware(
        compiler as unknown as Parameters<typeof webpackHotMiddleware>[0],
        {
            log: (...args) => console.log(args),
            path: '/__webpack_hmr',
        }
    )
)

const staticMiddleWare = express.static('dist/client')

server.use(staticMiddleWare)

// server.get('/', (_req, res) => res.render('index'))

server.listen(8080, () => {
    console.log('Server is listening on port 8080')
})

export default server
