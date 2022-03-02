import { FaTwitter, FaGithub, FaHome } from "react-icons/fa";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

export default function TeamCard({ image, fallbackImage, name, title, twitter, github, website }) {
  return (
    <div className="card">
      <ImageWithFallback
        src={image}
        fallbackSrc={fallbackImage}
        alt={name + " avatar"}
        width="180"
        height="180"
        draggable="false"
      />
      <span className="card-title">{name}</span>
      <span className="card-desc">{title}</span>
      <div className="circles">
        <Link href={"https://twitter.com/" + twitter}>
          <a title={name + " on Twitter"}>
            <div className="circle">
              <FaTwitter />
            </div>
          </a>
        </Link>
        <Link href={"https://github.com/" + github}>
          <a title={name + " on GitHub"}>
            <div className="circle">
              <FaGithub />
            </div>
          </a>
        </Link>
        {website ? (
          <Link href={website}>
            <a title={name + "'s website"}>
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
