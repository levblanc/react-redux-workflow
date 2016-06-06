export default function logger (state) {
  return next => action => {
    let dateObj      = new Date()
    let currentYear  = dateObj.getFullYear()
    let currentMonth = dateObj.getMonth() + 1
    let currentDate  = dateObj.getDate()
    let currentHour  = dateObj.getHours()
    let currentMin   = dateObj.getMinutes()
    let currentSec   = dateObj.getSeconds()
    let currentTime  = `${currentYear}-${currentMonth}-${currentDate} ${currentHour}:${currentMin}:${currentSec}`

    console.group()
    console.log(`%c ${action.type} @ ${currentTime} `, 'background-color: black; color: yellow')
    console.log('%caction', 'color: #01aafd', action)
    const result = next(action)
    console.log('%cnext state', 'color: #41b44f', state.getState())
    console.groupEnd()

    return result
  }
}
