/* eslint-disable @next/next/no-img-element */
export default function Feature({ reverse, image, fallbackImage, title, description, list }) {
  let classList = "feature";
  if (reverse) {
    classList += " reverse";
  }

  return (
    <div className={classList}>
      <picture>
        <source
          type="image/webp"
          srcSet={image}
          data-aos="fade-right"
          draggable="false"
        />
        <img
          src={fallbackImage}
          alt={title}
          data-aos="fade-right"
          draggable="false"
        />
      </picture>
      <div className="feature-content" data-aos="fade-up">
        <span className="feature-title">{title}</span>
        <span className="feature-description">{description}</span>
        {list ? (
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
