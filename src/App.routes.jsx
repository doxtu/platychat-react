import React from 'react'
import { connect } from 'react-redux'

import { Route, Switch, Redirect } from 'react-router-dom'

import { Container } from '@material-ui/core'

import LoginPage from './pages/login/login.components'
import ConvosPage from './pages/convos/convos.components'
import MessagesPage from './pages/messages/messages.components'

const AppRoutes = ({ user }) => {
  return (
    <Container className='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            user ? <Redirect to='/convos' /> : <Redirect to='/login' />
          }
        />
        <Route
          exact
          path='/login'
          render={() => (user ? <Redirect to='/convos' /> : <LoginPage />)}
        />
        <Route
          exact
          path='/convos'
          render={() => (user ? <ConvosPage /> : <Redirect to='/login' />)}
        />
        <Route
          exact
          path='/messages/:convoid'
          render={() => (user ? <MessagesPage /> : <Redirect to='/login' />)}
        />
      </Switch>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  user: state.base.user,
})

export default connect(mapStateToProps)(AppRoutes)
