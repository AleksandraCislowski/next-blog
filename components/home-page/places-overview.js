import { useMemo } from "react";
import Link from "next/link";
import TravelMap from "../maps/travel-map";
import { getCountryFlag } from "../../lib/country-flags";
import classes from "../../styles/places-overview.module.css";

function PlacesOverview(props) {
  const places = useMemo(
    () => props.posts.filter((post) => post.location?.coordinates),
    [props.posts]
  );
  const sortedPlaces = useMemo(() => {
    return [...places].sort((firstPlace, secondPlace) => {
      const firstLabel = [firstPlace.location.country, firstPlace.location.city]
        .filter(Boolean)
        .join(" ");
      const secondLabel = [secondPlace.location.country, secondPlace.location.city]
        .filter(Boolean)
        .join(" ");

      return firstLabel.localeCompare(secondLabel, "en", { sensitivity: "base" });
    });
  }, [places]);

  return (
    <section className={classes.section} aria-labelledby='places-heading'>
      <div className={classes.copy}>
        <p className={classes.kicker}>Places so far</p>
        <h2 id='places-heading'>A small atlas of notes already written.</h2>
        <p>
          Each point comes from the post metadata, turning the archive into a living travel
          log instead of a static list.
        </p>
      </div>

      <div className={classes.layout}>
        <div className={classes.map} aria-label='Mapped travel notes'>
          <TravelMap
            places={places}
            ariaLabel='Map of travel notes published on Elsewhere Log'
          />
        </div>

        <ol className={classes.placeList}>
          {sortedPlaces.map((place) => (
            <li key={place.slug}>
              <Link href={`/posts/${place.slug}`}>
                <span className={classes.country}>
                  <span className={classes.flag} aria-hidden='true'>
                    {getCountryFlag(place.location.country)}
                  </span>
                  {place.location.country}
                </span>
                <strong>{place.location.city}</strong>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default PlacesOverview;
