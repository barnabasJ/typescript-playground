import express from 'express'
import { resolve } from 'path'

import webpack from 'webpack'

debugger

const config = require(resolve(process.cwd(), './webpack.config'))

const compiler = webpack(config)

import webpackDevMiddleware from 'webpack-dev-middleware'

const server = express()

server.use(webpackDevMiddleware(compiler))

const staticMiddleWare = express.static('dist')

server.use(staticMiddleWare)

export default server
