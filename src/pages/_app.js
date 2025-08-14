// pages/_app.js
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#0ea5e9' }, // bleu-sky
    secondary: { main: '#fb923c' }, // orange
    background: { default: '#f8fafc' },
  },
  typography: {
    fontFamily: ['"Roboto"', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial'].join(','),
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SNTF — Recherche Horaires</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
