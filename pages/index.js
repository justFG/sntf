import Head from 'next/head';
import { Container, Typography, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';

export default function Home() {
  const [stations, setStations] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  useEffect(() => {
    fetch('/stations.json')
      .then((r) => r.json())
      .then((data) => setStations(data || []))
      .catch((err) => {
        console.error('stations load error', err);
        setStations([]);
      });
  }, []);

  const stationNames = useMemo(() => stations.map((s) => s.name), [stations]);

  // called by SearchForm when user clicks Rechercher
  async function handleSearch(finalFrom, finalTo, finalDate) {
    setLoading(true);
    setError(null);
    setResults([]);

    setSearchParams({ from: finalFrom, to: finalTo, date: finalDate });

    try {
      const formattedDate = finalDate.replace(/-/g, '');
      const res = await fetch(
        `/api/search?from=${encodeURIComponent(finalFrom)}&to=${encodeURIComponent(finalTo)}&date=${formattedDate}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erreur serveur');
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>SNTF — Recherche Horaires</title>
        <meta name="description" content="Recherche des horaires de train SNTF" />
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h1">
            Horaires SNTF
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recherche des trajets — les cartes affichent uniquement la dernière recherche.
          </Typography>
        </Paper>

        <SearchForm
          stationNames={stationNames}
          onSearch={handleSearch}
          loading={loading}
          setError={setError}
          setResults={setResults}
        />

        <ResultsList results={results} searchParams={searchParams} loading={loading} error={error} />

        <Typography variant="caption" display="block" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          © {new Date().getFullYear()} SNTF — Service National des Transports Ferroviaires
        </Typography>
      </Container>
    </>
  );
}