/*  这是一个container component. 它不涉及任何UI层面的东西，
    仅仅负责把渲染 presentational component(UI) 所需要的
    action 和 state 串联(connect)起来 */

import { connect } from 'react-redux'
// actions
// import { ??actions?? } from './profileListModule'

// presentational component(UI) 文件
import profileListView from './profileListView'

// 使用 `reselect` 记录 state ??
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(profileListView)
