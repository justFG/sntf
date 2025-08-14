import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  CardContent,
  CardActions,
  Link as MuiLink,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TrainIcon from '@mui/icons-material/Train';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const theme = createTheme({
  palette: { primary: { main: '#003057' }, secondary: { main: '#D32F2F' } },
  typography: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' },
});

const banlieues = [
  { key: 'alger-est', label: 'Alger Est' },
  { key: 'alger-ouest', label: 'Alger Ouest' },
  { key: 'alger-zeralda', label: 'Alger Zeralda' },
  { key: 'tizi-ouzou', label: 'Tizi Ouzou' },
  { key: 'aeroport', label: 'Aéroport' },
  { key: 'trains-regionaux', label: 'Trains régionaux' },
];

const trains = [
  { type: 'banlieues', title: 'Trains de Banlieues', img: '/trains/STADLER.jpg' },
  { type: 'regionaux', title: 'Trains Régionaux', img: '/trains/CAF.jpg' },
  { type: 'grandes-lignes', title: 'Trains de Grandes Lignes', img: '/trains/DS.jpg' },
  { type: 'marchandises', title: 'Trains Marchandises', img: '/trains/DR.jpg' },
];

export default function Home() {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [zoomSrc, setZoomSrc] = React.useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = new URLSearchParams({ from, to, date }).toString();
    // optionally use router.push instead of window.location.href
    window.location.href = `/recherchehoraire?${q}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head><title>SNTF — Accueil</title></Head>

      <Navbar />

      <Box component="main">
        {/* Search hero */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                  RECHERCHER VOTRE TRAIN
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Trouvez rapidement les horaires et les trains disponibles. Entrez gare de départ et d'arrivée puis cliquez sur Rechercher.
                </Typography>

                <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField label="Départ" value={from} onChange={(e) => setFrom(e.target.value)} size="small" sx={{ minWidth: 160 }} />
                  <TextField label="Arrivée" value={to} onChange={(e) => setTo(e.target.value)} size="small" sx={{ minWidth: 160 }} />
                  <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} size="small" />
                  <Button type="submit" variant="contained" color="primary">Rechercher</Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                <TrainIcon sx={{ fontSize: 160, color: 'primary.main', opacity: 0.9 }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Banlieue buttons */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>HORAIRES DES TRAINS DE BANLIEUE</Typography>
          <Grid container spacing={2}>
            {banlieues.map((b) => (
              <Grid key={b.key} item xs={6} sm={4} md={2}>
                <Button component={NextLink} href={`/banlieue/${b.key}`} variant="outlined" fullWidth sx={{ textTransform: 'none' }}>
                  {b.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Services */}
        <Box sx={{ bgcolor: '#f6f8fa', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>SERVICES</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>EN GARE</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Accueil, information, billetterie, guichets et équipements en gare pour faciliter votre voyage.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={NextLink} href="/services/en-gare" size="small">Voir</Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>À BORD DU TRAIN</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Information sur le confort, la sécurité, la restauration, le personnel à bord et les équipements.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={NextLink} href="/services/a-bord-du-train" size="small">Voir</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Discover trains — clickable whole card */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>DÉCOUVREZ NOS TRAINS</Typography>

      <Grid container spacing={3}>
        {trains.map((t) => (
          <Grid key={t.type} item xs={12} sm={6} md={3}>
            {/* Container carte cliquable */}
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                display: 'block',
                cursor: 'pointer',
                transition: 'box-shadow .25s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              {/* Image responsive (100% mobile, largeur contrôlée desktop via vw pour garder la grille) */}
              <Box
                component="img"
                src={t.img}
                alt={t.title}
                sx={{
                  width: { xs: '100%', md: '21vw' },
                  height: 'auto',
                  objectFit: 'cover',
                  transition: 'transform .45s',
                  '&:hover': { transform: 'scale(1.06)' },
                }}
                onClick={() => window.location.href = `/trains/${t.type}`} // clique sur image = va sur page
              />

              {/* Overlay bas */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 2,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
                color: '#fff'
              }}>
                <Typography variant="h6" sx={{ lineHeight: 1 }}>{t.title}</Typography>

                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {/* En savoir plus : use Button component avec NextLink (pas de <a> imbriqué) */}
                  <Button
                    component={NextLink}
                    href={`/trains/${t.type}`}
                    size="small"
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIosNewIcon sx={{ transform: 'rotate(180deg)' }} />}
                    sx={{ textTransform: 'none' }}
                  >
                    En savoir plus
                  </Button>

                  {/* Zoom : ouvre modal avec l'image */}
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ZoomInIcon />}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setZoomSrc(t.img); }}
                    sx={{ textTransform: 'none' }}
                    aria-label={`Zoom ${t.title}`}
                  >
                    Zoom
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Dialog zoom */}
      <Dialog
        open={!!zoomSrc}
        onClose={() => setZoomSrc(null)}
        fullWidth
        maxWidth="lg"
        aria-labelledby="zoom-dialog"
      >
        <DialogContent sx={{ position: 'relative', p: 0, bgcolor: '#000' }}>
          <IconButton
            onClick={() => setZoomSrc(null)}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 20, color: '#fff' }}
            aria-label="Fermer"
          >
            ✕
          </IconButton>

          <Box
            component="img"
            src={zoomSrc || ''}
            alt="Zoom train"
            sx={{
              width: '100%',
              height: { xs: '60vh', md: '80vh' },
              objectFit: 'contain',
              background: '#000',
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}
