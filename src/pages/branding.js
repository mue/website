import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Link from "next/link";
import ImageWithFallback from "../components/ImageWithFallback";

import { MdDownload } from "react-icons/md";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import * as Constants from "../modules/constants";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "branding",
        "navbar",
        "footer",
        "getstarted",
      ])),
    },
  };
}

export default function Branding() {
  const { t } = useTranslation("branding");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t("title")}</span>
          <br />
          <span className="two">{t("description")}</span>
        </div>
      </header>
      <div style={{ marginTop: "550pt" }} className="content" />
      <div className="brandingContainer">
        <div className="content">
          <h2>{t("logos.title")}</h2>
          <p>{t("logos.description")}</p>
          <div className="logos">
            <div className="logo">
              <ImageWithFallback
                src="https://res.cloudinary.com/mue/website/logo_horizontal.webp"
                fallbackSrc="https://res.cloudinary.com/mue/website/fallback/logo_horizontal.png"
                width="256"
                height="70"
                draggable="false"
                alt="Mue Horizontal"
              />
            </div>
            <div className="logo">
              <ImageWithFallback
                src="https://res.cloudinary.com/mue/website/logo_round.webp"
                fallbackSrc="https://res.cloudinary.com/mue/website/fallback/logo_round.png"
                height="80"
                width="80"
                draggable="false"
                alt="Mue Round"
              />
            </div>
            <div className="logo">
              <ImageWithFallback
                src="https://res.cloudinary.com/mue/website/logo_square.webp"
                fallbackSrc="https://res.cloudinary.com/mue/website/fallback/logo_square.png"
                height="80"
                width="80"
                draggable="false"
                alt="Mue Square"
              />
            </div>
            <div className="logo">
              <ImageWithFallback
                src="https://res.cloudinary.com/mue/website/logo_tile.webp"
                fallbackSrc="https://res.cloudinary.com/mue/website/fallback/logo_tile.png"
                height="80"
                width="120"
                draggable="false"
                alt="Mue Tile"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="brandingContainer colour">
        <div className="content">
          <h2>{t("colours.title")}</h2>
          <p>{t("colours.description")}</p>
          <div className="cards">
            <div className="card theme orange" data-aos="fade-in">
              <h1>{t("colours.orange")}</h1>
              <p>#ffb032</p>
            </div>
            <div className="card theme pink" data-aos="fade-in">
              <h1>{t("colours.pink")}</h1>
              <p>#dd3b67</p>
            </div>
            <div className="card theme white" data-aos="fade-in">
              <h1>{t("colours.white")}</h1>
              <p>#fffff</p>
            </div>
          </div>
        </div>
      </div>
      <div className="getstarted">
        <div className="content">
          <span className="title">{t("getstarted.title")}</span>
          <span className="desc">{t("getstarted.description")}</span>
          <Link href={Constants.branding_pdf}>
            <a>
              <button className="hollow umami--click--branding-download">
                <MdDownload /> {t("getstarted.download")}
              </button>
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
