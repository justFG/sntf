// src/pages/trains/[type].js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Container, Typography, Box, Button, Grid, Dialog, DialogContent, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/* CONTENU (images + textes) */
const DATA = {
  'banlieues': {
    title: 'Trains de Banlieues (FLIRT)',
    img: '/trains/STADLER.jpg',
    content: `Assuré par les trains FLIRT (abréviation de l'allemand Flinker Leichter Innovativer Regional-Triebzug, qui signifie « automotrice innovante agile et légère pour trafics régionaux »), un train conçu et construit par l'entreprise Suisse Stadler Rail.

La vitesse maximale du FLIRT est de 160 km/h. Les rames disposent d'attelages automatiques pour former des unités multiples.

Le FLIRT est un train articulé composé de deux à six voitures (ou caisses) avec une motorisation répartie.

Des variations du FLIRT sont en service en Suisse, Allemagne, Italie, Autriche, Hongrie, Pologne, Finlande, Norvège et Algérie.

En 2006, la SNTF a commandée 64 rames pour le réseau de banlieue d'Alger. Les premières sont livrées en 2010.

Banlieue d’Alger

La banlieue algéroise connait un important flux de voyageurs : 32.6 millions de voyageurs, équivalent à 91 000 voyageurs par jour et 900 voyageurs par train.

La progression annuelle du transport des passagers sur le réseau de la banlieue Algéroise continue d’engranger des parts de marché compte tenu de leurs services bien adaptés aux besoins spécifiques d’une clientèle constituée en grande majorité de voyageurs contractuels, d’étudiants, de corps constitués et de travailleurs, …etc

- Nombre de gares desservies par Automotrices : 26 gares desservies.

• L’axe Alger-El Harrach: Alger - Agha - Ateliers - Hussein.Dey - Caroubier -El Harrach.
• BANLIEUE OUEST : Gué de Constantine - Ain Naâdja - Baba Ali - Birtouta - Boufarik -Beni Mered - Blida - Chiffa - Mouzaia - El Affroun.
• BANLIEUE EST : Oued Smar - Bab Ezzouar - Dar El Beida - Rouiba - Réghaia -Boudouaou - Corso - Boumerdes - Tidjelabine - Thénia.

Parcours par Automotrices sur la Banlieue d’Alger
• 54 Km - Alger / Thénia.
• 68 Km - Alger / El Affroun.
`,
  },
  'regionaux': {
    title: 'Trains Régionaux (CAF ZZ 22)',
    img: '/trains/CAF.jpg',
    content: `Assuré par le train CAF ZZ 22. Ils peuvent être couplés jusqu'à 3 unités (9 voitures) par des accouplements automatiques.

Ils sont destinés à la qualité du trafic régional et disposent de la climatisation et d'un système d’information voyageur.

Chaque unité possède quatre moteurs 338 kW et la vitesse maximale est de 160 km / h.

• 28-11-2007 Réception de la première unité à Alger.
• 17/01/2008 approbation de la seconde unité livrée SNTF.
• 30-01-2008 Voyage Alger - Blida dans 28 minutes à une vitesse moyenne de 140 km / h.
• 03/02/2008 Record de vitesse Algérien en atteignant 177 km/h entre Chlef et Oran.
• 10-03-2008 Mise en service entre Alger et Sétif (~ 300 km), avec un temps de parcours de 3h33.

Service Régional : la SNTF met quotidiennement à la disposition de sa clientèle plusieurs relations régionales (Alger - Bejaia, Alger - Sétif, Oran - Chlef, etc.).
`,
  },
  'grandes-lignes': {
    title: 'Trains de Grandes Lignes',
    img: '/trains/DS.jpg',
    content: `Assurés par les locomotives diesel-électriques GM-EMD et des voitures DEV INOX.

Les trains sont robustes d’une puissance considérable pour assurer les trajets de longues distances aller-retour.

La SNTF met quotidiennement à la disposition de sa clientèle 12 trains Grandes Lignes.

Relations desservies :
• 8 trains sur la relation Alger-Oran et retour (Dont 4 trains confort)
• 2 trains sur la relation Alger-Constantine et retour.
• 2 trains sur la relation Alger-Annaba et retour.

Des travaux de réhabilitation et de modernisation sont en cours au niveau de nos Ateliers de Maintenance Ferroviaire de Sidi Bel Abbès par une main d’œuvre 100% Algérienne.
`,
  },
  'marchandises': {
    title: 'Trains Marchandises',
    img: '/trains/DR.jpg',
    content: `Dans le domaine du transport des marchandises, la SNTF met à la disposition du client plus de 11 000 wagons très variés, appropriés aux différentes exigences de transport et à des prix compétitifs.

La SNTF transporte annuellement plus de cinq millions de tonnes de marchandises de toutes natures. Les principales marchandises transportées :
- Produits minéraliers (Minerai de fer, phosphate, Pouzzolane)
- Produits Energétiques (Carburant, Lubrifiant, Produits Spéciaux)
- Produits Céréaliers (Blé, Orge, Semoule, Farine)
- Marchandises Conteneurisées
- Produits Divers (Engrais, Ciment, Produits Sidérurgiques, Rail, Ballast, Sable…)

Date : 18 février 2018
Tags : TRAINS MARCHANDISES
`,
  },
};

export default function TrainTypePage() {
  const router = useRouter();
  const { type } = router.query;
  const info = DATA[type] ?? null;
  const [openZoom, setOpenZoom] = useState(false);

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

        {/* Hero image / titre */}
        <Box sx={{ height: { xs: 220, md: 320 }, backgroundColor: '#f0f3f6', display: 'flex', alignItems: 'center' }}>
          <Container sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Box
              component="img"
              src={info.img}
              alt={info.title}
              onClick={() => setOpenZoom(true)}
              sx={{
                width: { xs: 110, md: 240 },
                height: { xs: 80, md: 140 },
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 3,
                cursor: 'pointer',
              }}
            />
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>{info.title}</Typography>
              <Button
                component={NextLink}
                href="/"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 1, textTransform: 'none' }}
                variant="outlined"
              >
                Retour à la liste
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Contenu principal */}
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{info.content}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Carte info + mini galerie (si tu veux ajouter d'autres images) */}
              <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                <Box component="img" src={info.img} alt={`${info.title} - photo`} sx={{ width: '100%', height: 220, objectFit: 'cover' }} onClick={() => setOpenZoom(true)} />
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Faits rapides</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Vitesse max : 160 km/h (selon modèle). Capacités et services varient selon la série.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenZoom(true)}>Voir en grand</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Footer />

        {/* Zoom dialog */}
        <Dialog open={openZoom} onClose={() => setOpenZoom(false)} maxWidth="lg" fullWidth>
          <DialogContent sx={{ p: 0, bgcolor: '#000' }}>
            <IconButton onClick={() => setOpenZoom(false)} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20, color: '#fff' }}>✕</IconButton>
            <Box component="img" src={info.img} alt={info.title} sx={{ width: '100%', height: { xs: '60vh', md: '80vh' }, objectFit: 'contain' }} />
          </DialogContent>
        </Dialog>
      </>
  );
}
