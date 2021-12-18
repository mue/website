import Link from "next/link";

import { BsCodeSlash } from "react-icons/bs";
import { MdWidgets, MdOutlineWeb } from "react-icons/md";

import { useTranslation } from "next-i18next";

const getIcon = (name) => {
  switch (name) {
    case "website":
      return <MdOutlineWeb />;
    case "api":
      return <BsCodeSlash />;
    case "extension":
      return <MdWidgets />;
    default:
      break;
  }
};

export default function SourceCard(props) {
  const { t } = useTranslation("download");

  return (
    <div className="card">
      <div className="circle">{getIcon(props.name)}</div>
      <span className="card-title">{props.title}</span>
      <span className="card-desc">Version {props.version}</span>
      <Link href={props.url}>
        <a>
          <button className="filled" type="button">
            {t("title")}
          </button>
        </a>
      </Link>
    </div>
  );
}
