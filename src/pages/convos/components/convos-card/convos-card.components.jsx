import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  Grid,
  Card,
  Typography,
  List,
  TextField,
  Button,
} from '@material-ui/core'

import ConvoListItem from '../convo-list-item/convo-list-item.components'

//Icons

import useStyles from './convos-card.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}

const ConvosCard = ({ history, convos, user, socket }) => {
  const classes = useStyles()

  const [inputFields, setInputFields] = React.useState({
    convoName: '',
    messagesFilter: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputFields({
      ...inputFields,
      [name]: value,
    })
  }

  return (
    <Card className={classes.root}>
      <Grid container spacing={1}>
        <Grid item {...gridSizes}>
          <Typography variant='h6'>Messages</Typography>
        </Grid>

        <Grid item {...gridSizes}>
          <Grid container>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <TextField
                InputProps={{ className: classes.input }}
                name='convoName'
                fullWidth
                variant='outlined'
                placeholder='Convo Name...'
                onChange={handleChange}
                value={inputFields.convoName}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Button
                fullWidth
                onClick={() => {
                  socket.emit(
                    'convo-create-request',
                    user.token,
                    user.uid,
                    inputFields.convoName
                  )
                  setInputFields({ ...inputFields, convoName: '' })
                }}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item {...gridSizes}>
          <Grid container>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <TextField
                InputProps={{ className: classes.input }}
                name='messagesFilter'
                fullWidth
                variant='outlined'
                placeholder='Search...'
                value={inputFields.messagesFilter}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Button className={classes.input} fullWidth>
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.convoList} item {...gridSizes}>
          <List dense>
            {Object.keys(convos).map((convo, index) => (
              <ConvoListItem
                key={index}
                convo={convos[convo]}
                history={history}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  convos: state.messages.convos,
  user: state.base.user,
  socket: state.socket.socket,
})

export default connect(mapStateToProps)(withRouter(ConvosCard))
