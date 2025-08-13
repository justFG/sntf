// src/pages/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrainIcon from '@mui/icons-material/Train';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const theme = createTheme({
  palette: {
    primary: { main: '#003057' },
    secondary: { main: '#D32F2F' },
    background: { default: '#ffffff' },
  },
  typography: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' },
});

// Small helper card
function QuickCard({ title, text, href, color = 'primary', cta = 'Voir' }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{text}</Typography>
      </CardContent>
      <CardActions>
        <Link href={href} passHref legacyBehavior>
          <Button component="a" variant="contained" color={color} size="small" sx={{ ml: 1, mb: 1 }}>
            {cta}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>SNTF — Accueil</title>
        <meta name="description" content="Accueil SNTF — horaires, services, actualités" />
      </Head>

      <Navbar />

      <main>
        {/* Banner */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                  Bienvenue à la SNTF
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                  Consultez les horaires, réservez votre billet, et découvrez nos services.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Link href="/recherchehoraire" passHref legacyBehavior>
                    <Button component="a" variant="contained" color="primary" size="large">Rechercher un horaire</Button>
                  </Link>

                  <Link href="/avantages-tarifs" passHref legacyBehavior>
                    <Button component="a" variant="outlined" color="primary" size="large">Avantages & Tarifs</Button>
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                <TrainIcon sx={{ fontSize: 160, color: 'primary.main', opacity: 0.95 }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Quick access */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Accès rapide</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <QuickCard
                title="Horaires"
                text="Consultez les horaires et planifiez votre trajet."
                href="/recherchehoraire"
                color="primary"
                cta="Ouvrir"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <QuickCard
                title="Avantages & Tarifs"
                text="Cartes réductions, abonnements et conditions."
                href="/avantages-tarifs"
                color="secondary"
                cta="Consulter"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <QuickCard
                title="Contact"
                text="Coordonnées du siège, directions régionales et ateliers."
                href="/contact"
                color="primary"
                cta="Nous contacter"
              />
            </Grid>
          </Grid>
        </Container>

        {/* Mini features row */}
        <Box sx={{ bgcolor: '#f6f8fa', py: { xs: 3, md: 5 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <AccessTimeIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Horaires fiables</Typography>
                <Typography variant="body2" color="text.secondary">Mise à jour en temps réel.</Typography>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Réservation</Typography>
                <Typography variant="body2" color="text.secondary">Billets en ligne et options.</Typography>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <SupportAgentIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Assistance</Typography>
                <Typography variant="body2" color="text.secondary">Support et informations en gare.</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* News preview */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Actualités</Typography>
            <Chip label="Nouveautés" color="secondary" />
          </Box>

          <Grid container spacing={3}>
            {[{
              title: 'Modernisation des gares',
              summary: 'Programme de rénovation et amélioration du confort des gares principales.'
            },{
              title: 'Nouveau train express',
              summary: 'Mise en service d’un express entre Alger et Oran.'
            },{
              title: 'Services améliorés',
              summary: 'Amélioration des services à bord pour un meilleur confort.'
            }].map((n, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform .18s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>{n.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{n.summary}</Typography>
                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
