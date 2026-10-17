/**
 * TOUSEEF RAZA - SENIOR WORDPRESS ARCHITECT PORTFOLIO
 * Cambased-inspired clean agency interactive logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeadlessPlayground();
  initProjectsFilter();
  initCaseStudyModal();
  initCopyEmail();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const menuWrapper = document.getElementById('navMenuWrapper');
  const links = document.querySelectorAll('.nav-link');

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
    const scrollPos = window.pageYOffset + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach((item) => {
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
   2. HEADLESS & AI DEVELOPER PLAYGROUND
   -------------------------------------------------------------------------- */
const DEMO_PAYLOADS = {
  posts: {
    client: `
      <div class="rendered-post-box">
        <div class="rendered-meta-tag">NEXT.JS 15 ISR &bull; 60s REVALIDATE</div>
        <div class="rendered-post-title">Architecting Zero-Bloat Headless WordPress with React</div>
        <p class="rendered-post-excerpt">How we decoupled the WordPress CMS backend to achieve 120ms global edge TTFB and 100/100 Core Web Vitals on mobile...</p>
      </div>
      <div class="rendered-post-box">
        <div class="rendered-meta-tag">ENTERPRISE CASE STUDY &bull; ISR COMPONENT</div>
        <div class="rendered-post-title">Migrating 200,000 WooCommerce Records to Cloud Caching</div>
        <p class="rendered-post-excerpt">Optimizing SQL query indices and integrating Redis transient caching for instantaneous checkout velocity...</p>
      </div>
    `,
    json: {
      status: 200,
      endpoint: "/wp-json/wp/v2/posts",
      renderedBy: "Next.js App Router (React Server Component)",
      cacheStatus: "HIT (Redis Engine)",
      latency: "9ms",
      data: [
        {
          id: 1042,
          slug: "zero-bloat-headless-wp",
          title: "Architecting Zero-Bloat Headless WordPress with React",
          author: "Touseef Raza",
          coreWebVitals: { lcp: "0.82s", fid: "12ms", cls: "0.00" },
          securityAudit: "Hardened • Wordfence Enterprise"
        },
        {
          id: 1043,
          slug: "woocommerce-caching-migration",
          title: "Migrating 200,000 WooCommerce Records to Cloud Caching",
          author: "Touseef Raza",
          coreWebVitals: { lcp: "0.91s", fid: "15ms", cls: "0.00" },
          securityAudit: "Hardened • Wordfence Enterprise"
        }
      ]
    }
  },
  products: {
    client: `
      <div class="rendered-post-box">
        <div class="rendered-meta-tag">WOOCOMMERCE REST API &bull; $149.00 USD</div>
        <div class="rendered-post-title">Enterprise B2B Subscription Module</div>
        <p class="rendered-post-excerpt">Automated Stripe recurring billing pipeline, multi-role checkout permissions, and automated customer notifications.</p>
      </div>
      <div class="rendered-post-box">
        <div class="rendered-meta-tag">WOOCOMMERCE REST API &bull; $89.00 USD</div>
        <div class="rendered-post-title">High-Velocity AJAX Cart &amp; Drawer Checkout Suite</div>
        <p class="rendered-post-excerpt">Sub-second cart calculation with dynamic Australian postal shipping zone calculation hook.</p>
      </div>
    `,
    json: {
      status: 200,
      endpoint: "/wp-json/wc/v3/products",
      currency: "USD",
      cartLatency: "11ms",
      gatewayVerified: "Stripe SDK + PayPal Webhooks",
      items: [
        {
          id: 8821,
          name: "Enterprise B2B Subscription Module",
          price: "149.00",
          stock: "in_stock",
          custom_acf: { b2b_wholesale_rate: "40% discount", tier: "Gold Partner" }
        },
        {
          id: 8822,
          name: "High-Velocity AJAX Cart Suite",
          price: "89.00",
          stock: "in_stock",
          custom_acf: { shipping_calculator: "Google Distance Matrix API" }
        }
      ]
    }
  },
  "ai-seo": {
    client: `
      <div class="rendered-post-box">
        <div class="rendered-meta-tag">OPENAI GPT-4o ENRICHMENT &bull; 99% CONFIDENCE</div>
        <div class="rendered-post-title">AI Auto-Generated Schema &amp; Semantic Meta</div>
        <p class="rendered-post-excerpt">Automated JSON-LD Schema.org TechArticle generated, high-CTR meta description crafted, and automated multi-lingual Scandinavian translation dispatched via WP webhook.</p>
      </div>
    `,
    json: {
      status: 200,
      endpoint: "/wp-json/ai-engine/v1/enrich",
      model: "gpt-4o",
      promptEngineeringStatus: "Certified Google Prompting Protocol",
      generatedSchema: {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Headless WordPress & AI Integration Guide",
        "author": { "@type": "Person", "name": "Touseef Raza", "title": "Senior WordPress Architect" },
        "aiConfidence": 0.994
      },
      automatedActions: [
        "Updated Yoast / RankMath meta tags via wp_update_post()",
        "Pushed localized translation payload to Norwegian Uniweb endpoint"
      ]
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

      const latency = isCached ? Math.floor(Math.random() * 6 + 6) : Math.floor(Math.random() * 50 + 120);
      const copy = JSON.parse(JSON.stringify(data.json));
      copy.latency = `${latency}ms`;
      copy.cacheStatus = isCached ? 'REDIS OBJECT CACHE HIT' : 'COLD MISS (Direct MySQL Scan)';

      jsonView.textContent = JSON.stringify(copy, null, 2);

      if (statusPill) {
        statusPill.textContent = `200 OK • ${latency}ms`;
      }
      if (cacheStatus) {
        cacheStatus.textContent = isCached ? `Redis HIT (${latency}ms)` : `Bypass Cache (${latency}ms)`;
        cacheStatus.style.color = isCached ? 'var(--color-orange)' : '#D97706';
      }

      clientView.style.opacity = '1';
      jsonView.style.opacity = '1';
    }, 180);
  }

  runBtn?.addEventListener('click', execute);
  select?.addEventListener('change', execute);
  cacheToggle?.addEventListener('change', execute);

  execute();
}

