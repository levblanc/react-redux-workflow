import React      from 'react'
import classNames from 'classnames/bind'
import styles     from './tableHead.styl'

const styleClass = classNames.bind(styles)

const TableHead = ({ headerList, noBackground = false, borderIndex = null }) => {
  const tableRowClass = styleClass({
    tableHeadRow: true,
    noBackground
  })
  return (
    <tr className={ tableRowClass }>
      { headerList.map((thead, index) => {
        const theadClass = styleClass({
          tableHead: true,
          noBorder : borderIndex !== index
        })
        return (
          <th className={ theadClass } key={ index }>
            { thead }
          </th>
        ) })
      }
    </tr>
  )
}

TableHead.propTypes = {
  headerList: React.PropTypes.array.isRequired,
  noBackground: React.PropTypes.bool,
  borderIndex : React.PropTypes.number
}

export default TableHead

