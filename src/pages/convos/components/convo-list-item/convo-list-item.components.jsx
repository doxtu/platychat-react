import React from 'react'
import { connect } from 'react-redux'

import { ListItem, ListItemText, ListItemIcon, Badge } from '@material-ui/core'

//Icons
import MessageIcon from '@material-ui/icons/Message'

const ConvoListItem = ({ user, socket, isConnected, convo, history }) => {
  return (
    <ListItem
      button
      onClick={() => {
        if (isConnected) {
          socket.send(
            JSON.stringify({
              type: 'convo-join-request',
              payload: {
                jwt: user.token,
                userid: user.uid,
                convoid: convo.convoid,
              },
            })
          )

          history.push(`/messages/${convo.convoid}`)
        }
      }}>
      <ListItemIcon>
        <Badge badgeContent={convo.unreadCount} color='primary'>
          <MessageIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary={convo.convoname} secondary={convo.participants} />
    </ListItem>
  )
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  isConnected: state.socket.isConnected,
  user: state.base.user,
})

export default connect(mapStateToProps)(ConvoListItem)
