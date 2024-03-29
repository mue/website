import Head from '../components/Head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Link from 'next/link';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps({ res, err, locale }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      statusCode,
      ...(await serverSideTranslations(locale, ['error, navbar, footer'])),
    },
  };
}

export default function Error({ statusCode }) {
  const { t } = useTranslation('error');

  return (
    <>
      <Head title={statusCode} />
      <main>
        <Navbar />
        <header className="full">
          <div className="promotion">
            <span>{statusCode}</span>
            <br />
            <span className="two">{t('message')}</span>
            <br />
            <Link href="/">
              <a>
                <button className="filled umami--click--error-home">{t('button')}</button>
              </a>
            </Link>
          </div>
        </header>
        <div style={{ marginTop: '100vh' }} className="content" />
        <Footer />
      </main>
    </>
  );
}
