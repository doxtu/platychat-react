import { io } from 'socket.io-client'

const socket = io('https://doxtu.me')
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
      return {
        ...state,
        socket: payload,
      }
    }
    default:
      return state
  }
}

export default socketReducer
