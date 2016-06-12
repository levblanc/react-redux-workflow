import superagent   from 'superagent'
import mockupReq    from './mockupReq'
import constants    from 'constants'
import globalConfig from 'globalConfig'
import apiMapping   from 'api/apiMapping'

const formatUrl = (path) => {
  let reqPath = ''
  // 拼接当前环境请求的api路径
  const apiPrefix = globalConfig.apiPrefix
  const adjustedPath = path[0] !== '/' ? `/${path}` : path

  // 使用mockup api时，api host为localhost
  if (__USE_MOCKUP_API__) {
    reqPath = `${constants.SERVER_URI}/mockup-api${adjustedPath}`
  } else {
    reqPath = apiPrefix + adjustedPath
  }

  return reqPath
}

const ajaxGet = (path, { reqParams }) => new Promise((resolve, reject) => {
  const request = superagent.get(formatUrl(path)).set('token', 'mockupToken')

  if (reqParams) {
    request.query(reqParams)
  }

  request.end((err, data) => {
    err ? reject(err) : resolve(data)
  })
})

const ajaxPost = (path, { reqParams, reqData }) => new Promise((resolve, reject) => {
  const request = superagent.post(formatUrl(path)).set('token', 'mockupToken')

  if (reqParams) {
    request.query(reqParams)
  }

  if (reqData) {
    request.send(reqData)
  }

  request.end((err, { body } = {}) => {
    err ? reject(body || err) : resolve(body)
  })
})

export default () => next => action => {
  if (!action.types) {
    next(action)
    return
  }


  if (__USE_MOCKUP_API__ && typeof action.mockupApi !== 'string') {
    throw new Error('请使用String来指定mockupApi')
  }
  if (!__USE_MOCKUP_API__ && typeof action.reqApiKey !== 'string') {
    throw new Error('请使用String来指定reqApiKey')
  }
  if (!Array.isArray(action.types) || action.types.length !== 3) {
    throw new Error('action的types字段应为包含三种action type的数组。请检查。')
  }
  if (!action.types.every(type => typeof type === 'string')) {
    throw new Error('每个action type都应为String。请检查。')
  }

  const [PENDING, FULFILLED, REJECTED] = action.types
  const reqApiKey = action.reqApiKey
  const mockupApi = action.mockupApi
  const reqMethod = action.method || 'get'
  const reqParams = { ...action.reqParams }
  const reqData   = { ...action.reqData }
  let requestApi  = null

  next({
    type: PENDING,
    reqParams,
    reqData
  })

  if (reqMethod === 'get') {
    if (__USE_MOCKUP_API__) {
      mockupReq('get', mockupApi, reqParams)
      requestApi = action.mockupApi
    } else {
      requestApi = apiMapping[reqApiKey]
    }

    ajaxGet(requestApi, reqParams)
      .then(res => next({
        type: FULFILLED,
        reqParams,
        resData: res.data
      }))
      .catch(err => next({
        type: REJECTED,
        reqParams,
        err
      }))
  } else {
    if (__USE_MOCKUP_API__) {
      mockupReq('post', mockupApi)
      requestApi = action.mockupApi
    } else {
      requestApi = apiMapping[reqApiKey]
    }

    ajaxPost(requestApi, reqParams, reqData)
      .then(res => next({
        type: FULFILLED,
        reqParams,
        reqData,
        resData: res.data
      }))
      .catch(err => next({
        type: REJECTED,
        reqParams,
        reqData,
        err
      }))
  }
}

