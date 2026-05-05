import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classes from "../../styles/loading-image.module.css";

function LoadingImage(props) {
  const {
    alt,
    className,
    onLoad,
    priority = false,
    style,
    ...imageProps
  } = props;
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageProps.src]);

  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete && image.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imageProps.src]);

  function handleLoad(event) {
    setIsLoaded(true);

    if (typeof onLoad === "function") {
      onLoad(event);
    }
  }

  return (
    <>
      <Image
        {...imageProps}
        alt={alt}
        className={className}
        ref={imageRef}
        priority={priority}
        onLoad={handleLoad}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      />
      {!isLoaded && (
        <div className={classes.overlay} aria-hidden='true'>
          <img className={classes.loaderImage} src='/images/site/loader.gif' alt='' />
        </div>
      )}
    </>
  );
}

export default LoadingImage;
