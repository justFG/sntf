// src/components/Footer.jsx
import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  ThemeProvider,
  createTheme
} from '@mui/material';

export default function Footer() {
  // Thème local pour le Footer
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
      <div style={{ paddingTop: '70px' }}>
        <Box
          component="footer"
          sx={{ bgcolor: 'primary.main', color: '#fff', py: 4, mt: 8 }}
        >
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
            <Typography variant="body2">
              © {new Date().getFullYear()} SNTF — Tous droits réservés.
            </Typography>

            <Box>
              <MuiLink
                component={NextLink}
                href="/avantagestarifaires"
                color="inherit"
                sx={{ mr: 2 }}
              >
                Avantages & Tarifs
              </MuiLink>

              <MuiLink component={NextLink} href="/contact" color="inherit">
                Contact
              </MuiLink>
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}
