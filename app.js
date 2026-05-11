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
    text("brandName", data.brandName);
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
  $("primaryCta").href = "#contact";
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
    <a class="resource-card" href="${esc(getResourceHref(item, index))}" ${getDocumentLinkAttributes(item)}>
      ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}">` : ""}
      <div>
        <span>${esc(label)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
        <strong>${isDocumentResource(item) ? "Download" : "Read more"}</strong>
      </div>
    </a>
  `).join("");
  prepareLocalDocumentLinks();
  text("solutionsTitle", data.solutionsTitle);
  $("solutionGrid").innerHTML = data.solutions.map((item, index) => `
    <a class="solution-card" href="solution-detail.html?solution=${index}">
      ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}">` : ""}
      <div>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
        <span>Learn more</span>
      </div>
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

function normalizeCategory(value = "") {
  return String(value).toLowerCase().replace(/[^a-z]/g, "");
}

function isDocumentResource(item) {
  return normalizeCategory(item?.type) === "documents";
}

function getDownloadFileName(item) {
  const href = String(item?.body || "");
  const fileName = href.split("/").pop();
  return fileName || `${String(item?.title || "document").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`;
}

function getDocumentLinkAttributes(item) {
  if (!isDocumentResource(item)) return "";
  return `data-document-resource download="${esc(getDownloadFileName(item))}" target="_blank" rel="noopener"`;
}

function prepareLocalDocumentLinks() {
  if (window.location.protocol !== "file:") return;
  document.querySelectorAll("[data-document-resource]").forEach((link) => {
    link.removeAttribute("download");
  });
}

function getResourceHref(item, index) {
  if (item?.placeholder) return "#resources";
  const category = normalizeCategory(item?.type);
  if (category === "clientcases") return item.body || "index.html#stories";
  if (category === "documents") return item.body || "#";
  return `resource-detail.html?resource=${index}`;
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

renderLogo();
renderNavigation();
renderHero();
renderLists();
renderAbout();
renderFooter();
