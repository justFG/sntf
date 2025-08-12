import { load } from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  try {
    // Chemin absolu vers stations.json
    const stationsPath = path.join(process.cwd(), 'public', 'stations.json');
    
    if (!fs.existsSync(stationsPath)) {
      return res.status(500).json({ error: 'stations.json non trouvé' });
    }

    const stations = JSON.parse(fs.readFileSync(stationsPath, 'utf8'));

    function getStationId(input) {
      if (/^\d+$/.test(input)) return parseInt(input, 10);
      const station = stations.find(s => s.name.toLowerCase() === input.toLowerCase());
      if (!station) throw new Error(`Gare introuvable: ${input}`);
      return station.id;
    }

    const gd = getStationId(from);
    const ga = getStationId(to);
    const url = `https://www.sntf.dz/index.php/component/sntf/?gd=${gd}&ga=${ga}&dd=${date}&h1=0000&h2=2359&o=hd&view=train`;

    // Debug: Afficher l'URL
    console.log('URL:', url);

    const response = await fetch(url);
    const html = await response.text();

    // Debug: Vérifier le HTML reçu
    console.log('HTML length:', html.length);

    const $ = load(html);
    const results = [];

    $('table tr').each((i, row) => {
      const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
      if (cols.length > 0) {
        results.push({
          train: cols[0],
          depart: cols[1],
          arrivee: cols[2],
          duree: cols[3],
          observations: cols[4] || ''
        });
      }
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Erreur complète:', error);
    return res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}