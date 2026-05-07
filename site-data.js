const DEFAULT_SITE_DATA = {
  brandName: "Nexora",
  logo: "",
  menu: [
    { label: "Our solutions", href: "#solutions" },
    { label: "Client cases", href: "#stories" },
    { label: "Resources", href: "#resources" },
    { label: "About us", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  headerCta: "Request a demo",
  hero: {
    eyebrow: "Smart building management software",
    title: "Your market-leading Smart Sustainable Building Management software solution",
    text: "Unlock an integrated platform for all building stakeholders with configurable software solutions. Create real estate, facilities and work spaces that are efficient, and contribute to your business and sustainability goals.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
    primaryCta: "Request a demo",
    secondaryCta: "Explore our solutions"
  },
  clientLogos: [
    { name: "Sussex Partnership", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=Sussex+Partnership", href: "#solutions" },
    { name: "Queen's University Belfast", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=Queen's+University", href: "#solutions" },
    { name: "LSE", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=LSE", href: "#solutions" },
    { name: "University of Sunderland", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=Sunderland", href: "#solutions" },
    { name: "Civic Works", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=Civic+Works", href: "#solutions" },
    { name: "Metro Grid", image: "https://dummyimage.com/240x100/ffffff/114dac.png&text=Metro+Grid", href: "#solutions" }
  ],
  resourcesTitle: "Browse our latest resources",
  resources: [
    { type: "News", title: "Buildings brought to life with platform extensions", text: "A connected approach to real estate and facilities management for resilient operations.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", body: "This resource explores how integrated platforms can help building stakeholders connect operational workflows, asset data, workplace needs and sustainability actions into one clearer management approach.", layout: "split" },
    { type: "Client Cases", title: "Smart from the start", text: "A relocation project becomes an opportunity to build intelligence from the ground up.", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80", body: "This story highlights how early planning, connected systems and practical adoption can help organisations create smarter workplace and facility operations from day one.", layout: "panel" },
    { type: "E-book", title: "What is IWMS?", text: "A practical introduction to facility management software, workplace services, CAFM, and CMMS.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80", body: "This guide introduces the core concepts behind integrated workplace management systems and explains how they support real estate, facilities, maintenance, services and reporting.", layout: "editorial" }
  ],
  solutionsTitle: "Market-ready solutions for connected, sustainable places",
  solutionsIntro: "Configure this section for your own industries, products, and service lines. Each card is designed for quick scanning and clear next steps.",
  solutions: [
    { title: "Integrated Workplace Management", text: "Improve cost efficiency and process quality while supporting sustainability goals with a unified operations platform.", cta: "Learn more", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", body: "Connect real estate, facilities, maintenance, workplace services and reporting in one operational environment.", layout: "split" },
    { title: "Asset and Maintenance Management", text: "Plan, execute, and track work orders, inspections, preventive maintenance, and asset performance.", cta: "Learn more", image: "https://images.unsplash.com/photo-1581091870622-7c4a8d67ab80?auto=format&fit=crop&w=1200&q=80", body: "Create more reliable asset operations with structured maintenance processes, service visibility and actionable reporting.", layout: "panel" },
    { title: "Real Estate Portfolio", text: "Keep leases, projects, properties, and financial decisions visible across your full portfolio.", cta: "Explore now", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", body: "Support portfolio decisions with clearer information about properties, occupancy, costs and long-term planning.", layout: "editorial" },
    { title: "Energy and Sustainability", text: "Use building data to reduce consumption, report impact, and turn sustainability plans into action.", cta: "Read more", image: "https://images.unsplash.com/photo-1497436072909-f5e4be1d4b6c?auto=format&fit=crop&w=1200&q=80", body: "Turn energy, sustainability and operational data into programmes that can be measured and improved over time.", layout: "split" },
    { title: "Campus Management", text: "Coordinate space, services, maintenance, and experience across complex campus environments.", cta: "Discover", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80", body: "Help campus teams coordinate buildings, services and spaces while keeping stakeholders informed.", layout: "panel" },
    { title: "Field Services", text: "Connect service teams, suppliers, and customers with transparent workflows and reliable data.", cta: "See how", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80", body: "Improve service delivery with clearer work allocation, field visibility and supplier coordination.", layout: "editorial" }
  ],
  contact: {
    title: "Register for updates and product news",
    text: "Use this area for newsletter, sales, demo, or support contact details.",
    recipientEmail: "sales@seeingflow.com",
    formEndpoint: ""
  },
  about: {
    title: "About us",
    intro: "Founded in 2020, we build practical technology and advisory capability for connected buildings, operations, and sustainable growth.",
    historyTitle: "Company history",
    historyText: "Our company was set up in 2020 with a clear mission: to help organisations connect operational data, workplace processes, and real estate decisions in a more intelligent way.",
    mapTitle: "Global office locations",
    mapImage: "",
    mapImageSize: "Recommended map image size: 1600 x 900 px, JPG/PNG/WebP.",
    officeLocations: [
      "Singapore - Headquarters",
      "Hong Kong - Regional office",
      "Shanghai - Regional office",
      "Dubai - Regional office",
      "Shenzhen - R&D centre",
      "San Mateo, Silicon Valley - Global contact",
      "Jakarta - Global contact",
      "Nagoya - Global contact",
      "Ho Chi Minh City - Global contact"
    ],
    leadershipTitle: "Leadership team",
    leadership: [
      { role: "Chief Executive Officer", name: "CEO Name", bio: "Leads company strategy, partnerships, and global growth." },
      { role: "Advisory Panel Expert", name: "Expert Name 1", bio: "Advises on enterprise technology and market development." },
      { role: "Advisory Panel Expert", name: "Expert Name 2", bio: "Advises on smart buildings, real estate, and operations." },
      { role: "Advisory Panel Expert", name: "Expert Name 3", bio: "Advises on product innovation, data, and sustainability." }
    ],
    contactsTitle: "Contacts",
    contacts: [
      { office: "Singapore HQ", location: "Singapore", email: "singapore@example.com", phone: "+65 0000 0000" },
      { office: "Hong Kong Office", location: "Hong Kong", email: "hongkong@example.com", phone: "+852 0000 0000" },
      { office: "Shanghai Office", location: "Shanghai, China", email: "shanghai@example.com", phone: "+86 0000 0000" },
      { office: "Dubai Office", location: "Dubai, UAE", email: "dubai@example.com", phone: "+971 0000 0000" },
      { office: "Shenzhen R&D Centre", location: "Shenzhen, China", email: "shenzhen@example.com", phone: "+86 0000 0000" }
    ]
  },
  customersTitle: "What customers say",
  stories: [
    {
      title: "University campus transformation",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      brief: "A university team connected campus services, maintenance and space planning in one operational view.",
      caseIntro: "The client needed a clearer way to coordinate campus operations across buildings, service teams and long-term planning. The project focused on improving visibility, response times and data quality while keeping the daily experience simple for teams on the ground.",
      layout: "split"
    },
    {
      title: "Healthcare estate operations",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
      brief: "A healthcare estate team improved operational clarity across critical facilities.",
      caseIntro: "The organisation wanted a more reliable way to manage assets, maintenance tasks and facility information. The solution helped teams prioritise work, track progress and support safer, more efficient environments.",
      layout: "panel"
    },
    {
      title: "Commercial portfolio visibility",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      brief: "A commercial real estate portfolio gained clearer insight into properties, service activity and planning decisions.",
      caseIntro: "The client needed better visibility across a distributed property portfolio. The project introduced a more consistent operating model for data, reporting and cross-team collaboration.",
      layout: "editorial"
    }
  ],
  footerText: "A configurable enterprise website template for building, workplace, and real estate software.",
  footerColumns: [
    { title: "Solutions", links: ["IWMS", "Asset Management", "Space Management", "Sustainability"] },
    { title: "Company", links: ["Who we are", "Careers", "Partners", "Contact"] },
    { title: "Portals", links: ["Customer Portal", "Partner Portal", "Marketplace"] }
  ]
};

const SITE_DATA_KEY = "siteDataPlanonModelV4";

function getSiteData() {
  const saved = localStorage.getItem(SITE_DATA_KEY);
  if (!saved) return DEFAULT_SITE_DATA;
  return mergeSiteData(DEFAULT_SITE_DATA, JSON.parse(saved));
}

function saveSiteData(data) {
  localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
}

function mergeSiteData(defaults, saved) {
  if (Array.isArray(defaults)) return Array.isArray(saved) ? saved : defaults;
  if (!defaults || typeof defaults !== "object") return saved ?? defaults;
  const merged = { ...defaults, ...(saved && typeof saved === "object" ? saved : {}) };
  Object.keys(defaults).forEach((key) => {
    merged[key] = mergeSiteData(defaults[key], saved?.[key]);
  });
  return merged;
}
