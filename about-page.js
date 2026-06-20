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




const DEFAULT_FOOTER_HREFS = {
  "integrated enterprise management system": "solution-detail.html?solution=0",
  "iot platform": "solution-detail.html?solution=1",
  "ai video analysis": "solution-detail.html?solution=2",
  "drone inspection": "solution-detail.html?solution=3",
  "patrolling robot": "solution-detail.html?solution=4",
  "integrated smart place solution": "solution-detail.html?solution=5",
  "who we are": "company-history.html",
  "contact us": "contact-us.html",
  "contact": "contact-us.html"
};

function getFooterLinkParts(link) {
  if (typeof link === "object" && link) {
    return { label: link.label || link.title || "", href: link.href || "#" };
  }
  const [label, href = ""] = String(link || "").split(">").map((part) => part.trim());
  const fallback = DEFAULT_FOOTER_HREFS[label.toLowerCase()] || "#";
  return { label, href: href || fallback };
}

function footerLinkHtml(link) {
  const { label, href } = getFooterLinkParts(link);
  if (!label) return "";
  const external = /^https?:\/\//i.test(href);
  return `<a href="${esc(href)}" ${external ? 'target="_blank" rel="noopener"' : ""}>${esc(label)}</a>`;
}

function footerSubscribeHtml() {
  return `
    <div class="footer-column-extra">
      <h3>Keep in touch</h3>
      <form class="footer-subscribe" data-request-form data-form-type="Footer keep in touch">
        <input type="email" name="email" placeholder="Work email" aria-label="Work email" required>
        <button class="button small" type="submit">Subscribe</button>
      </form>
    </div>
  `;
}

function footerSocialHtml() {
  return `
    <div class="footer-column-extra">
      <h3>Follow us</h3>
      <nav class="social-links" aria-label="Social links">
        <a href="https://www.linkedin.com/company/seeingflow/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9H3.7v11h2.8V9ZM5.1 4a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 5.1 4Zm15.2 9.7c0-3-1.6-4.9-4.2-4.9-1.9 0-2.8 1-3.2 1.8V9h-2.8v11h2.8v-5.8c0-1.7.8-2.8 2.3-2.8 1.4 0 2.2 1 2.2 2.8V20h2.9v-6.3Z"/></svg></a>
        <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2V6.6c0-.8.5-1 1.1-1h1.9V2.4c-.9-.1-1.8-.2-2.7-.2-2.8 0-4.7 1.7-4.7 4.8v1.2H6.8v3.6h3V22h4.4V11.8h3.1l.5-3.6h-3.6Z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.1a3 3 0 0 0-2.1-2.1C17.7 4.5 12 4.5 12 4.5S6.3 4.5 4.5 5a3 3 0 0 0-2.1 2.1C2 9 2 12 2 12s0 3 .4 4.9a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1C22 15 22 12 22 12s0-3-.4-4.9ZM10 15.4V8.6l5.8 3.4-5.8 3.4Z"/></svg></a>
      </nav>
    </div>
  `;
}

function renderShell() {
  const logo = $("logoImage");
  if (data.logo) {
    text("brandName", "");
    logo.src = data.logo;
    logo.alt = `${data.brandName} logo`;
    logo.hidden = false;
  } else {
    text("brandName", "");
    logo.hidden = true;
  }
  $("mainNav").innerHTML = data.menu.filter((item) => !item.label.toLowerCase().includes("contact")).map((item) => {
    const lower = item.label.toLowerCase();
    const href = lower.includes("about") ? "home-20260620.html#about" : `home-20260620.html${item.href}`;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", "Contact us");
  $("headerCta").href = "contact-us.html";
  text("footerBrand", data.brandName);
  text("footerText", data.footerText);
  text("copyright", `© ${new Date().getFullYear()} ${data.brandName}`);
  $("footerColumns").innerHTML = data.footerColumns.map((column, index) => `
    <div>
      <h3>${esc(column.title)}</h3>
      ${column.links.map(footerLinkHtml).join("")}
      ${index === 1 ? footerSubscribeHtml() : ""}
      ${index === 2 ? footerSocialHtml() : ""}
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
