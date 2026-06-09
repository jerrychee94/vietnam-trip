import { useEffect } from "react";
import { MY_TRAVEL_TIPS } from "../data/placesData";
import SectionHeading from "../components/SectionHeading";
import {
  BadgeCheck,
  Plane,
  Wallet,
  Smartphone,
  UtensilsCrossed,
  Bus,
  Luggage,
  ShieldAlert
} from "lucide-react";

const TIP_ORDER = [
  "cautions",
  "visa",
  "flights",
  "money",
  "apps",
  "food",
  "transport",
  "packing"
];

const TIP_ICONS = {
  cautions: ShieldAlert,
  visa: BadgeCheck,
  flights: Plane,
  money: Wallet,
  apps: Smartphone,
  food: UtensilsCrossed,
  transport: Bus,
  packing: Luggage
};

const CHECKLIST = [
  "KUL → CXR flight (1 Aug, land ~11:00)",
  "DAD → KUL return (8 Aug)",
  "Nha Trang hotel near Tran Phu (2 nights)",
  "Da Lat hotel near night market (3 nights)",
  "Datanla Waterfall + alpine coaster — Day 4 morning (Klook/KKday)",
  "Lumiere Da Lat timed entry — Day 4 evening (Klook/KKday)",
  "Da Lat → Hoi An sleeper bus (5 Aug night)",
  "Hoi An hotel (1 night, 6 Aug)",
  "Da Nang hotel near My Khe or airport (1 night)",
  "Thap Ba or I-Resort mud bath — Day 1 afternoon (Klook/KKday)",
  "VinWonders + Vinpearl cable car combo ticket — Day 2 (Klook/KKday)",
  "Travel insurance",
  "eSIM or local SIM at CXR airport"
];

export default function TipsPage() {
  useEffect(() => {
    document.title = "Malaysian Traveller Tips | Vietnam Travel Planner";
  }, []);

  return (
    <>
      <header className="page-header">
        <SectionHeading
          eyebrow="For Malaysian travellers"
          title="Before you go"
          description="Practical prep for your coastal-highlands loop — flights from KL, local transport, food, and what to pack for August."
        />
      </header>

      <section className="budget-banner" aria-label="Estimated budget">
        <div>
          <span className="label">Estimated total (excl. flights)</span>
          <strong>RM 2,000 – 3,200</strong>
          <p>Mid-range · 2 travellers · 7 nights · private transfers + activities</p>
        </div>
        <ul>
          <li>
            <span>Hotels</span>
            <strong>RM 900–1,400</strong>
          </li>
          <li>
            <span>Food</span>
            <strong>RM 500–700</strong>
          </li>
          <li>
            <span>Transport</span>
            <strong>RM 350–550</strong>
          </li>
          <li>
            <span>Activities</span>
            <strong>RM 250–550</strong>
          </li>
        </ul>
      </section>

      <div className="tips-grid">
        {TIP_ORDER.map((key) => {
          const section = MY_TRAVEL_TIPS[key];
          if (!section) return null;
          const Icon = TIP_ICONS[key] || BadgeCheck;
          return (
            <article key={key} className={`tip-card${key === "cautions" ? " tip-card--caution" : ""}`}>
              <div className="tip-card-head">
                <Icon size={22} aria-hidden="true" />
                <h3>{section.title}</h3>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <section className="prep-checklist" id="checklist">
        <SectionHeading eyebrow="Pre-trip" title="Booking checklist" />
        <div className="checklist-grid">
          {CHECKLIST.map((item) => (
            <label key={item}>
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
