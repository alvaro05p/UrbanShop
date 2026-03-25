import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Search, X, AlignRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer'; // <--- Importamos el modal

const Header = () => {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="header__logo">
            Urban<span className="header__logo-highlight">Shop</span>
          </Link>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li><Link to="/?cat=Footwear" className="header__nav-link">Sneakers</Link></li>
              <li><Link to="/?cat=Apparel" className="header__nav-link">Apparel</Link></li>
              <li><Link to="/?cat=Accessories" className="header__nav-link">Drops</Link></li>
            </ul>
          </nav>

          <div className="header__actions">
            <button className="header__icon-btn"><Search size={20} /></button>
            
            {/* Botón del Carrito */}
            <button 
              className="header__icon-btn header__cart-trigger" 
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button className="header__icon-btn header__menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <AlignRight />}
            </button>
          </div>
        </div>
      </header>

      {/* Renderizamos el Drawer aquí */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;