/* eslint-disable @next/next/no-img-element */
export default function Feature(props) {
  let classList = "feature";
  if (props.reverse) {
    classList += " reverse";
  }

  return (
    <div className={classList}>
      <picture>
        <source
          type="image/webp"
          srcSet={props.image}
          data-aos="fade-right"
          draggable="false"
        />
        <img
          src={props.fallbackImage}
          alt={props.title}
          data-aos="fade-right"
          draggable="false"
        />
      </picture>
      <div className="feature-content" data-aos="fade-up">
        <span className="feature-title">{props.title}</span>
        <span className="feature-description">{props.description}</span>
        {props.list ? (
          <ul>
            {props.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
