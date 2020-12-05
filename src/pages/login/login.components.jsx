import React from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'

import { Grid, Button, TextField, Typography } from '@material-ui/core'

import useStyles from './login.styles'

const gridSizes = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 6,
  xl: 6,
}

const LoginPage = ({ history }) => {
  const classes = useStyles()

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(loginForm.username, loginForm.password)
    history.push('/convos')
  }

  const handleChange = (e) => {
    const { value, name } = e.target

    setLoginForm({
      ...loginForm,
      [name]: value,
    })
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={2} direction='column' alignContent='center'>
        <Grid item {...gridSizes}>
          <Typography variant='h5' style={{ textAlign: 'center' }}>
            Platychat <span>&#x1f986;</span>
          </Typography>
        </Grid>
        <Grid item {...gridSizes}>
          <TextField
            name='username'
            variant='outlined'
            size='small'
            placeholder='email'
            value={loginForm.username}
            onChange={handleChange}
            className={classes.formElement}
          />
        </Grid>
        <Grid item {...gridSizes}>
          <TextField
            name='password'
            type='password'
            variant='outlined'
            placeholder='password'
            size='small'
            value={loginForm.password}
            onChange={handleChange}
            className={classes.formElement}
          />
        </Grid>
        <Grid item {...gridSizes}>
          <Button
            className={`${classes.button} ${classes.formElement}`}
            type='submit'
            variant='contained'>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default withRouter(LoginPage)
