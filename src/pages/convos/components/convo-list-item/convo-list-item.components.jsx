import React from 'react'
import { connect } from 'react-redux'

import { ListItem, ListItemText, ListItemIcon, Badge } from '@material-ui/core'

//Icons
import MessageIcon from '@material-ui/icons/Message'

const ConvoListItem = ({ user, socket, convo, history }) => {
  return (
    <ListItem
      button
      onClick={() => {
        socket.emit('convo-join-request', user.token, user.uid, convo.convoid)
        history.push(`/messages/${convo.convoid}`)
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
  user: state.base.user,
})

export default connect(mapStateToProps)(ConvoListItem)
