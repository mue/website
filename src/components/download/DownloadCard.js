import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";
import { useTranslation } from "next-i18next";

export default function DownloadCard({ fallbackImage, image, name, version, url }) {
  const { t } = useTranslation("download");

  return (
    <div className="card">
      <ImageWithFallback
        src={image}
        fallbackSrc={fallbackImage || image}
        className="cardavatar"
        draggable="false"
        height="80"
        width="80"
        alt={"Download on " + name}
      />
      <span className="card-title">{name}</span>
      <span className="card-desc">
        {t("version")} {version}
      </span>
      <Link href={url}>
        <a target="_blank">
          <button className={"submitbtn filled umami--click--download-" + name.toLowerCase()} type="button">
            {t("add_card")}
          </button>
        </a>
      </Link>
    </div>
  );
}
