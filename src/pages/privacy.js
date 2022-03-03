import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "privacy",
        "navbar",
        "footer",
        "getstarted",
      ])),
    },
  };
}

export default function Privacy() {
  const { t } = useTranslation("privacy");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t("title_two")}</span>
          <br />
          <span className="two">{t("updated")} 26TH NOVEMBER 2021</span>
        </div>
      </header>
      <div className="content" style={{ marginTop: "550pt" }}>
        <div className="privacy">
          <ul>
            <li>{t("one")}</li>
            <li>{t("two")}</li>
            <li>{t("three")}</li>
            <li>{t("four")}</li>
            <li>{t("five")}</li>
            <li>{t("six")}</li>
            <li>{t("seven")}</li>
            <li>{t("eight")}</li>
            <li>{t("nine")}</li>
            <li>{t("ten")}</li>
            <li>{t("eleven")}</li>
            <li>{t("twelve")}</li>
            <li>{t("notice")}</li>
          </ul>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
