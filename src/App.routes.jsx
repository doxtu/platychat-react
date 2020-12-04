import React from 'react'
import { connect } from 'react-redux'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { Container } from '@material-ui/core'

import LoginPage from './pages/login/login.components'
import ConvosPage from './pages/convos/convos.components'
import MessagesPage from './pages/messages/messages.components'

const AppRoutes = ({ match, user }) => {
  return (
    <Container className='App'>
      {/* {!user ? <Redirect to='/login' /> : null}
      {user && match.path === '/' ? <Redirect to='/convos' /> : null}
      {user && match.path === '/login' ? <Redirect to='/convos' /> : null} */}
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
        <Route exact path='/convos' component={ConvosPage} />
        <Route exact path='/messages/:convoid' component={MessagesPage} />
      </Switch>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  user: state.base.user,
})

export default connect(mapStateToProps)(withRouter(AppRoutes))
