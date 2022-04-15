/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head';

export default function WebsiteHead({ title }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title} | Mue</title>

      {/* meta tags */}
      <meta name="theme-color" content="#ffb032" />
      <link rel="icon" href="favicon.ico" type="image/x-icon" />
      <meta name="title" content="Mue - New Tab" />
      <meta
        name="description"
        content="A fast, open source and free-to-use new tab page for modern browsers."
      />
      <meta
        name="image"
        content="https://res.cloudinary.com/mue/image/upload/v1639502004/website/mue_promo_big.webp"
      />
      <meta
        name="keywords"
        content="mue, new tab, mue tab, settings, tab, extension, new page, david ralph, davidcralph, alex sparkes, productivity, chrome extension, firefox extension, extension, start page, opensource"
      />
      <meta name="author" content="Mue Tab" />
      <meta name="language" content="English" />

      {/* og */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mue" />
      <meta property="og:title" content="Mue - New Tab" />
      <meta
        property="og:description"
        content="A fast, open source and free-to-use new tab page for modern browsers."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/mue/image/upload/v1639502004/website/mue_promo_big.webp"
      />
      <meta property="og:image:alt" content="Mue" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@getmue" />
      <meta name="twitter:creator" content="@getmue" />
      <meta name="twitter:title" content="Mue - New Tab" />
      <meta
        name="twitter:description"
        content="A fast, open source and free-to-use new tab page for modern browsers."
      />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/mue/image/upload/v1639502004/website/mue_promo_big.webp"
      />
      <meta name="twitter:image:alt" content="Mue" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />

      {/* noscript */}
      <noscript>
        <link rel="stylesheet" href="noscript.css" />
      </noscript>
    </Head>
  );
}
