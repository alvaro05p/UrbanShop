import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

/* ─── Hero Banner ─── */

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

/* ─── Section Header ─── */

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

/* ─── App Root ─── */

function App() {
  return (
    <div className="app">
      <Header />

      <main id="main-content" className="app__main">
        <HeroBanner />

        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog__inner">
            <CatalogHeader />
            <ProductList />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;