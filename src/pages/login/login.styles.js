import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    padding: '20px',
  },
  formElement: {
    width: '100%',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      color: '#000',
    },
  },
}))
