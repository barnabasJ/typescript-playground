import { resolve } from 'path'
import { Command } from 'commander'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
    })
)
server.use(
    // @ts-expect-error the middleware has a different type for the compiler than webpack itself
    webpackHotMiddleware(compiler, {
        log: (...args) => console.log(args),
        path: '/__webpack_hmr',
    })
)

const staticMiddleWare = express.static('dist/client')

server.use(staticMiddleWare)

// server.get('/', (_req, res) => res.render('index'))

const port = 8080

server.listen(port, () => {
    console.log('Server is listening on port 8080')
})

export default server
