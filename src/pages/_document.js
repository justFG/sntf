// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="S.N.T.F" />
          <link rel="icon" href="/logo.png" />
          <meta name="format-detection" content="telephone=no" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

          {/* Font Awesome */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          />

          {/* Open Graph / Facebook */}
          <meta property="og:title" content="S.N.T.F" />
          <meta property="og:description" content="Site non-officiel de la S.N.T.F" />
          <meta property="og:image" content="/sntf.png" /> {/* image de ta bannière */}
          <meta property="og:url" content="https://sntf.vercel.app" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="S.N.T.F" />
          <meta name="twitter:description" content="Site nn-officiel de la S.N.T.F" />
          <meta name="twitter:image" content="/sntf.png" /> {/* même image que OG */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
