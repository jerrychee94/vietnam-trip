const tipsEl = document.querySelector("#tipsContent");
const sections = window.MY_TRAVEL_TIPS;

tipsEl.innerHTML = Object.entries(sections)
  .map(
    ([key, section]) => `
    <article class="tip-card">
      <h3>${section.title}</h3>
      <ul>
        ${section.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `
  )
  .join("");
