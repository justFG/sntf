import { Card, CardContent, Grid, Typography, Chip, Divider } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

export default function TrainCard({ train = {}, minHeight = '68vh' }) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight,
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

        <div>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle2">{train.from || '—'}</Typography>
              <Typography variant="caption" color="text.secondary">
                Départ
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2">{train.to || '—'}</Typography>
              <Typography variant="caption" color="text.secondary">
                Arrivée
              </Typography>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}