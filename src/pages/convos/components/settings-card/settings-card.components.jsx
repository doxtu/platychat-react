import React from 'react'
import { connect } from 'react-redux'

import {
  Grid,
  Card,
  Switch,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'

import { setDarkModeEnabled } from '../../../../redux/base/base.reducer'

import useStyles from './settings-card.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}

const SettingsCard = ({
  darkModeEnabled,
  setDarkModeEnabled,
  socket,
  isConnected,
  user,
}) => {
  const classes = useStyles()

  const [alias, setAlias] = React.useState('')
  const [color, setColor] = React.useState('')

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item {...gridSizes}>
          <Typography variant='h6'>Settings</Typography>
        </Grid>

        <Grid item {...gridSizes}>
          <Grid container alignItems='center'>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Typography>Dark Mode</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Switch
                checked={darkModeEnabled}
                onChange={(_, value) => {
                  setDarkModeEnabled(value)
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item {...gridSizes}>
          <Grid container alignItems='center'>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={6}>
              <Typography>Alias</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name='alias'
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Button
                onClick={() => {
                  if (user && user.token && socket && isConnected) 
                   socket.send(
                     JSON.stringify({
                       type: 'user-alias-request',
                       payload: {
                         jwt: user.token,
                         userid: user.uid,
                         alias: alias
                       },
                     })
                   ) 

                    //socket.emit(
                    //  'user-alias-request',
                    //  user.token,
                    //  user.uid,
                    //  alias
                    //)
                  setAlias('')
                }}
                fullWidth>
                Set
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item {...gridSizes}>
          <Grid container alignItems='center'>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={6}>
              <Typography>Color</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                name='color'
                placeholder='#123abf'
                value={color}
                fullWidth
                onChange={(e) => setColor(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Button
                onClick={() => {
                  if (user && user.token && socket)
                    socket.send(
                      JSON.stringify({
                        type: 'user-color-request',
                        payload: {
                          jwt: user.token,
                          userid: user.uid,
                          color: color
                        },
                      })
                    )
                    //socket.emit(
                    //  'user-color-request',
                    //  user.token,
                    //  user.uid,
                    //  color
                    //)
                  setColor('')
                }}
                fullWidth>
                Set
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  darkModeEnabled: state.base.darkModeEnabled,
  socket: state.socket.socket,
  isConnected: state.socket.isConnected,
  user: state.base.user,
})

const mapDispatchToProps = (dispatch) => ({
  setDarkModeEnabled: (isDarkModeEnabled) =>
    dispatch(setDarkModeEnabled(isDarkModeEnabled)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsCard)
