import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext' // Importar el proveedor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Envolver la app aquí */}
      <App />
    </CartProvider>
  </React.StrictMode>,
)