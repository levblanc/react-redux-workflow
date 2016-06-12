import React      from 'react'
import classNames from 'classnames/bind'
import styles     from './selector.styl'

const styleClass = classNames.bind(styles)

class ProductCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: null
    }
    this.categorySelectHandler = this.categorySelectHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      categoryId: nextProps.categoryId
    })
  }

  categorySelectHandler(categoryId) {
    const { onSelect } = this.props

    this.setState({
      ...this.state,
      categoryId
    })

    onSelect(categoryId)
  }

  render() {
    const { categoryList } = this.props

    return (
      <div className={ styles.productType }>
        <div className={ styles.categoryHeader }>商品分类</div>
        { categoryList.map((categoryArr, index) => {
          /* eslint arrow-body-style: "off" */
          return (
            <ul key={ index } className={ styles.categoryRow }>
              { categoryArr.map((category) => {
                const categoryClass = styleClass({
                  categoryItem: true,
                  selected    : this.state.categoryId === category.type_id
                })
                const boundClick = this.categorySelectHandler.bind(this, category.type_id)
                return (
                  <div
                    key={ category.type_id }
                    className={ categoryClass }
                    onClick={ boundClick }
                  >
                    { category.type_name }
                  </div>
                )
              }) }
            </ul>
          )
        }) }
      </div>
    )
  }
}

ProductCategorySelector.propTypes = {
  categoryId  : React.PropTypes.string.isRequired,
  categoryList: React.PropTypes.array.isRequired,
  onSelect    : React.PropTypes.func.isRequired
}

export default ProductCategorySelector
