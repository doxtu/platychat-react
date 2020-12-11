import React from 'react'
import { connect } from 'react-redux'

import { Card, Grid, Typography, Fab } from '@material-ui/core'

import useStyles from './suck-counter-card.styles'

const SuckCounterCard = ({ user, socket, suckCount }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h6'>SUCK COUNTER</Typography>
        </Grid>
        <Grid item>
          <Typography>
            <span>&#x1f61b;</span>
            <span>&#x1f61b;</span>
            <span>&#x1f61b;</span>
          </Typography>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Fab
                color='primary'
                onClick={() => {
                  if (socket && user)
                    socket.emit(
                      'suck-increment-request',
                      user.token,
                      user.uid,
                      -1
                    )
                }}>
                OPPS
              </Fab>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
              <Typography className={classes.alignText} variant='h1'>
                {suckCount}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Fab
                color='primary'
                onClick={() => {
                  if (socket && user)
                    socket.emit(
                      'suck-increment-request',
                      user.token,
                      user.uid,
                      1
                    )
                }}>
                SUCK
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.base.user,
  socket: state.socket.socket,
  suckCount: state.messages.suckCount,
})

export default connect(mapStateToProps)(SuckCounterCard)
