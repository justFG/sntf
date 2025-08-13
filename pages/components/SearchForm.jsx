import { useEffect, useState } from 'react';
import {
  Grid,
  Autocomplete,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import styles from './SearchForm.module.css';

export default function SearchForm({ stationNames = [], onSearch, loading, setError, setResults }) {
  const [from, setFrom] = useState('Alger');
  const [to, setTo] = useState('Oran');
  const [fromInput, setFromInput] = useState('Alger');
  const [toInput, setToInput] = useState('Oran');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    // if stationNames contain our defaults, keep them; useful when stations.json not loaded yet
    if (stationNames.includes('Alger')) {
      setFrom('Alger');
      setFromInput('Alger');
    }
    if (stationNames.includes('Oran')) {
      setTo('Oran');
      setToInput('Oran');
    }
  }, [stationNames]);

  const swapStations = () => {
    setFrom((prev) => {
      setTo(prev);
      return to;
    });
    setFromInput((prev) => {
      const newFromInput = toInput;
      setToInput(prev);
      return newFromInput;
    });
  };

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

  const doSearch = () => {
    // final values used for the request:
    const finalFrom = from || fromInput;
    const finalTo = to || toInput;
    const finalDate = date;

    // clear previous results/error before firing
    setError && setError(null);
    setResults && setResults([]);

    onSearch && onSearch(finalFrom, finalTo, finalDate);
  };

  const resetFilters = () => {
    setFrom('Alger');
    setTo('Oran');
    setFromInput('Alger');
    setToInput('Oran');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className={styles.wrapper}>
      <Grid container spacing={1} alignItems="end" className={styles.grid}>
        <Grid item xs={12} md={5}>
          <Autocomplete
            freeSolo
            options={stationNames}
            value={from}
            inputValue={fromInput}
            onChange={(e, v) => {
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
                sx={{ width: { xs: '39vw', md: '20vw' }}}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <PlaceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2} textAlign="center" justifySelf="center" alignSelf="center">
          <IconButton color="primary" onClick={swapStations} aria-label="swap">
            <SwapHorizIcon />
          </IconButton>
        </Grid>

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
                sx={{ width: { xs: '39vw', md: '20vw' }}}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <PlaceIcon sx={{ mr: 1, color: 'text.secondary', transform: 'rotate(180deg)' }} />,
                }}
                fullWidth
              />
            )}
          />
        </Grid>
        
       <div className={styles.date}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Date"
            type="date"
            size="medium"
            value={date}
            sx={{width: { xs: '45vw', md: '20vw' }}}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
            fullWidth
          />
        </Grid>
       </div>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />}
                onClick={doSearch}
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
      </Grid>
    </div>
  );
}