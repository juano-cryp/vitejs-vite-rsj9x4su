import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = No logueado
  const [carrito, setCarrito] = useState([]);

  // Funciones de Login / Logout
  const login = (nombre, email) => setUsuario({ nombre, email });
  const logout = () => setUsuario(null);

  // Funciones del Carrito
  const agregarAlCarrito = (obra) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === obra.id);
      if (existe) return prev;
      return [...prev, obra];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <AppContext.Provider
      value={{
        usuario,
        login,
        logout,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
