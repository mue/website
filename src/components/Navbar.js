import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

import { useTranslation } from "next-i18next";

import * as Constants from "../modules/constants";
import catchTranslationError from "../modules/catchTranslationError";

export default function Navbar() {
  // scroll animation
  useEffect(() => {
    window.onscroll = () => {
      const nav = document.querySelector(".navbar");
      if (nav) {
        if (window.scrollY <= 10) {
          nav.className = "navbar";
        } else {
          nav.className = "navbar scroll";
        }
        setCloseIcon(false);
      }
    };
  });

  const [closeIcon, setCloseIcon] = useState(false);

  const changeClassList = () => {
    document.querySelector(".navbar").classList.toggle("responsive");
    if (closeIcon) {
      setCloseIcon(false);
    } else {
      setCloseIcon(true);
    }
  };

  const { t } = useTranslation("navbar");

  return (
    <div className="navbar">
      {/* umami */}
      <Script
        src="https://umami.muetab.com/umami.js"
        async
        defer
        data-website-id={Constants.umami_id}
      />
      <div className="navbarContent">
        <ul>
          <li>
            <Link href="/">
              <a title="Home">
                <Image
                  src="https://res.cloudinary.com/mue/website/logo_navbar.svg"
                  alt="Mue Logo"
                  width="80"
                  height="80"
                  draggable="false"
                />
              </a>
            </Link>
          </li>
        </ul>
        <ul className="links">
          <li>
            <Link href="/features">
              <a>{catchTranslationError(t("features"), "Features")}</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>{catchTranslationError(t("about"), "About")}</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>{catchTranslationError(t("contact"), "Contact")}</a>
            </Link>
          </li>
          <li>
            <Link href="https://blog.muetab.com">
              <a>{catchTranslationError(t("blog"), "Blog")}</a>
            </Link>
          </li>
        </ul>
        <Link href="/download">
          <a>
            <button className="filled">
              {catchTranslationError(t("get_started"), "Get started")}
              <MdOutlineKeyboardArrowRight />
            </button>
          </a>
        </Link>
        <ul className="dropdownButton" onClick={() => changeClassList()}>
          {closeIcon ? <AiOutlineClose /> : <AiOutlineMenu />}
        </ul>
      </div>
    </div>
  );
}
