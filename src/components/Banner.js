import { MdClose } from "react-icons/md";

export default function Banner() {
  // todo: make this a constant in other file
  const bannerName = "not finished";

  const closeBanner = () => {
    document.querySelector(".banner").style.display = "none";
    localStorage.setItem("banner" + bannerName, false);
  };

  return null;

  return (
    <div className="banner">
      <span>not finished</span>
      <span className="banner-close" onClick={() => closeBanner()}>
        <MdClose />
      </span>
    </div>
  );
}
