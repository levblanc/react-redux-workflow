import React  from 'react'
import styles from './layout.styl'

class appLayout extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(<div className={ styles.appContainer }>
      { this.props.children }
    </div>)
  }
}


appLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default appLayout
