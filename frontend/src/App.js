import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, Router } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Login from './authService/login';
import Register from './authService/register';
import { useContext, useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { UserContext } from './UserContext';
import AuthService from './authService/authService';
import eventBus from './authService/eventBus';
import AuthVerify from './authService/authVerify';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // const decodedJwt = JSON.parse(atob(user.accessToken.split(".")[1]));

    // console.log(decodedJwt.exp  )
  };
  
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user)
    if (user) {
      setCurrentUser(user);
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };


  return (
    
    <>
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" >
          Joinable
        </Typography>
        {currentUser?
        // <Box display='flex' justifyContent='right'>
          <Button  display='flex' variant="h6" onClick={logOut} sx={{ marginLeft: "auto" }}>
            Logout
          </Button>:""
        // </Box>
      }
      </Toolbar>
    </AppBar>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {<ChevronLeftIcon /> }
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {currentUser?"":(
              <>
            <ListItem  disablePadding >
              <ListItemButton to='/register'>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={"Register"} />
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding >
              <ListItemButton to='/login'>
                <ListItemIcon>
                  {<LoginIcon></LoginIcon>}
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
            </>
            )}
        </List>
        <Divider />
      </Drawer>
        <Routes>
              <Route exact path="/login" element={<Login /> } />
              <Route exact path="/register" element={<Register />} />
        </Routes>
        <AuthVerify logOut={logOut}/>
      </>
  );
}


