import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import UninstallForm from "../components/uninstall/UninstallForm";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "uninstall",
        "navbar",
        "footer",
        "getstarted",
      ])),
    },
  };
}

export default function Uninstall() {
  const { t } = useTranslation("uninstall");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t("title_two")}</span>
          <br />
          <span className="two">{t("description")}</span>
        </div>
      </header>
      <div style={{ marginTop: "350pt" }} className="content">
        <div className="form" data-aos="fade-up">
          <UninstallForm/>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
