// src/components/Footer.jsx
import React from 'react';
import NextLink from 'next/link';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <div style={{ paddingTop: '100px' }}>
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: '#fff', py: 4, mt: 8 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="body2">© {new Date().getFullYear()} SNTF — Tous droits réservés.</Typography>

        <Box>
          {/* Using MUI Link component with component={NextLink} */}
          <MuiLink component={NextLink} href="/avantages-tarifs" color="inherit" sx={{ mr: 2 }}>
            Avantages & Tarifs
          </MuiLink>

          <MuiLink component={NextLink} href="/contact" color="inherit">
            Contact
          </MuiLink>
        </Box>
      </Container>
    </Box>
    </div>
  );
}
