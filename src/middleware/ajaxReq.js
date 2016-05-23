import superagent from 'superagent'
import globalConfig from '../configs/global'

export default class AjaxReq {
  formatUrl(path, params) {
    let reqPath = ''
    let targetData = ''
    // 拼接当前环境请求的api路径
    let apihost = globalConfig.apihost
    let adjustedPath = path[0] !== '/' ? '/' + path : path

    // 使用mockup api时，api host为localhost
    if(__USE_MOCKUP_API__){
      if(params.keywords){
        targetData = 'search'
      }else{
        targetData = params.dateRange
      }

      apihost = `${globalConfig.SERVER_URI}/mockup-api`
      reqPath = `${apihost}${adjustedPath}/${targetData}`
    }else{
      reqPath = apihost + adjustedPath
    }

    return reqPath
  }

  get(path, { params }) {
    return new Promise((resolve, reject) => {
      let request = null
      if(__USE_MOCKUP_API__){
        request = superagent.get(this.formatUrl(path, params))
      }else{
        request = superagent.get(this.formatUrl(path))
      }

      if (params) {
        request.query(params);
      }

      request.end((err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  }

  post(path, { params, data}) {
    return new Promise((resolve, reject) => {
      let request = superagent.post(this.formatUrl(path));

      if (params) {
        request.query(params);
      }

      if (data) {
        request.send(data);
      }

      request.end((err, { body } = {}) => {
        err ? reject(body || err) : resolve(body)
      })
    })
  }
}
