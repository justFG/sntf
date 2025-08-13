// src/pages/banlieue/[slug].js
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

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
    img: '/banlieue/Aéroport.jpg', 
    details: 'Horaires & temps des trains desservant l’aéroport.',
  },
  'trains-regionaux': {
    title: 'Banlieue — Trains régionaux',
    img: '/banlieue/régionauxDRFA.jpg', 
    details: 'Horaires & temps — trains régionaux (vue banlieue).',
  },
};

export default function BanlieuePage() {
  const router = useRouter();
  const { slug } = router.query;
  const info = DATA[slug] ?? null;

  if (!info) {
    return (
      <>
        <Head><title>Banlieue — SNTF</title></Head>
        <Navbar />
        <Container sx={{ py: 6 }}>
          <Typography variant="h5">Page introuvable</Typography>
          <Typography variant="body2">Le trajet demandé n'existe pas.</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head><title>{info.title} — SNTF</title></Head>
      <Navbar />

      <Container sx={{ py: 4 }}>
        {/* Titre et description */}
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          {info.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {info.details}
        </Typography>

        {/* Image */}
        <Box
          component="img"
          src={info.img}
          alt={info.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 2,
            boxShadow: 3,
            mb: 4,
          }}
        />

        {/* Section horaires */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Horaires & temps
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ici tu peux injecter les horaires réels (tableau / composant résultats).
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Link href="/recherchehoraire">
            <Button variant="contained">Rechercher les horaires</Button>
          </Link>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
