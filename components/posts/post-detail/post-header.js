import Image from "next/image";
import { useMemo } from "react";
import TravelMap from "../../maps/travel-map";
import classes from "../../../styles/post-header.module.css";

function PostHeader(props) {
  const { post } = props;
  const { title, imagePath, location, date, readingTime, tripType, tags } = post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const place = [location?.city, location?.country].filter(Boolean).join(", ");
  const visibleTags = tags?.slice(0, 4) || [];
  const mapPlaces = useMemo(() => [post], [post]);

  return (
    <header className={classes.header}>
      <div className={classes.copy}>
        <p className={classes.kicker}>{place || "Travel note"}</p>
        <h1>{title}</h1>
        <div className={classes.meta}>
          <time>{formattedDate}</time>
          {readingTime && <span>{readingTime} min read</span>}
          {tripType && <span>{tripType}</span>}
        </div>
        {visibleTags.length > 0 && (
          <ul className={classes.tags} aria-label={`Tags for ${title}`}>
            {visibleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {location?.coordinates && (
          <div className={classes.mapPanel}>
            <p>Location</p>
            <div className={classes.map} aria-label={`Map showing ${place}`}>
              <TravelMap places={mapPlaces} focused />
            </div>
          </div>
        )}
      </div>
      <div className={classes.image}>
        <Image
          src={imagePath}
          alt={title}
          fill
          priority
          quality={90}
          sizes='(min-width: 768px) 42vw, 100vw'
        />
      </div>
    </header>
  );
}

export default PostHeader;
