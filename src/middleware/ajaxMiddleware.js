import superagent   from 'superagent';
import mockupReq    from './mockupReq'
import constants    from 'constants'
import globalConfig from 'globalConfig'
import apiMapping   from 'api/apiMapping'

const formatUrl = (path, params) => {
  let reqPath = ''
  let targetData = ''
  // 拼接当前环境请求的api路径
  let apiPrefix = globalConfig.apiPrefix
  let adjustedPath = path[0] !== '/' ? '/' + path : path

  // 使用mockup api时，api host为localhost
  if(__USE_MOCKUP_API__){
    reqPath = `${constants.SERVER_URI}/mockup-api${adjustedPath}`
  }else{
    reqPath = apiPrefix + adjustedPath
  }

  return reqPath
}

const ajaxGet = (path, { reqParams }) => {
  return new Promise((resolve, reject) => {
    let request = superagent.get(formatUrl(path))

    if (reqParams) {
      request.query(reqParams);
    }

    if(__USE_MOCKUP_API__){
      request.end((err, data) => {
        err ? reject(err) : resolve(data)
      })
    }else{
      request.end((err, data) => {
        err ? reject(err) : resolve(data)
      })
    }
  })
}

const ajaxPost = (path, { reqParams, reqData }) => {
  return new Promise((resolve, reject) => {
    let request = superagent.post(formatUrl(path));

    if (reqParams) {
      request.query(reqParams);
    }

    if (reqData) {
      request.send(reqData);
    }

    if(__USE_MOCKUP_API__){
      request.end((err, { body } = {}) => {
        err ? reject(body || err) : resolve(body)
      })
    }else{
      request.end((err, { body } = {}) => {
        err ? reject(body || err) : resolve(body)
      })
    }
  })
}


export default store => next => action => {
  if (!action.types) {
    next(action)
    return
  }

  if (typeof action.requestApi !== 'string') {
    throw new Error('请使用String来指定 requestApi URL。')
  }
  if (!Array.isArray(action.types) || action.types.length !== 3) {
    throw new Error('action的types字段应为包含三种action type的数组。请检查。')
  }
  if (!action.types.every(type => typeof type === 'string')) {
    throw new Error('每个action type都应为String。请检查。')
  }

  const [PENDING, FULFILLED, REJECTED] = action.types
  const state    = store.getState()
  let reqMethod  = action.method || 'get'
  let requestApi = action.requestApi
  let reqParams  = { ...action.reqParams }
  let reqData    = { ...action.reqData }

  next({
    type: PENDING,
    reqParams,
    reqData
  })

  if(reqMethod === 'get'){
    if(__USE_MOCKUP_API__) {
      mockupReq('get', requestApi, reqParams)
    }else{
      requestApi = apiMapping[requestApi]
    }

    ajaxGet(requestApi, reqParams)
      .then( res => next({
          type: FULFILLED,
          reqParams,
          resData: res.data
        })
      ).catch( err => next({
        type: REJECTED,
        reqParams,
        err: err
      }))
  }else{
    if(__USE_MOCKUP_API__) {
      mockupReq('post', requestApi)
    }else{
      requestApi = apiMapping[requestApi]
    }

    ajaxPost(requestApi, reqParams, reqData)
      .then( res => next({
          type: FULFILLED,
          reqParams,
          reqData,
          resData: res.data
        })
      ).catch( err => next({
        type: REJECTED,
        reqParams,
        reqData,
        err: err
      }))
  }
}

