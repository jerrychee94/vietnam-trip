import { useEffect, useMemo, useState } from "react";
import { ExternalLink, MapPin, Maximize2 } from "lucide-react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from "react-leaflet";
import { MAP_STOPS, ROUTE_LINE, ROUTE_STOPS } from "../data/routeStops";
import "leaflet/dist/leaflet.css";

const STOP_COLORS = {
  cxr: "#0891b2",
  "nha-trang": "#0891b2",
  "da-lat": "#059669",
  "hoi-an": "#ea580c",
  "da-nang": "#2563eb",
  dad: "#2563eb"
};

function osmPlaceUrl(lat, lng) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`;
}

function osmDirectionsUrl() {
  const coords = MAP_STOPS.map((s) => `${s.lat},${s.lng}`).join(";");
  return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${coords}`;
}

function MapFocus({ stop, fitAll }) {
  const map = useMap();

  useEffect(() => {
    if (fitAll) {
      map.fitBounds(ROUTE_LINE, { padding: [28, 28], maxZoom: 8 });
      return;
    }
    if (stop?.onMap) {
      map.flyTo([stop.lat, stop.lng], 11, { duration: 0.7 });
    }
  }, [stop, fitAll, map]);

  return null;
}

export default function RouteMap() {
  const [activeStop, setActiveStop] = useState(ROUTE_STOPS[1]);
  const [fitAll, setFitAll] = useState(true);
  const mapCenter = useMemo(() => {
    const lats = MAP_STOPS.map((s) => s.lat);
    const lngs = MAP_STOPS.map((s) => s.lng);
    return [(Math.min(...lats) + Math.max(...lats)) / 2, (Math.min(...lngs) + Math.max(...lngs)) / 2];
  }, []);

  function selectStop(stop) {
    setFitAll(false);
    setActiveStop(stop);
  }

  function focusRoute() {
    setFitAll(true);
    setActiveStop(ROUTE_STOPS[1]);
  }

  return (
    <div className="map-card">
      <div className="map-toolbar">
        <span className="label">Trip route · OpenStreetMap</span>
        <div className="map-toolbar-actions">
          <button type="button" className="btn btn-sm" onClick={focusRoute} aria-label="Fit full route">
            <Maximize2 size={16} aria-hidden="true" />
            Fit route
          </button>
          <a
            className="btn btn-sm"
            href={osmDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Directions
          </a>
        </div>
      </div>

      <div className="leaflet-map-wrap">
        <MapContainer
          center={mapCenter}
          zoom={7}
          scrollWheelZoom={false}
          touchZoom
          className="route-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={ROUTE_LINE} pathOptions={{ color: "#ea580c", weight: 4, opacity: 0.85 }} />
          {MAP_STOPS.map((stop) => (
            <CircleMarker
              key={stop.id}
              center={[stop.lat, stop.lng]}
              radius={activeStop.id === stop.id ? 11 : 8}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: STOP_COLORS[stop.id] || "#ea580c",
                fillOpacity: 0.95
              }}
              eventHandlers={{ click: () => selectStop(stop) }}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                {stop.note}
              </Popup>
            </CircleMarker>
          ))}
          <MapFocus stop={activeStop} fitAll={fitAll} />
        </MapContainer>
      </div>

      <div className="route-stops" role="list" aria-label="Route stops">
        {ROUTE_STOPS.map((stop) => (
          <button
            key={stop.id}
            type="button"
            role="listitem"
            className={`route-stop${activeStop.id === stop.id ? " active" : ""}`}
            onClick={() => selectStop(stop)}
            aria-pressed={activeStop.id === stop.id}
          >
            <MapPin size={14} aria-hidden="true" />
            <span>{stop.label}</span>
          </button>
        ))}
      </div>

      <p className="map-readout" aria-live="polite">
        <strong>{activeStop.name}</strong> — {activeStop.note}{" "}
        {activeStop.onMap ? (
          <a href={osmPlaceUrl(activeStop.lat, activeStop.lng)} target="_blank" rel="noopener noreferrer">
            Open in OpenStreetMap
          </a>
        ) : (
          <span className="map-readout-flight">Flight leg only — not shown on the Vietnam map.</span>
        )}
      </p>
    </div>
  );
}
