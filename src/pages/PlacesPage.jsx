import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PLACE_CITIES } from "../data/placesData";
import SectionHeading from "../components/SectionHeading";
import { assetUrl } from "../utils/assetUrl";
import { googleUrl } from "../utils/places";

function PlaceCard({ place, city }) {
  return (
    <article className="place-card" data-city={city.id}>
      <img
        src={assetUrl(place.image)}
        alt={place.name}
        loading="lazy"
        width={400}
        height={300}
      />
      <div className="place-card-body">
        <div className="place-card-top">
          <span className={`tag-pill ${city.color}`}>{place.tag}</span>
          <span className="day-link">Day {place.day}</span>
        </div>
        <h3>{place.name}</h3>
        <p className="zh-label">{place.zh}</p>
        <p>{place.note}</p>
        <div className="quick-actions">
          <a href={googleUrl("reviews", place.name)} target="_blank" rel="noopener noreferrer">
            Reviews
          </a>
          <a href={googleUrl("images", place.name)} target="_blank" rel="noopener noreferrer">
            Photos
          </a>
          <Link to={`/day/${place.day}`}>Day plan</Link>
        </div>
      </div>
    </article>
  );
}

function CitySection({ city, hidden }) {
  return (
    <section className="city-section" id={city.id} data-city={city.id} hidden={hidden || undefined}>
      <div
        className="city-header"
        style={{ "--city-image": `url('${assetUrl(city.image)}')` }}
      >
        <div>
          <span className="eyebrow">{city.tagline}</span>
          <h2>{city.name}</h2>
          <p>{city.summary}</p>
        </div>
        <span className="city-count">{city.places.length} spots</span>
      </div>
      <div className="places-grid">
        {city.places.map((place) => (
          <PlaceCard key={place.name} place={place} city={city} />
        ))}
      </div>
    </section>
  );
}

export default function PlacesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const totalPlaces = useMemo(() => {
    return PLACE_CITIES.reduce((sum, city) => {
      if (activeFilter === "all" || city.id === activeFilter) return sum + city.places.length;
      return sum;
    }, 0);
  }, [activeFilter]);

  useEffect(() => {
    document.title = "Places | Vietnam Travel Planner";
  }, []);

  return (
    <>
      <header className="page-header">
        <SectionHeading
          eyebrow="Explore"
          title="Places to visit"
          description="Attractions popular with Malaysian and Chinese travellers — sourced from Vietnamstour packages, Klook MY, KKday, and Xiaohongshu collections."
        />
        <div className="filter-bar">
          <button
            type="button"
            className={`filter-chip${activeFilter === "all" ? " active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All cities
          </button>
          {PLACE_CITIES.map((city) => (
            <button
              key={city.id}
              type="button"
              className={`filter-chip${activeFilter === city.id ? " active" : ""}`}
              onClick={() => setActiveFilter(city.id)}
            >
              {city.name}
            </button>
          ))}
          <span className="place-count">{totalPlaces} places</span>
        </div>
      </header>

      <div className="places-content">
        {PLACE_CITIES.map((city) => (
          <CitySection
            key={city.id}
            city={city}
            hidden={activeFilter !== "all" && activeFilter !== city.id}
          />
        ))}
      </div>
    </>
  );
}
