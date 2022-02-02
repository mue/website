/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function Carousel() {
  const autoplay = useRef(
    Autoplay(
      { delay: 2500, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({}, [autoplay.current]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scroll = useCallback(
    (direction) => {
      if (!emblaApi) {
        return;
      }

      if (direction === "next") {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollPrev();
      }
      autoplay.current.reset();
    },
    [emblaApi]
  );

  const url = "https://res.cloudinary.com/mue/website/shareyourmue";
  const alt_url =
    "https://res.cloudinary.com/mue/website/fallback/shareyourmue";
  const count = 4;

  return (
    <div className="carousel">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {[...Array(count)].map((e, index) => (
            <div className="carousel-slide" key={index}>
              <div className="carousel-slideinner">
                <picture>
                  <source
                    type="image/webp"
                    className="carousel-slideimg"
                    srcSet={url + (index + 1) + ".webp"}
                    draggable="false"
                  />
                  <img
                    className="carousel-slideimg"
                    src={alt_url + (index + 1) + ".jpg"}
                    alt={"#shareyourmue setup " + (index + 1)}
                    draggable="false"
                  />
                </picture>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-button carousel-prev"
        onClick={() => scroll("prev")}
        disabled={!prevBtnEnabled}
        title="Previous"
      >
        <MdArrowBackIos />
      </button>
      <button
        className="carousel-button carousel-next"
        onClick={() => scroll("next")}
        disabled={!nextBtnEnabled}
        title="Next"
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
}
