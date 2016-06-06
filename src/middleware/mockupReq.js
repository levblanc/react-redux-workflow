import superagent      from 'superagent'
import mocker          from 'superagent-mocker'
import constants       from 'constants'
import * as mockupApis from 'apiMock/index'

mocker(superagent)

const mockupReq = (method, api) => {
  let targetPath = `${constants.SERVER_URI}/mockup-api/${api}`
  let apiArr = api.split('/')

  mocker[method](targetPath, req => {
    return mockupApis[apiArr[0]][apiArr[1]]
  })
}

export default mockupReq


