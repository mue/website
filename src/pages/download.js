import Head from '../components/Head';

import Link from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import DownloadCard from '../components/download/DownloadCard';
import SourceCard from '../components/download/SourceCard';

import { FaGithub } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

import getBrowser from '../modules/getBrowser';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import * as Constants from '../modules/constants';

export async function getServerSideProps({ locale, req }) {
  const data = getBrowser(req.headers['user-agent']);
  const versions = (await (await fetch(Constants.mue_api + '/versions')).json()) || {};
  return {
    props: {
      data,
      versions,
      ...(await serverSideTranslations(locale, ['download', 'navbar', 'footer', 'getstarted'])),
    },
  };
}

export default function Download({ data, versions }) {
  const { t } = useTranslation('download');

  return (
    <>
      <Head title={t('title')} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t('title')}</span>
          <br />
          <span className="two">{t('description')}</span>
          <br />
          <Link href={data.link}>
            <a>
              <button className="hollow umami--click--download-promotiondownload">
                {data.text}
              </button>
            </a>
          </Link>
        </div>
      </header>
      <div style={{ marginTop: '500pt' }} className="content">
        <div className="download-cards">
          <DownloadCard
            name="Chrome"
            image="https://res.cloudinary.com/mue/website/chrome.svg"
            version={versions.browsers.chrome}
            url="https://chrome.google.com/webstore/detail/mue/bngmbednanpcfochchhgbkookpiaiaid"
          />
          <DownloadCard
            name="Edge"
            image="https://res.cloudinary.com/mue/website/edge.svg"
            version={versions.browsers.edge}
            url="https://microsoftedge.microsoft.com/addons/detail/mue/aepnglgjfokepefimhbnibfjekidhmja"
          />
          <DownloadCard
            name="Firefox"
            image="https://res.cloudinary.com/mue/website/firefox.svg"
            version={versions.browsers.firefox}
            url="https://addons.mozilla.org/firefox/addon/mue/"
          />
          <DownloadCard
            name="Whale"
            image="https://res.cloudinary.com/mue/website/whale.webp"
            fallbackImage="https://res.cloudinary.com/mue/website/fallback/whale.png"
            version={versions.browsers.whale}
            url="https://store.whale.naver.com/detail/ecllekeilcmicbfkkiknfdddbogibbnc"
          />
        </div>
      </div>
      <div className="github">
        <div className="content">
          <div className="desc">
            <div className="circle">
              <FaGithub />
            </div>
            <h1>{t('opensource')}</h1>
            <p>{t('download_source')}</p>
            <Link href="https://github.com/mue">
              <a className="openlink">
                {t('view_all')} <MdOutlineKeyboardArrowRight />
              </a>
            </Link>
          </div>
          <div className="githubDownload">
            <SourceCard
              name="extension"
              title="Extension"
              version={versions.browsers.chrome}
              url="https://github.com/mue/mue"
            />
            <SourceCard
              name="website"
              title="Website"
              version={Constants.version}
              url="https://github.com/mue/website"
            />
            <SourceCard
              name="api"
              title="API"
              version={versions.api}
              url="https://github.com/mue/api"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
