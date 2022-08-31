import Link from 'next/link';

import { FaDiscord, FaTwitter, FaFacebookF } from 'react-icons/fa';

import { useTranslation } from 'next-i18next';

import catchTranslationError from '../modules/catchTranslationError';

export default function Footer() {
  const { t } = useTranslation('footer');

  return (
    <footer>
      <div className="footerContent">
        <div>
          <div className="top">
            <img
              src="img/logo_footer.svg"
              alt="Mue Logo"
              height="50"
              width="58.16"
              draggable="false"
              className="invert"
            />
            <span>Mue</span>
          </div>
          <span className="sub">{catchTranslationError(t('subtitle'), 'For the modern web.')}</span>
          <span className="min">© 2018-{new Date().getFullYear()} The Mue Authors</span>
          {/*<button className="language">
            <MdLanguage />
            En
  </button>*/}
        </div>
        <div>
          <ul>
            <li>
              <h2>{catchTranslationError(t('product.title'), 'Product')}</h2>
            </li>
            <li>
              <Link href="/download">
                <a>{catchTranslationError(t('product.download'), 'Download')}</a>
              </Link>
            </li>
            <li>
              <Link href="/features">
                <a>{catchTranslationError(t('product.features'), 'Features')}</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>{catchTranslationError(t('product.privacy'), 'Privacy')}</a>
              </Link>
            </li>
            <li>
              <Link href="https://docs.muetab.com">
                <a target="_blank">
                  {catchTranslationError(t('product.documentation'), 'Documentation')}
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h2>{catchTranslationError(t('company.title'), 'Company')}</h2>
            </li>
            <li>
              <Link href="/about">
                <a>{catchTranslationError(t('company.about'), 'About')}</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>{catchTranslationError(t('company.contact'), 'Contact')}</a>
              </Link>
            </li>
            <li>
              <Link href="/branding">
                <a>{catchTranslationError(t('company.branding'), 'Branding')}</a>
              </Link>
            </li>
            <li>
              <Link href="https://blog.muetab.com">
                <a target="_blank">{catchTranslationError(t('company.blog'), 'Blog')}</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h2>{catchTranslationError(t('links.title'), 'Links')}</h2>
            </li>
            <li>
              <Link href="https://github.com/mue">
                <a target="_blank">{catchTranslationError(t('links.source'), 'Source Code')}</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>{catchTranslationError(t('links.privacy'), 'Privacy')}</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/sponsors/davidcralph/">
                <a target="_blank">{catchTranslationError(t('links.support'), 'Donate')}</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/mue/mue/issues">
                <a target="_blank">{catchTranslationError(t('links.issues'), 'Issues')}</a>
              </Link>
            </li>
            <li>
              <Link href="https://status.muetab.com">
                <a target="_blank">{catchTranslationError(t('links.status'), 'Status')}</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="social">
            <li>
              <h2>{catchTranslationError(t('social'), 'Social')}</h2>
            </li>
            <li>
              <Link href="https://discord.gg/zv8C9F8">
                <a title="Mue on Discord" target="_blank">
                  <div className="circle">
                    <FaDiscord />
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com/getmue">
                <a title="Mue on Twitter" target="_blank">
                  <div className="circle">
                    <FaTwitter />
                  </div>
                </a>
              </Link>
              <Link href="https://facebook.com/muetab">
                <a title="Mue on Facebook">
                  <div className="circle">
                    <FaFacebookF />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
