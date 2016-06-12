export default function logger(state) {
  return next => action => {
    const dateObj      = new Date()
    const currentYear  = dateObj.getFullYear()
    const currentMonth = dateObj.getMonth() + 1
    const currentDate  = dateObj.getDate()
    const currentHour  = dateObj.getHours()
    const currentMin   = dateObj.getMinutes()
    const currentSec   = dateObj.getSeconds()
    const dateInfo     = `${currentYear}-${currentMonth}-${currentDate}`
    const timeInfo     = `${currentHour}:${currentMin}:${currentSec}`

    console.group()
    console.log(`%c ${action.type} @ ${dateInfo} ${timeInfo}`, 'background-color: black; color: yellow')
    console.log('%caction', 'color: #01aafd', action)
    const result = next(action)
    console.log('%cnext state', 'color: #41b44f', state.getState())
    console.groupEnd()

    return result
  }
}
