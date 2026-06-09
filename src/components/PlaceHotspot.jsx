import { ExternalLink } from "lucide-react";
import { googleUrl } from "../utils/places";

export default function PlaceHotspot({ name, light = false }) {
  return (
    <span className={`place-hotspot${light ? " place-hotspot--light" : ""}`}>
      <a
        className="place-label"
        href={googleUrl("search", name)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
        <ExternalLink size={12} aria-hidden="true" />
      </a>
      <span className="place-menu" role="tooltip">
        <strong>{name}</strong>
        <span className="place-menu-actions">
          <a href={googleUrl("reviews", name)} target="_blank" rel="noopener noreferrer">
            Reviews
          </a>
          <a href={googleUrl("images", name)} target="_blank" rel="noopener noreferrer">
            Images
          </a>
          <a href={googleUrl("search", name)} target="_blank" rel="noopener noreferrer">
            Search
          </a>
        </span>
      </span>
    </span>
  );
}
