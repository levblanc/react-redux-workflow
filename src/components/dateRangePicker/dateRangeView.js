import React              from 'react'
import { DateRange }      from 'react-date-range'
import calendarTheme      from './calendarTheme'
import classNames         from 'classnames/bind'
import styles             from './dateRange.styl'

const styleClass = classNames.bind(styles)

const dateRangeSelectors = [
  { btnText: '今天', type: '0' },
  { btnText: '本周', type: '1' },
  { btnText: '本月', type: '2' },
  { btnText: '全部', type: '3' }
]

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

    this.toggleRangeSelector  = this.toggleRangeSelector.bind(this)
    this.handleCalendarSelect = this.handleCalendarSelect.bind(this)
    this.toggleCalendar       = this.toggleCalendar.bind(this)
    this.calendarBackHandler  = this.calendarBackHandler.bind(this)
    this.saveSelectedDates    = this.saveSelectedDates.bind(this)
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      currentRangeType: this.props.dateRangeType
    })
  }

  toggleRangeSelector(dateRangeType) {
    const { onSelectRangeType } = this.props

    this.setState({
      ...this.state,
      currentRangeType: dateRangeType,
      prevRangeType   : this.state.currentRangeType
    })

    onSelectRangeType(dateRangeType)
  }

  handleCalendarSelect(range) {
    const startDate = range.startDate.format('YYYY-MM-DD')
    const endDate = range.endDate.format('YYYY-MM-DD')

    this.setState({
      ...this.state,
      startDate,
      endDate
    })
  }

  toggleCalendar() {
    this.setState({
      ...this.state,
      showCalendar    : !this.state.showCalendar,
      prevRangeType   : this.state.currentRangeType,
      currentRangeType: 'calendar'
    })
  }

  calendarBackHandler() {
    this.setState({
      ...this.state,
      showCalendar    : !this.state.showCalendar,
      currentRangeType: this.state.prevRangeType
    })
  }

  saveSelectedDates() {
    const { startDate, endDate } = this.state
    const { onCalendarSave } = this.props

    this.toggleCalendar()
    onCalendarSave(startDate, endDate)
  }

  render() {
    const { useCalendar } = this.props

    return (
      <div>
        <div className={ styles.dateRangePicker }>
          { dateRangeSelectors.map((selector, index) => {
            const selectorClass = styleClass({
              item       : true,
              selected   : this.state.currentRangeType === selector.type,
              useCalendar
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
          { useCalendar &&
            <div
              className={ styleClass({
                item       : true,
                selected   : this.state.currentRangeType === 'calendar',
                useCalendar
              }) }
              onClick={ this.toggleCalendar }
            >
              按日期筛选
            </div>
          }
        </div>
        { this.state.showCalendar &&
          <div>
            <div className={ styles.calendarMask }></div>
            <div className={ styles.calendarWrapper }>
              <div className={ styles.calendarHeader }>日期选择
                <div className={ styles.goBackBtn } onClick={ this.calendarBackHandler }></div>
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
  dateRangeType    : React.PropTypes.string.isRequired,
  useCalendar      : React.PropTypes.bool.isRequired,
  onCalendarSave   : React.PropTypes.func,
  onSelectRangeType: React.PropTypes.func.isRequired
}

export default DateRangePicker
