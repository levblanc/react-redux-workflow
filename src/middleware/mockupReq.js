import superagent      from 'superagent'
import mocker          from 'superagent-mocker'
import constants       from 'constants'
import * as mockupApis from 'apiMock/index'

mocker(superagent)

const mockupReq = (method, api) => {
  const targetPath = `${constants.SERVER_URI}/mockup-api/${api}`
  const apiArr = api.split('/')

  mocker[method](targetPath, () => mockupApis[apiArr[0]][apiArr[1]])
}

export default mockupReq
