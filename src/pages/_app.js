// pages/_app.js
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SNTF — Recherche Horaires</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
        <CssBaseline />
        <Component {...pageProps} />

    </>
  );
}
