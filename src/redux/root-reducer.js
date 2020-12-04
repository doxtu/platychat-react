import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import baseReducer from './base/base.reducer'
import messagesReducer from './messages/messages.reducer'
import socketReducer from './socket/socket.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['base', 'messages'],
}

const rootReducer = combineReducers({
  base: baseReducer,
  messages: messagesReducer,
  socket: socketReducer,
})

export default persistReducer(persistConfig, rootReducer)
