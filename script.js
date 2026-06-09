const pinNotes = {
  KUL: "Kuala Lumpur International Airport: depart for Cam Ranh on 1 Aug 2026.",
  "Cam Ranh": "Cam Ranh International Airport: arrival at 11:00, then transfer to Nha Trang.",
  "Nha Trang": "Nha Trang: Day 1 mud bath (Thap Ba/I-Resort), Day 2 Vinpearl cable car + VinWonders full day.",
  "Da Lat": "Da Lat: market, Datanla waterfall, Crazy House, Lumiere light gardens.",
  "Hoi An": "Hoi An: one relaxed heritage day after the sleeper bus from Da Lat.",
  "Da Nang": "Da Nang: full day on 7 Aug, breakfast and airport return on 8 Aug."
};

const readout = document.querySelector("#mapReadout");
const dayCards = [...document.querySelectorAll(".day-card")];
const navLinks = [...document.querySelectorAll(".trip-nav a")];

const places = [
  "Kuala Lumpur International Airport",
  "Cam Ranh International Airport",
  "Da Nang International Airport",
  "Po Nagar Cham Towers",
  "Hon Chong rocks",
  "Tran Phu promenade",
  "Nha Trang Bay",
  "Tranh Beach",
  "Hon Tam",
  "Da Lat Market",
  "Da Lat night market",
  "Datanla Waterfall",
  "Crazy House",
  "Lumiere Da Lat",
  "Lam Vien Square",
  "Ancient Town",
  "Japanese Bridge",
  "An Bang Beach",
  "Marble Mountains",
  "Non Nuoc",
  "My Khe",
  "Han River",
  "Dragon Bridge",
  "Cam Ranh",
  "Nha Trang",
  "Da Lat",
  "Hoi An",
  "Da Nang",
  "KUL",
  "CXR",
  "DAD"
];

const placeAliases = {
  KUL: "Kuala Lumpur International Airport",
  CXR: "Cam Ranh International Airport",
  DAD: "Da Nang International Airport",
  "Hon Chong rocks": "Hon Chong Promontory Nha Trang",
  "Tran Phu promenade": "Tran Phu Street Nha Trang",
  "Da Lat Market": "Da Lat Market Cho Da Lat",
  "Lumiere Da Lat": "Lumiere Light Gardens Dalat",
  "Lam Vien Square": "Lam Vien Square Da Lat",
  "Ancient Town": "Hoi An Ancient Town",
  "Japanese Bridge": "Japanese Covered Bridge Hoi An",
  "Non Nuoc": "Non Nuoc Beach Da Nang",
  "My Khe": "My Khe Beach Da Nang",
  "Han River": "Han River Da Nang"
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const placePattern = new RegExp(`\\b(${places.map(escapeRegExp).join("|")})\\b`, "g");

function googleUrl(kind, place) {
  const query = encodeURIComponent(placeAliases[place] || place);
  if (kind === "images") return `https://www.google.com/search?tbm=isch&q=${query}`;
  if (kind === "reviews") return `https://www.google.com/maps/search/${query}+reviews`;
  return `https://www.google.com/search?q=${query}`;
}

function createPlaceLink(place) {
  const link = document.createElement("span");
  link.className = "place-hotspot";
  link.dataset.place = place;

  const label = document.createElement("a");
  label.className = "place-label";
  label.href = googleUrl("search", place);
  label.target = "_blank";
  label.rel = "noopener";
  label.textContent = place;
  link.append(label);

  const menu = document.createElement("span");
  menu.className = "place-menu";
  menu.setAttribute("role", "tooltip");
  menu.innerHTML = `
    <strong>${place}</strong>
    <span>
      <a href="${googleUrl("reviews", place)}" target="_blank" rel="noopener">Google reviews</a>
      <a href="${googleUrl("images", place)}" target="_blank" rel="noopener">Google images</a>
      <a href="${googleUrl("search", place)}" target="_blank" rel="noopener">Google search</a>
    </span>
  `;
  link.append(menu);
  return link;
}

function linkPlaceText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!placePattern.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      placePattern.lastIndex = 0;

      const parent = node.parentElement;
      if (!parent || parent.closest("a, button, script, style, .place-menu")) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(placePattern);

    parts.forEach((part) => {
      if (!part) return;
      if (places.includes(part)) {
        fragment.append(createPlaceLink(part));
      } else {
        fragment.append(document.createTextNode(part));
      }
    });

    node.replaceWith(fragment);
  });
}

linkPlaceText(document.body);

document.querySelectorAll(".pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    const stop = pin.dataset.pin;
    readout.textContent = pinNotes[stop] || "Selected route stop.";
  });
});

document.querySelector("#focusRoute").addEventListener("click", () => {
  document.querySelector(".map-card").animate(
    [
      { transform: "scale(1)", boxShadow: "0 12px 32px rgba(43, 54, 48, 0.07)" },
      { transform: "scale(1.015)", boxShadow: "0 22px 60px rgba(43, 54, 48, 0.18)" },
      { transform: "scale(1)", boxShadow: "0 12px 32px rgba(43, 54, 48, 0.07)" }
    ],
    { duration: 520, easing: "ease-out" }
  );
  readout.textContent = "Route focused: KUL -> CXR -> Nha Trang -> Da Lat -> Hoi An -> Da Nang.";
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    dayCards.forEach((card) => card.classList.toggle("active-day", card === visible.target));
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-18% 0px -58% 0px", threshold: [0.2, 0.45, 0.7] }
);

dayCards.forEach((card) => observer.observe(card));
