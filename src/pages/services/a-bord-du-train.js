// src/pages/services/a-bord-du-train.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

export default function ABordDuTrain() {
  return (
    <>
      <Head><title>Services — À bord du train</title></Head>
      <Navbar />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>À BORD DU TRAIN</Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          La SNTF poursuit ses efforts relatifs à la modernisation des moyens de transport en s’alignant sur les standards internationaux aussi bien au niveau des équipements de bord que du confort ; et ce afin de toujours mieux répondre aux attentes des voyageurs.
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Climatisation et Chauffage</Typography>
          <List dense>
            <ListItem><ListItemText primary="Sur l’axe Alger-Thénia et Alger-El Affroun, la totalité des trains sont assurés par des rames automotrices (électriques) récentes offrant conditionnement d’air." /></ListItem>
            <ListItem><ListItemText primary="De nouveaux autorails modernes et rapides de 200 places augmentent le confort des voyageurs." /></ListItem>
            <ListItem><ListItemText primary="Sur les lignes Alger-Oran et Alger-Constantine, des voitures réhabilitées, 1ère/2ème classe et voitures restaurant, sont mises à disposition." /></ListItem>
          </List>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Système de sonorisation</Typography>
          <Typography variant="body2" color="text.secondary">
            Toutes les rames automotrices et autorails sont dotés d’un système sonore et visuel d’information (gares, destination, heure, température).
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Personnel & services</Typography>
          <Typography variant="body2" color="text.secondary">
            Agents d’accueil, information, restauration (voitures restaurant), assistance à bord : contrôleurs et chefs de train assurent sécurité et confort.
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Sanitaires & nettoyage</Typography>
          <Typography variant="body2" color="text.secondary">
            Autorails et rames réhabilitées disposent de sanitaires modernes. Nettoyage quotidien assuré en partenariat avec les ateliers de maintenance.
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Restauration</Typography>
          <Typography variant="body2" color="text.secondary">
            Buvettes en gare, voitures restaurant pour grands parcours, service embarqué (thé, eau, journaux, repas sur commande).
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Equipements de sécurité</Typography>
          <List dense>
            <ListItem><ListItemText primary="Extincteurs opérationnels" /></ListItem>
            <ListItem><ListItemText primary="Boîte de secours conforme" /></ListItem>
            <ListItem><ListItemText primary="Brancard avec attelles" /></ListItem>
            <ListItem><ListItemText primary="Signaux d'alarme et fonctionnement des portes" /></ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Enfin, notre équipage veille quotidiennement à la qualité du service : information, assistance, sécurité et confort des voyageurs.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
