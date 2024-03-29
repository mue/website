import Link from 'next/link';

export default function Press() {
  return (
    <div className="press-logos">
      <Link href="https://www.producthunt.com/posts/mue">
        <a title="Product Hunt" target="_blank">
          <img
            src="img/producthunt.svg"
            alt="Product Hunt Logo"
            width="250"
            height="59"
            draggable="false"
            className="invert"
          />
        </a>
      </Link>

      <Link href="https://sspai.com/post/69035">
        <a title="少数派" target="_blank">
          <img
            src="img/sspai.svg"
            alt="少数派 Logo"
            width="123"
            height="44"
            draggable="false"
            className="invert"
          />
        </a>
      </Link>

      <Link href="https://www.softpedia.com/get/Internet/Internet-Applications-Addons/Chrome-Extensions/Mue-Tab-for-Chrome.shtml">
        <a title="Softpedia" target="_blank">
          <img
            src="img/softpedia.svg"
            alt="Softpedia Logo"
            width="301"
            height="46"
            draggable="false"
            className="invert"
          />
        </a>
      </Link>

      <Link href="https://www.ghacks.net/2021/04/06/customize-your-new-tab-page-with-random-wallpapers-quotes-with-the-mue-extension-for-firefox-and-chrome/">
        <a title="Ghacks" target="_blank">
          <img
            src="img/ghacks.svg"
            alt="Ghacks Logo"
            height="42"
            width="42"
            draggable="false"
          />
        </a>
      </Link>
    </div>
  );
}
