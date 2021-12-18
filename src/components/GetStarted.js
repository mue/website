import Link from "next/link";

import { MdDownload } from "react-icons/md";

import { useTranslation } from "next-i18next";

export default function GetStarted() {
  const { t } = useTranslation("getstarted");

  return (
    <div className="getstarted">
      <div className="content">
        <h1>{t("title")}</h1>
        <Link href="/download">
          <a>
            <button className="hollow">
              <MdDownload /> {t("download")}
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}
