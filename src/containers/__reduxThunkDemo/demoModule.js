const initialState = {
   fetching: false,
   error   : false,
   resData : []
}

// reducer
export const demoDataReducer = (state = initialState, action) => {
  switch (action.type){
    case 'AJAX_CALL_START':
      return {
        ...state,
        fetching: true
      }
    case 'AJAX_CALL_SUCCESS':
      return {
        ...state,
        fetching: false,
        error   : false,
        resData : action.res
      }
    case 'AJAX_CALL_FAIL':
      return {
        ...state,
        fetching: false,
        error   : true,
        resData : action.err
      }
    default:
      return state
  }
}

export default demoDataReducer
