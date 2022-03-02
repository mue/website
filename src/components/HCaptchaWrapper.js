import React, { useState, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function HCaptchaWrapper({ sitekey, theme, size, onVerify }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return (
      <HCaptcha
        sitekey={sitekey}
        theme={theme}
        size={size}
        onVerify={onVerify}
      />
    );
  } else {
    return null;
  }
}
