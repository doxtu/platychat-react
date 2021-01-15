const ws = new WebSocket(
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_WS_PROD_URL
    : process.env.REACT_APP_WS_DEV_URL
)

export const SET_SOCKET = '[SOCKET] SET_SOCKET'
export const SET_IS_CONNECTED = '[SOCKET] SET_IS_CONNECTED'
export const CONVO_LIST_RESPONSE = '[SOCKET] CONVO_LIST_RESPONSE'

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
})

export const setIsConnected = (isConnected) => ({
  type: SET_IS_CONNECTED,
  payload: isConnected,
})

export const convoListResponse = (convos) => ({
  type: CONVO_LIST_RESPONSE,
  payload: convos,
})

const INITIAL_STATE = {
  socket: ws,
  isConnected: false,
}

const socketReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_SOCKET: {
      return {
        ...state,
        socket: payload,
      }
    }
    case SET_IS_CONNECTED: {
      return {
        ...state,
        isConnected: payload,
      }
    }
    default:
      return state
  }
}

export default socketReducer
