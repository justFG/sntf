// src/pages/banlieue/[slug].js
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box, Typography, Button } from '@mui/material';

const theme = createTheme({
  palette: { primary: { main: '#003057' }, secondary: { main: '#D32F2F' } },
  typography: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' },
});

const DATA = {
  'alger-est': {
    title: 'Banlieue — Alger Est',
    img: '/banlieue/Est.jpg',
    details: 'Horaires & temps des trains pour l’axe Alger Est. (Contenu exemple — remplace par tes données réelles.)',
  },
  'alger-ouest': {
    title: 'Banlieue — Alger Ouest',
    img: '/banlieue/Ouest.jpg',
    details: 'Horaires & temps des trains pour l’axe Alger Ouest.',
  },
  'alger-zeralda': {
    title: 'Banlieue — Alger Zeralda',
    img: '/banlieue/Zeralda.jpg',
    details: 'Horaires & temps des trains pour Zeralda.',
  },
  'tizi-ouzou': {
    title: 'Banlieue — Tizi Ouzou',
    img: '/banlieue/Tizi.jpg',
    details: 'Horaires & temps des trains pour Tizi Ouzou.',
  },
  'aeroport': {
    title: 'Banlieue — Aéroport',
    img: '/banlieue/Aeroport.jpg',
    details: 'Horaires & temps des trains desservant l’aéroport.',
  },
  'trains-regionaux': {
    title: 'Banlieue — Trains régionaux',
    img: '/banlieue/Regionaux.jpg',
    details: 'Horaires & temps — trains régionaux (vue banlieue).',
  },
};

export default function BanlieuePage() {
  const router = useRouter();
  const { slug } = router.query;

  // Avoid rendering final content until router is ready on client to match SSR
  if (!router.isReady) {
    return (
      <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Banlieue — SNTF</title>
        </Head>
        <Navbar />
        <Container sx={{ py: 8 }}>
          <Typography>Chargement…</Typography>
        </Container>
        <Footer />
      </>
      </ThemeProvider>
    );
  }

  const info = DATA[slug] ?? null;

  if (!info) {
    return (
      <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Banlieue — SNTF</title>
        </Head>
        <Navbar />
        <Container sx={{ py: 6 }}>
          <Typography variant="h5">Page introuvable</Typography>
          <Typography variant="body2">Le trajet demandé n'existe pas.</Typography>
          <Box sx={{ mt: 3 }}>
            <Button component={NextLink} href="/" variant="outlined">Retour à l'accueil</Button>
          </Box>
        </Container>
        <Footer />
      </>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <>
      <Head>
        <title>{info.title} — SNTF</title>
      </Head>

      <Navbar />

      <Container sx={{ pt: { xs: '84px', md: '84px' }, pb: 6,display:'flex',flexFlow:'column' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          {info.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {info.details}
        </Typography>

        <Box
          component="img"
          src={info.img}
          alt={info.title}
          onClick={() => window.open(info.img, "_blank")}
          sx={{
            width: { xs: '100%', md: '75%' },
            height: '100%',
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: 3,
            mb: 4,
            justifySelf:'center',
            alignSelf:'center',
            cursor:'pointer'
          }}
        />

        <Typography variant="h6" sx={{ mb: 2 }}>Horaires & temps</Typography>
        <Typography variant="body2" color="text.secondary">
          Ici tu peux injecter les horaires réels (tableau / composant résultats).
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button component={NextLink} href="/recherchehoraire" variant="contained">
            Rechercher les horaires
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
    </ThemeProvider>
  );
}
