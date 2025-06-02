import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Orders', path: '/orders' },
  { label: 'Customers', path: '/customers' },
  { label: 'Marketing Campaigns', path: '/campaigns' },
  { label: 'Analysis', path: '/analysis' }
];

function Navbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" style={{ background: "#2563eb" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>
            Xeno CRM
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map(item => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  borderBottom: location.pathname === item.path ? "2px solid #fff" : "none"
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: 'none' } }}
      >
        <List>
          {navItems.map(item => (
            <ListItem button key={item.path} component={Link} to={item.path} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
