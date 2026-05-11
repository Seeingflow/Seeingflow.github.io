const data = getSiteData();
const pageType = document.body.dataset.aboutPage;
const $ = (id) => document.getElementById(id);
const text = (id, value) => { $(id).textContent = value || ""; };
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char]);

function renderShell() {
  const logo = $("logoImage");
  text("brandName", data.brandName);
  if (data.logo) {
    logo.src = data.logo;
    logo.alt = `${data.brandName} logo`;
    logo.hidden = false;
  } else {
    logo.hidden = true;
  }
  $("mainNav").innerHTML = data.menu.filter((item) => !item.label.toLowerCase().includes("contact")).map((item) => {
    const lower = item.label.toLowerCase();
    const href = lower.includes("about") ? "index.html#about" : `index.html${item.href}`;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", "Contact us");
  $("headerCta").href = "contact-us.html";
  text("footerBrand", data.brandName);
  text("footerText", data.footerText);
  text("copyright", `© ${new Date().getFullYear()} ${data.brandName}`);
  $("footerColumns").innerHTML = data.footerColumns.map((column) => `
    <div>
      <h3>${esc(column.title)}</h3>
      ${column.links.map((link) => `<a href="#">${esc(link)}</a>`).join("")}
    </div>
  `).join("");
  document.querySelector(".nav-toggle").addEventListener("click", (event) => {
    const open = document.body.classList.toggle("nav-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
}

function renderDetail() {
  const about = data.about;
  const details = {
    location: {
      eyebrow: "Company location",
      title: about.mapTitle,
      intro: "Our global presence connects headquarters, regional offices, R&D capability, and international market contacts.",
      body: `
        <div class="detail-map-frame ${about.mapImage ? "has-image" : ""}">
          ${about.mapImage ? `<img src="${esc(about.mapImage)}" alt="Company global office map">` : `<span>${esc(about.mapImageSize)}</span>`}
        </div>
        <ul class="detail-list">${about.officeLocations.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      `
    },
    history: {
      eyebrow: "Company history",
      title: about.historyTitle,
      intro: "A concise view of how the company began and where it is going.",
      body: `
        <p class="history-intro">${esc(about.historyText)}</p>
        <div class="history-timeline">
          ${(about.historyTimeline || []).map((item) => `
            <article class="timeline-item">
              <div class="timeline-marker">
                <span>${esc(item.time)}</span>
              </div>
              <div class="timeline-card">
                ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.time)} company milestone">` : ""}
                <div>
                  <h3>${esc(item.time)}</h3>
                  <p>${esc(item.event)}</p>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      `
    },
    leadership: {
      eyebrow: "Leadership team",
      title: about.leadershipTitle,
      intro: "Company leadership and advisory expertise.",
      body: `<div class="team-grid">${about.leadership.map((person) => `
        <article class="team-card">
          <span>${esc(person.role)}</span>
          <h4>${esc(person.name)}</h4>
          <p>${esc(person.bio)}</p>
        </article>
      `).join("")}</div>`
    },
    contact: {
      eyebrow: "Contact us",
      title: about.contactsTitle,
      intro: "Primary office contacts and global locations.",
      body: `
        <div class="detail-map-frame ${about.mapImage ? "has-image" : ""}">
          ${about.mapImage ? `<img src="${esc(about.mapImage)}" alt="Company global office map">` : `<span>${esc(about.mapImageSize)}</span>`}
        </div>
        <div class="featured-contact-grid">${about.contacts.map((contact) => `
          <article class="featured-contact-card">
            <span>${esc(contact.location)}</span>
            <h3>${esc(contact.office)}</h3>
            <dl>
              <div>
                <dt>Address</dt>
                <dd>${esc(contact.address || contact.location)}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></dd>
              </div>
            </dl>
          </article>
        `).join("")}</div>
        <section class="global-office-list" aria-label="Other global office locations">
          <h3>Global offices and contacts</h3>
          <ul>${about.officeLocations.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </section>`
    }
  };
  const detail = details[pageType];
  text("detailEyebrow", detail.eyebrow);
  text("detailTitle", detail.title);
  text("detailIntro", detail.intro);
  $("detailBody").innerHTML = detail.body;
}

renderShell();
renderDetail();
if (typeof attachRequestForms === "function") {
  attachRequestForms();
}
