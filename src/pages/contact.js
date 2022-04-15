import Head from '../components/Head';
import Link from 'next/link';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import GetStarted from '../components/GetStarted';
import ContactForm from '../components/contact/ContactForm';

import { MdEmail, MdQuestionAnswer } from 'react-icons/md';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['contact', 'navbar', 'footer', 'getstarted'])),
    },
  };
}

export default function Contact() {
  const { t } = useTranslation('contact');

  return (
    <>
      <Head title={t('title')} />
      <Navbar />
      <header>
        <div className="promotion">
          <div>
            <span style={{ margin: '0' }}>{t('description')}</span>
            <br />
            <span className="two">{t('description_two')}</span>
            <div className="socialCircles">
              <Link href="mailto:hello@muetab.com">
                <a title="Contact Mue via email" target="_blank">
                  <div className="circle umami--click--contact-email">
                    <MdEmail />
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com/getmue">
                <a title="Contact Mue on Twitter" target="_blank">
                  <div className="circle umami--click--contact-twitter">
                    <FaTwitter />
                  </div>
                </a>
              </Link>
              <Link href="https://discord.gg/zv8C9F8">
                <a title="Contact Mue on Discord" target="_blank">
                  <div className="circle umami--click--contact-discord">
                    <FaDiscord />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div style={{ marginTop: '350pt' }} className="content">
        <div className="form" data-aos="fade-up">
          <ContactForm />
        </div>
      </div>
      <div className="faq">
        <div className="content">
          <div className="desc">
            <div className="circle">
              <MdQuestionAnswer />
            </div>
            <h1>{t('faq.title')}</h1>
            <p>{t('faq.description')}</p>
          </div>
          <div className="questions">
            <div className="faq-item">
              <span className="faq-question">{t('faq.branding')}</span>
              <span className="faq-answer">
                {t('faq.branding_desc_start') + ' '}
                <Link href="/branding">
                  <a title="Go to branding page" className="umami--click--contact-branding">
                    {t('faq.branding_desc_here')}
                  </a>
                </Link>{' '}
                {t('faq.branding_desc_end')}
              </span>
            </div>
            <div className="faq-item">
              <span className="faq-question">{t('faq.api')}</span>
              <span className="faq-answer">{t('faq.api_desc')}</span>
            </div>
            <div className="faq-item">
              <span className="faq-question">{t('faq.feature')}</span>
              <span className="faq-answer">{t('faq.feature_desc')}</span>
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
