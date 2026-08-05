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
  if (data.logo) {
    text("brandName", "");
    logo.src = data.logo;
    logo.alt = `${data.brandName} logo`;
    logo.hidden = false;
  } else {
    text("brandName", "");
    logo.hidden = true;
  }
}

function renderNavigation() {
  $("mainNav").innerHTML = data.menu.filter((item) => !item.label.toLowerCase().includes("contact")).map((item) => {
    const href = item.label.toLowerCase().includes("about") && item.href === "#footer" ? "#about" : item.href;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", "Contact us");
  $("headerCta").href = "contact-us.html";
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
  $("primaryCta").href = "#footer";
  text("secondaryCta", data.hero.secondaryCta);
}

function renderLists() {
  const logos = data.clientLogos.map((logo) => {
    if (typeof logo === "string") {
      return `<span>${esc(logo)}</span>`;
    }
    return `<a class="client-logo-link" href="${esc(resolveCaseLink(logo.href))}" aria-label="${esc(logo.name)} client case page"><span><img src="${esc(logo.image)}" alt="${esc(logo.name)}" crossorigin="anonymous" data-trim-logo></span></a>`;
  }).join("");
  $("clientLogos").innerHTML = logos + logos;
  trimClientLogoImages();
  text("resourcesTitle", data.resourcesTitle);
  $("resourceGrid").innerHTML = getFeaturedResourceCards().map(({ item, index, label }) => `
    <article class="resource-card">
      <a class="resource-card-main" href="${esc(getResourceItemHref(item, index))}" ${getResourceItemAttributes(item)}>
        ${getResourceImage(item) ? `<img src="${esc(getResourceImage(item))}" alt="${esc(item.title)}">` : ""}
        <span>${esc(label)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
      </a>
      <div>
        <a class="resource-more-link" href="${esc(getResourceRepositoryHref(item, label))}">${esc(getResourceMoreLabel(label))}</a>
      </div>
    </article>
  `).join("");
  prepareLocalDocumentLinks();
  text("solutionsTitle", data.solutionsTitle);
  $("solutionGrid").innerHTML = data.solutions.map((item, index) => `
    <article class="solution-card">
      <a class="solution-card-main" href="solution-detail.html?solution=${index}">
        ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}">` : ""}
        <div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </div>
      </a>
      <div class="solution-card-footer">
        <a class="solution-more-link" href="solution-list.html">Learn more</a>
      </div>
    </article>
  `).join("");
  text("customersTitle", data.customersTitle);
  $("storyGrid").innerHTML = getFeaturedStories().map(({ story, index }) => `
    <article class="story-card">
      <a class="story-card-main" href="case-study.html?case=${index}">
        <img src="${esc(story.image)}" alt="${esc(story.title)}">
        <h3>${esc(story.title)}</h3>
      </a>
      <div class="story-card-footer">
        <a class="story-more-link" href="case-list.html">Explore more</a>
      </div>
    </article>
  `).join("");
}

function getFeaturedStories() {
  const stories = data.stories || [];
  const indexes = Array.isArray(data.featuredStoryIndexes) && data.featuredStoryIndexes.length
    ? data.featuredStoryIndexes
    : [0, 1, 2];
  return indexes
    .map((index) => ({ index: Number(index), story: stories[Number(index)] }))
    .filter((item) => item.story)
    .slice(0, 3);
}

function normalizeCategory(value = "") {
  return String(value).toLowerCase().replace(/[^a-z]/g, "");
}

function isDocumentResource(item) {
  return normalizeCategory(item?.type) === "documents";
}

function getResourceImage(item) {
  if (item?.image) return item.image;
  if (isDocumentResource(item)) {
    return "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";
  }
  return "";
}

function getDownloadFileName(item) {
  const href = String(item?.body || "");
  const fileName = href.split("/").pop();
  return fileName || `${String(item?.title || "document").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`;
}

function getDocumentLinkAttributes(item) {
  return "";
}

function getResourceItemAttributes(item) {
  return "";
}

function prepareLocalDocumentLinks() {
  if (window.location.protocol !== "file:") return;
  document.querySelectorAll("[data-document-resource]").forEach((link) => {
    link.removeAttribute("download");
  });
}

function getResourceItemHref(item, index) {
  if (item?.placeholder) return "#resources";
  const category = normalizeCategory(item?.type);
  if (category === "clientcases") return item.body || "home-20260620.html#stories";
  if (category === "documents") return "document-library-filtered-20260805.html";
  return `resource-detail.html?resource=${index}`;
}

function getResourceRepositoryHref(item, label = "") {
  const category = normalizeCategory(label || item?.type);
  if (category === "news") return "news-list.html";
  if (category === "clientcases") return "case-list.html";
  if (category === "documents") return "document-library-filtered-20260805.html";
  return "#resources";
}

function getResourceMoreLabel(label = "") {
  return "Read more";
}

function getFeaturedResourceCards() {
  const categories = data.resourceCategories || [
    { label: "News", featuredIndex: 0 },
    { label: "Client Cases", featuredIndex: 1 },
    { label: "Documents", featuredIndex: 2 }
  ];
  return categories.map((category) => {
    const configuredIndex = Number(category.featuredIndex);
    const fallbackIndex = data.resources.findIndex((item) => normalizeCategory(item.type) === normalizeCategory(category.label));
    const configuredItem = Number.isInteger(configuredIndex) ? data.resources[configuredIndex] : null;
    const configuredMatchesCategory = configuredItem && normalizeCategory(configuredItem.type) === normalizeCategory(category.label);
    const index = configuredMatchesCategory ? configuredIndex : fallbackIndex;
    const item = data.resources[index] || {
      type: category.label,
      title: `Add ${category.label.toLowerCase()} in admin`,
      text: "Prepare this category by adding a new item in the Resources admin section.",
      image: "",
      placeholder: true
    };
    return { label: category.label, item, index: Math.max(index, 0) };
  }).filter((card) => card.item);
}

function resolveCaseLink(href = "") {
  const value = String(href).trim();
  const match = value.match(/^(?:(?:case|story|client\s*case)\s*)?([1-6])$/i);
  if (match) {
    return `case-study.html?case=${Number(match[1]) - 1}`;
  }
  return value || "#stories";
}

function loadLogoImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function cropLogoWhitespace(source) {
  const image = await loadLogoImage(source);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  context.drawImage(image, 0, 0);

  const { width, height } = canvas;
  const pixels = context.getImageData(0, 0, width, height).data;
  let top = height;
  let right = 0;
  let bottom = 0;
  let left = width;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const alpha = pixels[index + 3];
      const nearWhite = pixels[index] > 245 && pixels[index + 1] > 245 && pixels[index + 2] > 245;
      if (alpha > 12 && !nearWhite) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (left >= right || top >= bottom) return source;

  const padding = Math.ceil(Math.max(width, height) * 0.025);
  left = Math.max(0, left - padding);
  top = Math.max(0, top - padding);
  right = Math.min(width - 1, right + padding);
  bottom = Math.min(height - 1, bottom + padding);

  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  const output = document.createElement("canvas");
  const outputContext = output.getContext("2d");
  const scale = Math.min(3, 900 / cropWidth);
  output.width = Math.round(cropWidth * scale);
  output.height = Math.round(cropHeight * scale);
  outputContext.drawImage(canvas, left, top, cropWidth, cropHeight, 0, 0, output.width, output.height);

  return output.toDataURL("image/png");
}

function trimClientLogoImages() {
  document.querySelectorAll("[data-trim-logo]").forEach(async (image) => {
    try {
      image.src = await cropLogoWhitespace(image.src);
      image.classList.add("trimmed-logo");
    } catch {
      image.classList.add("trim-fallback");
    }
  });
}

function renderAbout() {
  const about = data.about;
  text("aboutTitle", about.title);
  const cards = [
    { title: about.historyTitle, text: "Learn how the company started in 2020 and what shaped our mission.", href: "company-history.html", image: about.cardImages?.history },
    { title: about.leadershipTitle, text: "Meet the CEO and advisory panel experts supporting our growth.", href: "leadership-team.html", image: about.cardImages?.leadership },
    { title: "Contact us", text: "Find office contacts, locations, emails, phone details, and our global office footprint.", href: "contact-us.html", image: about.cardImages?.contact }
  ];
  $("aboutCardGrid").innerHTML = cards.map((card) => `
    <a class="about-card" href="${esc(card.href)}">
      ${card.image ? `<img src="${esc(card.image)}" alt="${esc(card.title)}">` : ""}
      <div>
        <h3>${esc(card.title)}</h3>
        <p>${esc(card.text)}</p>
        <span>Discover</span>
      </div>
    </a>
  `).join("");
}




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

function renderFooter() {
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
}

renderLogo();
renderNavigation();
renderHero();
renderLists();
renderAbout();
renderFooter();
