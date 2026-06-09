import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TRIP_DAYS } from "../data/tripData";
import { DAY_SHORT, CITY_THEME } from "../utils/places";
import LinkPlaces from "./LinkPlaces";

const SCHEDULES = {
  1: [
    ["11:00", "Land at Cam Ranh (CXR)."],
    ["12:00", "Transfer to Nha Trang and hotel check-in."],
    ["14:00", "Thap Ba or I-Resort mud bath — book 2–3 hour slot."],
    ["18:30", "Optional Tran Phu sunset walk."],
    ["19:30", "Seafood dinner. Early night before VinWonders."]
  ],
  2: [
    ["08:15", "Grab to Vinpearl Harbour (Cau Da)."],
    ["08:45", "Vinpearl cable car over the bay to Hon Tre Island."],
    ["09:30", "Full day at VinWonders theme park and water park."],
    ["17:30", "Cable car back to mainland."],
    ["21:00", "Pack for Da Lat transfer tomorrow."]
  ],
  3: [
    ["08:00", "Drive from Nha Trang to Da Lat (~3–4 h)."],
    ["12:00", "Check in near Da Lat Market."],
    ["14:00", "Da Lat Market — flowers, coffee, strawberries."],
    ["18:30", "Night market — banh trang nuong, street food."]
  ],
  4: [
    ["08:00", "Datanla Waterfall + alpine coaster (early)."],
    ["13:30", "Crazy House — 1.5–2 hours inside."],
    ["17:30", "Lumiere Da Lat light gardens (book timed entry)."],
    ["20:00", "Hotpot dinner near market."]
  ],
  5: [
    ["08:00", "Da Lat Market — souvenirs, coffee beans, strawberries."],
    ["10:30", "Checkout; rest before overnight bus."],
    ["21:00", "Sleeper bus to Hoi An (~10 h)."]
  ],
  6: [
    ["07:00", "Arrive, pho breakfast, hotel check-in or luggage hold."],
    ["10:30", "Ancient Town: Japanese Bridge, Fujian Assembly Hall, tailor streets."],
    ["15:00", "Cam Thanh coconut basket boat OR An Bang Beach rest."],
    ["17:30", "Banh Mi Phuong snack stop before old town lights up."],
    ["19:00", "Lantern-lit riverside dinner and night market stroll."]
  ],
  7: [
    ["07:30", "Grab from Hoi An to Da Nang (~45 min)."],
    ["09:00", "Marble Mountains — caves and pagodas before heat."],
    ["11:30", "Cham Sculpture Museum (air-con culture break)."],
    ["13:00", "Mi Quang lunch, hotel check-in, My Khe Beach afternoon."],
    ["19:30", "Han River dinner and Dragon Bridge night lights."]
  ],
  8: [
    ["08:00", "Breakfast: banh mi, coffee, or hotel buffet."],
    ["10:00", "Buy coffee, dried fruit, or local snacks."],
    ["TBD", "Leave for Da Nang International Airport with a two-hour buffer."]
  ]
};

export default function DayCard({ day, active = false }) {
  const theme = CITY_THEME[day.city] || "sea";
  const schedule = SCHEDULES[day.day] || day.timeline.slice(0, 5).map(([time, text]) => [time, text]);

  return (
    <article
      className={`day-card day-card--${theme}${active ? " active-day" : ""}`}
      id={`day-${day.day}`}
      data-city={day.city}
    >
      <div className="day-card-head">
        <div className="day-date" aria-hidden="true">
          <strong>{day.day}</strong>
          <span>{DAY_SHORT[day.day - 1]} Aug</span>
        </div>
        <div className="day-head-copy">
          <span className={`city-tag ${theme}`}>{day.city}</span>
          <h3>{day.title}</h3>
        </div>
      </div>

      <Link className={`day-open-btn ${theme}`} to={`/day/${day.day}`}>
        View Day {day.day} plan
        <ArrowRight size={18} aria-hidden="true" />
      </Link>

      <ul className="schedule">
        {schedule.map(([time, text]) => (
          <li key={time}>
            <time dateTime={time}>{time}</time>
            <span>
              <LinkPlaces text={text} />
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export { TRIP_DAYS };
