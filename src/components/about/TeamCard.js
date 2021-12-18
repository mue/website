import { FaTwitter, FaGithub, FaHome } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function TeamCard(props) {
  return (
    <div className="card">
      <Image
        src={props.image}
        alt={props.name + " avatar"}
        width="180"
        height="180"
        draggable="false"
      />
      <span className="card-title">{props.name}</span>
      <span className="card-desc">{props.title}</span>
      <div className="circles">
        <Link href={"https://twitter.com/" + props.twitter}>
          <a title={props.name + " on Twitter"}>
            <div className="circle">
              <FaTwitter />
            </div>
          </a>
        </Link>
        <Link href={"https://github.com/" + props.github}>
          <a title={props.name + " on GitHub"}>
            <div className="circle">
              <FaGithub />
            </div>
          </a>
        </Link>
        {props.website ? (
          <Link href={props.website}>
            <a title={props.name + "'s website"}>
              <div className="circle">
                <FaHome />
              </div>
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
