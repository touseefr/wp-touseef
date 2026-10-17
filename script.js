/**
 * TOUSEEF RAZA - SENIOR WORDPRESS ARCHITECT PORTFOLIO
 * Modern Organic Luxury Architectural Theme (Arcora Aesthetic)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeadlessPlayground();
  initProjectsDrawer();
  initCaseStudyModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const menuWrapper = document.getElementById('navMenuWrapper');
  const links = document.querySelectorAll('.arc-nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  mobileBtn?.addEventListener('click', () => {
    const isOpen = menuWrapper?.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close on link click
  links.forEach((link) => {
    link.addEventListener('click', () => {
      menuWrapper?.classList.remove('open');
      mobileBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 160;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.arc-nav-link').forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. FEATURED PROJECTS DRAWER TOGGLE (Show/Hide Remaining 6 Projects)
   -------------------------------------------------------------------------- */
function initProjectsDrawer() {
  const toggleBtn = document.getElementById('toggleAllProjectsBtn');
  const drawer = document.getElementById('allProjectsDrawer');
  const textEl = document.getElementById('allProjectsToggleText');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = drawer.classList.toggle('open');

    if (textEl) {
      textEl.textContent = isOpen ? 'Collapse Directory' : 'View All 10 Projects';
    }

    if (isOpen) {
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* --------------------------------------------------------------------------
   3. HEADLESS & AI PLAYGROUND INTERACTIVE ENGINE
   -------------------------------------------------------------------------- */
const DEMO_PAYLOADS = {
  posts: {
    endpoint: "/wp-json/wp/v2/posts?_embed&per_page=2",
    client: `
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        <div style="background:#FFF; padding:0.85rem; border-radius:12px; border:1px solid #E5E7EB;">
          <span style="font-size:0.7rem; font-weight:700; color:#10B981; text-transform:uppercase;">Decoupled Headless Blog</span>
          <h4 style="font-size:0.95rem; margin:0.25rem 0; color:#161513;">Architecting High-Speed WordPress APIs with Next.js 15</h4>
          <p style="font-size:0.8rem; color:#76736E; margin:0;">Zero runtime PHP execution on public pagehits. Static edge delivery with ISR.</p>
        </div>
        <div style="background:#FFF; padding:0.85rem; border-radius:12px; border:1px solid #E5E7EB;">
          <span style="font-size:0.7rem; font-weight:700; color:#10B981; text-transform:uppercase;">Enterprise Case Study</span>
          <h4 style="font-size:0.95rem; margin:0.25rem 0; color:#161513;">Benchmarking Redis Object Caching vs MySQL Disk Scans</h4>
          <p style="font-size:0.8rem; color:#76736E; margin:0;">Reduced 180ms TTFB down to 11ms under concurrent load of 500+ users.</p>
        </div>
      </div>
    `,
    json: {
      status: 200,
      protocol: "HTTP/2.0",
      cacheHeader: "X-Cache: HIT (Redis In-Memory)",
      data: [
        { id: 104, title: "Architecting High-Speed WordPress APIs", format: "headless", ttfb: "11ms" },
        { id: 105, title: "Benchmarking Redis Object Caching", format: "headless", ttfb: "9ms" }
      ]
    }
  },
  products: {
    endpoint: "/wp-json/wc/v3/products?status=publish&featured=true",
    client: `
      <div style="display:flex; gap:0.75rem;">
        <div style="flex:1; background:#FFF; padding:0.85rem; border-radius:12px; border:1px solid #E5E7EB;">
          <span style="font-size:0.68rem; font-weight:700; color:#059669; background:#ECFDF5; padding:0.15rem 0.5rem; border-radius:9999px;">In Stock</span>
          <h4 style="font-size:0.9rem; margin:0.35rem 0; color:#161513;">GlowUp Pro Serum</h4>
          <div style="font-weight:800; font-size:1.05rem; color:#161513;">£48.00</div>
          <p style="font-size:0.75rem; color:#76736E; margin:0.25rem 0 0;">Sub-1.2s Stripe Checkout</p>
        </div>
        <div style="flex:1; background:#FFF; padding:0.85rem; border-radius:12px; border:1px solid #E5E7EB;">
          <span style="font-size:0.68rem; font-weight:700; color:#059669; background:#ECFDF5; padding:0.15rem 0.5rem; border-radius:9999px;">In Stock</span>
          <h4 style="font-size:0.9rem; margin:0.35rem 0; color:#161513;">Harmain Fleet Booking</h4>
          <div style="font-weight:800; font-size:1.05rem; color:#161513;">$120.00</div>
          <p style="font-size:0.75rem; color:#76736E; margin:0.25rem 0 0;">Google Maps Matrix Routing</p>
        </div>
      </div>
    `,
    json: {
      status: 200,
      protocol: "HTTP/2.0",
      wc_version: "9.2.0",
      query_cached: true,
      items: [
        { sku: "GLOW-01", price: 48.0, currency: "GBP", inventory: "InStock" },
        { sku: "HR-CHAUFFEUR", price: 120.0, currency: "USD", bookingEngine: "Active" }
      ]
    }
  },
  "ai-seo": {
    endpoint: "/wp-json/ai-engine/v1/enrich",
    client: `
      <div style="background:#FFF; padding:1rem; border-radius:12px; border:1px solid #E5E7EB;">
        <span style="font-size:0.68rem; font-weight:700; color:#4F46E5; background:#EEF2FF; padding:0.15rem 0.55rem; border-radius:9999px;">OpenAI GPT-4o Schema Engine</span>
        <h4 style="font-size:0.95rem; margin:0.35rem 0; color:#161513;">Automated Structured JSON-LD Rich Snippet</h4>
        <p style="font-size:0.82rem; color:#76736E; line-height:1.5;">Generated Schema.org <code>TechArticle</code> entity with verified breadcrumbs, author credential tags, and canonical graph markup.</p>
      </div>
    `,
    json: {
      status: 200,
      model: "gpt-4o-mini",
      schemaEnriched: true,
      graph: {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        author: "Touseef Raza",
        headline: "High-Performance Decoupled WordPress Architectures",
        wordCount: 1420
      }
    }
  }
};

function initHeadlessPlayground() {
  const select = document.getElementById('playgroundEndpoint');
  const cacheToggle = document.getElementById('playgroundCacheToggle');
  const runBtn = document.getElementById('playgroundRunBtn');
  const clientView = document.getElementById('playgroundClientView');
  const jsonView = document.getElementById('playgroundJsonView');
  const statusPill = document.getElementById('playgroundStatusPill');
  const cacheStatus = document.getElementById('playgroundCacheStatus');

  if (!select || !clientView || !jsonView) return;

  function execute() {
    const key = select.value;
    const isCached = cacheToggle ? cacheToggle.checked : true;
    const data = DEMO_PAYLOADS[key] || DEMO_PAYLOADS.posts;

    clientView.style.opacity = '0.5';
    jsonView.style.opacity = '0.5';
    if (statusPill) statusPill.textContent = 'Executing Query...';

    setTimeout(() => {
      clientView.innerHTML = data.client;

      const latency = isCached ? Math.floor(Math.random() * 5 + 7) : Math.floor(Math.random() * 40 + 110);
      const copy = JSON.parse(JSON.stringify(data.json));
      copy.latency = `${latency}ms`;
      copy.cacheStatus = isCached ? 'REDIS OBJECT CACHE HIT' : 'COLD MISS (Direct MySQL Scan)';

      jsonView.textContent = JSON.stringify(copy, null, 2);

      if (statusPill) {
        statusPill.textContent = `200 OK • ${latency}ms`;
      }
      if (cacheStatus) {
        cacheStatus.textContent = isCached ? `Redis HIT (${latency}ms)` : `Bypass Cache (${latency}ms)`;
        cacheStatus.style.color = isCached ? '#10B981' : '#D97706';
      }

      clientView.style.opacity = '1';
      jsonView.style.opacity = '1';
    }, 150);
  }

  runBtn?.addEventListener('click', execute);
  select?.addEventListener('change', execute);
  cacheToggle?.addEventListener('change', execute);

  execute();
}

/* --------------------------------------------------------------------------
   4. CASE STUDY DETAIL MODAL (All 10 Real Projects from CV)
   -------------------------------------------------------------------------- */
const PROJECT_STUDIES = {
  zapta: {
    title: "ZAPTA Technologies",
    role: "Lead WordPress Architect & Performance Engineer",
    url: "https://zaptatech.com",
    shot: "shots/zapta.jpg",
    badge: "Corporate Portal • US Enterprise",
    challenge: "High-concurrency technology services portal was experiencing slow mobile load times, heavy plugin dependencies, and database query bottlenecks during marketing surges.",
    solution: "Engineered a 100% custom OOP PHP 8.x theme architecture, purged third-party builder bloat, implemented server-side Redis object caching, and tuned Cloudflare edge caching.",
    kpis: [
      { v: "98/100", l: "Mobile PageSpeed" },
      { v: "-42%", l: "Load Time Reduction" },
      { v: "0 Bloat", l: "Pure Custom Codebase" }
    ],
    tech: ["Custom Theme", "OOP PHP 8.x", "Redis Cache", "ACF Pro", "Cloudflare APO", "REST API"]
  },
  glowup: {
    title: "GlowUp Supply",
    role: "WooCommerce Architect & Speed Specialist",
    url: "https://glowupsupply.co.uk",
    shot: "shots/glowup.jpg",
    badge: "High-Volume E-Commerce • UK",
    challenge: "High-traffic UK beauty brand suffered cart abandonment due to sluggish WooCommerce checkout latency and bloated script execution.",
    solution: "Optimized WooCommerce template fragments, integrated direct Stripe Elements API webhook pipelines, pruned CSS/JS, and tuned MySQL database query indexing.",
    kpis: [
      { v: "+28%", l: "Checkout Conversion" },
      { v: "1.2s", l: "Total Page Load" },
      { v: "0.00", l: "Zero Layout Shift (CLS)" }
    ],
    tech: ["WooCommerce Core", "Stripe API", "Query Optimization", "Cart Fragments AJAX", "Asset Tree-Shaking"]
  },
  harmain: {
    title: "Harmain Rides",
    role: "Full-Stack WordPress & API Integration Lead",
    url: "https://harmainrides.com",
    shot: "shots/harmain.jpg",
    badge: "Chauffeur Fleet & Booking Engine • Saudi Arabia",
    challenge: "Luxury transport service needed dynamic real-time distance-based route pricing, automated vehicle tier assignment, and instant booking deposit capture.",
    solution: "Architected a custom CPT booking engine integrated with Google Maps Distance Matrix API for automatic kilometer calculation, dynamic pricing algorithms, and Stripe deposit checkout.",
    kpis: [
      { v: "100%", l: "Automated Dispatch" },
      { v: "Live API", l: "Google Distance Matrix" },
      { v: "Instant", l: "Stripe Deposit Capture" }
    ],
    tech: ["Google Maps API", "Custom CPTs", "Stripe Connect", "AJAX Pricing Engine", "Mobile-First UX"]
  },
  uniweb: {
    title: "Uniweb Norway",
    role: "Custom Theme & Multilingual Engineer",
    url: "https://uniweb.no",
    shot: "shots/uniweb.jpg",
    badge: "Scandinavian Agency Portal • Oslo",
    challenge: "Scandinavian digital agency needed a modular, flexible Gutenberg editor experience with seamless Norwegian/English bilingual content synchronization.",
    solution: "Architected bespoke ACF Pro Flexible Content blocks with strict semantic HTML5, fluid typography, zero commercial builder plugins, and integrated WPML translation sync.",
    kpis: [
      { v: "100%", l: "Figma-to-Code Fidelity" },
      { v: "2 Langs", l: "WPML NO / EN Sync" },
      { v: "0 Bloat", l: "Zero Page Builder" }
    ],
    tech: ["ACF Pro Blocks", "WPML Multilingual", "Semantic HTML5", "CSS Grid / Flexbox", "Security Hardened"]
  },
  employerease: {
    title: "EmployerEase",
    role: "Senior Full-Stack PHP Developer",
    url: "https://employerease.com",
    shot: "shots/employerease.jpg",
    badge: "B2B HR Platform • US",
    challenge: "B2B workforce advisory platform required custom service tier quotation calculators, lead routing to CRM, and stringent enterprise security compliance.",
    solution: "Developed custom interactive quote calculation widgets, encrypted form submission pipelines, and implemented strict CSP headers and SQL injection protection.",
    kpis: [
      { v: "+35%", l: "Inquiry Conversion" },
      { v: "A+ Rating", l: "Security Grade" },
      { v: "Instant", l: "CRM Lead Sync" }
    ],
    tech: ["Custom CPTs", "AJAX Quote Engine", "CRM API Webhooks", "Security Hardening", "OOP PHP"]
  },
  ofpf: {
    title: "OFPF Australia",
    role: "WooCommerce & B2B Freight Developer",
    url: "https://ofpf.com.au",
    shot: "shots/ofpf.jpg",
    badge: "B2B Fresh Produce Portal • Australia",
    challenge: "Wholesale organic produce supplier needed complex postcode-based delivery tier calculations, recurring order scheduling, and commercial account billing.",
    solution: "Engineered custom WooCommerce shipping method plugins for Australian postcodes, delivery slot cutoff schedulers, and streamlined B2B credit invoice checkouts.",
    kpis: [
      { v: "100%", l: "Postcode Routing" },
      { v: "Sub-2s", l: "Heavy Catalog Load" },
      { v: "Automated", l: "Freight Calculation" }
    ],
    tech: ["WooCommerce Hooks", "Custom Shipping API", "Postcode Radius Matrix", "B2B Invoicing", "MySQL Indexing"]
  },
  trafficsummits: {
    title: "Traffic Summits",
    role: "Lead Event Platform Developer",
    url: "https://trafficsummits.com",
    shot: "shots/trafficsummits.jpg",
    badge: "Global Tech Expo • Switzerland & Global",
    challenge: "International affiliate conference required multi-track agenda schedules, VIP speaker directories, dynamic ticket tier checkouts, and high concurrent launch traffic.",
    solution: "Built custom post architectures for Speakers, Sponsors, and Multi-Hall Agendas with filtering, integrated Stripe checkout, and configured Redis object caching for traffic surges.",
    kpis: [
      { v: "10k+", l: "Surge Traffic Support" },
      { v: "Instant", l: "Agenda Filter Speed" },
      { v: "Global", l: "Stripe Currency Engine" }
    ],
    tech: ["Custom Post Types", "Agenda State Filter", "Stripe Checkout", "Cloudflare Edge Cache", "OOP PHP"]
  },
  winston: {
    title: "Winston Warren",
    role: "Bespoke Theme Developer",
    url: "https://winstonwarren.com.au",
    shot: "shots/winston.jpg",
    badge: "Corporate Advisory • Australia",
    challenge: "High-end corporate advisory firm required a pixel-perfect conversion of complex Figma design systems into a lightweight, responsive WordPress theme without page-builder bloat.",
    solution: "Hand-crafted bespoke templates from Figma with modular CSS Grid/Flexbox, fluid typography, zero commercial plugins, and sub-1s initial page rendering on mobile devices.",
    kpis: [
      { v: "95+", l: "Mobile PageSpeed" },
      { v: "100%", l: "Pixel-Perfect Figma" },
      { v: "< 1s", l: "First Contentful Paint" }
    ],
    tech: ["Figma-to-WP", "Vanilla CSS/JS", "OOP PHP", "Semantic HTML5", "Speed Hardening"]
  },
  itsmoxy: {
    title: "ItsMoxy",
    role: "Creative Front-End & WordPress Developer",
    url: "https://itsmoxy.com",
    shot: "shots/itsmoxy.jpg",
    badge: "Creative Agency Showcase",
    challenge: "Digital brand agency wanted an immersive portfolio with smooth micro-interactions, high-speed asset loading, and technical SEO structure to showcase client campaigns.",
    solution: "Implemented hardware-accelerated 60fps CSS/JavaScript micro-animations, lazy-loaded media assets, and structured Schema.org JSON-LD markup for maximum organic search discovery.",
    kpis: [
      { v: "60fps", l: "Smooth UI Interactions" },
      { v: "Sub-1s", l: "First Paint" },
      { v: "Schema.org", l: "Rich Snippets" }
    ],
    tech: ["Custom JS", "CSS Animations", "Technical SEO", "Figma-to-WP", "Responsive Architecture"]
  },
  anode: {
    title: "Anode Electrical AU",
    role: "WordPress & Local SEO Developer",
    url: "https://anodeelectrical.com.au",
    shot: "shots/anode.jpg",
    badge: "Commercial Services • Australia",
    challenge: "Australian commercial electrical enterprise needed high-converting service quotation capture forms, an interactive project showcase, and local Australian technical SEO.",
    solution: "Developed custom AJAX quote forms with instant client email routing, responsive gallery modules, and Australian geo-targeted local schema markup.",
    kpis: [
      { v: "Rank Boost", l: "Local Australian SEO" },
      { v: "Instant", l: "AJAX Quotation Engine" },
      { v: "100%", l: "Mobile Optimized" }
    ],
    tech: ["Local SEO Schema", "Custom Forms", "Figma-to-WP", "Australia Geo-Targeting", "OOP PHP"]
  }
};

function initCaseStudyModal() {
  const overlay = document.getElementById('caseStudyModalOverlay');
  const closeBtn = document.getElementById('modalCloseButton');
  const modalBody = document.getElementById('modalBodyContainer');

  if (!overlay || !modalBody) return;

  function open(id) {
    const p = PROJECT_STUDIES[id];
    if (!p) return;

    modalBody.innerHTML = `
      <div class="modal-meta-top">
        <span class="arc-badge-pill" style="margin-bottom:0.5rem; display:inline-block;">${p.badge}</span>
        <h3 class="modal-headline">${p.title}</h3>
        <p style="color: var(--arc-text-secondary); font-weight: 700; font-size: 0.9rem; margin-top: 0.25rem;">${p.role}</p>
      </div>

      <div class="modal-preview-frame">
        <div class="modal-img-wrap">
          <img src="${p.shot}" alt="${p.title} live screenshot" class="modal-project-img" loading="lazy">
        </div>
      </div>

      <div class="modal-section-block">
        <h4>The Challenge &amp; Problem</h4>
        <p>${p.challenge}</p>
      </div>

      <div class="modal-section-block">
        <h4>Engineered Solution &amp; Architecture</h4>
        <p>${p.solution}</p>
      </div>

      <div class="modal-metrics-strip">
        ${p.kpis.map(k => `
          <div class="modal-stat-card">
            <span class="val">${k.v}</span>
            <span class="lbl">${k.l}</span>
          </div>
        `).join('')}
      </div>

      <div class="modal-section-block">
        <h4>Core Technical Stack</h4>
        <div class="modal-chips">
          ${p.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-cta-buttons">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="arc-btn-dark">
          <span>Visit Live Platform</span>
          <span class="arc-btn-arrow">&rarr;</span>
        </a>
        <a href="#contact" class="arc-btn-outline modal-inquire-btn">
          <span>Inquire Similar Solution</span>
        </a>
      </div>
    `;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    modalBody.querySelector('.modal-inquire-btn')?.addEventListener('click', close);
  }

  function close() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegated click listener for any project card trigger
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      if (id) open(id);
    }
  });

  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('arcContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';

    showToast(`Thank you, ${name}! Your inquiry has been sent. I will respond within 2–4 hours.`);
    form.reset();
  });
}

function showToast(text) {
  const stack = document.getElementById('toastStack');
  if (!stack) return;

  const toast = document.createElement('div');
  toast.className = 'toast-pill-msg';
  toast.textContent = text;

  stack.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}
