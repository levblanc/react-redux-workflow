const initRouteObj = (routeObj) => {
  const baseRouteObj = {
    path: routeObj.path
  }

  Object.keys(routeObj).forEach(key => {
    baseRouteObj[key] = routeObj[key]
  })

  return baseRouteObj
}

export default initRouteObj
