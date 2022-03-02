import Link from "next/link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "formsuccess",
        "navbar",
        "footer",
      ])),
    },
  };
}

export default function FormSuccess() {
  const { t } = useTranslation("formsuccess");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header className="full">
        <div className="promotion">
          <span>{t("success")}</span>
          <br />
          <span className="two">{t("message")}</span>
          <br />
          <Link href="/">
            <a>
              <button className="filled">{t("button")}</button>
            </a>
          </Link>
        </div>
      </header>
      <div style={{ marginTop: "100vh" }} className="content"/>
      <Footer />
    </>
  );
}
