import AjaxReq      from './ajaxReq'
import mockupReq    from './mockupReq'
import apiMapping   from '../api/apiMapping'

let ajaxReq = new AjaxReq()

// actions
let ajaxReqStart = () => ({ type: 'AJAX_CALL_START' })
let ajaxReqSuccess = (res) => ({ type: 'AJAX_CALL_SUCCESS', res: res })
let ajaxReqFail = (err) => ({ type: 'AJAX_CALL_FAIL', err: err })

// ajax thunk
export const getAjaxData = (api, paramObj) => {
  if(__USE_MOCKUP_API__) {
    mockupReq('get', api, paramObj)
  }else{
    api = apiMapping[api]
  }

  return dispatch => {
    dispatch(ajaxReqStart())
    ajaxReq.get(api, { params: paramObj })
      .then((res) => {
        dispatch(ajaxReqSuccess(res.data))
      })
      .catch((err) => {
        dispatch(ajaxReqFail(err))
      })
  }
}

export const postAjaxData = (api, paramObj, data) => {
  if(__USE_MOCKUP_API__) {
    mockupReq('post', api)
  }else{
    api = apiMapping[api]
  }

  return dispatch => {
    dispatch(ajaxReqStart())
    ajaxReq.post(api, { params: paramObj, data })
      .then((res) => {
        dispatch(ajaxReqSuccess(res.data))
      })
      .catch((err) => {
        dispatch(ajaxReqFail(err))
      })
  }
}
