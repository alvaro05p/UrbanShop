import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos el estado con lo que haya en LocalStorage o un array vacío
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('urban_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada vez que el carrito cambie, guardamos en LocalStorage
  useEffect(() => {
    localStorage.setItem('urban_cart', JSON.stringify(cart));
  }, [cart]);

  // AÑADIR AL CARRITO
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscamos si ya existe el mismo producto con la misma talla
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        // Si existe, sumamos 1 a la cantidad
        return prevCart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // Si es nuevo, lo añadimos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ELIMINAR DEL CARRITO
  const removeFromCart = (productId, size) => {
    setCart((prevCart) => 
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  // ACTUALIZAR CANTIDAD (Evita que baje de 1)
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // CÁLCULOS TOTALES (Convertimos a Number para evitar NaN)
  const cartCount = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  
  const cartTotal = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return total + (price * qty);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);