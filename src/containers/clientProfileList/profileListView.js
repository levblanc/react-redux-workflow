import React from 'react'
// import sytles from './profileList.styl'

let tableHeads = [
  '车牌号',
  '车型',
  '车主',
  '联系方式',
  '创建日期'
]

let clientProfileList = [
  {
    "car_num"    : "粤A12345",//车牌号
    "model_name" : "2015款 Sportback 35 TFSI 手动进取型",//车型
    "owner_id"   : "123",//客户id
    "name"       : "张三",//姓名
    "total_price": "100",//消费总额
    "mobile"     : "13800138000",//手机
    "create_date": "2016-04-05"//日期
  },
  {
    "car_num"    : "粤A12345",//车牌号
    "model_name" : "2015款 Sportback 35 TFSI 手动进取型",//车型
    "owner_id"   : "123",//客户id
    "name"       : "张三",//姓名
    "total_price": "100",//消费总额
    "mobile"     : "13800138000",//手机
    "create_date": "2016-04-05"//日期
  },
  {
    "car_num"    : "粤A12345",//车牌号
    "model_name" : "2015款 Sportback 35 TFSI 手动进取型",//车型
    "owner_id"   : "123",//客户id
    "name"       : "张三",//姓名
    "total_price": "100",//消费总额
    "mobile"     : "13800138000",//手机
    "create_date": "2016-04-05"//日期
  }
]

const profileListView = React.createClass({
  render() {
    return (
      <table>
        <tbody>
          <tr>
            { tableHeads.map((th, index) => <th key={ index }> {th} </th>) }
          </tr>
          { clientProfileList.map((profile, index) => {
            return (<tr key={ index }>
              <td>{ profile.car_num }</td>
              <td>{ profile.model_name }</td>
              <td>{ profile.name }</td>
              <td>{ profile.mobile }</td>
              <td>{ profile.create_date }</td>
            </tr>)
          }) }
        </tbody>
      </table>)
  }
})

export default profileListView
