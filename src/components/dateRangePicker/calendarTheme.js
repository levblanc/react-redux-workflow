const calendarTheme = {
  DateRange : {
    background : '#ffffff'
  },
  Calendar : {
    width     : 450,
    padding   : 0,
    color     : '#95a5a6',
    background: 'transparent'
  },
  MonthAndYear : {
    fontSize    : 22,
    height      : 28,
    lineHeight  : '26px',
    padding     : '10px 0',
    marginBottom: 10,
    borderBottom: '1px solid #e1e1e1',
    boxSizing   : 'content-box'
  },
  MonthButton : {
    height      : 28,
    width       : 28,
    border      : 'none',
    background  : 'white',
  },
  MonthArrow: {
    border: '8px solid transparent'
  },
  MonthArrowPrev : {
    borderRightColor: '#bdc3c7',
  },
  MonthArrowNext : {
    borderLeftColor: '#bdc3c7',
  },
  Weekday : {
    fontSize  : 20,
    fontWeight: '600'
  },
  Day : {
    fontSize               : 18,
    cursor                 : 'pointer',
    boxSizing              : 'border-box',
    display                : 'inline-block',
    letterSpacing          : 'initial',
    textAlign              : 'center',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    transition             : 'transform .1s ease, box-shadow .1s ease, background .1s ease'
  },
  DaySelected : {
    background: '#39ac69',
    // background: '#ff6600',
    color     : '#ffffff'
  },
  DayActive : {
    background: '#39ac69',
    color     : '#ffffff',
    transform : 'scale(1.0)',
    boxShadow : 'none'
  },
  DayInRange : {
    background: '#39ac69',
    color     : '#ffffff'
  },
  DayHover: {
    background: '#bdc3c7'
  },
}

export default calendarTheme
