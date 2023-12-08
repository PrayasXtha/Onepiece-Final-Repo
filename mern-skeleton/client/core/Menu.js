// Menu.jsx

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';
import LogoImage from '../assets/images/logo.jpg';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: 'white' };
  else return { color: '#ffffff' };
};

const Menu = withRouter(({ history }) => {
  const appBarStyle = {
    backgroundColor: '#C5283D',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  };

  const buttonStyle = {
    margin: '0 20px',
  };

  const handleSignOut = () => {
    auth.clearJWT(() => history.push('/'));
  };

  return (
    <AppBar position="static" style={appBarStyle}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{
         
         
           
        
          }}
        >
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: '80px', marginRight: '10px' }}
          />

        </Typography>
        <Link to="/">
          <IconButton
            aria-label="Home"
            style={{ ...buttonStyle, ...isActive(history, '/') }}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={{ ...buttonStyle, ...isActive(history, '/users') }}>
            Users
          </Button>
        </Link>

        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button
                style={{ ...buttonStyle, ...isActive(history, '/signup') }}
              >
                Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                style={{ ...buttonStyle, ...isActive(history, '/signin') }}
              >
                Sign In
              </Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
              <Button
                style={{
                  ...buttonStyle,
                  ...isActive(
                    history,
                    `/user/${auth.isAuthenticated().user._id}`
                  ),
                }}
              >
                My Profile
              </Button>
            </Link>
            <Button color="inherit" onClick={handleSignOut}>
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
