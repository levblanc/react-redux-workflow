import constants from 'constants'

// ======================================
// API host配置
// ======================================
const getApiPrefix = () => {
  let apiPrefix = ''
  if (constants.FORCE_API) {
    apiPrefix = constants[constants.FORCE_API].apiPrefix
  } else if (__ENV_ALPHA__) {
    apiPrefix = constants.ENV_ALPHA.apiPrefix
  } else if (__ENV_BETA__) {
    apiPrefix = constants.ENV_BETA.apiPrefix
  } else if (__ENV_RELEASE__) {
    apiPrefix = constants.ENV_RELEASE.apiPrefix
  } else {
    apiPrefix = constants.ENV_ALPHA.apiPrefix
  }

  return apiPrefix
}

// ======================================
// 根据前端代码所在环境判断路由base path
// ======================================
const getRouteBasePath = () => {
  let routeBasePath = ''

  if (__ENV_ALPHA__) {
    routeBasePath = '/ssms/'
  } else {
    routeBasePath = '/'
  }

  return routeBasePath
}


export default {
  apiPrefix    : getApiPrefix(),
  routeBasePath: getRouteBasePath()
}
