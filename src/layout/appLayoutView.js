import React from 'react'
// import classes from './layout.styl'
// import '../../styles/core.scss'

const appLayout = ({ children }) => (
  <div className='appContainer'>
    { children }
  </div>
)

// CoreLayout.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

export default appLayout
