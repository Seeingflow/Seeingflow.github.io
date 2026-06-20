const data = getSiteData();
const params = new URLSearchParams(window.location.search);
const resourceIndex = Number(params.get("resource") || 0);
const resource = data.resources[resourceIndex] || data.resources[0];
const $ = (id) => document.getElementById(id);
const text = (id, value) => { $(id).textContent = value || ""; };
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char]);

function normalizeCategory(value = "") {
  return String(value).toLowerCase().replace(/[^a-z]/g, "");
}

function redirectCategoryResource() {
  const category = normalizeCategory(resource.type);
  if (category === "documents") {
    window.location.replace("document-list.html?v=video-cloud-20260620");
    return;
  }
  if (category === "clientcases" && resource.body) {
    window.location.replace(resource.body);
  }
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
    const href = `home-20260620.html${item.href}`;
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

function renderResource() {
  const layout = ["split", "panel", "editorial"].includes(resource.layout) ? resource.layout : "split";
  document.body.classList.add(`case-layout-${layout}`);
  document.title = `${resource.title} | Resource`;
  text("resourceBreadcrumb", resource.title);
  text("resourceType", resource.type);
  text("resourceTitle", resource.title);
  text("resourceSummary", resource.text);
  text("resourceIntroTitle", resource.title);
  text("resourceBody", resource.body || resource.text || "Add the full resource body from the admin portal.");
  $("resourceImage").src = resource.image;
  $("resourceImage").alt = resource.title;
}

renderShell();
redirectCategoryResource();
renderResource();
