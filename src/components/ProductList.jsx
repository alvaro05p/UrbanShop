import { Plus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

/* ─── ProductCard ─── */

const ProductBadge = ({ label }) => (
  <span className="product-card__badge">{label}</span>
);

const ProductImage = ({ src, alt, children }) => (
  <div className="product-card__image-wrapper">
    <img
      src={src}
      alt={alt}
      className="product-card__image"
      loading="lazy"
      decoding="async"
    />
    {children}
  </div>
);

const ProductActions = ({ onAdd, onWishlist }) => (
  <div className="product-card__actions">
    <button
      className="product-card__btn product-card__btn--add"
      onClick={onAdd}
      aria-label="Añadir al carrito"
    >
      <Plus className="icon" aria-hidden="true" />
    </button>
    <button
      className="product-card__btn product-card__btn--wish"
      onClick={onWishlist}
      aria-label="Añadir a favoritos"
    >
      <Heart className="icon" aria-hidden="true" />
    </button>
  </div>
);

const ProductInfo = ({ name, price, category }) => (
  <div className="product-card__info">
    <div className="product-card__meta">
      <h3 className="product-card__name">{name}</h3>
      <span className="product-card__category">{category}</span>
    </div>
    <p className="product-card__price">${price}</p>
  </div>
);

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    // lógica de wishlist
  };

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={product.name}
    >
      <ProductImage src={product.image} alt={product.name}>
        <ProductBadge label={product.category} />
        <ProductActions onAdd={handleAdd} onWishlist={handleWishlist} />
      </ProductImage>
      <ProductInfo
        name={product.name}
        price={product.price}
        category={product.category}
      />
    </article>
  );
};

/* ─── ProductList ─── */

const ProductListEmpty = () => (
  <div className="product-list__empty" role="status">
    <p>No hay productos disponibles en este momento.</p>
  </div>
);

const ProductList = () => {
  if (!products?.length) return <ProductListEmpty />;

  return (
    <section className="product-list" aria-label="Catálogo de productos">
      <ul className="product-list__grid" role="list">
        {products.map((product, index) => (
          <li key={product.id}>
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;