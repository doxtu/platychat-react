import React from 'react'
import { connect } from 'react-redux'
import { auth } from './firebase/firebase.utils'

import AppRoutes from './App.routes'
import { BrowserRouter } from 'react-router-dom'
import SocketIOProvider from './components/socket.io-provider/socket.io-provider.components'
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  createMuiTheme,
} from '@material-ui/core'

import theme from './theme/theme'

import { setUser } from './redux/base/base.reducer'
import { setConvos } from './redux/messages/messages.reducer'

function App({ socket, user, darkModeEnabled, setUser, setConvos }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  React.useEffect(() => {
    //Authentication handling with firebase
    auth.onAuthStateChanged(async (user) => {
      if (!user) return setUser(user)

      const token = await user.getIdToken(true)

      user.token = token

      setUser(user)
    })

    if (socket && user) socket.emit('login-request', user.token, user.uid)
  }, [socket, user, setUser])

  const superTheme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          ...theme.palette,
          type: prefersDarkMode || darkModeEnabled ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode, darkModeEnabled]
  )

  return (
    <BrowserRouter basename='/platychat2'>
      <ThemeProvider theme={superTheme}>
        <CssBaseline />
        <SocketIOProvider />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  darkModeEnabled: state.base.darkModeEnabled,
  user: state.base.user,
  socket: state.socket.socket,
  convos: state.messages.convos,
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setConvos: (convos) => dispatch(setConvos(convos)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
