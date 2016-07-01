const initialState = {
  userToken    : null,
  tokenType    : null,
  tokenUpdateAt: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN_UPDATE':
      return {
        ...state,
        userToken    : action.userToken,
        tokenType    : action.tokenType,
        tokenUpdateAt: action.tokenUpdateAt
      }
    default:
      return state
  }
}

export const updateToken = (globalState, locationQuery) => {
  const { userToken }  = globalState.ssmsAuth
  const queryToken     = locationQuery.token
  const queryTokenType = locationQuery.token_type
  const currentTime    = new Date().getTime()
  let action

  if (queryToken && (userToken !== queryToken)) {
    // 更新token
    action = {
      type         : 'TOKEN_UPDATE',
      userToken    : queryToken,
      tokenType    : queryTokenType,
      tokenUpdateAt: currentTime
    }
  } else {
    // token已是最新
    action = {
      type: 'TOKEN_NOT_CHANGE'
    }
  }

  return action
}

export default authReducer
