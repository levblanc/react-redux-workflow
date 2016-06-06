import globalConfig from '../configs/global'

let { routeBasePath } = globalConfig

const routeObjParser = (routeObj) => {
  let targetRoute = [`${routeBasePath}${routeObj.path}`]
  let { childRoutes } = routeObj

  Object.keys(childRoutes).forEach((key, index, arr) => {
    targetRoute.push(`${key}/${ childRoutes[key] }`)
  })

  return targetRoute.join('/')
}

export default routeObjParser
