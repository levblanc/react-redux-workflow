export default function logger ({ getState }) {
  return next => action => {
    console.group()
    console.log('action', action)
    const result = next(action)
    console.log('state', getState())
    console.groupEnd()

    return result
  }
}
