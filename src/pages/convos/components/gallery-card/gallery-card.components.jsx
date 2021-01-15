import React from 'react'
import { connect } from 'react-redux'

import { Grid, Card } from '@material-ui/core'

import useStyles from './gallery-card.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 3,
  lg: 3,
  xl: 3,
}

const GalleryCard = ({ socket, isConnected, user, urls }) => {
  const classes = useStyles()

  React.useEffect(() => {
    if (socket && isConnected && user)
      socket.send(
        JSON.stringify({
          type: 'convo-gallery-request',
          payload: {
            jwt: user.token,
            userid: user.uid,
          },
        })
      )
  }, [socket, isConnected, user])

  return (
    <Card className={classes.root}>
      <Grid container spacing={1} alignItems='center'>
        {urls
          ? urls.map((url, index) => (
              <Grid key={index} item {...gridSizes}>
                <img
                  className={classes.img}
                  alt='happy-face'
                  src={
                    process.env.NODE_ENV === 'production'
                      ? `${process.env.REACT_APP_PROD_URL}/platychat/${url.rawtext}`
                      : `${process.env.REACT_APP_DEV_URL}/platychat/${url.rawtext}`
                  }
                />
              </Grid>
            ))
          : null}
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.base.user,
  socket: state.socket.socket,
  isConnected: state.socket.isConnected,
  urls: state.messages.galleryUrls,
})

export default connect(mapStateToProps)(GalleryCard)
