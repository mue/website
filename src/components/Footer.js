import Link from "next/link";
import Image from "next/image";

import { FaDiscord, FaTwitter, FaFacebookF } from "react-icons/fa";

import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer>
      <div className="footerContent">
        <div>
          <div className="top">
            <Image
              src="https://res.cloudinary.com/mue/website/logo_footer.svg"
              alt="Mue Logo"
              height="50"
              width="58.16"
              draggable="false"
              className="invert"
            />
            <span>Mue</span>
          </div>
          <span className="sub">{t("subtitle")}</span>
          <span className="min">
            © 2018-{new Date().getFullYear()} The Mue Authors
          </span>
          {/*<button className='language'>
            <MdLanguage />
            En
  </button>*/}
        </div>
        <div>
          <ul>
            <li>
              <h2>{t("product.title")}</h2>
            </li>
            <li>
              <Link href="/download">
                <a>{t("product.download")}</a>
              </Link>
            </li>
            <li>
              <Link href="/features">
                <a>{t("product.features")}</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>{t("product.privacy")}</a>
              </Link>
            </li>
            <li>
              <Link href="https://docs.muetab.com">
                <a>{t("product.documentation")}</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h2>{t("company.title")}</h2>
            </li>
            <li>
              <Link href="/about">
                <a>{t("company.about")}</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>{t("company.contact")}</a>
              </Link>
            </li>
            <li>
              <Link href="/branding">
                <a>{t("company.branding")}</a>
              </Link>
            </li>
            <li>
              <Link href="https://blog.muetab.com">
                <a>{t("company.blog")}</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h2>{t("links.title")}</h2>
            </li>
            <li>
              <Link href="https://github.com/mue">
                <a>{t("links.source")}</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>{t("links.privacy")}</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/sponsors/davidcralph/">
                <a>{t("links.support")}</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/mue/mue/issues">
                <a>{t("links.issues")}</a>
              </Link>
            </li>
            <li>
              <Link href="https://status.muetab.com">
                <a>{t("links.status")}</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="social">
            <li>
              <h2>{t("social")}</h2>
            </li>
            <li>
              <Link href="https://discord.gg/zv8C9F8">
                <a title="Mue on Discord">
                  <div className="circle">
                    <FaDiscord />
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com/getmue">
                <a title="Mue on Twitter">
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
