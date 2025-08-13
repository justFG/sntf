// src/pages/trains/[type].js
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container, Typography, Box } from '@mui/material';

const DATA = {
  'banlieues': {
    title: 'Trains de Banlieues (FLIRT)',
    content: `Assuré par les trains FLIRT ...\nLa vitesse maximale du FLIRT est de 160 km/h.\nEn 2006 la SNTF a commandé 64 rames...`,
  },
  'regionaux': {
    title: 'Trains Régionaux (CAF ZZ 22)',
    content: `Assuré par le train CAF ZZ 22... Vitesse max 160 km/h. Dates et faits historiques et services régionaux.`,
  },
  'grandes-lignes': {
    title: 'Trains de Grandes Lignes',
    content: `Assurés par locomotives diesel-électriques GM-EMD et voitures DEV INOX. 12 trains Grandes Lignes, relations Alger-Oran, Alger-Constantine, Alger-Annaba etc.`,
  },
  'marchandises': {
    title: 'Trains Marchandises',
    content: `La SNTF met à disposition plus de 11 000 wagons... principaux produits transportés : minéraux, énergétiques, céréaliers, conteneurs, divers.`,
  },
};

export default function TrainTypePage() {
  const router = useRouter();
  const { type } = router.query;
  const info = DATA[type] ?? null;

  if (!info) {
    return (
      <>
        <Head><title>Trains — SNTF</title></Head>
        <Navbar />
        <Container sx={{ py: 6 }}><Typography>Type de train introuvable.</Typography></Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head><title>{info.title} — SNTF</title></Head>
      <Navbar />
      <Box sx={{ height: 260, backgroundColor: '#f0f3f6', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>{info.title}</Typography>
        </Container>
      </Box>
      <Container sx={{ py: 4 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{info.content}</Typography>
      </Container>
      <Footer />
    </>
  );
}
