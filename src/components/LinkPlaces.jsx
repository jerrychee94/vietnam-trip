import PlaceHotspot from "./PlaceHotspot";
import { ALL_PLACE_NAMES } from "../utils/places";

const pattern = new RegExp(
  `(${ALL_PLACE_NAMES.map((place) => place.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

export default function LinkPlaces({ text, light = false }) {
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        ALL_PLACE_NAMES.includes(part) ? (
          <PlaceHotspot key={`${part}-${index}`} name={part} light={light} />
        ) : (
          <span key={`text-${index}`}>{part}</span>
        )
      )}
    </>
  );
}
