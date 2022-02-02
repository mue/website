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

export default function Feature(props) {
  let classList = "feature";
  if (props.reverse) {
    classList += " reverse";
  }

  return (
    <div className={classList}>
      <div style={{ position: "relative", height: "200px" }}>
        <img
          data-aos="fade-right"
          src={props.image}
          alt={props.title}
          draggable="false"
        />
      </div>
      <div
        className="feature-content"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="circle">{getIcon(props.name)}</div>
        <span className="feature-title">{props.title}</span>
        <span className="feature-description">{props.description}</span>
        {props.link ? (
          <Link href={props.link}>
            <a className="openlink">
              {props.linkText}
              <MdOutlineKeyboardArrowRight />
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
