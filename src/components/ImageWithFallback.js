import { useState } from "react";
import Image from "next/image";

export default function ImageWithFallback(props) {
  const { fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(props.src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={alt}
    />
  );
}
