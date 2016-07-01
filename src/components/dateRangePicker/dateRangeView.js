/* DateRangePicker Component
 *
 * @Required Props:
 * dateRangeType: String
 * 选中的range
 * `今日`: `0`, `本周`: `1`, `本月`: `2`, `全部`: `3`
 *
 * onRangeTypeChange: Function
 * 选择`今日`, `本周`, `本月`, `全部` 之后触发的方法
 *
 * @Optional Props:
 * filterRanges: Object
 * 不展示的range按钮名称
 *
 * 例如:
 * filterRanges={{ today: true }}
 *
 * 不展示多个按钮:
 * filterRanges={{ today: true, calendar: true }}
 *
 * 按钮和filter keys的对应关系:
 * `今日`: `today`,
 * `本周`: `week`,
 * `本月`: `month`,
 * `全部`: `all`,
 * `按日期筛选`: `calendar`
 *
 * onCalendarSave: Function
 * 日历选好日期，点击保存后触发的方法
 */
import React              from 'react'
import { DateRange }      from 'react-date-range'
import calendarTheme      from './calendarTheme'
import classNames         from 'classnames/bind'
import styles             from './dateRange.styl'

const styleClass = classNames.bind(styles)

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevRangeType   : null,
      currentRangeType: null,
      showCalendar    : false,
      startDate       : null,
      endDate         : null
    }

    this.handleCalendarSelect  = this.handleCalendarSelect.bind(this)
    this.handleCalendarBackBtn = this.handleCalendarBackBtn.bind(this)
    this.saveSelectedDates     = this.saveSelectedDates.bind(this)
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      currentRangeType: this.props.dateRangeType
    })
  }

  componentWillReceiveProps(nextProps) {
    const { dateRangeType } = this.props

    if (nextProps.dateRangeType !== dateRangeType) {
      const nextDateRangeType = nextProps.dateRangeType

      this.setState({
        ...this.state,
        currentRangeType: nextDateRangeType
      })
    }
  }

  toggleRangeSelector(dateRangeType) {
    const { onRangeTypeChange } = this.props

    this.setState({
      ...this.state,
      prevRangeType   : this.state.currentRangeType,
      currentRangeType: dateRangeType
    })

    if (dateRangeType === '4') {
      // 选择【按日期筛选】，显示日历，不马上执行数据请求
      this.setState({
        ...this.state,
        showCalendar    : !this.state.showCalendar,
        prevRangeType   : this.state.currentRangeType,
        currentRangeType: dateRangeType
      })
    } else {
      this.setState({
        ...this.state,
        startDate: null,
        endDate  : null
      })

      onRangeTypeChange(dateRangeType)
    }
  }

  handleCalendarSelect(range) {
    const startDate = range.startDate.format('YYYY-MM-DD')
    const endDate   = range.endDate.format('YYYY-MM-DD')

    this.setState({
      ...this.state,
      startDate,
      endDate,
      currentRangeType: '4'
    })
  }

  saveSelectedDates() {
    const { currentRangeType, startDate, endDate } = this.state
    const { onRangeTypeChange } = this.props

    this.setState({
      ...this.state,
      showCalendar: !this.state.showCalendar
    }, () => {
      onRangeTypeChange(currentRangeType, startDate, endDate)
    })
  }

  handleCalendarBackBtn() {
    this.setState({
      ...this.state,
      showCalendar    : !this.state.showCalendar,
      currentRangeType: this.state.prevRangeType
    })
  }

  render() {
    let filterRanges = null
    let dateRangeSelectors = [
      { range: 'today',    btnText: '今天',      type: '0' },
      { range: 'week',     btnText: '本周',      type: '1' },
      { range: 'month',    btnText: '本月',      type: '2' },
      { range: 'all',      btnText: '全部',      type: '3' },
      { range: 'calendar', btnText: '按日期筛选', type: '4' }
    ]

    if (this.props.filterRanges) {
      filterRanges = this.props.filterRanges
      dateRangeSelectors = dateRangeSelectors.filter((selector) => {
        return !filterRanges[selector.range]
      })
    }

    const pickerWidthStyle = {
      width: 152 * dateRangeSelectors.length
    }

    return (
      <div className={ styles.pickerWrapper }>
        <div className={ styles.dateRangePicker } style={ pickerWidthStyle }>
          { dateRangeSelectors.map((selector, index) => {
            const selectorClass = styleClass({
              item     : true,
              selected : this.state.currentRangeType === selector.type,
            })

            const toggleRangeSelector = this.toggleRangeSelector.bind(this, selector.type)
            /* eslint arrow-body-style: "off" */
            return (
              <div
                className={ selectorClass } key={ index }
                onClick={ toggleRangeSelector }
              >
                { selector.btnText }
              </div>
            )
          }) }
        </div>
        { this.state.showCalendar &&
          <div>
            <div className={ styles.calendarMask }></div>
            <div className={ styles.calendarWrapper }>
              <div className={ styles.calendarHeader }>
                <div className={ styles.goBackBtn } onClick={ this.handleCalendarBackBtn }></div>
                <div className={ styles.headerTitle }>日期选择</div>
                <div className={ styles.saveDates } onClick={ this.saveSelectedDates }>保存</div>
              </div>
              <DateRange
                onInit={ this.handleCalendarSelect }
                theme={ calendarTheme }
                firstDayOfWeek={ 0 }
                onChange={ this.handleCalendarSelect }
                calendars={ 1 }
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

DateRangePicker.propTypes = {
  dateRangeType     : React.PropTypes.string.isRequired,
  onRangeTypeChange : React.PropTypes.func.isRequired,
  filterRanges      : React.PropTypes.object
}

export default DateRangePicker
