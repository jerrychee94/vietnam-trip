import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { googleUrl } from "../utils/places";

export default function PlaceHotspot({ name, light = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <span
      ref={rootRef}
      className={`place-hotspot${light ? " place-hotspot--light" : ""}${open ? " place-hotspot--open" : ""}`}
    >
      <button
        type="button"
        className="place-label"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {name}
        <ExternalLink size={12} aria-hidden="true" />
      </button>
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
