import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import TrainCard from './TrainCard';

export default function ResultsList({ results = [], searchParams = {}, loading, error }) {
  if (loading) {
    return (
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
    );
  }

  if (error) {
    return null; // error handled at parent level (index.js) or show an Alert there
  }

  if (!results || results.length === 0) {
    return (
      <Paper sx={{ p: 2, mb: 2, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>Aucun résultat — lance une recherche pour voir des trajets.</Typography>
      </Paper>
    );
  }

  return (
    <>
    <Paper sx={{ p: 2, mb: 2, textAlign: 'center', color: 'text.secondary' }}>
        {results.map((train, i) => (
        <Grid item xs={12} key={i} sx={{ display: 'flex' }}>
          <TrainCard train={train} />
        </Grid>
      ))}
      </Paper>
    </>
  );
}