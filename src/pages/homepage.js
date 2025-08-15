// pages/index.js
import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, Button, TextField, Autocomplete, Card, Dialog, DialogContent, IconButton, CardContent, CardActions, Link as MuiLink } from '@mui/material';
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
  const router = useRouter();

  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [zoomSrc, setZoomSrc] = React.useState(null);
  const [stations, setStations] = React.useState([]);
  const [loadingStations, setLoadingStations] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoadingStations(true);
    fetch('/stations.json')
      .then((r) => r.json())
      .then((data) => {
        setStations(data || []);
        setLoadingStations(false);
      })
      .catch((err) => {
        console.error('stations load error', err);
        setStations([]);
        setLoadingStations(false);
        setError('Impossible de charger la liste des gares');
      });
  }, []);

  const stationNames = React.useMemo(() => stations.map((s) => s.name).filter(Boolean), [stations]);

  const isValidSelection = React.useMemo(() => {
    // valide que from et to sont dans la liste (évite valeurs libres)
    return stationNames.length > 0 && stationNames.includes(from) && stationNames.includes(to);
  }, [from, to, stationNames]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isValidSelection) {
      setError('Sélectionne une gare de la liste pour le départ et l\'arrivée');
      return;
    }
    setError(null);
    const q = new URLSearchParams({ from, to, date }).toString();
    router.push(`/recherchehoraire?${q}`);
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
                  <Autocomplete
                    options={stationNames}
                    inputValue={from}
                    onInputChange={(e, v) => setFrom(v)}
                    size="small"
                    sx={{ minWidth: 160 }}
                    disabled={loadingStations}
                    renderInput={(params) => <TextField {...params} label="Départ" required />}
                  />

                  <Autocomplete
                    options={stationNames}
                    inputValue={to}
                    onInputChange={(e, v) => setTo(v)}
                    size="small"
                    sx={{ minWidth: 160 }}
                    disabled={loadingStations}
                    renderInput={(params) => <TextField {...params} label="Arrivée" required />}
                  />

                  <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />

                  <Button type="submit" variant="contained" color="primary" disabled={!isValidSelection}>
                    Rechercher
                  </Button>
                </Box>

                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                <Box component="img" src="/sntf.png" alt="Train" sx={{ width: 160, height: 160, opacity: 0.9, borderRadius: 5, display: { xs: 'none', sm: 'block' } }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <br /><br /><br />

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
            <br />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Card sx={{ flex: 1 }}>
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

              <Card sx={{ flex: 1 }}>
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
            </Box>
          </Container>
          <br /><br />
        </Box>

        {/* Discover trains — clickable whole card */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>DÉCOUVREZ NOS TRAINS</Typography>
          <br /><br />
          <Grid container spacing={3}>
            {trains.map((t) => (
              <Grid key={t.type} item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    display: 'block',
                    cursor: 'pointer',
                    transition: 'box-shadow .25s',
                    '&:hover': { boxShadow: 6 },
                    '& .actions': {
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      opacity: 0,
                      transform: 'translateY(8px)',
                      transition: 'opacity .28s, transform .28s',
                      pointerEvents: 'none',
                    },
                    '&:hover .actions': {
                      opacity: 1,
                      transform: 'translateY(0)',
                      pointerEvents: 'auto',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={t.img}
                    alt={t.title}
                    onClick={() => router.push(`/trains/${t.type}`)}
                    sx={{
                      width: { xs: '100%', md: '21vw' },
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                      transition: 'transform .45s',
                      '&:hover': { transform: 'scale(1.06)' },
                    }}
                  />

                  <Box sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    p: 2,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}>
                    <Typography variant="h6" sx={{ lineHeight: 1 }}>{t.title}</Typography>
                  </Box>

                  <Box className="actions" aria-hidden={false}>
                    <Button
                      component={NextLink}
                      href={`/trains/${t.type}`}
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{
                        textTransform: 'none',
                        bgcolor: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.6)',
                        borderRadius: '999px',
                        backdropFilter: 'blur(4px)',
                        px: 2,
                        py: 0.5,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.18)',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      En savoir plus
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ZoomInIcon />}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setZoomSrc(t.img); }}
                      sx={{
                        textTransform: 'none',
                        bgcolor: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.6)',
                        borderRadius: '999px',
                        px: 2,
                        py: 0.5,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.18)'
                        }
                      }}
                    >
                      Zoom
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Dialog zoom (comme avant) */}
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
