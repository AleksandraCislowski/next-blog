import { useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

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
