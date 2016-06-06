import constants from 'constants'

// ======================================
// API host配置
// ======================================
const getApiPrefix = () => {
  if(constants.FORCE_API){
    return constants[constants.FORCE_API].apiPrefix
  }else if(__ENV_ALPHA__){
    return constants.ENV_ALPHA.apiPrefix
  }else if(__ENV_BETA__){
    return constants.ENV_BETA.apiPrefix
  }else if(__ENV_RELEASE__){
    return constants.ENV_RELEASE.apiPrefix
  }
}

// ======================================
// 根据前端代码所在环境判断路由base path
// ======================================
const getRouteBasePath = () => {
  let routeBasePath = ''

  if(__ENV_ALPHA__){
    return routeBasePath = '/ssms/'
  }else{
    return routeBasePath = '/'
  }
}


export default {
  apiPrefix    : getApiPrefix(),
  routeBasePath: getRouteBasePath()
}
