import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plane } from "lucide-react";
import DayCard, { TRIP_DAYS } from "../components/DayCard";
import RouteMap from "../components/RouteMap";
import SectionHeading from "../components/SectionHeading";
import { assetUrl } from "../utils/assetUrl";
import { DAY_SHORT } from "../utils/places";

export default function OverviewPage() {
  useEffect(() => {
    document.title = "Vietnam Coastal Highlands Planner";

    const cards = [...document.querySelectorAll(".day-card")];
    const navLinks = [...document.querySelectorAll(".trip-nav a[href^='#day-']")];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        cards.forEach((card) => card.classList.toggle("active-day", card === visible.target));
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
        document.querySelectorAll(".day-jump-bar a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0.2, 0.45, 0.7] }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="hero" id="overview">
        <div className="hero-copy">
          <span className="eyebrow">Personal itinerary</span>
          <h1>
            Vietnam coastal
            <em> highlands</em> trip
          </h1>
          <p>
            Fly KUL to Cam Ranh (1 Aug, 11:00), mud bath then Vinpearl cable car and VinWonders in
            Nha Trang, three nights in Da Lat, overnight bus to Hoi An, full Da Nang day on 7 Aug,
            then fly home from DAD on 8 Aug.
          </p>
          <div className="hero-actions">
            <a href="#itinerary" className="btn btn-primary">
              View itinerary
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link to="/places" className="btn btn-ghost">
              Browse 40+ places
            </Link>
            <Link to="/tips" className="btn btn-ghost">
              MY traveller tips
            </Link>
          </div>
        </div>
        <div
          className="hero-photo"
          role="img"
          aria-label="Vietnam coastal city at dusk"
          style={{ backgroundImage: `url(${assetUrl("assets/images/hoi-an-ancient-town.jpg")})` }}
        >
          <div className="flight-card">
            <Plane size={18} aria-hidden="true" />
            <span>Arrival</span>
            <strong>KUL → CXR</strong>
            <small>1 Aug 2026, 11:00</small>
          </div>
        </div>
      </section>

      <section className="summary-grid" aria-label="Trip summary">
        <article>
          <span className="label">Start</span>
          <strong>Kuala Lumpur → Cam Ranh</strong>
          <p>Land 1 Aug 11:00. Mud bath same day; VinWonders full day on 2 Aug.</p>
        </article>
        <article>
          <span className="label">Longest leg</span>
          <strong>Da Lat → Hoi An</strong>
          <p>Sleeper bus target window: about 10 hours overnight.</p>
        </article>
        <article>
          <span className="label">Final full day</span>
          <strong>Da Nang on 7 Aug</strong>
          <p>Marble Mountains, My Khe Beach, Han River, and Dragon Bridge.</p>
        </article>
      </section>

      <section className="workspace" id="itinerary">
        <div className="timeline-panel" aria-label="Day by day itinerary">
          <SectionHeading eyebrow="Itinerary board" title="Day-by-day plan" />

          <nav className="day-jump-bar" aria-label="Jump to day">
            {TRIP_DAYS.map((day) => (
              <a key={day.day} href={`#day-${day.day}`}>
                <strong>{day.day}</strong>
                <span>{DAY_SHORT[day.day - 1]}</span>
              </a>
            ))}
          </nav>

          {TRIP_DAYS.map((day) => (
            <DayCard key={day.day} day={day} />
          ))}
        </div>

        <aside className="map-panel" aria-label="Route map and trip details">
          <RouteMap />

          <div className="info-stack">
            <article>
              <h3>Transport notes</h3>
              <p>
                <strong>CXR → Nha Trang:</strong> airport transfer first, then local taxis or Grab.
              </p>
              <p>
                <strong>Nha Trang → Da Lat:</strong> mountain transfer around half a day; avoid late
                departures.
              </p>
              <p>
                <strong>Da Lat → Hoi An:</strong> sleeper bus night; keep snacks, hoodie, and motion
                tablets handy.
              </p>
              <p>
                <strong>Hoi An → Da Nang:</strong> car or shuttle is simplest for the airport-side
                finish.
              </p>
            </article>

            <article id="checklist">
              <h3>Booking checklist</h3>
              <label>
                <input type="checkbox" /> Confirm KUL to CXR flight details
              </label>
              <label>
                <input type="checkbox" /> Hold Nha Trang hotel near Tran Phu
              </label>
              <label>
                <input type="checkbox" /> Reserve Da Lat hotel near night market
              </label>
              <label>
                <input type="checkbox" /> Book Da Lat to Hoi An sleeper bus
              </label>
              <label>
                <input type="checkbox" /> Keep Da Nang hotel close to DAD or My Khe
              </label>
            </article>

            <article>
              <h3>Sources</h3>
              <p>
                Route inspired by{" "}
                <a
                  href="https://vietnamstour.com/tours/nhatrang-dalat-5days-tour-package-chinese/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vietnamstour Nha Trang–Da Lat package
                </a>
                , Klook MY, KKday, and Malaysian travel blogs.
              </p>
              <p>
                <Link to="/places">See all 40+ places →</Link>
              </p>
            </article>
          </div>
        </aside>
      </section>
    </>
  );
}
