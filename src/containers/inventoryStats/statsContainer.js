/*  这是一个container component. 它不涉及任何UI层面的东西，
    仅仅负责把渲染 presentational component(UI) 所需要的
    action 和 state 串联(connect)起来 */

import { connect } from 'react-redux'
// actions
import {
  fetchCategory,
  fetchInventory
} from './statsModule'
// presentational component(UI) 文件
import inventoryStatsView from './statsView'

const stateMapper = ({ inventoryStats }) => ({ ...inventoryStats })

const actionMapper = (dispatch) => ({
  fetchCategory: () => dispatch(fetchCategory()),
  fetchInventory: (categoryId, keyword, page) => {
    dispatch(fetchInventory(categoryId, keyword, page))
  }
})

export default connect(stateMapper, actionMapper)(inventoryStatsView)
