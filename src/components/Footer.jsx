const SUPPORT_LINKS = [
  { label: 'Envíos',       href: '#envios'       },
  { label: 'Devoluciones', href: '#devoluciones'  },
  { label: 'FAQs',         href: '#faqs'          },
  { label: 'Tamaños',      href: '#tallas'        },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok',    href: 'https://tiktok.com'    },
  { label: 'Twitter',   href: 'https://twitter.com'   },
];

/* ─── Sub-componentes ─── */

const NewsletterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de suscripción
  };

  return (
    <div className="footer__newsletter">
      <h3 className="footer__heading">Newsletter</h3>
      <p className="footer__subtext">
        Únete a la cultura. Recibe avisos de drops exclusivos.
      </p>
      <form className="footer__newsletter-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">Tu email</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="TU@EMAIL.COM"
          className="footer__input"
          autoComplete="email"
          required
        />
        <button type="submit" className="footer__submit-btn">
          OK
        </button>
      </form>
    </div>
  );
};

const SupportLinks = () => (
  <div className="footer__support">
    <h3 className="footer__heading footer__heading--muted">Soporte</h3>
    <nav aria-label="Soporte">
      <ul className="footer__link-list" role="list">
        {SUPPORT_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className="footer__link">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const BrandInfo = () => (
  <div className="footer__brand">
    <p className="footer__brand-name">UrbanShop</p>
    <p className="footer__copy">© 2026 — Todos los derechos reservados</p>
    <ul className="footer__social-list" role="list">
      {SOCIAL_LINKS.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ─── Componente principal ─── */

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer__inner">
      <NewsletterForm />
      <SupportLinks />
      <BrandInfo />
    </div>
    <div className="footer__bottom">
      <span className="footer__tagline">CULTURE. STYLE. IDENTITY.</span>
    </div>
  </footer>
);

export default Footer;