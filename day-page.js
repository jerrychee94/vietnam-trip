const dayNumber = Number(document.body.dataset.day);
const day = window.TRIP_DAYS.find((item) => item.day === dayNumber) || window.TRIP_DAYS[0];

const allPlaceNames = [
  ...new Set(
    window.TRIP_DAYS.flatMap((item) => [
      item.city,
      ...item.timeline.map((entry) => entry[1]),
      ...item.attractions.map((entry) => entry[0]),
      ...item.food.map((entry) => entry[0]),
      ...item.hotels.map((entry) => entry[0])
    ])
      .join(" ")
      .match(
        /Kuala Lumpur International Airport|Cam Ranh International Airport|Da Nang International Airport|Tran Phu Street|Thap Ba Mud Bath|I-Resort Mud Bath|Vinpearl Cable Car|VinWonders Nha Trang|Vinpearl Harbour|Vinpearl Resort Nha Trang|Po Nagar Cham Towers|Hon Chong Promontory|Tran Phu promenade|Tran Phu Beach|Nha Trang Bay|Tranh Beach|Hon Tam|Da Lat Market|Da Lat Night Market|Datanla Waterfall|Crazy House|Lumiere Da Lat|Lam Vien Square|Hoi An Ancient Town|Japanese Covered Bridge Hoi An|An Bang Beach|Marble Mountains|Non Nuoc|My Khe Beach|Han River|Dragon Bridge|Han Market Da Nang|Quan Hai San Thai Lai|Lac Canh Beef Restaurant|Bun Ca Nha Trang|VinWonders food court|Banh Trang Nuong Da Lat|Lau Ga La E Da Lat|Da Lat avocado ice cream|Da Lat coffee roastery|Banh Mi Xiu Mai Da Lat|Cao Lau Hoi An|Banh Mi Phuong|Mi Quang Da Nang|Bep Cuon Da Nang|Banh Mi Da Nang|Vietnamese coffee Da Nang|Liberty Central Nha Trang Hotel|Libra Hotel Nha Trang|Le's Cham Hotel Nha Trang|Tran Vien Dong Hotel|Hôtel Colline|Hana Dalat Hotel|Du Parc Hotel Dalat|Mercure Dalat Resort|Park Hotel Dalat|Sandals Mimosa|Hoi An Historic Hotel|Silkotel Hoi An|Chillax Old Town Villa|Stella Maris Beach Danang|Nhat Minh Hotel and Apartment|Sanouva Danang Hotel|Nha Trang|Da Lat|Hoi An|Da Nang|Cam Ranh/g
      ) || []
  )
].sort((a, b) => b.length - a.length);

const aliases = {
  "Tran Phu promenade": "Tran Phu Street Nha Trang",
  "Tran Phu Beach": "Tran Phu Beach Nha Trang",
  "Nha Trang seafood floating restaurant": "Nha Trang seafood floating restaurant",
  "Banh Trang Nuong Da Lat": "Banh Trang Nuong Da Lat",
  "Lau Ga La E Da Lat": "Lau Ga La E Da Lat",
  "Da Lat avocado ice cream": "Kem Bo Da Lat",
  "Da Lat coffee roastery": "Da Lat coffee roastery",
  "Banh Mi Xiu Mai Da Lat": "Banh Mi Xiu Mai Da Lat",
  "Cao Lau Hoi An": "Cao Lau Hoi An",
  "Mi Quang Da Nang": "Mi Quang Da Nang",
  "Vietnamese coffee Da Nang": "Vietnamese coffee Da Nang"
};

function googleUrl(kind, place) {
  const query = encodeURIComponent(aliases[place] || place);
  if (kind === "images") return `https://www.google.com/search?tbm=isch&q=${query}`;
  if (kind === "reviews") return `https://www.google.com/maps/search/${query}+reviews`;
  return `https://www.google.com/search?q=${query}`;
}

function hotspot(place) {
  return `
    <span class="place-hotspot">
      <a class="place-label" href="${googleUrl("search", place)}" target="_blank" rel="noopener">${place}</a>
      <span class="place-menu" role="tooltip">
        <strong>${place}</strong>
        <span>
          <a href="${googleUrl("reviews", place)}" target="_blank" rel="noopener">Google reviews</a>
          <a href="${googleUrl("images", place)}" target="_blank" rel="noopener">Google images</a>
          <a href="${googleUrl("search", place)}" target="_blank" rel="noopener">Google search</a>
        </span>
      </span>
    </span>
  `;
}

