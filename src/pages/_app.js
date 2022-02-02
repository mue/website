import { useEffect } from "react";
import AOS from "aos";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.scss";

import "aos/dist/aos.css";
import "@fontsource/lexend-deca";

function MueWebsite({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return <Component {...pageProps} />;
}

export default appWithTranslation(MueWebsite);
