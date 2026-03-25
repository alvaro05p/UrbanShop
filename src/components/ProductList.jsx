import { Plus, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  return (
    <Link to={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: 'none' }}>
      <article className="product-card" style={{ animationDelay: `${index * 0.07}s` }}>
        <div className="product-card__image-wrapper">
          <img src={product.image} alt={product.name} className="product-card__image" />
          <span className="product-card__badge">{product.category}</span>
          <div className="product-card__actions">
            <button className="product-card__btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
              <Plus size={20} />
            </button>
          </div>
        </div>
        <div className="product-card__info">
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">${product.price}</p>
        </div>
      </article>
    </Link>
  );
};

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat');
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  // Filtrado en tiempo real: Categoría + Búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                          product.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="product-list__empty">
        <p>No se encontraron resultados para "{searchQuery}"</p>
        <button onClick={() => window.location.href='/'} className="product-error__link" style={{border:'none', cursor:'pointer'}}>
          Limpiar búsqueda
        </button>
      </div>
    );
  }

  return (
    <div className="product-list__grid">
      {filteredProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;