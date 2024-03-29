import Head from '../components/Head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import GetStarted from '../components/GetStarted';

import Feature from '../components/features/Feature';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['features', 'navbar', 'footer', 'getstarted'])),
    },
  };
}

export default function Features() {
  const { t } = useTranslation('features');

  return (
    <>
      <Head title={t('title')} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t('title')}</span>
          <br />
          <span className="two">{t('description')}</span>
        </div>
      </header>
      <div style={{ marginTop: '500pt' }} className="content">
        <div className="features">
          <Feature
            title={t('motivated.title')}
            image="img/motivated.webp"
            fallbackImage="img/fallback/motivated.png"
            description={t('motivated.description')}
            list={[t('motivated.list_one'), t('motivated.list_two')]}
          />
          <Feature
            reverse
            title={t('customise.title')}
            image="img/customise.webp"
            fallbackImage="img/fallback/customise.jpg"
            description={t('customise.description')}
            list={[t('customise.list_one'), t('customise.list_two'), t('customise.list_three')]}
          />
          <Feature
            title={t('optimise.title')}
            image="img/workflow.webp"
            fallbackImage="img/fallback/workflow.png"
            description={t('optimise.description')}
            list={[t('optimise.list_one'), t('optimise.list_two'), t('optimise.list_three')]}
          />
          <Feature
            reverse
            title={t('secure.title')}
            image="https://res.cloudinary.com/mue/image/upload/v1639345701/website/secure.webp"
            fallbackImage="img/fallback/secure.png"
            description={t('secure.description')}
            list={[t('secure.list_one'), t('secure.list_two')]}
          />
        </div>
      </div>
      <div className="quote">
        <div className="content">
          <span className="quoteText">A useful New Tab page full of features.</span>
          <span className="desc">- Softpedia</span>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
