/* CODUPO shared components.
   Header and footer are defined once here and used on every page as
   <site-header active="..."></site-header> and <site-footer></site-footer>. */

const NAV_ITEMS = [
  { key: "savjetovanje", label: "Savjetovanje", href: "savjetovanje.html" },
  { key: "rjesenja", label: "Rješenja", href: "rjesenja.html" },
  { key: "edukacije", label: "Edukacije", href: "edukacije.html" },
  { key: "konferencija", label: "Konferencija", href: "konferencija.html" },
  { key: "o-nama", label: "O nama", href: "o-nama.html" },
  { key: "blog", label: "Blog i novosti", href: "blog.html" },
];

const ICON = {
  phone:
    '<svg class="icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  mail:
    '<svg class="icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin:
    '<svg class="icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  linkedin:
    '<svg class="icon-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
  menu:
    '<svg class="icon-md" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  arrow:
    '<svg class="icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";
    const links = NAV_ITEMS.map(
      (item) =>
        `<a class="nav-link${item.key === active ? " is-active" : ""}" href="${item.href}">${item.label}</a>`
    ).join("");

    this.innerHTML = `
      <div class="topbar">
        <div class="container topbar-inner">
          <div class="topbar-group">
            <span class="topbar-item">${ICON.pin}Kutnjački put 15, Zagreb</span>
            <a class="topbar-item" href="tel:+38513862961">${ICON.phone}+385 1 3862 961</a>
            <a class="topbar-item" href="mailto:info@codupo.hr">${ICON.mail}info@codupo.hr</a>
          </div>
          <div class="topbar-group">
            <a class="topbar-item" href="https://www.linkedin.com/company/codupo" aria-label="LinkedIn">${ICON.linkedin}LinkedIn</a>
            <span class="lang-switch"><span class="lang-current">HR</span><span class="lang-divider">|</span><a class="lang-link" href="#">EN</a></span>
          </div>
        </div>
      </div>
      <div class="navbar">
        <div class="container navbar-inner">
          <a class="brand" href="index.html" aria-label="CODUPO Compliance, početna">
            <img class="brand-logo" src="images/CK-codupo-V.png" alt="CODUPO Compliance">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">
            ${ICON.menu}<span class="nav-toggle-label">Izbornik</span>
          </button>
          <nav class="nav-main" id="main-nav" aria-label="Glavna navigacija">
            ${links}
            <a class="button-primary nav-cta" href="kontakt.html">Kontakt</a>
          </nav>
        </div>
      </div>`;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav-main");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <div class="footer-main">
        <div class="container footer-inner">
          <div class="footer-about">
            <span class="footer-logo-tile"><img class="footer-logo" src="images/CK-codupo-V.png" alt="CODUPO Compliance"></span>
            <p class="footer-text">Savjetovanje i edukacije u području usklađenosti, etike, integriteta i antikorupcije. Iz Zagreba radimo s organizacijama u devet zemalja.</p>
            <div class="newsletter">
              <span class="mockup-tag">Mockup obrasca, ne šalje podatke</span>
              <label class="newsletter-label" for="nl-email">Newsletter o propisima, ISO normama i terminima edukacija</label>
              <div class="newsletter-row">
                <input class="field-input newsletter-input" id="nl-email" type="email" placeholder="vaša@email.adresa">
                <button class="button-primary" type="button">Prijava</button>
              </div>
            </div>
          </div>
          <div class="footer-col">
            <span class="footer-heading">Rješenja</span>
            <a class="footer-link" href="rjesenja.html#integrityup">IntegrityUP</a>
            <a class="footer-link" href="rjesenja.html#complianceup">ComplianceUP</a>
            <a class="footer-link" href="voiceup.html">VoiceUP</a>
            <a class="footer-link" href="integrityline.html">IntegrityLine</a>
          </div>
          <div class="footer-col">
            <span class="footer-heading">CODUPO</span>
            <a class="footer-link" href="edukacije.html">Edukacije</a>
            <a class="footer-link" href="savjetovanje.html">Savjetovanje</a>
            <a class="footer-link" href="konferencija.html">Konferencija</a>
            <a class="footer-link" href="blog.html">Blog i novosti</a>
            <a class="footer-link" href="o-nama.html">O nama</a>
          </div>
          <div class="footer-col">
            <span class="footer-heading">Kontakt</span>
            <span class="footer-line">CODUPO d.o.o.</span>
            <span class="footer-line">Kutnjački put 15</span>
            <span class="footer-line">HR-10000 Zagreb</span>
            <a class="footer-link" href="tel:+38513862961">+385 1 3862 961</a>
            <a class="footer-link" href="mailto:info@codupo.hr">info@codupo.hr</a>
            <span class="footer-line">OIB 39562727688</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <span class="footer-small">© ${year} CODUPO d.o.o. Sva prava pridržana.</span>
          <div class="footer-bottom-links">
            <a class="footer-small-link" href="#">Politika privatnosti</a>
            <a class="footer-small-link" href="#">Korištenje kolačića</a>
          </div>
        </div>
      </div>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
