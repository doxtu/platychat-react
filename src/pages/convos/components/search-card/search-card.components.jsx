import React from 'react'
import { connect } from 'react-redux'

import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@material-ui/core'

import useStyles from './search-card.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
}

const SearchCard = ({ socket, user, messageSearchResults }) => {
  const classes = useStyles()

  const [searchText, setSearchText] = React.useState('')

  return (
    <Card className={classes.root}>
      <Grid container spacing={1}>
        <Grid item {...gridSizes}>
          <TextField
            name='searchMessages'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item {...gridSizes}>
          <Button
            fullWidth
            variant='contained'
            onClick={() => {
              if (socket && user)
                socket.emit(
                  'convo-search-request',
                  user.token,
                  user.uid,
                  searchText
                )
              setSearchText('')
            }}>
            Search
          </Button>
        </Grid>
        <Grid className={classes.messageResults} item {...gridSizes}>
          <List dense>
            {messageSearchResults
              ? messageSearchResults.map((result, index) => (
                  <ListItem key={index}>
                    <ListItemText>
                      {`${result.alias} (${result.timestamp}) - ${result.rawtext}`}
                    </ListItemText>
                  </ListItem>
                ))
              : null}
          </List>
        </Grid>
      </Grid>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  user: state.base.user,
  messageSearchResults: state.messages.messageSearchResults,
})

export default connect(mapStateToProps)(SearchCard)
