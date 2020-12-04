import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    padding: '20px',
    height: '98vh',
  },
  messages: {
    height: '80vh',
    overflowY: 'auto',
  },
  inputGroup: {
    height: '10vh',
  },
  input: {
    height: 38,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}))
