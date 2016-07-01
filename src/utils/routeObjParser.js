import globalConfig from '../configs/global'

const { routeBasePath } = globalConfig

const routeObjParser = (routeObj) => {
  const baseRoute  = `${routeBasePath}${routeObj.path}`
  const { params } = routeObj
  let finalRoute   = ''

  if (params) {
    const routeArr = [baseRoute]
    Object.keys(params).forEach((key) => {
      params[key] && routeArr.push(`${key}/${params[key]}`)
    })
    finalRoute = routeArr.join('/')
  } else {
    finalRoute = baseRoute
  }

  return finalRoute
}

export default routeObjParser
