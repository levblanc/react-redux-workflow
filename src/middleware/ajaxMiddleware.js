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

const ajaxRequest = (reqMethod, path, reqParams, reqData) => new Promise((resolve, reject) => {
  const request = superagent[reqMethod](formatUrl(path))

  reqParams && request.query(reqParams)

  reqData && request.query(reqData)

  request.end((err, data) => {
    err ? reject(err) : resolve(data)
  })
})


export default function ajaxMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (!action) return

    if (!action.types) {
      next(action)
      return
    }

    if (typeof action === 'function') {
      action(dispatch, getState)
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
    const { reqApiKey, mockupApi, reqData = null } = action
    const reqMethod = action.method || 'get'
    const reqParams = {
      token: getState().ssmsAuth.userToken || '',
      ...action.reqParams
    }

    let requestApi  = null

    next({
      type: PENDING,
      reqParams,
      reqData
    })

    if (__USE_MOCKUP_API__) {
      mockupReq(reqMethod, mockupApi, reqParams)
      requestApi = action.mockupApi
    } else {
      requestApi = apiMapping[reqApiKey]
    }

    ajaxRequest(reqMethod, requestApi, reqParams, reqData)
      .then(res => {
        let resData

        if (__USE_MOCKUP_API__) {
          resData = res.data
          next({
            type: FULFILLED,
            reqParams,
            resData
          })
        } else if (res.body.errcode === 0) {
          resData = res.body.data
          next({
            type: FULFILLED,
            reqParams,
            resData
          })
        } else {
          next({
            type: REJECTED,
            reqParams,
            err: res.body.errmsg
          })
        }
      })
      .catch(err => {
        console.error(err)

        if (err.status) {
          console.log(err.response)
          next({
            type: REJECTED,
            reqParams,
            err: `请求API接口时返回出错状态码[${err.status}]`
          })
        } else {
          next({
            type: REJECTED,
            reqParams,
            err: '请求API接口时出错，请检查网络或重试'
          })
        }
      })
  }
}

