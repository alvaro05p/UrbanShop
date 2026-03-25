import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

/* ─── Sub-componentes de la Home ─── */

const HeroBanner = () => (
  <div className="hero" aria-label="Banner principal">
    <div className="hero__inner">
      <p className="hero__eyebrow">Colección 2026</p>
      <h2 className="hero__title">
        <span className="hero__title-line">New</span>
        <span className="hero__title-line hero__title-line--outline">Drops</span>
      </h2>
      <p className="hero__subtitle">
        Piezas limitadas. Cultura sin filtros.
      </p>
    </div>
    <div className="hero__ticker" aria-hidden="true">
      <span className="hero__ticker-track">
        {Array(6).fill('NEW DROP — SNEAKERS — APPAREL — LIMITED — ').join('')}
      </span>
    </div>
  </div>
);

const CatalogHeader = () => (
  <div className="catalog__header">
    <h2 className="catalog__title">
      Todos los <span className="catalog__title--accent">productos</span>
    </h2>
    <div className="catalog__filters" role="group" aria-label="Filtros">
      {['Todo', 'Sneakers', 'Apparel', 'Accesorios'].map((f) => (
        <button key={f} className="catalog__filter-btn">
          {f}
        </button>
      ))}
    </div>
  </div>
);

/* ─── Vista de Inicio ─── */
const Home = () => (
  <>
    <HeroBanner />
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="catalog__inner">
        <CatalogHeader />
        <ProductList />
      </div>
    </section>
  </>
);

/* ─── App Root ─── */
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />

          <main id="main-content" className="app__main">
            <Routes>
              {/* Ruta principal: Muestra el Hero y el Catálogo */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta de detalle: Muestra solo el producto en grande */}
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;