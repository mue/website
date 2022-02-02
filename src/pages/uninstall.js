import { useEffect, useState } from "react";

import Head from "../components/Head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import * as Constants from "../modules/constants";

const validateForm = (t) => {
  const form = document.forms["form"];
  const reasonWarning = document.getElementById("reasonWarning");
  const betterWarning = document.getElementById("betterWarning");

  if (
    document.getElementById("reason").value === "other" &&
    document.getElementById("otherReason").value === ""
  ) {
    return (reasonWarning.textContent = t("better_error"));
  } else {
    reasonWarning.textContent = "";
  }

  if (form["MultiLine"].value === "") {
    return (betterWarning.textContent = t("reason_error"));
  } else {
    betterWarning.textContent = "";
  }

  document.forms["form"].submit();
};

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
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

  useEffect(() => {
    document.getElementById("otherReason").style.display = "none";

    document.getElementById("reason").onchange = (e) => {
      document.getElementById("reasonWarning").textContent = "";
      if (e.target.value === "other") {
        document.getElementById("otherReason").style.display = "block";
      } else {
        document.getElementById("otherReason").style.display = "none";
      }
    };

    document.getElementById("likelyToTry").oninput = () => {
      document.getElementById("likelyValue").innerText =
        "(" + document.getElementsByClassName("range")[0].value + ")";
    };
  });

  const [likelyToTry, setLikelyToTry] = useState(5);

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
          <form
            action={Constants.form_api + "/uninstall"}
            name="form"
            id="form"
            method="POST"
            acceptCharset="UTF-8"
            encType="multipart/form-data"
          >
            <label htmlFor="reason">{t("reason.title")}</label>
            <select name="reason" id="reason">
              <option value="slow">{t("reason.slow")}</option>
              <option value="old">{t("reason.old")}</option>
              <option value="broken">{t("reason.broken")}</option>
              <option value="features">{t("reason.features")}</option>
              <option value="notexpected">{t("reason.notexpected")}</option>
              <option value="privacy">{t("reason.privacy")}</option>
              <option value="language">{t("reason.language")}</option>
              <option value="temp">{t("reason.temp")}</option>
              <option value="other">{t("reason.other")}</option>
            </select>
            <input type="text" name="reasonOther" id="otherReason" />
            <span id="reasonWarning"></span>
            <label htmlFor="MultiLine">{t("better")}</label>
            <textarea name="MultiLine" maxLength="65535"></textarea>
            <span id="betterWarning"></span>

            <label htmlFor="likelyToTry">{t("likely")}</label>
            <div className="slider">
              <label>0</label>
              <input
                className="range"
                type="range"
                min="0"
                max="10"
                name="likelyToTry"
                id="likelyToTry"
                value={likelyToTry}
                onChange={(e) => setLikelyToTry(e.target.value)}
              />
              <label>
                10 <span id="likelyValue">({likelyToTry})</span>
              </label>
            </div>
            <button
              className="filled"
              type="button"
              onClick={() => validateForm(t)}
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