function linkPlaces(text) {
  const pattern = new RegExp(`(${allPlaceNames.map((place) => place.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text
    .split(pattern)
    .map((part) => (allPlaceNames.includes(part) ? hotspot(part) : part))
    .join("");
}

function card([name, description, image]) {
  return `
    <article class="detail-card">
      <img src="${image}" alt="${name}" loading="lazy" />
      <div>
        <h3>${hotspot(name)}</h3>
        <p>${linkPlaces(description)}</p>
        <div class="quick-actions">
          <a href="${googleUrl("reviews", name)}" target="_blank" rel="noopener">Reviews</a>
          <a href="${googleUrl("images", name)}" target="_blank" rel="noopener">Images</a>
        </div>
      </div>
    </article>
  `;
}

function hotelImage(city) {
  const images = {
    "Nha Trang": "assets/images/tran-phu-beach.jpg",
    "Da Lat": "assets/images/tuyen-lam-lake.jpg",
    "Hoi An": "assets/images/hoi-an-ancient-town.jpg",
    "Da Nang": "assets/images/my-khe-beach.jpg"
  };
  return images[city] || images["Da Nang"];
}

function youtubeQuery() {
  const queryByCity = {
    "Nha Trang": "Nha Trang Vietnam travel guide",
    "Da Lat": "Da Lat Vietnam travel guide",
    "Hoi An": "Hoi An Vietnam travel guide",
    "Da Nang": "Da Nang Vietnam travel guide"
  };
  return queryByCity[day.city] || `${day.city} Vietnam travel guide`;
}

function youtubeSection() {
  const query = youtubeQuery();
  const encodedQuery = encodeURIComponent(query);
  const embedQuery = encodeURIComponent(`${query} popular`);
  return `
    <section class="detail-section">
      <div class="section-heading">
        <span class="eyebrow">Watch</span>
        <h2>Popular YouTube guide</h2>
      </div>
      <article class="video-card">
        <iframe
          title="${query}"
          src="https://www.youtube.com/embed?listType=search&list=${embedQuery}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div>
          <h3>${query}</h3>
          <p>YouTube changes rankings often, so this pulls a popular destination-guide search instead of freezing one random video forever.</p>
          <a href="https://www.youtube.com/results?search_query=${encodedQuery}" target="_blank" rel="noopener">Open more videos</a>
        </div>
      </article>
    </section>
  `;
}

function hotelCard([name, stars, note]) {
  return `
    <article class="hotel-card">
      <img src="${hotelImage(day.city)}" alt="${name}" loading="lazy" />
      <div>
        <span>${stars}</span>
        <h3>${hotspot(name)}</h3>
        <p>${linkPlaces(note)}</p>
        <div class="quick-actions">
          <a href="${googleUrl("reviews", name)}" target="_blank" rel="noopener">Reviews</a>
          <a href="${googleUrl("images", name)}" target="_blank" rel="noopener">Images</a>
        </div>
      </div>
    </article>
  `;
}

function navLink(item) {
  return `<a class="${item.day === day.day ? "active" : ""}" href="day-${item.day}.html">Day ${item.day}</a>`;
}

document.title = `${day.title} | Vietnam Travel Planner`;
document.querySelector("#dayApp").innerHTML = `
  <header class="day-hero" style="--hero-image: url('${day.hero}')">
    <div class="day-nav-row">
      <nav class="detail-nav">
        <a href="index.html">Overview</a>
        <a href="places.html">Places</a>
        <a href="tips.html">Tips</a>
        ${window.TRIP_DAYS.map(navLink).join("")}
      </nav>
    </div>
    <div class="day-hero-copy">
      <span class="eyebrow">${day.date} · ${day.city}</span>
      <h1>${day.title}</h1>
      <p>${linkPlaces(day.summary)}</p>
    </div>
  </header>

  <main class="day-layout">
    <section class="detail-section">
      <div class="section-heading">
        <span class="eyebrow">Plan</span>
        <h2>Schedule</h2>
      </div>
      <div class="schedule-list">
        ${day.timeline
          .map(([time, item]) => `<p><time>${time}</time><span>${linkPlaces(item)}</span></p>`)
          .join("")}
      </div>
    </section>

    <section class="detail-section">
      <div class="section-heading">
        <span class="eyebrow">See</span>
        <h2>Attractions</h2>
      </div>
      <div class="detail-grid">${day.attractions.map(card).join("")}</div>
    </section>

    <section class="detail-section">
      <div class="section-heading">
        <span class="eyebrow">Eat</span>
        <h2>Food</h2>
      </div>
      <div class="detail-grid">${day.food.map(card).join("")}</div>
    </section>

    ${youtubeSection()}

    <section class="detail-section">
      <div class="section-heading">
        <span class="eyebrow">Stay</span>
        <h2>3-4 star hotel options</h2>
      </div>
      <div class="hotel-grid">${day.hotels.map(hotelCard).join("")}</div>
    </section>
  </main>
`;
