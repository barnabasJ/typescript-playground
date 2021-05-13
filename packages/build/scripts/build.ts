import { Command } from 'commander'
import express from 'express'
import { resolve } from 'path'
import webpack, { Configuration } from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
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

server.use(
    webpackDevMiddleware(compiler, {
        writeToDisk: true,
        publicPath: '/',
        serverSideRender: true,
    })
)
server.use(
    webpackHotMiddleware(
        compiler as unknown as Parameters<typeof webpackHotMiddleware>[0]
    )
)

const staticMiddleWare = express.static('dist/client')

server.use(staticMiddleWare)

// server.get('/', (_req, res) => res.render('index'))

server.listen(8080, () => {
    console.log('Server is listening on port 8080')
})

export default server