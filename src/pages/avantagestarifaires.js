// src/pages/avantages-tarifs.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  

export default function AvantagesTarifsPage() {
  return (
    <>
      <Head>
        <title>SNTF — Avantages & Tarifs</title>
        <meta name="description" content="Informations sur les tarifs, cartes et abonnements SNTF" />
      </Head>

      <Navbar/>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Breadcrumbs + title */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" passHref legacyBehavior><a style={{ color: '#003057', textDecoration: 'none' }}>Accueil</a></Link>
            <Typography color="text.primary">Avantages & Tarifs</Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={4}>
          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Avantages & Tarifs
              </Typography>
              <Chip label="Info officielle" color="primary" />
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Retrouvez ci-dessous toutes les informations concernant les tarifs, cartes de réduction, abonnements et procédures pour les obtenir.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Sommaire */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Sommaire</Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, flexWrap: 'wrap' }}>
                {[
                  { id: 'tarif-enfant', label: 'Tarif enfant' },
                  { id: 'carte-jeune', label: 'Carte Jeune' },
                  { id: 'carte-famille', label: 'Carte Famille Nombreuse' },
                  { id: 'carte-3eme-age', label: 'Carte 3ème Âge' },
                  { id: 'voyageurs-ordinaires', label: 'Voyageurs ordinaires' },
                  { id: 'pmr', label: 'Personnes à mobilité réduite' },
                  { id: 'abonnements', label: 'Abonnements' },
                  { id: 'cartes-demi-tarif', label: 'Cartes demi-tarif' },
                  { id: 'voyages-groupes', label: 'Voyages en groupes' },
                  { id: 'regles', label: 'Règles & contrôles' },
                ].map((s) => (
                  <Button
                    key={s.id}
                    href={`#${s.id}`}
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    {s.label}
                  </Button>
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Sections (accordions for readability) */}
            <Box sx={{ mb: 2 }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Tarif enfant</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="tarif-enfant">
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Les enfants, au-dessous de 4 ans</strong> sont transportés gratuitement à la condition d’être portés sur les genoux des personnes qui les accompagnent.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Les enfants de 4 à 12 ans</strong> paient demi-place (50% de réduction) et ont droit à une place distincte.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">La Carte Jeune</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="carte-jeune">
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Avantages offerts</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Cette carte permet à son détenteur de bénéficier d’une réduction de <strong>20%</strong> lors de l’achat de leur billet.
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Validité</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>1 an à compter de la date de délivrance.</Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Bénéficiaire</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Carte nominative délivrée aux jeunes âgés de <strong>15 à 28 ans</strong>.
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Parcours</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Valable pour parcours de plus de 100 km (Banlieue Algéroise, Services Régionaux et Grandes Lignes).
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Comment acquérir la carte jeune</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Une demande doit être adressée au chef de gare. L’intéressé devra produire :
                    </Typography>

                    <List dense>
                      <ListItem><ListItemText primary="Une demande manuscrite" /></ListItem>
                      <ListItem><ListItemText primary="Une fiche individuelle d’état civil" /></ListItem>
                      <ListItem><ListItemText primary="Deux (02) photos d’identité (une à coller sur la carte, l’autre dans le dossier)" /></ListItem>
                    </List>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Les cartes sont établies au plus tard une journée après la demande.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Droit de confection :</strong> 60 DA lors du dépôt de la demande ou renouvellement.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">La Carte Famille Nombreuse</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="carte-famille">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Avantages :</strong> réduction de 30% (en 2ème classe uniquement).
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Validité :</strong> 3 ans.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Bénéficiaire :</strong> familles comptant au moins 3 enfants célibataires de moins de 18 ans (sur demande du chef de famille).
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Parcours valable :</strong> Services Régionaux et Grandes Lignes.
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1 }}>Comment acquérir la carte</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Un formulaire spécial est rempli en gare et des pièces justificatives sont requises (photos, fiche familiale, extraits de naissance, pièce prouvant la nationalité).
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Les cartes sont établies au plus tard 10 jours après dépôt de la demande.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Droit de confection :</strong> 100 DA (par dépôt, quel que soit le nombre de cartes).
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">La Carte 3ᵉ Âge</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="carte-3eme-age">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Avantage :</strong> réduction de 20% à chaque achat de billet.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Validité :</strong> à vie.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Bénéficiaires :</strong> femmes ≥ 55 ans, hommes ≥ 60 ans.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Parcours :</strong> parcours supérieur à 100 km (Banlieue Algéroise, Services Régionaux et Grandes Lignes).
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1 }}>Comment l'obtenir</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Pièce d’identité" /></ListItem>
                      <ListItem><ListItemText primary="Une photo d’identité" /></ListItem>
                    </List>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Délai d'établissement : au plus tard une journée après la demande.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Droit de confection :</strong> 60 DA.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Voyageurs ordinaires</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="voyageurs-ordinaires">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Billet aller simple à plein tarif :</strong> pour parcours ≥ 200 km, billets simples valables 5 jours (vendredi et fêtes inclus) si annotés à la gare d'interruption.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Billet aller-retour :</strong> réduction de 20% pour trajets AR supérieur à 400 km ; billets valables 2 mois à partir de la délivrance.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Tarif spécial — Personnes à mobilité réduite (PMR)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="pmr">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Sur présentation de la carte délivrée par les Services de l’Action Sociale des Wilayas, des titres gratuits ou réduits sont délivrés selon le taux d'invalidité.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Abonnements</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="abonnements">
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Abonnements ordinaires</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Réduction de 35% ; périodes : 1 mois, 3 mois, 1 an ; parcours ≤ 200 km (2ᵉ classe). Abonnement mensuel offre gratuité 15 jours ; abonnement annuel offre gratuité 5 mois.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Droit de consignation : 50 DA.
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>Abonnements de banlieue (sélectionnées)</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Hebdomadaire (Oran, Annaba, Constantine) : réduction 30%. Mensuel (Oran, Annaba, Constantine) : réduction 40%.
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>Abonnement « Carte verte »</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      30% (hebdomadaire) ; 40% (mensuel/trimestriel/semestriel/annuel). Valable sur automotrices du réseau de la Banlieue algéroise.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Cartes demi-tarif</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="cartes-demi-tarif">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Cartes nominatives cédées au siège de la Direction Régionale Ferroviaire permettant d’obtenir billets à demi-tarif pour 3, 6 ou 12 mois.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Carte A :</strong> billets demi-tarif en 1ère ou 2ème classe selon choix. <br />
                      <strong>Carte B :</strong> billets demi-tarif valables en 2ème classe uniquement.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Voyages en groupes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="voyages-groupes">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Groupes ordinaires :</strong> ≥ 10 personnes → réduction 30% pour distance ≥ 300 km (AR compris). Enfant 4-12 ans = demi-tarif.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Groupes sportifs :</strong> réductions progressives (30% pour ≥10, 40% pour ≥31, 50% pour ≥61).
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Colonies de vacances :</strong> réductions spéciales (50% ou 75% selon cas).
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Règles, surclassement & contrôles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box id="regles">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Surclassement : le voyageur désirant changer de classe doit déclarer et payer la différence avant de changer de place.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Contrôle & restitution du billet : le voyageur doit présenter son billet à toute réquisition. En cas d'absence ou billet non valable, des mesures, indemnités et poursuites peuvent s'appliquer.
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Cas d'irrégularité : présence sans titre, titre périmé, altération, voyage hors parcours autorisé, etc. — procédures et sanctions prévues.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
