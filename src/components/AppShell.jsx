import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Map, Compass, Lightbulb, CalendarDays } from "lucide-react";
import { TRIP_DAYS } from "../data/tripData";
import { DAY_SHORT } from "../utils/places";

const MAIN_NAV = [
  { to: "/", label: "Overview", icon: Compass, end: true },
  { to: "/places", label: "Places", icon: Map },
  { to: "/tips", label: "MY Tips", icon: Lightbulb }
];

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isOverview = location.pathname === "/";
  const activeDayMatch = location.pathname.match(/^\/day\/(\d+)/);
  const activeDay = activeDayMatch ? Number(activeDayMatch[1]) : null;

  return (
    <div className="app-shell">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={mobileOpen}
        aria-controls="sidebar"
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        <span className="sr-only">Toggle navigation</span>
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside id="sidebar" className={`sidebar${mobileOpen ? " open" : ""}`} aria-label="Trip navigation">
        <NavLink className="brand" to="/" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark">VN</span>
          <span>
            <strong>Coastline to Cloudline</strong>
            <small>1–8 Aug 2026</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Site sections">
          {MAIN_NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        {isOverview && (
          <nav className="trip-nav" aria-label="Itinerary days">
            {TRIP_DAYS.map((day) => (
              <a
                key={day.day}
                href={`#day-${day.day}`}
                className={activeDay === day.day ? "active" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {DAY_SHORT[day.day - 1]} {day.day}
              </a>
            ))}
          </nav>
        )}

        {!isOverview && (
          <nav className="trip-nav trip-nav--links" aria-label="Day pages">
            {TRIP_DAYS.map((day) => (
              <NavLink
                key={day.day}
                to={`/day/${day.day}`}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={() => setMobileOpen(false)}
              >
                Day {day.day}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="side-card">
          <span className="label">Route</span>
          <p>KUL → Cam Ranh → Nha Trang → Da Lat → Hoi An → Da Nang → DAD</p>
        </div>

        <div className="side-card compact">
          <span className="label">Trip pace</span>
          <div className="metric-row">
            <strong>8 days</strong>
            <strong>4 cities</strong>
          </div>
          <div className="progress" aria-hidden="true">
            <span style={{ width: "72%" }} />
          </div>
          <p>Beach first, highland middle, heritage stop, relaxed airport finish.</p>
        </div>

        <div className="sidebar-foot">
          <CalendarDays size={16} aria-hidden="true" />
          <span>Personal itinerary · Aug 2026</span>
        </div>
      </aside>

      <main className="planner">
        <Outlet />
      </main>
    </div>
  );
}
