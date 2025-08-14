// pages/_app.js
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // On force le navigateur à ne pas gérer automatiquement le scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const saveScrollForCurrentRoute = () => {
      try {
        const key = 'scrollPos:' + router.asPath;
        sessionStorage.setItem(key, String(window.scrollY || 0));
      } catch (e) {
        // ignore quota errors
      }
    };

    const handleRouteChangeStart = () => {
      // Avant de partir, sauver la position de la route courante
      saveScrollForCurrentRoute();
    };

    const handleRouteChangeComplete = (url) => {
      // Après arrivée sur la nouvelle route, restaurer si on a une position sauvegardée
      try {
        const key = 'scrollPos:' + url;
        const pos = sessionStorage.getItem(key);
        if (pos !== null) {
          // petit timeout pour laisser le DOM se stabiliser (images, layout)
          setTimeout(() => {
            window.scrollTo(0, parseInt(pos, 10) || 0);
          }, 50);
        } else {
          // si pas de position sauvegardée, ne pas forcer le top si tu préfères garder état natif ;
          // ici on laisse la page en haut par défaut :
          // window.scrollTo(0, 0);
        }
      } catch (e) {
        // noop
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // aussi sauvegarder si l'utilisateur ferme/refresh
    const beforeUnload = () => saveScrollForCurrentRoute();
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [router]);

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
