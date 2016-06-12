import globalConfig from '../configs/global'

const { routeBasePath } = globalConfig

const routeObjParser = (routeObj) => {
  const baseRoute = `${routeBasePath}${routeObj.path}`
  const { childRoutes } = routeObj
  let finalRoute = ''

  if (childRoutes) {
    const routeArr = [baseRoute]
    Object.keys(childRoutes).forEach((key) => {
      routeArr.push(`${key}/${childRoutes[key]}`)
    })
    finalRoute = routeArr.join('/')
  } else {
    finalRoute = baseRoute
  }

  return finalRoute
}

export default routeObjParser
