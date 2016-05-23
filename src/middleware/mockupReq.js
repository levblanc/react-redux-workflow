import superagent   from 'superagent'
import mocker       from 'superagent-mocker'
import globalConfig from '../configs/global'
import mockupApis   from '../apiMock/index'

mocker(superagent)

const formatUrl = (api, paramObj) => {
  let query = ''

  if(paramObj.keywords){
    query = 'search'
  }else{
    query = paramObj.dateRange
  }

  return `${globalConfig.SERVER_URI}/mockup-api/${api}/${query}`
}

const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const mockupReq = (method, api, paramObj) => {
  let targetApi = ''
  if(paramObj.keywords){
    targetApi = api + 'Search'
  }else{
    targetApi = api + capitalize(Object.values(paramObj)[0])
  }

  mocker[method](formatUrl(api, paramObj), req => {
    return mockupApis[targetApi]
  })
}

export default mockupReq


