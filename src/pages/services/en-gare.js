// src/pages/services/en-gare.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container, Typography, Box } from '@mui/material';

export default function EnGare() {
  return (
    <>
      <Head><title>Services — En gare</title></Head>
      <Navbar />
      <Container sx={{ py: 6 }} style={{ paddingTop: '200px' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>EN GARE</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Informations sur les services en gare : billetterie, guichets, accès PMR, salles de prière, buvettes, consignes, etc.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Ouverture 7j/7</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Toutes les gares SNTF sont ouvertes au service des voyageurs 7j/7 (certains guichets peuvent fermer la nuit).
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Accessibilité</Typography>
          <Typography variant="body2" color="text.secondary">
            Facilités pour personnes à mobilité réduite, ascenseurs/ramps et accès aux quais.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
