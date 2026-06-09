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
  ShieldAlert,
  AlertTriangle,
  Phone,
  Languages
} from "lucide-react";

const TIP_ORDER = [
  "cautions",
  "scams",
  "emergency",
  "phrases",
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
  scams: AlertTriangle,
  emergency: Phone,
  phrases: Languages,
  visa: BadgeCheck,
  flights: Plane,
  money: Wallet,
  apps: Smartphone,
  food: UtensilsCrossed,
  transport: Bus,
  packing: Luggage
};

function telHref(number) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

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
          const cardClass = [
            "tip-card",
            key === "cautions" || key === "scams" ? " tip-card--caution" : "",
            key === "emergency" ? " tip-card--emergency" : "",
            key === "phrases" ? " tip-card--phrases" : ""
          ].join("");

          if (key === "emergency" && section.contacts) {
            return (
              <article key={key} className={cardClass}>
                <div className="tip-card-head">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{section.title}</h3>
                </div>
                <ul className="emergency-list">
                  {section.contacts.map((contact) => (
                    <li key={contact.label}>
                      <div className="emergency-list__meta">
                        <strong>{contact.label}</strong>
                        <a href={telHref(contact.number)} className="emergency-list__number">
                          {contact.number}
                        </a>
                      </div>
                      {contact.note && <p>{contact.note}</p>}
                    </li>
                  ))}
                </ul>
              </article>
            );
          }

          if (key === "phrases" && section.words) {
            return (
              <article key={key} className={cardClass}>
                <div className="tip-card-head">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{section.title}</h3>
                </div>
                {section.intro && <p className="tip-card-intro">{section.intro}</p>}
                <div className="phrase-grid">
                  {section.words.map((word) => (
                    <div key={word.vi} className="phrase-row">
                      <strong className="phrase-vi">{word.vi}</strong>
                      <span className="phrase-roman">{word.roman}</span>
                      <span className="phrase-en">{word.en}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          }

          return (
            <article key={key} className={cardClass}>
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
