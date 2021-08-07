import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import LoginButton from '../../ZeroAuthHelper/LoginAndLogout/Login0'
import LogoutButton from '../../ZeroAuthHelper/LoginAndLogout/Logout0'
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '@media(max-width:600px)': {
        width: 50,
        display: 'flex',
        justifyContent: 'space-around'
      }
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
      textTransform: 'none',
      fontSize: 'inherit',
      fontWeight: 700,
      '@media(max-width:600px)': {
        width: '20%'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize: '1.25em',
      textAlign: 'center',
      fontWeight: 700,
    },
    userName: {
      marginRight: 30,
      fontSize: '1.25em',
      fontWeight: 700,
    },
    toolBar: {
      fontSize: '1rem',
      '@media(max-width:600px)': {
        fontSize: '0.6rem'
      }
    }

  }),
);

export default function FieldsViewBar(props: any) {
  const { onAddFieldForm } = props
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={'mui-fixed'} style={{ background: '#3498DB ' }} >
        <Toolbar className={classes.toolBar}>
          {onAddFieldForm ?
            <Link className={classes.link} to="/">
              {'Reserve Field'}
            </Link>
            :
            <Link className={classes.link} to="/NewFieldForm">
              {'Add New Field'}
            </Link>
          }
          {onAddFieldForm ?
            <Typography variant="h6" className={classes.title}>
              {'Add New Field'}
            </Typography>
            : <Typography variant="h6" className={classes.title}>
              {'Fields Manager'}
            </Typography>
          }
          {user ?
            (<Typography variant="h5" className={classes.userName}>
              {user.name}
            </Typography>
            )
            :
            (<div />)
          }
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
