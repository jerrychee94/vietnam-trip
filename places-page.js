const filtersEl = document.querySelector("#cityFilters");
const contentEl = document.querySelector("#placesContent");
const countEl = document.querySelector("#placeCount");
let activeFilter = "all";

function googleUrl(kind, place) {
  const query = encodeURIComponent(place);
  if (kind === "images") return `https://www.google.com/search?tbm=isch&q=${query}`;
  if (kind === "reviews") return `https://www.google.com/maps/search/${query}+reviews`;
  return `https://www.google.com/search?q=${query}+Vietnam`;
}

function placeCard(place, city) {
  return `
    <article class="place-card" data-city="${city.id}">
      <img src="${place.image}" alt="${place.name}" loading="lazy" width="400" height="300" />
      <div class="place-card-body">
        <div class="place-card-top">
          <span class="tag-pill ${city.color}">${place.tag}</span>
          <span class="day-link">Day ${place.day}</span>
        </div>
        <h3>${place.name}</h3>
        <p class="zh-label">${place.zh}</p>
        <p>${place.note}</p>
        <div class="quick-actions">
          <a href="${googleUrl("reviews", place.name)}" target="_blank" rel="noopener">Reviews</a>
          <a href="${googleUrl("images", place.name)}" target="_blank" rel="noopener">Photos</a>
          <a href="day-${place.day}.html">Day plan</a>
        </div>
      </div>
    </article>
  `;
}

function citySection(city) {
  return `
    <section class="city-section" id="${city.id}" data-city="${city.id}">
      <div class="city-header" style="--city-image: url('${city.image}')">
        <div>
          <span class="eyebrow">${city.tagline}</span>
          <h2>${city.name}</h2>
          <p>${city.summary}</p>
        </div>
        <span class="city-count">${city.places.length} spots</span>
      </div>
      <div class="places-grid">${city.places.map((p) => placeCard(p, city)).join("")}</div>
    </section>
  `;
}

function renderFilters() {
  filtersEl.innerHTML = `
    <button type="button" class="filter-chip active" data-filter="all">All cities</button>
    ${window.PLACE_CITIES.map(
      (c) => `<button type="button" class="filter-chip" data-filter="${c.id}">${c.name}</button>`
    ).join("")}
  `;

  filtersEl.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      filtersEl.querySelectorAll(".filter-chip").forEach((b) => b.classList.toggle("active", b === btn));
      applyFilter();
    });
  });
}

function applyFilter() {
  document.querySelectorAll(".city-section").forEach((section) => {
    const show = activeFilter === "all" || section.dataset.city === activeFilter;
    section.hidden = !show;
  });

  const total = window.PLACE_CITIES.reduce((sum, city) => {
    if (activeFilter === "all" || city.id === activeFilter) return sum + city.places.length;
    return sum;
  }, 0);
  countEl.textContent = `${total} places`;
}

function render() {
  contentEl.innerHTML = window.PLACE_CITIES.map(citySection).join("");
  const total = window.PLACE_CITIES.reduce((sum, c) => sum + c.places.length, 0);
  countEl.textContent = `${total} places`;
  renderFilters();
}

render();
