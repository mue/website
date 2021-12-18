import Head from "../components/Head";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import GetStarted from "../components/GetStarted";

import TeamCard from "../components/about/TeamCard";

import { FaGithub } from "react-icons/fa";
import { MdGroups, MdOutlineKeyboardArrowRight } from "react-icons/md";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import * as Constants from "../modules/constants";

export async function getServerSideProps(context) {
  const sponsors = (
    await (await fetch(Constants.sponsors_api)).json()
  ).sponsors;
  return {
    props: {
      sponsors,
      ...(await serverSideTranslations(context.locale, ["about", "navbar", "footer", "getstarted"])),
    },
  };
}

export default function About({ sponsors }) {
  const { t } = useTranslation("about");

  return (
    <>
      <Head title={t("title")} />
      <Navbar />
      <header>
        <div className="promotion">
          <span>{t("title")}</span>
          <br />
          <span className="two">{t("description")}</span>
        </div>
      </header>
      <div style={{ marginTop: "500pt" }} className="aboutUs vision">
        <div className="content">
          <h1>
            A little about <b>us</b>.
          </h1>
          <p data-aos="fade-up">{t("vision")}</p>
          <Link href="#team">
            <a className="openlink">
              {t("team.title")}
              <MdOutlineKeyboardArrowRight />
            </a>
          </Link>
        </div>
      </div>
      <div className="press statistics">
        <div className="content">
          <h1>{t("statistics.title")}</h1>
          <div className="press-logos">
            <div className="statistics-content" data-aos="fade-right">
              <span>1000+</span>
              <span>{t("statistics.users")}</span>
            </div>
            <hr />
            <div className="statistics-content" data-aos="fade-right">
              <span>200+</span>
              <span>{t("statistics.stars")}</span>
            </div>
            <hr />
            <div className="statistics-content" data-aos="fade-right">
              <span>20+</span>
              <span>{t("statistics.updates")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="faq team" id="team">
        <div className="content">
          <div className="desc">
            <div className="circle">
              <MdGroups />
            </div>
            <h1>{t("team.title")}</h1>
            <p>{t("team.description")}</p>
          </div>
          <div className="team-cards" data-aos="fade-right">
            <TeamCard
              name="David Ralph"
              title={t("team.lead_dev")}
              image="https://res.cloudinary.com/mue/image/upload/v1639311162/website/davidcralph.webp"
              twitter="davidcralph"
              github="davidcralph"
              website="https://davidcralph.co.uk"
            />
            <TeamCard
              name="Alex Sparkes"
              title={t("team.lead_design")}
              image="https://res.cloudinary.com/mue/website/alexsparkes.webp"
              twitter="AlexmSparkes"
              github="alexsparkes"
            />
            <TeamCard
              name="Isaac Saunders"
              title={t("team.qa_dev")}
              image="https://res.cloudinary.com/mue/image/upload/v1639159068/website/eartharoid.webp"
              twitter="eartharoid"
              github="eartharoid"
              website="https:///eartharoid.me"
            />
            <TeamCard
              name="Wessel Tip"
              title={t("team.dev")}
              image="https://res.cloudinary.com/mue/image/upload/v1639505831/website/wesseltip.webp"
              twitter="wessel_tip"
              github="Wessel"
              website="https:///wessel.meek.moe"
            />
          </div>
        </div>
      </div>
      <div className="faq supporters">
        <div className="content reverse">
          <div className="desc">
            <div className="circle">
              <MdGroups />
            </div>
            <h1>{t("supporters.title")}</h1>
            <p>{t("supporters.description")}</p>
            <Link href="https://github.com/sponsors/davidcralph">
              <a className="openlink">
                {t("supporters.support_us")} <MdOutlineKeyboardArrowRight />
              </a>
            </Link>
          </div>
          <div className="team-cards">
            <div className="team-cards" data-aos="fade-left">
              {sponsors
                ? sponsors.map((sponsor) => {
                    return (
                      <div className="card" key={sponsor.handle}>
                        <Image
                          src={sponsor.avatar}
                          alt={sponsor.handle + " avatar"}
                          height="100"
                          width="100"
                        />
                        <span className="card-title">{sponsor.handle}</span>
                        <div className="circles">
                          <Link href={"https://github.com/" + sponsor.handle}>
                            <a title={sponsor.handle + " on GitHub"}>
                              <div className="circle">
                                <FaGithub />
                              </div>
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : t("supporters.none")}
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
      <Footer />
    </>
  );
}
