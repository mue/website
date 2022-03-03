/* eslint-disable @next/next/no-img-element */
import {
  MdOutlineKeyboardArrowRight,
  MdWidgets,
  MdOutlineLock,
  MdShoppingBasket,
} from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";

import Link from "next/link";

const getIcon = (name) => {
  switch (name) {
    case "widgets":
      return <MdWidgets />;
    case "opensource":
      return <AiFillGithub />;
    case "privacy":
      return <MdOutlineLock />;
    case "marketplace":
      return <MdShoppingBasket />;
    default:
      break;
  }
};

export default function Feature({ reverse, image, title, name, description, link, linkText }) {
  let classList = "feature";
  if (reverse) {
    classList += " reverse";
  }

  return (
    <div className={classList}>
      <div style={{ position: "relative", height: "200px" }}>
        <img
          data-aos="fade-right"
          src={image}
          alt={title}
          draggable="false"
        />
      </div>
      <div
        className="feature-content"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="circle">{getIcon(name)}</div>
        <span className="feature-title">{title}</span>
        <span className="feature-description">{description}</span>
        {link ? (
          <Link href={link}>
            <a className="openlink">
              {linkText}
              <MdOutlineKeyboardArrowRight />
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
