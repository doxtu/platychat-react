import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'

import { Grid, Button } from '@material-ui/core'

import ConvosCard from './components/convos-card/convos-card.components'
import SearchCard from './components/search-card/search-card.components'
import SettingsCard from './components/settings-card/settings-card.components'

import useStyles from './convos.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 4,
  lg: 4,
  xl: 4,
}

const fullWidthGridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}

const ConvosPage = ({ history, socket, user }) => {
  React.useEffect(() => {
    if (socket && user) socket.emit('convo-list-request', user.token, user.uid)
  }, [socket, user])

  const classes = useStyles()

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid item {...fullWidthGridSizes}>
        <Button
          fullWidth
          onClick={() => {
            auth.signOut()
            localStorage.clear()
            history.push('/login')
          }}>
          Sign Out
        </Button>
      </Grid>
      <Grid item {...gridSizes}>
        <ConvosCard />
      </Grid>
      <Grid item {...gridSizes}>
        <SearchCard />
      </Grid>
      <Grid item {...gridSizes}>
        <SettingsCard />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  user: state.base.user,
  convos: state.messages.convos,
})

export default connect(mapStateToProps)(withRouter(ConvosPage))
