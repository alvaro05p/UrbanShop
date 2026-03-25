import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Share2, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import '/src/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-error">
        <div className="product-error__inner">
          <p className="product-error__code">404</p>
          <h2 className="product-error__title">Producto no encontrado</h2>
          <Link to="/" className="product-error__link">
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <div className="product-page">
      <div className="product-page__inner">

        {/* Breadcrumb */}
        <nav className="product-page__breadcrumb">
          <Link to="/" className="product-page__back">
            <ArrowLeft size={14} />
            <span>Catálogo</span>
          </Link>
          <span className="product-page__breadcrumb-sep">/</span>
          <span className="product-page__breadcrumb-current">{product.category}</span>
        </nav>

        <div className="product-page__grid">

          {/* ── Galería ── */}
          <div className="product-page__gallery">
            <div className="product-page__image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-page__main-img"
              />
              {product.badge && (
                <span className="product-card__badge">{product.badge}</span>
              )}
              <span className="product-page__category-tag">{product.category}</span>
              <button className="product-page__share" aria-label="Compartir">
                <Share2 size={16} />
              </button>
            </div>
            <div className="product-page__ticker">
              <span className="product-page__ticker-track">
                {Array(6)
                  .fill(`${product.name} — ${product.category} — $${product.price} — `)
                  .join('')}
              </span>
            </div>
          </div>

          {/* ── Info ── */}
          <div className="product-page__info">

            <div>
              <p className="product-page__eyebrow">UrbanShop / {product.category}</p>
              <h1 className="product-page__title">{product.name}</h1>
              <p className="product-page__price">${product.price}</p>
            </div>

            <div className="product-page__divider" />

            <p className="product-page__description">
              Diseño exclusivo de la colección 2026. Esta pieza representa la esencia
              de UrbanShop: materiales de alta calidad y un corte pensado para el
              estilo de vida moderno.
            </p>

            {/* Tallas */}
            <div className="product-page__section">
              <div className="product-page__section-header">
                <h3 className="product-page__label">Talla</h3>
                {selectedSize && (
                  <span className="product-page__size-selected">{selectedSize}</span>
                )}
              </div>
              <div className="product-page__sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`product-page__size-btn${selectedSize === size ? ' is-active' : ''}`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="product-page__actions">
              <button
                className={`product-page__add-cart${addedToCart ? ' is-added' : ''}`}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>{addedToCart ? '¡Añadido!' : 'Añadir al carrito'}</span>
              </button>
              <button
                className={`product-page__wishlist${wishlisted ? ' is-active' : ''}`}
                onClick={() => setWishlisted(!wishlisted)}
                aria-label="Añadir a favoritos"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Meta */}
            <div className="product-page__meta">
              <div className="product-page__meta-item">
                <Truck size={14} />
                <span>Envío gratis en pedidos superiores a $100</span>
              </div>
              <div className="product-page__meta-item">
                <RotateCcw size={14} />
                <span>Devoluciones gratuitas en 30 días</span>
              </div>
            </div>

            <p className="product-page__ref">
              REF — US-{String(product.id).padStart(4, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;