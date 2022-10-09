import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    height: '40px',
    marginLeft: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '400px',
      justifyContent: 'space-around',
    },
  },
  logo: {
    height: '45px',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      width: '100%',
    },
  },
  signIn: {
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      height: '30px',
      fontSize: '9px',
    },
  },
  logout: {
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',
      height: '30px',
      fontSize: '9px',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    width: 'auto',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  brandContainer: {
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));