// src/pages/contact.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/* ---------- Header / Footer simples (remplace par tes composants si besoin) ---------- */
function HeaderSimple() {
  return (
    <Box component="header" sx={{ bgcolor: '#003057', color: '#fff', py: 2 }}>
      <Container sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TrainIcon sx={{ fontSize: 34 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          SNTF
        </Typography>
        <Box sx={{ ml: 3, display: 'flex', gap: 1 }}>
          <Link href="/" passHref legacyBehavior>
            <Button component="a" sx={{ color: '#fff' }}>Accueil</Button>
          </Link>
          <Link href="/recherchehoraire" passHref legacyBehavior>
            <Button component="a" sx={{ color: '#fff' }}>Horaires</Button>
          </Link>
          <Link href="/avantages-tarifs" passHref legacyBehavior>
            <Button component="a" sx={{ color: '#fff' }}>Avantages & Tarifs</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

function FooterSimple() {
  return (
    <Box component="footer" sx={{ bgcolor: '#003057', color: '#fff', py: 4, mt: 6 }}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} SNTF — Tous droits réservés.</Typography>
        <Box sx={{ mt: 1 }}>
          <Link href="#" passHref legacyBehavior>
            <Button component="a" sx={{ color: '#fff' }}>Mentions légales</Button>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Button component="a" sx={{ color: '#fff' }}>Politique de confidentialité</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

/* ---------- Données (extraites de ton texte) ---------- */
const headquarters = {
  title: "SIÈGE DE L'ENTREPRISE",
  addressLines: [
    "21-23 Boulevard Mohamed V, Alger."
  ],
  tel: "(213) 21 71 15 10",
  fax: "(213) 21 63 32 98 / (213) 21 63 39 34",
};

const centralDepartments = [
  { label: 'DIRECTION GÉNÉRALE', poste: '22 51 / 21 01' },
  { label: 'DIRECTION DE LA CLIENTELE', poste: '23 50' },
  { label: "DIRECTION DE L'EXPLOITATION", poste: '22 83' },
  { label: 'DIRECTION DÉLÉGUÉE À LA SÉCURITÉ DES CIRCULATIONS FERROVIAIRES', poste: '33 56' },
  { label: 'DIRECTION DU MATÉRIEL ET TRACTION', poste: '26 11 / 26 12' },
  { label: 'DIRECTION DÉLÉGUÉE À LA TRACTION', poste: '26 25' },
  { label: "DIRECTION DE L'INFRASTRUCTURE", poste: '22 56 / 32 51' },
  { label: 'DIRECTION DES FINANCES ET DE LA COMPTABILITÉ', poste: '21 30 / 21 42' },
  { label: 'DIRECTION DES RESSOURCES HUMAINES', poste: '21 05 / 21 06' },
  { label: 'DEPARTEMENT DES AFFAIRES JURIDIQUES', poste: '33 56 / 21 08' },
  { label: 'DEPARTEMENT DES AFFAIRES MÉDICALES', poste: '26 57' },
  { label: 'DIRECTION DE LA COMMUNICATION', poste: '21 72' },
  { label: 'DIRECTION DU CONTRÔLE DE GESTION', poste: '33 02 / 21 18' },
  { label: "DIRECTION DE L’INSPECTION TECHNIQUE DE LA SÉCURITÉ FERROVIAIRE", poste: '23 98' },
  { label: 'DIRECTION DES APPROVISIONNEMENTS', poste: '35 02 / 35 09' },
  { label: 'DIRECTION DU PATRIMOINE', poste: '22 91 / 22 92' },
  { label: "DIRECTION DE L'AUDIT", poste: '33 75 / 21 33' },
  { label: "DIRECTION DES SYSTÈMES D'INFORMATIONS", poste: '24 43' },
  { label: 'DIRECTION GESTION DES FILIALES, DES PARTICIPATIONS ET COOPÉRATION', poste: '21 17' },
  { label: "DIRECTION DES ŒUVRES SOCIALES", poste: '21 84' },
];

const regionalDirections = [
  {
    region: "DIRECTION DE LA RÉGION FERROVIAIRE D'ALGER",
    address: "25, 27 Rue Hassiba Ben Bouali , Alger.",
    tel: "(213) 21 73 63 66 / (213) 21 63 38 63",
    fax: "(213) 21 73 50 09 / (213) 21 74 26 66",
  },
  {
    region: "DIRECTION DE LA RÉGION FERROVIAIRE D'ORAN",
    address: "22, Rue Benzerdjeb, Oran.",
    tel: "(213) 41 39 28 81 / (213) 41 39 17 52",
    fax: "(213) 41 39 17 88",
  },
  {
    region: "DIRECTION DE LA RÉGION FERROVIAIRE DE CONSTANTINE",
    address: "2, Rue Nasri Said, Constantine.",
    tel: "(213) 31 94 99 24 / (213) 31 64 10 64",
    fax: "(213) 31 94 80 86",
  },
  {
    region: "DIRECTION DE LA RÉGION FERROVIAIRE DE ANNABA",
    address: "Gare Annaba - Voyageurs BP 705.",
    tel: "(213) 38 47 38 17 / (213) 38 47 38 06",
    fax: "(213) 38 47 38 01",
  },
];

const ateliers = [
  {
    title: "BASE PRINCIPALE DE MAINTENANCE DES LOCOMOTIVES ROUIBA (ALGER)",
    address: "15, Rue Colonel Amirouche, Rouiba, Alger",
    tel: "(213) 21 81 44 52 / (213) 21 81 19 01",
    fax: "(213) 21 81 19 01",
  },
  {
    title: "ATELIERS DE SIDI MABROUK (CONSTANTINE)",
    address: "Route de Batna 4ème Kilomètre, Sidi Mabrouk, Constantine",
    tel: "(213) 31 68 99 65 / (213) 31 61 29 11",
    fax: "(213) 31 61 41 52",
  },
  {
    title: "ATELIERS DE SIDI BEL ABBÈS",
    address: "Rue de Sidi Ferruch, Sidi Bel Abbès",
    tel: "(213) 48 54 39 82 / (213) 48 54 23 72 / (213) 48 56 04 31",
    fax: "(213) 48 54 23 72",
  },
  {
    title: "ATELIERS DE MOHAMMADIA (MASCARA)",
    address: "01 Avenue Ali Bouhlel, Mohammadia, Mascara",
    tel: "(213) 45 89 89 97 / (213) 45 89 82 75 / (213) 45 89 90 86",
    fax: "(213) 45 87 07 90",
  },
  {
    title: "ATELIER DE MAINTENANCE, REMISAGE ET NETTOYAGE DES AUTOMOTRICES ELECTRIQUES DU CAROUBIER (ALGER)",
    address: "EURL STADLER ALGERIE - 14 bis, Rue de l’ALN, Caroubier, Alger",
    tel: "(213) 21 49 83 29 / (213) 21 49 82 09 / (213) 21 49 82 08",
    fax: "(213) 21 49 83 28",
  },
];

/* ---------- Helpers ---------- */
function Tel({ number }) {
  const cleaned = number.replace(/\s+/g, '').replace(/[(),]/g, '');
  return (
    <Button
      variant="text"
      href={`tel:${cleaned}`}
      startIcon={<PhoneIcon />}
      sx={{ textTransform: 'none', p: 0 }}
    >
      {number}
    </Button>
  );
}

/* ---------- Page ---------- */
export default function ContactPage() {
  return (
    <>
      <Head>
        <title>SNTF — Nous contacter</title>
        <meta name="description" content="Contacts et directions — SNTF" />
      </Head>

      <HeaderSimple />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Left: main contact content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Nous contacter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Retrouvez ci-dessous les coordonnées du siège, des directions centrales, directions régionales et ateliers.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton aria-label="print" onClick={() => window.print()}>
                    <PrintIcon />
                  </IconButton>
                  <IconButton
                    aria-label="copy"
                    onClick={() => {
                      const allText = [
                        headquarters.addressLines.join(' '),
                        `Tél.: ${headquarters.tel}`,
                        `Fax: ${headquarters.fax}`,
                      ].join('\n');
                      navigator.clipboard?.writeText(allText);
                      // simple visual feedback
                      alert('Coordonnées du siège copiées dans le presse-papiers.');
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Siège */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{headquarters.title}</Typography>
                {headquarters.addressLines.map((line, i) => (
                  <Typography key={i} variant="body2">{line}</Typography>
                ))}
                <Box sx={{ mt: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Tel number={headquarters.tel} />
                  <Typography variant="body2">Fax: {headquarters.fax}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Directions centrales */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Directions centrales & services</Typography>
                <List dense>
                  {centralDepartments.map((d) => (
                    <ListItem key={d.label} sx={{ alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={<Typography variant="subtitle2">{d.label}</Typography>}
                        secondary={<Typography variant="body2" color="text.secondary">Poste : {d.poste}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Directions régionales */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Directions régionales ferroviaires</Typography>
                <Grid container spacing={2}>
                  {regionalDirections.map((r) => (
                    <Grid item xs={12} md={6} key={r.region}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{r.region}</Typography>
                        <Typography variant="body2">{r.address}</Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2"><strong>Tél. :</strong> {r.tel}</Typography>
                          <Typography variant="body2"><strong>Fax :</strong> {r.fax}</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Ateliers */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Ateliers & maintenance</Typography>
                <Grid container spacing={2}>
                  {ateliers.map((a) => (
                    <Grid item xs={12} md={6} key={a.title}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{a.title}</Typography>
                        <Typography variant="body2">{a.address}</Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2"><strong>Tél. :</strong> {a.tel}</Typography>
                          <Typography variant="body2"><strong>Fax :</strong> {a.fax}</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Right: quick actions / contact box */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 16 }}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Contact rapide</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Pour toute information, rendez-vous au siège ou appelez le standard.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <PhoneIcon sx={{ mt: 0.5 }} />
                  <Tel number={headquarters.tel} />
                </Box>
                <Typography variant="body2">Fax: {headquarters.fax}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Link href="/recherchehoraire" passHref legacyBehavior>
                    <Button component="a" variant="contained" fullWidth>
                      Rechercher un horaire
                    </Button>
                  </Link>
                </Box>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Guichets & démarches</Typography>
                <Typography variant="body2" color="text.secondary">
                  Pour l'obtention de cartes (carte jeune, famille nombreuse, 3ème âge), adressez-vous au guichet de votre gare. Voir les informations détaillées sur la page Avantages & Tarifs.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Link href="/avantages-tarifs" passHref legacyBehavior>
                    <Button component="a" variant="outlined" fullWidth>Avantages & Tarifs</Button>
                  </Link>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <FooterSimple />
    </>
  );
}