/* --------------------------------------------------------------------------
   3. PROJECTS FILTER
   -------------------------------------------------------------------------- */
function initProjectsFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.project-item-card');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. CASE STUDY DETAIL MODAL (All 10 Real Projects from CV)
   -------------------------------------------------------------------------- */
const PROJECT_STUDIES = {
  zapta: {
    title: "ZAPTA Technologies",
    role: "Lead WordPress Architect & Performance Specialist",
    url: "https://zaptatech.com",
    shot: "shots/zapta.jpg",
    badge: "Corporate Portal",
    challenge: "ZAPTA Technologies required an enterprise-grade technology showcase portal capable of handling high concurrency traffic while preserving sub-second mobile page loads. The previous architecture suffered from third-party plugin bloat, sluggish TTFB, and unoptimized relational queries.",
    solution: "Engineered a 100% bespoke WordPress theme from the ground up utilizing Object-Oriented PHP 8.x and native Gutenberg blocks. Implemented server-level Redis object caching, Cloudflare APO integration, database schema indexing, and asset pruning to eliminate render-blocking scripts.",
    kpis: [
      { v: "95+", l: "Mobile PageSpeed" },
      { v: "-40%", l: "Load Time Reduction" },
      { v: "100%", l: "Zero Bloat Code" }
    ],
    tech: ["PHP 8.3", "OOP WordPress", "Redis Cache", "Gutenberg Block API", "Cloudflare APO", "MySQL Optimization"]
  },
  glowup: {
    title: "GlowUp Supply",
    role: "Senior WooCommerce Engineer",
    url: "https://glowup.supply",
    shot: "shots/glowup.jpg",
    badge: "High-Volume E-Commerce",
    challenge: "High-traffic beauty cosmetics storefront experiencing cart drop-offs, slow filtering on extensive product catalogs, and checkout friction under peak marketing blitzes.",
    solution: "Re-engineered the WooCommerce checkout pipeline with seamless single-step checkout and Stripe webhook reconciliation. Built instant AJAX product filtering that executes without page reloads, coupled with Redis transients to cache heavy variations.",
    kpis: [
      { v: "< 1.5s", l: "Full Load Speed" },
      { v: "+28%", l: "Checkout Conversion" },
      { v: "Instant", l: "AJAX Filter Response" }
    ],
    tech: ["WooCommerce", "Stripe SDK", "AJAX Filtering", "Redis Transients", "Core Web Vitals", "Custom JS"]
  },
  employerease: {
    title: "EmployerEase",
    role: "Full-Stack WordPress & Security Engineer",
    url: "https://employerease.com",
    shot: "shots/employerease.jpg",
    badge: "B2B HR Management Platform",
    challenge: "US corporate HR platform requiring complex quote calculation logic, automated lead capture pipelines, and stringent data security hardening for sensitive enterprise client data.",
    solution: "Architected bespoke dynamic quotation forms with JavaScript and PHP REST validation. Implemented rigorous database sanitization, custom .htaccess firewall protections, Wordfence Pro hardening, and zero-vulnerability data pipelines.",
    kpis: [
      { v: "100%", l: "Vulnerability Free" },
      { v: "Real-time", l: "Dynamic Quote Engine" },
      { v: "Enterprise", l: "B2B Lead Flow" }
    ],
    tech: ["Custom Forms", "REST API", "Security Hardening", "Wordfence Pro", "OOP PHP", "B2B Lead Engine"]
  },
  harmain: {
    title: "Harmain Rides",
    role: "Custom Booking Systems Engineer",
    url: "https://harmainrides.com",
    shot: "shots/harmain.jpg",
    badge: "Transport Booking Engine",
    challenge: "Luxury chauffeur and transport fleet needing automated fare estimation based on dynamic route distances, multi-step booking modal UX, and online payment deposits.",
    solution: "Integrated Google Maps Distance Matrix API with custom WordPress REST endpoints to calculate accurate point-to-point driving distances, vehicle class tariffs, and return trip discounts. Automated instant SMS/email transactional alerts via webhooks.",
    kpis: [
      { v: "Live", l: "Google Maps API" },
      { v: "Instant", l: "Fare Estimation" },
      { v: "Automated", l: "SMS & Email Webhooks" }
    ],
    tech: ["Google Maps API", "REST API", "OOP PHP", "Stripe Deposits", "Custom Booking Modal", "Webhooks"]
  },
  ofpf: {
    title: "OFPF Australia",
    role: "Senior WooCommerce B2B Architect",
    url: "https://ofpf.com.au",
    shot: "shots/ofpf.jpg",
    badge: "B2B E-Commerce • Australia",
    challenge: "Commercial fresh produce supplier in Australia requiring complex wholesale pricing tiers, order cut-off scheduling, and dynamic regional freight delivery calculations.",
    solution: "Developed custom WooCommerce hooks for customer role-based tiered pricing, automated recurring order delivery windows, and custom freight matrix calculation based on Australian postcode zones.",
    kpis: [
      { v: "B2B", l: "Tiered Pricing Engine" },
      { v: "Postcode", l: "Dynamic Shipping Rates" },
      { v: "Australia", l: "National Logistics" }
    ],
    tech: ["WooCommerce", "Dynamic Pricing Hooks", "Custom PHP", "Australian Postage API", "Order Scheduling"]
  },
  uniweb: {
    title: "Uniweb Norway",
    role: "Senior WordPress Consultant",
    url: "https://uniweb.no",
    shot: "shots/uniweb.jpg",
    badge: "Scandinavian Agency Portal",
    challenge: "Scandinavian digital agency portal requiring multilingual localization, custom modular ACF Pro blocks, and stringent adherence to European accessibility and GDPR standards.",
    solution: "Built a modular block system with ACF Pro and Theme JSON, engineered full multilingual localization support, and optimized assets to achieve 90+ PageSpeed across European edge servers.",
    kpis: [
      { v: "Multilingual", l: "Nordic Localization" },
      { v: "ACF Pro", l: "Flexible Blocks" },
      { v: "90+", l: "Core Web Vitals" }
    ],
    tech: ["ACF Pro", "Multilingual Polylang/WPML", "OOP PHP", "SCSS", "GDPR Hardening"]
  },
  trafficsummits: {
    title: "Traffic Summits",
    role: "Senior WordPress & Event Systems Developer",
    url: "https://trafficsummits.com",
    shot: "shots/trafficsummits.jpg",
    badge: "Global Expo & Conference",
    challenge: "High-volume international digital marketing conference requiring interactive speaker & multi-track agenda modules, ticket checkout integrations, and GA4 event tracking.",
    solution: "Engineered high-performance custom post types and ACF Pro modules for agendas, speakers, and sponsors. Integrated ticket checkout pipelines and configured GA4/GTM data layers for tracking advertising conversions.",
    kpis: [
      { v: "High Concurrency", l: "Peak Ticket Traffic" },
      { v: "Interactive", l: "Multi-Track Agenda" },
      { v: "GA4/GTM", l: "Deep Conversion Tracking" }
    ],
    tech: ["ACF Pro", "GA4 & GTM", "Ticket Webhooks", "High Concurrency Optimization", "Custom CPTs"]
  },
  winston: {
    title: "Winston Warren",
    role: "Full-Stack WordPress Developer",
    url: "https://winstonwarren.com",
    shot: "shots/winston.jpg",
    badge: "Corporate Advisory Platform",
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
  const triggers = document.querySelectorAll('.open-modal-btn');

  if (!overlay || !modalBody) return;

  function open(id) {
    const p = PROJECT_STUDIES[id];
    if (!p) return;

    modalBody.innerHTML = `
      <div class="modal-meta-top">
        <span class="project-category-badge">${p.badge}</span>
        <h3 class="modal-headline">${p.title}</h3>
        <p style="color: var(--color-orange); font-weight: 700; font-size: 0.88rem; margin-top: 0.25rem;">${p.role}</p>
      </div>

      <!-- Real Live Screenshot Mockup in Modal -->
      <div class="modal-preview-frame">
        <div class="browser-dots-bar">
          <span class="b-dot dot-r"></span>
          <span class="b-dot dot-y"></span>
          <span class="b-dot dot-g"></span>
          <span class="browser-url-pill">${p.url.replace('https://', '')}</span>
        </div>
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
        <div class="project-chips">
          ${p.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-cta-buttons">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn btn-pill-orange">
          <span>Visit Live Platform (${p.url.replace('https://', '')})</span>
          <span class="btn-arrow">&rarr;</span>
        </a>
        <a href="#contact" class="btn btn-pill-secondary modal-inquire-btn">
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

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      open(id);
    });
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
   5. COPY EMAIL UTILITY & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailTrigger');
  copyBtn?.addEventListener('click', () => {
    const email = 'touseefraza409@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied: touseefraza409@gmail.com');
    }).catch(() => {
      showToast('Email: touseefraza409@gmail.com');
    });
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
  }, 3500);
}
