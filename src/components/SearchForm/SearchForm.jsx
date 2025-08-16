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
import CloseIcon from '@mui/icons-material/Close';
import styles from './SearchForm.module.css';

export default function SearchForm({ stationNames = [], onSearch, loading, setError, setResults }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

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


  return (
    <div className={styles.wrapper}>
      <Grid container spacing={1} alignItems="end" className={styles.grid}>
       <div className={styles.center}>
        <div className={styles.depdest}>
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
            size="small"
            sx={{ maxWidth: '40vw',minWidth: { xs: '40vw', md: '30vw' } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Départ"
                required
                variant="outlined"
                onKeyDown={handleFromKeyDown}
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
            options={stationNames}
            freeSolo
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
            size="small"
            sx={{ maxWidth: '40vw',minWidth: { xs: '40vw', md: '30vw' } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Arrivée"
                required
                variant="outlined"
                onKeyDown={handleToKeyDown}
              />
            )}
          />
        </Grid>
        </div>
       </div>
       <div className={styles.date}>
        <Grid item xs={12} md={4}>
          <TextField
              label="Date"
              type="date"
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              sx={{ minWidth: 160 }}
              InputLabelProps={{ shrink: true }}
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}