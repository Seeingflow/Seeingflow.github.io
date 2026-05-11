const data = getSiteData();
const params = new URLSearchParams(window.location.search);
const caseIndex = Number(params.get("case") || 0);
const story = data.stories[caseIndex] || data.stories[0];
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

function renderCase() {
  const layout = ["split", "panel", "editorial"].includes(story.layout) ? story.layout : "split";
  document.body.classList.add(`case-layout-${layout}`);
  document.title = `${story.title} | Client Case Study`;
  text("caseBreadcrumb", story.title);
  text("caseTitle", story.title);
  text("caseBrief", story.brief || "Client case overview and project background.");
  text("caseIntroTitle", story.title);
  text("caseIntroText", story.caseIntro || "Add the full case intro from the admin portal.");
  $("caseImage").src = story.image;
  $("caseImage").alt = story.title;
}

renderShell();
renderCase();
