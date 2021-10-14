import { Router } from 'express'
import importDir from './importDir'

export default async function importRoutes({
  createRouter = Router,
  getRoutes = importDir,
  dir = __dirname
} = {}) {
  return Object
    .entries(await getRoutes(dir))
    .reduce((acc, [path, {endpoint, router}]) => endpoint === undefined
      ? acc.use(path !== 'index' ? `/${path}` : '', router)
      : acc.use(endpoint !== '' ? `/${endpoint}` : '', router),
    createRouter())
}
