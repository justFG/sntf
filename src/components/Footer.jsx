// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', py: 4, mt: 6 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2">© {new Date().getFullYear()} SNTF — Tous droits réservés.</Typography>
        <Box>
          <Link href="/avantages-tarifs" passHref legacyBehavior>
            <a style={{ color: '#fff', textDecoration: 'none', marginRight: 16 }}>Avantages & Tarifs</a>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <a style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
