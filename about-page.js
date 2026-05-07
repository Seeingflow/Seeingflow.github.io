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
  $("mainNav").innerHTML = data.menu.map((item) => {
    const lower = item.label.toLowerCase();
    const href = lower.includes("about") ? "index.html#about" : lower.includes("contact") ? "contact-us.html" : `index.html${item.href}`;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", data.headerCta);
  $("headerCta").href = "index.html#contact";
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
      body: `<p>${esc(about.historyText)}</p>`
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
      intro: "Office contacts, locations, email addresses, phone details, and global office footprint.",
      body: `
        <div class="detail-map-frame ${about.mapImage ? "has-image" : ""}">
          ${about.mapImage ? `<img src="${esc(about.mapImage)}" alt="Company global office map">` : `<span>${esc(about.mapImageSize)}</span>`}
        </div>
        <ul class="detail-list">${about.officeLocations.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        <div class="contact-list-grid detail-contact-grid">${about.contacts.map((contact) => `
        <article class="office-contact-card">
          <h4>${esc(contact.office)}</h4>
          <p>${esc(contact.location)}</p>
          <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
          <span>${esc(contact.phone)}</span>
        </article>
      `).join("")}</div>`
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
