// pages/index.js
import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import TrainIcon from '@mui/icons-material/Train';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  const [stations, setStations] = useState([]); // raw objects
  // selected values (used for selection UI if user explicitly chooses)
  const [from, setFrom] = useState('Alger');
  const [to, setTo] = useState('Oran');

  // input values (what user types) — typing doesn't update cards/results
  const [fromInput, setFromInput] = useState('Alger');
  const [toInput, setToInput] = useState('Oran');

  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // searchParams stores the parameters used in the last search
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  // load stations and default date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    fetch('/stations.json')
      .then((r) => r.json())
      .then((data) => {
        setStations(data || []);
        const names = (data || []).map((s) => s.name);
        // keep inputs in sync but do not overwrite user choices if exist
        if (names.includes('Alger')) {
          setFrom('Alger');
          setFromInput('Alger');
        }
        if (names.includes('Oran')) {
          setTo('Oran');
          setToInput('Oran');
        }
      })
      .catch((err) => {
        console.error('stations load error', err);
        setStations([]);
      });
  }, []);

  const stationNames = useMemo(() => stations.map((s) => s.name), [stations]);

  // swap both selected and input values visually
  const swapStations = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom);
      return to;
    });

    setFromInput((prevFromInput) => {
      const newFromInput = toInput;
      setToInput(prevFromInput);
      return newFromInput;
    });
  };

  // When clicking Rechercher we apply the typed input if no explicit selection
  const searchTrains = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    // final values used for the request:
    const finalFrom = from || fromInput;
    const finalTo = to || toInput;
    const finalDate = date;

    // store them as the "last search" so cards show those values only
    setSearchParams({
      from: finalFrom,
      to: finalTo,
      date: finalDate,
    });

    try {
      const formattedDate = finalDate.replace(/-/g, '');
      const res = await fetch(
        `/api/search?from=${encodeURIComponent(finalFrom)}&to=${encodeURIComponent(finalTo)}&date=${formattedDate}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erreur serveur');
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFrom('Alger');
    setTo('Oran');
    setFromInput('Alger');
    setToInput('Oran');
    setDate(new Date().toISOString().split('T')[0]);
    setResults([]);
    setError(null);
    setSearchParams({ from: '', to: '', date: '' });
  };

  // Enter behavior: accept typed input as selection (optional UX)
  const handleFromKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFrom(fromInput || from);
    }
  };
  const handleToKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTo(toInput || to);
    }
  };

  // helper to show what cards should display (only last search)
  const cardFrom = searchParams.from || '—';
  const cardTo = searchParams.to || '—';

  return (
    <>
      <Head>
        <title>SNTF — Recherche Horaires</title>
        <meta name="description" content="Recherche des horaires de train SNTF" />
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" component="h1">
                Horaires SNTF
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recherche des trajets — les cartes affichent uniquement la dernière recherche.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setResults([]);
                  setError(null);
                }}
                startIcon={<TrainIcon />}
              >
                Nouveau
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="end">
            {/* FROM */}
            <Grid item xs={12} md={5}>
              <Autocomplete
                freeSolo
                options={stationNames}
                value={from}
                inputValue={fromInput}
                onChange={(e, v) => {
                  // selection from list => set both selected and input
                  if (typeof v === 'string') {
                    setFrom(v);
                    setFromInput(v);
                  } else {
                    setFrom(v ?? '');
                    setFromInput(v ?? '');
                  }
                }}
                onInputChange={(e, v) => setFromInput(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Départ"
                    variant="outlined"
                    size="medium"
                    onKeyDown={handleFromKeyDown}
                    sx={{ '& .MuiInputBase-input': { fontSize: '1rem', py: '10px' } }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <PlaceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* swap */}
            <Grid item xs={12} md={2} textAlign="center">
              <IconButton color="primary" onClick={swapStations} aria-label="swap">
                <SwapHorizIcon />
              </IconButton>
            </Grid>

            {/* TO */}
            <Grid item xs={12} md={5}>
              <Autocomplete
                freeSolo
                options={stationNames}
                value={to}
                inputValue={toInput}
                onChange={(e, v) => {
                  if (typeof v === 'string') {
                    setTo(v);
                    setToInput(v);
                  } else {
                    setTo(v ?? '');
                    setToInput(v ?? '');
                  }
                }}
                onInputChange={(e, v) => setToInput(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Arrivée"
                    variant="outlined"
                    size="medium"
                    onKeyDown={handleToKeyDown}
                    sx={{ '& .MuiInputBase-input': { fontSize: '1rem', py: '10px' } }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <PlaceIcon sx={{ mr: 1, color: 'text.secondary', transform: 'rotate(180deg)' }} />,
                    }}
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Date"
                type="date"
                size="medium"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                fullWidth
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />}
                    onClick={searchTrains}
                    fullWidth
                    disabled={loading}
                  >
                    Rechercher
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" startIcon={<CloseIcon />} onClick={resetFilters} fullWidth>
                    Réinitialiser
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Error */}
            {error && (
              <Grid item xs={12}>
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Results area */}
        <div>
          {loading && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <CircularProgress />
                </Grid>
                <Grid item>
                  <Typography>Recherche en cours...</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {!loading && results.length === 0 && !error && (
            <Paper sx={{ p: 2, mb: 2, textAlign: 'center', color: 'text.secondary' }}>
              <Typography>Aucun résultat — lance une recherche pour voir des trajets.</Typography>
            </Paper>
          )}

          <Grid container spacing={2}>
            {results.map((train, i) => (
              // each Grid item is flex so Card stretches to uniform height
              <Grid item xs={12} key={i} sx={{ display: 'flex' }}>
                <Card
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: '60vh', // <-- large uniform card height (adjust if needed)
                  }}
                >
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <TrainIcon color="primary" />
                        </Grid>

                        <Grid item xs>
                          <Typography variant="h6">{train.train}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                            {train.depart}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Chip label={train.duree} color="success" />
                          {train.observations && (
                            <Typography variant="caption" color="warning.main" display="block" sx={{ mt: 1 }}>
                              {train.observations}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />
                    </div>

                    {/* bottom area (fixed placement) */}
                    <div>
                      <Grid container spacing={1} justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle2">{cardFrom}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Départ
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography variant="subtitle2">{cardTo}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Arrivée
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <Typography variant="caption" display="block" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          © {new Date().getFullYear()} SNTF — Service National des Transports Ferroviaires
        </Typography>
      </Container>
    </>
  );
}
