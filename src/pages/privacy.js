import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
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
          <span className="two">{t("updated")} 26.11.21</span>
        </div>
      </header>
      <div className="content" style={{ marginTop: "550pt" }}>
        <div className="privacy">
          <ul>
            <li>{t("one")}</li>
            <br />
            <li>{t("two")}</li>
            <br />
            <li>{t("three")}</li>
            <br />
            <li>{t("four")}</li>
            <br />
            <li>{t("five")}</li>
            <br />
            <li>{t("six")}</li>
            <br />
            <li>{t("seven")}</li>
            <br />
            <li>{t("eight")}</li>
            <br />
            <li>{t("nine")}</li>
            <br />
            <li>{t("ten")}</li>
            <br />
            <li>{t("eleven")}</li>
            <br />
            <li>{t("twelve")}</li>
            <br />
            <li>{t("notice")}</li>
          </ul>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
