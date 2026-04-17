import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import classes from "../../styles/travel-map.module.css";

const TILE_LAYER_URL =
  "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function TravelMap(props) {
  const {
    places,
    className = "",
    focused = false,
    interactive = true,
    ariaLabel,
  } = props;
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const router = useRouter();
  const mapLabel =
    ariaLabel ||
    `Map showing ${places
      .map((place) => [place.location.city, place.location.country].filter(Boolean).join(", "))
      .join("; ")}`;

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      const L = await import("leaflet");

      if (!isMounted || !mapRef.current || leafletMapRef.current || places.length === 0) {
        return;
      }

      const map = L.map(mapRef.current, {
        dragging: interactive,
        doubleClickZoom: interactive,
        scrollWheelZoom: false,
        touchZoom: interactive,
        zoomControl: interactive,
      });
      leafletMapRef.current = map;
      map.attributionControl.setPrefix(false);

      L.tileLayer(TILE_LAYER_URL, {
        attribution: TILE_ATTRIBUTION,
        maxZoom: 18,
        subdomains: "abcd",
      }).addTo(map);

      const bounds = L.latLngBounds(
        places.map((place) => [
          place.location.coordinates.lat,
          place.location.coordinates.lng,
        ])
      );

      places.forEach((place) => {
        const { lat, lng } = place.location.coordinates;
        const label = `${place.location.city}, ${place.location.country}`;

        L.circleMarker([lat, lng], {
          radius: focused ? 9 : 8,
          color: "#f7f4ee",
          weight: 2,
          fillColor: "#b7624f",
          fillOpacity: 1,
        })
          .addTo(map)
          .bindTooltip(label, {
            direction: "top",
            offset: [0, -8],
            permanent: focused,
          })
          .on("click", () => {
            if (place.slug) {
              router.push(`/posts/${place.slug}`);
            }
          });
      });

      if (focused && places[0]?.location?.coordinates) {
        const { lat, lng } = places[0].location.coordinates;
        map.setView([lat, lng], 5);
      } else {
        map.fitBounds(bounds, {
          padding: [32, 32],
          maxZoom: 5,
        });
      }
    }

    loadMap();

    return () => {
      isMounted = false;

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [focused, interactive, places, router]);

  return (
    <div
      ref={mapRef}
      className={`${classes.mapCanvas} ${className}`}
      aria-label={mapLabel}
    />
  );
}

export default TravelMap;
