/*  这是一个container component. 它不涉及任何UI层面的东西，
    仅仅负责把渲染 presentational component(UI) 所需要的
    action 和 state 串联(connect)起来 */

import { connect } from 'react-redux'
// actions
import { getAjaxData } from '../../middleware/ajaxReqThunk'
// presentational component(UI) 文件
import demoView from './demoView'

// 使用 `reselect` 记录 state ??
const mapStateToProps = ({ demoData }) => ({
  demoData : demoData
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (paramObj) => dispatch(getAjaxData('demo', paramObj))
})


export default connect(mapStateToProps, mapDispatchToProps)(demoView)
