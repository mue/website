import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from '../components/Head';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Press from '../components/home/Press';
import Feature from '../components/home/Feature';

import GetStarted from '../components/GetStarted';

import Link from 'next/link';
import { useTypewriter } from 'react-simple-typewriter';

import getBrowser from '../modules/getBrowser';

import Carousel from '../components/home/Carousel';

export async function getServerSideProps({ locale, req }) {
  const data = getBrowser(req.headers['user-agent']);
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ['home', 'navbar', 'footer', 'getstarted'])),
    },
  };
}

export default function Home({ data }) {
  const { t } = useTranslation('home');

  const promoTypewriter = useTypewriter({
    words: [
      t('promotion.productive'),
      t('promotion.inspired'),
      t('promotion.organised'),
      t('promotion.yourself'),
    ],
    loop: 0,
    delaySpeed: 2500,
  });

  const shareTypewriter = useTypewriter({
    words: [
      t('shareyourmue.work'),
      t('shareyourmue.students'),
      t('shareyourmue.productivity'),
      t('shareyourmue.fun'),
      t('shareyourmue.everyone'),
    ],
    loop: 0,
    delaySpeed: 2500,
  });

  return (
    <>
      <Head title={t('title')} />
      <header>
        <div className="promotion home-promotion">
          <div>
            <span>
              {t('promotion.title')}
              <span>{promoTypewriter.text}</span>
            </span>
            <br />
            <span className="two">{t('promotion.subtitle')}</span>
          </div>
          <div className="buttons">
            <Link href={data.link}>
              <a className="umami--click--home-download" target="_blank">
                <button className="filled">
                  {data.text}
                  <MdOutlineKeyboardArrowRight />
                </button>
              </a>
            </Link>
            <Link href="https://demo.muetab.com">
              <a className="hollow umami--click--home-demo" target="_blank">
                {t('promotion.demo')}
                <MdOutlineKeyboardArrowRight />
              </a>
            </Link>
          </div>
        </div>
      </header>
      <Navbar />
      <div style={{ marginTop: '500pt' }} className="content">
        <div className="features">
          <Feature
            name="widgets"
            title={t('features.widgets.title')}
            image="img/widgets.svg"
            description={t('features.widgets.description')}
          />
          <Feature
            reverse
            name="opensource"
            title={t('features.opensource.title')}
            image="img/opensource.svg"
            description={t('features.opensource.description')}
            link="https://github.com/mue"
            linkText={t('features.opensource.link')}
          />
          <Feature
            name="privacy"
            title={t('features.privacy.title')}
            image="img/privacy.svg"
            description={t('features.privacy.description')}
            link="/privacy"
            linkText={t('features.privacy.link')}
          />
          <Feature
            reverse
            name="marketplace"
            title={t('features.extensible.title')}
            image="img/marketplace.svg"
            description={t('features.extensible.description')}
          />
        </div>
      </div>
      <div className="shareyourmue">
        <div className="content">
          <span>
            {t('shareyourmue.title')}
            <span>{shareTypewriter.text}</span>
          </span>
          <p>
            {t('shareyourmue.description_start')} <b>#shareyourmue</b>{' '}
            {t('shareyourmue.description_end')}
          </p>
          <Carousel />
        </div>
      </div>
      <div className="press">
        <div className="content">
          <h1>{t('press')}</h1>
          <Press />
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
