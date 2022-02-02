import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";
import { useTranslation } from "next-i18next";

export default function DownloadCard(props) {
  const { t } = useTranslation("download");

  return (
    <div className="card">
      <ImageWithFallback
        src={props.image}
        fallbackSrc={props.fallbackImage || props.image}
        className="cardavatar"
        draggable="false"
        height="80"
        width="80"
        alt={"Download on " + props.name}
      />
      <span className="card-title">{props.name}</span>
      <span className="card-desc">
        {t("version")} {props.version}
      </span>
      <Link href={props.url}>
        <a>
          <button className="submitbtn filled" type="button">
            {t("add_card")}
          </button>
        </a>
      </Link>
    </div>
  );
}
