const data = getSiteData();

const $ = (id) => document.getElementById(id);
const text = (id, value) => { $(id).textContent = value || ""; };
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char]);

function renderLogo() {
  const logo = $("logoImage");
  text("brandName", data.brandName);
  if (data.logo) {
    logo.src = data.logo;
    logo.alt = `${data.brandName} logo`;
    logo.hidden = false;
  } else {
    logo.hidden = true;
  }
}

function renderNavigation() {
  $("mainNav").innerHTML = data.menu.map((item) => {
    const href = item.label.toLowerCase().includes("about") && item.href === "#footer" ? "#about" : item.href;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", data.headerCta);
  $("headerCta").href = "#contact";
  document.querySelector(".nav-toggle").addEventListener("click", (event) => {
    const open = document.body.classList.toggle("nav-open");
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
}

function renderHero() {
  $("heroImage").src = data.hero.image;
  $("heroImage").alt = data.hero.title;
  text("heroEyebrow", data.hero.eyebrow);
  text("heroTitle", data.hero.title);
  text("heroText", data.hero.text);
  text("primaryCta", data.hero.primaryCta);
  $("primaryCta").href = "#contact";
  text("secondaryCta", data.hero.secondaryCta);
}

function renderLists() {
  const logos = data.clientLogos.map((logo) => {
    if (typeof logo === "string") {
      return `<span>${esc(logo)}</span>`;
    }
    return `<a class="client-logo-link" href="${esc(logo.href || "#")}" aria-label="${esc(logo.name)} solution page"><span><img src="${esc(logo.image)}" alt="${esc(logo.name)}"></span></a>`;
  }).join("");
  $("clientLogos").innerHTML = logos + logos;
  text("resourcesTitle", data.resourcesTitle);
  $("resourceGrid").innerHTML = data.resources.map((item, index) => `
    <a class="resource-card" href="resource-detail.html?resource=${index}">
      ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}">` : ""}
      <div>
        <span>${esc(item.type)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
        <strong>Read more</strong>
      </div>
    </a>
  `).join("");
  text("solutionsTitle", data.solutionsTitle);
  text("solutionsIntro", data.solutionsIntro);
  $("solutionGrid").innerHTML = data.solutions.map((item, index) => `
    <a class="solution-card" href="solution-detail.html?solution=${index}">
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
      <span>${esc(item.cta)}</span>
    </a>
  `).join("");
  text("customersTitle", data.customersTitle);
  $("storyGrid").innerHTML = data.stories.map((story, index) => `
    <a class="story-card" href="case-study.html?case=${index}">
      <img src="${esc(story.image)}" alt="${esc(story.title)}">
      <h3>${esc(story.title)}</h3>
      <span>Explore now</span>
    </a>
  `).join("");
}

function renderAbout() {
  const about = data.about;
  text("aboutTitle", about.title);
  text("aboutIntro", about.intro);
  const cards = [
    { title: about.historyTitle, text: "Learn how the company started in 2020 and what shaped our mission.", href: "company-history.html" },
    { title: about.leadershipTitle, text: "Meet the CEO and advisory panel experts supporting our growth.", href: "leadership-team.html" },
    { title: "Contact us", text: "Find office contacts, locations, emails, phone details, and our global office footprint.", href: "contact-us.html" }
  ];
  $("aboutCardGrid").innerHTML = cards.map((card) => `
    <article class="about-card">
      <h3>${esc(card.title)}</h3>
      <p>${esc(card.text)}</p>
      <a href="${esc(card.href)}">Explore now</a>
    </article>
  `).join("");
}

function renderFooter() {
  text("contactTitle", data.contact.title);
  text("contactText", data.contact.text);
  text("footerBrand", data.brandName);
  text("footerText", data.footerText);
  text("copyright", `© ${new Date().getFullYear()} ${data.brandName}`);
  $("footerColumns").innerHTML = data.footerColumns.map((column) => `
    <div>
      <h3>${esc(column.title)}</h3>
      ${column.links.map((link) => `<a href="#">${esc(link)}</a>`).join("")}
    </div>
  `).join("");
}

document.querySelector(".newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input[type='email']");
  const email = input.value.trim();
  if (!email) return;
  const createdAt = new Date().toISOString();
  const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");
  subscribers.push({ email, createdAt });
  localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
  event.currentTarget.reset();
  const recipient = data.contact?.recipientEmail || "sales@seeingflow.com";
  const subject = "New website keep-in-touch request";
  const body = [
    "Hello SeeingFlow Sales Team,",
    "",
    "A new visitor submitted the Keep in touch form on the website.",
    "",
    `Visitor email: ${email}`,
    `Submitted at: ${createdAt}`,
    `Source page: ${window.location.href}`,
    "",
    "Suggested follow-up:",
    "- Add the contact to the newsletter or CRM list.",
    "- Send a short introduction and ask whether they would like a product demo.",
    "",
    "This message was generated from the website contact form."
  ].join("\n");
  window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  alert("Thank you. Your email has been saved locally and an email draft has been opened for submission.");
});

renderLogo();
renderNavigation();
renderHero();
renderLists();
renderAbout();
renderFooter();
