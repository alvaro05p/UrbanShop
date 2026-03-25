import { useState } from 'react';
import { ShoppingBag, Search, X, AlignRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Sneakers', href: '#sneakers' },
  { label: 'Apparel',  href: '#apparel'  },
  { label: 'Drops',    href: '#drops'    },
];

/* ─── Sub-componentes ─── */

const Logo = () => (
  <a href="/" className="header__logo" aria-label="UrbanShop — Inicio">
    Urban<span className="header__logo-highlight">Shop</span>
  </a>
);

const NavDesktop = () => (
  <nav className="header__nav" aria-label="Navegación principal">
    <ul className="header__nav-list" role="list">
      {NAV_LINKS.map(({ label, href }) => (
        <li key={href}>
          <a href={href} className="header__nav-link">{label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const CartButton = ({ count }) => (
  <button className="header__icon-btn" aria-label={`Carrito — ${count} artículos`}>
    <ShoppingBag className="icon" aria-hidden="true" />
    {count > 0 && (
      <span className="cart-badge" aria-live="polite">{count}</span>
    )}
  </button>
);

const SearchButton = () => (
  <button className="header__icon-btn" aria-label="Buscar">
    <Search className="icon" aria-hidden="true" />
  </button>
);

const MobileMenuButton = ({ isOpen, onToggle }) => (
  <button
    className="header__icon-btn header__menu-toggle"
    aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    aria-expanded={isOpen}
    onClick={onToggle}
  >
    {isOpen
      ? <X className="icon" aria-hidden="true" />
      : <AlignRight className="icon" aria-hidden="true" />
    }
  </button>
);

const NavMobile = ({ isOpen, onClose }) => (
  <div className={`header__mobile-menu ${isOpen ? 'header__mobile-menu--open' : ''}`} aria-hidden={!isOpen}>
    <nav aria-label="Menú móvil">
      <ul role="list">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className="header__mobile-link" onClick={onClose}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

/* ─── Componente principal ─── */

const Header = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <Logo />
        <NavDesktop />
        <div className="header__actions">
          <SearchButton />
          <CartButton count={cartCount} />
          <MobileMenuButton isOpen={menuOpen} onToggle={() => setMenuOpen(v => !v)} />
        </div>
      </div>
      <NavMobile isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;