import { useState, useRef, useEffect } from "react";

import HCaptchaWrapper from "../HCaptchaWrapper";

import * as Constants from "../../modules/constants";

import { useTranslation } from "next-i18next";

export default function UninstallForm() {
  const { t } = useTranslation("contact");

  const [captchaTheme, setCaptchaTheme] = useState("light");
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setCaptchaTheme("dark");
    }
  }, []);

  const [emailWarning, setEmailWarning] = useState("");
  const [messageWarning, setMessageWarning] = useState("");
  const [captchaWarning, setCaptchaWarning] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const email = useRef(null);
  const multiline = useRef(null);
  const form = useRef(null);

  const validateForm = () => {
    let error = false;
    // based on https://ihateregex.io/expr/email-2/
    if (!/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email.current.value)) {
      error = true;
      setEmailWarning("• " + t("invalid_email"));
    } else {
      setEmailWarning("");
    }

    if (multiline.current.value === "") {
      error = true;
      setMessageWarning("• " + t("invalid_message"));
    } else {
      setMessageWarning("");
    }

    if (captchaVerified === false) {
      error = true;
      setCaptchaWarning(t("invalid_captcha"));
    } else {
      setCaptchaWarning("");
    }

    if (error === false) {
      form.current.submit();
    }
  };

  return (
    <form
      action={Constants.form_api + "/contact"}
      name="form"
      method="POST"
      acceptCharset="UTF-8"
      encType="multipart/form-data"
      ref={form}
    >
      <label htmlFor="Email">
        {t("email")} <span className="required">*</span>{" "}
        <span className="warning">{emailWarning}</span>
      </label>
      <input type="text" maxLength="255" name="Email" ref={email} />
      <label htmlFor="MultiLine">
        {t("message")} <span className="required">*</span>{" "}
        <span className="warning">{messageWarning}</span>
      </label>
      <textarea name="MultiLine" maxLength="65535" ref={multiline} />
      <HCaptchaWrapper
        sitekey={Constants.hcaptcha_key}
        theme={captchaTheme}
        onVerify={() => setCaptchaVerified(true)}
      />
      <span className="warning">{captchaWarning}</span>
      <button className="filled" type="button" onClick={() => validateForm(t)}>
        {t("send")}
      </button>
    </form>
  );
}
