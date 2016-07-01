const initReqParams = (params) => {
  const baseParamObj = {}

  Object.keys(params).forEach(key => {
    baseParamObj[key] = params[key]
  })

  return baseParamObj
}

export default initReqParams
