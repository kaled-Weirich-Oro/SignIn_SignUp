import "regenerator-runtime/runtime";
import express from 'express'
import { json } from 'body-parser'
import logger from 'morgan'
import path from 'path'
import setHeaders from './middlewares/setHeaders'
import routes from './utils/importRoutes.js'

const PORT = 8080
const routesDir = path.join(__dirname, 'routes')

const server = express()

server.use(json())
server.use(logger('tiny'))
server.use(setHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization,Content-Type,*',
  'Access-Control-Allow-Methods': 'HEAD,OPTIONS,GET,POST,PUT,PATCH,*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Expose-Headers': ['Location', 'Content-Location']
}))

routes({ dir: routesDir })
  .then(router => server.use(router))
  .then(() => console.log('Routes loaded'))

server.listen(PORT, () => console.log(`Server loaded on ${PORT}`))
