const data = getSiteData();
const params = new URLSearchParams(window.location.search);
const solutionIndex = Number(params.get("solution") || 0);
const solution = data.solutions[solutionIndex] || data.solutions[0];
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
    const href = item.label.toLowerCase().includes("contact") ? "contact-us.html" : `index.html${item.href}`;
    return `<a href="${esc(href)}">${esc(item.label)}</a>`;
  }).join("");
  text("headerCta", data.headerCta);
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

function renderSolution() {
  const layout = ["split", "panel", "editorial"].includes(solution.layout) ? solution.layout : "split";
  document.body.classList.add(`case-layout-${layout}`);
  document.title = `${solution.title} | Solution`;
  text("solutionBreadcrumb", solution.title);
  text("solutionTitle", solution.title);
  text("solutionSummary", solution.text);
  text("solutionIntroTitle", solution.title);
  text("solutionBody", solution.body || solution.text || "Add the full solution detail body from the admin portal.");
  $("solutionImage").src = solution.image || data.hero.image;
  $("solutionImage").alt = solution.title;
}

renderShell();
renderSolution();
