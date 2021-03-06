import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../redux/store'

import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  TextField,
} from '@material-ui/core'

import useStyles from './messages.styles'
import { setCurrentConvoid } from '../../redux/messages/messages.reducer'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}

const textFieldSizes = {
  xs: 10,
  sm: 10,
  md: 10,
  lg: 10,
  xl: 10,
}

const buttonSizes = {
  xs: 2,
  sm: 2,
  md: 2,
  lg: 2,
  xl: 2,
}

const MessagesPage = ({
  match,
  user,
  socket,
  uploader,
  convos,
  setCurrentConvoid,
  currentConvoid,
}) => {
  const projectURL = 'https://doxtu.me/platychat2'
  const convoid = match.url.split('/')[2]
  const currentConvo = convos[convoid]
  const currentMessages = currentConvo ? currentConvo.messages : []

  React.useEffect(() => {
    const interval = setInterval(() => {
      const socket = store.getState().socket.socket
      if (!socket) return
      socket.emit('convo-join-request', user.token, user.uid, convoid)
    }, 5000)

    // return clearInterval(interval)
  }, [])

  React.useEffect(() => {
    setCurrentConvoid(convoid)
  }, [currentConvoid])

  const classes = useStyles()

  const [message, setMessage] = React.useState('')
  const [list, setList] = React.useState(null)

  if (list && list.scrollTo)
    list.scrollTo({
      top: 1000000,
    })

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleFileChange = (e) => {
    var fileList = e.target.files

    for (var i = 0; i < fileList.length; i++) {
      var blob = fileList[i]

      function _generateRandomString() {
        let ret = ''
        for (let i = 0; i < 9; i++) {
          ret += Math.round(Math.random() * 9).toString()
        }
        return ret
      }
      const fileIdentifier = _generateRandomString()

      blob.meta = fileIdentifier
      var fileReader = new FileReader()
      fileReader.onload = function (e) {
        socket.emit(
          'convo-message-request',
          user.token,
          user.uid,
          currentConvoid,
          '/image ' + fileIdentifier
        )
        uploader.submitFiles([blob])
      }
      fileReader.readAsDataURL(blob)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (socket && user) {
      socket.emit(
        'convo-message-request',
        user.token,
        user.uid,
        convoid,
        message
      )
      setMessage('')
    }
  }

  return (
    <Grid className={classes.root} container>
      <Grid
        className={classes.messages}
        item
        {...gridSizes}
        ref={(e) => setList(e)}>
        <List dense>
          {currentMessages
            ? currentMessages.map((message, index) => {
                let rawtext = message.rawtext

                //replace with image tag if image
                if (/images\/platychat.+/.test(rawtext))
                  rawtext = (
                    <Box>
                      <br></br>
                      <img src={`${projectURL}/${rawtext}`} />
                    </Box>
                  )

                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <span>&#x1f997;</span>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box>
                          <span style={{ color: message.color }}>
                            {message.alias}
                          </span>
                          <span>{` ${message.timestamp} - `}</span>
                          <span>{rawtext}</span>
                        </Box>
                      }
                    />
                  </ListItem>
                )
              })
            : null}
        </List>
      </Grid>

      <Grid item {...gridSizes}>
        <input name='fileUpload' type='file' onChange={handleFileChange} />
      </Grid>

      <Grid className={classes.inputGroup} item {...gridSizes}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems='center' justify='center'>
            <Grid item {...textFieldSizes}>
              <TextField
                InputProps={{ className: classes.input }}
                name='message'
                value={message}
                variant='outlined'
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item {...buttonSizes}>
              <Button
                className={`${classes.input} ${classes.button}`}
                fullWidth
                type='submit'
                variant='outlined'>
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  user: state.base.user,
  socket: state.socket.socket,
  uploader: state.socket.uploader,
  convos: state.messages.convos,
  currentConvoid: state.messages.currentConvoid,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentConvoid: (convoid) => dispatch(setCurrentConvoid(convoid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessagesPage))
