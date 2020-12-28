import { io } from 'socket.io-client'

const socket = io(
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL,
  {
    timeout: 180000,
  }
)
const SocketIOFileUpload = require('socketio-file-upload')

export const SET_SOCKET = '[SOCKET] SET_SOCKET'
export const CONVO_LIST_RESPONSE = '[SOCKET] CONVO_LIST_RESPONSE'

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket,
})

export const convoListResponse = (convos) => ({
  type: CONVO_LIST_RESPONSE,
  payload: convos,
})

const INITIAL_STATE = {
  socket: socket,
  uploader: new SocketIOFileUpload(socket),
}

const socketReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_SOCKET: {
      console.log('RECONNECTING', payload)
      return {
        ...state,
        socket: payload,
        uploader: new SocketIOFileUpload(payload),
      }
    }
    default:
      return state
  }
}

export default socketReducer
