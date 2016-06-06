import React  from 'react'
import styles from './tip.styl'

class TopTip extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let tips = this.props.tips
		return (
			<div className={ styles.tip }>{ tips }</div>
		)
	}
}

TopTip.propTypes = {
	tips: React.PropTypes.string.isRequired
}

export default TopTip