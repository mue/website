import { useState, useRef } from "react";

import * as Constants from "../../modules/constants";

import { useTranslation } from "next-i18next";

export default function UninstallForm() {
  const { t } = useTranslation("uninstall");

  const [likelyToTry, setLikelyToTry] = useState(5);
  const [otherReasonDisplay, setOtherReasonDisplay] = useState("none");
  const [reasonWarning, setReasonWarning] = useState("");
  const [betterWarning, setBetterWarning] = useState("");
  const reason = useRef(null);
  const otherReason = useRef(null);
  const multiline = useRef(null);
  const form = useRef(null);

  const updateReason = (e) => {
    setReasonWarning("");
    if (e.target.value === "other") {
      setOtherReasonDisplay("block");
    } else {
      setOtherReasonDisplay("none");
    }
  };

  const validateForm = () => {
    if (reason.current.value === "other" && otherReason.current.value === "") {
      return setReasonWarning(t("reason_error"));
    } else {
      setReasonWarning("");
    }

    if (multiline.current.value === "") {
      return setBetterWarning(t("better_error"));
    } else {
      setBetterWarning("");
    }

    form.current.submit();
  };

  return (
    <form
      action={Constants.form_api + "/uninstall"}
      name="form"
      method="POST"
      acceptCharset="UTF-8"
      encType="multipart/form-data"
      ref={form}
    >
      <label htmlFor="reason">{t("reason.title")}</label>
      <select name="reason" id="reason" onChange={updateReason} ref={reason}>
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
      <input
        type="text"
        name="reasonOther"
        ref={otherReason}
        style={{ display: otherReasonDisplay }}
      />
      <span className="warning">{reasonWarning}</span>
      <label htmlFor="MultiLine">{t("better")}</label>
      <textarea name="MultiLine" maxLength="65535" ref={multiline} />
      <span className="warning">{betterWarning}</span>

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
          10 <span>({likelyToTry})</span>
        </label>
      </div>
      <button className="filled" type="button" onClick={() => validateForm(t)}>
        {t("submit")}
      </button>
    </form>
  );
}
