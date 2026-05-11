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
  if ((category === "clientcases" || category === "documents") && resource.body) {
    window.location.replace(resource.body);
  }
}

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
    const href = `index.html${item.href}`;
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
