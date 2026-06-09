import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TRIP_DAYS } from "../data/tripData";
import LinkPlaces from "../components/LinkPlaces";
import PlaceHotspot from "../components/PlaceHotspot";
import SectionHeading from "../components/SectionHeading";
import { assetUrl } from "../utils/assetUrl";
import { googleUrl, CITY_THEME } from "../utils/places";

function hotelImage(city) {
  const images = {
    "Nha Trang": "assets/images/tran-phu-beach.jpg",
    "Da Lat": "assets/images/tuyen-lam-lake.jpg",
    "Hoi An": "assets/images/hoi-an-ancient-town.jpg",
    "Da Nang": "assets/images/my-khe-beach.jpg"
  };
  return assetUrl(images[city] || images["Da Nang"]);
}

function youtubeQuery(city) {
  const queryByCity = {
    "Nha Trang": "Nha Trang Vietnam travel guide",
    "Da Lat": "Da Lat Vietnam travel guide",
    "Hoi An": "Hoi An Vietnam travel guide",
    "Da Nang": "Da Nang Vietnam travel guide"
  };
  return queryByCity[city] || `${city} Vietnam travel guide`;
}

function DetailCard({ name, description, image }) {
  return (
    <article className="detail-card">
      <img src={assetUrl(image)} alt={name} loading="lazy" width={400} height={260} />
      <div>
        <h3>
          <PlaceHotspot name={name} />
        </h3>
        <p>
          <LinkPlaces text={description} />
        </p>
        <div className="quick-actions">
          <a href={googleUrl("reviews", name)} target="_blank" rel="noopener noreferrer">
            Reviews
          </a>
          <a href={googleUrl("images", name)} target="_blank" rel="noopener noreferrer">
            Images
          </a>
        </div>
      </div>
    </article>
  );
}

function HotelCard({ name, stars, note, city }) {
  return (
    <article className="hotel-card">
      <img src={hotelImage(city)} alt={name} loading="lazy" width={400} height={220} />
      <div>
        <span className="hotel-stars">{stars}</span>
        <h3>
          <PlaceHotspot name={name} />
        </h3>
        <p>
          <LinkPlaces text={note} />
        </p>
        <div className="quick-actions">
          <a href={googleUrl("reviews", name)} target="_blank" rel="noopener noreferrer">
            Reviews
          </a>
          <a href={googleUrl("images", name)} target="_blank" rel="noopener noreferrer">
            Images
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DayPage() {
  const { dayNumber } = useParams();
  const day =
    TRIP_DAYS.find((item) => item.day === Number(dayNumber)) || TRIP_DAYS[0];
  const theme = CITY_THEME[day.city] || "sea";
  const query = youtubeQuery(day.city);
  const encodedQuery = encodeURIComponent(query);
  const embedQuery = encodeURIComponent(`${query} popular`);
  const youtube = day.youtube
    ? {
        embedSrc: `https://www.youtube.com/embed/${day.youtube.id}`,
        title: day.youtube.title || query,
        description: day.youtube.description,
        href: day.youtube.href || `https://www.youtube.com/watch?v=${day.youtube.id}`
      }
    : {
        embedSrc: `https://www.youtube.com/embed?listType=search&list=${embedQuery}`,
        title: query,
        description:
          "YouTube changes rankings often, so this pulls a popular destination-guide search instead of freezing one random video forever.",
        href: `https://www.youtube.com/results?search_query=${encodedQuery}`
      };

  useEffect(() => {
    document.title = `${day.title} | Vietnam Travel Planner`;
  }, [day.title]);

  return (
    <>
      <header
        className={`day-hero theme-${theme}`}
        style={{ "--hero-image": `url('${assetUrl(day.hero)}')` }}
      >
        <nav className="detail-nav" aria-label="Day navigation">
          <Link to="/">Overview</Link>
          <Link to="/places">Places</Link>
          <Link to="/tips">Tips</Link>
          {TRIP_DAYS.map((item) => (
            <Link
              key={item.day}
              to={`/day/${item.day}`}
              className={item.day === day.day ? "active" : undefined}
            >
              Day {item.day}
            </Link>
          ))}
        </nav>
        <div className="day-hero-copy">
          <span className="eyebrow">
            {day.date} · {day.city}
          </span>
          <h1>{day.title}</h1>
          <p>
            <LinkPlaces text={day.summary} light />
          </p>
        </div>
      </header>

      <div className="day-layout">
        <section className="detail-section">
          <SectionHeading eyebrow="Plan" title="Schedule" />
          <div className="schedule-list">
            {day.timeline.map(([time, item]) => (
              <p key={`${time}-${item.slice(0, 20)}`}>
                <time>{time}</time>
                <span>
                  <LinkPlaces text={item} />
                </span>
              </p>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <SectionHeading eyebrow="See" title="Attractions" />
          <div className="detail-grid">
            {day.attractions.map(([name, description, image]) => (
              <DetailCard key={name} name={name} description={description} image={image} />
            ))}
          </div>
        </section>

        <section className="detail-section">
          <SectionHeading eyebrow="Eat" title="Food" />
          <div className="detail-grid">
            {day.food.map(([name, description, image]) => (
              <DetailCard key={name} name={name} description={description} image={image} />
            ))}
          </div>
        </section>

        <section className="detail-section">
          <SectionHeading eyebrow="Watch" title="Popular YouTube guide" />
          <article className="video-card">
            <iframe
              title={youtube.title}
              src={youtube.embedSrc}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div>
              <h3>{youtube.title}</h3>
              {youtube.description && <p>{youtube.description}</p>}
              <a href={youtube.href} target="_blank" rel="noopener noreferrer">
                {day.youtube ? "Open on YouTube" : "Open more videos"}
              </a>
            </div>
          </article>
        </section>

        <section className="detail-section">
          <SectionHeading eyebrow="Stay" title="3–4 star hotel options" />
          <div className="hotel-grid">
            {day.hotels.map(([name, stars, note]) => (
              <HotelCard key={name} name={name} stars={stars} note={note} city={day.city} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
