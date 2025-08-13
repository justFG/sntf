import { useLayoutEffect, useRef, useState } from 'react';
import { Card, CardContent, Grid, Typography, Chip, Divider, Box } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

export default function TrainCard({ train = {}, minHeight = '10vh' }) {
  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const [dividerTop, setDividerTop] = useState(null);

  // mapping selon ton API :
  const trainLabel = `${train.train ?? ''}${train.depart ? ' — ' + String(train.depart).trim() : ''}`.trim() || 'Train';
  const departureStation = String(train.arrivee ?? train.from ?? '—');
  const destination = String(train.observations ?? train.to ?? '—');
  const departureTime = String(train.duree ?? train.time ?? '');

  // calcule la position de la divider (relative au top de la card)
  useLayoutEffect(() => {
    function update() {
      const card = cardRef.current;
      const header = headerRef.current;
      if (!card || !header) return;
      const cardRect = card.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      // position = distance du bas du header par rapport au top de la card (+ petit offset)
      const top = headerRect.bottom - cardRect.top + 8; // 8px gap
      setDividerTop(top);
    }

    update();
    window.addEventListener('resize', update);
    // observer pour changements dynamiques
    const ro = new ResizeObserver(update);
    if (cardRef.current) ro.observe(cardRef.current);
    if (headerRef.current) ro.observe(headerRef.current);

    return () => {
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, [train]);

  return (
    <Card
      ref={cardRef}
      variant="outlined"
      sx={{
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight,
        mb: 2,
        border: 1.5,
        p: 0, // on gère padding via CardContent
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          // réserve l'espace à droite pour les boxes absolues (top & bottom)
          pr: { xs: 2, sm: '180px' },
          pl: 2,
          pt: 2,
          pb: 2,
        }}
      >
        {/* Header : icon + trainLabel + gare de départ */}
        <div ref={headerRef}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TrainIcon color="primary" />
            </Grid>

            <Grid item xs sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                {trainLabel}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                <strong>Gare de départ :</strong> {departureStation}
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* Footer left: autres infos éventuelles (garde dans le flux) */}
        <div>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="subtitle2">{departureStation}</Typography>
              <Typography variant="caption" color="text.secondary">
                Départ
              </Typography>
            </Grid>
            {/* Arrivée/destination est en bottom-right absolu */}
          </Grid>
        </div>
      </CardContent>

      {/* Divider full-width (calculée dynamiquement) */}
      {dividerTop !== null && (
        <Divider
          sx={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: dividerTop,
            zIndex: 0,
          }}
        />
      )}

      {/* TOP-RIGHT BOX : heure de départ (chip) + observations optionnelles */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1,
          maxWidth: { xs: '45%', sm: '36%' },
          textAlign: 'right',
          zIndex: 2,
        }}
      >
        {departureTime ? <Chip label={departureTime} color="success" /> : null}
        {/* note: observations ici peuvent contenir d'autres infos; on affiche la destination en bas-right */}
      </Box>

      {/* BOTTOM-RIGHT BOX : Destination / Arrivée collée au coin bas-droit */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          textAlign: 'right',
          zIndex: 2,
        }}
      >
        <Typography variant="subtitle2">{destination}</Typography>
        <Typography variant="caption" color="text.secondary">
          Arrivée
        </Typography>
      </Box>
    </Card>
  );
}
