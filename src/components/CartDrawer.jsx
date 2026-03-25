import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '/src/CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Función auxiliar para formatear precios con seguridad
  const formatPrice = (price, qty) => {
    const p = parseFloat(price) || 0;
    const q = parseInt(qty) || 1;
    return (p * q).toFixed(0); // O .toFixed(2) si usas decimales
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? ' is-open' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside className={`cart-drawer${isOpen ? ' is-open' : ''}`}>

        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={18} />
            <h2>Carrito</h2>
            <span className="cart-drawer__count">({cart.length})</span>
          </div>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={64} className="cart-drawer__empty-icon" />
              <p>Tu carrito está vacío</p>
              <Link to="/" onClick={onClose} className="cart-drawer__shop-link">
                Explorar productos
              </Link>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                  
                  <div className="cart-item__img">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item__details">
                    <div className="cart-item__header">
                      <h3 className="cart-item__name">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="cart-item__remove"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="cart-item__size">Talla: {item.size || 'N/A'}</p>

                    <div className="cart-item__footer">
                      <div className="cart-item__qty">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, (item.quantity || 1) - 1)}
                          aria-label="Reducir cantidad"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, (item.quantity || 1) + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      {/* Aquí usamos la función de formateo seguro para evitar el NaN */}
                      <p className="cart-item__price">
                        ${formatPrice(item.price, item.quantity)}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${parseFloat(cartTotal || 0).toFixed(0)}</span>
            </div>
            <p className="cart-drawer__tax">Envío e impuestos calculados al finalizar.</p>
            <button className="cart-drawer__checkout-btn" onClick={() => alert('Checkout no implementado')}>
              Finalizar Pedido
            </button>
          </div>
        )}

      </aside>
    </>
  );
};

export default CartDrawer;