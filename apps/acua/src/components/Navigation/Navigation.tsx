import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { navRoutes } from '../../routes/routes';
import { auth } from '../../util/firebase';
import { User } from 'firebase/auth';

const drawerWidth = 240;

interface NavigationProps {
  children?: React.ReactNode;
}

export default function Navigation(props: Readonly<NavigationProps>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        {loading ? (
          <Box sx={{ mx: 'auto' }}>
            <CircularProgress />
          </Box>
        ) : !user ? (
          <Grid
            container
            justifyContent="space-between"
            sx={{ display: 'flex' }}
          >
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" component={Link} to="/signup">
              Sign up
            </Button>
          </Grid>
        ) : (
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="h1">
              {user.displayName}
            </Typography>
            <Box display="flex">
              <IconButton component={Link} to="/edit-profile">
                <ManageAccountsIcon />
              </IconButton>
              <IconButton onClick={(e) => handleSignout()}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Grid>
        )}
      </Toolbar>
      <Divider />
      <List>
        {navRoutes.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            component={Link}
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Apartment Complex Utility App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

function handleSignout(): void {
  auth.signOut();
}
