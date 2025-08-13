// src/components/Navbar.jsx
import React from 'react';
import NextLink from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TrainIcon from '@mui/icons-material/Train';

export default function Navbar() {
  const [anchor, setAnchor] = React.useState(null);
  const pages = [
    { label: 'Accueil', href: '/' },
    { label: 'Horaires', href: '/recherchehoraire' },
    { label: 'Avantages', href: '/avantages-tarifs' }, // demandé : avantage dans navbar
    { label: 'Services', href: '/services/en-gare' },
    { label: 'Trains', href: '/trains/banlieues' },
  ];

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <TrainIcon sx={{ mr: 1 }} />
          <Typography component={NextLink} href="/" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
            SNTF
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {pages.map((p) => (
            <Button key={p.href} component={NextLink} href={p.href} color="inherit" sx={{ textTransform: 'none' }}>
              {p.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={(e) => setAnchor(e.currentTarget)}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
            {pages.map((p) => (
              <MenuItem key={p.href} component={NextLink} href={p.href} onClick={() => setAnchor(null)}>
                {p.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
