import { useMemo } from "react";
import TravelMap from "../../maps/travel-map";
import LoadingImage from "../../ui/loading-image";
import { getCountryFlagBackground } from "../../../lib/country-flags";
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
  const countryFlagBackground = getCountryFlagBackground(location?.country);
  const visibleTags = tags?.slice(0, 4) || [];
  const mapPlaces = useMemo(() => [post], [post]);
  const fieldNotes = [
    { label: "Place", value: place },
    { label: "Region", value: location?.region },
    { label: "Trip type", value: tripType },
    { label: "Read", value: readingTime ? `${readingTime} min` : "" },
  ].filter((item) => item.value);

  return (
    <header
      className={classes.header}
      style={
        countryFlagBackground
          ? { "--post-flag-background": `url(${countryFlagBackground})` }
          : undefined
      }
    >
      <div className={classes.intro}>
        <p className={classes.kicker}>{place || "Travel note"}</p>
        <h1>{title}</h1>
      </div>
      <div className={classes.image}>
        <LoadingImage
          src={imagePath}
          alt={title}
          fill
          priority
          quality={82}
          sizes='(min-width: 1200px) 38rem, (min-width: 1024px) 46vw, (min-width: 768px) 84vw, 90vw'
        />
      </div>
      <div className={classes.details}>
        <dl className={classes.fieldNotes} aria-label='Travel note summary'>
          <div>
            <dt>Date</dt>
            <dd>
              <time dateTime={date}>{formattedDate}</time>
            </dd>
          </div>
          {fieldNotes.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
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
              <TravelMap places={mapPlaces} focused ariaLabel={`Map showing ${place}`} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default PostHeader;
