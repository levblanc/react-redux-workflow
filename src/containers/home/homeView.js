import React from 'react'
import { Link  } from 'react-router'
import styles from './home.styl'

const homeView = () => (
  <div className={ styles.homeWrapper }>
    <h1>
      Welcome to the
      <span className={ styles.reactColor }> React </span>
      <span className={ styles.reduxColor }> Redux </span>
      World!!
    </h1>
    <ul>
      <li>
        <Link to={ '/client-profile-list' } className={ styles.reduxColor }> clientProfileList </Link>
      </li>
      <li>
        <Link to={ '/inventory-stats' } className={ styles.reduxColor }>inventoryStats</Link>
      </li>
      <li>
        <Link to={ '/inventory-manage-out-list' } className={ styles.reduxColor }>inventoryManageOutList</Link>
      </li>
      <li>
        <Link to={ '/inventory-in-stock' } className={ styles.reduxColor }>inventoryInStock</Link>
      </li>
      <li>
        <Link to={ '/business-summary' } className={ styles.reduxColor }>businessSummary</Link>
      </li>
      <li>
        <Link to={ '/business-cash-count' } className={ styles.reduxColor }>businessCashCount</Link>
      </li>
      <li>
        <Link to={ '/business-goods-count' } className={ styles.reduxColor }>businessGoodsCount</Link>
      </li>
      <li>
        <Link to={ '/business-income' } className={ styles.reduxColor }>businessIncome</Link>
      </li>
      <li>
        <Link to={ '/business-income-detail' } className={ styles.reduxColor }>businessIncomeDetail</Link>
      </li>
      <li>
        <Link to={ '/client-profile-edit' } className={ styles.reduxColor }>clientProfileEdit</Link>
      </li>
      <li>
        <Link to={ '/client-profile-detail' } className={ styles.reduxColor }>clientDetail</Link>
      </li>
    </ul>
  </div>
)

export default homeView
