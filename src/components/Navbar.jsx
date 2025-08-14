// src/components/Navbar.jsx
import React from 'react';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TrainIcon from '@mui/icons-material/Train';

export default function Navbar() {
  const [anchor, setAnchor] = React.useState(null);

  const pages = [
    { label: 'Accueil', href: '/' },
    { label: 'Horaires', href: '/recherchehoraire' },
    { label: 'Avantages', href: '/avantages-tarifs' },
    { label: 'Services', href: '/services/en-gare' },
    { label: 'Trains', href: '/trains/banlieues' },
  ];

  // Thème local pour la Navbar
  const theme = createTheme({
    palette: {
      primary: { main: '#003057' },
      secondary: { main: '#D32F2F' },
    },
    typography: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: '64px' }}>
        <AppBar
          position="fixed"
          color="primary"
          elevation={3}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <img src="/logo.png" alt="logo"/>
              <Button
                component={NextLink}
                href="/"
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                S. N. T. F
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((p) => (
                <Button
                  key={p.href}
                  component={NextLink}
                  href={p.href}
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  {p.label}
                </Button>
              ))}
            </Box>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="inherit"
                onClick={(e) => setAnchor(e.currentTarget)}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
              >
                {pages.map((p) => (
                  <MenuItem
                    key={p.href}
                    component={NextLink}
                    href={p.href}
                    onClick={() => setAnchor(null)}
                  >
                    {p.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
