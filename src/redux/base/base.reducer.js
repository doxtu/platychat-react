const SET_DARK_MODE_ENABLED = '[BASE] SET_DARK_MODE_ENABLED'
const SET_USER = '[BASE] SET_USER'
const FORCED_RERENDER =
  'lollllllll stay mad idiots, im forcing a rerender using redux, stay mad'

export const setDarkModeEnabled = (isDarkModeEnabled) => ({
  type: SET_DARK_MODE_ENABLED,
  payload: isDarkModeEnabled,
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const forceRerender = (randomNum) => ({
  type: FORCED_RERENDER,
  payload: randomNum,
})

const INITIAL_STATE = {
  darkModeEnabled: false,
  user: null,
  rerender: 0,
}

const baseReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FORCED_RERENDER: {
      return state
    }
    case SET_DARK_MODE_ENABLED: {
      return {
        ...state,
        darkModeEnabled: payload,
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }
    case FORCED_RERENDER: {
      console.log('so mad')
      return {
        ...state,
        rerender: payload,
      }
    }
    default:
      return state
  }
}

export default baseReducer
