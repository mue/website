import { useEffect, useState } from "react";

import Head from "../components/Head";
import Link from "next/link";
import Script from "next/script";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import { MdEmail, MdQuestionAnswer } from "react-icons/md";
import { FaTwitter, FaDiscord } from "react-icons/fa";

import validator from "validator";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const validateForm = (t) => {
  const form = document.forms["form"];
  const emailWarning = document.getElementById("emailWarning");
  const messageWarning = document.getElementById("messageWarning");

  if (!validator.isEmail(form["Email"].value)) {
    emailWarning.textContent = "• " + t("invalid_email");
  } else {
    emailWarning.textContent = "";
  }

  if (form["MultiLine"].value === "") {
    return (messageWarning.textContent = "•" + t("invalid_message"));
  } else {
    messageWarning.textContent = "";
  }

  document.forms["form"].submit();
};

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["contact", "navbar", "footer", "getstarted"])),
    },
  };
}

export default function Contact() {
  const [captchaTheme, setCaptchaTheme] = useState("light");
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setCaptchaTheme("dark");
    }
  }, []);

  const { t } = useTranslation("contact");

  return (
    <>
      <Head title={t("title")} />
      <Script src="https://js.hcaptcha.com/1/api.js" async defer />
      <Navbar />
      <header>
        <div className="promotion">
          <div>
            <span style={{ margin: "0" }}>{t("description")}</span>
            <br />
            <span className="two">{t("description_two")}</span>
            <div className="socialCircles">
              <Link href="mailto:hello@muetab.com">
                <a title="Contact Mue via email">
                  <div className="circle">
                    <MdEmail />
                  </div>
                </a>
              </Link>
              <Link href="https://twitter.com/getmue">
                <a title="Contact Mue on Twitter">
                  <div className="circle">
                    <FaTwitter />
                  </div>
                </a>
              </Link>
              <Link href="https://discord.gg/zv8C9F8">
                <a title="Contact Mue on Discord">
                  <div className="circle">
                    <FaDiscord />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div style={{ marginTop: "350pt" }} className="content">
        <div className="form" data-aos="fade-up">
          <form
            action="https://forms.muetab.com/contact"
            name="form"
            id="form"
            method="POST"
            acceptCharset="UTF-8"
            encType="multipart/form-data"
          >
            <label htmlFor="Email">
              {t("email")} <span className="required">*</span>{" "}
              <span id="emailWarning"></span>
            </label>
            <input type="text" maxLength="255" name="Email" fieldtype={9} />
            <label htmlFor="MultiLine">
              {t("message")} <span className="required">*</span>{" "}
              <span id="messageWarning"></span>
            </label>
            <textarea name="MultiLine" maxLength="65535"></textarea>
            <div
              className="h-captcha"
              data-sitekey="3d43c94a-55a7-45be-87ce-5c6cd8de801e"
              data-theme={captchaTheme}
            ></div>
            <button
              className="filled"
              type="button"
              onClick={() => validateForm(t)}
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
      <div className="faq">
        <div className="content">
          <div className="desc">
            <div className="circle">
              <MdQuestionAnswer />
            </div>
            <h1>{t("faq.title")}</h1>
            <p>{t("faq.description")}</p>
          </div>
          <div className="questions">
            <div className="faq-item">
              <span className="faq-question">{t("faq.branding")}</span>
              <span className="faq-answer">
                {t("faq.branding_desc_start")}
                <Link href="/branding">
                  <a title="Go to branding page">
                    {t("faq.branding_desc_here")}
                  </a>
                </Link>{" "}
                {t("faq.branding_desc_end")}
              </span>
            </div>
            <div className="faq-item">
              <span className="faq-question">{t("faq.api")}</span>
              <span className="faq-answer">{t("faq.api_desc")}</span>
            </div>
            <div className="faq-item">
              <span className="faq-question">{t("faq.feature")}</span>
              <span className="faq-answer">{t("faq.feature_desc")}</span>
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
