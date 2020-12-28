import React from 'react'
import { connect } from 'react-redux'
import { store } from '../../redux/store'
import { io } from 'socket.io-client'

import { convoListResponse, setSocket } from '../../redux/socket/socket.reducer'
import {
  setConvos,
  setMessageSearchResults,
  setGalleryUrls,
  setSuckCounter,
} from '../../redux/messages/messages.reducer'
import { forceRerender, setUser } from '../../redux/base/base.reducer'

console.warn = () => {}

const SocketIOProvider = ({
  user,
  socket,
  convoListResponse,
  setConvos,
  setSocket,
  setMessageSearchResults,
  setGalleryUrls,
  setSuckCounter,
  forceRerender,
}) => {
  React.useEffect(() => {
    if (!socket) return

    socket.on('login-response', (color) => {
      if (!user) return
      setUser({
        ...user,
        color,
      })
    })

    socket.on('convo-list-response', (convos) => {
      const normalizedConvos = JSON.parse(convos).reduce((acc, d) => {
        acc[d.convoid] = d
        return acc
      }, {})
      convoListResponse(normalizedConvos)
    })

    socket.on('convo-gallery-response', (imageUrls) => {
      const urls = JSON.parse(imageUrls)
      setGalleryUrls(urls)
    })

    socket.on('convo-create-response', (convoid, convoname) => {
      const convos = store.getState().messages.convos
      setConvos({
        ...convos,
        [convoid]: { convoid, convoname },
      })
    })

    socket.on('convo-join-response', (convoid, messages) => {
      setConvos({
        ...store.getState().messages.convos,
        [convoid]: {
          ...store.getState().messages.convos[convoid],
          messages: JSON.parse(messages),
        },
      })
    })

    socket.on('convo-message-response', () => {})

    socket.on(
      'convo-message-incoming',
      (convoid, todayString, alias, color, timestamp, rawtext) => {
        console.log('message arrived')
        const convos = store.getState().messages.convos
        setConvos({
          ...convos,
          [convoid]: {
            ...convos[convoid],
            messages: [
              ...(convos[convoid]['messages']
                ? convos[convoid]['messages']
                : []),
              { convoid, todayString, alias, color, timestamp, rawtext },
            ],
          },
        })
      }
    )

    socket.on('convo-search-response', (messages) => {
      setMessageSearchResults(JSON.parse(messages))
    })

    socket.on('convo-image-response', () => {
      const currentConvoid = store.getState().messages.currentConvoid
      const user = store.getState().base.user
      const socket = store.getState().socket.socket

      if (socket && user)
        socket.emit('convo-join-request', user.token, user.uid, currentConvoid)
    })

    socket.on('suck-counter-response', setSuckCounter)

    //eslint-disable-next-line
  }, [socket, setUser])

  React.useEffect(() => {
    window.addEventListener('focus', () => {
      //When socket reloads, all the old messages will just get reappended.
      store.getState().socket.socket.off()
      setSocket(
        io(
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_DEV_URL,
          {
            timeout: 180000,
          }
        )
      )
    })

    window.addEventListener('paste', (e) => {
      const currentConvoid = store.getState().messages.currentConvoid

      var items = e.clipboardData.items
      var blob

      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          blob = items[i].getAsFile()
          break
        }
      }

      if (typeof blob === 'undefined') return
      var fileReader = new FileReader()

      function _generateRandomString() {
        let ret = ''
        for (let i = 0; i < 9; i++) {
          ret += Math.round(Math.random() * 9).toString()
        }
        return ret
      }
      const fileIdentifier = _generateRandomString()

      blob.meta = fileIdentifier
      fileReader.onload = function (e) {
        socket.emit(
          'convo-message-request',
          store.getState().base.user.token,
          store.getState().base.user.uid,
          currentConvoid,
          '/image ' + fileIdentifier
        )
        store.getState().socket.uploader.submitFiles([blob])
      }
      fileReader.readAsDataURL(blob)
    })
  }, [])

  return null
}

const mapStateToProps = (state) => ({
  user: state.base.user,
  socket: state.socket.socket,
  convos: state.messages.convos,
})

const mapDispatchToProps = (dispatch) => ({
  convoListResponse: (convos) => dispatch(convoListResponse(convos)),
  setConvos: (convos) => dispatch(setConvos(convos)),
  setUser: (user) => dispatch(setUser(user)),
  setMessageSearchResults: (messages) =>
    dispatch(setMessageSearchResults(messages)),
  setSocket: (socket) => dispatch(setSocket(socket)),
  setGalleryUrls: (urls) => dispatch(setGalleryUrls(urls)),
  setSuckCounter: (count) => dispatch(setSuckCounter(count)),
  forceRerender: (randomNum) => dispatch(forceRerender(randomNum)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SocketIOProvider)
