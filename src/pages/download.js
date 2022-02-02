import Head from "../components/Head";

import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import DownloadCard from "../components/download/DownloadCard";
import SourceCard from "../components/download/SourceCard";

import { FaGithub } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import getBrowser from "../modules/getBrowser";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps(context) {
  const data = getBrowser(context.req.headers["user-agent"]);
  return {
    props: {
      data,
      ...(await serverSideTranslations(context.locale, [
        "download",
        "navbar",
        "footer",
        "getstarted",
      ])),
    },
  };
}

export default function Download(props) {
  const { t } = useTranslation("download");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t("title")}</span>
          <br />
          <span className="two">{t("description")}</span>
          <br />
          <Link href={props.data.link}>
            <a>
              <button className="hollow">{props.data.text}</button>
            </a>
          </Link>
        </div>
      </header>
      <div style={{ marginTop: "500pt" }} className="content">
        <div className="download-cards">
          <DownloadCard
            name="Chrome"
            image="https://res.cloudinary.com/mue/website/chrome.svg"
            version="6.0.4"
            url="https://chrome.google.com/webstore/detail/mue/bngmbednanpcfochchhgbkookpiaiaid"
          />
          <DownloadCard
            name="Edge"
            image="https://res.cloudinary.com/mue/website/edge.svg"
            version="6.0.4"
            url="https://microsoftedge.microsoft.com/addons/detail/mue/aepnglgjfokepefimhbnibfjekidhmja"
          />
          <DownloadCard
            name="Firefox"
            image="https://res.cloudinary.com/mue/website/firefox.svg"
            version="6.0.4"
            url="https://addons.mozilla.org/firefox/addon/mue/"
          />
          <DownloadCard
            name="Whale"
            image="https://res.cloudinary.com/mue/website/whale.webp"
            version="6.0.4"
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
            <h1>{t("opensource")}</h1>
            <p>{t("download_source")}</p>
            <Link href="https://github.com/mue">
              <a className="openlink">
                {t("view_all")} <MdOutlineKeyboardArrowRight />
              </a>
            </Link>
          </div>
          <div className="githubDownload">
            <SourceCard
              name="extension"
              title="Extension"
              version="6.0.4"
              url="https://github.com/mue/mue"
            />
            <SourceCard
              name="website"
              title="Website"
              version="2.0.0"
              url="https://github.com/mue/website"
            />
            <SourceCard
              name="api"
              title="API"
              version="1.6.1"
              url="https://github.com/mue/api"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
